import { verifyToken, generateAuthTokens } from "./token";
import { getUserByEmail, getUserById, updateUserById } from "./user";
import Token from "../models/token";
import { tokenTypes } from "../config/tokens";
import ApiError from "../utils/ApiError";
import { IUser } from "../types/user.interface";
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
export const loginUserWithEmailAndPassword = async (email:string, password:string):Promise<IUser> => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(401, "Incorrect email or password", false));
    });
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const logout = async (refreshToken:string) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(404, "Not found", false));
    });
  }
  return await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
export const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return generateAuthTokens(user);
  } catch (error) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(401, "Token expired: Please authenticate ", false));
    });
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
 export const resetPassword = async (resetPasswordToken: string, newPassword: string) => {
  try {
    const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new ApiError(400,"No Matching User Found",false);
    }
    await Promise.all([
      updateUserById(user.id, { password: newPassword }),
      Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD })
    ]);
    return true; // Return a success indicator
  } catch (error) {
    throw new ApiError(400, "reset password failed", false); // Throw an ApiError instead of wrapping it in a promise
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
export const verifyEmail = async (verifyEmailToken:string) => {
  try {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Promise.all(
      [
        Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL }),
        updateUserById(user.id, { isEmailVerified: true })
      ]
    );
    return true;
  } 
  catch (error) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(401, "email verification failed", false));
    });
  }
};

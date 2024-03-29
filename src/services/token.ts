import pkg from "jsonwebtoken";
import { jwt } from "../config/config";
import dayjs from 'dayjs'
import * as userService from "./user";
import Token from "../models/token";
import { tokenTypes } from "../config/tokens";
import ApiError from "../utils/ApiError";
import { IUser } from "src/types/user.interface";

const { sign, verify } = pkg;


/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, expires, type, secret = jwt.secret) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
export const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token:string, type:string) => {
  const payload = verify(token, jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (user:IUser) => {
  console.log("user", user);
  console.log("jwt import", jwt);
  const accessTokenExpires = dayjs().add(jwt.accessExpirationMinutes, "minutes");
  const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = dayjs().add(jwt.refreshExpirationDays, "days");
  const refreshToken = generateToken(user._id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user._id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(404, "No users found with this email", false));
    });
  }
  const expires = dayjs().add(jwt.resetPasswordExpirationMinutes, "minutes");
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return new Promise(function (resolve, reject) {
      reject(new ApiError(404, "No users found with this email", false));
    });
  }
  const expires = dayjs().add(jwt.verifyEmailExpirationMinutes, "minutes");
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

// export default {
//   generateToken,
//   saveToken,
//   verifyToken,
//   generateAuthTokens,
//   generateResetPasswordToken,
//   generateVerifyEmailToken,
// };

import { RequestHandler } from "express";
import * as userService from "../services/user";
import * as tokenService from "../services/token";
import * as authService from "../services/auth";
export const register: RequestHandler = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).send({
      user,
    });
  } catch (error) {
    // TODO add winston logger
    console.log("error in registration", error);
    return res.status(400).json({
      message: "4A001",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    if(!user){
      return res.status(404).json({"message":'no user found'});
    }
    const tokens = await tokenService.generateAuthTokens(user);
    return res.send({
      user,
      tokens,
    });
  } catch (err) {
    console.log("error in login", err);
    return res.status(400).json({
      message: "4A002",
    });
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    await authService.logout(req.body.refreshToken);
    return res.status(204).send();
  } catch (err) {
    console.log("error in logout", err);
    return res.status(400).json({
      message: "4A003",
    });
  }
};
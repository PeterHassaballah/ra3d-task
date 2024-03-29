import joi from "joi";
import { password } from "./custom";

export const register = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required().custom(password),
    age:joi.number().required(),
    name: joi.string().required(),
  }),
};

export const login = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

export const logout = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

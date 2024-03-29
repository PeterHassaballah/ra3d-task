// import { object, string, number, required } from 'joi';
import joi from "joi";
import { password, objectId } from "./custom";

export const createUser = {
  body: joi.object().keys({
    email: joi.string().email(),
    password: joi.string().custom(password),
    name: joi.string().required(),
  }),
};

export const getUsers = {
  query: joi.object().keys({
    name: joi.string(),
    email: joi.string(),
    sortBy: joi.string(),
    sortOrder: joi.any(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

export const getUser = {
  params: joi.object().keys({
    userId: joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: joi.object().keys({
    userId: joi.required().custom(objectId),
  }),
  body: joi
    .object()
    .keys({
      email: joi.string().email(),
      password: joi.string().custom(password),
      name: joi.string(),
    })
    .min(1),
};
import joi from "joi";
import { objectId } from "./custom";

export const createTask = {
    body: joi
      .object()
      .keys({
        title: joi.string(),
        description: joi.string(),
      })
      .min(1),
  };
export const updateTask = {
    params: joi.object().keys({
      taskId: joi.required().custom(objectId),
    }),
    body: joi
      .object()
      .keys({
        title: joi.string(),
        description: joi.string(),
      })
      .min(1),
  };
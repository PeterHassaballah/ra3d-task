
import { RequestHandler } from 'express';
import joi from "joi";
import pick from "../utils/pick";

const validate = (schema:any):RequestHandler => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi
    .compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(", ");
    return res.status(400).send(errorMessage);
  }
  Object.assign(req, value);
  return next();
};

export default validate;

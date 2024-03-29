/* eslint-disable*/
import joi from "joi";

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid("production", "development", "test").required(),
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required().description("Mongo DB url"),
    JWT_SECRET: joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi.number().default(30).description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi.number().default(30).description("days after which refresh tokens expire"),
    
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV || "local";
export const port = envVars.PORT;

export const jwt = {
  secret: envVars.JWT_SECRET,
  accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};

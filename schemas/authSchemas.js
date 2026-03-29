import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});

export { registerSchema, loginSchema, resendVerificationSchema };

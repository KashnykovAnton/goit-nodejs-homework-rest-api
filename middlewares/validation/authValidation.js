import Joi from "joi";
import { HttpCode } from "../../config/constants";

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${err.message.replace(/"/g, "'")}` });
  }
  next();
};

export const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${err.message.replace(/"/g, "'")}` });
  }
  next();
};

export const validateUpdateSubscription = async (req, res, next) => {
  try {
    await updateSubscriptionSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${err.message.replace(/"/g, "'")}` });
  }
  next();
};

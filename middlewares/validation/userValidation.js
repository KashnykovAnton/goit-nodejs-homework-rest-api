import Joi from "joi";
import { HttpCode } from "../../config/constants";

const verifySchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateVerify = async (req, res, next) => {
  try {
    await verifySchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad request",
      code: HttpCode.BAD_REQUEST,
      message: "Missing required field email",
    });
  }
  next();
};

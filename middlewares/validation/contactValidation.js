import Joi from "joi";
import pkg from "mongoose";
import { HttpCode } from "../../config/constants";

const { Types } = pkg;

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const regLimit = /\d+/;
const regFilter = /(name|email|phone)?\|?(\bname\b|\bemail\b|\bphone\b)+/; //Остался вопрос - решить!!!

const querySchema = Joi.object({
  page: Joi.string().pattern(regLimit).optional(),
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "email", "phone").optional(),
  sortByDesc: Joi.string().valid("name", "email", "phone").optional(),
  filter: Joi.string().pattern(regFilter).optional(),
  favorite: Joi.bool().optional(),
});

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Missing ${err.message.replace(/"/g, "'")} field` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res.status(HttpCode.BAD_REQUEST).json({ message: "missing fields" });
  }
  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    console.log(err);
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: "missing field favorite" });
  }
  next();
};

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: "Invalid ObjectId" });
  }
  next();
};

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Missing ${err.message.replace(/"/g, "'")} field` });
  }
  next();
};

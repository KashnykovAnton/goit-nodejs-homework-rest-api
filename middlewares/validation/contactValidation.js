import Joi from "joi";

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

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res
      .status(400)
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
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "'")}` });
    }
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

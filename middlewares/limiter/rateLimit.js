import rateLimit from "express-rate-limit";
import { HttpCode } from "../../config/constants";

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res, _next) => {
      return res.status(HttpCode.TOO_MANY_REQUESTS).json({
        status: "error",
        code: HttpCode.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later",
      });
    },
  });
};

export { limiter };

import jwt from "jsonwebtoken";
import { findById } from "../../repository/users";
import { HttpCode } from "../../config/constants";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (e) {
    return false;
  }
};

const authGuard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  const payload = jwt.decode(token);
  const user = await findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  req.user = user;
  next();
};

export { authGuard };

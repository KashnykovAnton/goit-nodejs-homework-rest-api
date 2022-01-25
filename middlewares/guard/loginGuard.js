import { findByEmail } from "../../repository/users";
import { HttpCode } from "../../config/constants";

const loginGuard = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (!user.verify) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  next();
};

export { loginGuard };

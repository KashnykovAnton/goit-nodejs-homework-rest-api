import { HttpCode } from "../../config/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

export const controllerSignup = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);

  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }

  const user = await authService.createUser(req.body);

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    user,
  });
};

import { HttpCode } from "../../config/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

export const controllerLogout = async (req, res, _next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.OK, data: {} });
};

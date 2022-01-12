import { HttpCode } from "../../config/constants";
import AuthService from "../../service/users";

const authService = new AuthService();

export const controllerCurrentUser = async (req, res, _next) => {
  const id = req.user.id;
  const user = await authService.getCurrentUser(id);
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    user,
  });
};

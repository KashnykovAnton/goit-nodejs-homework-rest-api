import { HttpCode } from "../../config/constants";
import AuthService from "../../service/users";

const authService = new AuthService();

export const controllerLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const data = await authService.getUser(email, password);

  if (!data) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  }
  
  const token = authService.getToken(data);
  const user = await authService.getUserOnLogin(data);

  await authService.setToken(data.id, token);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    token,
    user,
  });
};

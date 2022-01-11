import { HttpCode } from "../../config/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

export const controllerLogin = async (req, res, next) => {
  // console.log(req.body);
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
  // console.log(token);
  const user = await authService.getUserOnLogin(data);
  // console.log(user);

  await authService.setToken(data.id, token);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    token,
    user,
  });
};

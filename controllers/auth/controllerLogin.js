import { HttpCode } from "../../config/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

export const controllerLogin = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.getUser(email, password);
    const { id, subscription } = data;

    if (!id) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const token = authService.getToken(id, email);

    await authService.setToken(id, token);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { token, user: { email, subscription } },
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

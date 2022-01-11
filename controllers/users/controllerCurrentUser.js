import { HttpCode } from "../../config/constants";

export const controllerCurrentUser = async (req, res, _next) => {
  const { email, subscription } = req.user;
  const user = { email, subscription };
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    user,
  });
};

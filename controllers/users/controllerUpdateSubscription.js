import { HttpCode, Message } from "../../config/constants";
import AuthService from "../../service/users";

const authService = new AuthService();

export const controllerUpdateSubscription = async (req, res, _next) => {
  const id = req.user.id;
  const subscriptionValue = req.body.subscription;
  const updUserSubscription = await authService.updateSubscription(
    id,
    subscriptionValue
  );
  if (updUserSubscription) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: updUserSubscription,
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

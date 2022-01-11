import { HttpCode, Message } from "../../config/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

export const controllerUpdateSubscription = async (req, res, _next) => {
  console.log(req.body);
  const id = req.user.id;
  const subscriptionValue = req.body.subscription;
  console.log("subscriptionValue before: ", subscriptionValue);
  const updUserSubscription = await authService.updateSubscription(
    id,
    subscriptionValue
  );
  console.log("updUserSubscription after: ", updUserSubscription);
  if (updUserSubscription) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      //   data: updUserSubscription._doc,
      data: updUserSubscription,
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

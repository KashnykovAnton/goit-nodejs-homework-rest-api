import { HttpCode } from "../../config/constants";
import AuthService from "../../service/auth";
import {
  EmailService,
  // SenderSendgrid,
  SenderNodemailer,
} from "../../service/email";

const authService = new AuthService();

export const controllerSignup = async (req, res, _next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);

  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }

  const { subscription, avatarURL, verificationToken } =
    await authService.createUser(req.body);

  const emailService = new EmailService(
    process.env.NODE_ENV,
    // new SenderSendgrid()
    new SenderNodemailer()
  );
  const isSend = await emailService.sendVerifyEmail(email, verificationToken);

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    data: {
      email,
      subscription,
      avatarURL,
      verificationToken,
      isSendEmailVerify: isSend,
    },
  });
};

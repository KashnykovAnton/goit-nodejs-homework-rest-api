import { HttpCode } from "../../config/constants";
import {
  UploadFileService,
  LocalFileStorage,
  // CloudFileStorage,
} from "../../service/file-storage";
import {
  findByVerifyToken,
  updateVerify,
  findByEmail,
} from "../../repository/users";
import {
  EmailService,
  // SenderSendgrid,
  SenderNodemailer,
} from "../../service/email";

const uploadAvatar = async (req, res, _next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    // CloudFileStorage,
    req.file,
    req.user
  );

  const avatarUrl = await uploadService.updateAvatar();

  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

const verifyUser = async (req, res, _next) => {
  const verificationToken = req.params.verificationToken;
  const userFromToken = await findByVerifyToken(verificationToken);
  if (userFromToken) {
    await updateVerify(userFromToken.id, true);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "Verification successful" },
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "Not found",
    code: HttpCode.NOT_FOUND,
    data: { message: "User not found" },
  });
};

const repeatEmailForVerifyUser = async (req, res, _next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      data: { message: "User with this email not found" },
    });
  }
  const { verificationToken } = user;
  if (!verificationToken) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad request",
      code: HttpCode.BAD_REQUEST,
      data: { message: "Verification has already been passed" },
    });
  }
  const emailService = new EmailService(
    process.env.NODE_ENV,
    // new SenderSendgrid()
    new SenderNodemailer()
  );
  const isSend = await emailService.sendVerifyEmail(email, verificationToken);
  if (isSend) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email,
        message: "Verification email sent",
        isSendEmailVerify: isSend,
      },
    });
  }
  res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
    status: "error",
    code: HttpCode.UNPROCESSABLE_ENTITY,
    data: { message: "Unprocessable Entity" },
  });
};

export { uploadAvatar, verifyUser, repeatEmailForVerifyUser };

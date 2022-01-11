import { updateStatusContact } from "../../repository/contacts";
import { HttpCode, Message } from "../../config/constants";

export const controllerUpdateStatusContact = async (req, res, _next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const updStatusContact = await updateStatusContact(userId, id, req.body);
  if (updStatusContact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { updStatusContact },
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

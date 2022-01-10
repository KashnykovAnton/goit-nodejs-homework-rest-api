import { updateContact } from "../../repository/contacts";
import { HttpCode, Message } from "../../config/constants";

export const controllerUpdateContact = async (req, res, _next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const updContact = await updateContact(userId, id, req.body);
  if (updContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { updContact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

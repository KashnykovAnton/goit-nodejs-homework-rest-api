import { removeContact } from "../../repository/contacts";
import { HttpCode, Message } from "../../config/constants";

export const controllerRemoveContact = async (req, res, _next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await removeContact(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

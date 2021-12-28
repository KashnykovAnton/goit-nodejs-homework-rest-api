import { removeContact } from "../../repository/contacts";
import { HttpCode, Message } from "../../config/constants";

export const controllerRemoveContact = async (req, res, _next) => {
  const { id } = req.params;
  const delContact = await removeContact(id);
  if (delContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { delContact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
};

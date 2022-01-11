import { addContact } from "../../repository/contacts";
import { HttpCode } from "../../config/constants";

export const controllerAddContact = async (req, res, _next) => {
  const { id: userId } = req.user;
  const contact = await addContact(userId, req.body);
  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
};

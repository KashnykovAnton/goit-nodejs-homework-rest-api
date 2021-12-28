import { addContact } from "../../repository/contacts";
import { HttpCode } from "../../config/constants";

export const controllerAddContact = async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(HttpCode.CREATED).json({ status: "success", code: HttpCode.CREATED, data: { newContact } });
};

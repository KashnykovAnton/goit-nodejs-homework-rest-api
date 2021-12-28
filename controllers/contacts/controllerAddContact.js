import { addContact } from "../../repository/contacts";

export const controllerAddContact = async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
};

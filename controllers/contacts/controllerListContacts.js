import { listContacts } from "../../repository/contacts";

export const controllerListContacts = async (_req, res, _next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

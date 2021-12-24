import { removeContact } from "../../models/contacts";

export const controllerRemoveContact = async (req, res, _next) => {
  const { id } = req.params;
  const delContact = await removeContact(id);
  if (delContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
};

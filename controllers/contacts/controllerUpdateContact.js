import { updateContact } from "../../repository/contacts";

export const controllerUpdateContact = async (req, res, _next) => {
  const { id } = req.params;
  const updContact = await updateContact(id, req.body);
  if (updContact) {
    return res.status(200).json(updContact);
  }
  res.status(404).json({ message: "Not found" });
};

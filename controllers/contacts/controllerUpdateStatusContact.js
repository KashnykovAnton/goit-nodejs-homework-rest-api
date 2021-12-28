import { updateStatusContact } from "../../repository/contacts";

export const controllerUpdateStatusContact = async (req, res, _next) => {
  const { id } = req.params;
  const updStatusContact = await updateStatusContact(id, req.body);
  if (updStatusContact) {
    return res.status(200).json(updStatusContact);
  }
  res.status(404).json({ message: "Not found" });
};

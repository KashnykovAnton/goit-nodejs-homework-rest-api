import { getContactById } from "../../repository/contacts";

export const controllerGetContactById = async (req, res, _next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  console.log(contact); // toObject
  if (contact) {
    return res.status(200).json(contact); // toJSON
  }
  res.status(404).json({ message: "Not found" });
};

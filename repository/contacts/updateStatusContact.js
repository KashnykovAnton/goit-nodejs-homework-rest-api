import Contact from "../../model/Contact";

export const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: "true" }
  );
  return result;
};

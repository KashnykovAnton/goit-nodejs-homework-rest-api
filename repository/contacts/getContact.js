import Contact from "../../model/Contact";

export const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

// import db from "../../config/db";
// import { ObjectId } from "mongodb";

// export const getContactById = async (contactId) => {
//   const client = await db;
//   const collection = await client.db().collection("contacts");
//   const id = ObjectId(contactId);
//   const [result] = await collection.find({ _id: id }).toArray();
//   return result;
// };

// import chalk from "chalk";
// import contacts from "../../db/contacts";

// export const getContactById = async (contactId) => {
// try {
//   return contacts.find((item) => item.id === contactId);
// } catch (error) {
//   console.error(chalk.bgRed(error));
//   process.exit(1);
// }
// };

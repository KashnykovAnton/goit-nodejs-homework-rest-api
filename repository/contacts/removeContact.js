import Contact from "../../model/Contact";

export const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

// import db from "../../config/db";
// import { ObjectId } from "mongodb";

// export const removeContact = async (contactId) => {
//   const client = await db;
//   const collection = await client.db().collection("contacts");
//   const id = ObjectId(contactId);
//   const { value: result } = await collection.findOneAndDelete({ _id: id });
//   return result;
// };

// import fs from "fs/promises";
// import path from "path";
// import chalk from "chalk";
// import contacts from "../../db/contacts";

// const __dirname = path.dirname("db/contacts");

// export const removeContact = async (contactId) => {
// try {
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return;
//   }
//   const [delContact] = contacts.splice(index, 1);
//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),
//     JSON.stringify(contacts, null, 2)
//   );
//   return delContact;
// } catch (error) {
//   console.error(chalk.bgRed(error));
//   process.exit(1);
// }
// };

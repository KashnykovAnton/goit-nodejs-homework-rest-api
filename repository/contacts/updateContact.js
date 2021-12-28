import Contact from "../../model/Contact";
import chalk from "chalk";

export const updateContact = async (contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: "true" }
    );
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// import db from "../../config/db";
// import { ObjectId } from "mongodb";

// export const updateContact = async (contactId, body) => {
//   const client = await db;
//   const collection = await client.db().collection("contacts");
//   const id = ObjectId(contactId);
//   const { value: result } = await collection.findOneAndUpdate(
//     { _id: id },
//     { $set: body },
//     { returnDocument: "after" }
//   );
//   return result;
// };

// import fs from "fs/promises";
// import path from "path";
// import chalk from "chalk";
// import contacts from "../../db/contacts";

// const __dirname = path.dirname("db/contacts");

// export const updateContact = async (contactId, body) => {
// try {
//   let updContact = contacts.find((item) => item.id === contactId);
//   if (!updContact) {
//     return;
//   }
//   updContact = { ...updContact, ...body };
//   const index = contacts.findIndex((item) => item.id === contactId);
//   contacts.splice(index, 1, updContact);
//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),
//     JSON.stringify(contacts, null, 2)
//   );
//   return updContact;
// } catch (error) {
//   console.error(chalk.bgRed(error));
//   process.exit(1);
// }
// };

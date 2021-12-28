import Contact from "../../model/Contact";

export const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

// import db from "../../config/db";
// export const addContact = async (body) => {
//   const client = await db;
//   const collection = await client.db().collection("contacts");
//   const newContact = {
//     favorite: false,
//     ...body,
//   };
//   const result = await collection.insertOne(newContact);
//   return result;
// };

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import chalk from "chalk";
// import contacts from "../../db/contacts";

// const __dirname = path.dirname("db/contacts");

// export const addContact = async (body) => {
// try {
//   const newContact = { id: randomUUID(), ...body };
//   contacts.push(newContact);
//   await fs.writeFile(
//     path.join(__dirname, "contacts.json"),
//     JSON.stringify(contacts, null, 2)
//   );
//   return newContact;
// } catch (error) {
//   console.error(chalk.bgRed(error));
//   process.exit(1);
// }
// };

import Contact from "../../model/Contact";

export const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

// import db from "../../config/db";

// export const listContacts = async () => {
//   const client = await db;
//   const collection = await client.db().collection("contacts");
//   const result = await collection.find().toArray();
//   return result;
// };

// import chalk from "chalk";
// import contacts from "../../db/contacts";

// export const listContacts = async () => {
// try {
//   return contacts;
// } catch (error) {
//   console.error(chalk.bgRed(error));
//   process.exit(1);
// }
// };

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import chalk from "chalk";
import contacts from "./contacts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const contactsPath = async () => {
//   try {
//     const content = await fs.readFile(
//       path.join(__dirname, "db", "contacts.json"),
//       "utf8"
//     );
//     const result = JSON.parse(content);
//     return result;
//   } catch (error) {
//     console.error(chalk.bgRed(error));
//     process.exit(1);
//   }
// };

const listContacts = async () => {
  try {
    //   return await contactsPath();
    return contacts;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const getContactById = async (contactId) => {
  try {
    // const contacts = await contactsPath();
    const [contact] = contacts.filter((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const removeContact = async (contactId) => {
  try {
    // const contacts = await contactsPath();

    // const index = contacts.findIndex((contact) => contact.id === contactId);
    // if (index !== -1) {
    // const delContact = contacts.splice(index, 1);

    const newContacts = contacts.filter((item) => item.id !== contactId);
    const [delContact] = contacts.filter((item) => item.id === contactId);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(newContacts, null, 2)
      // JSON.stringify(contacts, null, 2)
    );
    return delContact;
    // }
    // return null;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// получает body!!!!
// const addContact = async (name, email, phone) => {
const addContact = async (body) => {
  try {
    // const contacts = await contactsPath();
    // const newContact = { id: randomUUID(), name, email, phone };
    const newContact = { id: randomUUID(), ...body };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// получает body!!!!
// const updateContact = async (name, email, phone, contactId) => {
const updateContact = async (contactId, body) => {
  try {
    // const contacts = await contactsPath();
    let updContact = contacts.find((item) => item.id === contactId);
    if (!updContact) {
      return;
    }
    // updContact = { ...updContact, name, email, phone };
    updContact = { ...updContact, ...body };
    const index = contacts.findIndex((item) => item.id === contactId);
    // if (!index) {
    //   return;
    // };
    // contacts[index] = updContact
    // updContact = {...updContact, ...body}
    contacts.splice(index, 1, updContact);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

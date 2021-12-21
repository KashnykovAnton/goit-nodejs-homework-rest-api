import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import chalk from "chalk";
import contacts from "./contacts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  try {
    return contacts;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const getContactById = async (contactId) => {
  try {
    const [contact] = contacts.filter((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: randomUUID(), ...body };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "model", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const removeContact = async (contactId) => {
  try {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    const [delContact] = contacts.filter((item) => item.id === contactId);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(newContacts, null, 2)
    );
    return delContact;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

const updateContact = async (contactId, body) => {
  try {
    let updContact = contacts.find((item) => item.id === contactId);
    if (!updContact) {
      return;
    }
    updContact = { ...updContact, ...body };
    const index = contacts.findIndex((item) => item.id === contactId);
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

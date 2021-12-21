import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import contacts from "../../model/contacts";

const __dirname = path.dirname("model/contacts.json");

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

export default removeContact;

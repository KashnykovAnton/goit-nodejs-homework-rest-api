import chalk from "chalk";
import contacts from "../../db/contacts";

export const listContacts = async () => {
  try {
    return contacts;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// export default listContacts;

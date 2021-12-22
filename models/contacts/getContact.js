import chalk from "chalk";
import contacts from "../../db/contacts";

export const getContactById = async (contactId) => {
  try {
    return contacts.find((item) => item.id === contactId);
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

// export default getContactById;

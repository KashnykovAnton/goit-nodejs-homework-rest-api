import Contact from "../../model/Contact";
import chalk from "chalk";

export const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId);
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

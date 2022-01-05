import Contact from "../../model/Contact";
import chalk from "chalk";

export const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};
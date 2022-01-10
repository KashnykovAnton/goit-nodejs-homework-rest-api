import Contact from "../../model/Contact";
import chalk from "chalk";

export const getContactById = async (userId, contactId) => {
  try {
    const result = await Contact.findOne({ _id: contactId, owner: userId });
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

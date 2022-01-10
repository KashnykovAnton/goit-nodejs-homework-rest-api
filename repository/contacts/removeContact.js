import Contact from "../../model/Contact";
import chalk from "chalk";

export const removeContact = async (userId, contactId) => {
  try {
    const result = await Contact.findOneAndRemove({
      _id: contactId,
      owner: userId,
    });
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

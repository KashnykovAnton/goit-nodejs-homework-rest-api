import Contact from "../../model/Contact";
import chalk from "chalk";

export const addContact = async (userId, body) => {
  try {
    const result = await Contact.create({ ...body, owner: userId });
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

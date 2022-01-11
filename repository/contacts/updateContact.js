import Contact from "../../model/Contact";
import chalk from "chalk";

export const updateContact = async (userId, contactId, body) => {
  try {
    const result = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: userId,
      },
      { ...body },
      { new: "true" }
    );
    return result;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

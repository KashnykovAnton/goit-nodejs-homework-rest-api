import chalk from "chalk";
import contacts from "../../model/contacts";

const getContactById = async (contactId) => {
  try {
    if (contactId !== "") {
      console.log(contactId);
      const [contact] = contacts.filter((item) => item.id === contactId);
      console.log("contact: ", contact);
      return contact;
    }
    return null;

    // if (contact) {
    //   return contact;
    // }
    // return null;
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

export default getContactById;

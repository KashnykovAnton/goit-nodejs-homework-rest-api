import Contact from "../../model/Contact";
import chalk from "chalk";

export const listContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 20,
  skip = 0,
}) => {
  try {
    let sortCriteria = null;
    const total = await Contact.find().countDocuments();
    let result = Contact.find();
    if (sortBy) {
      sortCriteria = { [`${sortBy}`]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [`${sortByDesc}`]: -1 };
    }
    if (filter) {
      result = result.select(filter.split("|").join(" "));
    }
    result = await result
      .skip(Number(skip))
      .limit(Number(limit))
      .sort(sortCriteria);
    return { total, contacts: result };
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

import Contact from "../../model/Contact";
import chalk from "chalk";

export const listContacts = async (
  userId,
  { page = 1, sortBy, sortByDesc, filter, limit = 20, skip = 0, favorite }
) => {
  try {
    const total = await Contact.find({ owner: userId }).countDocuments();
    let sortCriteria = null;
    let result = Contact.find({ owner: userId });
    const skipIndex = (Number(page) - 1) * Number(limit) + Number(skip);

    if (sortBy) {
      sortCriteria = { [`${sortBy}`]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [`${sortByDesc}`]: -1 };
    }
    if (filter) {
      result = result.select(filter.split("|").join(" "));
    }
    if (favorite === "true") {
      result = result.find({ favorite: true });
    }
    if (favorite === "false") {
      result = result.find({ favorite: false });
    }

    result = await result
      // .sort({ _id: 1 })
      .limit(Number(limit))
      .skip(skipIndex)
      .sort(sortCriteria);

    return { total, contacts: result };
  } catch (error) {
    console.error(chalk.bgRed(error));
    process.exit(1);
  }
};

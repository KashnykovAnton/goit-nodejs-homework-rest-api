import Contact from "../../model/Contact";
import pkg from "mongoose";
const { Types } = pkg;

export const getStatisticsContacts = async (id) => {
  const data = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(id) } },
    {
      $group: {
        _id: "stats",
        totalAge: { $sum: "$age" },
        minAge: { $min: "$age" },
        maxAge: { $max: "$age" },
        avgAge: { $avg: "$age" },
      },
    },
  ]);
  return data;
};

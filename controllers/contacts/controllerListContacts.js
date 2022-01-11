import { listContacts } from "../../repository/contacts";
import { HttpCode } from "../../config/constants";

export const controllerListContacts = async (req, res, _next) => {
  const { id: userId } = req.user;
  // console.log(req.query);
  const contacts = await listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

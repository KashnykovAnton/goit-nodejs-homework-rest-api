import { getContactById } from "../../repository/contacts";
import { HttpCode, Message } from "../../config/constants";

export const controllerGetContactById = async (req, res, _next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await getContactById(userId, id);
  console.log(contact); // toObject!!
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } }); // toJSON!!
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: Message.NOT_FOUND,
    });
};

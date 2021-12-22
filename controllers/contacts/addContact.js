import { Router } from "express";
import { addContact } from "../../models/contacts";
import { validateCreate } from "../../middlewares/validation/contactValidation";

const router = new Router();

router.post("/", validateCreate, async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
});

export default router;

import { Router } from "express";
// import model from "../../model/index";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../controllers/contacts";
import { validateCreate, validateUpdate, validateId } from "./validation";

const router = new Router();

router.get("/", async (_req, res, _next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", validateId, async (req, res, _next) => {
  console.log(req.params);
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validateCreate, async (req, res, _next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
});

router.delete("/:id", validateId, async (req, res, _next) => {
  const { id } = req.params;
  const delContact = await removeContact(id);
  if (delContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateId, validateUpdate, async (req, res, _next) => {
  const { id } = req.params;
  const updContact = await updateContact(id, req.body);
  if (updContact) {
    return res.status(200).json(updContact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;

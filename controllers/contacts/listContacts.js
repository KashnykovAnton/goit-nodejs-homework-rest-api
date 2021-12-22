import { Router } from "express";
import { listContacts } from "../../models/contacts";

const router = new Router();

router.get("/", async (_req, res, _next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export default router;



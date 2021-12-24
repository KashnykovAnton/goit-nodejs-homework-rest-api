import { Router } from "express";
import {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
} from "../../controllers/contacts";
import {
  validateCreate,
  validateUpdate,
} from "../../middlewares/validation/contactValidation";

const router = new Router();

router.get("/", controllerListContacts);

router.get("/:id", controllerGetContactById);

router.post("/", validateCreate, controllerAddContact);

router.delete("/:id", controllerRemoveContact);

router.put("/:id", validateUpdate, controllerUpdateContact);

export default router;

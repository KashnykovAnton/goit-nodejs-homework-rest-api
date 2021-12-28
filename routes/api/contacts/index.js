import { Router } from "express";
import {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
  controllerUpdateStatusContact,
} from "../../../controllers/contacts";
import {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} from "../../../middlewares/validation/contactValidation";

const router = new Router();

router.get("/", controllerListContacts);

router.get("/:id", controllerGetContactById);

router.post("/", validateCreate, controllerAddContact);

router.delete("/:id", controllerRemoveContact);

router.put("/:id", validateUpdate, controllerUpdateContact);

router.patch(
  "/:id/favorite",
  validateUpdateFavorite,
  controllerUpdateStatusContact
);

export default router;

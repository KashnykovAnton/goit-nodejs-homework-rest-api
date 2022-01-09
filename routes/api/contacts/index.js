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
  validateId,
  validateQuery,
} from "../../../middlewares/validation/contactValidation";
import guard from "../../../middlewares/guard/authGuard";

const router = new Router();

router.get("/", [guard, validateQuery], controllerListContacts);

router.get("/:id",[ guard, validateId], controllerGetContactById);

router.post("/", [guard, validateCreate], controllerAddContact);

router.delete("/:id", [guard, validateId], controllerRemoveContact);

router.put("/:id", [guard, validateId, validateUpdate], controllerUpdateContact);

router.patch(
  "/:id/favorite",
  [guard, validateId,
  validateUpdateFavorite],
  controllerUpdateStatusContact
);

export default router;

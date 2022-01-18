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
import { authGuard } from "../../../middlewares/guard/authGuard";

const router = new Router();

router.get("/", [authGuard, validateQuery], controllerListContacts);

router.get("/:id", [authGuard, validateId], controllerGetContactById);

router.post("/", [authGuard, validateCreate], controllerAddContact);

router.delete("/:id", [authGuard, validateId], controllerRemoveContact);

router.put(
  "/:id",
  [authGuard, validateId, validateUpdate],
  controllerUpdateContact
);

router.patch(
  "/:id/favorite",
  [authGuard, validateId, validateUpdateFavorite],
  controllerUpdateStatusContact
);

export default router;

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
import { userGuard } from "../../../middlewares/guard/userGuard";

const router = new Router();

router.get("/", [userGuard, validateQuery], controllerListContacts);

router.get("/:id", [userGuard, validateId], controllerGetContactById);

router.post("/", [userGuard, validateCreate], controllerAddContact);

router.delete("/:id", [userGuard, validateId], controllerRemoveContact);

router.put(
  "/:id",
  [userGuard, validateId, validateUpdate],
  controllerUpdateContact
);

router.patch(
  "/:id/favorite",
  [userGuard, validateId, validateUpdateFavorite],
  controllerUpdateStatusContact
);

export default router;

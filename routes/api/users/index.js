import { Router } from "express";
import {
  controllerSignup,
  controllerLogin,
  controllerLogout,
  controllerCurrentUser,
  controllerUpdateSubscription,
} from "../../../controllers/users";
import { authGuard } from "../../../middlewares/guard/authGuard";
import {
  validateSignup,
  validateLogin,
  validateUpdateSubscription,
} from "../../../middlewares/validation/authValidation";

const router = new Router();

router.post("/signup", validateSignup, controllerSignup);
router.post("/login", validateLogin, controllerLogin);
router.post("/logout", authGuard, controllerLogout);
router.get("/current", authGuard, controllerCurrentUser);
router.patch(
  "/",
  [authGuard, validateUpdateSubscription],
  controllerUpdateSubscription
);

export default router;

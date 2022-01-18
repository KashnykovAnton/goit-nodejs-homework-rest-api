import { Router } from "express";
import {
  controllerSignup,
  controllerLogin,
  controllerLogout,
  controllerCurrentUser,
  controllerUpdateSubscription,
} from "../../../controllers/auth";
import { authGuard } from "../../../middlewares/guard/authGuard";
import { limiter } from "../../../middlewares/limiter/rateLimit";
import {
  validateSignup,
  validateLogin,
  validateUpdateSubscription,
} from "../../../middlewares/validation/userValidation";

const router = new Router();

router.post(
  "/signup",
  [validateSignup, limiter(5 * 60 * 1000, 2)],
  controllerSignup
);
router.post("/login", validateLogin, controllerLogin);
router.post("/logout", authGuard, controllerLogout);
router.get("/current", authGuard, controllerCurrentUser);
router.patch(
  "/",
  [authGuard, validateUpdateSubscription],
  controllerUpdateSubscription
);

export default router;

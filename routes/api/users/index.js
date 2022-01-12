import { Router } from "express";
import {
  controllerSignup,
  controllerLogin,
  controllerLogout,
  controllerCurrentUser,
  controllerUpdateSubscription,
} from "../../../controllers/users";
import { userGuard } from "../../../middlewares/guard/userGuard";
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
router.post("/logout", userGuard, controllerLogout);
router.get("/current", userGuard, controllerCurrentUser);
router.patch(
  "/",
  [userGuard, validateUpdateSubscription],
  controllerUpdateSubscription
);

export default router;

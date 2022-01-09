import { Router } from "express";
import {
  controllerRegistration,
  controllerLogin,
  controllerLogout,
} from "../../../controllers/auth";
import guard from "../../../middlewares/guard/authGuard";

const router = new Router();

router.post("/registration", controllerRegistration);
router.post("/login", controllerLogin);
router.post("/logout", guard, controllerLogout);

export default router;

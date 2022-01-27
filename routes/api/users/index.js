import { Router } from "express";
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from "../../../controllers/users";
import { authGuard } from "../../../middlewares/guard/authGuard";
import { validateVerify } from "../../../middlewares/validation/userValidation";
import { upload } from "../../../middlewares/upload/upload";

const router = new Router();

router.patch("/avatars", authGuard, upload.single("avatar"), uploadAvatar);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", validateVerify, repeatEmailForVerifyUser);

export default router;

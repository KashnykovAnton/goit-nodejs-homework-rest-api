import { Router } from "express";
import { uploadAvatar } from "../../../controllers/users";
import { authGuard } from "../../../middlewares/guard/authGuard";
import { upload } from "../../../middlewares/upload/upload";

const router = new Router();

router.patch("/avatars", authGuard, upload.single("avatar"), uploadAvatar);

export default router;

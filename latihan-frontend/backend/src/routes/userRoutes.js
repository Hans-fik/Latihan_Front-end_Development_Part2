import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { getUsers, editUser, uploadAvatar } from "../controllers/userController.js";

const router = Router();

router.get("/", verifyToken, getUsers);
router.put("/:id", verifyToken, editUser);
router.post("/avatar", verifyToken, upload.single("file"), uploadAvatar);

export default router;
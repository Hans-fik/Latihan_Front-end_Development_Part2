import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { getItems, createItem, updateItem, deleteItem } from "../controllers/itemController.js";
import { upload } from "../middleware/upload.js"

const router = Router();

// Semua route items dilindungi JWT (sesuai frontend)
router.get("/", verifyToken, getItems);
router.post("/", verifyToken, upload.single("file"), createItem);
router.put("/:id", verifyToken, upload.single("file"), updateItem);
router.delete("/:id", verifyToken, deleteItem);

export default router;
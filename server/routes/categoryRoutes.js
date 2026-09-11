import express from "express";
import { upload } from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("icon"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.put("/:id", verifyToken, upload.single("icon"), updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

export default router;

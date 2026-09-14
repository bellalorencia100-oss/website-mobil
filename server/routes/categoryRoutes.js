import express from "express";
import { upload } from "../middlewares/upload.js";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("icon"),
  createCategory,
);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("icon"),
  updateCategory,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);

export default router;

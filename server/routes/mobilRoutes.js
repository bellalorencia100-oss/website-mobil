import express from "express";
import { upload } from "../middlewares/upload.js";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";

import {
  createMobil,
  getAllMobil,
  getMobilById,
  updateMobil,
  deleteMobil,
} from "../controllers/mobilController.js";

const router = express.Router();
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.array("images", 4),
  createMobil,
);
router.get("/", getAllMobil);
router.get("/:id", getMobilById);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.array("images", 4),
  updateMobil,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteMobil);

export default router;

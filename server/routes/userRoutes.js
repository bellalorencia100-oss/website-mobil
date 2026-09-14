import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;

import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;

import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";



import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.js"


const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);


export default router;



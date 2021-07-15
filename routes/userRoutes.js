import express from "express";
const router = express.Router();

import {
	authUser,
	getUserProfile,
	registerUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/profile").get(auth, getUserProfile);
router.route("/").post(registerUser);

export default router;

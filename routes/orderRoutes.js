import express from "express";
const router = express.Router();

import {
	addOrderItems,
	getOrderItems,
	updateOrderToPaid,
} from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

router.route("/").post(auth, addOrderItems);
router.route("/:id").get(auth, getOrderItems);
router.route("/:id/pay").put(auth, updateOrderToPaid);

export default router;

import express from "express";
const router = express.Router();

import { getCheckoutSession } from "../controllers/paymentController.js";
import { auth } from "../middleware/authMiddleware.js";

router.get("/checkout-session/:orderId", auth, getCheckoutSession);

export default router;

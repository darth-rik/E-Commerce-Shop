import express from "express";
const router = express.Router();

import {
  getProductsByCategory,
  getProductById,
  getTrendingProducts,
  createProductReview,
} from "../controllers/productController.js";
import { auth } from "../middleware/authMiddleware.js";

router.get("/top", getTrendingProducts);

router.route("/").get(getProductsByCategory);

router.route("/:id").get(getProductById);

router.route("/:id/reviews").post(auth, createProductReview);

export default router;

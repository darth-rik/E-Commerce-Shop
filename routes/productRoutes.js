import express from "express";
const router = express.Router();

import {
	getProductsByCategory,
	getProductById,
	getTrendingProducts,
} from "../controllers/productController.js";

router.get("/top", getTrendingProducts);

router.route("/").get(getProductsByCategory);

router.route("/:id").get(getProductById);

export default router;

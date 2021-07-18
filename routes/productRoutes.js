import express from "express";
const router = express.Router();

import {
	getProductsByCategory,
	getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProductsByCategory);

router.route("/:id").get(getProductById);

export default router;

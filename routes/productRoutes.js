import express from "express";
const router = express.Router();

import Product from "../models/productModel.js";

router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.json(product);
		} else {
			throw Error("Product not Found");
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

export default router;

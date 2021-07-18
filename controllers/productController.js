import Product from "../models/productModel.js";

export const getProductsByCategory = async (req, res) => {
	try {
		const category = req.query.category;
		let products;

		if (category === "all") {
			products = await Product.find({});
		} else {
			products = await Product.find({ category });
		}

		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

export const getProductById = async (req, res) => {
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
};

export const getTrendingProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort({ rating: -1 }).limit(5);

		res.json(products);
	} catch (error) {
		res.status(404).json({ message: "Server Error" });
	}
};

import Product from "../models/productModel.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const search = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    let products;

    if (category === "all") {
      products = await Product.find({ ...search });
    } else {
      products = await Product.find({ category, ...search });
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

export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      res.status(201).json({ message: "Review added" });
    } else {
      res.status(400).json("No product found");
    }
  } catch (error) {
    res.status(404).json({ message: error?.message || "Server Error" });
  }
};

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

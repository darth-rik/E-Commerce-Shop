import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import handleCheckoutInfo from "./controllers/webhooksController.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.post(
  "/webhooks-checkout",
  express.raw({ type: "application/json" }),
  handleCheckoutInfo
);

app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

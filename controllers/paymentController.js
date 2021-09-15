import Order from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    const url = req.header("Referer");

    //Create checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/order/${req.params.orderId}`,
      cancel_url: `http://localhost:3000/order/${req.params.orderId}`,

      mode: "payment",

      line_items: order.orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [`${item.image}`],
          },
        },
        quantity: item.qty,
      })),
    });

    //Send response

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

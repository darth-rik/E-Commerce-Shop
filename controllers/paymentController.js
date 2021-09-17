import Order from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "name email"
    );
    const url = req.header("Referer");
    const shippingRate =
      order.shippingPrice > 0.0
        ? (order.shippingPrice / order.orderItems.length) * 100
        : 0;

    //Create checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.hostname}:3000/order/${order._id}`,
      cancel_url: `${req.protocol}://${req.hostname}:3000/order/${order._id}`,

      mode: "payment",
      customer_email: order.user.email,
      client_reference_id: req.params.orderId,

      line_items: order.orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount:
            item.price * 100 +
            (order.taxPrice / order.orderItems.length) * 100 +
            shippingRate,

          product_data: {
            name: item.name,
            // images: [`${item.image}`],
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

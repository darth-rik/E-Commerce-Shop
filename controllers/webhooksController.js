import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const updateOrder = async (session) => {
  if (session.payment_status === "paid") {
    const order = await Order.findById(session.client_reference_id);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: session.id,
      status: session.payment_status,
      update_time: Date.now(),
      email_address: session.customer_email,
    };

    await order.save();
  }
};

const handleCheckoutInfo = (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    updateOrder(event.data.object);
  }

  res.status(200).json({ received: true });
};

export default handleCheckoutInfo;

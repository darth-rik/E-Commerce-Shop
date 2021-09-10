import Order from "../models/orderModel.js";

export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({
        message: "No order items",
      });
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user.id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrderItems = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(400).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

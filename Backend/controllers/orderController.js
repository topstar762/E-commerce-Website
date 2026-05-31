const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems: req.body.orderItems,
      totalPrice: req.body.totalPrice,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin - get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin - update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
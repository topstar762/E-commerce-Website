const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// user routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
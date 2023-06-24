const Orders = require("../models/orders");

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: err.message });
  }
}

async function getOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Orders.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving order", error: err.message });
  }
}

module.exports = {
  getAllOrders,
  getOrder,
};

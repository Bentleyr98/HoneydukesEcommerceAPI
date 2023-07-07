const Orders = require("../models/orders");

// Get all orders
async function getAllOrders(req, res) {
  // #swagger.tags= ['Orders']
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
  // #swagger.tags= ['Orders']
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

async function createOrder(req, res) {
  // #swagger.tags= ['Orders']
  try {
    const {
      userEmail,
      orderDate,
      shippingAddress,
      billingAddress,
      paymentMethod,
      orderStatus,
      productID,
      quantity,
      price,
      additionalDetails,
    } = req.body;

    const newOrder = new Orders({
      userEmail,
      orderDate,
      shippingAddress,
      billingAddress,
      paymentMethod,
      orderStatus,
      orderedProducts: [
        {
          productID,
          quantity,
          price,
        },
      ],
      additionalDetails,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
}

async function updateOrder(req, res) {
  // #swagger.tags= ['Orders']
  try {
    const orderId = req.params.id;
    const updatedOrder = {
      userEmail: req.body.userEmail,
      orderDate: req.body.orderDate,
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      paymentMethod: req.body.paymentMethod,
      orderStatus: req.body.orderStatus,
      productID: req.body.productID,
      quantity: req.body.quantity,
      price: req.body.price,
      additionalDetails: req.body.additionalDetails,
    };

    const order = await Orders.findByIdAndUpdate(orderId, updatedOrder, {
      new: true,
    });

    if (!order) {
      res.status(404).json({ err: "Order not found" });
      return;
    } else {
      res.status(204).json(order);
    }
  } catch (err) {
    res.status(500).json({ err: "Error updating order" });
  }
}

async function deleteOrder(req, res) {
  // #swagger.tags= ['Orders']
  try {
    const orderId = req.params.id;
    const deletedOrder = await Orders.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", err: err.message });
  }
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

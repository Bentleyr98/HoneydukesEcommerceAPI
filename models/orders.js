const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  orderDate: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, required: true },
  numItemsOrdered: { type: Number, required: true },
  additionalDetails: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);

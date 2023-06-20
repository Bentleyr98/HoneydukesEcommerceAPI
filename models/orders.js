const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  orderDate: { type: Date, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, required: true },
  orderedProducts: [
    {
      productID: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  additionalDetails: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);

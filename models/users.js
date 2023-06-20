const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  paymentMethods: { type: [String], required: true },
});

module.exports = mongoose.model('User', userSchema);

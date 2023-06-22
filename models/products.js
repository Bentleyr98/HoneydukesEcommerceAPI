const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // productID: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantityInStock: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  images: { type: [String], required: true },
  otherDetails: { type: String },
});

module.exports = mongoose.model('Product', productSchema);

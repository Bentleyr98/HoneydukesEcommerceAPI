const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  productID: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  otherDetails: { type: String },
});

module.exports = mongoose.model('Review', reviewSchema);

const Reviews = require('../models/reviews');

const getAllReviews = async (req, res, next) => {
    // #swagger.tags= ['Reviews']
  try {
    const reviews = await Reviews.find();
    res.status(200).json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({
        message: 'Oh no! Looks like we lost all the reviews...',
        error: err.message,
      });
  }
};

async function getReview(req, res) {
  // #swagger.tags= ['Reviews']
  try {
    const review_id = req.params.id;
    const review = await Reviews.findById(review_id);
    if (review) {
      res.status(200).json(review);
    } else {
      return res.status(404).json({ message: '404!! Review not found' });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error retrieving review. Someone must've removed it.",
        error: err.message,
      });
  }
}

const createReview = async (req, res, next) => {
  // #swagger.tags= ['Reviews']
  try {
    const { userEmail, productID, reviewText, rating, date, otherDetails } =
      req.body;
    const newReview = new Reviews({
      userEmail,
      productID,
      reviewText,
      rating,
      date,
      otherDetails,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Problem creating review.', error: err.message });
  }
};

const updateReview = async (req, res, next) => {
  // #swagger.tags= ['Reviews']
  try {
    const review_id = req.params.id;
    const updatedReview = {
      userEmail: req.body.userEmail,
      productID: req.body.productID,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
      date: req.body.date,
      otherDetails: req.body.otherDetails,
    };
    const review = await Reviews.findByIdAndUpdate(review_id, updatedReview, {
      new: true,
    });
    if (!review) {
      res.status(404).json({ error: '404 Review not found' });
      return;
    } else {
      res.status(204).json(review);
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Uh oh. Can't update that review.",
        error: err.message,
      });
  }
};

const deleteReview = async (req, res, next) => {
  // #swagger.tags= ['Reviews']
  try {
    const review_id = req.params.id;
    const deletedReview = await Reviews.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting review', error: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
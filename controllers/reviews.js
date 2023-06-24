const Reviews = require('../models/reviews');


const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.find();
        res.status(200).json(reviews);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error retrieving all reviews", error: err.message });
      }
    }


async function getReview(req, res) {
    try {
        const review_id = req.params.id;
        const review = await Reviews.findById(review_id);
        if (review) {
            res.status(200).json(review);
        } else {
            return res.status(404).json({message: "Review not found"});
        }
        
    } catch (err) {
        res.status(500)
        .json({ message:"Error retrieving review", error: err.message});
    }
    }

const createReview = async (req, res, next) => {
    return
    }


const updateReview = async (req, res, next) => {
    return
    }

const deleteReview = async (req, res, next) => {
    return
    }

module.exports = {getAllReviews, getReview, createReview, updateReview, deleteReview }
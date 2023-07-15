const router = require('express').Router();
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');
const { requiresAuth } = require('express-openid-connect');

router.get('/', getAllReviews);
router.get('/:id', getReview);
router.post('/', requiresAuth(), createReview);
router.put('/:id', requiresAuth(), updateReview);
router.delete('/:id', requiresAuth(), deleteReview);

module.exports = router;

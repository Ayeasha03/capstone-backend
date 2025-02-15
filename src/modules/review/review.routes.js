const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('./review.controller');
const auth = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { reviewValidation } = require('./review.validation');

router.post('/', auth, validate(reviewValidation), addReview);
router.get('/:propertyId', getReviews);

module.exports = router ;

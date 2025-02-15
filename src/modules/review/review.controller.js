const Review = require('../../../Database/models/review.schema');
const catchAsyncError = require('../../utils/catchAsyncError');
const AppError = require('../../utils/AppError');

exports.addReview = catchAsyncError(async (req, res, next) => {
  const { property, rating, comment } = req.body;

  const review = new Review({
    user: req.user.id,
    property,
    rating,
    comment,
  });

  await review.save();
  res.status(201).json({
    success: true,
    data: review,
  });
});

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const reviews = await Review.find({ property: req.params.propertyId }).populate('user', ['name']);
  res.json({
    success: true,
    results: reviews.length,
    data: reviews,
  });
});

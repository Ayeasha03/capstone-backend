const Joi = require('joi');

const reviewValidation = Joi.object({
  property: Joi.string().required().trim(),
  rating: Joi.number().required(),
  comment: Joi.string().optional().trim(),
});

module.exports = { reviewValidation };

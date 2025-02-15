const Joi = require('joi');

exports.propertyValidation = Joi.object({
  address: Joi.string().required(),
  areaType: Joi.string().valid('Residential', 'Commercial').required(),
  nearbySchools: Joi.array().items(Joi.string()).required(),  // Ensure it expects an array of strings
  description: Joi.string().required(),
  price: Joi.number().required(),
  virtualTour: Joi.string().uri().optional(),
  images: Joi.array().items(Joi.any()).optional()  // Adjust this according to how you handle images
});

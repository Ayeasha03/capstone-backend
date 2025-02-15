const Joi = require('joi');

const userRegisterValidation = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
  role: Joi.string().valid('user', 'agent').required(),
});

const userLoginValidation = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
});

module.exports = { userRegisterValidation, userLoginValidation };

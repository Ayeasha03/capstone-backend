const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    // Parse nearbySchools from JSON string to array if it exists
    if (req.body.nearbySchools) {
      try {
        req.body.nearbySchools = JSON.parse(req.body.nearbySchools);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid format for nearbySchools' });
      }
    }

    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.map((ele) => ({
        message: ele.message,
        field: ele.path[0],
      }));
      return res.status(400).json(errors);
    }
    next();
  };
};

module.exports = { validate };
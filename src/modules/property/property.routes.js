const express = require('express');
const router = express.Router();
const { addProperty, getProperties, getProperty, searchProperties } = require('./property.controller');
const protect = require('../../middleware/auth.middleware');  // Ensure correct import
const upload = require('../../middleware/multer');
const { validate } = require('../../middleware/validate');
const { propertyValidation } = require('./property.validation');

router.post('/', protect, upload.array('images', 10), validate(propertyValidation), addProperty);
router.get('/', getProperties);
router.get('/search', searchProperties);
router.get('/:id', getProperty);

module.exports = router;

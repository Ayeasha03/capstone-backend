const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./auth.controller');
const { validate } = require('../../middleware/validate');
const { userRegisterValidation, userLoginValidation } = require('./auth.validation');

router.post('/register', validate(userRegisterValidation), registerUser);
router.post('/login', validate(userLoginValidation), loginUser);

module.exports = router;  // Export router directly

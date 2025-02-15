const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = function (req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token:', token);  // Log the token
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);  // Use the correct environment variable
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);  // Log any errors
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
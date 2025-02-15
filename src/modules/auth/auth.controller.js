const Auth = require('../../../Database/models/auth.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const catchAsyncError = require('../../utils/catchAsyncError');  // Import catchAsyncError

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;  // Ensure these fields match the payload sent from frontend

  // Check if user already exists
  let user = await Auth.findOne({ email });

  if (user) {
    return next(new AppError('User already exists with this email', 400));
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  user = await Auth.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: '1d' });
  res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await Auth.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Generate and send token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: '1d' });
  res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
});


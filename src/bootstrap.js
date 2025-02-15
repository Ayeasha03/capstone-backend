const authRouter = require('./modules/auth/auth.routes');  // Ensure correct import
const propertyRouter = require('./modules/property/property.routes');
const reviewRouter = require('./modules/review/review.routes');
const userRouter = require('./modules/user/user.routes');
const AppError = require('./utils/AppError');

function bootstrap(app) {
  app.use('/api/v1/auth', authRouter);  // Correctly use the router
  app.use('/api/v1/properties', propertyRouter);
  app.use('/api/v1/reviews', reviewRouter);
  app.use('/api/v1/user', userRouter);

  app.all('*', (req, res, next) => {
    next(new AppError('Endpoint does not exist', 404));
  });

  // Uncomment if you have global error handling setup
  // app.use(globalErrorHandling);
}

module.exports = { bootstrap };

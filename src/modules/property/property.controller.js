const Property = require('../../../Database/models/property.schema');
const ApiFeatures = require('../../utils/ApiFeatures');
const catchAsyncError = require('../../utils/catchAsyncError');
const AppError = require('../../utils/AppError');

exports.addProperty = catchAsyncError(async (req, res, next) => {
  const { address, areaType, nearbySchools, description, price, virtualTour } = req.body;
  const images = req.files.map(file => file.path);

  console.log('Received nearbySchools:', nearbySchools);

  // Parse nearbySchools from JSON string to array
  let parsedNearbySchools = [];
  try {
    parsedNearbySchools = nearbySchools ? JSON.parse(nearbySchools) : [];
    console.log('Parsed nearbySchools:', parsedNearbySchools);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid format for nearbySchools' });
  }

  const property = new Property({
    address,
    areaType,
    nearbySchools: parsedNearbySchools,
    description,
    price,
    agent: req.user.id,
    images,
    virtualTour,
  });

  await property.save();
  res.status(201).json({
    success: true,
    data: property,
  });
});

exports.getProperties = catchAsyncError(async (req, res, next) => {
  const features = new ApiFeatures(Property.find(), req.query)
    .filteration()
    .sort()
    .pagination()
    .fields();
  const properties = await features.mongooseQuery;
  res.json({
    success: true,
    results: properties.length,
    data: properties,
  });
});

exports.getProperty = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id).populate('agent', ['name']);
  if (!property) {
    return next(new AppError('Property not found', 404));
  }
  res.json({
    success: true,
    data: property,
  });
});

exports.searchProperties = catchAsyncError(async (req, res, next) => {
  const { address, areaType, minPrice, maxPrice } = req.query;

  let filter = {};
  if (address) filter.address = new RegExp(address, 'i');
  if (areaType) filter.areaType = areaType;
  if (minPrice) filter.price = { ...filter.price, $gte: minPrice };
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

  const properties = await Property.find(filter).populate('agent', ['name']);
  res.json({
    success: true,
    results: properties.length,
    data: properties,
  });
});
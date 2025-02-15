const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  areaType: {
    type: String,
    required: true,
  },
  nearbySchools: {
    type: [String],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String],
  },
  virtualTour: {
    type: String,
  },
});

module.exports = mongoose.model('Property', PropertySchema);
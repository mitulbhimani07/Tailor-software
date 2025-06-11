const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  garmentType: { type: String, default: 'SHIRT' }, // Default to SHIRT for top, PANT for bottom
  length: String,
  shoulder: String,
  sleeve: {
    length: String,
    round1: String,
    round2: String
  },
  chest: {
    measurement: String,
    loose: String
  },
  waist: {
    measurement: String,
    loose: String
  },
  seat: {
    measurement: String,
    loose: String
  },
  collar: String,
  cuff: String,
  frontRise: String,
  thigh: String,
  knee: String,
  calf: String,
  ankle: String,
  notes: String
});

const TailorSchema = new mongoose.Schema({
  mobile_no: {
    type: String,
    required: true,
    unique: true
  },
  customer_name: {
    type: String,
    required: true
  },
  topMeasurements: measurementSchema,
  bottomMeasurements: {
    ...measurementSchema.obj,
    garmentType: { type: String, default: 'PANT' }
  },
  options: [{
    type: String
  }],
  height: String,
  weight: String,
  totalAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
TailorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add static methods for better query handling
TailorSchema.statics.findByMobile = function(mobile) {
  return this.findOne({ mobile_no: mobile });
};

TailorSchema.statics.deleteByMobile = function(mobile) {
  return this.deleteOne({ mobile_no: mobile });
};

module.exports = mongoose.model('Tailor', TailorSchema);
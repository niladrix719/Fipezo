const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: {
    type: Number,
    min: 10,
    uqique: true,
    required: true
  },
  otp: {
    type: Number,
    required: true
  }
});

const otpCollection = new mongoose.model('otpcollection', otpSchema);

module.exports = otpCollection;
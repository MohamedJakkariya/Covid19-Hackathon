const mongoose = require('mongoose');

// For Doctor
const DoctorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      default: false,
    },
  });
  
  const Doctor = mongoose.model('doctor', DoctorSchema);
  
  module.exports = Doctor;
  
const mongoose = require('mongoose');
// For hospital
const HospitalSchema = new mongoose.Schema({
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
    hospitalName: {
        type: String
    },
    hospitalAddress: {
        type: String
    }
  });
  
  const Hospital = mongoose.model('hospital', HospitalSchema);
  
  module.exports = Hospital;
  
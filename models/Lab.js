const mongoose = require('mongoose');


// For lab result
const LabSchema = new mongoose.Schema({
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
    isCheck: {
      type: Boolean,
      default: false,
    },
  });
  
  const Lab = mongoose.model('lab', LabSchema);
  
  module.exports = Lab;
  
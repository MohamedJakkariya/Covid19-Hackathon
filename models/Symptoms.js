const mongoose = require('mongoose');

// For Symptoms
const SymptomsSchema = new mongoose.Schema({
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
  symptomName: {
      type: String,
  },
  days: {
      type: Number
  },
  tablets:{
      type: String
  },
  hospitalGo:{
      type: Boolean
  },
  hopitalName:{
      type: String
  }
});

const Symptoms = mongoose.model('symptoms', SymptomsSchema);

module.exports = Symptoms;

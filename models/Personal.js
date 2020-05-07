const mongoose = require('mongoose');

//   For Personal
const PersonalSchema = new mongoose.Schema({
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

const Personal = mongoose.model('personal', PersonalSchema);

module.exports = Personal;


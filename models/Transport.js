const mongoose = require('mongoose');

//   For Transport
const TransportSchema = new mongoose.Schema({
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
  transportMonth: {
    type: Number,
  },
  transportType: {
    type: String,
  },
});

const Transport = mongoose.model('transport', TransportSchema);
module.exports = Transport;

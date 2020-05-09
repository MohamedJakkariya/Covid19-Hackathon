const mongoose = require('mongoose');

//   For Transport
const TollSchema = new mongoose.Schema({
  state:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true
  },
});

const Toll = mongoose.model('tollnumbers', TollSchema);
module.exports = Toll;

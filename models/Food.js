const mongoose = require('mongoose');
// For Food
const FoodSchema = new mongoose.Schema({
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
    currentAddress: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      default: false,
    },
    foodmembers: {
      type: String
    },
    foodlist: {
        type: String
    }
  });
  
  const Food = mongoose.model('food', FoodSchema);
  
  module.exports = Food;
  
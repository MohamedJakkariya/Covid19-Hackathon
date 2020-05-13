const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  education: {
    type: String,
  },
  address: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpire: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isVolunteer:
    {
      type: Boolean,
      default: false,
    },
  request: {
    type: Boolean,
    default: false
  },
  aadhar: {
    type: Number,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  profile: {
    type: String,
    default: 'modal-profile.jpg'
  },
  lat: {
    type: Number
  },
  lang:{
    type: Number
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

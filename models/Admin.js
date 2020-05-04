const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  type : {
    type: String,
    default: 'Admin'
  }
});


const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;

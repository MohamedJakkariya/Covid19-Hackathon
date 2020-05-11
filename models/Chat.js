const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true,
  },
  time: {
     type: Date,
     default: Date.now()
  }
});


const Chat = mongoose.model('chatmsg', ChatSchema);

module.exports = Chat;

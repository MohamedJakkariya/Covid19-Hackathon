const Chat = require('../models/Chat');

exports.insertMsgToChat = (chatObj) => {
  const newData = new Chat({
    username: chatObj.name,
    msg: chatObj.text,
  });

  newData
    .save()
    .then((user) => {
      // Profile submit to verification
      // mail.informToAdmin(newData.email);
      console.log('inserted');
      return false;
    })
    .catch((err) => console.log(err));
};

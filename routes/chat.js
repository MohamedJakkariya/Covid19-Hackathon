const chatNow = (io) => {

    // set global room id 
    let room;

  // For chat application
  io.on('connection', (socket) => {
    // connect to default admin room
    // socket.on('joinRoom', (userId) => {
    //    room = userId;
    //    console.log(room);
    // });

    socket.on('send_msg', (msg) => {
      // send the receive msg to all users
      socket.broadcast.emit('receive_msg', msg);
    });

    // User disconnection 
    socket.on('disconnect', () => {});
  });
};

module.exports = {
  chatNow,
};

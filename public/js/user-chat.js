// Initialize the socket.io-client server for bi-directional communicaiton
const socket = io('http://localhost:4000');
const msgContainer = document.querySelector('.chat-messages');

// put the unique id of each user
console.log(id);

socket.emit('joinRoom', id);

// Received msg
socket.on('receive_msg', (msg) => {
  console.log(msg);
  outputMsg(msg, 'byOthers');
});

$(document).ready(() => {
  $('#msg-form').on('submit', (e) => {
    e.preventDefault();

    // Get time interms of 12 hours with am or pm
    const time = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    let text = $('#msg').val();
    // convert object into msg , time and username 
    let userMsg = {
      name: username,
      time,
      text
    };

    console.log(userMsg);

    if(text !== ''){
        socket.emit('send_msg',userMsg);

        // Set output msg to UI 
        outputMsg(userMsg);
    } 

    // Reset input field
    $('#msg').val('');
    // Focus into type msg
    $('#msg').focus();

    // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight + 100;
    return false;
  });
});

const outputMsg = (msg, className) => {

    if(className === 'byOthers'){
      // Append msg into chat-box 
      $('.chat-messages').append(
        `<div class="msg-box">
        <p>${msg.time} <span> ${msg.name} <span class="fa fa-user-secret"></span></span></p>
        <div class="msg">
        <img src="../img/modal-profile.jpg" alt="">
        <p  class="bg-dark text-white pbefore">${msg.text}</p>
        </div>
      </div>`
      );
          // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight + 100;
    }else{
        // Append msg into chat-box 
      $('.chat-messages').append(
        `<div class="msg-box">
        <p>${msg.time} <span> ${msg.name} </span></p>
        <div class="msg">
        <img src="../img/modal-profile.jpg" alt="">
        <p>${msg.text}</p>
        </div>
      </div>`
      );

          // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight + 100;
    }
    
}
// Initialize the socket.io-client server for bi-directional communicaiton
const socket = io('http://localhost:4000');
const msgContainer = document.querySelector('.chat-messages');

// put the unique id of each user
let id = 1000;

socket.emit('joinRoom', id);

// Received msg
socket.on('receive_msg', (msg) => {
  console.log(msg);
  outputMsg(msg);
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
    console.log({text, time});

    if(text !== ''){
        socket.emit('send_msg',{text, time});

        // Set output msg to UI 
        outputMsg({text, time});
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

const outputMsg = (msg) => {
    // Append msg into chat-box 
    $('.chat-messages').append(
        `<div class="msg-box">
        <p>${msg.time}</p>
        <div class="msg">
            <img src="../img/profile2.jpg" alt="">
            <p>${msg.text}</p>
        </div>
    </div>`
    );
}
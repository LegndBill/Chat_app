var socket = io();

socket.on('connect', () => {
  console.log('connected to server');

});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox =  jQuery('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()

  }, function () {
     messageTextbox.val('')
  });
});

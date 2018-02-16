var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
  socket.emit('createMessage',{
    from: 'Joe',
    text: 'I hate you'
  });
});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage',message);
});

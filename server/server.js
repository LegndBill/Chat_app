const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./Utils/message');
const port = process.env.PORT || 3000;


const publicPath = path.join(__dirname, '..', 'public')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();

      // from: message.from,
      // text: message.text,
      // createdAt: new Date().getTime()


  });

  socket.on('disconnect', () =>{
    console.log('user was disconnected');
  });
});
server.listen(port, () => {
  console.log(`server is on ${port}`)
});

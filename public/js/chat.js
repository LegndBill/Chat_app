var socket = io();

function scrollToBottom () {
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child')

var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();
if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
  messages.scrollTop(scrollHeight);
}
}

socket.on('connect', () => {
  console.log('connected to server');

});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
  // console.log('newMessage',message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
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

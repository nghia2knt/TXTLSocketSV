var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
const cors = require("cors");


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('sendMess', (msg) => {
    console.log('message: ' + msg);
    io.emit(msg.toUser.email, msg);
    io.emit(msg.fromUser.email, msg);
    io.emit('adminMess', msg);

  });
});


http.listen(3009, function () {
  console.log('listening on *:3009');
});
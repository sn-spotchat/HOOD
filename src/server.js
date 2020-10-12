var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3001, () => {
  console.log('listening on *:3000');
});
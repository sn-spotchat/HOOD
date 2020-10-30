var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on("connection", socket => {
  socket.emit("your id", socket.id);
  
  socket.on("join room", data =>{
    socket.join(data.roomName);
    io.to(data.roomName).emit("enter room",data.user);
    console.log("join"+data.roomName);
  })

  socket.on("leave room", data =>{
    socket.leave(data.roomName);
    io.to(data.roomName).emit("leaved room", data.user);
    console.log("leave"+data.roomName);
  })

  socket.on("send message", data=>{
    io.to(data.roomName).emit("message", data)
    console.log("received msg");
  })
})

http.listen(3001, ()=>{
  console.log('listening on *:3000');
});
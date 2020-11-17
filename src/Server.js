var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on("connection", socket => {
  socket.emit("your id", socket.id);
  
  socket.on("join room", data =>{
    socket.join(data.roomId);
    io.to(data.roomId).emit("enter room",data.user);
    console.log("join"+data.roomId);
  })
  socket.on("rejoin room", data =>{
    socket.join(data.roomId);
  })
  socket.on("leave room", data =>{
    socket.leave(data.roomId);
    io.to(data.roomId).emit("leaved room", data.user);
    console.log("leave"+data.roomId);
  })

  socket.on("send message", data=>{
    io.to(data.roomId).emit("message", data)
    console.log("received msg");
  })
})

http.listen(3001, ()=>{
  console.log('listening on *:3001');
});
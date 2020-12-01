var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on("connection", socket => {
  socket.emit("your id", socket.id);

  socket.on("join room", data =>{//새로운 방에 들어갈 때
    socket.join(data.chatroom_id);
    io.to(data.chatroom_id).emit("enter room",data.user_id);
    console.log("join"+data.chatroom_id);
  })
  socket.on("rejoin room", data =>{//기존에 등록된 채팅방에 들어갈 때
    socket.join(data.chatroom_id);
  })
  socket.on("leave room", data =>{
    socket.leave(data.chatroom_id);
    io.to(data.chatroom_id).emit("leaved room", data.user_id);
    console.log("leave"+data.chatroom_id);
  })

  socket.on("send message", data=>{
    io.to(data.chatroom_id).emit("message", data)
    console.log("received msg");
  })
})

http.listen(3001, ()=>{
  console.log('listening on *:3001');
});
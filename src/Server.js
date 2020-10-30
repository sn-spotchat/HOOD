const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const port = 3001;

//이 파일은 따로 실행을 시켜줘야함. 이 디렉토리에서는 없어도 됨

io.on("connection", socket => {
  socket.emit("your id", socket.id);

  socket.on("send message", (body, roomName)=>{
    //io.to(body.roomName).emit("message", body.message);
    io.to(roomName).emit("message", body)
  })

  socket.on("join room", roomName=>{
    console.log("enter "+roomName);
    socket.join(roomName);
  })
})

server.listen(port, ()=> console.log("server is running on port ".port));
import firebase from 'firebase';
import "firebase/firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDNe_G-z5EPOI7-t7xjEHhA7Fx8yRGXS74",
    authDomain: "hood-sgtmi.firebaseapp.com",
    databaseURL: "https://hood-sgtmi.firebaseio.com",
    projectId: "hood-sgtmi",
    storageBucket: "hood-sgtmi.appspot.com",
    messagingSenderId: "80145957779",
    appId: "1:80145957779:web:e72842d0c7605211795e66",
    measurementId: "G-TPHYH6LN5T"
  };

firebase.initializeApp(firebaseConfig);
  
const database = firebase.database();

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
  socket.on("rejoin room", data =>{
    socket.join(data.roomName);
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
  console.log('listening on *:3001');
});
/*var app = require('express')();
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
  console.log('listening on *:3001');
});
*/
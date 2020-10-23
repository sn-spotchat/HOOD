import React, { useState, useEffect } from 'react'; // import 로 useState 를 불러온다!
import SocketIOClient from 'socket.io-client';
import { database } from '../firebase';

var socket = SocketIOClient('http://localhost:3000');

socket.on('chat message', (msg)=>{
  console.log(msg);
  //database.ref('/chatroomlist/sinchon').update({ chatcount: chatCount+1});// 채팅받으면 chatCount와 데이터베이스 관계확인하기 위해 삽입
});

const Test = () => {
  const [chatCount, setChatCount] = useState(0);
  useEffect(() =>{
  database.ref('/chatroomlist/sinchon').once("value", function(snapshot){ 
    console.log("in first"); 
    setChatCount(snapshot.val().chatcount); //값이 바뀌었으니 Test를 다시 소환해서 렌더링한다.
    console.log("in",chatCount);//그래서 이게 밖에 구문보다 더 늦게 나옴
  });}, []);

  return (
    <div>
      <p>
        <b>{chatCount}</b> 채팅수
      </p>
      <form id='chat' onSubmit={(e)=>{
      e.preventDefault();
      socket.emit('chat message', e.target.m.value);
    }}>
      <input id="m" autoComplete="off" /><button>Send</button>
      
    </form>
    </div>
  );
};

export default Test;
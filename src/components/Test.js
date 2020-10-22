import React, { useState, useEffect } from 'react'; // import 로 useState 를 불러온다!
import SocketIOClient from 'socket.io-client';
import { database } from '../firebase';

const Test = () => { // 함수형 컴포넌트 시작~!
  const [chatCount, setChatCount] = useState(0);
  var socket = SocketIOClient('http://localhost:3001');
  useEffect(() =>{
  database.ref('/chatroomlist/sinchon').once("value", function(snapshot){ 
    console.log("in first"); 
    setChatCount(snapshot.val().chatcount); //값이 바뀌었으니 Test를 다시 소환해서 렌더링한다.
    console.log("in",chatCount);//그래서 이게 밖에 구문보다 더 늦게 나옴
  });}, []);

  useEffect(()=>{
    socket.on('chat message', (msg)=>{
        console.log("in chat");
        console.log(chatCount);
        setChatCount(chatCount+1);
        //database.ref('/chatroomlist/sinchon').update({ chatcount: chatCount+1});// 채팅받으면 chatCount와 데이터베이스 관계확인하기 위해 삽입
    });
  },[]);

  return (
    <div>
      <p>
        <b>{chatCount}</b> 채팅수
      </p>
      <form onSubmit={(e)=>{
        e.preventDefault();
        //database.ref('/chatroomlist/sinchon').set({chatcount: chatCount+1, position: 0}); //데이터베이스랑 제대로 연결된건지 확인하기 위해 사용
        //setChatCount(chatCount+1);
        console.log("hello");
      }}>
      <input type="text" name="chat"></input>
      <input type="submit" ></input>
      </form>
    </div>
  );
};

export default Test;
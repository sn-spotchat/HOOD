import React, { useState, useEffect } from 'react'; // import 로 useState 를 불러온다!
import SocketIOClient from 'socket.io-client';
import { database } from '../firebase';

const Test = () => { // 함수형 컴포넌트 시작~!
  const [value, setValue] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  var socket = SocketIOClient('http://localhost:3001');
//  useEffect(()=>{
    database.ref('/chatroomlist/sinchon').on("value", function(snapshot){  
      setChatCount(snapshot.val().chatcount);
      console.log("in first");
    });
//  },[]);
  console.log("in second");
  console.log(chatCount);
  /*database.ref('/').set({
    chatroomlist:{
      sinchon: {
        chatcount:1,
        position:0
      },
      daeheong:{
        chatcount:1,
        position:0
      },
      yeomri:{
        chatcount:1,
        position:0
      },
      gongdeok:{
        chatcount:1,
        position:0
      },
      yonggang:{
        chatcount:1,
        position:0
      },
      sinsu:{
        chatcount:1,
        position:0
      },
      sogang:{
        chatcount:1,
        position:0
      }
    },
    chatdata:{
      sinchon: {
        0:{user: "admin", msg:"welcome here is sinchon chatting room", date:"2020-"}
      },
      daeheong:{
        0:{user: "admin", msg:"welcome here is daeheong chatting room", date:"2020-"}
      },
      yeomri:{
        0:{user: "admin", msg:"welcome here is yeomri chatting room", date:"2020-"}
      },
      gongdeok:{
        0:{user: "admin", msg:"welcome here is gongdeok chatting room", date:"2020-"}
      },
      yonggang:{
        0:{user: "admin", msg:"welcome here is yonggang chatting room", date:"2020-"}
      },
      sinsu:{
        0:{user: "admin", msg:"welcome here is sinsu chatting room", date:"2020-"}
      },
      sogang:{
        0:{user: "admin", msg:"welcome here is sogang chatting room", date:"2020-"}
      }
    }
  });
  function count(){
    setChatCount(chatCount+1);
  }*/
  /*useEffect(()=>{
    socket.on('chat message', (msg)=>{
        //count();
        console.log("in chat");
        console.log(chatCount);
        database.ref('/chatdata/sinchon').update({
          [chatCount]:{
            user: "이윤석",
            msg:"hello",
            date: Date()}
        });
    });
  },[]);*/
    //database.ref('/').on('value', (snapshot)=>{
    //    console.log("in database");
    //    console.log(snapshot.val());
    //});
    

 // database.ref('/messages').on('value', (snapshot) => { 
 //   setMessage({messages: snapshot.val()});
 // });
  return (
    <div>
      <p>
        <b>{value}</b> 만큼 사랑합니다...
      </p>
      <button onClick={(e) => {
          e.preventDefault();
          setValue(value + 1);}}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
      
      <button onClick={() => {console.log("hello");}}>
        modal btn
      </button>
    </div>
  );
};

export default Test;
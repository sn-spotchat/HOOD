import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import { database } from '../firebase';
import "./Test.css";
import * as actionType from '../modules/action';
//지금은 채팅방이 1개인 임시지만, 후에 socket.join을 이용해서 여러개의 방을 만들 생각임 
const Test = (props) =>{
  const [yourID, setYourID] = useState();//나의 아이디
  const [socketID, setSocketID] = useState();
  const [messages, setMessages] = useState([]);//모든 메시지(server로부터 받은 모든 메시지)
  const [message, setMessage] = useState("");//내가 입력한 메시지
  
  const socketRef = useRef();
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatreducer, []);
  const date = new Date();
//username을 소켓아이디로 해서 매번 다름. 수정해야함
  function writeMsgData(name, msg, chatroomname) {
    database.ref('chatlastdata/'+chatroomname).once('value', (snapshot) =>{
      var Id = snapshot.val().id+1;
      var Date = date.getFullYear()+"."+date.getMonth()+"."+date.getDay();
      var Time = date.getHours()+":"+date.getMinutes();
      database.ref('chatdata/' + chatroomname + '/' + Id).set({
        username: name,
        message: msg,
        date: Date,
        time: Time
      });
      database.ref('chatlastdata/' + chatroomname).set({
        id: Id,
        username: name,
        message: msg,
        date: Date,
        time: Time
      });
    });
  }
  function readMsgDate(chatroomname){
    database.ref('chatdata/').child(chatroomname).once('value', (snapshot) =>{
      const msgdata = snapshot.val();
      for(var i = 0; i<snapshot.numChildren(); i++){
        console.log(msgdata[i]);
        setMessages(oldMsgs => [...oldMsgs, msgdata[i]]);
      }
    });
  }
//
  useEffect(() => {
    
    var flag=false;
    for(var i = 0; i < chat.chatlist.length; i++){
      const temp = chat.chatlist[i].name;
      if(temp === props.chatRoomName){
        flag = true; break;
      }
    }
    const dataObject = {
      user: yourID,
      roomName: props.chatRoomName,
    };
    if(chat.newchat === true){//새롭게 들어가는 방인 경우
      console.log("new");
      socketRef.current.emit("join room", dataObject);
    }
    else{//chat목록에 있는 방인 경우
      //저장해 놓은 채팅방의 채팅 내역을 불러오는 내용 작성
      console.log("old");
      socketRef.current.emit("rejoin room", dataObject);
      readMsgDate(props.chatRoomName);
    }
    socketRef.current.on("your id", id =>{
      setYourID(chat.userinfo.id);
      setSocketID(id);
    })
    socketRef.current.on("message", (message) =>{
      console.log("message");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message){
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e){
    e.preventDefault();
    const messageObject = {
      message: message,
      id: yourID,
      roomName: props.chatRoomName,
      time: date.getHours()+':'+date.getMinutes(),
    };
    writeMsgData(yourID, message, props.chatRoomName);
    
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function leaveRoom(chatname){
    const dataObject = {
      user: yourID,
      roomName: props.chatRoomName,
    };
    socketRef.current.emit("leave room", dataObject);
    dispatch(actionType.removechat(chatname));
  }

  function handleChange(e){
    setMessage(e.target.value);
  }
  return (
    <div className="chat">
      <div className="chatHead">
        <button id="backBtn" onClick={()=>dispatch(actionType.sidebarchatObject)}>back</button>
        {props.chatRoomName}
        <button id="exitChatroomBtn" onClick={() =>{leaveRoom(props.chatRoomName); dispatch(actionType.sidebarnearObject);}}>exit</button>
      </div>
      <div className="chatBody">
        {messages.map((message, index) => {
            if(message.username === yourID){
              return ( 
                <div className="MyRow" key={index}>
                  <div className="MyTime">{message.time}</div>
                  <div className="MyMsg">
                    {message.message}
                  </div>
                </div>
              )
            }
            return (
              <div className="PeerRow" key={index}>
                <div className="PeerInfo">
                  <div className="PeerName">peer</div>
                </div>
                <div className="PeerMsgInfo">
                  <div className="PeerMsg">
                    {message.message}
                  </div>
                  <div className="PeerTime">{message.time}</div>
                </div>
              </div>
            )
          }
        )}
      </div>
      <div className="chatUnder">
        <form onSubmit={sendMessage}>
          <textarea value={message} onChange={handleChange} placeholder="메시지 입력"></textarea>
          <button>전송</button>
        </form>
      </div>
    </div>
  );
};

export default Test;
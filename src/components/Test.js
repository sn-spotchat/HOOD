import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import { database } from '../firebase';
import "./Test.css";
import * as actionType from '../modules/action';
//지금은 채팅방이 1개인 임시지만, 후에 socket.join을 이용해서 여러개의 방을 만들 생각임 
const Test = (props) =>{
  const [yourID, setYourID] = useState();//나의 아이디
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
//
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");//나중에 서버에 Server.js를 올리게 되면 바꿔야함.
    //socketRef.current = props.socket.current;//하면 모든 클라이언트의 소켓이 같아짐.
    
    const flag=false;
    for(var i = 0; i < chat.chatlist.length; i++){
      const temp = chat.chatlist[i].chatname;
      if(props.chatRoomName == temp){flag =true; break;}
    }
    const dataObject = {
      user: yourID,
      roomName: props.chatRoomName,
    };
    if(flag === false){//새롭게 들어가는 방인 경우
      socketRef.current.emit("join room", dataObject);
    }
    else{//chat목록에 있는 방인 경우
      //저장해 놓은 채팅방의 채팅 내역을 불러오는 내용 작성
      socketRef.current.emit("rejoin room", dataObject);
    }
    socketRef.current.on("your id", id =>{
      console.log("your id");
      setYourID(id);
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
      body: message,
      id: yourID,
      roomName: props.chatRoomName,
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
            if(message.id === yourID){
              return ( 
                <div className="MyRow" key={index}>
                  <div className="MyTime">{date.getHours()}:{date.getMinutes()}</div>
                  <div className="MyMsg">
                    {message.body}
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
                    {message.body}
                  </div>
                  <div className="PeerTime">{date.getHours()}:{date.getMinutes()}</div>
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
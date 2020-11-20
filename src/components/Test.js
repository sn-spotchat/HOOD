import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import { database } from '../firebase';
import "./Test.css";
import * as actionType from '../modules/action';
/*
*chat DB
*messageObj
* - chat_id     (string): 채팅 메시지의 고유값
* - chatroom_id (string): 채팅 메시지가 사용된 채팅방의 고유값
* - type        (string): 메시지의 타입 (text, image(아직 미반영)) 
* - time        (string): 메시지가 전송된 시간, (형식: Wed Nov 14 2020 13:30:00 GMT+0900 (대한민국 표준시))
* - user_id     (string): 메시지를 보낸 사람의 고유값
* - nickname    (string): user의 nickname
* - content     (string?): 메시지의 내용
*
*function
*getTime(time)          : Date.toString()의 값을 인자로 전달받아 HH:MM형태로 반환해준다.
*                       : 과거 메시지의 시간을 표시하기 위해 사용된다.
*sendMessage(e)         : event trigger을 인자로 받으며, 채팅창에 입력된 메시지를 socketio를 통해 전송한다.
*receiveMessage(messageObj): messageObj를 인자로 받으며, messages state에 Object를 배열의 형태로 저장한다. 
*handleChange(e)        : 채팅창에 입력된 내용이 message state에 string형태로 저장된다.
*
*
*
*/
const Test = (props) =>{
  const [yourID, setYourID] = useState();//나의 아이디
  const [socketID, setSocketID] = useState();
  const [messages, setMessages] = useState([]);//모든 메시지(server로부터 받은 모든 메시지)
  const [message, setMessage] = useState("");//내가 입력한 메시지
  const [chatroomName, setChatroomName] = useState("");
  
  const socketRef = useRef();
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatreducer, []);
  const profilesaved = useSelector(state => state.profilereducer, {});
  const login = useSelector(state => state.loginreducer, {});
  const date = new Date();
//
  function getTime(time){
    var dateObj = new Date(time);
    return dateObj.getHours()+":"+dateObj.getMinutes();
  }
  
  function receivedMessage(messageObj){
    setMessages(oldMsgs => [...oldMsgs, messageObj]);
  }

  function sendMessage(e){
    e.preventDefault();
    const messageObject = {
      chatroom_id: props.chatRoomId,
      type: "text",
      time: date.toString(),
      user_id: login.id,
      nickname: profilesaved.nickname,
      content: message
    };
    
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function leaveRoom(userid, chatroomid){
    const dataObject = {
      user_id: userid,
      chatroom_id: chatroomid,
    };
    socketRef.current.emit("leave room", dataObject);
    dispatch(actionType.removechatroom(chatroomid));
  } 

  function handleChange(e){
    setMessage(e.target.value);
  }
//
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");  //나중에 서버에 Server.js를 올리게 되면 바꿔야함.

    const dataObject = {
      user_id: login.id,
      chatroom_id: props.chatRoomId,
    };

    if(chat.newchat === true){
      console.log("new");
      socketRef.current.emit("join room", dataObject);
    }
    else{//chat목록에 있는 방인 경우
      console.log("old");
      socketRef.current.emit("rejoin room", dataObject);
      //readMsgDate(props.chatRoomId);
    }

    database.ref('chatroom').once('value', function(snapshot) {
      Object.entries(snapshot.val()).forEach(entry =>{
        const [key, value] = entry;
        if(String(value['chatroom_id']) === String(props.chatRoomId)){
          setChatroomName(value['name']);
        }
      });
    });

    socketRef.current.on("your id", id =>{
      setYourID(login.id);
      setSocketID(id);
    })
    socketRef.current.on("message", (message) =>{
      console.log(message.user_id);
      receivedMessage(message);
    })
  }, []);

  
  return (
    <div className="chat">
      <div className="chatHead">
        <button id="backBtn" onClick={()=>dispatch(actionType.sidebarchatObject)}>back</button>
        {chatroomName}
        <button id="exitChatroomBtn" onClick={() =>{leaveRoom(login.ID, props.chatRoomId); dispatch(actionType.sidebarnearObject);}}>exit</button>
      </div>
      <div className="chatBody">
        {messages.map((message, index) => {
            if(message.user_id === login.id){
              return ( 
                <div className="MyRow" key={index}>
                  <div className="MyTime">{getTime(message.time)}</div>
                  <div className="MyMsg">
                    {message.content}
                  </div>
                </div>
              )
            }
            return (
              <div className="PeerRow" key={index}>
                <div className="PeerInfo">
                  <div className="PeerName">{message.nickname}</div>
                </div>
                <div className="PeerMsgInfo">
                  <div className="PeerMsg">
                    {message.content}
                  </div>
                  <div className="PeerTime">{getTime(message.time)}</div>
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

/*
function writeMsgData(id, msg, chatroom_id) {
    //chat db에 저장하는 부분
    var date = new Date();
    database.ref('chat').push({chatroom_id: chatroom_id, message: msg, time: date.toString(), user_id: id});
    //chatroom db에 저장하는 부분 //여기부터 다시 수정 user에 저장하는데 오류 
    var chat_id;
    database.ref('chat').once('value', function(snapshot) {
      Object.entries(snapshot.val()).forEach(entry =>{
        const [key, value] = entry;
        if(value['user_id'] === login.id && value['time'] === date.toString()){
          chat_id = key;
          database.ref('chatroom').once('value', function(snapshot) {
            Object.entries(snapshot.val()).forEach(entry =>{
              const [key, value] = entry;
              if(String(value['chatroom_id']) === String(chatroom_id)){
                database.ref('chatroom/'+chatroom_id+'/chatlist').push({chat_id: chat_id});
              }
            });
          });
        }
      });
    });
    //user db에 저장하는 부분
    database.ref('user').once('value', function(snapshot) {
      Object.entries(snapshot.val()).forEach(entry =>{
        const [key, value] = entry;
        if(value['ID'] === login.id){
          database.ref('user/'+key+'/chatlist/').push({chat_id: chat_id});
        }
      });
    });
  }
  function readMsgDate(chatroomid){
    var time;
    database.ref('user').once('value', function(snapshot) {
      Object.values(snapshot.val()).forEach(Snap =>{
        if(login.id === Snap['ID']){
          Object.values(Snap['chatroomlist']).forEach(data =>{
            if(String(data['chatroom_id']) === String(chatroomid)){
              time = data['time'];
            }
          });
        }
      });
    });
    database.ref('chat').orderByChild('chatroom_id').equalTo(chatroomid).once('value', function(data){
      Object.values(data.val()).forEach(Snap =>{
        if(time <= Snap['time']){
          setMessages(oldMsgs => [...oldMsgs, Snap]);
        }
      });
    });
  }
*/
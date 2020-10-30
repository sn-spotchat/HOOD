import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import io from 'socket.io-client';
import { database } from '../firebase';
import "./Test.css";
//지금은 채팅방이 1개인 임시지만, 후에 socket.join을 이용해서 여러개의 방을 만들 생각임 
const Test = (props) =>{
  const [yourID, setYourID] = useState();//나의 아이디
  //const [chatRoomName, setChatRoomName] = useState("");//채팅방 이름
  const [messages, setMessages] = useState([]);//모든 메시지(server로부터 받은 모든 메시지)
  const [message, setMessage] = useState("");//내가 입력한 메시지
  
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");//나중에 서버에 Server.js를 올리게 되면 바꿔야함.
    //setChatRoomName("sinsu");//후에 방이름을 받아서 넣을 예정
    
    const dataObject = {
      user: yourID,
      roomName: props.chatRoomName,
    };
    socketRef.current.emit("join room", dataObject);
    socketRef.current.on("your id", id =>{
      setYourID(id);
    })
    socketRef.current.on("message", (message) =>{
      receivedMessage(message);
      console.log(message);
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
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e){
    setMessage(e.target.value);
  }
  return (
    <div className="chat">
      <div className="chatHead">{props.chatRoomName}
        <button>exit</button>
      </div>
      <div className="chatBody">
        {messages.map((message, index) => {
            if(message.id === yourID){
              return ( 
                <div className="MyRow" key={index}>
                  <div className="MyMsg">
                    {message.body}
                  </div>
                </div>
              )
            }
            return (
              <div className="PeerRow" key={index}>
                <div className="PeerMsg">
                  {message.body}
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
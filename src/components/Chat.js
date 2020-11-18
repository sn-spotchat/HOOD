import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import ChatroomBox from './ChatroomBox';
import './Chat.css';

const Chat = () =>{
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const profilesaved = useSelector(state => state.profilereducer, {});
  const chat = useSelector(state => state.chatreducer, {});
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    chat.chatroomlist.forEach(function(data){
      setChatList(oldList => [...oldList, data['id']]);
    });
  }, []);
  return (
    <div className="Chat">
      <div id="chathead" className="head">Chat</div>
      {chatList.map((chatRoom,index) => {
        
        return ( 
          <ChatroomBox key={index} chatRoom={chatRoom} index={index}></ChatroomBox>
        )
      })}
    </div>
  );
}

export default Chat;
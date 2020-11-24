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
  const chatHead=`현재 ${Object.keys(chat.chatroomlist).length}개의 채팅방에 접속중입니다.`
  useEffect(()=>{
    chat.chatroomlist.forEach(function(data){
      setChatList(oldList => [...oldList, data['id']]);
    });
  }, []);
  return (
    <div className="Chat">
      <div id="chathead" className="head">{chatHead}</div>
      {chatList.map((chatRoom,index) => {
        return ( 
          <ChatroomBox key={index} chatRoom={chatRoom} index={index}></ChatroomBox>
        )
      })}
    </div>
  );
}

export default Chat;
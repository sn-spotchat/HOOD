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
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    const user = database.ref('user/');
    var my = user.orderByChild("user_id").equalTo(Number(profilesaved.profile.id));
    my.once('value', (data) =>{
      const dataObj = Object.values(data.val())[0];
      const chatroom = database.ref('chatroom/');
      for(var i = 0; i<dataObj.chatroomlist.length; i++){
        const Chatroom_id = dataObj.chatroomlist[i].chatroom_id;
        setChatList(oldList => [...oldList, Chatroom_id]);
        
      }
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
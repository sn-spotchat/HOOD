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
        /*var target = chatroom.orderByChild("chatroom_id").equalTo(Chatroom_id);
        target.once('value', (snapshot)=>{
          const chatroomdata = snapshot.val();
          setChatList(oldList => [...oldList, {id: chatroomdata[0].chatroom_id, name: chatroomdata[0].name}]);
        });*/
      }
    });
  }, []);
  return (
    <div className="Chat">
      <div id="chathead" className="head">Chat</div>
      {chatList.map((chatRoom,index) => {
        
        return ( 
          /*<div className="ChatRaw" key={index} onClick={ () =>{
            dispatch(actionType.oldchat());
            dispatch(actionType.sidebartestObject);
            dispatch(actionType.chatname(chatRoom));
            }
            }>
            {chatRoom}
            <div className="ActivationNum">n</div>
          </div>*/
          <ChatroomBox key={index} chatRoom={chatRoom}></ChatroomBox>
        )
      })}
    </div>
  );
}

export default Chat;
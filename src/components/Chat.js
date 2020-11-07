import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

import './Chat.css';

const Chat = () =>{
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatreducer, []);
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    for(var i = 0; i < chat.chatlist.length; i++){
      var temp = chat.chatlist[i].name;
      setChatList(oldList => [...oldList, temp]);
    }
  }, []);
  return (
    <div className="Chat">
      <div id="chathead" className="head">Chat</div>
      {chatList.map((chatRoom,index) => {
        return ( 
          <div className="ChatRaw" key={index} onClick={ () =>{
            dispatch(actionType.sidebartestObject);
            dispatch(actionType.chatname(chatRoom));
            }
            }>
            {chatRoom}
            <div className="ActivationNum">n</div>
          </div>
        )
      })}
    </div>
  );
}

export default Chat;
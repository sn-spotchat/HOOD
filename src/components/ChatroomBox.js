import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import './ChatroomBox.css';

const ChatroomBox = (props) => {
  const [chatroomname, setChatroomname] = useState();
  const [lastchattime, setLastchattime] = useState();
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  database.ref('chatroom/' + props.chatroom).once('value', (Snap)=>{   
    let chatroom = Snap.val();
    setChatroomname(chatroom.name);  
    let lastchat = chatroom.lastchat;
    if(lastchat === undefined || lastchat === null) return;
    database.ref('chat/' + lastchat).once('value', (Snap)=>{
      const lastchat = Snap.val();
      if(lastchat === undefined || lastchat === null) return;
      if(lastchat.type === 'text')
        setContent(lastchat.content);
      setLastchattime(lastchat.time);
    })
  })

  useEffect(() => {
    var dateObj = new Date(lastchattime);
    var todayObj = new Date();

    if (todayObj.getDate() === dateObj.getDate()) {
      setTime(dateObj.getHours() + ":" + dateObj.getMinutes());
    }
    else if (Number(todayObj.getDate()) === (Number(dateObj.getDate()) + 1)) {
      setTime("어제");
    }
    else {
      if (String(lastchattime) === "" || lastchattime === undefined || lastchattime === null) {
        setTime("");
      }
      else {
        setTime(dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate());
      }
    }
  }, [lastchattime]);

    return (
    <div className="ChatroomBoxRaw" key={props.index} onClick={() => {
      dispatch(actionType.setSidebar('test'));
      dispatch(actionType.setChatroom(props.chatroom));
      dispatch(actionType.setChatroomname(chatroomname));
    }
    }>
      <div className="upper">
        <div id="name">{chatroomname}</div>
        <div className="ActivationNum">n</div>
      </div>
      <div className="lower">
        <div id="message">{content}</div>
        <div id="time">{time}</div>
      </div>
    </div>

  );
}
export default ChatroomBox;
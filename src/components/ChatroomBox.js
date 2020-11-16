import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import './ChatroomBox.css';

const ChatroomBox = (props) =>{
  const [chatroomName, setChatroomName] = useState();
  const [lastchatTime, setLastChatTime] = useState();
  const [Time, setTime] = useState();
  const [lastChat, setLastChat] = useState("");
  const dispatch = useDispatch();
  const profilesaved = useSelector(state => state.profilereducer, {});
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    const chatroom = database.ref('chatroom/');
    var chatroomObj = chatroom.orderByChild("chatroom_id").equalTo(Number(props.chatRoom));
    chatroomObj.once('value', (data) =>{
      var dataObj = Object.values(data.val())[0];
      setChatroomName(dataObj.name);
      const chat = database.ref('chat/');
      var chatObj = chat.orderByChild("chat_id").equalTo(Number(dataObj.lastchat_id));
      chatObj.once('value', (data) =>{
        var dataObj = Object.values(data.val())[0];
        setLastChat(dataObj.message);
        setLastChatTime(dataObj.time);
      });
    });
  }, []);
  useEffect(()=>{
    //시간을 계산해서 반영해야함.(ex, 오늘인경우 시간을, 어제인 경우 어제, 그외에는 월/날짜로 표기)
    var dateObj = new Date(lastchatTime);
    var todayObj = new Date();

    if(todayObj.getDate() === dateObj.getDate()){
      console.log("today");
      setTime(dateObj.getHours()+":"+dateObj.getMinutes());
    }
    else if(Number(todayObj.getDate()) === (Number(dateObj.getDate()) + 1)){
      console.log("yesterday");
      setTime("어제");
    }
    else{
      console.log(dateObj.getDate());
      setTime(dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate());
    }
  },[lastchatTime]);
  return (
    <div className="ChatroomBoxRaw" key={props.index} onClick={ () =>{
        dispatch(actionType.oldchat());
        dispatch(actionType.sidebartestObject);
        dispatch(actionType.chatid(props.chatRoom));
        }
        }>
      <div className="upper">
        <div id="name">{chatroomName}</div>
        <div className="ActivationNum">n</div>
      </div>
      <div className="lower">
        <div id="message">{lastChat}</div>
        <div id="time">{Time}</div>
      </div>
    </div>
        
  );
}
export default ChatroomBox;
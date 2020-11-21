import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import './ChatroomBox.css';

const ChatroomBox = (props) =>{
  const [chatroomName, setChatroomName] = useState();
  const [lastchatTime, setLastChatTime] = useState();
  const [Time, setTime] = useState("");
  const [lastChat, setLastChat] = useState("");
  const dispatch = useDispatch();
  const profilesaved = useSelector(state => state.profilereducer, {});
  const chat = useSelector(state => state.chatreducer, []);
  const login = useSelector(state => state.loginreducer, {});
  useEffect(()=>{//채팅방의 정보를 받아와 box에 채울 정보를 저장한다..
    database.ref('chatroom').once('value', function(snapshot){
      Object.entries(snapshot.val()).forEach(entry =>{
        var [key, value] = entry;
        if(String(value['chatroom_id']) === String(props.chatRoom)){
          setChatroomName(value["name"]);
          if(value["lastchat_id"] !== ""){
            database.ref('chat/'+value["lastchat_id"]).once('value', function(Snap){
              const dataObj = Snap.val();
              setLastChat(dataObj.content);
              setLastChatTime(dataObj.time);
            });
          }
        }
        
      });
    });
  }, []);
  useEffect(()=>{
    var dateObj = new Date(lastchatTime);
    var todayObj = new Date();

    if(todayObj.getDate() === dateObj.getDate()){
      setTime(dateObj.getHours()+":"+dateObj.getMinutes());
    }
    else if(Number(todayObj.getDate()) === (Number(dateObj.getDate()) + 1)){
      setTime("어제");
    }
    else{
      setTime(dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate());
    }
  },[lastchatTime]);

  function insertChat(chatRoom){
    var exist=false;
    console.log(chat.chatroomlist);
    chat.chatroomlist.forEach(function(data){
      console.log(data.id, chatRoom);
      if(String(data.id) === String(chatRoom)){
        console.log("true");
        exist = true;
      }else{
        console.log("false");
      }
    });
    if(exist===false){
      dispatch(actionType.newchat());
      dispatch(actionType.insertchatroom(chatRoom));
      database.ref('chatroom').once('value', function(snapshot) {
        Object.values(snapshot.val()).forEach(Snap =>{
          if(String(chatRoom) === Snap['chatroom_id']){
            database.ref('user/').once('value', function(data){
              Object.entries(data.val()).forEach(entry=>{
                const [key, value] = entry;
                if(value['ID'] === login.id){
                  var date = new Date();
                  database.ref('user/'+key+'/chatroomlist/').push({chatroom_id: Snap['chatroom_id'], start_chat_id:Snap['lastchat_id'], time: date.toString()});
                  /*database.ref('user/'+key).once('value', function(mychild){
                    if(mychild.hasChild('chatroomlist')){
                      database.ref('user/'+key+'/chatroomlist/').push({chatroom_id: Snap['chatroom_id'], start_chat_id:Snap['lastchat_id'], time: date.toString()});
                    }
                    else{
                      database.ref('user/'+key+'/chatroomlist/').set({chatroom_id: Snap['chatroom_id'], start_chat_id:Snap['lastchat_id'], time: date.toString()});
                    }
                  });*/
                }
              });
            });
          }
        });
      });
    }
    else{dispatch(actionType.oldchat());}
  }

  return (
    <div className="ChatroomBoxRaw" key={props.index} onClick={ () =>{
        dispatch(actionType.oldchat());
        dispatch(actionType.sidebartestObject);
        dispatch(actionType.chatid(props.chatRoom));
        insertChat(props.chatRoom);
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
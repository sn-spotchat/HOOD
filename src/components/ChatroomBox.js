import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import './ChatroomBox.css';

const ChatroomBox = (props) =>{
  const dispatch = useDispatch();
  const profilesaved = useSelector(state => state.profilereducer, {});
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    
  }, []);
  return (
    <div className="ChatRaw" key={props.index} onClick={ () =>{
        dispatch(actionType.oldchat());
        dispatch(actionType.sidebartestObject);
        dispatch(actionType.chatid(props.chatRoom));
        }
        }>
        {props.chatRoom}
    </div>
        
  );
}
/*<div className="upper">
            <div id="name">{props.chatRoom}</div>
            <div className="ActivationNum">n</div>
        </div>
        <div className="lower">
            <div id="message"></div>
            <div id="time"></div>
        </div>*/
export default ChatroomBox;
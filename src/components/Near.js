import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import './Near.css';
import * as actionType from '../modules/action';
//지역기반 접속 가능한 방에 대한 리스트를 출력해서 보여줌

const Near = () =>{
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    setChatList(oldList => [...oldList, "sinchon"]);
    setChatList(oldList => [...oldList, "sogang"]);
    setChatList(oldList => [...oldList, "daeheong"]);
    setChatList(oldList => [...oldList, "sinsu"]);
    setChatList(oldList => [...oldList]);
  }, []);
  return (
    <div className="Near">
      <div id="nearhead" className="head">Near</div>
      {chatList.map((chatRoom,index) => {
        return ( 
          <div className="NearRaw" key={index} onClick={ () =>{
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

export default Near;

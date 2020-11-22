import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import ChatroomBox from './ChatroomBox';
import './Near.css';
import * as actionType from '../modules/action';
//지역기반 접속 가능한 방에 대한 리스트를 출력해서 보여줌
/*추가해야 할 기능
 *클릭시 chat에 해당방에 대한 Raw를 리스트에 추가해야한다.
 * 
 */
const Near = () =>{
  const [chatList, setChatList] = useState([]);
  const nearlist = useSelector(state => state.mapreducer.nearlist, []);
  const dispatch = useDispatch();
  console.log(nearlist);
  useEffect(()=>{//정보를 받아와 리스트를 작성한다. 지금은 하드코딩이지만 후에 위치기반으로 수정
    nearlist.forEach(near =>{
      setChatList(oldList => [...oldList, near.chatroom_id])
    })
    
  }, []);

  return (
    <div className="Near">
      <div id="nearhead" className="head">Near</div>
      {chatList.map((chatRoom,index) => {
        return ( 
          <ChatroomBox key={index} chatRoom={chatRoom} index={index} ></ChatroomBox>
        )
      })}
    </div>
  );
}

export default Near;

import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import './Near.css';
import * as actionType from '../modules/action';
//지역기반 접속 가능한 방에 대한 리스트를 출력해서 보여줌
/*추가해야 할 기능
 *클릭시 chat에 해당방에 대한 Raw를 리스트에 추가해야한다.
 * 
 */
const Near = () =>{
  const [chatList, setChatList] = useState([]);
  const chat = useSelector(state => state.chatreducer, []);
  const dispatch = useDispatch();
  useEffect(()=>{//정보를 받아와 리스트를 작성한다.
    setChatList(oldList => [...oldList, "sinchon"]);
    setChatList(oldList => [...oldList, "sogang"]);
    setChatList(oldList => [...oldList, "daeheong"]);
    setChatList(oldList => [...oldList, "sinsu"]);
    setChatList(oldList => [...oldList]);
  }, []);

  function insertChat(chatRoom){
    var exist = false;
    for(var i = 0; i < chat.chatlist.length; i++){//foreach를 이용해도 될거로 보이는데 문법적용이 잘 안됨.
      if(chat.chatlist[i].name === chatRoom){
        exist = true;
        break;
      }
    }
    if(exist===false){
      dispatch(actionType.insertchat(chatRoom));
    }
  }

  return (
    <div className="Near">
      <div id="nearhead" className="head">Near</div>
      {chatList.map((chatRoom,index) => {
        return ( 
          <div className="NearRaw" key={index} onClick={ () =>{
            insertChat(chatRoom);
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

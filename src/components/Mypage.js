import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import io from 'socket.io-client';
import './List.css';
//지역기반 접속 가능한 방에 대한 리스트를 출력해서 보여줌

const Mypage = (props) =>{
    const [profile, setProfile] = useState([]);
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
      setProfile(oldList => [...oldList, ])
  })
  useEffect(()=>{//파이어 베이스에서 지역기반 채팅방을 받아온다.
    setChatList(oldList => [...oldList, "sinchon"]);
    setChatList(oldList => [...oldList, "sogang"]);
  }, []);
  return (
    <div className="Mypage">
      <ul>
      {chatList.map((chatRoom,index) => {
        return ( 
          <li key={index}>
            {chatRoom}
          </li>
        )
      })}
      </ul>
    </div>
  );
}

export default Mypage;

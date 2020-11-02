import React, { useState, useEffect, useRef} from 'react'; // import 로 useState 를 불러온다!
import io from 'socket.io-client';
import './List.css';
//지역기반 접속 가능한 방에 대한 리스트를 출력해서 보여줌

const Mypage = (props) =>{
  const [profile, setProfile] = useState([]);
  useEffect(() => {
      setProfile(oldList => [...oldList ]);
  },[]);
  return (
    <div className="Mypage">
    </div>
  );
}

export default Mypage;

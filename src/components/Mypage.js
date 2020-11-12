import React, { useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import './Near.css';



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

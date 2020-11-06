import React, {Component, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Home from './Home';
import Mypage from './Mypage';
import Near from './Near';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';
/*
렌더링이 2번 되는 문제가 있음 뭐가 문제인지는 모르겠지만 문제없다고 생각함.
*/
const Sidebar = ({sidebarstate}) =>{
  const [sidebarType, setSidebarType] = useState(sidebarstate);
  const chat = useSelector(state => state.chatreducer, []);
  useEffect(() =>{
    if(sidebarstate === 'home'){
      setSidebarType(<Home></Home>);
    }
    else if(sidebarstate === 'mypage'){
      setSidebarType(<Mypage></Mypage>);
    }
    else if(sidebarstate === 'near'){
      setSidebarType(<Near></Near>);
    }
    else if(sidebarstate === 'chat'){
      setSidebarType(<Chat></Chat>);
    }
    else if(sidebarstate === 'test'){
      setSidebarType(<Test chatRoomName={chat.chatname}></Test>);
    }
  },[sidebarstate]);
    
  return (
    <div className="sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

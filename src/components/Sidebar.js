import React, {Component, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import Home from './Home';
import Mypage from './Mypage';
import Login from './Login';
import Signin from './Signin';
import Near from './Near';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';

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
    else if(sidebarstate === 'login'){
      setSidebarType(<Login></Login>);
    }
    else if(sidebarstate === 'signin'){
      setSidebarType(<Signin></Signin>);
    }
    else if(sidebarstate === 'near'){
      setSidebarType(<Near></Near>);
    }
    else if(sidebarstate === 'chat'){
      setSidebarType(<Chat></Chat>);
    }
    else if(sidebarstate === 'test'){
      setSidebarType(<Test chatRoomId={chat.chatid}></Test>);
    }
  },[sidebarstate]);
    
  return (
    <div className="sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

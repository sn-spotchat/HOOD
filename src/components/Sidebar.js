import React, {Component, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import Home from './Home';
import MypageSelecter from './MypageSelecter';
import Near from './Near';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';

const Sidebar = ({sidebarstate}) =>{
  const [sidebarType, setSidebarType] = useState(sidebarstate);
  const initialState = useSelector(state => state.reducer,[]);

  const chat = useSelector(state => state.chatreducer, []);
  /*const socketRef = useRef();
  useEffect(() =>{
    socketRef.current = io.connect("http://localhost:3001");
  },[]);*/
  useEffect(() =>{
    if(sidebarstate === 'home'){
      setSidebarType(<Home></Home>);
    }
    else if(sidebarstate === 'mypageselecter'){
      setSidebarType(<MypageSelecter mypageselecterstate = {initialState.mypageselecterstate}></MypageSelecter>);
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

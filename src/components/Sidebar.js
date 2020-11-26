import React, {Component, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import Home from './Home';
import Mypage from './Mypage';
import Login from './Login';
import Signin from './Signup';
import Near from './Near';
import Chat from './Chat';
import Test from './Test';
import NSignin from './NSignup';
import './Sidebar.css';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const Sidebar = ({sidebarstate}) =>{
  const [sidebarType, setSidebarType] = useState(sidebarstate);
  const chatid = useSelector(state => state.chatreducer.chatid);
  console.log(chatid);
  
  
  useEffect(() =>{
    console.log('effected');
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
    else if(sidebarstate === 'nsignin'){
      setSidebarType(<NSignin></NSignin>);
    }
    else if(sidebarstate === 'near'){
      setSidebarType(<Near></Near>);
    }
    else if(sidebarstate === 'chat'){
      setSidebarType(<Chat></Chat>);
    }
    else if(sidebarstate === 'test'){
      setSidebarType(<Test chatRoomId={chatid}></Test>);
    }
  },[sidebarstate, chatid]);
    
  return (
    <div id = 'Sidebar' className="Sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

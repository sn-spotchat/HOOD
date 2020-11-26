import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './Home';
import Mypage from './Mypage';
import Login from './Login';
import Signin from './Signup';
import Near from './Near';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';

const Sidebar = ({ sidebarstate }) => {
  const [sidebarType, setSidebarType] = useState(sidebarstate);
  const chatid = useSelector(state => state.statereducer.chatid);

  useEffect(() => {
    if (sidebarstate === 'home') {
      setSidebarType(<Home></Home>);
    }
    else if (sidebarstate === 'mypage') {
      setSidebarType(<Mypage></Mypage>);
    }
    else if (sidebarstate === 'login') {
      setSidebarType(<Login></Login>);
    }
    else if (sidebarstate === 'signin') {
      setSidebarType(<Signin></Signin>);
    }
    else if (sidebarstate === 'near') {
      setSidebarType(<Near></Near>);
    }
    else if (sidebarstate === 'chat') {
      setSidebarType(<Chat></Chat>);
    }
    else if (sidebarstate === 'test') {
      setSidebarType(<Test chatRoomId={chatid}></Test>);
    }
  }, [sidebarstate, chatid]);

  return (
    <div id='Sidebar' className="Sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

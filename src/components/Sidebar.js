import React, {Component, useEffect, useState} from 'react';
import Home from './Home';
import Mypage from './Mypage';
import List from './List';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';
/*
렌더링이 2번 되는 문제가 있음 뭐가 문제인지는 모르겠지만 문제없다고 생각함.
*/
const Sidebar = ({sidebarstate}) =>{
  const [sidebarType, setSidebarType] = useState(sidebarstate);
  
  useEffect(() =>{
    console.log(sidebarstate);
    if(sidebarstate === 'home'){
      setSidebarType(<Home></Home>);
    }
    else if(sidebarstate === 'mypage'){
      setSidebarType(<Mypage></Mypage>);
    }
    else if(sidebarstate === 'list'){
      setSidebarType(<List></List>);
    }
    else if(sidebarstate === 'chat'){
      setSidebarType(<Chat></Chat>);
    }
    else if(sidebarstate === 'test'){
      setSidebarType(<Test chatRoomName="sinsu"></Test>);
    }
  },[sidebarstate]);
    
  return (
    <div className="sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

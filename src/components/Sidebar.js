import React, {Component, useEffect, useState} from 'react';
import List from './List';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';
//나중에 함수형 컴포넌트로 바꿀예정 
//Navigation에서 클릭하는거에 따라 _content의 내용을 바꾸게 할 예정.
/*class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'list'
    }
  }

  render() {
    var _content = null;
    if(this.state.mode === 'list'){
      _content = <List></List>
    }
    else if(this.state.mode === 'chat'){
      _content = <Chat></Chat>
    }
    _content = <Test chatRoomName="sinsu"></Test>;
    //_content = <List></List>;
    console.log(this.state.mode);
    return (
        <div className="sidebar">
          {_content}
        </div>
    );
  }
}
*/
const Sidebar = ({sidebarstate}) =>{
  const [sidebarType, setSidebarType] = useState("");
  console.log(sidebarstate);
  var _content = null;
  useEffect(() =>{
    if(sidebarstate === 'home'){
      _content =null;
    }
    else if(sidebarstate === 'login'){
      _content =null;
    }
    else if(sidebarstate === 'list'){
      setSidebarType(<List></List>);
      console.log("in list");
    }
    else if(sidebarstate === 'chat'){
      _content = <Chat></Chat>;
    }
  },[]);
    

  
  return (
    <div className="sidebar">
      {sidebarType}
    </div>
  );
};

export default Sidebar;

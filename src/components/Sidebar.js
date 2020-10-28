import React, {Component} from 'react';
import List from './List';
import Chat from './Chat';
import Test from './Test';
import './Sidebar.css';
//나중에 함수형 컴포넌트로 바꿀예정 
//Navigation에서 클릭하는거에 따라 _content의 내용을 바꾸게 할 예정.
class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'list'
    }
  }

  render() {
    var _content = null;
    /*if(this.state.mode === 'list'){
      _content = <List></List>
    }
    else if(this.state.mode === 'chat'){
      _content = <Chat></Chat>
    }*/
    _content = <Test></Test>;
    console.log(this.state.mode);
    return (
        <div className="sidebar">
          {_content}
        </div>
    );
  }
}

export default Sidebar;

import React, {Component} from 'react';
import SidebarBtn from './SidebarBtn';
import List from './List';
import Chat from './Chat';
import './Sidebar.css';

class Sidebar extends Component {
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
    console.log(this.state.mode);
    return (
        <div className="sidebar">
          <div className="searchResult">
            {_content}
          </div>
            <SidebarBtn onChangeMode={function(_mode){
              this.setState({
                mode:_mode
              });
            }.bind(this)}></SidebarBtn>
        </div>
    );
  }
}

export default Sidebar;
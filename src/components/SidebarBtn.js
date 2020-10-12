import React, {Component} from 'react';

import './SidebarBtn.css';

class SidebarBtn extends Component {

  render() {
    return (
        <div className="sidebarBtn">
            <div id="listBtn">
              <input className="btn" onClick={function(e){
              e.preventDefault();
              this.props.onChangeMode('list');
              }.bind(this)} type="button" value="list">
              </input>
            </div>
            <div id="chatBtn">
              <input className="btn" onClick={function(e){
              e.preventDefault();
              this.props.onChangeMode('chat');
              }.bind(this)} type="button" value="chat">
              </input>
            </div>
        </div>
    );
  }
}

export default SidebarBtn;
import React, {Component} from 'react';

import './SidebarBtn.css';

class SidebarBtn extends Component {
  render() {
    return (
        <div className="sidebarBtn">
            <div id="listBtn">list</div>
            <div id="chatBtn">chat</div>
        </div>
    );
  }
}

export default SidebarBtn;
import React, {Component} from 'react';
import SidebarBtn from './SidebarBtn';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar">
            <div className="searchResult">
            출력물
            </div>
            <SidebarBtn></SidebarBtn>
        </div>
    );
  }
}

export default Sidebar;
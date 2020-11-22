import React, { Component } from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';
import Sidebar from './Sidebar';
import SidebarContainer, { SidebarButton } from '../containers/SidebarContainer';
const Main = () => {
  
  return (
    <div className='wrap'>
      <Navigation/>
      <SidebarContainer/>
      <Map/>
    </div>
  );
}
export default Main;

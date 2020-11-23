import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';
import Sidebar from './Sidebar';
import SidebarContainer, { SidebarButton } from '../containers/SidebarContainer';
const Main = () => {
  const sidebarstate = useSelector(state => state.reducer.sidebarstate, []);
  return (
    <div className='wrap'>
      <Navigation sidebarstate={sidebarstate}/>
      <SidebarContainer/>
      <Map/>
    </div>
  );
}
export default Main;

import React from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';
import SidebarContainer from '../containers/SidebarContainer';
import Init from './Init.js'
const Main = () => {
  
  return (
    <div className='wrap'>
      <Init/>
      <Navigation/>
      <SidebarContainer/>
      <Map/>
    </div>
  );
}
export default Main;

import React from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';
import SidebarContainer from '../containers/SidebarContainer';
import Init from './Init.js'

const Main = () => {  
  Init();
  return (
    <div className='wrap'>
      <Navigation/>
      <SidebarContainer/>
      <Map/>
    </div>
  );
}
export default Main;

import React, {useState} from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';
import SidebarContainer from '../containers/SidebarContainer';
import Init from './Init.js'
import { useSelector } from 'react-redux';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
const Main = () => {
  const sidebarstate = useSelector(state => state.statereducer.sidebarstate);
  const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
  
  const changeDisplay = () => {
    let sidebar = document.getElementById("SidebarContainer");
    let sbutton = document.getElementById("SidebarButton");
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
        sbutton.style['margin-left'] = '322px';
        setButtonLabel(<NavigateBefore></NavigateBefore>);
    }
    else {
        sidebar.style.display = 'none';
        sbutton.style['margin-left'] = '-18px';
        setButtonLabel(<NavigateNext></NavigateNext>);
    }
}
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

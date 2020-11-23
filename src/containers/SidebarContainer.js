import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import './SidebarContainer.css'


const SidebarContainer = () => {
    const sidebarstate = useSelector(state => state.reducer.sidebarstate, []);
    const [ButtonLabel, setButtonLabel] = useState('<');
    
    const changeDisplay = () => {
        if (document.getElementById("Sidebar").style.display == 'none') {
            document.getElementById("Sidebar").style.display = 'block';
            document.getElementById("SidebarButton").style['margin-left'] = '322px';
            setButtonLabel('<');
        }
        else {
            document.getElementById("Sidebar").style.display = 'none';
            document.getElementById("SidebarButton").style['margin-left'] = '-18px';
            setButtonLabel('>');
        }
    }
    return (
        <div id = "SidebarContainer" className="SidebarContainer">    
        <button id = 'SidebarButton' className = 'SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>        
            <Sidebar sidebarstate={sidebarstate}/>
        </div>
    );
    return (
        <div id="sideBar" className="sideBar">
            <Sidebar id="sideBar" sidebarstate={sidebarstate}/>
            <button className = 'SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>
        </div>
    );
};

export default SidebarContainer;
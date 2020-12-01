import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import './SidebarContainer.css'


const SidebarContainer = () => {
    const sidebarstate = useSelector(state => state.statereducer.sidebarstate);
    const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
    let navwid = 340;
    let butwid = 16;
    const changeDisplay = () => {
        let sidebar = document.getElementById("Sidebar");
        let sbutton = document.getElementById("SidebarButton");
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'flex';
            setTimeout(() => {
                sidebar.style.opacity = '1';
            }, 0);
            sbutton.style['margin-left'] = String(navwid) + 'px';
            setButtonLabel(<NavigateBefore></NavigateBefore>);
        }
        else {
            setTimeout(() => {
                sidebar.style.display = 'none';
            }, 300);
            sidebar.style.opacity = '0';
            sbutton.style['margin-left'] = String(-butwid / 2) + 'px';
            setButtonLabel(<NavigateNext></NavigateNext>);
        }
    }
    return (
        <div id="SidebarContainer" className="SidebarContainer">
            <Sidebar sidebarstate={sidebarstate} />
            <button id='SidebarButton' className='SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>
        </div>
    );
};

export default SidebarContainer;
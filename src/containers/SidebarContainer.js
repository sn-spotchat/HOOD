import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import './SidebarContainer.css';


const SidebarContainer = () => {
    const sidebarstate = useSelector(state => state.statereducer.sidebarstate);
    const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
    let SW = getComputedStyle(document.documentElement).getPropertyValue('--SW');
    let NW = getComputedStyle(document.documentElement).getPropertyValue('--NW');
    let BW = getComputedStyle(document.documentElement).getPropertyValue('--BW1');
    SW = Number(SW.slice(0, SW.length - 2));
    NW = Number(NW.slice(0, NW.length - 2));
    BW = Number(BW.slice(0, BW.length - 2));
    let sidebarin = String(NW - SW- BW) + 'px';
    let sidebarout = String(NW) + 'px';
    let buttonin =  String(NW - BW) + 'px';
    let buttonout = String(SW + NW) + 'px';

    const changeDisplay = () => {
        let sidebar = document.getElementById("Sidebar");
        let sbutton = document.getElementById("SidebarButton");
        if (sidebar.style.left === sidebarin) {
            sbutton.style.left = buttonout;
            sidebar.style.left = sidebarout;
            setButtonLabel(<NavigateBefore/>);
        }
        else {
            sbutton.style.left = buttonin;
            sidebar.style.left = sidebarin;
            setButtonLabel(<NavigateNext/>);
        }
    }
    return (
        <div>
            <div id="SidebarContainer" className="SidebarContainer">
                <Sidebar sidebarstate={sidebarstate} />
            </div>
            <button id='SidebarButton' className='SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>
        </div>
    );
};

export default SidebarContainer;
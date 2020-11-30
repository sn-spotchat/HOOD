import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import './SidebarContainer.css'
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';


const SidebarContainer = () => {
    const sidebarstate = useSelector(state => state.statereducer.sidebarstate);
    const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
    let navwid = 340;
    let butwid = 16;
    const changeDisplay = () => {
        let sidebar = document.getElementById("Sidebar");
        let sbutton = document.getElementById("SidebarButton");
        if (sidebar.style.opacity === '0') {
            sidebar.style.opacity = '1';
            sbutton.style['margin-left'] = String(navwid) + 'px';
            setButtonLabel(<NavigateBefore></NavigateBefore>);
        }
        else {
            sidebar.style.opacity = '0';
            sbutton.style['margin-left'] = String(-butwid/2) + 'px';
            setButtonLabel(<NavigateNext></NavigateNext>);
        }
    }
    return (
        <div>
            <div id = "SidebarContainer" className="SidebarContainer">        
                <Sidebar sidebarstate={sidebarstate}/>
                <button id = 'SidebarButton' className = 'SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>    
            </div>        
        </div>
    );
};

export default SidebarContainer;
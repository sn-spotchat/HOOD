import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import './SidebarContainer.css'
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';


const SidebarContainer = () => {
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
        <div id = "SidebarContainer" className="SidebarContainer">    
        <button id = 'SidebarButton' className = 'SidebarButton' onClick={changeDisplay}>{ButtonLabel}</button>        
            <Sidebar sidebarstate={sidebarstate}/>
        </div>
    );
};

export default SidebarContainer;
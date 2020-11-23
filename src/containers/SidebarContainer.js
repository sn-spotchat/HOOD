import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import './SidebarContainer.css'
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';


const SidebarContainer = () => {
    const sidebarstate = useSelector(state => state.reducer.sidebarstate, []);
    const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
    
    const changeDisplay = () => {
        if (document.getElementById("Sidebar").style.display == 'none') {
            document.getElementById("Sidebar").style.display = 'block';
            document.getElementById("SidebarButton").style['margin-left'] = '322px';
            setButtonLabel(<NavigateBefore></NavigateBefore>);
        }
        else {
            document.getElementById("Sidebar").style.display = 'none';
            document.getElementById("SidebarButton").style['margin-left'] = '-18px';
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
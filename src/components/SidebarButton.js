import React ,{useState} from 'react';
import './SidebarButton.css'
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

const SidebarButton = ()=>{
    const [ButtonLabel, setButtonLabel] = useState(<NavigateBefore size="50px"></NavigateBefore>);
    let navwid = 340;
    let butwid = 18;
    var state = 0;
    const changeDisplay = (state) => {
        let sidebarcontainer = document.getElementById("SidebarContainer");
        let sidebar = document.getElementById("Sidebar");
        let sbutton = document.getElementById("SidebarButton");
        if (state === 0) {
            state = 1;
            sidebarcontainer.style.width = '340px';
            sidebar.style.width = '340px';
            sbutton.style['margin-left'] = String(- butwid / 2 - 1) + 'px';
            setButtonLabel(<NavigateBefore></NavigateBefore>);
        }
        else {
            state = 0;
            sidebar.style.width = '0px';
            sidebar.style.width = '0px';
            sbutton.style['margin-left'] = String(-butwid/2 - navwid - 1) + 'px';
            setButtonLabel(<NavigateNext></NavigateNext>);
        }
    }

return (
    <div>
        <button id = 'SidebarButton' className = 'SidebarButton' onClick={(state) => changeDisplay(state)}>{ButtonLabel}</button>    
    </div>
    )
}

export default SidebarButton;
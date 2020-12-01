import React from 'react';
import Themes from '../modules/Theme.js';

const Settings = () =>{
    console.log(Themes);
    const changeTheme = () => {
        /*
        const Arr = Object.keys(Theme2);
        Arr.forEach(key =>{
            console.log(key, Arr);
            document.documentElement.style.setProperty(key, Theme2[key]);
        });
        */
    }

    return (
    <div className = 'SidebarContent'>
        <div className = 'Sidebarhead'>환경설정</div>
        <div className = 'Sidebarbody'>
            <button onClick = {() => changeTheme()}>Theme2</button>
        </div>
    </div>
    )
}

export default Settings;
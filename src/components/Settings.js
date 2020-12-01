import React from 'react';

const Settings = () =>{
    const Theme2 = {
        '--THEME1' : '#000000',
        '--THEME2' : '#EC8282',
        '--THEME3' : '#ECB582',
        '--THEME4' : '#FFFFFF',
        '--THEME5' : '#A0A0A0',
        '--THEME6' : '#FFFFFF',
    }
    const changeTheme = () => {
        const Arr = Object.keys(Theme2);
        Arr.forEach(key =>{
            console.log(key, Arr);
            document.documentElement.style.setProperty(key, Theme2[key]);
        });
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
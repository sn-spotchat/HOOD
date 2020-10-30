import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () =>{
  
    return (
        <div className="navigation">
            <div id="login" className="NavigationIcon">login</div>
            <div id="home" className="NavigationIcon">home</div>
            <div id="list" className="NavigationIcon">list</div>
            <div id="chat" className="NavigationIcon">chat</div>
        </div>
    );
};
  
export default Navigation;
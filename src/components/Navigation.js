import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import './Navigation.css';
/*
추가해야 할 사항:
클릭시 색깔이 변하여 현재 내가 무슨 작업을 하고 있는지 보여주게 한다.
*/
const Navigation = () =>{
    const sidebarstate = useSelector(state => state.reducer, []);
    const dispatch = useDispatch();
    return (
        <div className="navigation">
            <div id="login" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarloginObject)}>login</div>
            <div id="home" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarhomeObject)}>home</div>
            <div id="list" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarlistObject)}>list</div>
            <div id="chat" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarchatObject)}>chat</div>
            <div id="test" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebartestObject)}>test</div>
        </div>
    );
};
  
export default Navigation;
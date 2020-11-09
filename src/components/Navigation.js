import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import './Navigation.css';
import Login from './Login';

/*
추가해야 할 사항:
클릭시 색깔이 변하여 현재 내가 무슨 작업을 하고 있는지 보여주게 한다.
*/
const Navigation = () =>{    
    function copy(result){        
        this.state.id = result.id;
    }
    const sidebarstate = useSelector(state => state.reducer, []);
    const dispatch = useDispatch();
    return (
        <div className="navigation">
            <div id="login"><Login/></div>
            <div id="home" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarhomeObject)}>Home</div>
            <div id="near" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarnearObject)}>Near</div>
            <div id="chat" className="NavigationIcon" onClick={()=>dispatch(actionType.sidebarchatObject)}>Chat</div>
        </div>
    );
};

export default Navigation;
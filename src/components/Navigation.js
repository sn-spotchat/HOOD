import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import './Navigation.css';
import { database } from '../firebase';
import NLogin from './NLogin.js';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';

import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Forum from '@material-ui/icons/Forum';
import PinDrop from '@material-ui/icons/PinDrop';


/*
추가해야 할 사항:
클릭시 색깔이 변하여 현재 내가 무슨 작업을 하고 있는지 보여주게 한다.
*/
const Navigation = ({sidebarstate}) => {
    const [NavList, setNavList] = useState([]);
    const [NavState, setNavState] = useState("");
    const store_loggedin = useSelector(state => state.profilereducer.loggedin, []);
    const dispatch = useDispatch();
    const initialState = useSelector(state => state.mapreducer)
    console.log(initialState)
    console.log(sidebarstate)
    console.log(initialState.sidebarstate)
    //the navigation Icons depend on 'bool loggedin' in store.
    useEffect(() => {
        setNavList([]);
        setNavState(initialState.sidebarstate);
        if (store_loggedin == false) {
            setNavList(oldList => [...oldList, { id: "login", func: () => dispatch(actionType.sidebarloginObject), icon: <Person></Person>}]);
            setNavList(oldList => [...oldList, { id: "home", func: () => dispatch(actionType.sidebarhomeObject), icon: <Home></Home>}]);
        }
        else {
            setNavList(oldList => [...oldList, { id: "mypage", func: () => dispatch(actionType.sidebarmypageObject), icon:<AccountCircle></AccountCircle> }]);
            setNavList(oldList => [...oldList, { id: "home", func: () => dispatch(actionType.sidebarhomeObject), icon: <Home></Home>}]);
            setNavList(oldList => [...oldList, { id: "near", func: () => dispatch(actionType.sidebarnearObject), icon: <PinDrop></PinDrop>}]);
            setNavList(oldList => [...oldList, { id: "chat", func: () => dispatch(actionType.sidebarchatObject), icon: <Forum></Forum>}]);
        }
    }, [store_loggedin, initialState]);

    function navigation_present(element, index){//현재 sidebarstate에 따라 색깔을 달리 표시
        if(element.id === NavState){
            return <div id={element.id} className="NavigationIcon" onClick={element.func} key={index} style={{color:'white', backgroundColor:'blue'}}>{element.icon}</div>
        }
        else{
            return <div id={element.id} className="NavigationIcon" onClick={element.func} key={index}>{element.icon}</div>
        }
    }

    return (
        <div className="Navigation">
            {NavList.map((element, index) => {
                return (
                    <div id={element.id} className="NavigationIcon" onClick={element.func} key={index}>{element.icon}</div>
                )
            })}
        </div>
    );
};

export default Navigation;
//<div id={element.id} className="NavigationIcon" onClick={element.func} key={index}>{element.icon}</div>
//navigation_present(element, index)
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import './Navigation.css';

import Home from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Forum from '@material-ui/icons/Forum';
import PinDrop from '@material-ui/icons/PinDrop';


/*
추가해야 할 사항:
클릭시 색깔이 변하여 현재 내가 무슨 작업을 하고 있는지 보여주게 한다.
*/
const Navigation = () => {
    const [NavList, setNavList] = useState([]);
    const [NavState, setNavState] = useState("");
    const loggedin = useSelector(state => state.flagreducer.loggedin);
    const sidebarstate = useSelector(state => state.statereducer.sidebarstate);
    const dispatch = useDispatch();

    //the navigation Icons depend on 'bool loggedin' in store.

    useEffect(() => {
        setNavList([]);
        setNavState(sidebarstate);
        if (loggedin === false) {
            setNavList(oldList => [...oldList, { id: "login", func: () => dispatch(actionType.setSidebar('login')), icon: <Person></Person>}]);
            setNavList(oldList => [...oldList, { id: "home", func: () => dispatch(actionType.setSidebar('home')), icon: <Home></Home>}]);
        }
        else {
            setNavList(oldList => [...oldList, { id: "mypage", func: () => dispatch(actionType.setSidebar('mypage')), icon:<AccountCircle></AccountCircle> }]);
            setNavList(oldList => [...oldList, { id: "home", func: () => dispatch(actionType.setSidebar('home')), icon: <Home></Home>}]);
            setNavList(oldList => [...oldList, { id: "near", func: () => dispatch(actionType.setSidebar('near')), icon: <PinDrop></PinDrop>}]);
            setNavList(oldList => [...oldList, { id: "chatlist", func: () => dispatch(actionType.setSidebar('chatlist')), icon: <Forum></Forum>}]);
        }
    }, [sidebarstate, loggedin, dispatch]);

    function navigation_present(element, index){//현재 sidebarstate에 따라 색깔을 달리 표시
        if(element.id === NavState){
            return <div id={element.id} className="NavigationIcon" onClick={element.func} key={index} style={{color:'white', backgroundColor:'#5555ff'}}>{element.icon}</div>
        }
        else{
            return <div id={element.id} className="NavigationIcon" onClick={element.func} key={index}>{element.icon}</div>
        }
    }

    return (
        <div className = "Navigation">
            {NavList.map((element, index) => {
                return (
                    navigation_present(element, index)
                )
            })}
        </div>
    );
};

export default Navigation;
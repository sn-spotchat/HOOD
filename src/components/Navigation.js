import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import './Navigation.css';
import { database } from '../firebase';
import NLogin from './NLogin.js';

/*
추가해야 할 사항:
클릭시 색깔이 변하여 현재 내가 무슨 작업을 하고 있는지 보여주게 한다.
*/
const Navigation = () => {
    const [NavList, setNavList] = useState([]);
    const store_loggedin = useSelector(state => state.profilereducer.loggedin, []);
    const dispatch = useDispatch();
    
  const initialState = useSelector(state => state.mapreducer)
  console.log(initialState)

    //the navigation Icons depend on 'bool loggedin' in store.
    useEffect(() => {
        setNavList([]);
        if (store_loggedin == false) {
            setNavList(oldList => [...oldList, { id: "Login", func: () => dispatch(actionType.sidebarloginObject) }]);
        }
        else {
            setNavList(oldList => [...oldList, { id: "Mypage", func: () => dispatch(actionType.sidebarmypageObject) }]);
            setNavList(oldList => [...oldList, { id: "Near", func: () => dispatch(actionType.sidebarnearObject) }]);
            setNavList(oldList => [...oldList, { id: "Chat", func: () => dispatch(actionType.sidebarchatObject) }]);
        }
    }, [store_loggedin]);





    return (
        <div className="Navigation">
            <div id="home" className="NavigationIcon" onClick={() => dispatch(actionType.sidebarhomeObject)}>Home</div>
            {NavList.map((element, index) => {
                return (
                    <div id={element.id} className="NavigationIcon" onClick={element.func} key={index}>{element.id}</div>
                )
            })}
        </div>
    );
};

export default Navigation;
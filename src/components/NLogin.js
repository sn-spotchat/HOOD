import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';
import {database} from '../firebase.js';

const NLogin = () =>{
    const dispatch = useDispatch();
    const oldprofile = useSelector(state => state.profilereducer, {});
    const [profile, setprofile] = useState(oldprofile['profile']);
    const [ERRFLAG, setERRFLAG] = useState(false);
    const [login, setlogin] = useState(false);
    var flag = false;

    useEffect(()=>{
        dispatch(actionType.insertprofile(profile));
    }, [profile]);

    const Login = (result) =>{
        //if result matches with an account in DB, user is set and goes to mypage
        setprofile(result);
        dispatch(actionType.loggedinObject);
        dispatch(actionType.sidebarmypage());    

        //else if it doesn't, the page redirects to NSignin, 
    }
    
    return (
        <NaverLogin 
            //deploy
            //clientId="IiiApimgTUwcBWT8GLsw"            
            //callbackUrl="https://hood-sgtmi.web.app/"
            clientId="dgwFUqPZTSWhHSO0FkGl" 
            callbackUrl="http://localhost:3000/callback"
            render = {(props) => 
            <div onClick={props.onClick}> 
            네이버 아이디로 로그인
            </div>
            }
            onSuccess={(result) => Login(result)}
        />
    );
};

export default NLogin;
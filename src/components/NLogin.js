import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

const NLogin = (props) =>{
    const dispatch = useDispatch();
    const oldprofile = useSelector(state => state.profilereducer, {});
    const [profile, setprofile] = useState(oldprofile['profile']);
    const [login, setlogin] = useState(false);


    useEffect(()=>{
        dispatch(actionType.insertprofile(profile));
    }, [profile]);

    const Login = (result) =>{
        setprofile(result);
        dispatch(actionType.login());
        dispatch(actionType.sidebarmypage());         
    }

    return (
        <NaverLogin 
            //deploy
            //clientId="IiiApimgTUwcBWT8GLsw"            
            //callbackUrl="https://hood-sgtmi.web.app/"
            clientId="dgwFUqPZTSWhHSO0FkGl" 
            callbackUrl="http://localhost:3000/callback"
            render={(props) => 
            <div onClick={props.onClick} >Click</div>
            }
            onSuccess={(result) => Login(result)}
        />   
    );
};

export default NLogin;
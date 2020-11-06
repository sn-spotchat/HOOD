import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

const Login = (props) =>{
    const [profile, setProfile] = useState();

    const ProfileObject = {
        age: undefined,
        birthday: undefined,
        email: undefined,
        gender: undefined,
        id: "00000000",
        name: "GUEST",
        nickname: undefined,
        profile_image: undefined,
    }

    const sidebarstate = useSelector(state => state.reducer, []);
    const dispatch = useDispatch();

    useEffect((result) => {
        setProfile(profile => result);
    }, []);

    return (
        <NaverLogin 
            //clientId="IiiApimgTUwcBWT8GLsw"
            clientId="dgwFUqPZTSWhHSO0FkGl"
            //callbackUrl="https://hood-sgtmi.web.app/"
            callbackUrl="http://127.0.0.1:3000"
            render={(props) => 
            <div onClick={props.onClick} >
                <img className = "NavigationIcon" src = {require('./naver.png')}/>
            </div>
            }
            onSuccess={(result) => console.log(result)}
            onSuccess={(result) => dispatch(actionType.insertUserInfo(result))}
            onFailure={(result) => console.error(result)}           
            //onSuccess={(result) => this.setProfile(result)}            
        />   
    );
};

export default Login;
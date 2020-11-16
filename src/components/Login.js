import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

const Login = (props) =>{
    const dispatch = useDispatch();
    return (
        <NaverLogin 
            //deploy
            //clientId="IiiApimgTUwcBWT8GLsw"            
            //callbackUrl="https://hood-sgtmi.web.app/"
            clientId="dgwFUqPZTSWhHSO0FkGl" 
            callbackUrl="http://localhost:3000/callback"
            render={(props) => 
            <div onClick={props.onClick} >
                <img className = "NavigationIcon" src = {require('./naver.png')}/>
            </div>
            }
            onSuccess={(result) => console.log(result)}
            onSuccess={(result) => dispatch(actionType.insertprofile(result))}
            //onFailure={(result) => console.error(result)}          
            
        />   
    );
};

export default Login;

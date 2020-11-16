import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

const NLogin = (props) =>{
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
                <div className = "NavigationIcon">Click</div>
            </div>
            }
            onSuccess={(result) => dispatch(actionType.insertprofile(result))}
            onSuccess={() => dispatch(actionType.mypageselectermypage())}           
        />   
    );
};

export default NLogin;
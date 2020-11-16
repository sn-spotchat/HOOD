import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import {useSelector, useDispatch} from 'react-redux';
import * as actionType from '../modules/action';

const Signin = (props) =>{
    const dispatch = useDispatch();
    return (
        <div>
            this is Signin.js
        </div>
    );
};

export default Signin;
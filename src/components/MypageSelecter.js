import React, { useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Near.css';
import * as actionType from '../modules/action';
import {database} from '../firebase.js';
import Login from './Login';
import Mypage from './Mypage';
import Signin from './Signin';


const MypageSelecter = ({mypageselecterstate}) =>{
  const [mypageselecterType, setmypageselecterType] = useState(mypageselecterstate);


  useEffect(()=>{
    console.log(mypageselecterstate);
    if(mypageselecterstate === 'login'){
      setmypageselecterType(<Login/>);
    }
    else if (mypageselecterstate === 'signin'){
      setmypageselecterType(<Signin/>);
    }
    else if( mypageselecterstate === 'mypage'){
      setmypageselecterType(<Mypage/>);
    }
  }, [mypageselecterstate]);

  return(
    <div className = 'mypageselecter'>
      {mypageselecterType}
    </div>
  )
}

export default MypageSelecter;

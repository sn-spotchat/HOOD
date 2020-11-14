import React, { useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import './Near.css';
import Login from './Login.js';
import {database} from '../firebase.js';


const Mypage = (props) =>{
  
 // var key = firebase.database().ref('/user').key;
  //console.log(key);


  return (
    <div className="Mypage">
      <Login/>
      Hello?
    </div>
  );
}

export default Mypage;

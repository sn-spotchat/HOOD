import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import NLogin from './NLogin';
import './Login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const Login = () => {
  const [ERROR, setERROR] = useState(false);
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(1, 1, 1),
      height: '30px',
      width: '90px',
      color: '#ffffff',
      backgroundColor: '#7ec4eb',
    },
    nsubmit: {
      margin: theme.spacing(1, 1, 1),
      height: '30px',
      width: '196px',
      color: '#ffffff',
      backgroundColor: '#4ed48b',
    },
  })
  );
  const classes = useStyles();


  const changeID = (event) => {
    setID(event.target.value);
  }
  const changePW = (event) => {
    setPW(event.target.value);
  }

  const Authenticate = async () => {
    setERROR(false);
    await database.ref('/user').once('value').then((Snap) => {
      const Accounts = Snap.val();
      if(Accounts === undefined || Accounts === null) {        
        setERROR(true);return;
      }
      const Arr = Object.keys(Snap.val());
      Arr.forEach(key => {
        if (Accounts[key]['ID'] === ID && Accounts[key]['PW'] === PW) {
          dispatch(actionType.setUser(Accounts[key]));
          dispatch(actionType.loggedinObject);
          dispatch(actionType.setSidebar('mypage'));
        }
        else {
          setERROR(true);
        }
      })
    });
  }
  return (
    <div className='SidebarContent'>
      <div className="Sidebarhead" style = {{'fontSize' : '30px'}}>로그인</div>
      <img className='Icon' src={require('./HoodIcon.png')} alt = 'icon'/>
      <TextField onChange={(event) => changeID(event)} error={ERROR} variant='outlined' label='ID' margin="dense" />
      <TextField onChange={(event) => changePW(event)} error={ERROR} variant='outlined' type = 'password' label="Password" margin="dense" />
      <div className='SigninRow'>
        <Button onClick={() => Authenticate()} variant="contained" color="primary" className={classes.submit}>로그인</Button>
        <Button onClick={() => dispatch(actionType.setSidebar('signin'))} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
      </div>
      <Button variant="contained" color="primary" className={classes.nsubmit} >
        <NLogin/>
      </Button>
    </div>
  );
};

export default Login;

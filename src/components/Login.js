import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import NLogin from './NLogin';
import './Login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const Login = () => {
  const [profile, setprofile] = useState({});
  const [MATCHFOUND, setMATCHFOUND] = useState(false);
  const [ERROR, setERROR] = useState(false);
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (MATCHFOUND == true) {
      dispatch(actionType.insertprofile(profile));
      dispatch(actionType.loggedinObject);
      dispatch(actionType.sidebarmypage());
    }
  }, [profile]);

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
      const Arr = Object.keys(Snap.val());
      Arr.forEach(key => {
        if (Accounts[key]['ID'] == ID && Accounts[key]['PW'] == PW) {
          setMATCHFOUND(true);
          setprofile(Accounts[key]['profile']);
          dispatch(actionType.loginid(ID));
          dispatch(actionType.loginpw(PW));
          if(Accounts[key]['chatroomlist'] !== null && Accounts[key]['chatroomlist'] !== undefined){
            Object.values(Accounts[key]['chatroomlist']).forEach(data =>{
              dispatch(actionType.insertchatroom(data['chatroom_id']));
            });
          }
        }
        else {
          setERROR(true);
        }
      })
    });
  }
  return (
    <form className='SigninMain'>
      <div className='MarginTop'>
        <img className='Icon' src={require('./HoodIcon.png')}></img>
      </div>
      <Typography component="h1" variant="h5" >로그인</Typography>
      <TextField onChange={(event) => changeID(event)} error={ERROR} variant='outlined' label='ID' margin="dense" />
      <TextField onChange={(event) => changePW(event)} error={ERROR} variant='outlined' label="PW" margin="dense" />
      <div className='SigninRow'>
        <Button onClick={() => Authenticate()} variant="contained" color="primary" className={classes.submit}>로그인</Button>
        <Button onClick={() => dispatch(actionType.sidebarsigninObject)} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
      </div>
      <Button variant="contained" color="primary" className={classes.nsubmit}>
        <NLogin />
      </Button>
    </form>
  );
};

export default Login;

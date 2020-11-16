import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import * as actionType from '../modules/action';
import NLogin from './NLogin';
import Signin from './Signin';
import './Login.css';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { database } from '../firebase';

const useStyles = makeStyles((theme) => ({  
    submit: {
        margin: theme.spacing(1, 1, 1),
        height : '30px',
        width : '90px',
        color : '#ffffff',
        backgroundColor:'#7ec4eb',
    },
    submit2: {
        margin: theme.spacing(1, 1, 1),
        height : '30px',
        width : '198px',
        color : '#ffffff',
        backgroundColor:'#7ec4eb',
    },
  })
);




const Login = () =>{
  const oldprofile = useSelector(state => state.profilereducer, {})
  const [profile, setprofile] = useState(oldprofile['profile']);
  const [dbdata, setdbdata] = useState();
  const [ERRFLAG, setERRFLAG] = useState(false);
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const dispatch = useDispatch();

  const classes = useStyles(); 

  useEffect(()=>{
    dispatch(actionType.insertprofile(profile));  
  }, [profile]);
  
  const changeID = (event) => {
    setID(event.target.value);      
  }
  const changePW = (event) => {
    setPW(event.target.value);      
  }    

  const Authenticate = () => {    
    var flag = false;
    database.ref('/user').once('value', function(snapshot) {
      snapshot.val().forEach(function(Snap){
        if(ID == Snap['ID'] && PW == Snap['PW']){
          setprofile(Snap['profile'])
          dispatch(actionType.login());
          dispatch(actionType.sidebarmypage()); 
          console.log('matches ');
          console.log(Snap['name'])
          flag = true;
        }
      })
    }); 
    if (flag == false){
      setERRFLAG(true)
    }
  }
    return(
        <form className = 'SigninMain'>
            <div className = 'MarginTop'>
                <img className = 'Icon' src = {require('./HoodIcon.png')}></img>
            </div>
            <Typography component="h1" variant="h5" >로그인</Typography>
            <TextField onChange = {(event) => changeID(event)} error = {ERRFLAG} variant = 'outlined' label='ID' margin="dense"/>
            <TextField onChange = {(event) => changePW(event)} error = {ERRFLAG} variant = 'outlined' label="PW" margin="dense"/>
            <div className = 'SigninRow'>
              <Button onClick = {() => Authenticate()} variant="contained" color="primary" className={classes.submit}>로그인</Button>
              <Button onClick = {() => dispatch(actionType.sidebarsigninObject)} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
            </div>    
            <NLogin/>        
        </form>
    );  
};

export default Login;
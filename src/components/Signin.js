import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actionType from '../modules/action';
import NLogin from './NLogin';
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
        height: '30px',
        width: '90px',
        color: '#ffffff',
        backgroundColor: '#7ec4eb',
    },
    nsubmit: {
        margin: theme.spacing(1, 1, 1),
        height: '30px',
        width: '198px',
        color: '#ffffff',
        backgroundColor: '#4ed48b',
    },
})
);

const Signin = (props) => {
    const dispatch = useDispatch();
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [NAME, setNAME] = useState('');
    const [IDERRFLAG, setIDERRFLAG] = useState(false);
    const [PWERRFLAG, setPWERRFLAG] = useState(false);
    const [NAMEERRFLAG, setNAMEERRFLAG] = useState(false);
    const [profile, setprofile] = useState({});
    const [User, setUser] = useState();
    const classes = useStyles();
    const [flag, setflag] = useState(false);
    

    //setprofile
    //setUser
    //DB.push
    //the above cycle must be done in order and made the code messy
    //optimization is needed
    useEffect(()=>{        
        if(flag == true) { 
            setprofile({
                age : '',                
                birthday:'',
                email:'',
                gender:'',
                id:'',
                name : NAME,
                nickname:'',
                profile_image:'',                
            });
        }
    },[flag])

    useEffect(()=>{        
        if(flag == true) {             
            setUser({
                ID : ID,
                PW : PW,
                chatlist : [null],
                chatroomlist : [null],
                profile : profile,
            });                       
        }
    },[profile])
    
    useEffect(()=>{        
        if(flag == true) {  
            database.ref('/user').push(User); 
            dispatch(actionType.insertprofile(profile));
            dispatch(actionType.loggedinObject);
            dispatch(actionType.sidebarmypageObject);
        }
    },[User])

    const changeID = (event) => {
        setID(event.target.value);
    }
    const changePW = (event) => {
        setPW(event.target.value);
    }
    const changeNAME = (event) => {
        setNAME(event.target.value);
    }

    //Checkvalid is a function that checks whether given inputs are valid.
    //it refers DB so syncronization was needed
    const Checkvalid = async () => {
        var valid = true;
        var MSG = '';
        setNAMEERRFLAG(false);
        setIDERRFLAG(false);
        setPWERRFLAG(false);
        if (NAME.length == 0) { MSG = '이름을 입력하세요'; valid = false; setNAMEERRFLAG(true); }
        else if (ID.length == 0) { MSG = '아이디를 입력하세요'; valid = false; setIDERRFLAG(true); }
        else if (PW.length == 0) { MSG = '비밀번호를 입력하세요'; valid = false; setPWERRFLAG(true); }
        else if (ID.length < 6) { MSG = '아이디는 6글자 이상이어야합니다'; valid = false; setIDERRFLAG(true); }
        else if (PW.length < 6) { MSG = '비밀번호는 6글자 이상이어야합니다.'; valid = false; setPWERRFLAG(true); }
        else {
            var exists = false;
            await database.ref('/user').once('value', (Snap) =>{
                const Accounts = Snap.val();
                const Arr = Object.keys(Accounts);
                Arr.forEach(key => {
                    if(Accounts[key]['ID'] == ID) exists = true;
                })
                if (exists == true) {
                    MSG = '이미 사용중인 아이디입니다.'; valid = false; setIDERRFLAG(true);
                }                
            });            
        }
        return [MSG, valid]
    }

    //SigninProcess is the function called when Signinbutton is Clicked
    const SigninProcess = () => {
        Checkvalid().then(([MSG, valid]) => {
             if (valid) {           
               setflag(true);
            }
            else {
                alert(MSG)
            }
        });
    }
    //the user with NLogin has to create one's own account for hood and map with NLogin
    //after this commit, the above function will be added
    return (
        <form className='SigninMain'>
            <div className='MarginTop'>
                <img className='Icon' src={require('./HoodIcon.png')}></img>
            </div>
            <Typography component="h1" variant="h5" >회원가입</Typography>
            <TextField onChange={(event) => changeNAME(event)} error={NAMEERRFLAG} variant='outlined' label="이름" margin="dense" />
            <TextField onChange={(event) => changeID(event)} error={IDERRFLAG} variant='outlined' label='ID' margin="dense" />
            <TextField onChange={(event) => changePW(event)} error={PWERRFLAG} variant='outlined' label="PW" margin="dense" />
            <div className='SigninRow'>
                <Button onClick={() => SigninProcess()} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
            </div>
            <Button variant="contained" color="primary" className={classes.nsubmit}>
                <NLogin />
            </Button>
        </form>
    );
};

export default Signin;
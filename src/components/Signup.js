import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
        width: '198px',
        color: '#ffffff',
        backgroundColor: '#4ed48b',
    },
})
);

const Signin = (props) => {
    const dispatch = useDispatch();
    const [NAME, setNAME] = useState('');
    const [NICKNAME, setNICKNAME] = useState('');
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [PWCONFIRM, setPWCONFIRM] = useState('');

    const [NAMEERRFLAG, setNAMEERRFLAG] = useState(false);
    const [NICKNAMEERRFLAG, setNICKNAMEERRFLAG] = useState(false);
    const [IDERRFLAG, setIDERRFLAG] = useState(false);
    const [PWERRFLAG, setPWERRFLAG] = useState(false);
    const [PWCONFIRMERRFLAG, setPWCONFIRMERRFLAG] = useState(false);

    const classes = useStyles();


    const changeNAME = (event) => {
        setNAME(event.target.value);
    }
    const changeNICKNAME = (event) => {
        setNICKNAME(event.target.value);
    }
    const changeID = (event) => {
        setID(event.target.value);
    }
    const changePW = (event) => {
        setPW(event.target.value);
    }
    const changePWCONFIRM = (event) => {
        setPWCONFIRM(event.target.value);
    }

    //Checkvalid is a function that checks whether given inputs are valid.
    //it refers DB so syncronization was needed
    const Checkvalid = async () => {
        var valid = true;
        var MSG = '';
        setNAMEERRFLAG(false);setNICKNAMEERRFLAG(false);setIDERRFLAG(false);setPWERRFLAG(false);
        if (NAME.length === 0) { MSG = '이름을 입력하세요'; valid = false; setNAMEERRFLAG(true); }
        else if (NICKNAME.length < 2) { MSG = '닉네임은 2글자 이상이어야 합니다.'; valid = false; setNICKNAMEERRFLAG(true);}
        else if (ID.length < 6) { MSG = '아이디는 6글자 이상이어야합니다'; valid = false; setIDERRFLAG(true); }
        else if (PW.length < 6) { MSG = '비밀번호는 6글자 이상이어야합니다.'; valid = false; setPWERRFLAG(true); }
        else if (PW !== PWCONFIRM) { MSG = '비밀번호 확인이 일치하지 않습니다.'; valid = false; setPWCONFIRMERRFLAG(true); }
        else {
            var exists = false;
            await database.ref('/user').once('value', (Snap) => {
                const Accounts = Snap.val();
                if(Accounts === undefined || Accounts === null){
                    return;
                }
                const Arr = Object.keys(Accounts);
                Arr.forEach(key => {
                    if (Accounts[key]['ID'] === ID) exists = true;
                })
                if (exists) {
                    MSG = '이미 사용중인 아이디입니다.'; valid = false; setIDERRFLAG(true);
                }
            });
        }
        return [MSG, valid]
    }

    //SigninProcess is the function called when Signinbutton is Clicked
    const SigninProcess = () => {
        Checkvalid().then(([MSG, valid]) => {
            if(valid === true){
                let profile = {
                    name : NAME,
                };
                let user = {
                    ID: ID,
                    PW: PW,
                    nickname: NICKNAME,
                    chatlist: [null],
                    chatroomlist: [null],
                    profile: profile,
                };
                database.ref('/user').push(user);
                console.log(user);
                alert('회원가입이 완료되었습니다. 로그인해주세요.');
                dispatch(actionType.setSidebar('login'));
            }
            else{
                alert(MSG);
            }
        });
    }
    return (
        <div className='SidebarContent'>
            <img className='Icon' src={require('./HoodIcon.png')} alt="icon"></img>
            <Typography component="h1" variant="h5" >후드 회원가입</Typography>
            <TextField onChange={(event) => changeNAME(event)} error={NAMEERRFLAG} variant='outlined' label="이름" margin="dense" />
            <TextField onChange={(event) => changeNICKNAME(event)} error={NICKNAMEERRFLAG} variant='outlined' label="닉네임" margin="dense" />
            <TextField onChange={(event) => changeID(event)} error={IDERRFLAG} variant='outlined' label='ID' margin="dense" />
            <TextField onChange={(event) => changePW(event)} error={PWERRFLAG} variant='outlined' type="password" label="Password" margin="dense" />
            <TextField onChange={(event) => changePWCONFIRM(event)} error={PWCONFIRMERRFLAG} variant='outlined' type="password" label="Password Confirm" margin="dense" />
            <div className='SigninRow'>
                <Button onClick={() => SigninProcess()} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
            </div>
            <Button variant="contained" color="primary" className={classes.nsubmit}>
                <NLogin />
            </Button>
        </div>
    );
};

export default Signin;
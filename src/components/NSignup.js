import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import './Login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const Signin = (props) => {
    const dispatch = useDispatch();
    const [NICKNAME, setNICKNAME] = useState('');
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [PWCONFIRM, setPWCONFIRM] = useState('');

     const [NAMEERRFLAG, setNAMEERRFLAG] = useState(false);
    const [NICKNAMEERRFLAG, setNICKNAMEERRFLAG] = useState(false);
    const [IDERRFLAG, setIDERRFLAG] = useState(false);
    const [PWERRFLAG, setPWERRFLAG] = useState(false);
    const [PWCONFIRMERRFLAG, setPWCONFIRMERRFLAG] = useState(false);

    const profile = useSelector(state => state.profilereducer.profile);
    const NAME = useSelector(state => state.profilereducer.profile.name);
    const [User, setUser] = useState();
    const [flag, setflag] = useState(false);

    const useStyles = makeStyles((theme) => ({
        submit: {
            margin: theme.spacing(1, 1, 1),
            height: '30px',
            width: '90px',
            color: '#ffffff',
            backgroundColor: '#7ec4eb',
        },
        name: {
            borderColor: '#22bb55',
        },
    })
    );
    const classes = useStyles();
    //setUser
    //DB.push
    //the above cycle must be done in order and made the code messy
    //optimization is needed    
    useEffect(() => {
        if (flag == true) {
            setUser({
                ID: ID,
                PW: PW,
                nickname: NICKNAME,
                chatlist: [null],
                chatroomlist: [null],
                profile: profile,
            });
        }
    }, [flag])

    useEffect(() => {
        if (flag == true) {
            console.log(User);
            database.ref('/user').push(User);
            dispatch(actionType.insertprofile(profile));
            dispatch(actionType.insertnickname(NICKNAME));
            dispatch(actionType.loggedinObject);
            dispatch(actionType.sidebarmypageObject);
        }
    }, [User])

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
        setNAMEERRFLAG(false);
        setNICKNAMEERRFLAG(false);
        setIDERRFLAG(false);
        setPWERRFLAG(false);
        if (NICKNAME.length < 2) { MSG = '닉네임은 2글자 이상이어야 합니다.'; valid = false; setNICKNAMEERRFLAG(true);}
        else if (ID.length < 6) { MSG = '아이디는 6글자 이상이어야합니다'; valid = false; setIDERRFLAG(true); }
        else if (PW.length < 6) { MSG = '비밀번호는 6글자 이상이어야합니다.'; valid = false; setPWERRFLAG(true); }
        else if (PW != PWCONFIRM) { MSG = '비밀번호 확인이 일치하지 않습니다.'; valid = false; setPWCONFIRMERRFLAG(true); }
        else {
            var exists = false;
            await database.ref('/user').once('value', (Snap) => {
                const Accounts = Snap.val();
                const Arr = Object.keys(Accounts);
                Arr.forEach(key => {
                    if (Accounts[key]['ID'] == ID) exists = true;
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
    return (
        <div className='SidebarContent'>
            <img className='Icon' src={require('./HoodIcon.png')}></img>
            <Typography component="h1" variant="h5" >네이버-후드 회원가입</Typography>
            <TextField InputProps={{ readOnly: true }} variant='outlined' label= '이름' defaultValue = {NAME} margin="dense" />
            <TextField onChange={(event) => changeNICKNAME(event)} error={NICKNAMEERRFLAG} variant='outlined' label="닉네임" margin="dense" />
            <TextField onChange={(event) => changeID(event)} error={IDERRFLAG} variant='outlined' label='ID' margin="dense" />
            <TextField onChange={(event) => changePW(event)} error={PWERRFLAG} variant='outlined' type="password" label="Password" margin="dense" />
            <TextField onChange={(event) => changePWCONFIRM(event)} error={PWCONFIRMERRFLAG} variant='outlined' type="password" label="Password Confirm" margin="dense" />
            <div className='SigninRow'>
                <Button onClick={() => SigninProcess()} variant="contained" color="primary" className={classes.submit}>회원가입</Button>
            </div>
        </div>
    );
};

export default Signin;
import React, { useEffect, useState } from 'react';
import NaverLogin from './RNL';
import { useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase.js';
import { setEmitFlags } from 'typescript';

const NLogin = (props) => {
    const dispatch = useDispatch();
    const [nickname, setnickname] = useState();
    const [profile, setprofile] = useState({});
    const [userid, setuserid] = useState();
    const [flag, setflag] = useState(false);
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [chatroomlist, setchatroomlist] = useState();

    useEffect(() => {
        if (flag === true) {
            console.log('here', userid, ID, PW);
            dispatch(actionType.insertprofile(profile));
            dispatch(actionType.insertnickname(nickname));
            dispatch(actionType.setuserid(userid));
            dispatch(actionType.loginid(ID));
            dispatch(actionType.loginpw(PW));
            dispatch(actionType.sidebarmypageObject);
            dispatch(actionType.loggedinObject);
            if (chatroomlist !== null && chatroomlist !== undefined) {
                Object.values(chatroomlist).forEach(data => {
                    dispatch(actionType.insertchatroom(data['chatroom_id']));
                });
            }
        }
    }, [flag]);

    const CheckExist = async (Nuser) => {
        let exist = false;
        let user = null;
        let nickname = null;
        let retkey = null;
        let ID = '';
        let PW = '';
        let chatroomlist = {};
        await database.ref('/user').once('value').then((Snap) => {
            const Accounts = Snap.val();
            const Arr = Object.keys(Accounts);
            Arr.forEach(key => {
                if (Accounts[key]['profile']['id'] == Nuser['id']) {
                    console.log(Accounts[key]);
                    retkey = key;
                    exist = true;
                    user = Accounts[key]['profile'];
                    nickname = Accounts[key]['nickname'];
                    ID = Accounts[key]['ID'];
                    PW = Accounts[key]['PW'];
                    chatroomlist = Accounts[key]['chatroomlist'];                    
                }
            })
        })
        return [exist, user, nickname, retkey, ID, PW, chatroomlist];
    }
    const Login = (User) => {
        //if result matches with an account in DB, user is set and goes to mypage
        CheckExist(User).then((ret) => {
            if (ret[0]) { // ret[0] = exist
                setprofile(ret[1]); //ret[1] = user;
                setnickname(ret[2]); //ret[2] = nickname;
                setuserid(ret[3]); // ret[3] = userid
                setID(ret[4]); // ret[4] = ID
                setPW(ret[5]); //ret[5] = PW
                setchatroomlist(ret[6]);
                setflag(true);
            }
            else {
                const Arr = Object.keys(User);
                Arr.forEach(key => {
                    if (User[key] == undefined) {
                        User[key] = '';
                    }
                })
                setprofile(User);
                dispatch(actionType.insertprofile(User));
                dispatch(actionType.sidebarnsigninObject);
            }
        })
        //else if it doesn't, the page redirects to NSignin, 
    }
    return (
        <NaverLogin onSuccess={(result) => Login(result)} />
    );
};

export default NLogin;
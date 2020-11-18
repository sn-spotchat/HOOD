import React, { useEffect, useState } from 'react';
import NaverLogin from './RNL';
import { useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase.js';

const NLogin = (props) => {
    const dispatch = useDispatch();
    const [profile, setprofile] = useState({});

    useEffect(() => {
        dispatch(actionType.insertprofile(profile));
    }, [profile]);

    const CheckExist = async (Nuser) => {
        var exist = false;
        var user = null;
        await database.ref('/user').once('value').then((Snap) => {
            const Accounts = Snap.val();
            const Arr = Object.keys(Accounts);
            Arr.forEach(key => {
                if (Accounts[key]['profile']['id'] == Nuser['id']) {
                    exist = true;
                    user = Accounts[key]['profile'];
                }
            })
        })
        return [exist, user];
    }
    const Login = (User) => {
        //if result matches with an account in DB, user is set and goes to mypage
        CheckExist(User).then((ret) => {
            if (ret[0]) { // ret[0] = exist
                console.log('exists!');
                setprofile(ret[1]); //ret[1] = user;
                dispatch(actionType.sidebarmypageObject);
                dispatch(actionType.loggedinObject);
            }
            else {
                console.log('no match!')
                const Arr = Object.keys(User);
                Arr.forEach(key => {
                    if (User[key] == undefined) {
                        User[key] = '';
                    }
                })
                setprofile(User);
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
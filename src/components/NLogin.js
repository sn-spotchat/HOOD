import React from 'react';
import NaverLogin from './RNL';
import { useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';

const NLogin = (props) => {
    const dispatch = useDispatch();


    const CheckExist = async (Nuser) => {
        let exist = false;
        let user = null;
        let retkey = null;
        await database.ref('/user').once('value').then((Snap) => {
            const Accounts = Snap.val();
            if(Accounts === undefined || Accounts === null){
                return;
            }
            const Arr = Object.keys(Accounts);
            Arr.forEach(key => {
                if(Accounts[key]['profile'] === undefined) return;
                if (Accounts[key]['profile']['id'] === Nuser['id']) {
                    exist = true;
                    retkey = key;
                    user = Accounts[key];             
                }
            })
        })
        return [exist, user, retkey];
    }
    const Login = (User) => {
        //if result matches with an account in DB, user is set and goes to mypage
        CheckExist(User).then((ret) => {
            if (ret[0]) { // ret[0] = exist                
                dispatch(actionType.setUser(ret[1]));
                dispatch(actionType.setKey(ret[2]));
                dispatch(actionType.setSidebar('mypage'));
                dispatch(actionType.loggedinObject);
            }
            else {
                //if it doesn't exist, automatically signs up
                let Newuser = {
                    ID: 'Naver' + User['id'],
                    PW: -1,
                    nickname: 'Naver' + User['id'],
                    profile : {},
                };
                Object.keys(User).forEach(key =>{
                    if(User[key] !== undefined){
                        Newuser.profile[key] = User[key];
                    }
                })

                database.ref('/user').push(Newuser);
                alert('네이버 회원가입이 완료되었습니다. 다시 네이버 로그인을 진행해주세요.')
                dispatch(actionType.setSidebar('login'));
            }
        })
    }
    return (
        <NaverLogin onSuccess={(result) => Login(result)} />
    );
};

export default NLogin;
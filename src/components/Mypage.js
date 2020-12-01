import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import * as actionType from '../modules/action';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import './Mypage.css';
import { database } from '../firebase';

const Mypage = (props) => {
    const user = useSelector(state => state.userreducer);    

    const [EditID, setEditID] = useState(false);
    const [ID, setID] = useState(user.ID);
    const [valid_ID, setvalid_ID] = useState(true);
    
    const [EditNickname, setEditNickname] = useState(false);
    const [NICKNAME, setNICKNAME] = useState(user.nickname);
    const [valid_NICKNAME, setvalid_NICKNAME] = useState(true);
    
    const [EditPW, setEditPW] = useState(false);
    const [PW, setPW] = useState('');
    const [PWConfirm, setPWConfirm] = useState('');
    const [valid_PW, setvalid_PW] = useState(true);
    const [valid_PWConfirm, setvalid_PWConfirm] = useState(true);

    const dispatch = useDispatch();
    var profile_image;
    if(user.profile !== undefined && user.profile.profile_image !== undefined&& user.profile.profile_image !== null)
        profile_image = user.profile.profile_image;
    else{
        profile_image = require('./profile.png');
    }

    const EditNicknameIcon = ()=>{
        if(EditNickname === false){
            return <EditIcon fontSize = 'small'/>
        }
        else{
            return <SaveIcon fontSize = 'small'/>
        }
    }
    const EditIDIcon = ()=>{
        if(EditID === false){
            return <EditIcon fontSize = 'small'/>
        }
        else{
            return <SaveIcon fontSize = 'small'/>
        }
    }
    const EditPWIcon = ()=>{
        if(EditPW === false){
            return <EditIcon fontSize = 'small'/>
        }
        else{
            return <SaveIcon fontSize = 'small'/>
        }
    }
    const ClickEditNickname = ()=>{
        let MSG = '';
        let valid = !EditNickname;
        console.log(NICKNAME);
        if (valid === false){
            if(NICKNAME.length < 2){
                MSG = '닉네임은 2글자 이상이어야 합니다.'; 
                setvalid_NICKNAME(false);
                valid = false;
            }
            else{                
                MSG = '닉네임이 변경되었습니다.'
                dispatch(actionType.setNickname(NICKNAME));
                database.ref('user/' + user.key + '/nickname').set(NICKNAME);
                valid = true;
                setvalid_NICKNAME(true);
            }
            alert(MSG);            
        }
        if(valid === true)
            setEditNickname(!EditNickname);       
    }
    const ClickEditID = ()=>{
        let MSG = '';
        let valid = !EditID;
        console.log(ID);
        if (valid === false){
            if(ID.length < 6){
                MSG = '아이디는 6글자 이상이어야 합니다.'; 
                setvalid_ID(false);
                valid = false;    
                alert(MSG);   
            }
            else{
                database.ref('/user').once('value', Snap => {
                    const Accounts = Snap.val();
                    if(Accounts === undefined || Accounts === null) return;
                    const Arr = Object.keys(Accounts);
                    let exists = false;
                    Arr.forEach(key =>{
                        if (Accounts[key]['ID'] === ID) exists = true;
                    })
                    if(exists === true){
                        MSG = '이미 사용중인 아이디입니다.';
                        valid = false;
                        setvalid_ID(false);
                    }
                    else{           
                        MSG = '아이디가 변경되었습니다.'
                        dispatch(actionType.setID(ID));
                        database.ref('user/' + user.key + '/ID').set(ID);
                        valid = true;
                        setvalid_ID(true);
                    }
                    if(valid === true)
                        setEditID(!EditID);    
                    alert(MSG);   
                })               
            }      
        }   
        if(valid === true)
            setEditID(!EditID);    
    }
    const ClickEditPW = ()=>{
        let MSG = '';
        let valid = !EditPW;
        console.log(PW);
        if (valid === false){
            if(PW.length < 6){
                MSG = '비밀번호는 6글자 이상이어야 합니다.'; 
                setvalid_PW(false);
                valid = false;
            }
            else if (PW !== PWConfirm){
                MSG = '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
                setvalid_PW(false);
                setvalid_PWConfirm(false);
            }
            else{                
                MSG = '비밀번호가 변경되었습니다.'
                dispatch(actionType.setPW(PW));
                database.ref('user/' + user.key + '/PW').set(PW);
                valid = true;
                setPW('');
                setPWConfirm('');
                setvalid_PW(true);
                setvalid_PWConfirm(true);
            }
            alert(MSG);            
        }
        if(valid === true)
            setEditPW(!EditPW);       
    }
    const changeNickname = (event) => {
      setNICKNAME(event.target.value);
    }    
    const changePW = (event) => {
        setPW(event.target.value);
      }
    const changeID = (event) => {
        setID(event.target.value);
    }
    const changePWConfirm = (event) => {
        setPWConfirm(event.target.value);
    }
      
    const PasswordField = () =>{
        if(EditPW === false){
            return(
                <div className = 'mypagerow'>
                    <TextField label='비밀번호' defaultValue = {user.PW} type = 'password' InputProps={{readOnly: true}} margin="dense" />
                    <button className = 'mypageedit'onClick = {() => ClickEditPW()}><EditPWIcon/></button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className = 'mypagerow'>
                        <TextField label='새 비밀번호' onChange={(event) => changePW(event)} type = 'password' error = {!valid_PW} margin="dense" />
                        <button className = 'mypageedit' onClick = {() => ClickEditPW()}><EditPWIcon/></button>
                    </div>
                    <div className = 'mypagerow'>
                        <TextField label='비밀번호 확인' onChange={(event) => changePWConfirm(event)}  type = 'password' error = {!valid_PWConfirm} margin="dense" />
                    </div>
                </div>
            )
        }
    }
    return (
        <div className='SidebarContent'>
            <div className="Sidebarhead" >내 정보</div>
            <div className="Sidebarbody">
                <img className = 'Icon' src = {profile_image} alt='icon'></img>
                <div className = 'mypagebody'>                
                    <div className = 'mypagerow'>
                        <TextField label='이름' defaultValue = {user.profile.name} InputProps={{readOnly:true}} margin="dense" /> 
                    </div>
                    <div className = 'mypagerow'>
                        <TextField label='ID' onChange={(event) => changeID(event)} error = {!valid_ID} defaultValue = {user.ID} InputProps={{readOnly:!EditID}}  margin="dense" />   
                        <button className = 'mypageedit' onClick = {() => ClickEditID()}><EditIDIcon/></button>
                    </div>
                    <div className = 'mypagerow'>
                        <TextField label='닉네임' onChange={(event) => changeNickname(event)} error = {!valid_NICKNAME} defaultValue = {user.nickname} InputProps={{readOnly:!EditNickname}} margin="dense" />
                        <button className = 'mypageedit' onClick = {() => ClickEditNickname()}><EditNicknameIcon/></button>
                    </div>
                    {PasswordField()}
                </div>  
            </div>
        </div>
    );
};

export default Mypage;
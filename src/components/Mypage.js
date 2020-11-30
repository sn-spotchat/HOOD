import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import './Mypage.css';


const Mypage = (props) => {
    const nickname = useSelector(state => state.userreducer.nickname);
    const user = useSelector(state => state.userreducer);

    var profile_image;
    if(user.profile !== undefined && user.profile.profile_image !== undefined&& user.profile.profile_image !== null)
        profile_image = user.profile.profile_image;
    else{
        profile_image = require('./profile.png');
    }
    
    console.log(user);
    return (
        <div className = 'Mypage'>
            <div className = 'mypagehead'>
                {nickname}님 어서오세요!
            </div>
            <div className = 'mypagebody'>
                <img className = 'mypageprofile' src = {profile_image} alt='icon'></img>
                <TextField variant='outlined' label='이름' value = {user.profile.Name} margin="dense" />
                <TextField variant='outlined' label='ID' margin="dense" />
            </div>
        </div>
    );
};

export default Mypage;
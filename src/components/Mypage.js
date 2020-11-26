import React from 'react';
import { useSelector } from 'react-redux';


const Mypage = (props) => {  
    const nickname = useSelector(state => state.userreducer.nickname);
    const user = useSelector(state => state.userreducer);
    console.log(user);
    return (
        <div className='SidebarContent'>
            <div>{nickname}님 어서오세요!</div>
        </div>
    );
    /*
    return (
        <div className='SidebarContent'>
            <img className='Icon' src={require(profileimage)}></img>
            <div>{nickname}님 어서오세요!</div>
        </div>
    );
    */
};

export default Mypage;
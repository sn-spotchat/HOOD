import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Mypage = (props) => {
    const dispatch = useDispatch();    
    const profile = useSelector(state => state.profilereducer);
    const nickname = useSelector(state => state.profilereducer.nickname);
    const profileimage = useSelector(state => state.profilereducer.profileimage);

console.log(profileimage);
    return (
        <div className='SidebarContent'>
            <div>{nickname}님 어서오세요!</div>
            {console.log(JSON.stringify(profile))}
        </div>
    );
    return (
        <div className='SidebarContent'>
            <img className='Icon' src={require(profileimage)}></img>
            <div>{nickname}님 어서오세요!</div>
        </div>
    );
};

export default Mypage;
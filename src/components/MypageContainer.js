import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MypageSelecter from '../components/MypageSelecter';

const MypageContainer = () =>{
    const mypagestate = useSelector(state => state.reducer, []);
    return <MypageSelecter mypageselecterstate={mypagestate.mypageselecterstate}></MypageSelecter>;
};

export default MypageContainer;
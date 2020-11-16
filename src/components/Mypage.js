import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const Mypage= (props) =>{
    const dispatch = useDispatch();
    const a = useSelector(state => state.profilereducer, {});
    return (
        <div>
            {JSON.stringify(a)}
        </div>
    );
};

export default Mypage;
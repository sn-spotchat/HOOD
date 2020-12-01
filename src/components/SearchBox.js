import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../modules/action';
import Button from '@material-ui/core/Button';
import './SearchBox.css';

const SearchBox = (props) => {
    const dispatch = useDispatch();
    function setMarker(event){
        dispatch(actionType.setMarkerX(props.mapx));
        dispatch(actionType.setMarkerY(props.mapy));
    };
    function sendMarker(event){
        dispatch(actionType.setSidebar("chat"));
    }


    return (
    <div className="SearchBoxRaw" key={props.index} onClick={setMarker}>
        <div className="descript">
            <div id="title" dangerouslySetInnerHTML={{__html: props.title}}></div>
            <div id="category">{props.category}</div>
            <div id="address">{props.roadAddress}</div>
            <Button  variant="contained" color="primary" onClick={sendMarker}>전송</Button>
        </div>
        <div className="descImg">

        </div>
    </div>

    );
}
export default SearchBox;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../modules/action';
import Button from '@material-ui/core/Button';
import proj4 from 'proj4';
import './SearchBox.css';

const SearchBox = (props) => {
    const dispatch = useDispatch();
    proj4.defs('TM128','+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43');
    proj4.defs('EPSG:5179','+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=400000 +y_0=600000 +ellps=GRS80 +units=m +no_defs');
    proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
    
    var p = proj4('TM128', 'WGS84');
    function setMarker(event){
        var temp = p.forward([Number(props.mapx), Number(props.mapy)]);
        dispatch(actionType.setMarker(true));
        dispatch(actionType.setMarkerX(temp[0]));
        dispatch(actionType.setMarkerY(temp[1]));
    };
    function sendMarker(event){
        console.log("sne");
        event.preventDefault();
        dispatch(actionType.setSidebar("chat"));
        dispatch(actionType.setMarker(false));
        dispatch(actionType.setMarkerX(null));
        dispatch(actionType.setMarkerY(null));
    }


    return (
    <div className="SearchBoxRaw" key={props.index} >
        <div className="descript" onClick={setMarker}>
            <div id="title" dangerouslySetInnerHTML={{__html: props.title}}></div>
            <div id="category">{props.category}</div>
            <div id="address">{props.roadAddress}</div>
        </div>
        <Button  variant="contained" color="primary" onClick={sendMarker} style={{'width':'30px', 'left':'20px'}}>전송</Button>
    </div>

    );
}
export default SearchBox;

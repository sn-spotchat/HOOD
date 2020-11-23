import * as React from 'react';
import { appendNaverButton, loadScript } from './components/RNL';
import SeoulDong from './components/SeoulDong.json'
import * as actionType from './modules/action';
import { database } from './firebase'
import { useDispatch, useSelector } from 'react-redux';
import { act } from 'react-dom/test-utils';
import useGeolocation from 'react-hook-geolocation'

function Near(ax, ay, bx, by, range) {    
    return (Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
}

const Init = () => {
    const dispatch = useDispatch();
    const Geo = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000
    })
    appendNaverButton();
    loadScript({ onSuccess: console.log });

    dispatch(actionType.resetnearObject);
    SeoulDong['features'].forEach((feature,index) => {
        var range = 0.016;
        if (Near(feature.geometry.centerXY[0], feature.geometry.centerXY[1], Geo.latitude, Geo.longitude, range)) {
            var coordinates = feature.geometry.coordinates;
            var name = feature.properties.adm_nm;
            dispatch(actionType.addnear({coordinates : coordinates, name : name, chatroom_id : index}));            
        }
    })
    console.log('Init.js');

    return;
}


export default Init;

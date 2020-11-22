import * as React from 'react';
import { appendNaverButton, loadScript } from './components/RNL';
import useGeolocation from 'react-hook-geolocation';
import SeoulDong from './components/SeoulDong.json'
import * as actionType from '../modules/action';
import { database } from './firebase'
import { useDispatch } from 'react-redux';
import { act } from 'react-dom/test-utils';

function Near(ax, ay, bx, by, range) {
    return (Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
}

const Init = () => {
    appendNaverButton();
    loadScript({ onSuccess: console.log });
    const dispatch = useDispatch();
    const Geo = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000
    })
    if (Near(x, y, geolocation.latitude, geolocation.longitude, range)) {
        var coordinates = val.geometry.coordinates;
        var name = val.properties.adm_nm;
        dispatch(actionType.)
    }



    console.log('Init.js');

    return;
}


export default Init;


import React, {useEffect} from 'react';
import { appendNaverButton, loadScript } from './RNL';
import SeoulDong from './SeoulDong.json'
import * as actionType from '../modules/action';
import { useDispatch} from 'react-redux';
import useGeolocation from 'react-hook-geolocation'

function Near(ax, ay, bx, by, range) {
    return (Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
}

const Init = () => {
    const dispatch = useDispatch();
    var localnearlist = [];
    const Geo = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000
    });
    
    useEffect(()=>{
        dispatch(actionType.setLocation(Geo));
        dispatch(actionType.locationloadedObject);
        appendNaverButton();
        if (localnearlist.length === 0) {
            SeoulDong['features'].forEach(async (feature, index) => {
                var range = 0.016;
                if (Near(feature.geometry.centerXY[0], feature.geometry.centerXY[1], Geo.latitude, Geo.longitude, range)) {
                    var coordinates = feature.geometry.coordinates;
                    var name = feature.properties.adm_nm;
                    localnearlist.push({ coordinates: coordinates, name: name, chatroom: index });
                }
                dispatch(actionType.setNearlist(localnearlist));
                dispatch(actionType.nearlistloadedObject);
            });
        }
        
    },[dispatch, Geo, localnearlist]);

    loadScript({ onSuccess: console.log })
    
    console.log('Init.js');

    return <></>;
}


export default Init;

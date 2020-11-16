import React, { Component,useState, useEffect, useRef} from 'react';
import './Map.css';
import Sidebar from './Sidebar';
import SidebarContainer from '../containers/SidebarContainer';
import useGeolocation from 'react-hook-geolocation';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon, Marker } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import $, { map } from "jquery";
import {useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';

var flag = false;
const PolyMap = (props) => {
  //현재위치 반환
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout:  12000
  })


  function Near(ax, ay, bx, by, range){
    if(Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
      return true;
    return false;
  }
  function makepolygon(geojson, polylist){
    var data=geojson.features;
    $.each(data,function(index,val){
      var y = val.geometry.centerXY[1]; var x = val.geometry.centerXY[0];

      var range = 0.020
      if(Near(x, y, geolocation.latitude, geolocation.longitude, range)){
        var coordinates=val.geometry.coordinates;
        var name=val.properties.adm_nm;
        DisplayArea(coordinates, polylist);
      }
    })
  }

  function DisplayArea(coordinates, polylist){
    var path=[];
    coordinates[0].forEach(data =>{
      data.forEach(Coordinate =>{
        path.push(new window.naver.maps.LatLng(Coordinate[1],Coordinate[0]))
      })
    })
    polylist.push(path);
  }
  

  function NaverMapAPI() {     
    var polylist=[];
    makepolygon(SeoulDong, polylist)
    const navermaps = window.naver.maps;
    const Polygonlist = polylist.map(
      (poly)=>( <Polygon 
        paths={poly}
        fillColor={'#7ec4f0'}
        fillOpacity={0.3}
        strokeColor={'#ffffff'}
        strokeOpacity={0.8}
        strokeWeight={2}
      />)
    )

    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '100%' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: geolocation.latitude, lng: geolocation.longitude }} // 지도 초기 위치
        defaultZoom={16} // 지도 초기 확대 배율
        polygons={polylist}
      >
        {Polygonlist}
      </NaverMap>
    );
  }
  return(
    <NaverMapAPI/>
  );
}


const Map = () =>{


  const [sideType, setSideType] = useState("block"); //사이드바의 타입(지금은 chat, list, 채팅방)
  const [sideDisplay, setSideDisplay] = useState("near"); //사이드바의 display를 none, block 설정

  function changeDisplay(){
    if(sideDisplay === "none"){
      setSideDisplay("block");
    }
    else{
      setSideDisplay("none");
    }
    document.getElementById("sideBar").style.display=sideDisplay;
  }

  const AA = () =>{
    const store_maploaded = useSelector(state => state.mapreducer.maploaded);
    const store_map = useSelector(state => state.mapreducer.map);


    const [local_maploaded, setflag] = useState(store_maploaded);
    const [local_map, setmap] = useState(store_map);

    const dispatch = useDispatch();

    useEffect(()=>{ 
      dispatch(actionType.mapsave(local_map));
      console.log('dispatch complete!')
    },[store_maploaded])
   
    if(store_maploaded == false){
      setmap(<RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}><PolyMap/></RenderAfterNavermapsLoaded>)
      dispatch(actionType.maploadedObject);
      setflag(true);
    }

    return local_map;
  }
  return (    
        <div className="mapWrap">
      <div id="sideBar" className="sideBar">
        <SidebarContainer></SidebarContainer>
      </div>
      <button onClick={changeDisplay}>Button</button>
      <div className="map">
        {AA()}
      </div>
    </div>
    
  );
};


export default Map;

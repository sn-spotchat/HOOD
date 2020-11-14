import React, { Component,useState, useEffect, useRef} from 'react';
import './Map.css';
import Sidebar from './Sidebar';
import SidebarContainer from '../containers/SidebarContainer';
import useGeolocation from 'react-hook-geolocation';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon, Marker } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import $, { map } from "jquery";

function PolyMap(props) {
  //현재위치 반환
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout:  12000
  })

  var polylist=[];

  function Near(ax, ay, bx, by, range){
    if(Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
      return true;
    return false;
  }
  function makepolygon(geojson){
    var data=geojson.features;
    $.each(data,function(index,val){
      var y = val.geometry.centerXY[1]; var x = val.geometry.centerXY[0];

      var range = 0.015
      if(Near(x, y, geolocation.latitude, geolocation.longitude, range)){
        var coordinates=val.geometry.coordinates;
        var name=val.properties.adm_nm;
        displayArea(coordinates,name);
      }
    })
  }

  function displayArea(coordinates,name){
    var path=[];
    for(var i =0;i<coordinates.length;i++){
      var coord=coordinates[i][0]
      for(var j=0;j<coord.length;j++){
        if(coord)
          path.push(new window.naver.maps.LatLng(coord[j][1],coord[j][0]))      
      }
    }    
    polylist.push(path);    
  }
  
  makepolygon(SeoulDong)

  function NaverMapAPI() { 
    const navermaps = window.naver.maps;
    const Polygonlist = polylist.map(
      (poly)=>( <Polygon 
        paths={poly}
        fillColor={'#ee88aa'}
        fillOpacity={0.2}
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

  return (
    
        <div className="mapWrap">
      <div id="sideBar" className="sideBar">
        <SidebarContainer></SidebarContainer>
      </div>
      <button onClick={changeDisplay}>Button</button>
      <div className="map">
        <RenderAfterNavermapsLoaded
          ncpClientId={'5blqxkrbsw'} // 자신의 네이버 계정에서 발급받은 Client ID
          error={<p>Maps Load Error</p>}
          loading={<p>Maps Loading...</p>}
        >
          <PolyMap /> 
        </RenderAfterNavermapsLoaded>
      </div>
    </div>
    
  );
};


export default Map;

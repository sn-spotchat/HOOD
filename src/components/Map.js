import React, { Component,useState, useEffect, useRef} from 'react';
import './Map.css';
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
    return (Math.abs(ax - bx) <= range && Math.abs(ay - by) <= range)
  }
  function makepolygon(geojson, polylist){
    var data=geojson.features;
    $.each(data,function(index,val){
      var y = val.geometry.centerXY[1]; var x = val.geometry.centerXY[0];

      var range = 0.020;
      if(Near(x, y, geolocation.latitude, geolocation.longitude, range)){
        var coordinates=val.geometry.coordinates;
        var name=val.properties.adm_nm;
        DisplayArea(coordinates, polylist, name);
      }
    })
  }

  function DisplayArea(coordinates, polylist, name){
    var path=[];
    coordinates[0].forEach(data =>{
      data.forEach(Coordinate =>{        
        path.push(new window.naver.maps.LatLng(Coordinate[1],Coordinate[0]))
      })
    })
    //<Polygon>s need own keys for each.
    //added keys as its name for now.

    const [color,setcolor]=useState('#7ea4f0')
    const [scolor,setscolor]=useState('#ffffff')
    const [opacity,setopacity]=useState(0.6)

    //일단 간단한 이벤트로 정의해둠, 기능 변경필요함.
    const polyClick=()=>{
      setcolor('#ff2400')
      console.log("폴리곤을 클릭했습니다.")
    }

    const polyover=()=>{
      setcolor('#E51D1A')
      //setopacity(1)
    }

    const polyout=()=>{
      setcolor('#7ea4f0')
     // setopacity(0.6)
    }

    polylist.push(
      <Polygon 
        key = {name}
        paths={path}
        fillColor={color}
        fillOpacity={0.3}
        strokeColor={scolor}
        strokeOpacity={opacity}
        strokeWeight={2}
        clickable={true}
        onClick={polyClick}
        onMouseover={polyover}
        onMouseout={polyout}
        />
      );
  }


  function NaverMapAPI() {     
    var polylist=[];        
    makepolygon(SeoulDong, polylist)
    //the code was optimized.
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '100%' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: geolocation.latitude, lng: geolocation.longitude }} // 지도 초기 위치
        defaultZoom={15} // 지도 초기 확대 배율
      >
        {polylist}
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


  //after solving naver-login-map conflict, 
  //LoadMapfromStore function is still needed since the page is rendered so many time for no reason.
  const LoadMapfromStore = () =>{
    const store_maploaded = useSelector(state => state.mapreducer.maploaded);
    const store_map = useSelector(state => state.mapreducer.map);


    const [local_maploaded, setflag] = useState(store_maploaded);
    const [local_map, setmap] = useState(store_map);

    const dispatch = useDispatch();

    useEffect(()=>{ 
      dispatch(actionType.mapsave(local_map));
    },[store_maploaded])
   
    if(store_maploaded == false){
      setmap(<RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}><PolyMap/></RenderAfterNavermapsLoaded>)
      dispatch(actionType.maploadedObject);
      setflag(true);
    }

    return local_map;
  }
  
  return (     
      <div className="Map">
        {LoadMapfromStore()}
      </div>    
  );
};
//{AA()}

export default Map;

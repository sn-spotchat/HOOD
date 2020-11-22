import React, { Component,useState, useEffect, useRef} from 'react';
import './Map.css';
import useGeolocation from 'react-hook-geolocation';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon, Marker } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import $, { map } from "jquery";
import {useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 

var flag = false;
const PolyMap = (props) => {
  function makepolygon(geojson, polylist){
    var data = props.nearlist;
    console.log(data);
    data.forEach(feature =>{
      let coordinates = feature.coordinates;
      let name = feature.name;
      DisplayArea(coordinates, polylist, name);})
  } 

  function DisplayArea(coordinates, polylist, name){
    var path=[];
    coordinates[0].forEach(data =>{
      data.forEach(Coordinate =>{        
        path.push(new window.naver.maps.LatLng(Coordinate[1],Coordinate[0]))
      })
    })

    const [color,setcolor]=useState('#7ea4f0')
    const [scolor,setscolor]=useState('#ffffff')
    const [sopacity,setsopacity]=useState(0.6)
    const [opacity,setopacity]=useState(0.7)

    //일단 간단한 이벤트로 정의해둠, 기능 변경필요함.
    const polyClick=()=>{
      setcolor('#ff2400')
      setopacity(0.8)
      confirmAlert({
        title: '채팅방입장',
        message: `${name} 채팅방에 입장하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => alert('Click Yes')
          },
          {
            label: 'NO',
            onClick: () =>{ alert('Click No')
            setcolor('#7ea4f0')
            setsopacity(0.6)
            }
          }
        ]
      })
    }

    const polyover=()=>{
      if(color!=="#ff2400"){
        setcolor('#999999')
        setsopacity(1)
      }
    }

    const polyout=()=>{
      if(color!=="#ff2400"){
        setcolor('#7ea4f0')
        setsopacity(0.6)
      }
    }

    polylist.push(
      <Polygon 
        key = {name}
        paths={path}
        fillColor={color}
        fillOpacity={opacity}
        strokeColor={scolor}
        strokeOpacity={sopacity}
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
        defaultCenter={{ lat:  props.Geo['latitude'], lng : props.Geo['longitude'] }} // 지도 초기 위치        
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
    const nears = useSelector(state => state.mapreducer.nearlist);
    const [local_map, setmap] = useState();   
    const Geo = useGeolocation({
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 12000
    })

    const dispatch = useDispatch();

    useEffect(()=>{       
        setmap(<RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}><PolyMap nearlist = {nears} Geo = {Geo}/></RenderAfterNavermapsLoaded>)                
        //dispatch(actionType.maploadedObject);      
    },[nears, Geo])   
    
    return local_map;
  }
  
  return (     
      <div className="Map">
        {LoadMapfromStore()}
      </div>    
  );
};

export default Map;

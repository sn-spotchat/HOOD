import React, { Component, useState, useEffect, useRef } from 'react';
import './Map.css';
import useGeolocation from 'react-hook-geolocation';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon, Marker } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import $, { map } from "jquery";
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { database } from '../firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

var flag = false;
const PolyMap = (props) => {
  function makepolygon(geojson, polylist) {
    var data = props.nearlist;
    data.forEach((feature,index) => {
      let coordinates = feature.coordinates;
      let name = feature.name;
      DisplayArea(coordinates, polylist, name, feature.chatroom_id);
      
    })
  }

  function DisplayArea(coordinates, polylist, name, index) {
    var path = [];
    coordinates[0].forEach(data => {
      data.forEach(Coordinate => {
        path.push(new window.naver.maps.LatLng(Coordinate[1], Coordinate[0]))
      })
    })

    const color1 = '#7ea4f0'; const opacity1 = 0.4;
    const color2 = '#F51D1A'; const opacity2 = 0.3;
    const color3 = '#10E040'; const opacity3 = 0.4;
    const [color, setcolor] = useState(color1);
    const [opacity, setopacity] = useState(opacity1);
    const [scolor, setscolor] = useState('#FFFFFF');
    const [sopacity, setsopacity] = useState(1.0);
    const dispatch = useDispatch();

    const initialstate = useSelector(state => state.profilereducer);
    const chatid = useSelector(state => state.chatreducer.chatid);

    const YesClick=()=>{
      dispatch(actionType.oldchat());
      dispatch(actionType.sidebartestObject);
      dispatch(actionType.chatid(index));
      let exist = false;
      initialstate.chatroomlist.forEach(chatroomid =>{
        if(index === chatroomid){
          exist = true;
        }
      })
      if(exist) return;
      dispatch(actionType.newchat());
      dispatch(actionType.insertchatroom(index));
      database.ref('chatroom').once('value', snapshot => {
        Object.values(snapshot.val()).forEach(Snap => {
          if(String(index)!==String(Snap['chatroom_id'])) return;
          database.ref('user/').once('value', data => {
            Object.entries(data.val()).forEach(entry => {
              const [key, value] = entry;
              if(value['ID']!== initialstate.id) return;
              var date = new Date();
              database.ref('user/'+key+'/chatroomlist/').push({chatroom_id: Snap['chatroom_id'], start_chat_id:Snap['lastchat_id'], time: date.toString()});
            });
          });
        });
      });
    }
    const polyClick = () => {
      if (initialstate.loggedin === true) {
        confirmAlert({
          title: '채팅방입장',
          message: `${name} 채팅방에 입장하시겠습니까?`,
          buttons: [
            {
              label: 'YES',
              onClick :YesClick()
            },
            {
              label: 'NO'
            }
          ]
        })
      }
      else{
        confirmAlert({
          title: '채팅방입장',
          message: '로그인 후 입장가능합니다.',
          buttons: [{ label: 'OK', }]
        })
      }
    }

    const polyover = () => {
      if (color === color3) return;
      setcolor(color2)
      setopacity(opacity2)
    }

    const polyout = () => {
      if (color === color3) return;
        setcolor(color1)
        setopacity(opacity1)
    }

    useEffect(()=>{
      if(chatid === index){
        setcolor(color3);
        setopacity(opacity3);
      }    
      else{
        setcolor(color1)
        setopacity(opacity1)
      }
    },[chatid])

    polylist.push(
      <Polygon
        id = {name}
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
    var polylist = [];
    makepolygon(SeoulDong, polylist)
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '100%' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: props.Geo['latitude'], lng: props.Geo['longitude'] }} // 지도 초기 위치        
        defaultZoom={14} // 지도 초기 확대 배율
        minZoom={13}
        maxZoom={19}
      >
        {polylist}
      </NaverMap>
    );
  }
  return (
    <NaverMapAPI />
  );
}


const Map = () => {

  const [sideType, setSideType] = useState("block"); //사이드바의 타입(지금은 chat, list, 채팅방)
  const [sideDisplay, setSideDisplay] = useState("near"); //사이드바의 display를 none, block 설정


  //after solving naver-login-map conflict, 
  //LoadMapfromStore function is still needed since the page is rendered so many time for no reason.
  const LoadMapfromStore = () => {
    const nears = useSelector(state => state.mapreducer.nearlist);
    const [local_map, setmap] = useState();
    const Geo = useGeolocation({
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 12000
    })

    const dispatch = useDispatch();

    useEffect(() => {
      setmap(<RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}><PolyMap nearlist={nears} Geo={Geo} /></RenderAfterNavermapsLoaded>)
      //dispatch(actionType.maploadedObject);      
    }, [nears, Geo])

    return local_map;
  }

  return (
    <div className="Map">
      {LoadMapfromStore()}
    </div>
  );
};

export default Map;

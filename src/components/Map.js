import React, { useState, useEffect } from 'react';
import './Map.css';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import Theme from '../modules/Theme.js';

const PolyMap = (props) => {
  function MakePolygon(geojson, polyList) {
    var data = props.nearlist;
    data.forEach((feature,index) => {
      let coordinates = feature.coordinates;
      let name = feature.name;
      DisplayArea(coordinates, polyList, name, feature.chatroom);      
    })
  }

  function DisplayArea(coordinates, polyList, name, index) {
    var path = [];
    coordinates[0].forEach(data => {
      data.forEach(Coordinate => {
        path.push(new window.naver.maps.LatLng(Coordinate[1], Coordinate[0]))
      })
    })

    const [color, setColor] = useState(color1);
    const [opacity, setOpacity] = useState(opacity1);
    const dispatch = useDispatch();

    const loggedin = useSelector(state => state.flagreducer.loggedin);
    const chatroom = useSelector(state => state.statereducer.chatroom);
    const sidebarstate = useSelector(state => state.statereducer.sidebarstate);

    const Theme = useSelector(state => state.themereducer.polygondesign);

    var color1 = Theme.color[0]; var opacity1 = Theme.opacity[0];
    var color2 = Theme.color[1]; var opacity2 = Theme.opacity[1];
    var color3 = Theme.color[2]; var opacity3 = Theme.opacity[2];
    var scolor = Theme.scolor;   var sopacity = Theme.sopacity;
    useEffect(()=>{
      color1 = Theme.color[0]; opacity1 = Theme.opacity[0];
      color2 = Theme.color[1]; opacity2 = Theme.opacity[1];
      color3 = Theme.color[2]; opacity3 = Theme.opacity[2];
      scolor = Theme.scolor;   sopacity = Theme.sopacity;
      setColor(color1); setOpacity(opacity1);

    },[Theme]);
    

    const YesClick=()=>{
      dispatch(actionType.setSidebar('chat'));
      dispatch(actionType.setChatroom(index));
      dispatch(actionType.setChatroomname(name));
    }
    const polyClick = () => {
      if (loggedin === true) {
        setColor(color3);
        setOpacity(opacity3);
        dispatch(actionType.setSidebar('near'));
        dispatch(actionType.setChatroom(null));
        
        confirmAlert({
          title: '채팅방입장',
          message: `${name} 채팅방에 입장하시겠습니까?`,
          buttons: [
            {
              label: 'YES',
              onClick : () => YesClick()
            },
            {
              label: 'NO',
              onClick : () => {
                setColor(color1)
                setOpacity(opacity1)
              }
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

    const polyOver = () => {
      if (color === color3) return;
      setColor(color2)
      setOpacity(opacity2)
    }

    const polyOut = () => {
      if (color === color3) return;
        setColor(color1)
        setOpacity(opacity1)
    }

    useEffect(()=>{
      if(chatroom === index && sidebarstate === 'chat'){
        setColor(color3);
        setOpacity(opacity3);
      }    
      else{
        setColor(color1)
        setOpacity(opacity1)
      }
    },[chatroom, sidebarstate, index])

    polyList.push(
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
        onClick={ () => polyClick()}
        onMouseover={polyOver}
        onMouseout={polyOut}
        style = {{transition : '0.3s'}}
      />
    );
  }


  function NaverMapAPI() {
    var polyList = [];
    MakePolygon(SeoulDong, polyList)
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} 
        style={{
          width: '100%', 
          height: '100%' 
        }}
        defaultCenter={{ lat: props.Geo['latitude'], lng: props.Geo['longitude'] }}     
        defaultZoom={14} 
        minZoom={13}
        maxZoom={16}
      >
        {polyList}
      </NaverMap>
    );
  }
  return (
    <NaverMapAPI />
  );
}


const Map = () => {
  const location = useSelector(state => state.datareducer.location);
  const nearlist = useSelector(state => state.datareducer.nearlist);

  return (
    <div className="Map">
      <RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}>
        <PolyMap nearlist={nearlist} Geo={location} />
      </RenderAfterNavermapsLoaded>
    </div>
  );
};

export default Map;

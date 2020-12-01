import React, { useState, useEffect } from 'react';
import './Map.css';
import { RenderAfterNavermapsLoaded, NaverMap, Polygon } from 'react-naver-maps'; // 패키지 불러오기
import SeoulDong from "./SeoulDong.json";
import { useSelector, useDispatch } from 'react-redux';
import * as actionType from '../modules/action';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { database } from '../firebase';
import { bindActionCreators } from 'redux';
import Theme from '../modules/Theme.js';

const PolyMap = (props) => {

  let chatNum={}
  let test=database.ref('/chat').once('value').then(function(snapshot){
    var a=snapshot.val();
    var b=Object.values(a);
    for(var i=0;i<b.length;i++){
      var data=b[i];
       if(data.chatroom_id in chatNum) chatNum[data.chatroom_id]+=1
       else chatNum[data.chatroom_id]=1
    }
    // for(var i=1;i<=423;i++){
    //   if(i in chatNum) database.ref('chatroom/'+i).update({chatNum:chatNum[i]});
    //   else database.ref('chatroom/'+i).update({chatNum:0});
    // }
    for(var key in chatNum){
      database.ref('chatroom/'+key).update({chatNum:chatNum[key]});
    }
  })

  function MakePolygon(geojson, polyList) {
    var data = props.nearlist;
    var chatRank={};
    var chatRank2={};
    data.forEach((feature,index) => {
      let chatRoom=feature.chatroom;
      if (chatRoom in chatNum) chatRank[chatRoom]=chatNum[chatRoom];
      else chatRank[chatRoom]=0;
      //채팅의 개수에따라 순위를 매겨 opacity를 설정한다.
    })
    for(var key in chatRank){
      var rank=1;
      var curValue=chatRank[key];
      if(curValue===0){
        chatRank2[key]=0;
        break
      }
      for(var key2 in chatRank){
        if(curValue>chatRank[key2]) rank++;
      }
      chatRank2[key]=rank;
    }

    data.forEach((feature,index)=>{
      let coordinates = feature.coordinates;
      let name = feature.name;
      let chatroom=feature.chatroom;
      DisplayArea(coordinates, polyList, name, chatroom,chatRank2[chatroom]);      
    })
  }
  
  function DisplayArea(coordinates, polyList, name, index,rank) {
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

    const Theme = useSelector(state => state.themereducer.polygondesign
                             );

    var color1 = Theme.color[0]; var opacity1 = (0.1*rank==0)?0.05:0.1*rank;
    var color2 = Theme.color[1]; var opacity2 = Theme.opacity[1];
    var color3 = Theme.color[2]; var opacity3 = Theme.opacity[2];
    var scolor = Theme.scolor;   var sopacity = Theme.sopacity;
    useEffect(()=>{
      color1 = Theme.color[0]; opacity1 = (0.1*rank==0)?0.05:0.1*rank;
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

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

const RESETDATABASE = () => {
  database.ref('chat/').remove();
  database.ref('chatroom/').remove();
  for (var i = 0; i < 424; i++) {
    database.ref('/chatroom/' + i + '/name').set(SeoulDong.features[i].properties.adm_nm);
    database.ref('/chatroom/' + i + '/chatnum').set(0);
  }
  database.ref('user/').once('value', Snap => {
    var a = Snap.val();
    var b = Object.keys(a);
    b.forEach(key => {
      delete a[key].chatlist;
      delete a[key].chatroomlist;
      database.ref('user/' + key).set(a[key]);
    })
  })
}

const PolyMap = (props) => {
  let chatNum = props.chatNum;
  let totalNum = props.totalNum;
  function MakePolygon(geojson, polyList) {    
    var data = props.nearlist;
    var chatRank = {};
    var chatRank2 = {};
    data.forEach((feature, index) => {
      let chatRoom = feature.chatroom;
      if (chatRoom in chatNum) chatRank[chatRoom] = chatNum[chatRoom];
      else chatRank[chatRoom] = 0;
      //채팅의 개수에따라 순위를 매겨 opacity를 설정한다.
    })
    for (var key in chatRank) {
      var rank = 1;
      var curValue = chatRank[key];
      if (curValue === 0) {
        chatRank2[key] = 0;
        break
      }
      for (var key2 in chatRank) {
        if (curValue > chatRank[key2]) rank++;
      }
      chatRank2[key] = rank;
    }

    data.forEach((feature, index) => {
      let coordinates = feature.coordinates;
      let name = feature.name;
      let chatroom = feature.chatroom;
      DisplayArea(coordinates, polyList, name, chatroom, chatNum[chatroom]/totalNum);
    })
  }

  function DisplayArea(coordinates, polyList, name, index, ratio) {
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
    const colordiff = (c1, c2, r) => {
      r = Math.pow(r, 0.3);
      let c1r = parseInt(c1.slice(1,3),16);let c2r = parseInt(c2.slice(1,3),16);
      let c1g = parseInt(c1.slice(3,5),16);let c2g = parseInt(c2.slice(3,5),16);
      let c1b = parseInt(c1.slice(5,7),16);let c2b = parseInt(c2.slice(5,7),16);
      let c3r = parseInt((c2r - c1r) * r + c1r,10).toString(16);
      let c3g = parseInt((c2g - c1g) * r + c1g,10).toString(16);
      let c3b = parseInt((c2b - c1b) * r + c1b,10).toString(16);
      return '#' + c3r + c3g + c3b;
    }
    const opacitydiff = (o1, o2, r) => {
      r = Math.pow(r ,0.4)
      return (o2 - o1) * r + o1;      
    }
    

    var color1 = colordiff(Theme.color[0], Theme.color[1], ratio); 
    var opacity1 = opacitydiff(Theme.opacity[0], Theme.opacity[1], ratio);
    var color2 = Theme.color[2]; var opacity2 = Theme.opacity[2];
    var color3 = Theme.color[3]; var opacity3 = Theme.opacity[3];
    var scolor = Theme.scolor; var sopacity = Theme.sopacity;
    useEffect(() => {
      color1 = colordiff(Theme.color[0], Theme.color[1], ratio); 
      opacity1 = opacitydiff(Theme.opacity[0], Theme.opacity[1], ratio);
      color2 = Theme.color[2]; opacity2 = Theme.opacity[1];
      color3 = Theme.color[3]; opacity3 = Theme.opacity[2];
      scolor = Theme.scolor; sopacity = Theme.sopacity;
      setColor(color1); setOpacity(opacity1);

    }, [Theme]);


    const YesClick = () => {
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
              onClick: () => YesClick()
            },
            {
              label: 'NO',
              onClick: () => {
                setColor(color1)
                setOpacity(opacity1)
              }
            }
          ]
        })
      }
      else {
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

    useEffect(() => {
      if (chatroom === index && sidebarstate === 'chat') {
        setColor(color3);
        setOpacity(opacity3);
      }
      else {
        setColor(color1)
        setOpacity(opacity1)
      }
    }, [chatroom, sidebarstate, index])

    polyList.push(
      <Polygon
        id={name}
        key={name}
        paths={path}
        fillColor={color}
        fillOpacity={opacity}
        strokeColor={scolor}
        strokeOpacity={sopacity}
        strokeWeight={2}
        clickable={true}
        onClick={() => polyClick()}
        onMouseover={polyOver}
        onMouseout={polyOut}
        style={{ transition: '0.3s' }}
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

  const [chatNumstate, setchatNum] = useState({});
  const [totalNumstate, settotalNum] = useState(0);
  useEffect(()=>{
    database.ref('/chatroom').once('value', Snap => {
      let chatNum = {}
      let totalNum = 0;
      var a = Snap.val();
      var b = Object.keys(a);
      b.forEach(key => {
        if (a[key] === undefined) chatNum[key] = 0;
        else{
          chatNum[key] = a[key].chatnum;
          totalNum += a[key].chatnum;
        } 
      })
      setchatNum(chatNum);
      settotalNum(totalNum);
    });

  },[]);

  return (
    <div className="Map">
      <RenderAfterNavermapsLoaded ncpClientId={'5blqxkrbsw'}>
        <PolyMap nearlist={nearlist} Geo={location} chatNum = {chatNumstate} totalNum = {totalNumstate}  />
      </RenderAfterNavermapsLoaded>
    </div>
  );
};

export default Map;

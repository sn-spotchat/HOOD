import React, { useState, useEffect, useRef} from 'react';
import './Map.css';
import Sidebar from './Sidebar';
import SidebarContainer from '../containers/SidebarContainer';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'; // 패키지 불러오기

function NaverMapAPI() {
  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100%' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    />
  );
}


const Map = () =>{
  const [sideType, setSideType] = useState("block"); //사이드바의 타입(지금은 chat, list, 채팅방)
  const [sideDisplay, setSideDisplay] = useState("list"); //사이드바의 display를 none, block 설정

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
          <NaverMapAPI />
        </RenderAfterNavermapsLoaded>
      </div>
    </div>
  );
};


/*
class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'block'
    }
  }
  
  render() {
    return (
        <div className="mapWrap">
          <div className="sideBar">
            <Sidebar></Sidebar>
          </div>
          <div className="map">
            <RenderAfterNavermapsLoaded
              ncpClientId={'5blqxkrbsw'} // 자신의 네이버 계정에서 발급받은 Client ID
              error={<p>Maps Load Error</p>}
              loading={<p>Maps Loading...</p>}
              >
              <NaverMapAPI />
            </RenderAfterNavermapsLoaded>
          </div>
        </div>
    );
  }
}
*/
export default Map;

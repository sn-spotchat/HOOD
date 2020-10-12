import React, {Component} from 'react';
import './Map.css';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'; // 패키지 불러오기



var mapDiv = document.getElementById('map');

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

class Map extends Component {
  render() {
    return (
        <div className="map">
          <RenderAfterNavermapsLoaded
            ncpClientId={'5blqxkrbsw'} // 자신의 네이버 계정에서 발급받은 Client ID
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
            >
            <NaverMapAPI />
          </RenderAfterNavermapsLoaded>
        </div>
    );
  }
}

export default Map;

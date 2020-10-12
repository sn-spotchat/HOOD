import React, {Component} from 'react';

import './Chat.css';

class Chat extends Component {
  render() {
    return (
      <div className="Chat">
          자기가 방문했던 채팅방 목록 제공
          <script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=5blqxkrbsw">
          </script>
      </div>
    );
  }
}

export default Chat;

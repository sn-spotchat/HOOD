import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client';

class Chattest extends Component {
    constructor(props){
        super(props);
        this.socket = SocketIOClient('http://localhost:3001');
    };

  render() {
    this.socket.on('chat message', (msg)=>{
        console.log(msg);
    });
    return (
      <div className="Chatting">
          <form id='chat' onSubmit={(e)=>{
              e.preventDefault();
              this.socket.emit('chat message', e.target.m.value);
          }}>
            <input id="m" autocomplete="off" /><button>Send</button>

          </form>
      </div>
    );
  }
}

export default Chattest;
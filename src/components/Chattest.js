import React, {Component, useEffect, useState} from 'react';
import SocketIOClient from 'socket.io-client';
import store from '../store';

function Chattest(){
  const [chatState, setChatState] = useState('');
  var socket = SocketIOClient('http://localhost:3001');
  useEffect(()=>{ 
    socket.on('chat message', (msg)=>{
      setChatState(chatState => chatState+msg);
    });
  },[]);//빈 배열을 줌으로써 최초1번만 렌더링 되게 한다. 
  return (
      <div className="Chatting">
          <form id='chat' onSubmit={(e)=>{
            e.preventDefault();
            socket.emit('chat message', e.target.m.value);
          }}>
          <input id="m" autoComplete="off" /><button>Send</button>
        <div>{chatState}</div>
      </form>
    </div>
  );
}

/*
class Chattest extends Component {
  socket = SocketIOClient('http://localhost:3001');
  state = {messages:store.getState().messages}
  constructor(props){
    super(props);
  }
  message = 'hello';
  render() {
    this.socket.on('chat message', (msg)=>{
    this.message = msg;
    console.log(this.message);
    });
    return (
      <div className="Chatting">
          <form id='chat' onSubmit={(e)=>{
              e.preventDefault();
              console.log("in form");
              this.socket.emit('chat message', e.target.m.value);
          }}>
            <input id="m" autoComplete="off" /><button>Send</button>
          <div>{this.message}</div>
          </form>
      </div>
    );
  }
}
*/
export default Chattest;
import React, {Component, useEffect} from 'react';
import SocketIOClient from 'socket.io-client';
import store from '../store';

function Chattest(){
  var socket = SocketIOClient('http://localhost:3001');
  var message=''
  useEffect(()=>{ 
    socket.on('chat message', (msg)=>{
      console.log(msg);
      message = msg;
    });
  },[]);//빈 배열을 줌으로써 최초1번만 렌더링 되게 한다. 
  return (
      <div className="Chatting">
          <form id='chat' onSubmit={(e)=>{
            e.preventDefault();
            console.log("in form");
            socket.emit('chat message', e.target.m.value);
          }}>
          <input id="m" autoComplete="off" /><button>Send</button>
        <div>{message}</div>
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
    
  render() {
    setMsg(this.socket);
    return (
      <div className="Chatting">
          <form id='chat' onSubmit={(e)=>{
              e.preventDefault();
              console.log("in form");
              this.socket.emit('chat message', e.target.m.value);
          }}>
            <input id="m" autoComplete="off" /><button>Send</button>
          <div>{this.state.message}</div>
          </form>
      </div>
    );
  }
}
*/
export default Chattest;
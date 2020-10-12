import React, {Component} from 'react';
import Chattest from './Chattest';
import './List.css';

class List extends Component {
  constructor(props){
    super(props);
    this.content=`
      <ul id="messages"></ul>
      <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
      </form>
      <script src="/socket.io/socket.io.js"></script>
      <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <script>
        $(function () {
          var socket = io();
          $('form').submit(function(e) {
            e.preventDefault(); // prevents page reloading
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
          });
        });
      </script>`;
  }
  render() {
    return (
      <div className="List">
          <Chattest></Chattest>
      </div>
    );
  }
}

export default List;

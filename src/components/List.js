import React, {Component} from 'react';
import Chattest from './Chattest';
import './List.css';

class List extends Component {
  constructor(props){
    super(props);
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

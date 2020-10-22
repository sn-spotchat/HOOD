import React, {Component} from 'react';
import Chattest from './Chattest';
import Test from './Test';
import './List.css';

class List extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="List">
          <Test></Test>
      </div>
    );
  }
}

export default List;

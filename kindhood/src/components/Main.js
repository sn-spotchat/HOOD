import React, {Component} from 'react';

import Upperbar from './Upperbar';
import Content from './Content';
import './Main.css';


class Main extends Component {
    render() {
      return (
        <div className="wrap">
            <Upperbar></Upperbar>
            <Content></Content>
        </div>
        );
    }
}
  
  export default Main;
  
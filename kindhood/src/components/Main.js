import React, {Component} from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import './Main.css';


class Main extends Component {
    render() {
      return (
        <div className="wrap">
          <Sidebar></Sidebar>
          <Map></Map>
        </div>
      );
    }
}
  
  export default Main;
  
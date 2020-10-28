import React, {Component} from 'react';
import Navigation from './Navigation';
import Map from './Map';
import Sidebar from './Sidebar';
import './Main.css';


class Main extends Component {
    render() {
      return (
        <div className="wrap">
          <Navigation></Navigation>
          <Map></Map>
        </div>
      );
    }
}
  
  export default Main;
  
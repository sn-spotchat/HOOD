import React, {Component} from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';


class Main extends Component {
    render() {
      return (
        <div className = 'wrap'>
            <Navigation/>
            <Map/>
        </div>
      );
    }
}
  
  export default Main;
  
import React, {Component} from 'react';
import Navigation from './Navigation';
import Map from './Map';
import './Main.css';

const Main = () => {
  return (
    <div className = 'wrap'>
        <Navigation/>
        <Map/>
    </div>
  );
}
  export default Main;
  
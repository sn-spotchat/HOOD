import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Openedchat from './Openedchat';
import Registeredchat from './Registeredchat';
import './Upperbar.css';
import imgKindhood from './Kindhood.png';
import txtKindhood from './Hood.png';

class Upperbar extends Component {
  render() {
    return (
        <div id="upperbar">
          <Router>
            <div id="logo">
                <a href="/"><img className="logoimg" src={txtKindhood}></img></a>
            </div>
            <Openedchat></Openedchat>
            <Registeredchat></Registeredchat>
            <div id="login">
              <a href="/login"><img className="login_btn" src={imgKindhood}></img></a>
              
            </div>
          </Router>
        </div>
    );
  }
}

export default Upperbar;

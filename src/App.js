import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import Main from './components/Main.js';
import Login from './components/login';

import './App.css';

/*
const server = require('http').createServer();*/
//const io = require('socket.io')();
//const express = require('express');

//const app = express();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;

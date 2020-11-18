import React, {Component, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Main from './components/Main.js';
import Callback from './components/Callback';
import './App.css';
import { useDispatch } from 'react-redux';
import * as actionTypes from './modules/action';
import Init from './Init'



const App = () => {  
  //Init() is called only the first time.  
  Init();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/callback' component={Callback} />
        </Switch>
      </Router>
    </div>
  );

}
export default App;

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Main from './components/Main.js';
import NLogin from './components/NLogin';
import Callback from './components/Callback';

import './App.css';
class App extends Component {
  render() {
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
}
export default App;

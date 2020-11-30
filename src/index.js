import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
 

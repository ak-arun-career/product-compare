
/**
 * Including core-js/stable (to polyfill ECMAScript features) and
 * regenerator-runtime/runtime (needed to use transpiled generator functions)
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
//import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reducer from './store/reducer';

/**
 * @summary A central store is created
 */
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
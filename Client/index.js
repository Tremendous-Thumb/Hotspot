import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// import App from './components/app';
import reducers from './reducers';
import Nav from './containers/Nav';
import Map from './containers/Map';
import Panel from './containers/Panel';
import configureStore from './store/storeConfig.jsx';

const store = configureStore();

//NEED TO CHOSE HOW WE WANT TO SET UP STORE
ReactDOM.render(
  <Provider store={store}>
    <Nav/>
    <Map />
    <Panel />
  </Provider>,
  document.getElementById('app')
);

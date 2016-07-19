import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import App from './components/app';
import reducers from './reducers';
import CollectionModel from './containers/CollectionModel';
import Nav from './containers/Navigation';
import Map from './containers/Map';
import Panel from './containers/Panel';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    {/*<App />*/}
    <Nav/>
    <Map/>
    <Panel/>
  </Provider>
  , document.querySelector('.app'));

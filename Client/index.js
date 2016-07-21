import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/storeConfig.jsx';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  </Provider>,
  document.getElementById('app')
);
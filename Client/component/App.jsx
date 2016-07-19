class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: 'map here', // can set the initial state map  here
      panel: null,
      filter: null,
      collection: null
    };
  }

  componentDidMount() {
    // api function call here if needed
  }

  onClickslidePanel(string) {
    // slide panel here
    this.setState({
      panel: this.state[string]
    });
  }

  loadMap(data) {
    // use this callback function if needed
  }


  render() {
    return (
      <div>
        <div className="Navigation">
          <Navigation panel={this.onClickslidePanel.bind(this)}/>
        </div>
        <div className='Panel'>
          <Panel view={this.state.panel}/>
        </div>
        <div className='MapBody' id='map-two'>
          insert map here
          <Map/>
        </div>
      </div>
    );
  }

}

window.App = App;

ReactDOM.render(<App/>,
document.getElementById('app'));

// reducer directory

// index.js

// collection of all restaurants

// collection of filtered restaurants

// collection of all filters

// collection of applied filters

// collection of panel mode


// action directory

// in nav types: 'nav-collection click', 'nav-filter click'

// in panel types: 'panel-collection click (user clicks on any restaurant collection click)',
// 'panel-filter click (users clicks filtered options on/off)'


import React from 'react';
import ReactDOM from 'react-dom';
// remove entirely import App from './component/App.jsx';
import Nav from './container/Nav.jsx';
import Panel from './container/Panel.jsx';
import Map from './map/Map.jsx';
import { Provider } from 'react-redux';
// Possibly: reference storeConfig

// ReactDOM.render(
//   <Provider store={createStore(reducers)}>
//     // Remove entirely <App />
//   	<Nav /> // Container
//   	<Panel /> // Container
//   	<Map /> //Container
//   </Provider>,
//   document.getElementById('app')
// );

// actions - index.js file that combines all actions into a single file
// 					Each action as an individual file
// components - stateless react models: Nav buttons, panel buttons
// containers - statefull views: Nav, Panel, Map
// reducers - index.js file that combines all individual reducers into a single file
//            Each reducer as an individual file
// store - storeConfig.js
// index.js

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


// configureStore.js

// Imports in the needed files
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';  // used to make async calls to the DB
import rootReducer from '../reducers'; // the name of the function/file that contains all of our reducers

export default function configureStore(initialState) {
  // calls createStore sending in the reducers, an initialState, and a list of middleware
  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(ReduxPromise), // we might want to take out this line unless we utilize ReduxPromises now
      // This is to make the app usable with the redux Dev Tools if they are found to be installed
      // Otherwise, it does nothing.
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // This allows the app in development to refresh only the modules that are updated,
    // rather then refreshing the entire page.  This can be safely removed if we don't want it
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

// We can basically use this file as is if we follow it's naming conventions.
// Otherwise, we just need to change teh name of our reducer collection to match

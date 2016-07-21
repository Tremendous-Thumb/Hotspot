import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// This needs to be updated based upon what Derek names the master reducer
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose (
      // ReduxPromise allows for async calls to server/database
      applyMiddleware(ReduxPromise),
      // Will allow the use of the dev-tools if the user's browser has them
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  // Enables Webpack hot module replacement for reducers
  // Reloads only the module that is updated instead of entire page
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
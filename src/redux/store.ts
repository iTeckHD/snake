import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './root_reducers';

type MyWindow = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

export const getStore = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (window as MyWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
  /* eslint-enable */
};

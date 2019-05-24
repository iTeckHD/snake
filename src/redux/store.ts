import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './root_reducers';
import createSagaMiddleware from 'redux-saga';
import { sagaGameStatus } from './saga/game_status_saga';

type MyWindow = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (window as MyWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(sagaGameStatus);

  return store;
  /* eslint-enable */
};

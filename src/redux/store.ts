import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './root_reducers';
import createSagaMiddleware from 'redux-saga';
import { sagaGame } from './saga/game_saga';

type MyWindow = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

const composeEnhancers =
  (window as MyWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(sagaGame);

  return store;
};

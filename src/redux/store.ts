import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './root_reducers';
import createSagaMiddleware from 'redux-saga';
import { sagaGameStatus } from './saga/game_saga_status';
import { sagaGameMove } from './saga/game_saga_move';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(sagaGameStatus as any);
  sagaMiddleware.run(sagaGameMove as any);

  return store;
};

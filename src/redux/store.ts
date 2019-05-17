import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './root_reducers';

export const getStore = () => {
  return createStore(rootReducers, applyMiddleware(thunk));
};

import { combineReducers } from 'redux';
import { gameReducer } from './reducers/game_reducer';

export const rootReducers = combineReducers({
  game: gameReducer,
});

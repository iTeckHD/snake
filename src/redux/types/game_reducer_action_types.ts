import { prefixActions } from '../../util/prefix_actions';

export const GameReducerActionTypes = prefixActions('GameReducerAction', {
  RESET_GAME: 'RESET_GAME',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  SET_SNAKE: 'SET_SNAKE',
  SET_DIRECTION: 'SET_DIRECTION',
  SET_NEW_FOOD: 'SET_NEW_FOOD',
  INCREASE_SCORE: 'INCREASE_SCORE',
});

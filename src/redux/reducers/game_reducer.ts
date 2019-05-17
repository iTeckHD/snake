import { GameAction } from '../actions/game_actions';

const defaultState: GameState = {};

export interface GameState {}

export const gameReducer = (
  state: GameState = defaultState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    default:
      return state;
  }
};

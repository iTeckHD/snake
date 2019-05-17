import { prefixActions } from '../../util/prefix_actions';
import { ReduxAction } from '../../util/redux_action';

export interface GameAction extends ReduxAction {}

export const GameActionTypes = prefixActions('GameAction', {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
});

export const GameActions = {
  startGame: (): GameAction => ({
    type: GameActionTypes.START_GAME,
  }),

  pauseGame: (): GameAction => ({
    type: GameActionTypes.PAUSE_GAME,
  }),
};

export type IGameActions = typeof GameActions;

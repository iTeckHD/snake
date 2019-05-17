import { prefixActions } from '../../util/prefix_actions';
import { ReduxAction } from '../../util/redux_action';
import { Coordination } from '../../game/types/coordination';
import { Direction } from '../../game/enums/directions';

export interface GameAction extends ReduxAction {
  paused?: boolean;
  direction?: Direction;
}

export const GameActionTypes = prefixActions('GameAction', {
  START_GAME: 'START_GAME',
  SET_PAUSE: 'SET_PAUSE',
  MOVE: 'MOVE',
});

export const GameActions = {
  startGame: (): GameAction => ({
    type: GameActionTypes.START_GAME,
  }),

  pauseGame: (): GameAction => ({
    type: GameActionTypes.SET_PAUSE,
    paused: true,
  }),

  resumeGame: (): GameAction => ({
    type: GameActionTypes.SET_PAUSE,
    paused: false,
  }),

  move: (direction: Direction): GameAction => ({
    type: GameActionTypes.MOVE,
    direction,
  }),
};

export type IGameActions = typeof GameActions;

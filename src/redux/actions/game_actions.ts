import { prefixActions } from '../../util/prefix_actions';
import { ReduxAction } from '../../util/redux_action';
import { Direction } from '../../game/enums/directions';
import { GameStatus } from '../../game/enums/game_status';

export interface GameAction extends ReduxAction {
  direction?: Direction;
  gameStatus?: GameStatus;
}

export const GameActionTypes = prefixActions('GameAction', {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  GAME_OVER: 'GAME_OVER',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  MOVE: 'MOVE',
  CHANGE_DIRECTION: 'CHANGE_DIRECTION',
});

export const GameActions = {
  startGame: (): GameAction => ({
    type: GameActionTypes.START_GAME,
  }),

  pauseGame: (): GameAction => ({
    type: GameActionTypes.PAUSE_GAME,
  }),

  resumeGame: (): GameAction => ({
    type: GameActionTypes.RESUME_GAME,
  }),

  gameOver: (): GameAction => ({
    type: GameActionTypes.START_GAME,
  }),

  setGameStatus: (gameStatus: GameStatus): GameAction => ({
    type: GameActionTypes.SET_GAME_STATUS,
    gameStatus,
  }),

  move: (direction: Direction): GameAction => ({
    type: GameActionTypes.MOVE,
    direction,
  }),

  changeDirection: (direction: Direction): GameAction => ({
    type: GameActionTypes.CHANGE_DIRECTION,
    direction,
  }),
};

export type IGameActions = typeof GameActions;

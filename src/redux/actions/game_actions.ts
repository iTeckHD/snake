import { prefixActions } from '../../util/prefix_actions';
import { ReduxAction } from '../../util/redux_action';
import { Direction } from '../../game/enums/directions';
import { GameStatus } from '../../game/enums/game_status';
import { Coordination } from '../../game/types/coordination';

export interface GameAction extends ReduxAction {
  direction?: Direction;
  gameStatus?: GameStatus;
  snake?: Coordination[];
}

export const GameActionTypes = prefixActions('GameAction', {
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  GAME_OVER: 'GAME_OVER',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  SET_SNAKE: 'SET_SNAKE',
  SET_DIRECTION: 'SET_DIRECTION',
  SET_NEW_FOOD: 'SET_NEW_FOOD',
  MOVE: 'MOVE',
});

export const GameActions = {
  startGame: (): GameAction => ({
    type: GameActionTypes.START_GAME,
  }),

  resetGame: (): GameAction => ({
    type: GameActionTypes.RESET_GAME,
  }),

  pauseGame: (): GameAction => ({
    type: GameActionTypes.PAUSE_GAME,
  }),

  resumeGame: (): GameAction => ({
    type: GameActionTypes.RESUME_GAME,
  }),

  gameOver: (): GameAction => ({
    type: GameActionTypes.GAME_OVER,
  }),

  setGameStatus: (gameStatus: GameStatus): GameAction => ({
    type: GameActionTypes.SET_GAME_STATUS,
    gameStatus,
  }),

  setSnake: (snake: Coordination[]): GameAction => ({
    type: GameActionTypes.SET_SNAKE,
    snake,
  }),

  setDirection: (direction: Direction): GameAction => ({
    type: GameActionTypes.SET_DIRECTION,
    direction,
  }),

  setNewFood: (): GameAction => ({
    type: GameActionTypes.SET_NEW_FOOD,
  }),

  move: (): GameAction => ({
    type: GameActionTypes.MOVE,
  }),
};

export type IGameActions = typeof GameActions;

import { Direction } from '../../game/enums/directions';
import { GameStatus } from '../../game/enums/game_status';
import { Coordination } from '../../game/types/coordination';
import { GameAction } from '../reducers/game_reducer';
import { GameReducerActionTypes } from '../types/game_reducer_action_types';

export const GameReducerActions = {
  resetGame: (): GameAction => ({
    type: GameReducerActionTypes.RESET_GAME,
  }),

  setGameStatus: (gameStatus: GameStatus): GameAction => ({
    type: GameReducerActionTypes.SET_GAME_STATUS,
    gameStatus,
  }),

  setSnake: (snake: Coordination[]): GameAction => ({
    type: GameReducerActionTypes.SET_SNAKE,
    snake,
  }),

  setDirection: (direction: Direction): GameAction => ({
    type: GameReducerActionTypes.SET_DIRECTION,
    direction,
  }),

  setNewFood: (): GameAction => ({
    type: GameReducerActionTypes.SET_NEW_FOOD,
  }),
};

export type IGameReducerActions = typeof GameReducerActions;

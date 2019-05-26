import { GameAction } from '../reducers/game_reducer';
import { GameSagaActionTypes } from '../types/game_saga_action_types';

export const GameSagaActions = {
  startGame: (): GameAction => ({
    type: GameSagaActionTypes.START_GAME,
  }),

  pauseGame: (): GameAction => ({
    type: GameSagaActionTypes.PAUSE_GAME,
  }),

  resumeGame: (): GameAction => ({
    type: GameSagaActionTypes.RESUME_GAME,
  }),

  gameOver: (): GameAction => ({
    type: GameSagaActionTypes.GAME_OVER,
  }),

  move: (): GameAction => ({
    type: GameSagaActionTypes.MOVE,
  }),
};

export type IGameSagaActions = typeof GameSagaActions;

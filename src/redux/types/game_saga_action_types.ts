import { prefixActions } from '../../util/prefix_actions';

export const GameSagaActionTypes = prefixActions('GameSagaAction', {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  GAME_OVER: 'GAME_OVER',
  MOVE: 'MOVE',
});

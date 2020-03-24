import { put, take, race } from 'redux-saga/effects';
import { GameStatus } from '../../game/enums/game_status';
import { GameSagaActionTypes } from '../types/game_saga_action_types';
import { GameReducerActions } from '../actions/game_reducer_actions';

export function* sagaGameStatus() {
  while (true) {
    yield take(GameSagaActionTypes.START_GAME);
    yield put(GameReducerActions.resetGame());
    yield put(GameReducerActions.setGameStatus(GameStatus.RUNNING));

    while (true) {
      const raceResult = yield race([
        take(GameSagaActionTypes.GAME_OVER),
        take(GameSagaActionTypes.PAUSE_GAME),
      ]);

      const over: boolean = raceResult[0];
      const pause: boolean = raceResult[1];

      if (over) {
        yield put(GameReducerActions.setGameStatus(GameStatus.OVER));
        break;
      }

      if (pause) {
        yield put(GameReducerActions.setGameStatus(GameStatus.PAUSED));
        yield take(GameSagaActionTypes.RESUME_GAME);
        yield put(GameReducerActions.setGameStatus(GameStatus.RUNNING));
      }
    }
  }
}

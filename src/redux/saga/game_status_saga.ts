import { put, take, race } from 'redux-saga/effects';
import { GameActionTypes, GameActions } from '../actions/game_actions';
import { GameStatus } from '../../game/enums/game_status';

export function* sagaGameStatus() {
  while (true) {
    yield take(GameActionTypes.START_GAME);
    yield put(GameActions.setGameStatus(GameStatus.RUNNING));

    while (true) {
      const [over, pause] = yield race([
        take(GameActionTypes.GAME_OVER),
        take(GameActionTypes.PAUSE_GAME),
        take(GameActionTypes.MOVE),
      ]);

      if (over) {
        yield put(GameActions.setGameStatus(GameStatus.OVER));
        break;
      }

      if (pause) {
        yield put(GameActions.setGameStatus(GameStatus.PAUSED));
        yield take(GameActionTypes.RESUME_GAME);
        yield put(GameActions.setGameStatus(GameStatus.RUNNING));
      }
    }
  }
}

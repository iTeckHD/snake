import { put, take } from 'redux-saga/effects';
import { GameActionTypes, GameActions } from '../actions/game_actions';
import { GameStatus } from '../../game/enums/game_status';

export function* sagaGameStatus() {
  yield put(GameActions.setGameStatus(GameStatus.NOT_STARTED));
  yield take(GameActionTypes.START_GAME);
  yield put(GameActions.setGameStatus(GameStatus.RUNNING));

  while (true) {
    yield take(GameActionTypes.GAME_OVER);
    yield put(GameActions.setGameStatus(GameStatus.OVER));
    yield take(GameActionTypes.START_GAME);
    yield put(GameActions.setGameStatus(GameStatus.RUNNING));
  }
}

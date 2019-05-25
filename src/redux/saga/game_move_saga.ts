import { take, select, call, put } from 'redux-saga/effects';
import { GameActionTypes, GameActions } from '../actions/game_actions';
import { getSnake, getDirection } from './selector';
import { Coordination } from '../../game/types/coordination';
import { Direction } from '../../game/enums/directions';
import { getNextSnakeCoordination } from '../../game/coordination/get_next_snake_coordination';
import { collisionCheck } from '../../game/collision_check';
import { GameStatus } from '../../game/enums/game_status';

export function* sagaGameMove() {
  while (true) {
    yield take(GameActionTypes.MOVE);

    const snake: Coordination[] = yield select(getSnake);
    const direction: Direction = yield select(getDirection);

    const coordinations: Coordination[] = yield call(
      getNextSnake,
      snake,
      direction,
    );

    const willColide = yield call(collisionCheck, coordinations);
    yield willColide
      ? put(GameActions.setGameStatus(GameStatus.OVER))
      : put(GameActions.setSnake(coordinations));
  }
}

const getNextSnake = (snake: Coordination[], direction: Direction) => {
  const cloned = snake.slice();
  cloned.pop();
  return [getNextSnakeCoordination(snake, direction), ...cloned];
};

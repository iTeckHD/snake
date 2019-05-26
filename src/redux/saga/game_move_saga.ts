import { take, select, put, all } from 'redux-saga/effects';
import { GameActionTypes, GameActions } from '../actions/game_actions';
import { getSnake, getDirection, getFood } from './selector';
import { Coordination } from '../../game/types/coordination';
import { getNextSnakeCoordination } from '../../game/coordination/get_next_snake_coordination';
import { collisionCheck } from '../../game/collision_check';
import { GameStatus } from '../../game/enums/game_status';
import { snakeWillEat } from '../../game/coordination/snake_will_eat';

export function* sagaGameMove() {
  while (true) {
    yield take(GameActionTypes.MOVE);

    const [snake, direction, food] = yield all([
      select(getSnake),
      select(getDirection),
      select(getFood),
    ]);

    const coordinations: Coordination[] = [
      getNextSnakeCoordination(snake, direction),
      ...(snake as Coordination[]),
    ];

    if (snakeWillEat(coordinations, food)) {
      yield put(GameActions.setNewFood());
    } else {
      coordinations.pop();
    }

    yield collisionCheck(coordinations)
      ? put(GameActions.setGameStatus(GameStatus.OVER))
      : put(GameActions.setSnake(coordinations));
  }
}

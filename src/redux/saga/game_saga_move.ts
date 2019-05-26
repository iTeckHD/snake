import { take, select, put, all } from 'redux-saga/effects';
import { getSnake, getDirection, getFood } from './selector';
import { Coordination } from '../../game/types/coordination';
import { getNextSnakeCoordination } from '../../game/coordination/get_next_snake_coordination';
import { collisionCheck } from '../../game/collision_check';
import { snakeWillEat } from '../../game/coordination/snake_will_eat';
import { GameSagaActionTypes } from '../types/game_saga_action_types';
import { GameSagaActions } from '../actions/game_saga_actions';
import { GameReducerActions } from '../actions/game_reducer_actions';

export function* sagaGameMove() {
  while (true) {
    yield take(GameSagaActionTypes.MOVE);

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
      yield put(GameReducerActions.setNewFood());
    } else {
      coordinations.pop();
    }

    yield collisionCheck(coordinations)
      ? put(GameSagaActions.gameOver())
      : put(GameReducerActions.setSnake(coordinations));
  }
}

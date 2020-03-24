import { take, select, put, all, call } from 'redux-saga/effects';
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

    const snake = yield select(getSnake);
    const direction = yield select(getDirection);
    const food = yield select(getFood);
    const coordinations: Coordination[] = [
      getNextSnakeCoordination(snake, direction),
      ...(snake as Coordination[]),
    ];

    if (snakeWillEat(coordinations, food)) {
      yield all([
        put(GameReducerActions.setNewFood()),
        put(GameReducerActions.increaseScore()),
      ]);
    } else {
      coordinations.pop();
    }

    yield collisionCheck(coordinations)
      ? put(GameSagaActions.gameOver())
      : put(GameReducerActions.setSnake(coordinations));
  }
}

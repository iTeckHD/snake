import { Coordination } from '../../game/types/coordination';
import { Speed } from '../../game/enums/speed';
import { Direction } from '../../game/enums/directions';
import { getStartSnakeCoordinates } from '../../game/coordination/get_start_snake_coordinates';
import { GameConfig } from '../../game/config';
import { nextDirectionIsValid } from '../../game/next_direction_is_valid';
import { getStartFoodCoordination } from '../../game/coordination/get_start_food_coordination';
import { GameStatus } from '../../game/enums/game_status';
import { getNextFoodCoordination } from '../../game/coordination/get_next_food_coordination';
import { GameReducerActionTypes } from '../types/game_reducer_action_types';
import { ReduxAction } from '../../util/redux_action';

export interface GameAction extends ReduxAction {
  direction?: Direction;
  gameStatus?: GameStatus;
  snake?: Coordination[];
}

export interface GameState {
  status: GameStatus;
  direction: Direction;
  speed: Speed;
  score: number;
  snake: Coordination[];
  food: Coordination;
}

const defaultState: GameState = {
  status: GameStatus.NOT_STARTED,
  direction: Direction.RIGHT,
  speed: Speed.SPEED_1,
  score: 0,
  snake: getStartSnakeCoordinates(GameConfig.fieldSize),
  food: getStartFoodCoordination(GameConfig.fieldSize),
};

export const gameReducer = (
  state: GameState = defaultState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case GameReducerActionTypes.RESET_GAME:
      return defaultState;

    case GameReducerActionTypes.SET_GAME_STATUS:
      return {
        ...state,
        status: action.gameStatus!,
      };

    case GameReducerActionTypes.SET_SNAKE:
      return {
        ...state,
        snake: action.snake!,
      };
    case GameReducerActionTypes.SET_NEW_FOOD:
      return {
        ...state,
        food: getNextFoodCoordination(state.snake, GameConfig.fieldSize),
      };

    case GameReducerActionTypes.SET_DIRECTION:
      return !nextDirectionIsValid(state.direction, action.direction!)
        ? state
        : {
            ...state,
            direction: action.direction!,
          };

    case GameReducerActionTypes.INCREASE_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };

    default:
      return state;
  }
};

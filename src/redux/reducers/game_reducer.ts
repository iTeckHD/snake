import { GameAction, GameActionTypes } from '../actions/game_actions';
import { Coordination } from '../../game/types/coordination';
import { getNextCoordination } from '../../game/coordination/get_next_coordination';
import { collisionCheck } from '../../game/collision_check';
import { Speed } from '../../game/enums/speed';
import { Direction } from '../../game/enums/directions';
import { getStartCoordinates } from '../../game/coordination/get_start_coordinates';
import { GameConfig } from '../../game/config';
import { nextDirectionIsValid } from '../../game/next_direction_is_valid';
import { getStartFoodCoordination } from '../../game/coordination/get_start_food_coordination';

export interface GameState {
  started: boolean;
  paused: boolean;
  isOver: boolean;
  direction: Direction;
  speed: Speed;
  coordinations: Coordination[];
  food: Coordination;
}

const defaultState: GameState = {
  started: false,
  paused: false,
  isOver: false,
  direction: Direction.RIGHT,
  speed: Speed.SPEED_1,
  coordinations: getStartCoordinates(GameConfig.fieldSize),
  food: getStartFoodCoordination(GameConfig.fieldSize),
};

export const gameReducer = (
  state: GameState = defaultState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case GameActionTypes.START_GAME:
      return {
        ...state,
        ...defaultState,
        started: true,
      };

    case GameActionTypes.SET_PAUSE:
      return {
        ...state,
        paused: action.paused!,
      };

    case GameActionTypes.MOVE:
      const coordinations = [
        getNextCoordination(state.coordinations, action.direction!),
        ...state.coordinations,
      ];
      coordinations.pop();

      if (collisionCheck(coordinations)) {
        return {
          ...state,
          isOver: true,
        };
      }

      return {
        ...state,
        coordinations: coordinations,
      };

    case GameActionTypes.CHANGE_DIRECTION:
      return !nextDirectionIsValid(state.direction, action.direction!)
        ? state
        : {
            ...state,
            direction: action.direction!,
          };

    default:
      return state;
  }
};

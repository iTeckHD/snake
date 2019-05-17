import { GameAction, GameActionTypes } from '../actions/game_actions';
import { Coordination } from '../../game/types/coordination';
import { getNextCoordination } from '../../game/get_next_coordination';
import { collisionCheck } from '../../game/collision_check';
import { Speed } from '../../game/enums/speed';

export interface GameState {
  started: boolean;
  paused: boolean;
  isOver: boolean;
  speed: Speed;
  coordinations: Coordination[];
}

const defaultState: GameState = {
  started: false,
  paused: false,
  isOver: false,
  speed: Speed.SPEED_1,
  coordinations: [],
};

export const gameReducer = (
  state: GameState = defaultState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case GameActionTypes.START_GAME:
      return state;

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
          coordinations: coordinations,
          isOver: true,
        };
      }

      return {
        ...state,
        coordinations: coordinations,
      };

    default:
      return state;
  }
};

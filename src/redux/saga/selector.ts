import { ApplicationState } from '../application_state';
import { Direction } from '../../game/enums/directions';
import { Coordination } from '../../game/types/coordination';

export const getSnake = (state: ApplicationState): Coordination[] =>
  state.game.snake;

export const getDirection = (state: ApplicationState): Direction =>
  state.game.direction;

export const getFood = (state: ApplicationState): Coordination =>
  state.game.food;

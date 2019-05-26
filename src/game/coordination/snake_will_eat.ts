import { Coordination } from '../types/coordination';
import { isSameCoordination } from './is_same_coordination';

export const snakeWillEat = (snake: Coordination[], food: Coordination) =>
  snake.some(c => isSameCoordination(c, food));

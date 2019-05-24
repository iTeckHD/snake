import { Coordination } from './types/coordination';
import { GameConfig } from './config';
import { isSameCoordination } from './coordination/is_same_coordination';

export const collisionCheck = (coords: Coordination[]) => {
  return coords.some(
    c1 =>
      c1.x < 0 ||
      c1.y < 0 ||
      c1.x > GameConfig.fieldSize - 1 ||
      c1.y > GameConfig.fieldSize - 1 ||
      coords.filter(c2 => isSameCoordination(c1, c2)).length > 1,
  );
};

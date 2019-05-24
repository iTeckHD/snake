import { Coordination } from './types/coordination';
import { GameConfig } from './config';

export const collisionCheck = (coords: Coordination[]) => {
  return coords.some(
    (c1, c1i) =>
      c1.x < 0 ||
      c1.y < 0 ||
      c1.x >= GameConfig.fieldSize ||
      c1.y >= GameConfig.fieldSize ||
      coords
        .filter((c2, c2i) => c1i !== c2i)
        .some(c2 => c1.x === c2.x && c1.y === c2.y),
  );
};

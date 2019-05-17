import { Coordination } from './types/coordination';
import { Direction } from './enums/directions';

export const getNextCoordination = (
  coords: Coordination[],
  direction: Direction,
): Coordination => {
  const temp = coords.slice();
  temp.unshift();

  const newCord: Coordination = { ...temp[0] };

  switch (direction) {
    case Direction.UP:
      newCord.y = newCord.y - 1;
      break;
  }

  return newCord;
};

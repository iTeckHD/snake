import { Coordination } from '../types/coordination';
import { Direction } from '../enums/directions';

export const getNextSnakeCoordination = (
  coords: Coordination[],
  direction: Direction,
): Coordination => {
  const newCord: Coordination = { ...coords[0] };

  switch (direction) {
    case Direction.UP:
      newCord.y--;
      break;
    case Direction.RIGHT:
      newCord.x++;
      break;
    case Direction.DOWN:
      newCord.y++;
      break;
    case Direction.LEFT:
      newCord.x--;
      break;
  }

  return newCord;
};

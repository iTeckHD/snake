import { Direction } from './enums/directions';

const oppsiteMap: { [id: number]: Direction } = {
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.UP]: Direction.DOWN,
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.DOWN]: Direction.UP,
};

export const nextDirectionIsValid = (
  currentDirection: Direction,
  newDirection: Direction,
): boolean => {
  return newDirection !== oppsiteMap[currentDirection];
};

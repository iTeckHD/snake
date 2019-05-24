import { Coordination } from '../types/coordination';
import { isSameCoordination } from './is_same_coordination';

export const getNextFoodCoordination = (
  usedCoords: Coordination[],
  fieldSize: number,
): Coordination => {
  const max = fieldSize - 1;
  let coord = getRandomCoordination(0, max);
  while (usedCoords.some(c => isSameCoordination(c, coord))) {
    coord = getRandomCoordination(0, max);
  }

  return coord;
};

const getRandomCoordination = (min: number, max: number): Coordination => {
  return {
    x: Math.floor(Math.random() * max) + min,
    y: Math.floor(Math.random() * max) + min,
  };
};

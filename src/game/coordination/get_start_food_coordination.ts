import { Coordination } from '../types/coordination';

export const getStartFoodCoordination = (fieldSize: number): Coordination => {
  const middle = Math.round(fieldSize / 2) - (fieldSize % 2);
  return { x: fieldSize - 2, y: middle };
};

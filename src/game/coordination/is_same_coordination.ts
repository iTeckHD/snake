import { Coordination } from '../types/coordination';

export const isSameCoordination = (
  c1: Coordination,
  c2: Coordination,
): boolean => c1.x === c2.x && c1.y === c2.y;

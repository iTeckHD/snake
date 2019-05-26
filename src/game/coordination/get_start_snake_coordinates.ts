export const getStartSnakeCoordinates = (fieldSize: number) => {
  const middle = Math.round(fieldSize / 2) - (fieldSize % 2);
  return [{ x: 3, y: middle }, { x: 2, y: middle }];
};

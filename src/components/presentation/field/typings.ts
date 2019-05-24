import { Direction } from '../../../game/enums/directions';

interface FieldPresentationalProps {
  fieldSize: number;

  onTogglePause: () => void;
  onChangeDirection: (direction: Direction) => void;
}
export type FieldProps = FieldPresentationalProps;

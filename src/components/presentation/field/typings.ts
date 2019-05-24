import { Direction } from '../../../game/enums/directions';

interface FieldPresentationalProps {
  fieldSize: number;

  onChangeDirection: (direction: Direction) => void;
}
export type FieldProps = FieldPresentationalProps;

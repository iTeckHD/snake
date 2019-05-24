import { Direction } from '../../../game/enums/directions';
import { Coordination } from '../../../game/types/coordination';

interface FieldPresentationalProps {
  fieldSize: number;
  coordinates: Coordination[];

  onTogglePause: () => void;
  onChangeDirection: (direction: Direction) => void;
}
export type FieldProps = FieldPresentationalProps;

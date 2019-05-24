import { Direction } from '../../../game/enums/directions';
import { Coordination } from '../../../game/types/coordination';
import { GameStatus } from '../../../game/enums/game_status';

interface FieldPresentationalProps {
  fieldSize: number;
  status: GameStatus;
  coordinates: Coordination[];
  food: Coordination;

  onStartGame: () => void;
  onTogglePause: () => void;
  onChangeDirection: (direction: Direction) => void;
}
export type FieldProps = FieldPresentationalProps;

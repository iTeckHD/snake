import { Coordination } from '../../../game/types/coordination';

interface FieldPresentationalProps {
  fieldSize: number;
  coordinates: Coordination[];
  food: Coordination;
}
export type FieldProps = FieldPresentationalProps;

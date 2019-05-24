import React from 'react';
import { GameActions, IGameActions } from '../../redux/actions/game_actions';
import { ApplicationState } from '../../redux/application_state';
import { connect } from 'react-redux';
import { FieldProps } from '../presentation/field/typings';
import { GameConfig } from '../../game/config';
import { Coordination } from '../../game/types/coordination';
import { useInterval } from '../../util/use_interval';
import { Direction } from '../../game/enums/directions';

interface PresentationalProps {}
type DispatchProps = IGameActions;
interface ContainerProps {
  paused: boolean;
  isOver: boolean;
  direction: Direction;
  coordinates: Coordination[];
  food: Coordination;
}
type Props = PresentationalProps & DispatchProps & ContainerProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({
  paused: state.game.paused,
  isOver: state.game.isOver,
  direction: state.game.direction,
  coordinates: state.game.snake,
  food: state.game.food,
});

export const withGame = (
  FieldComponent: (fieldProps: FieldProps) => JSX.Element,
) => {
  return connect<
    ContainerProps,
    DispatchProps,
    PresentationalProps,
    ApplicationState
  >(
    mapStateToProps,
    GameActions,
  )((props: Props) => {
    useInterval(() => {
      if (props.isOver) {
        return;
      }
      props.move(props.direction);
    }, 100);

    const handleTogglePause = () => {
      props.paused ? props.resumeGame() : props.pauseGame();
    };

    return (
      <FieldComponent
        fieldSize={GameConfig.fieldSize}
        coordinates={props.coordinates}
        food={props.food}
        onTogglePause={handleTogglePause}
        onChangeDirection={props.changeDirection}
      />
    );
  });
};

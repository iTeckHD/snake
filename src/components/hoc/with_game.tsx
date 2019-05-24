import React from 'react';
import { GameActions, IGameActions } from '../../redux/actions/game_actions';
import { ApplicationState } from '../../redux/application_state';
import { connect } from 'react-redux';
import { FieldProps } from '../presentation/field/typings';
import { GameConfig } from '../../game/config';
import { Coordination } from '../../game/types/coordination';
import { useInterval } from '../../util/use_interval';
import { Direction } from '../../game/enums/directions';
import { GameStatus } from '../../game/enums/game_status';

interface PresentationalProps {}
type DispatchProps = IGameActions;
interface ContainerProps {
  gameStatus: GameStatus;
  direction: Direction;
  coordinates: Coordination[];
  food: Coordination;
}
type Props = PresentationalProps & DispatchProps & ContainerProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({
  gameStatus: state.game.status,
  direction: state.game.direction,
  coordinates: state.game.snake,
  food: state.game.food,
});

export const withGame = (
  FieldComponent: (fieldProps: FieldProps) => JSX.Element,
) => {
  const Component = (props: Props) => {
    const { gameStatus, coordinates, food } = props;

    useInterval(() => {
      if (gameStatus === GameStatus.RUNNING) {
        props.move(props.direction);
      }
    }, 100);

    const handleTogglePause = () => {
      if (gameStatus === GameStatus.PAUSED) {
        props.resumeGame();
      }
      if (gameStatus === GameStatus.RUNNING) {
        props.pauseGame();
      }
    };

    return (
      <FieldComponent
        fieldSize={GameConfig.fieldSize}
        coordinates={coordinates}
        food={food}
        onTogglePause={handleTogglePause}
        onChangeDirection={props.changeDirection}
      />
    );
  };

  return connect<
    ContainerProps,
    DispatchProps,
    PresentationalProps,
    ApplicationState
  >(
    mapStateToProps,
    GameActions,
  )(Component);
};

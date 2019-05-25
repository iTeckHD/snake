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
import { Speed } from '../../game/enums/speed';

interface PresentationalProps {}
type DispatchProps = IGameActions;
interface ContainerProps {
  status: GameStatus;
  direction: Direction;
  coordinates: Coordination[];
  food: Coordination;
  speed: Speed;
}
type Props = PresentationalProps & DispatchProps & ContainerProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({
  status: state.game.status,
  direction: state.game.direction,
  coordinates: state.game.snake,
  food: state.game.food,
  speed: state.game.speed,
});

export const withGame = (
  FieldComponent: (fieldProps: FieldProps) => JSX.Element,
) => {
  const Component = (props: Props) => {
    const { status: gameStatus, coordinates, food, speed } = props;

    useInterval(() => {
      if (gameStatus === GameStatus.RUNNING) {
        props.move();
      }
    }, 500);

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
        status={gameStatus}
        coordinates={coordinates}
        food={food}
        onStartGame={props.startGame}
        onTogglePause={handleTogglePause}
        onChangeDirection={props.setDirection}
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

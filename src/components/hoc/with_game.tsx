import React from 'react';
import { GameActions, IGameActions } from '../../redux/actions/game_actions';
import { ApplicationState } from '../../redux/application_state';
import { connect } from 'react-redux';
import { FieldProps } from '../presentation/field/typings';
import { GameConfig } from '../../game/config';

interface PresentationalProps {}
type DispatchProps = IGameActions;
interface ContainerProps {
  paused: boolean;
}
type Props = PresentationalProps & DispatchProps & ContainerProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({
  paused: state.game.paused,
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
    const handleTogglePause = () => {
      props.paused ? props.resumeGame() : props.pauseGame();
    };

    return (
      <FieldComponent
        fieldSize={GameConfig.fieldSize}
        onTogglePause={handleTogglePause}
        onChangeDirection={props.changeDirection}
      />
    );
  });
};

import React from 'react';
import { GameActions, IGameActions } from '../../redux/actions/game_actions';
import { ApplicationState } from '../../redux/application_state';
import { connect } from 'react-redux';
import { FieldProps } from '../presentation/field/typings';
import { GameConfig } from '../../game/config';
import { Direction } from '../../game/enums/directions';

interface PresentationalProps {}
type DispatchProps = IGameActions;
interface ContainerProps {}
type Props = PresentationalProps & DispatchProps & ContainerProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({});

export const withGame = (
  FieldComponent: (props: FieldProps) => JSX.Element,
) => {
  const Component = (props: Props) => {
    const handleChangeDirection = (direction: Direction) => {
      console.log('change direction');
    };

    return (
      <FieldComponent
        onChangeDirection={handleChangeDirection}
        fieldSize={GameConfig.fieldSize}
      />
    );
  };

  return connect<
    PresentationalProps,
    DispatchProps,
    ContainerProps,
    ApplicationState
  >(
    mapStateToProps,
    GameActions,
  )(Component);
};

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {
  IGameSagaActions,
  GameSagaActions,
} from '../../redux/actions/game_saga_actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/application_state';
import { GameSagaActionTypes } from '../../redux/types/game_saga_action_types';

interface PresentationalProps {}

interface ContainerProps {
  score: number;
}

type DispatchProps = IGameSagaActions;

type Props = PresentationalProps & ContainerProps & DispatchProps;

const mapStateToProps = (state: ApplicationState): ContainerProps => ({
  score: state.game.score,
});

const Component = (props: Props) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          onClick={() => {
            props.startGame();
          }}
          color='inherit'
        >
          <PlayIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            props.pauseGame();
          }}
          color='inherit'
        >
          <PauseIcon />
        </IconButton>
        <Typography color='inherit' variant='h6'>
          Score: {props.score}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export const Header = connect<
  ContainerProps,
  DispatchProps,
  PresentationalProps,
  ApplicationState
>(
  mapStateToProps,
  GameSagaActions,
)(Component);

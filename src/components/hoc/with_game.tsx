import React from 'react';
import { GameActions, IGameActions } from '../../redux/actions/game_actions';
import { ApplicationState } from '../../redux/application_state';
import { connect } from 'react-redux';
import { FieldProps } from '../presentation/field/typings';
import { GameConfig } from '../../game/config';
import { codes } from 'keycode';
import { Coordination } from '../../game/types/coordination';
import { useInterval } from '../../util/use_interval';
import { Direction } from '../../game/enums/directions';
import { GameStatus } from '../../game/enums/game_status';
import { Speed } from '../../game/enums/speed';
import { fromEvent } from 'rxjs';
import { tap, distinctUntilKeyChanged } from 'rxjs/operators';
import { OverlayGameNotStarted } from '../presentation/overlay/overlay_game_not_started';
import { OverlayGamePaused } from '../presentation/overlay/overlay_game_paused';
import { OverlayGameOver } from '../presentation/overlay/overlay_game_over';

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
    const { status, coordinates, food, speed } = props;

    React.useEffect(() => {
      const observableKeyboard = fromEvent<KeyboardEvent>(window, 'keydown')
        .pipe(
          tap(handleStatus),
          distinctUntilKeyChanged('keyCode'),
        )
        .subscribe(handleDirection);

      return () => {
        observableKeyboard.unsubscribe();
      };
    });

    useInterval(() => {
      if (status === GameStatus.RUNNING) {
        props.move();
      }
    }, 100);

    const handleDirection = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case codes.left:
        case codes.a:
          props.setDirection(Direction.LEFT);
          break;
        case codes.up:
        case codes.w:
          props.setDirection(Direction.UP);
          break;
        case codes.right:
        case codes.d:
          props.setDirection(Direction.RIGHT);
          break;
        case codes.down:
        case codes.s:
          props.setDirection(Direction.DOWN);
          break;
      }
    };

    const handleStatus = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case codes.esc:
        case codes.space:
          switch (status) {
            case GameStatus.NOT_STARTED:
            case GameStatus.OVER:
              props.startGame();
              break;

            case GameStatus.RUNNING:
            case GameStatus.PAUSED:
              if (status === GameStatus.PAUSED) {
                props.resumeGame();
              }
              if (status === GameStatus.RUNNING) {
                props.pauseGame();
              }
              break;
          }
          break;
      }
    };

    return (
      <>
        <div className='game-wrapper'>
          <div className='game-content'>
            <FieldComponent
              fieldSize={GameConfig.fieldSize}
              coordinates={coordinates}
              food={food}
            />
          </div>
        </div>
        {status !== GameStatus.RUNNING && (
          <div className='overlay'>
            <div className='overlay-content'>
              {status === GameStatus.NOT_STARTED && <OverlayGameNotStarted />}
              {status === GameStatus.PAUSED && <OverlayGamePaused />}
              {status === GameStatus.OVER && <OverlayGameOver />}
            </div>
          </div>
        )}
      </>
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

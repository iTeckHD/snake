import React from 'react';
import classNames from 'classnames';
import { FieldProps } from './typings';
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { codes } from 'keycode';
import { Direction } from '../../../game/enums/directions';
import { getFieldStyles } from './field-styles';
import { Coordination } from '../../../game/types/coordination';
import { GameStatus } from '../../../game/enums/game_status';

export const Field = (props: FieldProps) => {
  const { fieldSize, status: gameStatus, coordinates, food } = props;

  React.useEffect(() => {
    const eventKeydown = fromEvent<KeyboardEvent>(window, 'keydown')
      //.pipe(distinctUntilKeyChanged('keyCode'))
      .subscribe(handleKeydown);

    return () => {
      eventKeydown.unsubscribe();
    };
  });

  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case codes.left:
      case codes.a:
        props.onChangeDirection(Direction.LEFT);
        break;
      case codes.up:
      case codes.w:
        props.onChangeDirection(Direction.UP);
        break;
      case codes.right:
      case codes.d:
        props.onChangeDirection(Direction.RIGHT);
        break;
      case codes.down:
      case codes.s:
        props.onChangeDirection(Direction.DOWN);
        break;
      case codes.esc:
      case codes.space:
        switch (gameStatus) {
          case GameStatus.NOT_STARTED:
          case GameStatus.OVER:
            props.onStartGame();
            break;

          case GameStatus.RUNNING:
          case GameStatus.PAUSED:
            props.onTogglePause();
            break;
        }
        break;
    }
  };

  const getCoordinationAsNumber = (c: Coordination) => {
    return c.y * fieldSize + c.x;
  };

  const styles = getFieldStyles(fieldSize);
  const cells = new Array(Math.pow(fieldSize, 2)).fill(null);
  const snakeCells = coordinates.map(getCoordinationAsNumber);
  const foodCell = getCoordinationAsNumber(food);

  return (
    <>
      <div className={classNames('field', styles.root)}>
        {cells.map((val, i) => (
          <div
            key={i}
            className={classNames('cell', {
              snake: snakeCells.indexOf(i) > -1,
              food: foodCell === i,
            })}
          />
        ))}
      </div>
    </>
  );
};

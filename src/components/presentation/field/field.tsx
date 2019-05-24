import React from 'react';
import { FieldProps } from './typings';
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { codes } from 'keycode';
import { Direction } from '../../../game/enums/directions';
import { getFieldStyles } from './field-styles';
import classNames from 'classnames';

export const Field = (props: FieldProps) => {
  React.useEffect(() => {
    const eventKeydown = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(distinctUntilKeyChanged('keyCode'))
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
        props.onTogglePause();
        break;
    }
  };

  const styles = getFieldStyles(props.fieldSize);
  const drawBlack = props.coordinates.map(
    c => (c.y - 1) * props.fieldSize + c.x,
  );

  return (
    <div className={classNames('field', styles.root)}>
      {new Array(props.fieldSize * props.fieldSize).fill(null).map((val, i) => (
        <div
          key={i}
          className={classNames('cell', { black: drawBlack.indexOf(i) > -1 })}
        />
      ))}
    </div>
  );
};

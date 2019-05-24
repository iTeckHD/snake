import React from 'react';
import { FieldProps } from './typings';
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { codes } from 'keycode';
import { Direction } from '../../../game/enums/directions';

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
        break;
    }
  };

  const arr = new Array(props.fieldSize).fill(null);
  const renderRow = (key: number) => {
    return (
      <div className='row' key={key}>
        {renderCells()}
      </div>
    );
  };

  const renderCells = () => {
    return arr.map((val, i) => <div className='cell' key={i} />);
  };

  return <div className='field'>{arr.map((val, i) => renderRow(i))}</div>;
};

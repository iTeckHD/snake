import React from 'react';
import classNames from 'classnames';
import { FieldProps } from './typings';
import { getFieldStyles } from './field-styles';
import { Coordination } from '../../../game/types/coordination';

export const Field = (props: FieldProps) => {
  const { fieldSize, coordinates, food } = props;

  const getCoordinationAsNumber = (c: Coordination) => {
    return c.y * fieldSize + c.x;
  };

  const styles = getFieldStyles(fieldSize);
  const cells = new Array(Math.pow(fieldSize, 2)).fill(null);
  const snakeCells = coordinates.map(getCoordinationAsNumber);
  const foodCell = getCoordinationAsNumber(food);

  return (
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
  );
};

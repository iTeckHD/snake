import React from 'react';
import { GameConfig } from '../../game/config';

export const Field = () => {
  const size = GameConfig.fieldSize;
  const arr = new Array(size).fill(null);

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

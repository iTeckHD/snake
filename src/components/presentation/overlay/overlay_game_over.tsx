import React from 'react';
import { Typography } from '@material-ui/core';

interface PresentationalProps {}

type Props = PresentationalProps;

export const OverlayGameOver = (props: Props) => {
  return (
    <div>
      <Typography>The game is over</Typography>
    </div>
  );
};

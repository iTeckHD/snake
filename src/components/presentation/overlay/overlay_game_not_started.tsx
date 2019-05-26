import React from 'react';
import { Typography } from '@material-ui/core';

interface PresentationalProps {}

type Props = PresentationalProps;

export const OverlayGameNotStarted = (props: Props) => {
  return (
    <div>
      <Typography>The game is not started yet</Typography>
    </div>
  );
};

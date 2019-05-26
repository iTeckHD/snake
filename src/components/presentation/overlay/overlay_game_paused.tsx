import React from 'react';
import { Typography } from '@material-ui/core';

interface PresentationalProps {}

type Props = PresentationalProps;

export const OverlayGamePaused = (props: Props) => {
  return (
    <div>
      <Typography>The game is paused</Typography>
    </div>
  );
};

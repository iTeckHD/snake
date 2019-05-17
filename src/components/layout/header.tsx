import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

export const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton color='inherit'>
          <PlayIcon />
        </IconButton>
        <IconButton color='inherit'>
          <PauseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

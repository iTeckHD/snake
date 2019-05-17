import React from 'react';
import { render } from 'react-dom';
import { App } from './app';

require('./styles/app.scss');
render(<App />, document.getElementById('app'));

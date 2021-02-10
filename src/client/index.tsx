import * as React from 'react';
import * as ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './app';

import './sass/index.scss';

export const socket = io.connect(window.location.host);

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

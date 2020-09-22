import * as React from 'react';
import * as ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './sass/index.scss';
import App from './app';

export const socket = io.connect(window.location.host);

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

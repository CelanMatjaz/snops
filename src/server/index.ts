import socketIO from 'socket.io';
import * as http from 'http';

import app from './app';
import applySocket from './socket';

const server = http.createServer(app);
const io = socketIO(server);
applySocket(io);

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => console.log('Server started on port', PORT));

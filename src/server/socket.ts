import * as socketIO from 'socket.io';

export default (io: socketIO.Server) => {
  io.on('connection', (client) => {
    console.log('connected', client.id);
    client.emit('get', client.id);
  });
};

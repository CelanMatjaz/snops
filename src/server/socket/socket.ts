import * as socketIO from 'socket.io';

import { GameState } from '../game/GameState';
import { channels } from './channels';

export default (io: socketIO.Server) => {
  const state = new GameState();

  io.on('connection', (client) => {
    // client.emit('get', client.id);
    if (state.addPlayer(client.id)) {
      io.emit(channels.updateNumOfPlayers, state.getNumOfPlayers());
    }

    client.on('disconnect', () => {
      if (state.removePlayer(client.id)) {
        io.emit(channels.updateNumOfPlayers, state.getNumOfPlayers());
      }
    });
  });
};

import * as socketIO from 'socket.io';

import { GameState } from '../game/GameState';
import { channels } from './channels';

export default (io: socketIO.Server) => {
  const state = new GameState(io);

  io.on('connection', (client) => {
    if (state.addPlayer(client.id)) {
      io.emit(channels.updateNumOfPlayers, state.getNumberOfPlayers());
      client.emit(channels.sendId, {
        id: client.id,
        playerNum: state.getNumberOfPlayers(),
      });
    }

    client.on('disconnect', () => {
      if (state.removePlayer(client.id)) {
        io.emit(channels.updateNumOfPlayers, state.getNumberOfPlayers());
      }
    });

    client.on(channels.setIsReady, (isReady: boolean) => {
      state.setPlayerReady(client.id, isReady);
      io.emit(channels.updateNumOfReadyPlayers, state.getNumberOfReadyPlayers());
      if (state.areAllPlayersReady()) {
        state.start();
      }
    });
  });
};

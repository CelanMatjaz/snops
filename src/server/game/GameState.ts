import * as socketIO from 'socket.io';
import { channels } from '../socket/channels';

export class GameState {
  constructor(socket: socketIO.Server) {
    this.socket = socket;
  }

  private socket: socketIO.Server;

  // Should be 2-4 to start the game
  private players: Players = {};
  private hasStarted: boolean = false;
  private hasEnded: boolean = true;
  private gamePhase?: GamePhases;

  getNumberOfPlayers = (): number => Object.entries(this.players).length;
  getPlayers = (): Players => this.players;
  getHasStarted = (): boolean => this.hasStarted;
  getHasEnded = (): boolean => this.hasEnded;

  addPlayer = (playerId: string): Player | null => {
    if (!this.hasStarted && Object.entries(this.players).length < 4) {
      this.players[playerId] = {
        playerNumber: Object.entries(this.players).length + 1,
        score: 0,
        isReady: false,
      };
      return this.players[playerId];
    }
    return null;
  };

  removePlayer = (playerId: string): boolean => {
    if (!this.hasStarted) {
      if (!this.players[playerId]) {
        return false;
      }
      delete this.players[playerId];
      return true;
    }
    return false;
  };

  setPlayerReady = (playerId: string, isReady: boolean) => {
    this.players[playerId].isReady = isReady;
  };

  getNumberOfReadyPlayers = (): number => {
    let numberOfReadyPlayers = 0;
    for (const player of Object.values(this.players)) {
      if (player.isReady) numberOfReadyPlayers++;
    }
    return numberOfReadyPlayers;
  };

  resetPlayerScores = () => {
    for (const id in Object.keys(this.players)) {
      this.players[id].score = 0;
    }
  };

  addPoints = (playerId: string, score: number) => {
    this.players[playerId].score += score;
    if (this.players[playerId].score >= 24) this.hasEnded = true;
  };

  areAllPlayersReady = (): boolean => {
    return this.getNumberOfPlayers() === this.getNumberOfReadyPlayers();
  };

  onStart = () => {
    this.resetPlayerScores();
    this.hasStarted = true;
    this.gamePhase = GamePhases.DEALING;
    const playerToStart = Object.values(this.players)[Math.floor(Math.random() * 4)];
    this.socket.emit(channels.gameStarted, { playerToStart });
  };

  start = (): void => {
    if (this.areAllPlayersReady()) {
      this.onStart();
    }
  };
}

export enum GamePhases {
  DEALING,
  CALLING,
  PLAYING,
}

export enum GameTypes {
  GAMENORMAL,
  GAME7,
  GAME9,
  GAME12,
  GAME18,
  GAME24,
}

interface Player {
  playerNumber: number;
  score: number;
  isReady: boolean;
}

interface Players {
  [key: string]: Player;
}

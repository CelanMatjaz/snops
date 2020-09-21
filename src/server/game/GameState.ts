interface PlayerScores {
  [key: string]: number;
}

export class GameState {
  constructor() {}

  // Should be 2-4 to start the game
  private playerIds: string[] = [];
  private playerScores: PlayerScores = {};
  private hasStarted: boolean = false;
  private hasEnded: boolean = true;
  private gamePhase?: GamePhases;

  getNumOfPlayers = (): number => this.playerIds.length;
  getPlayerIds = (): string[] => this.playerIds;
  getPlayerScores = (): PlayerScores => this.playerScores;
  getHasStarted = (): boolean => this.hasStarted;
  getHasEnded = (): boolean => this.hasEnded;

  addPlayer = (playerId: string): string | null => {
    if (!this.hasStarted && this.playerIds.length < 4) {
      this.playerIds.push(playerId);
      return playerId;
    }
    return null;
  };

  removePlayer = (playerId: string): boolean => {
    if (!this.hasStarted && this.playerIds.includes(playerId)) {
      this.playerIds = this.playerIds.filter((id) => id !== playerId);
      return true;
    }
    return false;
  };

  initPlayerScores = () => {
    for (const id in this.playerIds) {
      this.playerScores[id] = 0;
    }
  };

  resetPlayerScores = () => {
    this.playerScores = {};
  };

  addPoints = (playerId: string, score: number) => {
    this.playerScores[playerId] += score;
    if (this.playerScores[playerId] >= 24) this.hasEnded = true;
  };

  onStart = () => {
    this.initPlayerScores();
    this.hasStarted = true;
    this.gamePhase = GamePhases.DEALING;
  };

  start = (): void => {
    this.onStart();
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

// Zmagaš ko maš 66 pointov, samo ko ti pogledaš

/*
1 - zmaga + oponent 33+
2 - zmaga + <33 in 1 štih
3 - zmaga + nima nič
*/

/*
normalno
mali - 7
vlko - 9
vlki z adutom - 12
18 - 5 istih + as
24 -  5 adutov + as

*/

/*
dealing 


*/

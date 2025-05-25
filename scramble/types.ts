
export enum GameStatus {
  Idle,      // Before the first game or after a game, awaiting new game
  Playing,   // Game is in progress
  Won,       // Player guessed the word correctly
  Lost       // Player ran out of attempts
}


import React from 'react';
import { GameStatus } from '../types';
import { MAX_ATTEMPTS } from '../constants';


interface GameInfoDisplayProps {
  attemptsLeft: number;
  feedbackMessage: string;
  gameStatus: GameStatus;
}

const GameInfoDisplay: React.FC<GameInfoDisplayProps> = ({ attemptsLeft, feedbackMessage, gameStatus }) => {
  let messageColor = "text-slate-700";
  if (gameStatus === GameStatus.Won) {
    messageColor = "text-green-600";
  } else if (gameStatus === GameStatus.Lost || (feedbackMessage && feedbackMessage.toLowerCase().includes("incorrect")) || (feedbackMessage && feedbackMessage.toLowerCase().includes("must be"))) {
    messageColor = "text-red-600";
  }


  return (
    <div className="text-center my-4 h-12 flex flex-col justify-center">
      {gameStatus === GameStatus.Playing && (
        <p className="text-sm text-slate-500">
          Attempts left: <span className="font-bold text-indigo-600">{attemptsLeft} / {MAX_ATTEMPTS}</span>
        </p>
      )}
      {feedbackMessage && (
        <p className={`mt-1 text-md font-semibold ${messageColor}`}>
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};

export default GameInfoDisplay;

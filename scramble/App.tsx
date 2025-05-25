
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus } from './types';
import { WORD_LIST, MAX_ATTEMPTS, WORD_LENGTH } from './constants';
import ScrambledLettersDisplay from './components/ScrambledLettersDisplay';
import GuessInputForm from './components/GuessInputForm';
import GameInfoDisplay from './components/GameInfoDisplay';
import PastGuessesList from './components/PastGuessesList';

const App: React.FC = () => {
  const [solutionWord, setSolutionWord] = useState<string>('');
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const scrambleWord = (word: string): string[] => {
    if (word.length === 0) return [];
    const characters = word.split('');
    let shuffledCharacters;
    do {
      shuffledCharacters = [...characters].sort(() => Math.random() - 0.5);
    } while (shuffledCharacters.join('') === word && word.length > 1); // Avoid infinite loop for single letter words
    return shuffledCharacters;
  };

  const startGame = useCallback(() => {
    if (WORD_LIST.length === 0) {
      setFeedbackMessage("Error: Word list is empty. Cannot start game.");
      setGameStatus(GameStatus.Idle);
      return;
    }
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    const newWord = WORD_LIST[randomIndex].toUpperCase();
    
    setSolutionWord(newWord);
    setScrambledLetters(scrambleWord(newWord));
    setCurrentGuess('');
    setPastGuesses([]);
    setAttemptsLeft(MAX_ATTEMPTS);
    setGameStatus(GameStatus.Playing);
    setFeedbackMessage('');
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initialize game on mount

  const handleGuessChange = (value: string) => {
    if (gameStatus === GameStatus.Playing) {
      setCurrentGuess(value.substring(0, WORD_LENGTH)); // Ensure guess doesn't exceed word length
    }
  };

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gameStatus !== GameStatus.Playing || !currentGuess.trim()) return;

    const formattedGuess = currentGuess.toUpperCase();

    if (formattedGuess.length !== WORD_LENGTH) {
      setFeedbackMessage(`Guess must be ${WORD_LENGTH} letters long.`);
      return;
    }

    const sortedGuessLetters = formattedGuess.split('').sort().join('');
    const sortedSolutionLetters = solutionWord.split('').sort().join('');

    if (sortedGuessLetters !== sortedSolutionLetters) {
      setFeedbackMessage(`Your guess must use exactly these letters: ${scrambledLetters.join(', ')}.`);
      return;
    }

    setPastGuesses(prev => [...prev, formattedGuess]);

    if (formattedGuess === solutionWord) {
      setGameStatus(GameStatus.Won);
      setFeedbackMessage(`Congratulations! You guessed "${solutionWord}"!`);
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      if (newAttemptsLeft === 0) {
        setGameStatus(GameStatus.Lost);
        setFeedbackMessage(`Game Over! The word was "${solutionWord}".`);
      } else {
        setFeedbackMessage(`Incorrect. Try again!`);
      }
    }
    setCurrentGuess('');
    inputRef.current?.focus();
  };
  
  const isInputDisabled = gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost || gameStatus === GameStatus.Idle;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-slate-100 p-4 selection:bg-indigo-500 selection:text-white">
      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Word Scramble
          </h1>
        </header>

        {gameStatus !== GameStatus.Idle ? (
          <>
            <ScrambledLettersDisplay letters={scrambledLetters} />
            <GameInfoDisplay
              attemptsLeft={attemptsLeft}
              feedbackMessage={feedbackMessage}
              gameStatus={gameStatus}
            />
            <GuessInputForm
              guess={currentGuess}
              onGuessChange={handleGuessChange}
              onSubmit={handleGuessSubmit}
              disabled={isInputDisabled}
              inputRef={inputRef}
            />
            <PastGuessesList guesses={pastGuesses} />
          </>
        ) : (
           <GameInfoDisplay
              attemptsLeft={0}
              feedbackMessage={feedbackMessage || "Loading game..."}
              gameStatus={gameStatus}
            />
        )}
        
        <div className="mt-8 text-center">
          <button
            onClick={startGame}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors"
          >
            {gameStatus === GameStatus.Playing ? 'Restart Game' : 'New Game'}
          </button>
        </div>
      </main>
      <footer className="text-center mt-8 text-sm text-slate-400">
        <p>Unscramble the {WORD_LENGTH} letters. You have {MAX_ATTEMPTS} tries.</p>
      </footer>
    </div>
  );
};

export default App;

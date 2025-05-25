
import React from 'react';

interface GuessInputFormProps {
  guess: string;
  onGuessChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const GuessInputForm: React.FC<GuessInputFormProps> = ({ guess, onGuessChange, onSubmit, disabled, inputRef }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <label htmlFor="guessInput" className="sr-only">Enter your 6-letter guess</label>
      <input
        id="guessInput"
        ref={inputRef}
        type="text"
        value={guess}
        onChange={(e) => onGuessChange(e.target.value.toUpperCase())}
        maxLength={6} // WORD_LENGTH from constants, but hardcoding is fine here as it's specific to this component usage
        placeholder="Your 6-letter guess"
        disabled={disabled}
        className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow disabled:bg-slate-100 disabled:cursor-not-allowed"
        aria-label="Guess input"
      />
      <button
        type="submit"
        disabled={disabled}
        className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        Guess
      </button>
    </form>
  );
};

export default GuessInputForm;

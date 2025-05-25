
import React from 'react';

interface PastGuessesListProps {
  guesses: string[];
}

const PastGuessesList: React.FC<PastGuessesListProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full">
      <h3 className="text-lg font-semibold text-slate-700 mb-2 text-center">Your Guesses:</h3>
      <ul className="space-y-1 max-h-32 overflow-y-auto bg-slate-50 p-3 rounded-lg shadow-inner">
        {guesses.map((guess, index) => (
          <li
            key={index}
            className="text-slate-600 text-center text-sm bg-white p-1 rounded shadow-sm"
          >
            {guess}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastGuessesList;

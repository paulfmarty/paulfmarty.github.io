
import React from 'react';

interface ScrambledLettersDisplayProps {
  letters: string[];
}

const ScrambledLettersDisplay: React.FC<ScrambledLettersDisplayProps> = ({ letters }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-3 my-6" aria-label="Scrambled letters">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 text-white text-2xl sm:text-3xl font-bold rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default ScrambledLettersDisplay;

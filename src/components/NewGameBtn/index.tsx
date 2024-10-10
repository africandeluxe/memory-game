import React from 'react';

interface NewGameButtonProps {
  newRound: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ newRound }) => {
  return (
    <button onClick={newRound} className="bg-red-400 text-white py-3 px-6 mt-5 rounded-lg text-xl hover:bg-red-500 transition-all">Start New Game</button>
  );
};

export default NewGameButton;
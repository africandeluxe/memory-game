import React from 'react';

interface NewGameButtonProps {
  newRound: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ newRound, ...props }) => {
  return (
    <button onClick={newRound} {...props} className="bg-red-400 text-white py-3 px-6 mt-5 rounded-lg text-xl hover:bg-red-500 transition-all" data-testid="new-game-btn" >
      Start New Game
    </button>
  );
};

export default NewGameButton;
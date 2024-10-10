import React from 'react';

const Rules: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto mt-10">
      <h4 className="text-xl font-bold mb-4 text-center">Rules</h4>
      <p data-testid="rules-text" className="text-md text-gray-700 mb-4">Click a card to reveal an image. Then click another card to reveal that image. Your job is to remember the images and click two of the same cards. Good luck beating the highscore!</p>
      <p data-testid="good-luck" className="text-lg text-center text-green-500 font-semibold">Good Luck!</p>
    </div>
  );
};

export default Rules;
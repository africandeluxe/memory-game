import React, { useState } from 'react';

interface HighscoreProps {
  updateNewHighscore: () => void;
}

const Highscore: React.FC<HighscoreProps> = ({ updateNewHighscore }) => {
  const [name, setName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('name', name);
    updateNewHighscore();
  };

  return (
    <div data-testid="highscore-popup" className="bg-white p-6 rounded-md shadow-md max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">New Highscore!</h2>
      <input type="text" data-testid="input" value={name} onChange={handleInputChange} className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-all">Save</button>
    </div>
  );
};

export default Highscore;
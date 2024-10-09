import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-400 p-5 text-center shadow-md">
      <img src="/logo.png" alt="logo" className="mx-auto w-16 h-16 mb-2" role="img" aria-label="logo" />
      <h1 className="text-pink-500 text-4xl font-bold">Memorista</h1>
    </header>
  );
};

export default Header;
"use client";

import React from 'react';

interface CardProps {
  flipped: boolean;
  matched: boolean;
  imageSrc: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ flipped, matched, imageSrc, onClick }) => {
  console.log("Image Source:", imageSrc);
  return (
    <div className={`w-24 h-36 flex items-center justify-center rounded-lg shadow-md cursor-pointer transition-all ${flipped || matched ? 'bg-transparent' : 'bg-[#ADD8E6]'}`} 
        onClick={onClick} data-testid="card">
      {flipped || matched ? (
        <img src={imageSrc} alt="card image" data-testid="card-image" className="w-full h-full object-contain rounded-lg" />
      ) : (
        <span className="text-4xl font-bold">?</span>
      )}
    </div>
  );
};

export default Card;
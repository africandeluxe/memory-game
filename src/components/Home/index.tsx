"use client";

import React, { useState, useEffect } from 'react';
import NewGameButton from '../NewGameBtn';
import Card from '../Card';
import Highscore from '../Highscore';

const generateDeck = () => {
  const cards: string[] = [
    "/guitar.svg",
    "/cow.svg",
    "/pineapple.svg",
    "/car.svg",
    "/flower.svg",
    "/cabin.svg",
  ];
  return [...cards, ...cards];
};

interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Home: React.FC = () => {
  const initialCards: CardType[] = generateDeck().map((image, index) => ({
    id: index,
    image: image,
    isFlipped: false,
    isMatched: false,
  }));

  const [cards, setCards] = useState<CardType[]>(shuffleCards(initialCards));
  const [moves, setMoves] = useState<number>(0);
  const [highscore, setHighscore] = useState<number | null>(null);
  const [highscoreName, setHighscoreName] = useState<string>('N/A');
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isNewHighscore, setIsNewHighscore] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHighscore = localStorage.getItem('highscore');
      const storedName = localStorage.getItem('name');
      setHighscore(storedHighscore ? Number(storedHighscore) : Infinity);
      setHighscoreName(storedName ? storedName : 'N/A');
    }
  }, []);

  function shuffleCards(cards: CardType[]): CardType[] {
    return [...cards].sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards((prev) => [...prev, index]);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.image === secondCard.image) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleNewGame = () => {
    setCards(shuffleCards(initialCards));
    setMoves(0);
    setFlippedCards([]);
    setIsNewHighscore(false);
  };

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      if (moves < highscore!) {
        setHighscore(moves);
        setIsNewHighscore(true);
      }
    }
  }, [cards, moves, highscore]);

  const handleHighscoreSubmit = (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('highscore', moves.toString());
      localStorage.setItem('name', name);
    }
    setIsNewHighscore(false);
    setHighscoreName(name);
  };

  const handleResetHighscore = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('highscore');
      localStorage.removeItem('name');
    }
    setHighscore(Infinity);
    setHighscoreName('N/A');
  };
  
  return (
    <div className="text-center p-4 md:p-6">
      <h2 data-testid="moves" className="text-lg md:text-2xl font-semibold">Moves: {moves}</h2>
      <h3 data-testid="highscore" className="ext-md md:text-xl mt-2">Highscore: {highscore === Infinity ? 'N/A' : `${highscore} by ${highscoreName}`}</h3>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
         {cards.map((card, index) => (
           <Card key={card.id} flipped={card.isFlipped} matched={card.isMatched} imageSrc={card.image} onClick={() => handleCardClick(index)} />
         ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <NewGameButton newRound={handleNewGame} data-testid="new-game-btn" />
        <button onClick={handleResetHighscore} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
          Reset Highscore
        </button>
      </div>

      {isNewHighscore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Highscore updateNewHighscore={handleHighscoreSubmit} />
        </div>
      )}
    </div>
  );
};

export default Home;
"use client";

import React, { useState, useEffect } from 'react';
import NewGameButton from '../NewGameBtn';
import Card from '../Card';

// Function to generate a deck of cards
const generateDeck = () => {
  const cards: string[] = [
    "/guitar.svg",
    "/cow.svg",
    "/pineapple.svg",
    "/car.svg",
    "/flower.svg",
    "/cabin.svg",
  ];
  return [...cards, ...cards]; // Duplicate the cards to create pairs
};

// Define CardType interface
interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Home: React.FC = () => {
  // Generate initial cards using the imported SVG images
  const initialCards: CardType[] = generateDeck().map((image, index) => ({
    id: index,
    image: image,
    isFlipped: false,
    isMatched: false,
  }));

  // Set state for cards, moves, highscore, and flipped cards
  const [cards, setCards] = useState<CardType[]>(shuffleCards(initialCards));
  const [moves, setMoves] = useState<number>(0);
  const [highscore, setHighscore] = useState<number>(() => {
    const storedHighscore = localStorage.getItem('highscore');
    return storedHighscore ? Number(storedHighscore) : Infinity;
  });
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Function to shuffle cards
  function shuffleCards(cards: CardType[]): CardType[] {
    return [...cards].sort(() => Math.random() - 0.5);
  }

  // Handle card click
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

  // Effect to check for matching cards when two cards are flipped
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

  // Handle starting a new game
  const handleNewGame = () => {
    setCards(shuffleCards(initialCards));
    setMoves(0);
    setFlippedCards([]);
  };

  // Effect to update highscore when all cards are matched
  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      if (moves < highscore) {
        setHighscore(moves);
        localStorage.setItem('highscore', moves.toString());
      }
    }
  }, [cards, moves, highscore]);

  return (
    <div className="text-center p-6">
      <h2 data-testid="moves" className="text-2xl font-semibold">Moves: {moves}</h2>
      <h3 data-testid="highscore" className="text-xl mt-2">Highscore: {highscore === Infinity ? "N/A" : highscore}</h3>
      <div className="grid grid-cols-4 gap-5 mt-8">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            flipped={card.isFlipped}
            matched={card.isMatched}
            imageSrc={card.image}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <NewGameButton newRound={handleNewGame} data-testid="new-game-btn" />
    </div>
  );
};

export default Home;
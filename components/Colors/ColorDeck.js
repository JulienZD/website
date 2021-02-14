import React from 'react';
import ColorCard from './ColorCard';

export default function ColorDeck({ colors, doShuffle }) {
  if (colors.size < 2) return null;
  let cards = [];
  for (const primary of colors) {
    for (const secondary of colors) {
      if (primary === secondary) continue;
      cards.push(<ColorCard key={`${primary}-${secondary}`} primary={primary} secondary={secondary} />);
    }
  }
  if (doShuffle) cards = shuffle(cards);
  return <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 mt-3 rounded bg-dark p-2">{cards}</div>;
}

// Shuffle function by https://stackoverflow.com/a/12646864
function shuffle(array) {
  const shuffledArray = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

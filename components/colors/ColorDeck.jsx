import { useState } from 'react';
import LabeledCheckbox from '@components/form/LabeledCheckbox';

export default function ColorDeck({ cards, errorMsg }) {
  const [doShuffle, setDoShuffle] = useState(false);
  const cardDeck = doShuffle ? shuffle(cards) : cards;
  return (
    <>
      {cards.length > 0 && (
        <LabeledCheckbox
          id="shuffle"
          name="doShuffle"
          isChecked={doShuffle}
          onChange={(e) => setDoShuffle(e.target.checked)}
          label="Shuffle output"
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 rounded bg-gray-700 p-2">
        {cards.length ? cardDeck : <p className="bg-primary text-center col-span-full">{errorMsg}</p>}
      </div>
    </>
  );
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

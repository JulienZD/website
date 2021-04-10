import { ChangeEvent, useState } from 'react';
import LabeledCheckbox from '@components/form/LabeledCheckbox';
import shuffle from '@lib/shuffle';

interface Props {
  cards: JSX.Element[];
  errorMsg: string;
}

export default function ColorDeck({ cards, errorMsg }: Props): JSX.Element {
  const [doShuffle, setDoShuffle] = useState(false);
  const cardDeck = doShuffle ? shuffle(cards) : cards;
  return (
    <>
      {cards.length > 0 && (
        <LabeledCheckbox
          id="shuffle"
          name="doShuffle"
          isChecked={doShuffle}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setDoShuffle(e.target.checked)}
          label="Shuffle output"
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 rounded bg-gray-700 p-2">
        {cards.length ? cardDeck : <p className="bg-primary text-center col-span-full">{errorMsg}</p>}
      </div>
    </>
  );
}

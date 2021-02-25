import { useState } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';
import ColorCard from './ColorCard';
import ShareButton from '@components/ShareButton';

function getAllCombinations(set) {
  const array = Array.from(set);
  const result = array.flatMap((first, i) =>
    array.slice(i + 1).map((second) => {
      return { first, second };
    })
  );
  return result;
}

export default function ColorPreviewer({ initialColors }) {
  const [colors, setColors] = useState(initialColors.join('\n'));
  const [doShuffle, setDoShuffle] = useState(false);

  const getShareUrl = () => {
    if (!colors.length) return;
    const hexColors = getHexColors().join(',');
    if (!hexColors.length) return;
    const encoded = btoa(hexColors.replace(/#/g, ''));

    return `${location.pathname}?share=${encodeURIComponent(encoded)}`;
  };

  const getHexColors = () => {
    return colors
      .trim()
      .split('\n')
      .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));
  };

  function generateCards() {
    const colorCombinations = getAllCombinations(new Set(getHexColors()));
    return [
      ...colorCombinations.map(({ first, second }) => (
        <ColorCard key={`${first}${second}`} primary={first} secondary={second} />
      )),
      ...colorCombinations.map(({ first, second }) => (
        <ColorCard key={`${second}${first}`} primary={second} secondary={first} />
      )),
    ];
  }

  return (
    <>
      <ColorForm colors={colors} doShuffle={doShuffle} onColorChange={setColors} onDoShuffleChange={setDoShuffle} />
      {getHexColors().length >= 2 && (
        <div className="flex justify-end">
          <ShareButton getUrl={getShareUrl} />
        </div>
      )}
      <ColorDeck doShuffle={doShuffle} cards={generateCards()} />
    </>
  );
}

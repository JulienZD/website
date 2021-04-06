import { useState, useEffect, useMemo } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';
import ColorCard from './ColorCard';
import ShareButton from '@components/ShareButton';
import uniqueArray from '@lib/uniqueArray';
import { allCombinationsFromSet } from '@lib/allCombinations';

function generateCards(hexColors) {
  const colorCombinations = allCombinationsFromSet(hexColors);
  return [
    ...colorCombinations.map(({ first, second }) => (
      <ColorCard key={`${first}${second}`} primary={first} secondary={second} />
    )),
    ...colorCombinations.map(({ first, second }) => (
      <ColorCard key={`${second}${first}`} primary={second} secondary={first} />
    )),
  ];
}

export default function ColorPreviewer({ initialColors }) {
  const [colorInput, setColors] = useState(uniqueArray(initialColors).join('\n'));

  const hexColors = colorInput
    .trim()
    .split('\n')
    .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));
  // .slice(0, 10);
  const urlColors = () => hexColors.map((c) => c.replace('#', '')).join('-');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.replaceState(window.history.state, '', `/colors/${urlColors()}`);
  }, [hexColors]);

  const cardList = useMemo(() => generateCards(hexColors), [hexColors]);

  return (
    <>
      <ColorForm colors={colorInput} onColorChange={setColors} />
      {hexColors.length >= 2 && (
        <div className="flex justify-end">
          <ShareButton getUrl={() => location.pathname} />
        </div>
      )}
      <ColorDeck cards={cardList} />
    </>
  );
}

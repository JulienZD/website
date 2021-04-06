import { useState, useEffect, useMemo } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';
import ColorCard from './ColorCard';
import ShareButton from '@components/ShareButton';
import uniqueArray from '@lib/uniqueArray';
import { allColorCombinations } from '@lib/allCombinations';

function generateCards(hexColors) {
  const colorCombinations = allColorCombinations(hexColors);
  return colorCombinations
    .filter(({ contrast }) => contrast >= 4.5)
    .map(({ primary, secondary, contrast }) => (
      <ColorCard key={`${primary}${secondary}`} primary={primary} secondary={secondary} contrast={contrast} />
    ));
}

export default function ColorPreviewer({ initialColors }) {
  const [colorInput, setColors] = useState(uniqueArray(initialColors).join('\n'));

  const hexColors = colorInput
    .trim()
    .split('\n')
    .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));

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

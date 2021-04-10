import { useState, useEffect, useMemo } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';
import ColorCard from './ColorCard';
import ShareButton from '@components/ShareButton';
import uniqueArray from '@lib/uniqueArray';
import { allColorCombinations } from '@lib/allCombinations';

function generateCards(hexColors: string[]): JSX.Element[] {
  const colorCombinations = allColorCombinations(hexColors);
  return colorCombinations
    .filter(({ contrast }) => contrast >= 4.5)
    .map(({ primary, secondary, contrast }) => (
      <ColorCard key={`${primary}${secondary}`} primary={primary} secondary={secondary} contrast={contrast} />
    ));
}

interface Props {
  initialColors: string[];
}

export default function ColorPreviewer({ initialColors }: Props): JSX.Element {
  const [colorInput, setColors] = useState(uniqueArray(initialColors).join('\n'));

  const hexColors = colorInput
    .trim()
    .split('\n')
    .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));

  const urlColors = (): string => hexColors.map((c) => c.replace('#', '')).join('-');

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
          <ShareButton />
        </div>
      )}
      <ColorDeck
        cards={cardList}
        errorMsg={
          hexColors.length < 2
            ? 'Enter two or more colors'
            : 'There is not enough contrast between the colors you provided'
        }
      />
    </>
  );
}

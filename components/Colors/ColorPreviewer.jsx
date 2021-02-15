import { useState } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';

export default function ColorPreviewer({ initialColors }) {
  const [colors, setColors] = useState(initialColors.join('\n'));
  const [doShuffle, setDoShuffle] = useState(false);

  const getHexColorSet = (input) =>
    new Set(
      input
        .trim()
        .split('\n')
        .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/))
    );

  return (
    <div className="container">
      <div className="row">
        <ColorForm colors={colors} doShuffle={doShuffle} onColorChange={setColors} onDoShuffleChange={setDoShuffle} />
      </div>
      <ColorDeck doShuffle={doShuffle} colors={getHexColorSet(colors)}></ColorDeck>
    </div>
  );
}

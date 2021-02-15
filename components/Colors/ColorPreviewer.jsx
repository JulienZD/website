import { useState } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';
import ShareButton from '@components/ShareButton';

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

  return (
    <div className="container">
      <div className="row">
        <ColorForm colors={colors} doShuffle={doShuffle} onColorChange={setColors} onDoShuffleChange={setDoShuffle} />
        {getHexColors().length >= 2 && (
          <div className="col-12 d-flex justify-content-end">
            <ShareButton getUrl={getShareUrl} />
          </div>
        )}
      </div>
      <ColorDeck doShuffle={doShuffle} colors={new Set(getHexColors())}></ColorDeck>
    </div>
  );
}

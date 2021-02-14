import { useState } from 'react';
import ColorForm from './ColorForm';
import ColorDeck from './ColorDeck';

function foo(input, currentSet) {
  const colors = input
    .trim()
    .split('\n')
    .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));
  const newSet = new Set(colors);
  // Prevent epilepsy
  if (areSetsEqual(newSet, currentSet) || newSet.size === input.length) return;
  return newSet;
}

export default function ColorPreviewer({ initialColors }) {
  const [doShuffle, shouldShuffle] = useState(false);
  const [colorSet, setColorSet] = useState(new Set(initialColors));

  const updateState = ({ colors, doShuffle }) => {
    shouldShuffle(doShuffle);
    setColorSet((current) => {
      const newSet = foo(colors, current);
      if (newSet) return newSet;
      return current;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <ColorForm onChangeCallback={updateState} defaultColors={Array.from(colorSet)} />
      </div>
      <ColorDeck doShuffle={doShuffle} colors={colorSet}></ColorDeck>
    </div>
  );
}

function areSetsEqual(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (const a of setA) if (!setB.has(a)) return false;
  return true;
}

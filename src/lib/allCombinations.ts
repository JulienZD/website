import uniqueArray from './uniqueArray';
import calcContrast from './calcContrast';
import { ColorCombination } from 'types';

function allColorCombinations(array: string[]): ColorCombination[] {
  const combinations = allCombinations(uniqueArray(array));
  return [
    ...combinations.map(({ first, second }) => ({
      primary: first,
      secondary: second,
      contrast: calcContrast(first, second),
    })),
    ...combinations.map(({ first, second }) => ({
      primary: second,
      secondary: first,
      contrast: calcContrast(second, first),
    })),
  ];
}

function allCombinations<Type>(array: Type[]): { first: Type; second: Type }[] {
  return array.flatMap((first, i) =>
    array.slice(i + 1).map((second) => {
      return { first, second };
    })
  );
}

export { allColorCombinations, allCombinations };

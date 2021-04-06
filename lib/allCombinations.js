import uniqueArray from './uniqueArray';
import calcContrast from '@lib/calcContrast';

function allColorCombinations(set) {
  const combinations = allCombinations(uniqueArray(set));
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

function allCombinations(array) {
  return array.flatMap((first, i) =>
    array.slice(i + 1).map((second) => {
      return { first, second };
    })
  );
}

export { allColorCombinations, allCombinations };

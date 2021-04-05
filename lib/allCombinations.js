import uniqueArray from './uniqueArray';

function allCombinationsFromSet(set) {
  return allCombinations(uniqueArray(set));
}

function allCombinations(array) {
  return array.flatMap((first, i) =>
    array.slice(i + 1).map((second) => {
      return { first, second };
    })
  );
}

export { allCombinationsFromSet, allCombinations };

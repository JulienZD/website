export default function uniqueArray<Type>(array: Type[]) {
  return [...new Set(array)];
}

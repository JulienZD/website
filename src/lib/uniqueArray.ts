export default function uniqueArray<Type>(array: Type[]): Type[] {
  return [...new Set(array)];
}

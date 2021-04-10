import colorContrast from 'color-contrast';

export default function calcContrast(primary: string, secondary: string): number {
  const contrast: number = colorContrast(primary, secondary);
  return Number(contrast % 1 === 0 ? contrast.toFixed(0) : contrast.toFixed(2));
}

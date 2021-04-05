import colorContrast from 'color-contrast';

export default function calcContrast(primary, secondary) {
  const contrast = colorContrast(primary, secondary);
  return contrast % 1 === 0 ? contrast.toFixed(0) : contrast.toFixed(2);
}

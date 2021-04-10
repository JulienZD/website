declare module 'color-contrast' {
  function colorContrast(primary: string, secondary: string): number;
  export = colorContrast;
}

export interface ColorCombination {
  primary: string;
  secondary: string;
  contrast: number;
}

export interface ColorCombination {
  primary: string;
  secondary: string;
  contrast: number;
}

export interface StoryMeta {
  title: string;
  description: string;
  image: string;
  slug: string;
  onHomepage: boolean;
  linkText?: string;
}

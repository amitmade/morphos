import { generateScale, RatioName } from './math/scales';
import { generatePalette, Palette } from './color/palette';

export interface ThemeOptions {
  seed: number; // Used for hue
  baseFontSize?: number;
  baseSpacing?: number;
  typographyRatio?: RatioName | number;
  spacingRatio?: RatioName | number;
}

export interface Theme {
  palette: Palette;
  typography: number[];
  spacing: number[];
}

/**
 * The main entry point for the Morphos Design Engine.
 * Generates a full design system based on a set of options.
 */
export function generateTheme(options: ThemeOptions): Theme {
  const {
    seed,
    baseFontSize = 16,
    baseSpacing = 8,
    typographyRatio = 'PERFECT_FOURTH',
    spacingRatio = 'MAJOR_SECOND',
  } = options;

  // Ensure seed is a valid hue (0-360)
  const hue = Math.abs(seed % 360);

  return {
    palette: generatePalette(hue),
    typography: generateScale({
      base: baseFontSize,
      ratio: typographyRatio,
      steps: 10,
    }),
    spacing: generateScale({
      base: baseSpacing,
      ratio: spacingRatio,
      steps: 12,
    }),
  };
}

export * from './math/scales';
export * from './color/palette';

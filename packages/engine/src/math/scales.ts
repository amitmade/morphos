/**
 * Predefined mathematical ratios for design scales.
 */
export const RATIOS = {
  MINOR_SECOND: 1.067,
  MAJOR_SECOND: 1.125,
  MINOR_THIRD: 1.2,
  MAJOR_THIRD: 1.25,
  PERFECT_FOURTH: 1.333,
  AUGMENTED_FOURTH: 1.414,
  PERFECT_FIFTH: 1.5,
  GOLDEN_RATIO: 1.618,
} as const;

export type RatioName = keyof typeof RATIOS;

export interface ScaleOptions {
  base: number;
  ratio: number | RatioName;
  steps?: number;
}

/**
 * Generates a mathematical scale based on a base value and a ratio.
 * Used for typography and spacing.
 */
export function generateScale(options: ScaleOptions): number[] {
  const { base, ratio, steps = 8 } = options;
  const numericRatio = typeof ratio === 'string' ? RATIOS[ratio] : ratio;
  
  const scale: number[] = [];
  
  // Generate steps below base (negative index)
  for (let i = -2; i < 0; i++) {
    scale.push(base * Math.pow(numericRatio, i));
  }
  
  // Add base and steps above
  for (let i = 0; i < steps; i++) {
    scale.push(base * Math.pow(numericRatio, i));
  }
  
  return scale.sort((a, b) => a - b);
}

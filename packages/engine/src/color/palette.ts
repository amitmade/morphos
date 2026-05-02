import { oklch, formatCss, formatHex, wcagContrast } from 'culori';

export interface ColorResult {
  hex: string;
  oklch: string;
  contrastRatio: number; // Against background
}

export interface Palette {
  background: ColorResult;
  foreground: ColorResult;
  primary: ColorResult;
  secondary: ColorResult;
  accent: ColorResult;
}

/**
 * Generates a full accessible palette based on a hue seed.
 */
export function generatePalette(hue: number): Palette {
  // Use OKLCH for better perceptual uniformity
  
  // Background: Very dark or very light
  const bgL = 0.05; // Dark mode by default for Morphos (Senior/Technical vibe)
  const bgC = 0.02;
  const background = {
    l: bgL,
    c: bgC,
    h: hue,
    mode: 'oklch' as const
  };

  // Primary: Bright and vibrant
  const primary = {
    l: 0.7,
    c: 0.15,
    h: hue,
    mode: 'oklch' as const
  };

  // Secondary: Shifted hue
  const secondary = {
    l: 0.65,
    c: 0.12,
    h: (hue + 120) % 360,
    mode: 'oklch' as const
  };

  // Accent: High contrast
  const accent = {
    l: 0.8,
    c: 0.2,
    h: (hue + 240) % 360,
    mode: 'oklch' as const
  };

  // Foreground: Very light for dark mode
  const foreground = {
    l: 0.95,
    c: 0.01,
    h: hue,
    mode: 'oklch' as const
  };

  const bgHex = formatHex(background)!;

  return {
    background: createColorResult(background, bgHex),
    foreground: createColorResult(foreground, bgHex),
    primary: createColorResult(primary, bgHex),
    secondary: createColorResult(secondary, bgHex),
    accent: createColorResult(accent, bgHex),
  };
}

function createColorResult(color: any, bgHex: string): ColorResult {
  const hex = formatHex(color)!;
  return {
    hex,
    oklch: formatCss(color)!,
    contrastRatio: wcagContrast(hex, bgHex),
  };
}

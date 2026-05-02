import { describe, it, expect } from 'vitest';
import { generatePalette } from './palette';

describe('generatePalette', () => {
  it('should generate a palette with sufficient contrast for accessibility (WCAG AA)', () => {
    const palette = generatePalette(200); // Blueish hue
    
    // WCAG AA requires at least 4.5:1 for normal text
    expect(palette.primary.contrastRatio).toBeGreaterThanOrEqual(4.5);
    expect(palette.foreground.contrastRatio).toBeGreaterThanOrEqual(4.5);
    expect(palette.accent.contrastRatio).toBeGreaterThanOrEqual(4.5);
  });

  it('should generate consistent hex and oklch values', () => {
    const palette = generatePalette(0); // Red hue
    expect(palette.background.hex).toMatch(/^#[0-9a-f]{6}$/i);
    expect(palette.background.oklch).toContain('oklch');
  });
});

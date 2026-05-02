import { describe, it, expect } from 'vitest';
import { generateScale, RATIOS } from './scales';

describe('generateScale', () => {
  it('should generate a correct scale based on the Golden Ratio', () => {
    const base = 16;
    const ratio = RATIOS.GOLDEN_RATIO;
    const scale = generateScale({ base, ratio, steps: 3 });
    
    // Scale indices: -2, -1, 0, 1, 2
    // 16 / 1.618^2, 16 / 1.618, 16, 16 * 1.618, 16 * 1.618^2
    expect(scale[2]).toBe(16); // Base step
    expect(scale[3]).toBeCloseTo(16 * 1.618, 2);
    expect(scale[1]).toBeCloseTo(16 / 1.618, 2);
  });

  it('should accept ratio names as strings', () => {
    const scale = generateScale({ base: 16, ratio: 'MAJOR_THIRD' });
    expect(scale[3]).toBeCloseTo(16 * 1.25, 2);
  });
});

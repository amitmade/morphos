import { describe, it, expect } from 'vitest';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import morphosPlugin from './index';

describe('Morphos Tailwind Plugin Integration', () => {
  it('should inject CSS variables and extend theme colors', async () => {
    const config = {
      content: [{ raw: '<div class="text-brand-primary bg-brand-background"></div>', extension: 'html' }],
      plugins: [
        morphosPlugin({
          seed: 200, // Blueish hue
        }),
      ],
    };

    const inputCss = '@tailwind base; @tailwind components; @tailwind utilities;';
    const result = await postcss([tailwindcss(config)]).process(inputCss, { from: undefined });

    // 1. Verify CSS Variables exist in :root
    expect(result.css).toContain('--morphos-bg');
    expect(result.css).toContain('--morphos-primary');
    
    // 2. Verify Utility classes were generated using our variables
    // Tailwind converts text-brand-primary to use var(--morphos-primary)
    expect(result.css).toContain('color: var(--morphos-primary)');
    expect(result.css).toContain('background-color: var(--morphos-bg)');
  });
});

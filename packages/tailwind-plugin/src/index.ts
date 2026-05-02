import plugin from 'tailwindcss/plugin.js';
import { generateTheme, ThemeOptions } from '@morphos/engine';

/**
 * Morphos Tailwind Plugin
 * 
 * Injects generative design tokens into Tailwind CSS.
 */
const morphosPlugin = plugin.withOptions(
  (options: ThemeOptions) => {
    return ({ addBase, theme }) => {
      const morphosTheme = generateTheme(options);
      const { palette, typography, spacing } = morphosTheme;

      // 1. Inject CSS Variables into :root
      const cssVariables: Record<string, string> = {
        '--morphos-bg': palette.background.hex,
        '--morphos-fg': palette.foreground.hex,
        '--morphos-primary': palette.primary.hex,
        '--morphos-secondary': palette.secondary.hex,
        '--morphos-accent': palette.accent.hex,
      };

      // Add typography variables
      typography.forEach((size, i) => {
        cssVariables[`--morphos-text-${i}`] = `${size}px`;
      });

      // Add spacing variables
      spacing.forEach((space, i) => {
        cssVariables[`--morphos-space-${i}`] = `${space}px`;
      });

      addBase({
        ':root': cssVariables,
      });
    };
  },
  (options: ThemeOptions) => {
    // Generate theme once for config extension
    const morphosTheme = generateTheme(options);
    const { palette } = morphosTheme;

    return {
      theme: {
        extend: {
          colors: {
            brand: {
              background: 'var(--morphos-bg)',
              foreground: 'var(--morphos-fg)',
              primary: 'var(--morphos-primary)',
              secondary: 'var(--morphos-secondary)',
              accent: 'var(--morphos-accent)',
            },
          },
          // We can also extend fontSize and spacing here mapping to the variables
        },
      },
    };
  }
);

export default morphosPlugin;

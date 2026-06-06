import type { Config } from 'tailwindcss';
// Re-export the published preset so internal apps share one token source of truth.
// Resolves to @structyl/styled's built dist (turbo orders `^build` before consumers).
import preset from '@structyl/styled/tailwind-preset';

/**
 * The canonical structyl Tailwind preset — token-driven colors, typography, and plugins.
 * Spread into a consumer's `presets: [...]`.
 */
export default preset satisfies Partial<Config>;

/** Standard content globs for structyl workspace apps. */
export const structylContent = ['./src/**/*.{ts,tsx}'];

/**
 * @aura-ui/themes
 *
 * Runtime theming system: ThemeProvider, useTheme, ThemeScript, built-in themes.
 */

export { ThemeProvider } from './theme-provider';
export { useTheme } from './use-theme';
export { ThemeScript } from './theme-script';
export type { Theme, ThemeMode, ThemeConfig, ThemeTokens } from './types';
export type { PaletteColor, AlertPaletteColor, AuraScale, StaticPalette } from './palette.types';
export { defaultThemes } from './themes';
export { staticPalette, generalColors, sharedSemanticLight, sharedSemanticDark } from './palette';
export {
  COLOR_PRESETS,
  createColorPreset,
  applyColorPreset,
  clearColorPreset,
} from './color-presets';
export type { ColorPreset, ColorPresetId } from './color-presets';
export { useColorPreset } from './use-color-preset';
export type { UseColorPresetOptions, UseColorPresetReturn } from './use-color-preset';

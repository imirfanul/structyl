import type { ThemeTokens } from './types';
import type { StaticPalette } from './palette.types';

// ── Shared semantic sub-tokens ────────────────────────────────────────────────
// error/warning/info/success are semantic colors that don't change between
// UI themes (slate/zinc/rose/aura). Only light/dark mode changes their values.

export const sharedSemanticLight: Partial<ThemeTokens> = {
  // Error
  'error-light': '249 218 223',
  'error-dark': '131 24 63',
  'error-contrast': '255 255 255',
  'error-dark-bg': '167 56 95',
  'error-state-contained': 'rgba(167, 56, 95, 0.9)',
  'error-state-outlined': 'rgba(221, 60, 113, 0.1)',
  'error-state-resting': 'rgba(221, 60, 113, 0.5)',
  'error-alert-bg': 'rgba(60, 47, 58, 0.9)',
  'error-alert-content': 'rgba(114, 52, 76, 1)',
  'error-shade-12': 'rgba(221, 60, 113, 0.12)',
  'error-shade-16': 'rgba(221, 60, 113, 0.16)',
  // Warning
  'warning-light': '249 220 210',
  'warning-dark': '122 45 16',
  'warning-contrast': '255 255 255',
  'warning-dark-bg': '191 75 30',
  'warning-state-contained': 'rgba(191, 75, 30, 0.9)',
  'warning-state-outlined': 'rgba(255, 87, 20, 0.1)',
  'warning-state-resting': 'rgba(255, 87, 20, 0.5)',
  'warning-alert-bg': 'rgba(85, 54, 46, 0.9)',
  'warning-alert-content': 'rgba(127, 62, 39, 1)',
  'warning-shade-12': 'rgba(255, 87, 20, 0.12)',
  'warning-shade-16': 'rgba(255, 87, 20, 0.16)',
  // Info
  'info-light': '227 223 252',
  'info-dark': '47 32 159',
  'info-contrast': '255 255 255',
  'info-dark-bg': '95 88 179',
  'info-state-contained': 'rgba(95, 88, 179, 0.9)',
  'info-state-outlined': 'rgba(117, 106, 234, 0.1)',
  'info-state-resting': 'rgba(117, 106, 234, 0.5)',
  'info-alert-bg': 'rgba(49, 52, 70, 0.9)',
  'info-alert-content': 'rgba(72, 70, 125, 1)',
  'info-shade-12': 'rgba(117, 106, 234, 0.12)',
  'info-shade-16': 'rgba(117, 106, 234, 0.16)',
  // Success
  'success-light': '153 252 128',
  'success-dark': '33 82 25',
  'success-contrast': '255 255 255',
  'success-dark-bg': '33 82 25',
  'success-state-contained': 'rgba(56, 159, 63, 0.9)',
  'success-state-outlined': 'rgba(62, 208, 68, 0.1)',
  'success-state-resting': 'rgba(62, 208, 68, 0.5)',
  'success-alert-bg': 'rgba(44, 62, 54, 0.9)',
  'success-alert-content': 'rgba(50, 111, 58, 1)',
  'success-shade-12': 'rgba(62, 208, 68, 0.12)',
  'success-shade-16': 'rgba(62, 208, 68, 0.16)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  'rating-active': '251 191 36',
};

export const sharedSemanticDark: Partial<ThemeTokens> = {
  // Error
  'error-light': '166 44 85',
  'error-dark': '249 218 223',
  'error-contrast': '143 0 63',
  'error-dark-bg': '167 56 95',
  'error-state-contained': 'rgba(184, 140, 151, 0.9)',
  'error-state-outlined': 'rgba(221, 60, 113, 0.05)',
  'error-state-resting': 'rgba(221, 60, 113, 0.5)',
  'error-alert-bg': 'rgba(253, 240, 243, 1)',
  'error-alert-content': 'rgba(251, 225, 230, 1)',
  'error-shade-12': 'rgba(221, 60, 113, 0.12)',
  'error-shade-16': 'rgba(221, 60, 113, 0.16)',
  // Warning
  'warning-light': '159 61 25',
  'warning-dark': '249 220 210',
  'warning-contrast': '132 38 0',
  'warning-dark-bg': '191 75 30',
  'warning-state-contained': 'rgba(184, 143, 128, 0.9)',
  'warning-state-outlined': 'rgba(244, 184, 161, 0.2)',
  'warning-state-resting': 'rgba(244, 184, 161, 0.6)',
  'warning-alert-bg': 'rgba(253, 241, 236, 1)',
  'warning-alert-content': 'rgba(251, 227, 217, 1)',
  'warning-shade-12': 'rgba(255, 87, 20, 0.12)',
  'warning-shade-16': 'rgba(255, 87, 20, 0.16)',
  // Info
  'info-light': '85 74 195',
  'info-dark': '226 223 252',
  'info-contrast': '63 47 177',
  'info-dark-bg': '95 88 179',
  'info-state-contained': 'rgba(150, 148, 191, 1)',
  'info-state-outlined': 'rgba(196, 192, 250, 0.2)',
  'info-state-resting': 'rgba(196, 192, 250, 0.6)',
  'info-alert-bg': 'rgba(243, 242, 254, 1)',
  'info-alert-content': 'rgba(231, 230, 253, 1)',
  'info-shade-12': 'rgba(117, 106, 234, 0.12)',
  'info-shade-16': 'rgba(117, 106, 234, 0.16)',
  // Success
  'success-light': '46 108 36',
  'success-dark': '153 252 128',
  'success-contrast': '0 83 12',
  'success-dark-bg': '46 108 36',
  'success-state-contained': 'rgba(100, 170, 88, 0.9)',
  'success-state-outlined': 'rgba(125, 223, 103, 0.2)',
  'success-state-resting': 'rgba(125, 223, 103, 0.6)',
  'success-alert-bg': 'rgba(229, 249, 225, 1)',
  'success-alert-content': 'rgba(203, 242, 194, 1)',
  'success-shade-12': 'rgba(62, 208, 68, 0.12)',
  'success-shade-16': 'rgba(62, 208, 68, 0.16)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  'rating-active': '251 191 36',
};

// ── Aura theme token values ───────────────────────────────────────────────────
// Light mode values derived from MUI colorsLight palette

export const auraSubTokensLight: Partial<ThemeTokens> = {
  // Primary (#5754A3)
  'primary-light': '195 192 250',
  'primary-dark': '27 20 100',
  'primary-contrast': '255 255 255',
  'primary-dark-bg': '32 28 86',
  'primary-state-contained': 'rgba(42, 46, 52, 0.3)',
  'primary-state-outlined': 'rgba(87, 84, 163, 0.1)',
  'primary-state-resting': 'rgba(87, 84, 163, 0.5)',
  'primary-shade-12': 'rgba(27, 20, 100, 0.12)',
  'primary-shade-16': 'rgba(27, 20, 100, 0.16)',
  // Secondary (#2578FF)
  'secondary-light': '219 226 252',
  'secondary-dark': '25 65 149',
  'secondary-contrast': '255 255 255',
  'secondary-dark-bg': '39 98 194',
  'secondary-state-contained': 'rgba(42, 46, 52, 0.3)',
  'secondary-state-outlined': 'rgba(37, 120, 255, 0.1)',
  'secondary-state-resting': 'rgba(37, 120, 255, 0.5)',
  'secondary-shade-12': 'rgba(37, 120, 255, 0.12)',
  'secondary-shade-16': 'rgba(37, 120, 255, 0.16)',
  // Text
  text: '42 46 52',
  'text-secondary': 'rgba(42, 46, 52, 0.6)',
  'text-disabled': 'rgba(42, 46, 52, 0.38)',
  'text-info': '117 106 234',
  'text-fill': '27 20 100',
  'text-shade-12': 'rgba(42, 46, 52, 0.12)',
  'text-shade-16': 'rgba(42, 46, 52, 0.16)',
  // Surface
  surface: '250 250 250',
  'surface-paper': '255 255 255',
  // Divider / borders
  divider: 'rgba(42, 46, 52, 0.23)',
  'outlined-border': 'rgba(42, 46, 52, 0.12)',
  'input-line': 'rgba(42, 46, 52, 0.42)',
  // Action
  'action-active': 'rgba(42, 46, 52, 0.54)',
  'action-hover': 'rgba(37, 120, 255, 0.05)',
  'action-selected': 'rgba(42, 46, 52, 0.08)',
  'action-disabled': 'rgba(42, 46, 52, 0.26)',
  'action-disabled-bg': 'rgba(42, 46, 52, 0.12)',
  'action-focus': 'rgba(42, 46, 52, 0.12)',
  // Misc
  'snackbar-bg': '42 46 52',
  'map-grid': '255 255 255',
  // Table
  'table-top-header': '238 245 255',
  'table-header': '238 239 239',
  'table-row': '255 255 255',
  'table-col-border': '250 250 250',
  'table-border': 'rgba(229, 229, 230, 1)',
  ...sharedSemanticLight,
};

// Dark mode values derived from MUI colorsDark palette

export const auraSubTokensDark: Partial<ThemeTokens> = {
  // Primary (#C3C0FA in dark)
  'primary-light': '75 72 150',
  'primary-dark': '219 226 252',
  'primary-contrast': '27 20 100',
  'primary-dark-bg': '32 28 86',
  'primary-state-contained': 'rgba(42, 46, 52, 0.3)',
  'primary-state-outlined': 'rgba(195, 192, 250, 0.2)',
  'primary-state-resting': 'rgba(195, 192, 250, 0.6)',
  'primary-shade-12': 'rgba(27, 20, 100, 0.12)',
  'primary-shade-16': 'rgba(27, 20, 100, 0.16)',
  // Secondary (#B4C5FA in dark)
  'secondary-light': '36 87 195',
  'secondary-dark': '219 226 252',
  'secondary-contrast': '0 45 110',
  'secondary-dark-bg': '39 98 194',
  'secondary-state-contained': 'rgba(42, 46, 52, 0.3)',
  'secondary-state-outlined': 'rgba(180, 197, 250, 0.2)',
  'secondary-state-resting': 'rgba(180, 197, 250, 0.6)',
  'secondary-shade-12': 'rgba(37, 120, 255, 0.12)',
  'secondary-shade-16': 'rgba(37, 120, 255, 0.16)',
  // Text
  text: '255 255 255',
  'text-secondary': 'rgba(255, 255, 255, 0.7)',
  'text-disabled': 'rgba(255, 255, 255, 0.5)',
  'text-info': '117 106 234',
  'text-fill': '255 255 255',
  'text-shade-12': 'rgba(42, 46, 52, 0.12)',
  'text-shade-16': 'rgba(42, 46, 52, 0.16)',
  // Surface
  surface: '42 46 52',
  'surface-paper': '46 50 56',
  // Divider / borders
  divider: 'rgba(255, 255, 255, 0.23)',
  'outlined-border': 'rgba(255, 255, 255, 0.12)',
  'input-line': 'rgba(255, 255, 255, 0.42)',
  // Action
  'action-active': 'rgba(255, 255, 255, 0.54)',
  'action-hover': 'rgba(180, 197, 250, 0.05)',
  'action-selected': 'rgba(255, 255, 255, 0.08)',
  'action-disabled': 'rgba(255, 255, 255, 0.26)',
  'action-disabled-bg': 'rgba(255, 255, 255, 0.12)',
  'action-focus': 'rgba(255, 255, 255, 0.12)',
  // Misc
  'snackbar-bg': '255 255 255',
  'map-grid': '37 120 255',
  // Table
  'table-top-header': '50 52 65',
  'table-header': '57 60 66',
  'table-row': '46 50 56',
  'table-col-border': '42 46 52',
  'table-border': 'rgba(81, 81, 81, 1)',
  ...sharedSemanticDark,
};

// ── Static material palette scales ────────────────────────────────────────────
// These are baked into the Tailwind preset directly (not CSS variables).

export const staticPalette: StaticPalette = {
  yellow: { '50': '#fffde7', '100': '#fff9c4', '200': '#fff59d', '300': '#fff176', '400': '#ffee58', '500': '#ffeb3b', '600': '#fdd835', '700': '#fbc02d', '800': '#f9a825', '900': '#f57f17', A100: '#ffff8d', A200: '#ffff00', A400: '#ffea00', A700: '#ffd600' },
  amber: { '50': '#fff8e1', '100': '#ffecb3', '200': '#ffe082', '300': '#ffd54f', '400': '#ffca28', '500': '#ffc107', '600': '#ffb300', '700': '#ffa000', '800': '#ff8f00', '900': '#ff6f00', A100: '#ffe57f', A200: '#ffd740', A400: '#ffc400', A700: '#ffab00' },
  blue: { '50': '#e3f2fd', '100': '#bbdefb', '200': '#90caf9', '300': '#64b5f6', '400': '#42a5f5', '500': '#2196f3', '600': '#1e88e5', '700': '#1976d2', '800': '#1565c0', '900': '#0d47a1', A100: '#82b1ff', A200: '#448aff', A400: '#2979ff', A700: '#2962ff' },
  blueGrey: { '50': '#eceff1', '100': '#cfd8dc', '200': '#b0bec5', '300': '#90a4ae', '400': '#78909c', '500': '#607d8b', '600': '#546e7a', '700': '#455a64', '800': '#37474f', '900': '#263238', A100: '#cfd8dc', A200: '#b0bec5', A400: '#78909c', A700: '#455a64' },
  brown: { '50': '#efebe9', '100': '#d7ccc8', '200': '#bcaaa4', '300': '#a1887f', '400': '#8d6e63', '500': '#795548', '600': '#6d4c41', '700': '#5d4037', '800': '#4e342e', '900': '#3e2723', A100: '#d7ccc8', A200: '#bcaaa4', A400: '#8d6e63', A700: '#5d4037' },
  teal: { '50': '#e0f2f1', '100': '#b2dfdb', '200': '#80cbc4', '300': '#4db6ac', '400': '#26a69a', '500': '#009688', '600': '#00897b', '700': '#00796b', '800': '#00695c', '900': '#004d40', A100: '#a7ffeb', A200: '#64ffda', A400: '#1de9b6', A700: '#00bfa5' },
  red: { '50': '#ffebee', '100': '#ffcdd2', '200': '#ef9a9a', '300': '#e57373', '400': '#ef5350', '500': '#f44336', '600': '#e53935', '700': '#d32f2f', '800': '#c62828', '900': '#b71c1c', A100: '#ff8a80', A200: '#ff5252', A400: '#ff1744', A700: '#d50000' },
  purple: { '50': '#f3e5f5', '100': '#e1bee7', '200': '#ce93d8', '300': '#ba68c8', '400': '#ab47bc', '500': '#9c27b0', '600': '#8e24aa', '700': '#7b1fa2', '800': '#6a1b9a', '900': '#4a148c', A100: '#ea80fc', A200: '#e040fb', A400: '#d500f9', A700: '#aa00ff' },
  pink: { '50': '#fce4ec', '100': '#f8bbd0', '200': '#f48fb1', '300': '#f06292', '400': '#ec407a', '500': '#e91e63', '600': '#d81b60', '700': '#c2185b', '800': '#ad1457', '900': '#880e4f', A100: '#ff80ab', A200: '#ff4081', A400: '#f50057', A700: '#c51162' },
  orange: { '50': '#fff3e0', '100': '#ffe0b2', '200': '#ffcc80', '300': '#ffb74d', '400': '#ffa726', '500': '#ff9800', '600': '#fb8c00', '700': '#f57c00', '800': '#ef6c00', '900': '#e65100', A100: '#ffd180', A200: '#ffab40', A400: '#ff9100', A700: '#ff6d00' },
  lime: { '50': '#f9fbe7', '100': '#f0f4c3', '200': '#e6ee9c', '300': '#dce775', '400': '#d4e157', '500': '#cddc39', '600': '#c0ca33', '700': '#afb42b', '800': '#9e9d24', '900': '#827717', A100: '#f4ff81', A200: '#eeff41', A400: '#c6ff00', A700: '#aeea00' },
  lightGreen: { '50': '#f1f8e9', '100': '#dcedc8', '200': '#c5e1a5', '300': '#aed581', '400': '#9ccc65', '500': '#8bc34a', '600': '#7cb342', '700': '#689f38', '800': '#558b2f', '900': '#33691e', A100: '#ccff90', A200: '#b2ff59', A400: '#76ff03', A700: '#64dd17' },
  cyan: { '50': '#e0f7fa', '100': '#b2ebf2', '200': '#80deea', '300': '#4dd0e1', '400': '#26c6da', '500': '#00bcd4', '600': '#00acc1', '700': '#0097a7', '800': '#00838f', '900': '#006064', A100: '#84ffff', A200: '#18ffff', A400: '#00e5ff', A700: '#00b8d4' },
  deepOrange: { '50': '#fbe9e7', '100': '#ffccbc', '200': '#ffab91', '300': '#ff8a65', '400': '#ff7043', '500': '#ff5722', '600': '#f4511e', '700': '#e64a19', '800': '#d84315', '900': '#bf360c', A100: '#ff9e80', A200: '#ff6e40', A400: '#ff3d00', A700: '#dd2c00' },
  deepPurple: { '50': '#ede7f6', '100': '#d1c4e9', '200': '#b39ddb', '300': '#9575cd', '400': '#7e57c2', '500': '#673ab7', '600': '#5e35b1', '700': '#512da8', '800': '#4527a0', '900': '#311b92', A100: '#b388ff', A200: '#7c4dff', A400: '#651fff', A700: '#6200ea' },
  green: { '50': '#e8f5e9', '100': '#c8e6c9', '200': '#a5d6a7', '300': '#81c784', '400': '#66bb6a', '500': '#4caf50', '600': '#43a047', '700': '#388e3c', '800': '#2e7d32', '900': '#1b5e20', A100: '#b9f6ca', A200: '#69f0ae', A400: '#00e676', A700: '#00c853' },
  grey: { '50': '#fafafa', '100': '#f5f5f5', '200': '#eeeeee', '300': '#e0e0e0', '400': '#bdbdbd', '500': '#9e9e9e', '600': '#757575', '700': '#616161', '800': '#424242', '900': '#212121', A100: '#f5f5f5', A200: '#eeeeee', A400: '#bdbdbd', A700: '#616161' },
  indigo: { '50': '#e8eaf6', '100': '#c5cae9', '200': '#9fa8da', '300': '#7986cb', '400': '#5c6bc0', '500': '#3f51b5', '600': '#3949ab', '700': '#303f9f', '800': '#283593', '900': '#1a237e', A100: '#8c9eff', A200: '#536dfe', A400: '#3d5afe', A700: '#304ffe' },
  lightBlue: { '50': '#e1f5fe', '100': '#b3e5fc', '200': '#81d4fa', '300': '#4fc3f7', '400': '#29b6f6', '500': '#03a9f4', '600': '#039be5', '700': '#0288d1', '800': '#0277bd', '900': '#01579b', A100: '#80d8ff', A200: '#40c4ff', A400: '#00b0ff', A700: '#0091ea' },
};

// ── General named colors (static, rgba) ───────────────────────────────────────

export const generalColors = {
  'yellow-golden': 'rgba(255, 215, 0, 0.6)',
  'yellow-pale': 'rgba(255, 255, 153, 0.4)',
  'yellow-amber': 'rgba(255, 191, 0, 0.7)',
  'yellow-sunshine': 'rgba(255, 239, 0, 0.5)',
  'yellow-light': 'rgba(255, 255, 0, 0.5)',
  'yellow-warm': 'rgba(255, 204, 0, 0.8)',
  'yellow-soft': 'rgba(255, 229, 153, 0.7)',
  'red-rose': 'rgba(255, 51, 51, 0.5)',
  'red-crimson': 'rgba(220, 20, 60, 0.6)',
  'red-light-coral': 'rgba(240, 128, 128, 0.5)',
  'red-fire-brick': 'rgba(178, 34, 34, 0.8)',
  'red-bright': 'rgba(255, 0, 0, 0.7)',
  'red-soft-coral': 'rgba(255, 102, 102, 0.6)',
  'red-dark': 'rgba(204, 0, 0, 0.8)',
  'blue-turquoise': 'rgba(64, 224, 208, 0.6)',
  'blue-dodger': 'rgba(30, 144, 255, 0.5)',
  'blue-navy': 'rgba(0, 0, 128, 0.8)',
  'blue-steel': 'rgba(70, 130, 180, 0.7)',
  'blue-sky': 'rgba(0, 153, 255, 0.5)',
  'blue-light': 'rgba(51, 204, 255, 0.7)',
  'blue-deep': 'rgba(0, 51, 204, 0.8)',
  'green-lime': 'rgba(50, 205, 50, 0.5)',
  'green-pale': 'rgba(152, 251, 152, 0.4)',
  'green-forest': 'rgba(34, 139, 34, 0.7)',
  'green-olive': 'rgba(128, 128, 0, 0.6)',
  'green-fresh': 'rgba(0, 204, 0, 0.6)',
  'green-soft-mint': 'rgba(102, 255, 153, 0.7)',
  'green-dark': 'rgba(0, 153, 76, 0.8)',
  'orange-tangerine': 'rgba(255, 140, 0, 0.6)',
  'orange-apricot': 'rgba(251, 206, 177, 0.5)',
  'orange-burnt': 'rgba(204, 85, 0, 0.7)',
  'orange-carrot': 'rgba(237, 145, 33, 0.6)',
  'orange-bright': 'rgba(255, 102, 0, 0.7)',
  'orange-soft-peach': 'rgba(255, 178, 102, 0.6)',
  'orange-deep': 'rgba(204, 85, 0, 0.8)',
} as const;

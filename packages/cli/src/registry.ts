/**
 * Component registry. Each entry describes the styled-package source for a
 * component along with which primitives it transitively depends on. The CLI
 * `add` command inlines the styled source into the user's project and lists
 * the workspace packages they need to install.
 */

export interface RegistryEntry {
  name: string;
  /** Workspace packages required for this component to function */
  dependencies: string[];
  /** External npm packages required */
  npmDependencies?: string[];
  /** Path under `packages/styled/src/` to copy. */
  sourcePath: string;
  /** Other registry entries this component depends on. */
  registryDependencies?: string[];
}

const PRIMITIVES = ['@aura-ui/primitives', '@aura-ui/core', '@aura-ui/hooks', '@aura-ui/utils', '@aura-ui/icons'];
const MATERIAL_REGISTRY = {
  dependencies: PRIMITIVES,
  sourcePath: 'material/index.tsx',
  registryDependencies: ['button', 'combobox'],
} satisfies Omit<RegistryEntry, 'name'>;

export const REGISTRY: Record<string, RegistryEntry> = {
  // Atoms
  button: { name: 'button', dependencies: PRIMITIVES, sourcePath: 'button/index.tsx' },
  badge: { name: 'badge', dependencies: PRIMITIVES, sourcePath: 'badge/index.tsx' },
  card: { name: 'card', dependencies: PRIMITIVES, sourcePath: 'card/index.tsx' },
  skeleton: { name: 'skeleton', dependencies: PRIMITIVES, sourcePath: 'skeleton/index.tsx' },
  spinner: { name: 'spinner', dependencies: PRIMITIVES, sourcePath: 'spinner/index.tsx' },
  alert: { name: 'alert', dependencies: PRIMITIVES, sourcePath: 'alert/index.tsx' },
  'aspect-ratio': { name: 'aspect-ratio', dependencies: PRIMITIVES, sourcePath: 'aspect-ratio/index.tsx' },
  avatar: { name: 'avatar', dependencies: PRIMITIVES, sourcePath: 'avatar/index.tsx' },
  progress: { name: 'progress', dependencies: PRIMITIVES, sourcePath: 'progress/index.tsx' },
  separator: { name: 'separator', dependencies: PRIMITIVES, sourcePath: 'separator/index.tsx' },
  label: { name: 'label', dependencies: PRIMITIVES, sourcePath: 'label/index.tsx' },
  switch: { name: 'switch', dependencies: PRIMITIVES, sourcePath: 'switch/index.tsx' },
  toggle: { name: 'toggle', dependencies: PRIMITIVES, sourcePath: 'toggle/index.tsx' },
  checkbox: { name: 'checkbox', dependencies: PRIMITIVES, sourcePath: 'checkbox/index.tsx' },
  dialog: { name: 'dialog', dependencies: PRIMITIVES, sourcePath: 'dialog/index.tsx' },

  // Form basics
  input: { name: 'input', dependencies: PRIMITIVES, sourcePath: 'input/index.tsx' },
  textarea: { name: 'textarea', dependencies: PRIMITIVES, sourcePath: 'textarea/index.tsx' },
  'radio-group': { name: 'radio-group', dependencies: PRIMITIVES, sourcePath: 'radio-group/index.tsx' },
  'toggle-group': {
    name: 'toggle-group',
    dependencies: PRIMITIVES,
    sourcePath: 'toggle-group/index.tsx',
    registryDependencies: ['toggle'],
  },
  slider: { name: 'slider', dependencies: PRIMITIVES, sourcePath: 'slider/index.tsx' },
  form: { name: 'form', dependencies: PRIMITIVES, sourcePath: 'form/index.tsx' },

  // Disclosure & nav
  collapsible: { name: 'collapsible', dependencies: PRIMITIVES, sourcePath: 'collapsible/index.tsx' },
  accordion: { name: 'accordion', dependencies: PRIMITIVES, sourcePath: 'accordion/index.tsx' },
  tabs: { name: 'tabs', dependencies: PRIMITIVES, sourcePath: 'tabs/index.tsx' },
  breadcrumb: { name: 'breadcrumb', dependencies: PRIMITIVES, sourcePath: 'breadcrumb/index.tsx' },
  pagination: {
    name: 'pagination',
    dependencies: PRIMITIVES,
    sourcePath: 'pagination/index.tsx',
    registryDependencies: ['button'],
  },
  stepper: { name: 'stepper', dependencies: PRIMITIVES, sourcePath: 'stepper/index.tsx' },

  // Overlays
  'alert-dialog': {
    name: 'alert-dialog',
    dependencies: PRIMITIVES,
    sourcePath: 'alert-dialog/index.tsx',
    registryDependencies: ['button'],
  },
  sheet: { name: 'sheet', dependencies: PRIMITIVES, sourcePath: 'sheet/index.tsx' },
  drawer: { name: 'drawer', dependencies: PRIMITIVES, sourcePath: 'drawer/index.tsx' },
  popover: { name: 'popover', dependencies: PRIMITIVES, sourcePath: 'popover/index.tsx' },
  tooltip: { name: 'tooltip', dependencies: PRIMITIVES, sourcePath: 'tooltip/index.tsx' },
  'hover-card': { name: 'hover-card', dependencies: PRIMITIVES, sourcePath: 'hover-card/index.tsx' },
  toast: { name: 'toast', dependencies: PRIMITIVES, sourcePath: 'toast/index.tsx' },

  // Complex compound
  'dropdown-menu': { name: 'dropdown-menu', dependencies: PRIMITIVES, sourcePath: 'dropdown-menu/index.tsx' },
  'context-menu': { name: 'context-menu', dependencies: PRIMITIVES, sourcePath: 'context-menu/index.tsx' },
  menubar: { name: 'menubar', dependencies: PRIMITIVES, sourcePath: 'menubar/index.tsx' },
  'navigation-menu': { name: 'navigation-menu', dependencies: PRIMITIVES, sourcePath: 'navigation-menu/index.tsx' },
  select: { name: 'select', dependencies: PRIMITIVES, sourcePath: 'select/index.tsx' },
  'multi-select': { name: 'multi-select', dependencies: PRIMITIVES, sourcePath: 'multi-select/index.tsx' },
  combobox: { name: 'combobox', dependencies: PRIMITIVES, sourcePath: 'combobox/index.tsx' },
  command: { name: 'command', dependencies: PRIMITIVES, sourcePath: 'command/index.tsx' },
  autocomplete: { name: 'autocomplete', ...MATERIAL_REGISTRY },

  // Specialty form
  'one-time-password-field': {
    name: 'one-time-password-field',
    dependencies: PRIMITIVES,
    sourcePath: 'one-time-password-field/index.tsx',
  },
  'password-toggle-field': {
    name: 'password-toggle-field',
    dependencies: PRIMITIVES,
    sourcePath: 'password-toggle-field/index.tsx',
  },
  'number-field': { name: 'number-field', dependencies: PRIMITIVES, sourcePath: 'number-field/index.tsx' },
  calendar: { name: 'calendar', dependencies: PRIMITIVES, sourcePath: 'calendar/index.tsx' },
  'date-picker': {
    name: 'date-picker',
    dependencies: PRIMITIVES,
    sourcePath: 'date-picker/index.tsx',
    registryDependencies: ['calendar', 'button'],
  },
  'time-picker': { name: 'time-picker', dependencies: PRIMITIVES, sourcePath: 'time-picker/index.tsx' },
  'date-time-picker': {
    name: 'date-time-picker',
    dependencies: PRIMITIVES,
    sourcePath: 'date-time-picker/index.tsx',
    registryDependencies: ['calendar', 'button', 'time-picker'],
  },
  'date-range-picker': {
    name: 'date-range-picker',
    dependencies: PRIMITIVES,
    sourcePath: 'date-range-picker/index.tsx',
    registryDependencies: ['calendar', 'button'],
  },
  'color-picker': { name: 'color-picker', dependencies: PRIMITIVES, sourcePath: 'color-picker/index.tsx' },
  'file-upload': { name: 'file-upload', dependencies: PRIMITIVES, sourcePath: 'file-upload/index.tsx' },

  // Feedback & misc
  'circular-progress': {
    name: 'circular-progress',
    dependencies: ['@aura-ui/utils'],
    sourcePath: 'circular-progress/index.tsx',
  },
  meter: { name: 'meter', dependencies: ['@aura-ui/utils'], sourcePath: 'meter/index.tsx' },
  'scroll-area': { name: 'scroll-area', dependencies: PRIMITIVES, sourcePath: 'scroll-area/index.tsx' },
  toolbar: { name: 'toolbar', dependencies: PRIMITIVES, sourcePath: 'toolbar/index.tsx' },
  resizable: { name: 'resizable', dependencies: PRIMITIVES, sourcePath: 'resizable/index.tsx' },
  carousel: { name: 'carousel', dependencies: PRIMITIVES, sourcePath: 'carousel/index.tsx' },
  tree: { name: 'tree', dependencies: PRIMITIVES, sourcePath: 'tree/index.tsx' },
  editable: { name: 'editable', dependencies: PRIMITIVES, sourcePath: 'editable/index.tsx' },
  'tags-input': { name: 'tags-input', dependencies: PRIMITIVES, sourcePath: 'tags-input/index.tsx' },
  mentions: { name: 'mentions', dependencies: PRIMITIVES, sourcePath: 'mentions/index.tsx' },
  'copy-button': {
    name: 'copy-button',
    dependencies: ['@aura-ui/utils', '@aura-ui/icons'],
    sourcePath: 'copy-button/index.tsx',
    registryDependencies: ['button'],
  },
  box: { name: 'box', ...MATERIAL_REGISTRY },
  container: { name: 'container', ...MATERIAL_REGISTRY },
  stack: { name: 'stack', ...MATERIAL_REGISTRY },
  grid: { name: 'grid', ...MATERIAL_REGISTRY },
  paper: { name: 'paper', ...MATERIAL_REGISTRY },
  typography: { name: 'typography', ...MATERIAL_REGISTRY },
  link: { name: 'link', ...MATERIAL_REGISTRY },
  'svg-icon': { name: 'svg-icon', ...MATERIAL_REGISTRY },
  chart: { name: 'chart', ...MATERIAL_REGISTRY },
  chip: { name: 'chip', ...MATERIAL_REGISTRY },
  'button-group': { name: 'button-group', ...MATERIAL_REGISTRY },
  'floating-action-button': { name: 'floating-action-button', ...MATERIAL_REGISTRY },
  rating: { name: 'rating', ...MATERIAL_REGISTRY },
  'transfer-list': { name: 'transfer-list', ...MATERIAL_REGISTRY },
  list: { name: 'list', ...MATERIAL_REGISTRY },
  'image-list': { name: 'image-list', ...MATERIAL_REGISTRY },
  table: { name: 'table', ...MATERIAL_REGISTRY },
  backdrop: { name: 'backdrop', ...MATERIAL_REGISTRY },
  snackbar: { name: 'snackbar', ...MATERIAL_REGISTRY },
  modal: { name: 'modal', ...MATERIAL_REGISTRY },
  'app-bar': { name: 'app-bar', ...MATERIAL_REGISTRY },
  'bottom-navigation': { name: 'bottom-navigation', ...MATERIAL_REGISTRY },
  'speed-dial': { name: 'speed-dial', ...MATERIAL_REGISTRY },
  masonry: { name: 'masonry', ...MATERIAL_REGISTRY },
  timeline: { name: 'timeline', ...MATERIAL_REGISTRY },
  'click-away-listener': { name: 'click-away-listener', ...MATERIAL_REGISTRY },
  'no-ssr': { name: 'no-ssr', ...MATERIAL_REGISTRY },
  portal: { name: 'portal', ...MATERIAL_REGISTRY },
  popper: { name: 'popper', ...MATERIAL_REGISTRY },
  'textarea-autosize': { name: 'textarea-autosize', ...MATERIAL_REGISTRY },
  transition: { name: 'transition', ...MATERIAL_REGISTRY },
  'css-baseline': { name: 'css-baseline', ...MATERIAL_REGISTRY },
  'init-color-scheme-script': { name: 'init-color-scheme-script', ...MATERIAL_REGISTRY },

  // Data
  'data-table': {
    name: 'data-table',
    dependencies: ['@aura-ui/utils', '@aura-ui/icons', '@tanstack/react-table', '@tanstack/react-virtual'],
    npmDependencies: ['@tanstack/react-table', '@tanstack/react-virtual'],
    sourcePath: '',
  },
};

export function resolveDependencies(name: string, visited = new Set<string>()): string[] {
  if (visited.has(name)) return [];
  visited.add(name);
  const entry = REGISTRY[name];
  if (!entry) return [];
  const deps = [name];
  for (const dep of entry.registryDependencies ?? []) {
    deps.push(...resolveDependencies(dep, visited));
  }
  return deps;
}

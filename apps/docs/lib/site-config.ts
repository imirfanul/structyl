/** Central site config — imported by server files (sitemap, metadata, JSON-LD). No React, no 'use client'. */

/**
 * Canonical base URL — drives metadataBase, OG/Twitter images, canonical
 * links, sitemap, robots, and JSON-LD, so it MUST be the live production
 * origin. Hardcoded to the custom domain so no missing or stale env var
 * can ever re-point the site at the wrong origin. Override with
 * NEXT_PUBLIC_SITE_URL only for preview/staging environments.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.structyl.com';

export const SITE_NAME = 'structyl';
export const SITE_DESCRIPTION =
  'Accessible headless primitives, Tailwind-styled components, runtime theming, and a first-class DataTable. TypeScript-first, WAI-ARIA compliant, dark-mode ready.';

export const GITHUB_URL = 'https://github.com/imirfanul/structyl';
export const NPM_URL    = 'https://www.npmjs.com/org/structyl';
export const DISCORD_URL = 'https://discord.gg/mEUEUfTfgX';

/** Library author — used for metadata authors/creator and JSON-LD. */
export const SITE_AUTHOR = {
  name: 'Mohammed Irfanul Alam Tanveer',
  url: 'https://www.imirfanul.com',
} as const;

/** All /docs/[slug] component pages */
export const COMPONENT_SLUGS: { slug: string; name: string; description: string; category: string }[] = [
  { slug: 'accordion',              name: 'Accordion',               description: 'Vertically stacked expandable sections.',                                       category: 'Data display' },
  { slug: 'alert',                  name: 'Alert',                   description: 'Displays a callout for user attention.',                                        category: 'Feedback' },
  { slug: 'alert-dialog',           name: 'Alert Dialog',            description: 'A modal dialog that interrupts the user with important content.',               category: 'Overlays' },
  { slug: 'app-bar',                name: 'App Bar',                 description: 'A top application navigation bar.',                                             category: 'Navigation' },
  { slug: 'aspect-ratio',           name: 'Aspect Ratio',            description: 'Displays content within a desired ratio.',                                      category: 'Layout' },
  { slug: 'autocomplete',           name: 'Autocomplete',            description: 'An input with suggestions that appear as the user types.',                      category: 'Inputs' },
  { slug: 'avatar',                 name: 'Avatar',                  description: 'An image element with a fallback for representing the user.',                   category: 'Data display' },
  { slug: 'backdrop',               name: 'Backdrop',                description: 'A dimming overlay behind modal surfaces.',                                      category: 'Overlays' },
  { slug: 'badge',                  name: 'Badge',                   description: 'Generates a small badge to the top-right of its child(ren).',                   category: 'Data display' },
  { slug: 'banner',                 name: 'Banner',                  description: 'A full-width, site-level announcement bar.',                                     category: 'Feedback' },
  { slug: 'bottom-navigation',      name: 'Bottom Navigation',       description: 'A mobile navigation bar fixed to the bottom of the screen.',                   category: 'Navigation' },
  { slug: 'box',                    name: 'Box',                     description: 'A low-level layout primitive.',                                                  category: 'Layout' },
  { slug: 'breadcrumb',             name: 'Breadcrumb',              description: 'Displays the path to the current resource using a hierarchy of links.',         category: 'Navigation' },
  { slug: 'button',                 name: 'Button',                  description: 'Displays a button or a component that looks like a button.',                    category: 'Inputs' },
  { slug: 'button-group',           name: 'Button Group',            description: 'Groups multiple buttons together.',                                             category: 'Inputs' },
  { slug: 'calendar',               name: 'Calendar',                description: 'A date field component that allows users to enter and edit date values.',       category: 'Inputs' },
  { slug: 'card',                   name: 'Card',                    description: 'Displays a card with header, content, and footer sections.',                    category: 'Data display' },
  { slug: 'carousel',               name: 'Carousel',                description: 'A slideshow component for cycling through elements.',                           category: 'Data display' },
  { slug: 'chart',                  name: 'Chart',                   description: 'Composable chart primitives built on Recharts.',                                category: 'Data display' },
  { slug: 'checkbox',               name: 'Checkbox',                description: 'A control that allows the user to toggle between checked and not checked.',     category: 'Inputs' },
  { slug: 'chip',                   name: 'Chip',                    description: 'Compact elements that represent an input, attribute, or action.',               category: 'Data display' },
  { slug: 'circular-progress',      name: 'Circular Progress',       description: 'Circular indicators for displaying progress.',                                  category: 'Feedback' },
  { slug: 'click-away-listener',    name: 'Click Away Listener',     description: 'Detects click events outside of its children.',                                 category: 'Utilities' },
  { slug: 'code-block',             name: 'Code Block',              description: 'A styled code block with filename header, line numbers, and a copy button.',     category: 'Data display' },
  { slug: 'collapsible',            name: 'Collapsible',             description: 'An interactive component which expands/collapses a panel.',                     category: 'Data display' },
  { slug: 'color-picker',           name: 'Color Picker',            description: 'An input for selecting colors with hue, saturation, and alpha controls.',       category: 'Inputs' },
  { slug: 'combobox',               name: 'Combobox',                description: 'An input combined with a popup listbox for selecting from options.',            category: 'Inputs' },
  { slug: 'command',                name: 'Command',                 description: 'Fast, composable command menu.',                                                category: 'Navigation' },
  { slug: 'container',              name: 'Container',               description: 'Centers content horizontally with responsive max-width.',                       category: 'Layout' },
  { slug: 'context-menu',           name: 'Context Menu',            description: 'Displays a menu on right-click or long-press.',                                 category: 'Overlays' },
  { slug: 'copy-button',            name: 'Copy Button',             description: 'A button that copies text to the clipboard.',                                   category: 'Inputs' },
  { slug: 'css-baseline',           name: 'CSS Baseline',            description: 'Applies global reset and baseline CSS styles.',                                 category: 'Utilities' },
  { slug: 'data-table',             name: 'Data Table',              description: 'Feature-rich data table with sorting, filtering, pagination, and virtualization.', category: 'Data display' },
  { slug: 'date-picker',            name: 'Date Picker',             description: 'A component for selecting a date.',                                             category: 'Inputs' },
  { slug: 'date-range-picker',      name: 'Date Range Picker',       description: 'A component for selecting a range of dates.',                                   category: 'Inputs' },
  { slug: 'date-time-picker',       name: 'Date Time Picker',        description: 'A component for selecting a date and time.',                                    category: 'Inputs' },
  { slug: 'description-list',       name: 'Description List',        description: 'A semantic dl/dt/dd compound for key–value pairs.',                              category: 'Data display' },
  { slug: 'dialog',                 name: 'Dialog',                  description: 'A window overlaid on either the primary window or another dialog window.',      category: 'Overlays' },
  { slug: 'drawer',                 name: 'Drawer',                  description: 'A panel that slides in from the edge of the screen.',                           category: 'Overlays' },
  { slug: 'dropdown-menu',          name: 'Dropdown Menu',           description: 'Displays a menu to the user — triggered by a button.',                          category: 'Overlays' },
  { slug: 'editable',               name: 'Editable',                description: 'An inline editable text input.',                                               category: 'Inputs' },
  { slug: 'file-upload',            name: 'File Upload',             description: 'A drag-and-drop file upload component.',                                        category: 'Inputs' },
  { slug: 'floating-action-button', name: 'Floating Action Button',  description: 'A circular button that floats above content.',                                  category: 'Inputs' },
  { slug: 'form',                   name: 'Form',                    description: 'Building accessible forms with validation and error messages.',                  category: 'Inputs' },
  { slug: 'grid',                   name: 'Grid',                    description: 'A CSS grid layout component.',                                                  category: 'Layout' },
  { slug: 'hover-card',             name: 'Hover Card',              description: 'For sighted users to preview content available behind a link.',                 category: 'Overlays' },
  { slug: 'image-list',             name: 'Image List',              description: 'Displays a collection of images in an organized grid.',                         category: 'Data display' },
  { slug: 'init-color-scheme-script', name: 'Init Color Scheme Script', description: 'Prevents flash of wrong theme on first render.',                            category: 'Utilities' },
  { slug: 'input',                  name: 'Input',                   description: 'Displays a form input field.',                                                  category: 'Inputs' },
  { slug: 'label',                  name: 'Label',                   description: 'Renders an accessible label associated with controls.',                         category: 'Inputs' },
  { slug: 'link',                   name: 'Link',                    description: 'Renders an accessible link element.',                                            category: 'Navigation' },
  { slug: 'list',                   name: 'List',                    description: 'A vertical list of items.',                                                     category: 'Data display' },
  { slug: 'marquee',                name: 'Marquee',                 description: 'A CSS-only scrolling strip for logos and announcements.',                        category: 'Data display' },
  { slug: 'masonry',                name: 'Masonry',                 description: 'A layout component for staggered grid items.',                                  category: 'Layout' },
  { slug: 'mentions',               name: 'Mentions',                description: 'An input that triggers a suggestion popup on @mention.',                        category: 'Inputs' },
  { slug: 'menubar',                name: 'Menubar',                 description: 'A horizontal menu bar typically found in desktop applications.',                 category: 'Navigation' },
  { slug: 'meter',                  name: 'Meter',                   description: 'Displays a scalar value within a known range.',                                 category: 'Feedback' },
  { slug: 'modal',                  name: 'Modal',                   description: 'A dialog window that focuses the user on a specific task.',                     category: 'Overlays' },
  { slug: 'multi-select',           name: 'Multi Select',            description: 'A select component that allows multiple selections.',                            category: 'Inputs' },
  { slug: 'navigation-menu',        name: 'Navigation Menu',         description: 'A collection of links for site navigation.',                                    category: 'Navigation' },
  { slug: 'no-ssr',                 name: 'No SSR',                  description: 'Defers rendering of its children to the client.',                               category: 'Utilities' },
  { slug: 'number-field',           name: 'Number Field',            description: 'A number input with increment/decrement controls.',                             category: 'Inputs' },
  { slug: 'one-time-password-field', name: 'OTP Field',              description: 'A one-time password input with individual character cells.',                    category: 'Inputs' },
  { slug: 'pagination',             name: 'Pagination',              description: 'Enables navigation between pages of content.',                                  category: 'Navigation' },
  { slug: 'paper',                  name: 'Paper',                   description: 'A surface-level container that applies elevation and background.',              category: 'Layout' },
  { slug: 'password-toggle-field',  name: 'Password Toggle Field',   description: 'A password input with a toggle to show/hide the value.',                       category: 'Inputs' },
  { slug: 'popover',                name: 'Popover',                 description: 'Displays rich content in a portal, triggered by a button.',                    category: 'Overlays' },
  { slug: 'popper',                 name: 'Popper',                  description: 'A low-level positioning primitive for floating elements.',                      category: 'Utilities' },
  { slug: 'portal',                 name: 'Portal',                  description: 'Renders children into a different part of the DOM.',                            category: 'Utilities' },
  { slug: 'progress',               name: 'Progress',                description: 'Displays an indicator showing the completion progress of a task.',              category: 'Feedback' },
  { slug: 'radio-group',            name: 'Radio Group',             description: 'A set of checkable buttons where only one can be checked at a time.',           category: 'Inputs' },
  { slug: 'rating',                 name: 'Rating',                  description: 'A star-based rating input component.',                                          category: 'Inputs' },
  { slug: 'resizable',              name: 'Resizable',               description: 'Accessible resizable panel groups and handles.',                                category: 'Layout' },
  { slug: 'scroll-area',            name: 'Scroll Area',             description: 'Augments native scroll functionality for custom, cross-browser styling.',       category: 'Layout' },
  { slug: 'select',                 name: 'Select',                  description: 'Displays a list of options for the user to pick from.',                         category: 'Inputs' },
  { slug: 'separator',              name: 'Separator',               description: 'Visually or semantically separates content.',                                   category: 'Layout' },
  { slug: 'sheet',                  name: 'Sheet',                   description: 'Extends the Dialog component to display content that complements the main content.', category: 'Overlays' },
  { slug: 'skeleton',               name: 'Skeleton',                description: 'Use to show a placeholder while content is loading.',                           category: 'Feedback' },
  { slug: 'slider',                 name: 'Slider',                  description: 'An input where the user selects a value from within a given range.',            category: 'Inputs' },
  { slug: 'snackbar',               name: 'Snackbar',                description: 'Brief messages about app processes at the bottom of the screen.',               category: 'Feedback' },
  { slug: 'speed-dial',             name: 'Speed Dial',              description: 'A floating action button with a menu of related actions.',                      category: 'Navigation' },
  { slug: 'spinner',                name: 'Spinner',                 description: 'An animated loading indicator.',                                                category: 'Feedback' },
  { slug: 'stack',                  name: 'Stack',                   description: 'Manages the layout of its immediate children along the vertical or horizontal axis.', category: 'Layout' },
  { slug: 'stepper',                name: 'Stepper',                 description: 'A component for guiding users through multi-step processes.',                   category: 'Navigation' },
  { slug: 'svg-icon',               name: 'SVG Icon',                description: 'A component for rendering SVG icons.',                                          category: 'Data display' },
  { slug: 'switch',                 name: 'Switch',                  description: 'A control that allows the user to toggle between checked and not checked.',     category: 'Inputs' },
  { slug: 'table',                  name: 'Table',                   description: 'A responsive table component.',                                                 category: 'Data display' },
  { slug: 'tabs',                   name: 'Tabs',                    description: 'A set of layered sections of content that display one panel at a time.',        category: 'Navigation' },
  { slug: 'tags-input',             name: 'Tags Input',              description: 'An input for entering and managing tags.',                                      category: 'Inputs' },
  { slug: 'textarea',               name: 'Textarea',                description: 'Displays a form textarea field.',                                               category: 'Inputs' },
  { slug: 'textarea-autosize',      name: 'Textarea Autosize',       description: 'A textarea that grows with its content.',                                       category: 'Inputs' },
  { slug: 'timeline',               name: 'Timeline',                description: 'Displays a list of events in chronological order.',                             category: 'Data display' },
  { slug: 'time-picker',            name: 'Time Picker',             description: 'A component for selecting a time value.',                                       category: 'Inputs' },
  { slug: 'toast',                  name: 'Toast',                   description: 'A succinct message that is displayed temporarily.',                              category: 'Feedback' },
  { slug: 'toggle',                 name: 'Toggle',                  description: 'A two-state button that can be either on or off.',                              category: 'Inputs' },
  { slug: 'toggle-group',           name: 'Toggle Group',            description: 'A set of two-state buttons that can be toggled on or off.',                     category: 'Inputs' },
  { slug: 'toolbar',                name: 'Toolbar',                 description: 'A container for grouping a set of controls.',                                   category: 'Navigation' },
  { slug: 'tooltip',                name: 'Tooltip',                 description: 'A popup that displays information related to an element.',                      category: 'Overlays' },
  { slug: 'transfer-list',          name: 'Transfer List',           description: 'A component for moving items between two lists.',                               category: 'Inputs' },
  { slug: 'transition',             name: 'Transition',              description: 'Applies enter/exit transitions to its children.',                               category: 'Utilities' },
  { slug: 'tree',                   name: 'Tree',                    description: 'A hierarchical list of items with expand/collapse behavior.',                   category: 'Data display' },
  { slug: 'typography',             name: 'Typography',              description: 'Renders text with semantic HTML and consistent styling.',                        category: 'Data display' },
  { slug: 'video-player',           name: 'Video Player',            description: 'A fully-featured HTML5 video player with playlists, chapters, subtitles, filters, and HLS streaming.', category: 'Media' },
];

/** Static /docs/[slug] pages that are not components */
export const STATIC_DOC_SLUGS = [
  'getting-started',
  'accessibility',
  'icons',
  'hooks',
  'packages',
  'themes',
  'api-client',
  'forms',
  'design-tokens',
  'changelog',
  'keyboard-shortcuts',
] as const;

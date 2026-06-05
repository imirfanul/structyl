import type { ApiPart } from './registry';

/**
 * Full prop reference for every documented component, keyed by slug.
 * Merged into the component page when the registry entry has no inline `api`.
 *
 * AUTO-GENERATED from a source audit (each component's real @structyl/styled +
 * @structyl/primitives source). Every component is documented here; do not add
 * inline `api` to registry entries (it would shadow these complete definitions).
 */

export const API: Record<string, ApiPart[]> = {
  button: [
    {
      name: 'Button',
      description: 'Styled button component with variant system, icon slots, and loading state. Extends native HTML button with semantic styling and layout options.',
      props: [
        {
          name: 'variant',
          type: '\'default\' | \'destructive\' | \'outline\' | \'secondary\' | \'ghost\' | \'link\' | \'success\' | \'warning\' | \'contained\' | \'outlined\' | \'text\'',
          default: '\'default\'',
          description: 'Visual variant; legacy variants (default, destructive, etc.) are self-contained; MUI-style variants (contained, outlined, text) pair with color prop',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\' | \'inherit\'',
          description: 'Semantic color; used with MUI-style variants (contained, outlined, text) or standalone with inherit',
        },
        {
          name: 'size',
          type: '\'default\' | \'sm\' | \'lg\' | \'xl\' | \'icon\' | \'icon-sm\' | \'icon-lg\' | \'icon-xl\'',
          default: '\'default\'',
          description: 'Button size; icon-* variants are square (height === width)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace button element with Slot child element, merging props and classes',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Shows spinner icon, disables button, replaces children with loadingText if provided',
        },
        {
          name: 'loadingText',
          type: 'string',
          description: 'Text displayed next to spinner when loading; defaults to children if not provided',
        },
        {
          name: 'leftIcon',
          type: 'React.ReactNode',
          description: 'Icon or element rendered before children',
        },
        {
          name: 'rightIcon',
          type: 'React.ReactNode',
          description: 'Icon or element rendered after children',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables button interaction; also set when loading=true',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with variant styles',
        },
        {
          name: 'type',
          type: '\'button\' | \'submit\' | \'reset\'',
          default: '\'button\'',
          description: 'HTML button type attribute',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button content',
        },
      ],
    },
    {
      name: 'ButtonGroup',
      description: 'Container for grouping buttons with shared prop propagation and optional border-collapse styling.',
      props: [
        {
          name: 'attached',
          type: 'boolean',
          default: 'false',
          description: 'Collapses shared borders between adjacent buttons and adjusts border-radius',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Layout direction of grouped buttons',
        },
        {
          name: 'variant',
          type: '\'default\' | \'destructive\' | \'outline\' | \'secondary\' | \'ghost\' | \'link\' | \'success\' | \'warning\' | \'contained\' | \'outlined\' | \'text\'',
          description: 'Variant propagated to all child Button components',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\' | \'inherit\'',
          description: 'Color propagated to all child Button components',
        },
        {
          name: 'size',
          type: '\'default\' | \'sm\' | \'lg\' | \'xl\' | \'icon\' | \'icon-sm\' | \'icon-lg\' | \'icon-xl\'',
          description: 'Size propagated to all child Button components',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disabled state propagated to all child Button components',
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          description: 'Makes each child Button full-width; propagated to all children',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the group container',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button components to group',
        },
      ],
    },
    {
      name: 'ButtonSpinner',
      description: 'SVG spinner icon used internally during loading state; exported for custom loading UI.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (animate-spin is applied by default)',
        },
      ],
    },
  ],

  dialog: [
    {
      name: 'Root',
      description: 'Container component that manages dialog state and provides context to child components',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled dialog open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when dialog open state changes',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether dialog is modal (blocks interaction outside, traps focus) or non-modal',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Dialog content and subcomponents',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that toggles the dialog open state; extends HTML button element',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portals dialog content outside component hierarchy (typically to document body)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal into; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force-mount content to DOM even when dialog is closed',
        },
      ],
    },
    {
      name: 'Overlay',
      description: 'Backdrop overlay behind dialog content; only renders when modal=true; extends HTML div element',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force-mount overlay to DOM even when dialog is closed',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Main dialog container; extends HTML div element; contains title, description, and close button',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force-mount content to DOM even when dialog is closed',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback fired when Escape key pressed; call event.preventDefault() to prevent dismiss',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback fired when pointer down event occurs outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback fired on any interaction outside content (pointer or focus)',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback fired when focus moves into content on open; call event.preventDefault() to prevent',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback fired when focus moves back on close; call event.preventDefault() to prevent',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Title',
      description: 'Dialog title heading; renders as h2 element; extends HTML heading element',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of h2',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Description',
      description: 'Dialog description text; renders as p element; extends HTML paragraph element',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of p',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Close',
      description: 'Button that closes the dialog; extends HTML button element; includes built-in close functionality',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Header',
      description: 'Convenience wrapper for dialog title section; styled div container',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Footer',
      description: 'Convenience wrapper for dialog action buttons section; styled div container',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
  ],

  'dropdown-menu': [
    {
      name: 'Root',
      description: 'Root container that manages dropdown menu state, dir, and modal behavior',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (Trigger, Content, etc.)',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback when open state changes',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether to disable pointer events outside and trap focus',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that toggles the dropdown menu; extends native button with aria attributes',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing through props',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLButtonElement>',
          description: 'Forward ref to button element',
        },
        {
          name: '...buttonProps',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes and event handlers',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Dropdown menu content portal with positioning, animation, and focus management',
      props: [
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Portal container; defaults to document.body',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Offset from trigger button',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          description: 'Preferred side to display content',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          description: 'Alignment relative to trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset from alignment edge',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Automatically flip side/align to avoid viewport collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Elements to consider as collision boundaries',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding from collision boundaries',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'Positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Whether content sticks to trigger during scroll',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide when trigger no longer visible',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'Position update frequency',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Enable keyboard focus looping',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content even when closed',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback when auto-focusing on close; returns focus to trigger by default',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback for pointer down outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Callback for focus moving outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback for any interaction outside content',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to content div',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Menu item with optional inset padding; supports disabled state and select callback',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for visual inset',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable item interaction',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback when item is selected (click or enter)',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text content for typeahead search',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to item div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'Menu item with checkbox indicator; toggles checked state on select',
      props: [
        {
          name: 'checked',
          type: 'boolean | \'indeterminate\'',
          description: 'Checkbox state',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Callback when checked state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable item interaction',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text content for typeahead search',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to item div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'Container for radio items that manages exclusive selection',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Currently selected radio item value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when selected value changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to group div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'Radio item within RadioGroup; selects its value when clicked',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Value to select when this item is chosen (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable item interaction',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text content for typeahead search',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to item div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Semantic grouping container for menu items',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to group div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Non-interactive label for menu sections; supports optional inset padding',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for visual inset',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to label div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual divider between menu sections',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to separator div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Shortcut',
      description: 'Display keyboard shortcut hint text (e.g. \'⌘S\'); styled as optional child content',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...spanProps',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Standard HTML span attributes',
        },
      ],
    },
    {
      name: 'Sub',
      description: 'Container for nested submenu with independent open/close state',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (SubTrigger, SubContent)',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback when submenu open state changes',
        },
      ],
    },
    {
      name: 'SubTrigger',
      description: 'Item that toggles a submenu; displays chevron icon; supports inset padding',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for visual inset',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable item interaction',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text content for typeahead search',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to trigger div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'SubContent',
      description: 'Submenu content portal; positioned adjacent to SubTrigger',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content even when closed',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Enable keyboard focus looping',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback when auto-focusing on close',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when escape key is pressed; closes root menu',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback for pointer down outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Callback for focus moving outside content; closes submenu if target is not trigger',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback for any interaction outside content',
        },
        {
          name: 'sideOffset',
          type: 'number',
          description: 'Offset from trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset from alignment edge',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Automatically flip side/align to avoid viewport collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Elements to consider as collision boundaries',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding from collision boundaries',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'Positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Whether content sticks to trigger during scroll',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide when trigger no longer visible',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'Position update frequency',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.ForwardedRef<HTMLDivElement>',
          description: 'Forward ref to content div',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Standard HTML div attributes and event handlers (side and align are fixed to \'right\'/\'start\' and \'left\'/\'start\' for RTL)',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal container for rendering Content outside React tree; exported for advanced use',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Portal content',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Portal target container; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount portal regardless of open state',
        },
      ],
    },
  ],

  popover: [
    {
      name: 'Root',
      description: 'Wrapper component that manages popover state and context',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child components (Trigger, Portal, Content, etc.)',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when open state changes',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'false',
          description: 'Whether popover should act as a modal (traps focus, disables outside interactions)',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that toggles the popover open/closed',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '*',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (onClick, disabled, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Anchor',
      description: 'Optional custom anchor point for positioning; without this, Trigger serves as the anchor',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '*',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Container that portals the content to a DOM node (usually document.body)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child content to portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM node to portal into; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content even when closed',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The popover panel with positioning, animations, and interaction handling; styled variant with defaults',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merged with defaults)',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Portal container (styled wrapper convenience prop)',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'center\'',
          description: 'Alignment relative to anchor',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Distance in pixels from anchor',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          description: 'Preferred side to display content',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset along the alignment axis',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          description: 'Padding between arrow and content edges',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Auto-flip or adjust position to avoid collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Elements to check for collision against',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding around collision boundary',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'CSS positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Sticky behavior when scrolling parent',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide content when anchor is not in viewport',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'How often to update position on scroll/resize',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content even when closed',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback before auto-focus when opening',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback before auto-focus when closing',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when Escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback when pointer down event outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Callback when focus moves outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback for any interaction outside content',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: '*',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (id, role, data-*, etc.)',
        },
      ],
    },
    {
      name: 'Close',
      description: 'Button that closes the popover',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '*',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (onClick, disabled, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Arrow',
      description: 'Visual arrow pointing from content to anchor',
      props: [
        {
          name: 'width',
          type: 'number',
          description: 'Arrow width in pixels',
        },
        {
          name: 'height',
          type: 'number',
          description: 'Arrow height in pixels',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '*',
          type: 'React.ComponentPropsWithoutRef<\'svg\'>',
          description: 'All standard SVG attributes',
        },
      ],
    },
  ],

  tooltip: [
    {
      name: 'Tooltip.Provider',
      description: 'Context provider that manages shared tooltip timing and delay behavior for all nested tooltips',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to be wrapped by the provider',
        },
        {
          name: 'delayDuration',
          type: 'number',
          default: '700',
          description: 'Delay in milliseconds before the tooltip opens on hover',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description: 'Duration in milliseconds after closing before the delay applies again to the next tooltip',
        },
        {
          name: 'disableHoverableContent',
          type: 'boolean',
          default: 'false',
          description: 'When true, disables the ability to hover over tooltip content to keep it open',
        },
      ],
    },
    {
      name: 'Tooltip.Root',
      description: 'Root state container for a tooltip instance; manages open/closed state and positioning context',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Trigger and Content components',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state; when provided, component becomes controlled',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when tooltip open state changes',
        },
        {
          name: 'delayDuration',
          type: 'number',
          description: 'Override the Provider\'s delayDuration for this tooltip instance',
        },
        {
          name: 'disableHoverableContent',
          type: 'boolean',
          description: 'Override the Provider\'s disableHoverableContent for this tooltip instance',
        },
      ],
    },
    {
      name: 'Tooltip.Trigger',
      description: 'Button element that triggers tooltip visibility on hover, focus, or click',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'When true, render as the child element instead of a button wrapper',
        },
        {
          name: '...buttonProps',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (onClick, className, disabled, etc.)',
        },
      ],
    },
    {
      name: 'Tooltip.Portal',
      description: 'Renders tooltip content into a portal (typically the DOM root) to avoid stacking context issues',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Tooltip Content component',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal content into; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'When true, Content is mounted to the DOM regardless of open state',
        },
      ],
    },
    {
      name: 'Tooltip.Content',
      description: 'Container for tooltip message; handles positioning, visibility, and floating-ui integration (primitive version)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'When true, render as the child element instead of a div wrapper',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'When true, Content is mounted to the DOM regardless of open state',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'top\'',
          description: 'Preferred position relative to the trigger',
        },
        {
          name: 'sideOffset',
          type: 'number',
          description: 'Distance in pixels between trigger and tooltip content',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          description: 'Alignment of content relative to trigger along the side axis',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset in pixels along the align axis',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          description: 'Distance in pixels to keep arrow from edge of content',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'When true, adjust position to avoid viewport collisions',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Distance in pixels to keep content from viewport edge',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback fired when Escape key is pressed on content',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerEvent) => void',
          description: 'Callback fired when pointer down occurs outside content',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (className, style, etc.)',
        },
      ],
    },
    {
      name: 'Tooltip.Arrow',
      description: 'SVG arrow that points from tooltip content toward the trigger',
      props: [
        {
          name: 'width',
          type: 'number',
          description: 'SVG arrow width in pixels',
        },
        {
          name: 'height',
          type: 'number',
          description: 'SVG arrow height in pixels',
        },
        {
          name: '...svgProps',
          type: 'React.ComponentPropsWithoutRef<\'svg\'>',
          description: 'All standard SVG attributes (className, style, etc.)',
        },
      ],
    },
    {
      name: 'Tooltip.Content (styled)',
      description: 'Enhanced tooltip content with styling variants and convenience props; wraps the primitive',
      props: [
        {
          name: 'variant',
          type: '\'default\' | \'dark\' | \'light\' | \'primary\' | \'secondary\' | \'info\' | \'warning\' | \'error\' | \'success\'',
          default: '\'default\'',
          description: 'Visual style variant',
        },
        {
          name: 'maxWidth',
          type: 'string | number',
          default: '280',
          description: 'Maximum width of content in pixels or any CSS value',
        },
        {
          name: 'arrow',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders an arrow pointing to the trigger',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS class names, merged with variant styles',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Distance between trigger and content in pixels',
        },
        {
          name: '...contentProps',
          type: 'React.ComponentPropsWithoutRef<TooltipPrimitive.Content>',
          description: 'All primitive content props (side, align, forceMount, etc.) and standard div attributes',
        },
      ],
    },
    {
      name: 'Tooltip (shorthand)',
      description: 'Convenience component that combines Provider, Root, Trigger, and Content into a single configurable element',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Element to trigger the tooltip on hover/focus',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Text or content to display inside the tooltip',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'top\'',
          description: 'Position of tooltip relative to trigger',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          description: 'Alignment of tooltip along the side axis',
        },
        {
          name: 'variant',
          type: '\'default\' | \'dark\' | \'light\' | \'primary\' | \'secondary\' | \'info\' | \'warning\' | \'error\' | \'success\'',
          description: 'Visual style variant',
        },
        {
          name: 'maxWidth',
          type: 'string | number',
          default: '280',
          description: 'Maximum width of tooltip content',
        },
        {
          name: 'arrow',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show an arrow pointing to the trigger',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, tooltip is disabled and children render unwrapped',
        },
        {
          name: 'delayDuration',
          type: 'number',
          description: 'Delay in milliseconds before tooltip opens',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          description: 'Duration before delay resets after closing',
        },
        {
          name: '...triggerProps',
          type: 'React.ComponentPropsWithoutRef<Trigger>',
          description: 'All button trigger props (className, onClick, etc.)',
        },
      ],
    },
  ],

  select: [
    {
      name: 'Select.Root',
      description: 'Root wrapper that manages the select state and provides context to child components',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child components (Trigger, Content, etc.)',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled selected value',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Uncontrolled initial value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when selected value changes',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of dropdown',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Uncontrolled initial open state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when dropdown opens or closes',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for RTL support',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Name attribute for form submission (creates hidden select element)',
        },
        {
          name: 'autoComplete',
          type: 'string',
          description: 'HTML autoComplete attribute for the hidden select',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables all interactions with the select',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Marks the field as required for form validation',
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: 'Enables search/filter functionality in dropdown',
        },
        {
          name: 'searchValue',
          type: 'string',
          description: 'Controlled search input value',
        },
        {
          name: 'defaultSearchValue',
          type: 'string',
          default: '\'\'',
          description: 'Uncontrolled initial search value',
        },
        {
          name: 'onSearchValueChange',
          type: '(value: string) => void',
          description: 'Called when search input changes',
        },
        {
          name: 'filterOption',
          type: '(option: SelectFilterOption, searchValue: string) => boolean',
          description: 'Custom filter function for search (defaults to textValue/value matching)',
        },
        {
          name: 'onCreateOption',
          type: '(value: string) => void',
          description: 'Called when user creates a new option via search',
        },
        {
          name: 'createOptionLabel',
          type: 'React.ReactNode | ((value: string) => React.ReactNode)',
          description: 'Label shown for create option in dropdown',
        },
        {
          name: 'resetSearchOnClose',
          type: 'boolean',
          default: 'true',
          description: 'Clear search value when dropdown closes',
        },
      ],
    },
    {
      name: 'Select.Trigger',
      description: 'Button that opens/closes the dropdown, styled with icon and state',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling (styled layer adds default classes)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable this specific trigger (merged with Root.disabled)',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Custom click handler (composed with open handler)',
        },
        {
          name: 'onPointerDown',
          type: '(event: React.PointerEvent) => void',
          description: 'Custom pointer down handler (composed with open handler)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent) => void',
          description: 'Custom key down handler (composed with open handler)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content inside trigger (typically Value + Icon)',
        },
      ],
    },
    {
      name: 'Select.Value',
      description: 'Displays the selected value or placeholder in the trigger',
      props: [
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          description: 'Text/node shown when no value is selected',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom render function for selected value (overrides value text)',
        },
      ],
    },
    {
      name: 'Select.Icon',
      description: 'Dropdown chevron icon displayed in the trigger',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling (default: \'▼\')',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: '\'▼\'',
          description: 'Custom icon content',
        },
      ],
    },
    {
      name: 'Select.SearchInput',
      description: 'Search input field in the dropdown (only renders when searchable=true)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating an input',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text for search input',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Custom change handler (composed with search update)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent) => void',
          description: 'Custom key down handler (composed with navigation/create)',
        },
      ],
    },
    {
      name: 'Select.Portal',
      description: 'Portals the dropdown content to document body (for z-index/overflow)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements to portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Target DOM element for portal (defaults to document.body)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Always render content in DOM (even when closed)',
        },
      ],
    },
    {
      name: 'Select.Content',
      description: 'Dropdown content container with positioning and animations (styled wrapper)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'position',
          type: '\'item-aligned\' | \'popper\'',
          default: '\'popper\'',
          description: 'Positioning strategy',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'bottom\'',
          description: 'Preferred side to place content relative to trigger',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'Distance from trigger to content',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'start\'',
          description: 'Alignment relative to trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset alignment by this distance',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'Auto-flip side when hitting viewport boundaries',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Elements to check for collisions',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding from collision boundary',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'CSS positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Keep content sticky when scrolling',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide content when trigger is hidden',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'How often to recalculate position',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Called when content closes (focus returns to trigger)',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Called when Escape key pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: Event) => void',
          description: 'Called when pointer down outside content',
        },
        {
          name: 'options',
          type: 'SelectOption[]',
          description: 'Array of options (styled wrapper convenience, renders with Options component)',
        },
        {
          name: 'optionHeight',
          type: 'number',
          default: '36',
          description: 'Height of each option for virtualization',
        },
        {
          name: 'optionOverscan',
          type: 'number',
          default: '6',
          description: 'Number of options to render outside visible area',
        },
        {
          name: 'optionEmptyMessage',
          type: 'React.ReactNode',
          description: 'Message shown when no options match search',
        },
        {
          name: 'renderOption',
          type: '(option: SelectOption) => React.ReactNode',
          description: 'Custom render function for each option',
        },
        {
          name: 'showCreateItem',
          type: 'boolean',
          default: 'true',
          description: 'Show \'Create\' option when onCreateOption is provided',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Portal container target',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content in DOM',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom child content (alternative to options prop)',
        },
      ],
    },
    {
      name: 'Select.Item',
      description: 'Individual selectable option in the dropdown',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique value for this option (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Prevent selection of this option',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text used for search filtering (extracted from children if not provided)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Item label/content (typically ItemText and ItemIndicator)',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Custom click handler (composed with selection logic)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent) => void',
          description: 'Custom pointer move handler (composed with focus)',
        },
        {
          name: 'onPointerLeave',
          type: '(event: React.PointerEvent) => void',
          description: 'Custom pointer leave handler',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent) => void',
          description: 'Custom key down handler (composed with arrow/enter navigation)',
        },
        {
          name: 'onFocus',
          type: '(event: React.FocusEvent) => void',
          description: 'Custom focus handler',
        },
      ],
    },
    {
      name: 'Select.ItemText',
      description: 'Text content of a select item (displays in both item and value)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Item text content',
        },
      ],
    },
    {
      name: 'Select.ItemIndicator',
      description: 'Checkmark or custom indicator shown when item is selected',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom indicator content',
        },
      ],
    },
    {
      name: 'Select.CreateItem',
      description: 'Option to create a new item when searchable and onCreateOption provided',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Override the created value (defaults to search input)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode | ((value: string) => React.ReactNode)',
          description: 'Custom label or function that receives search value',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Custom click handler (composed with create logic)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent) => void',
          description: 'Custom pointer move handler',
        },
        {
          name: 'onPointerLeave',
          type: '(event: React.PointerEvent) => void',
          description: 'Custom pointer leave handler',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent) => void',
          description: 'Custom key down handler (composed with navigation/create)',
        },
      ],
    },
    {
      name: 'Select.Options',
      description: 'Virtualized options container with automatic rendering of SelectOption array',
      props: [
        {
          name: 'options',
          type: 'SelectOption[]',
          description: 'Array of options to render (required)',
        },
        {
          name: 'itemHeight',
          type: 'number',
          default: '36',
          description: 'Height of each option for virtualization',
        },
        {
          name: 'overscan',
          type: 'number',
          default: '6',
          description: 'Number of items to render outside visible area',
        },
        {
          name: 'visibleItemCount',
          type: 'number',
          default: '8',
          description: 'Number of items visible at once for fallback height',
        },
        {
          name: 'emptyMessage',
          type: 'React.ReactNode',
          default: '\'No options found.\'',
          description: 'Message when no options match filter',
        },
        {
          name: 'itemClassName',
          type: 'string',
          description: 'CSS class added to each rendered Item',
        },
        {
          name: 'itemTextClassName',
          type: 'string',
          description: 'CSS class added to each ItemText',
        },
        {
          name: 'itemIndicatorClassName',
          type: 'string',
          description: 'CSS class added to each ItemIndicator',
        },
        {
          name: 'renderOption',
          type: '(option: SelectOption) => React.ReactNode',
          description: 'Custom render function for option label',
        },
        {
          name: 'renderItemIndicator',
          type: '(option: SelectOption) => React.ReactNode',
          description: 'Custom render function for selection indicator',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Rendered option items (auto-populated from options prop)',
        },
      ],
    },
    {
      name: 'Select.Group',
      description: 'Logical grouping of select items with optional label',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Group contents (Label, Items, etc.)',
        },
      ],
    },
    {
      name: 'Select.Label',
      description: 'Label/header for a select group',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Label text',
        },
      ],
    },
    {
      name: 'Select.Separator',
      description: 'Visual divider between groups or items',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Separator content',
        },
      ],
    },
    {
      name: 'Select.Viewport',
      description: 'Scrollable container for options (used with Content)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props onto child element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for custom styling',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Options/content to display',
        },
      ],
    },
  ],

  'multi-select': [
    {
      name: 'Root',
      description: 'The root compound component that provides context and state management for the multi-select',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The child components (Trigger, Content, etc.)',
        },
        {
          name: 'value',
          type: 'string[]',
          description: 'Controlled value of selected items',
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          default: '[]',
          description: 'Initial selected values when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: 'Callback fired when selected values change',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the content panel',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when open state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the entire multi-select',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Marks the input as required',
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: 'Enables search input to filter options',
        },
        {
          name: 'searchValue',
          type: 'string',
          description: 'Controlled search input value',
        },
        {
          name: 'defaultSearchValue',
          type: 'string',
          default: '\'\'',
          description: 'Initial search value when uncontrolled',
        },
        {
          name: 'onSearchValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when search input changes',
        },
        {
          name: 'filterOption',
          type: '(option: MultiSelectFilterOption, searchValue: string) => boolean',
          description: 'Custom filter function for search; defaults to text/value matching',
        },
        {
          name: 'onCreateOption',
          type: '(value: string) => void',
          description: 'Callback when a new option is created from search input',
        },
        {
          name: 'createOptionLabel',
          type: 'React.ReactNode | ((value: string) => React.ReactNode)',
          description: 'Label or function returning label for the create option item',
        },
        {
          name: 'resetSearchOnClose',
          type: 'boolean',
          default: 'true',
          description: 'Clear search input when content closes',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction',
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute for form submission',
        },
        {
          name: 'autoComplete',
          type: 'string',
          description: 'HTML autoComplete attribute',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that opens/closes the content panel',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Trigger content (typically Value and Icon)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the trigger button',
        },
        {
          name: 'onClick',
          type: 'React.MouseEventHandler<HTMLButtonElement>',
          description: 'Click event handler',
        },
        {
          name: 'onPointerDown',
          type: 'React.PointerEventHandler<HTMLButtonElement>',
          description: 'Pointer down event handler',
        },
        {
          name: 'onKeyDown',
          type: 'React.KeyboardEventHandler<HTMLButtonElement>',
          description: 'Keyboard event handler',
        },
      ],
    },
    {
      name: 'Value',
      description: 'Displays selected items or placeholder text in the trigger',
      props: [
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          description: 'Text shown when no items selected (primitives only)',
        },
        {
          name: 'options',
          type: 'MultiSelectOption[]',
          description: 'Array of options to map selected values (primitives only)',
        },
        {
          name: 'separator',
          type: 'React.ReactNode',
          default: '\', \'',
          description: 'Separator between items when rendering text (primitives only)',
        },
        {
          name: 'children',
          type: 'React.ReactNode | ((selected: MultiSelectSelectedOption[]) => React.ReactNode)',
          description: 'Custom render function or static content',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'itemClassName',
          type: 'string',
          description: 'CSS class names for each selected item badge (styled only)',
        },
        {
          name: 'overflowClassName',
          type: 'string',
          description: 'CSS class names for overflow indicator (styled only)',
        },
        {
          name: 'maxVisible',
          type: 'number',
          description: 'Maximum visible items before showing +N overflow (styled only)',
        },
      ],
    },
    {
      name: 'Icon',
      description: 'Dropdown icon indicator shown in trigger',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: '\'▼\'',
          description: 'Icon content (text or SVG)',
        },
      ],
    },
    {
      name: 'SearchInput',
      description: 'Search input field to filter options; only renders when Root searchable=true',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of input',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '\'Search options...\'',
          description: 'Input placeholder text (styled only)',
        },
        {
          name: 'aria-label',
          type: 'string',
          default: '\'Search options\'',
          description: 'Accessibility label',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the search input',
        },
        {
          name: 'onChange',
          type: 'React.ChangeEventHandler<HTMLInputElement>',
          description: 'Change event handler',
        },
        {
          name: 'onKeyDown',
          type: 'React.KeyboardEventHandler<HTMLInputElement>',
          description: 'Keyboard event handler',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Container for options; renders as portal with Popper positioning',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount the content even when closed',
        },
        {
          name: 'position',
          type: '\'item-aligned\' | \'popper\'',
          default: '\'popper\'',
          description: 'Positioning strategy',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'bottom\'',
          description: 'Preferred side for popper positioning',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'Distance from trigger when using popper',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'start\'',
          description: 'Alignment relative to trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Fine-tune alignment distance',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'Reposition to avoid viewport collisions',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Space to maintain from viewport edges',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback when content closes; focus normally returns to trigger',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when Escape key pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: Event) => void',
          description: 'Callback when pointer down outside content',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Option items (Item, Group, etc.) or custom content',
        },
        {
          name: 'options',
          type: 'MultiSelectOption[]',
          description: 'Array of options to virtualize; auto-renders with Options component (styled only)',
        },
        {
          name: 'optionHeight',
          type: 'number',
          default: '36',
          description: 'Height of each virtualized option in pixels (styled only)',
        },
        {
          name: 'optionOverscan',
          type: 'number',
          default: '6',
          description: 'Extra items to render outside viewport (styled only)',
        },
        {
          name: 'optionEmptyMessage',
          type: 'React.ReactNode',
          description: 'Message shown when no options match search (styled only)',
        },
        {
          name: 'renderOption',
          type: '(option: MultiSelectOption) => React.ReactNode',
          description: 'Custom render function for each option (styled only)',
        },
        {
          name: 'showCreateItem',
          type: 'boolean',
          default: 'true',
          description: 'Show create option item; requires Root onCreateOption (styled only)',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual option item in the list',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique value for this option',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables selection of this item',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text used for search filtering; defaults to extracted text from children',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Item content/label',
        },
        {
          name: 'onClick',
          type: 'React.MouseEventHandler<HTMLDivElement>',
          description: 'Click event handler',
        },
        {
          name: 'onPointerMove',
          type: 'React.PointerEventHandler<HTMLDivElement>',
          description: 'Pointer move event handler',
        },
        {
          name: 'onPointerLeave',
          type: 'React.PointerEventHandler<HTMLDivElement>',
          description: 'Pointer leave event handler',
        },
        {
          name: 'onKeyDown',
          type: 'React.KeyboardEventHandler<HTMLDivElement>',
          description: 'Keyboard event handler',
        },
      ],
    },
    {
      name: 'ItemText',
      description: 'Text label container within Item; auto-managed in styled version',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Item text content',
        },
      ],
    },
    {
      name: 'ItemIndicator',
      description: 'Checkmark or selection indicator shown in selected items; auto-managed in styled version',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Indicator icon content; only renders when item is selected',
        },
      ],
    },
    {
      name: 'CreateItem',
      description: 'Dynamic item for creating new options from search input; only renders when searchable and onCreateOption provided',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Override the create item value (defaults to current search value)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode | ((value: string) => React.ReactNode)',
          description: 'Custom render or text; receives search value; defaults to \'Create "value"\'',
        },
        {
          name: 'onClick',
          type: 'React.MouseEventHandler<HTMLDivElement>',
          description: 'Click event handler',
        },
        {
          name: 'onPointerMove',
          type: 'React.PointerEventHandler<HTMLDivElement>',
          description: 'Pointer move event handler',
        },
        {
          name: 'onPointerLeave',
          type: 'React.PointerEventHandler<HTMLDivElement>',
          description: 'Pointer leave event handler',
        },
        {
          name: 'onKeyDown',
          type: 'React.KeyboardEventHandler<HTMLDivElement>',
          description: 'Keyboard event handler',
        },
      ],
    },
    {
      name: 'Options',
      description: 'Virtualized container for options with automatic rendering from array',
      props: [
        {
          name: 'options',
          type: 'MultiSelectOption[]',
          description: 'Array of options to virtualize and render',
        },
        {
          name: 'itemHeight',
          type: 'number',
          default: '36',
          description: 'Height of each option item in pixels',
        },
        {
          name: 'overscan',
          type: 'number',
          default: '6',
          description: 'Extra items to render outside visible viewport',
        },
        {
          name: 'visibleItemCount',
          type: 'number',
          default: '8',
          description: 'Estimated visible items for height calculation',
        },
        {
          name: 'emptyMessage',
          type: 'React.ReactNode',
          default: '\'No options found.\'',
          description: 'Message shown when no options match search',
        },
        {
          name: 'itemClassName',
          type: 'string',
          description: 'CSS class names applied to each Item',
        },
        {
          name: 'itemTextClassName',
          type: 'string',
          description: 'CSS class names applied to each ItemText',
        },
        {
          name: 'itemIndicatorClassName',
          type: 'string',
          description: 'CSS class names applied to each ItemIndicator',
        },
        {
          name: 'renderOption',
          type: '(option: MultiSelectOption) => React.ReactNode',
          description: 'Custom render function for option content',
        },
        {
          name: 'renderItemIndicator',
          type: '(option: MultiSelectOption) => React.ReactNode',
          description: 'Custom render function for selection indicator',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Container for grouped options with optional label',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Label, items, and other content',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Label for grouped options',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Label text or content',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual divider between groups',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal container for rendering content outside DOM hierarchy (primitives only)',
      props: [
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM node to portal content into; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount content even when closed',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Portal content (usually Content component)',
        },
      ],
    },
    {
      name: 'Viewport',
      description: 'Scrollable container for options (primitives only)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Option items and content',
        },
      ],
    },
  ],

  switch: [
    {
      name: 'Switch',
      description: 'Accessible switch/toggle component with controlled and uncontrolled modes, styled with Tailwind variants for size and color.',
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: 'Controlled checked state of the switch',
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: 'Initial checked state (uncontrolled mode)',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Callback fired when the checked state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, the switch is disabled and cannot be toggled',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'When true, indicates the switch is required in a form',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Form name attribute; creates a hidden input for form submission',
        },
        {
          name: 'value',
          type: 'string',
          default: '\'on\'',
          description: 'Form value when the switch is checked',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child (Slot pattern); merges props onto the first child element',
        },
        {
          name: 'size',
          type: '\'sm\' | \'md\' | \'lg\'',
          default: '\'md\'',
          description: 'Switch size variant (styled layer)',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'Switch color variant when checked (styled layer)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names merged with variant styles',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Native click handler (merged with toggle logic)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLButtonElement>',
          description: 'Forward ref to the underlying button element',
        },
      ],
    },
  ],

  checkbox: [
    {
      name: 'Checkbox',
      description: 'The main checkbox component wrapper that combines the headless primitive with styled styling and icon indicators.',
      props: [
        {
          name: 'checked',
          type: 'boolean | \'indeterminate\'',
          description: 'The controlled checked state of the checkbox.',
        },
        {
          name: 'defaultChecked',
          type: 'boolean | \'indeterminate\'',
          description: 'The initial checked state when uncontrolled.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean | \'indeterminate\') => void',
          description: 'Callback fired when the checked state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the checkbox is disabled and cannot be interacted with.',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Whether the checkbox is required in a form.',
        },
        {
          name: 'name',
          type: 'string',
          description: 'The name attribute for form submission; creates a hidden input if provided.',
        },
        {
          name: 'value',
          type: 'string',
          default: '\'on\'',
          description: 'The value submitted in the form when the checkbox is checked.',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'The color variant controlling the checked/indeterminate state background and border.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass a custom element as the checkbox instead of rendering the default button.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with the default styling.',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback fired on click; toggles checked state unless disabled.',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLButtonElement>) => void',
          description: 'Callback fired on key down; Space toggles the checkbox, Enter is prevented.',
        },
      ],
    },
    {
      name: 'CheckboxIndicator',
      description: 'A compound component that displays the check or indeterminate icon inside the checkbox, conditionally rendered based on state.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'When true, the indicator is always rendered; when false, it only renders when checked is truthy.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass a custom element to replace the default span indicator container.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with default animation and layout styles.',
        },
      ],
    },
  ],

  accordion: [
    {
      name: 'Accordion.Root',
      description: 'Root accordion container; supports single or multiple open items',
      props: [
        {
          name: 'type',
          type: '\'single\' | \'multiple\'',
          description: 'Controls whether one or multiple items can be open at once',
        },
        {
          name: 'value',
          type: 'string | string[] (depends on type)',
          description: 'Controlled value; for \'single\' type is string, for \'multiple\' is string[]',
        },
        {
          name: 'defaultValue',
          type: 'string | string[] (depends on type)',
          description: 'Initial uncontrolled value; for \'single\' is string, for \'multiple\' is string[]',
        },
        {
          name: 'onValueChange',
          type: '(value: string | string[]) => void',
          description: 'Fires when value changes; callback signature depends on type prop',
        },
        {
          name: 'collapsible',
          type: 'boolean',
          default: 'false',
          description: 'For \'single\' type only; if true, allows the open item to be collapsed',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables all accordion items',
        },
        {
          name: 'orientation',
          type: '\'vertical\' | \'horizontal\'',
          default: '\'vertical\'',
          description: 'Keyboard navigation and layout direction',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for RTL support',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix asChild pattern)',
        },
        {
          name: 'variant',
          type: '\'default\' | \'bordered\' | \'separated\' | \'flushed\' | \'ghost\'',
          default: '\'default\'',
          description: 'Visual variant (styled layer only)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Accordion.Item',
      description: 'Individual accordion item wrapper',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique identifier for the item; used to match Root.value',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables this specific item (can override Root.disabled)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix asChild pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Accordion.Header',
      description: 'Semantic heading element wrapping the trigger; renders as h3',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix asChild pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Accordion.Trigger',
      description: 'Clickable button to toggle item open/closed; includes chevron icon',
      props: [
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Custom icon element; replaces default ChevronDown if provided',
        },
        {
          name: 'iconPosition',
          type: '\'left\' | \'right\'',
          default: '\'right\'',
          description: 'Position of the icon relative to trigger text (styled layer only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix asChild pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Accordion.Content',
      description: 'Collapsible content region for accordion item',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Keep DOM mounted even when closed (for animation control)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix asChild pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
  ],

  tabs: [
    {
      name: 'Tabs.Root',
      description: 'Root container for the tabs component. Manages controlled/uncontrolled tab state and provides context to child components.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the active tab',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default value when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when tab value changes',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Layout direction of tabs',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction; affects focus navigation',
        },
        {
          name: 'activationMode',
          type: '\'automatic\' | \'manual\'',
          default: '\'automatic\'',
          description: 'Focus behavior: \'automatic\' activates on focus, \'manual\' requires Enter/Space',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix Primitive pattern)',
        },
        {
          name: 'variant',
          type: '\'default\' | \'underline\' | \'pills\' | \'enclosed\'',
          default: '\'default\'',
          description: 'Visual style variant (styled layer only)',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'Active tab color theme; applies to underline and pills variants (styled layer only)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Tabs.List',
      description: 'Container for tab triggers. Wraps TabsPrimitive.List with styling and layout controls.',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Wrap focus navigation at list edges',
        },
        {
          name: 'scrollable',
          type: 'boolean',
          default: 'false',
          description: 'Enable horizontal scrolling with hidden scrollbar (styled layer only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix Primitive pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merges with variant styles)',
        },
      ],
    },
    {
      name: 'Tabs.Trigger',
      description: 'Individual tab button. Manages selection, disabled state, and keyboard/mouse interactions.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique identifier for this tab (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable tab selection and interactions',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix Primitive pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merges with variant styles)',
        },
      ],
    },
    {
      name: 'Tabs.Content',
      description: 'Content panel for a tab. Only renders when tab is active (unless forceMount is true).',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Tab value this content belongs to (required)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Always render content in DOM even when inactive',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix Primitive pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merges with animation styles)',
        },
      ],
    },
  ],

  slider: [
    {
      name: 'Slider',
      description: 'Styled slider component (main export from styled package, wraps Slider.Root with color theming)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (from underlying Primitive)',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Form field name for hidden input(s)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable slider interaction and keyboard navigation',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Slider direction',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction (affects horizontal slider direction)',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum slider value',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum slider value',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Step increment for keyboard/pointer movement',
        },
        {
          name: 'minStepsBetweenThumbs',
          type: 'number',
          default: '0',
          description: 'Minimum gap between multiple thumbs in steps',
        },
        {
          name: 'value',
          type: 'number[]',
          description: 'Controlled slider value(s)',
        },
        {
          name: 'defaultValue',
          type: 'number[]',
          description: 'Initial uncontrolled value(s); defaults to [min] if not provided',
        },
        {
          name: 'onValueChange',
          type: '(value: number[]) => void',
          description: 'Callback fired continuously while dragging or stepping',
        },
        {
          name: 'onValueCommit',
          type: '(value: number[]) => void',
          description: 'Callback fired when drag or keyboard interaction ends',
        },
        {
          name: 'inverted',
          type: 'boolean',
          default: 'false',
          description: 'Reverse the slider direction (min/max swap)',
        },
        {
          name: 'thumbCount',
          type: 'number',
          description: 'Number of thumbs to render; inferred from value/defaultValue length if omitted',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'Thumb border and range fill color variant',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for root element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward ref to root span element',
        },
      ],
    },
    {
      name: 'Slider.Root',
      description: 'Root slider container (primitive compound component, use directly for headless slider)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Form field name for hidden input(s)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable slider interaction and keyboard navigation',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Slider direction',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction (affects horizontal slider direction)',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum slider value',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum slider value',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Step increment for keyboard/pointer movement',
        },
        {
          name: 'minStepsBetweenThumbs',
          type: 'number',
          default: '0',
          description: 'Smallest gap between thumbs in multi-thumb sliders (in steps)',
        },
        {
          name: 'value',
          type: 'number[]',
          description: 'Controlled slider value(s)',
        },
        {
          name: 'defaultValue',
          type: 'number[]',
          description: 'Initial uncontrolled value(s); defaults to [min] if not provided',
        },
        {
          name: 'onValueChange',
          type: '(value: number[]) => void',
          description: 'Callback fired continuously while dragging or stepping',
        },
        {
          name: 'onValueCommit',
          type: '(value: number[]) => void',
          description: 'Callback fired when drag or keyboard interaction ends',
        },
        {
          name: 'inverted',
          type: 'boolean',
          default: 'false',
          description: 'Reverse the slider direction (min/max swap)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for root element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward ref to root span element',
        },
      ],
    },
    {
      name: 'Slider.Track',
      description: 'Slider background track container',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for track element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward ref to track span element',
        },
      ],
    },
    {
      name: 'Slider.Range',
      description: 'Colored fill range between min and max values (or between multiple thumbs)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for range element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward ref to range span element',
        },
      ],
    },
    {
      name: 'Slider.Thumb',
      description: 'Draggable thumb handle for slider value (rendered multiple times for multi-value sliders)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'aria-label',
          type: 'string',
          description: 'Accessible label; auto-generated as \'Minimum\'/\'Maximum\' for 2-thumb sliders, \'Value N of M\' for multi-thumb',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for thumb element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward ref to thumb span element',
        },
      ],
    },
  ],

  avatar: [
    {
      name: 'Avatar.Root',
      description: 'Container for the avatar with optional status indicator',
      props: [
        {
          name: 'size',
          type: '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\' | \'2xl\'',
          default: '\'md\'',
          description: 'Size variant of the avatar',
        },
        {
          name: 'status',
          type: '\'online\' | \'offline\' | \'busy\' | \'away\'',
          description: 'Optional status indicator dot to show online/offline/busy/away state',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders as child component instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for custom styling',
        },
      ],
    },
    {
      name: 'Avatar.Image',
      description: 'Image element that displays when loaded; controlled by loading status',
      props: [
        {
          name: 'src',
          type: 'string',
          description: 'Image source URL',
        },
        {
          name: 'onLoadingStatusChange',
          type: '(status: \'idle\' | \'loading\' | \'loaded\' | \'error\') => void',
          description: 'Callback fired when image loading status changes',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders as child component instead of img',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for custom styling (inherits aspect-square h-full w-full object-cover)',
        },
      ],
    },
    {
      name: 'Avatar.Fallback',
      description: 'Fallback content shown while image loads or if it fails to load',
      props: [
        {
          name: 'delayMs',
          type: 'number',
          description: 'Delay in milliseconds before the fallback is shown to avoid flicker on fast image loads',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders as child component instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for custom styling (inherits bg-muted text-muted-foreground flex items-center justify-center rounded-full font-medium uppercase)',
        },
      ],
    },
    {
      name: 'Avatar.Group',
      description: 'Container for displaying multiple avatars with overflow count',
      props: [
        {
          name: 'max',
          type: 'number',
          description: 'Maximum number of avatars to show before displaying overflow count',
        },
        {
          name: 'size',
          type: '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\' | \'2xl\'',
          default: '\'md\'',
          description: 'Size variant applied to all child avatars and overflow indicator',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for custom styling',
        },
      ],
    },
  ],

  badge: [
    {
      name: 'Badge',
      description: 'A styled badge component with variant styling, optional dot indicator, icons, and removable functionality',
      props: [
        {
          name: 'variant',
          type: '\'default\' | \'secondary\' | \'destructive\' | \'outline\' | \'success\' | \'warning\' | \'info\' | \'error\'',
          default: '\'default\'',
          description: 'Badge visual style variant',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\'',
          description: 'Color scheme when combined with variant; affects text and border colors',
        },
        {
          name: 'size',
          type: '\'sm\' | \'md\' | \'lg\'',
          default: '\'md\'',
          description: 'Badge size with padding and text size adjustments',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders children as the component element (Slot composition)',
        },
        {
          name: 'dot',
          type: 'boolean',
          description: 'If true, renders a status dot before label text',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Icon element shown before label text',
        },
        {
          name: 'removable',
          type: 'boolean',
          description: 'If true, shows a remove button that calls onRemove when clicked',
        },
        {
          name: 'onRemove',
          type: '(e: React.MouseEvent) => void',
          description: 'Callback fired when remove button is clicked',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Badge label text or content',
        },
      ],
    },
  ],

  card: [
    {
      name: 'Root',
      description: 'Main card container. Renders a div with border, rounded corners, background styling, shadow, and transition effects. Supports all standard HTML div attributes plus forwardRef.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-smooth)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying div element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          default: 'undefined',
          description: 'All standard HTML div attributes (id, data-*, aria-*, onClick, onMouseEnter, style, etc.)',
        },
      ],
    },
    {
      name: 'Header',
      description: 'Card header section. Renders a div with flex layout, vertical direction, small gap, and padding. Typically contains Title and Description.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (flex flex-col gap-1.5 p-6)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying div element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          default: 'undefined',
          description: 'All standard HTML div attributes (id, data-*, aria-*, onClick, onMouseEnter, style, etc.)',
        },
      ],
    },
    {
      name: 'Title',
      description: 'Card title heading. Renders an h3 with large font size, semibold weight, and tight tracking.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (text-lg font-semibold leading-none tracking-tight)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLHeadingElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying h3 element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLHeadingElement>',
          default: 'undefined',
          description: 'All standard HTML heading attributes (id, data-*, aria-*, onClick, style, etc.)',
        },
      ],
    },
    {
      name: 'Description',
      description: 'Card description text. Renders a paragraph with small font size and muted foreground color.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (text-sm text-muted-foreground)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLParagraphElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying p element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLParagraphElement>',
          default: 'undefined',
          description: 'All standard HTML paragraph attributes (id, data-*, aria-*, onClick, style, etc.)',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Card main content area. Renders a div with vertical padding (6 units bottom, 0 top) for spacing after header.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (p-6 pt-0)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying div element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          default: 'undefined',
          description: 'All standard HTML div attributes (id, data-*, aria-*, onClick, style, etc.)',
        },
      ],
    },
    {
      name: 'Footer',
      description: 'Card footer section. Renders a div with flexbox layout, centered items, small gap, top border, and padding.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Merges with default styling (flex items-center gap-2 border-t border-border/50 p-6 pt-4)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders as Primitive.div (headless primitive mode only applies to primitives package)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          default: 'undefined',
          description: 'Forward reference to the underlying div element',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          default: 'undefined',
          description: 'All standard HTML div attributes (id, data-*, aria-*, onClick, style, etc.)',
        },
      ],
    },
  ],

  alert: [
    {
      name: 'Alert',
      description: 'Convenience compound alert component with built-in icon, title, description, and optional close button.',
      props: [
        {
          name: 'variant',
          type: '\'default\' | \'success\' | \'warning\' | \'destructive\' | \'info\' | \'error\'',
          default: '\'default\'',
          description: 'Visual style variant of the alert',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\'',
          description: 'Color scheme for the alert (used in compound variants)',
        },
        {
          name: 'filled',
          type: 'boolean',
          description: 'Whether the alert background is filled (used with color variant)',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Icon/element to display on the left side of the alert',
        },
        {
          name: 'title',
          type: 'React.ReactNode',
          description: 'Title text or element to display in the alert',
        },
        {
          name: 'description',
          type: 'React.ReactNode',
          description: 'Description text or element to display below title',
        },
        {
          name: 'closeable',
          type: 'boolean',
          description: 'Whether to display a close button (top-right)',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Callback fired when close button is clicked; also triggers close button display',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content rendered inside the alert (after description if provided)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward reference to underlying div element',
        },
      ],
    },
    {
      name: 'Alert.Root',
      description: 'Base alert container supporting variant/color styling.',
      props: [
        {
          name: 'variant',
          type: '\'default\' | \'success\' | \'warning\' | \'destructive\' | \'info\' | \'error\'',
          default: '\'default\'',
          description: 'Visual style variant of the alert',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\'',
          description: 'Color scheme for the alert (used in compound variants)',
        },
        {
          name: 'filled',
          type: 'boolean',
          description: 'Whether the alert background is filled (used with color variant)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Callback for close action (destructured, does not reach DOM)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content rendered inside the alert',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward reference to underlying div element',
        },
      ],
    },
    {
      name: 'Alert.Icon',
      description: 'Container for alert icon or icon element, positioned on the left with spacing.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Icon element or SVG to display',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forward reference to underlying span element',
        },
      ],
    },
    {
      name: 'Alert.Content',
      description: 'Wrapper div for alert text content (title, description, children).',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to display inside the wrapper',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward reference to underlying div element',
        },
      ],
    },
    {
      name: 'Alert.Title',
      description: 'Heading element for alert title text.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Title text or element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLHeadingElement>',
          description: 'Forward reference to underlying h5 element',
        },
      ],
    },
    {
      name: 'Alert.Description',
      description: 'Container for alert description text, with reduced opacity.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Description text or element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward reference to underlying div element',
        },
      ],
    },
    {
      name: 'Alert.Close',
      description: 'Close button for dismissing the alert (positioned top-right).',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'onClick',
          type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback fired when close button is clicked',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLButtonElement>',
          description: 'Forward reference to underlying button element',
        },
      ],
    },
  ],

  input: [
    {
      name: 'Input',
      description: 'Plain styled text input with support for size variants, disabled state, and invalid aria states. Supports all standard HTML input attributes except \'size\' (which is overridden as a variant prop).',
      props: [
        {
          name: 'size',
          type: '\'sm\' | \'md\' | \'lg\'',
          default: '\'md\'',
          description: 'Visual size variant controlling height, padding, and font size',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with variant styles',
        },
        {
          name: 'type',
          type: 'string',
          description: 'HTML input type (e.g. \'text\', \'email\', \'password\', \'number\', \'file\')',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value (requires onChange handler)',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default uncontrolled value',
        },
        {
          name: 'onChange',
          type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback fired when input value changes',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when input is empty',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the input and applies disabled styling',
        },
        {
          name: 'aria-invalid',
          type: 'boolean',
          description: 'Marks input as invalid for ARIA accessibility and applies invalid styling',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Marks input as required',
        },
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the input',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Name attribute for form submission',
        },
        {
          name: 'autoComplete',
          type: 'string',
          description: 'HTML autocomplete attribute value',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Makes input read-only',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Forward ref to underlying HTML input element',
        },
      ],
    },
    {
      name: 'InputGroup',
      description: 'Wrapper component that arranges an input with optional icon/element slots and left/right addon text (like domain prefixes/suffixes). Composes with Input children.',
      props: [
        {
          name: 'startElement',
          type: 'React.ReactNode',
          description: 'Icon or element shown inside the input on the left side',
        },
        {
          name: 'endElement',
          type: 'React.ReactNode',
          description: 'Icon or element shown inside the input on the right side',
        },
        {
          name: 'leftAddon',
          type: 'React.ReactNode',
          description: 'Text or element attached outside the input on the left (e.g. \'https://\')',
        },
        {
          name: 'rightAddon',
          type: 'React.ReactNode',
          description: 'Text or element attached outside the input on the right (e.g. \'.com\')',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the wrapper div',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Input element(s) to wrap; typically an Input component',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to the wrapper div element',
        },
      ],
    },
    {
      name: 'ClearableInput',
      description: 'Input variant that includes a built-in clear button (X icon) shown when the input has a value. Extends Input props.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled input value',
        },
        {
          name: 'onChange',
          type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback fired when input value changes',
        },
        {
          name: 'onClear',
          type: '() => void',
          description: 'Callback fired when clear button is clicked',
        },
        {
          name: 'clearIcon',
          type: 'React.ReactNode',
          description: 'Custom icon element for the clear button; defaults to an X icon',
        },
        {
          name: 'size',
          type: '\'sm\' | \'md\' | \'lg\'',
          default: '\'md\'',
          description: 'Visual size variant controlling height, padding, and font size',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with variant styles',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default uncontrolled value',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when input is empty',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the input and applies disabled styling',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Forward ref to underlying HTML input element',
        },
      ],
    },
  ],

  progress: [
    {
      name: 'Progress',
      description: 'Root progress bar component with styled variants; wraps Progress.Root from primitives and renders the indicator inside',
      props: [
        {
          name: 'value',
          type: 'number | null',
          description: 'Current progress value (0 to max). Pass `null` or `undefined` for indeterminate state. Defaults to null.',
        },
        {
          name: 'max',
          type: 'number',
          description: 'Maximum value for the progress bar. Defaults to 100.',
        },
        {
          name: 'getValueLabel',
          type: '(value: number, max: number) => string',
          description: 'Custom function to return localized label announced by screen readers. Defaults to percentage format.',
        },
        {
          name: 'size',
          type: '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\'',
          default: '\'md\'',
          description: 'Track height variant; xs=h-1, sm=h-1.5, md=h-2, lg=h-3, xl=h-4',
        },
        {
          name: 'color',
          type: '\'primary\' | \'success\' | \'warning\' | \'destructive\' | \'error\' | \'info\' | \'secondary\'',
          default: '\'primary\'',
          description: 'Color of the progress indicator fill',
        },
        {
          name: 'striped',
          type: 'boolean',
          default: 'false',
          description: 'Add diagonal stripe pattern to the indicator',
        },
        {
          name: 'animated',
          type: 'boolean',
          default: 'false',
          description: 'Animate the stripes moving left to right; works with or without striped=true',
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          default: 'false',
          description: 'Override value with indeterminate animated state (1/3 width pulsing)',
        },
        {
          name: 'showLabel',
          type: 'boolean',
          default: 'false',
          description: 'Display percentage text centered inside the bar (useful for larger sizes)',
        },
        {
          name: 'indicatorClassName',
          type: 'string',
          description: 'Additional CSS classes to apply to the inner indicator element',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the track container',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child of another component (from Primitive)',
        },
      ],
    },
  ],

  toast: [
    {
      name: 'Provider',
      description: 'Toast context provider — wraps your app to enable toast functionality',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The app content that can access toast context',
        },
        {
          name: 'label',
          type: 'string',
          default: '\'Notifications\'',
          description: 'Aria label for the toast region',
        },
        {
          name: 'duration',
          type: 'number',
          default: '5000',
          description: 'Time in ms to auto-dismiss toasts; set to Infinity to disable',
        },
        {
          name: 'swipeDirection',
          type: '\'up\' | \'down\' | \'left\' | \'right\'',
          default: '\'right\'',
          description: 'Direction users can swipe to dismiss toasts',
        },
        {
          name: 'swipeThreshold',
          type: 'number',
          default: '50',
          description: 'Distance in px to consider a swipe a dismissal',
        },
      ],
    },
    {
      name: 'Viewport',
      description: 'Container that holds and positions all toasts; automatically styled in the styled layer',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of creating wrapper',
        },
        {
          name: 'hotkey',
          type: 'string[]',
          default: '[\'F8\']',
          description: 'Keyboard keys to focus the toast viewport',
        },
        {
          name: 'label',
          type: 'string',
          default: '\'{hotkey} hotkey to focus toasts\'',
          description: 'Aria label for the toast list',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (styled layer provides sensible defaults)',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'ol\'>',
          description: 'All native ol HTML attributes (style, role, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Root',
      description: 'Individual toast component — represents a single toast notification',
      props: [
        {
          name: 'type',
          type: '\'foreground\' | \'background\'',
          default: '\'foreground\'',
          description: 'Aria-live priority: foreground=assertive, background=polite',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled: whether the toast is visible',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'true',
          description: 'Uncontrolled: initial visibility state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Fired when toast visibility changes',
        },
        {
          name: 'duration',
          type: 'number',
          description: 'Overrides Provider duration for this toast; Infinity to keep open',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Always render in DOM (even when closed) for animation control',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Fired when Escape key is pressed on focused toast',
        },
        {
          name: 'onPause',
          type: '() => void',
          description: 'Fired when toast auto-dismiss timer pauses (hover/focus)',
        },
        {
          name: 'onResume',
          type: '() => void',
          description: 'Fired when toast auto-dismiss timer resumes',
        },
        {
          name: 'onSwipeStart',
          type: '(event: React.PointerEvent) => void',
          description: 'Fired when swipe gesture begins',
        },
        {
          name: 'onSwipeMove',
          type: '(event: React.PointerEvent) => void',
          description: 'Fired continuously while swiping',
        },
        {
          name: 'onSwipeEnd',
          type: '(event: React.PointerEvent) => void',
          description: 'Fired when swipe distance exceeds threshold and toast closes',
        },
        {
          name: 'onSwipeCancel',
          type: '(event: React.PointerEvent) => void',
          description: 'Fired when swipe is released but below threshold',
        },
        {
          name: 'variant',
          type: '\'default\' | \'destructive\' | \'error\' | \'success\' | \'warning\' | \'info\'',
          default: '\'default\'',
          description: 'Visual style variant (styled layer only)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (merges with variant styles)',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'li\'>',
          description: 'All native li HTML attributes (role, data-*, etc.)',
        },
      ],
    },
    {
      name: 'Title',
      description: 'Toast title text — renders inside Toast.Root',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of creating wrapper',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (styled layer provides typography defaults)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Title text or content',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All native div HTML attributes',
        },
      ],
    },
    {
      name: 'Description',
      description: 'Toast description text — renders inside Toast.Root',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of creating wrapper',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (styled layer provides typography defaults)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Description text or content',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All native div HTML attributes',
        },
      ],
    },
    {
      name: 'Action',
      description: 'Action button in the toast — automatically closes toast on click',
      props: [
        {
          name: 'altText',
          type: 'string',
          description: 'Required alt text for screen readers (hidden visually)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of creating button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (styled layer provides button styles)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button label or content',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All native button HTML attributes (onClick, disabled, etc.)',
        },
      ],
    },
    {
      name: 'Close',
      description: 'Close/dismiss button in the toast — automatically closes toast on click',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of creating button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (styled layer provides default icon and styles)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button content (styled layer provides X icon by default)',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All native button HTML attributes (onClick, disabled, etc.)',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal helper — renders toast content into a specific DOM container',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Target DOM node; defaults to document.body',
        },
      ],
    },
    {
      name: 'Toaster',
      description: 'Singleton component — renders all imperative toasts. Drop once in your app root (e.g. layout.tsx)',
      props: [
        {
          name: 'horizontal',
          type: '\'left\' | \'center\' | \'right\'',
          default: '\'right\'',
          description: 'Default horizontal alignment for all toasts',
        },
        {
          name: 'vertical',
          type: '\'top\' | \'bottom\'',
          default: '\'bottom\'',
          description: 'Default vertical alignment for all toasts',
        },
        {
          name: 'maxToasts',
          type: 'number',
          default: '5',
          description: 'Maximum number of toasts visible at once per position group',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes forwarded to viewport wrappers',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<typeof Viewport>',
          description: 'Viewport props (hotkey, label, style, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'toast.show()',
      description: 'Imperative API — fire a toast with full control over all options',
      props: [
        {
          name: 'options.id',
          type: 'string',
          description: 'Reuse/update existing toast when same ID is fired again',
        },
        {
          name: 'options.title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options.description',
          type: 'string',
          description: 'Secondary toast text',
        },
        {
          name: 'options.variant',
          type: '\'default\' | \'success\' | \'error\' | \'warning\' | \'info\' | \'loading\'',
          default: '\'default\'',
          description: 'Visual style and icon',
        },
        {
          name: 'options.duration',
          type: 'number',
          default: '4000',
          description: 'Auto-dismiss in ms; pass Infinity to keep until manually dismissed',
        },
        {
          name: 'options.horizontal',
          type: '\'left\' | \'center\' | \'right\'',
          description: 'Horizontal position (overrides Toaster default)',
        },
        {
          name: 'options.vertical',
          type: '\'top\' | \'bottom\'',
          description: 'Vertical position (overrides Toaster default)',
        },
        {
          name: 'options.action',
          type: '{ label: string; onClick: () => void }',
          description: 'Custom action button; takes priority over retry if both provided',
        },
        {
          name: 'options.retry',
          type: '() => void',
          description: 'Adds a Retry button (action takes priority for button label)',
        },
        {
          name: 'options.onDismiss',
          type: '(id: string) => void',
          description: 'Callback fired when toast is dismissed (before animation)',
        },
      ],
    },
    {
      name: 'toast.success()',
      description: 'Convenience method — fire a success toast',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are preset',
        },
      ],
    },
    {
      name: 'toast.error()',
      description: 'Convenience method — fire an error toast',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are preset',
        },
      ],
    },
    {
      name: 'toast.warning()',
      description: 'Convenience method — fire a warning toast',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are preset',
        },
      ],
    },
    {
      name: 'toast.info()',
      description: 'Convenience method — fire an info toast',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are preset',
        },
      ],
    },
    {
      name: 'toast.loading()',
      description: 'Convenience method — fire a loading toast (spinner icon, duration defaults to Infinity)',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Main toast text',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are preset; duration defaults to Infinity',
        },
      ],
    },
    {
      name: 'toast.promise()',
      description: 'Async helper — show loading toast, then update to success or error when promise settles',
      props: [
        {
          name: 'promise',
          type: 'Promise<T>',
          description: 'The promise to track',
        },
        {
          name: 'messages.loading',
          type: 'string',
          description: 'Text while promise is pending',
        },
        {
          name: 'messages.success',
          type: 'string | ((data: T) => string)',
          description: 'Text when promise resolves; can be a function to format the resolved value',
        },
        {
          name: 'messages.error',
          type: 'string | ((err: unknown) => string)',
          description: 'Text when promise rejects; can be a function to format the error',
        },
        {
          name: 'options',
          type: 'Omit<ToastOptions, \'title\' | \'variant\'>',
          description: 'Same as toast.show() except title and variant are managed by promise state',
        },
      ],
    },
    {
      name: 'toast.dismiss()',
      description: 'Close a toast with exit animation; omit id to dismiss all',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Toast ID to close; omit to dismiss all open toasts',
        },
      ],
    },
    {
      name: 'toast.remove()',
      description: 'Instantly remove a toast from the store without animation',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Toast ID to remove',
        },
      ],
    },
    {
      name: 'useToast()',
      description: 'Hook to subscribe to the toast store inside a React component',
      props: [
        {
          name: 'return.toasts',
          type: 'ToastItem[]',
          description: 'Array of current toast items in the store',
        },
        {
          name: 'return.toast',
          type: 'typeof toast',
          description: 'The complete toast imperative API (show, success, error, etc.)',
        },
        {
          name: 'return.dismiss',
          type: '(id?: string) => void',
          description: 'Close toast(s) with animation',
        },
        {
          name: 'return.remove',
          type: '(id: string) => void',
          description: 'Instantly remove a toast',
        },
      ],
    },
  ],

  skeleton: [
    {
      name: 'Skeleton',
      description: 'A customizable loading placeholder component with animation variants and flexible sizing. Supports both single and multi-line text skeletons.',
      props: [
        {
          name: 'variant',
          type: '\'pulse\' | \'shimmer\' | \'static\'',
          default: '\'shimmer\'',
          description: 'Animation style: pulse for solid fade, shimmer for sweep effect, static for reduced-motion',
        },
        {
          name: 'shape',
          type: '\'rect\' | \'circle\' | \'text\'',
          default: '\'rect\'',
          description: 'Visual shape: rect for rounded rectangle, circle for full circle, text for text line height',
        },
        {
          name: 'width',
          type: 'string | number',
          description: 'Width of the skeleton (e.g., \'100%\', \'120px\', or number for pixels)',
        },
        {
          name: 'height',
          type: 'string | number',
          description: 'Height of the skeleton (e.g., \'1rem\', 40)',
        },
        {
          name: 'lines',
          type: 'number',
          description: 'Number of text lines to repeat; when > 1, renders flex column of text skeletons with last line at 4/5 width',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes merged with variant styles',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (width, height applied via style prop)',
        },
      ],
    },
    {
      name: 'Skeleton.Group',
      description: 'Container for organizing multiple skeleton elements with consistent spacing',
      props: [
        {
          name: 'gap',
          type: 'number | string',
          default: '\'0.5rem\'',
          description: 'Gap between skeleton items in flex column layout',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
  ],

  spinner: [
    {
      name: 'Spinner',
      description: 'A flexible loading spinner component with multiple animation variants (border, dots, pulse, bars), size and color customization, and built-in accessibility features (role=status, aria-live=polite, sr-only label).',
      props: [
        {
          name: 'variant',
          type: '\'border\' | \'dots\' | \'pulse\' | \'bars\'',
          default: '\'border\'',
          description: 'Animation style: border-based spinner, bouncing dots, pulsing circle, or animated bars',
        },
        {
          name: 'size',
          type: '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\'',
          default: '\'md\'',
          description: 'Size of the spinner (xs=3, sm=4, md=6, lg=8, xl=12 in tailwind size units)',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'success\' | \'warning\' | \'destructive\' | \'error\' | \'info\' | \'muted\' | \'inherit\'',
          default: '\'primary\'',
          description: 'Color theme using semantic color tokens',
        },
        {
          name: 'label',
          type: 'string',
          default: '\'Loading\'',
          description: 'Accessible label text hidden visually but available to screen readers',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with component styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forwarded ref to the underlying span element',
        },
      ],
    },
  ],

  separator: [
    {
      name: 'Separator',
      description: 'A flexible separator component for dividing content, supports both horizontal and vertical orientations with optional decorative styling.',
      props: [
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'The orientation of the separator',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'true',
          description: 'If true, sets role=\'none\'; if false, sets role=\'separator\' and aria-orientation',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders the component\'s children as the root element instead of a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the separator',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to the underlying div element',
        },
      ],
    },
  ],

  textarea: [
    {
      name: 'Textarea',
      description: 'A controlled/uncontrolled textarea form control with semantic HTML and optional styling',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the textarea',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Initial value for uncontrolled textarea',
        },
        {
          name: 'onChange',
          type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
          description: 'Callback fired when textarea value changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the textarea and prevents user input',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when textarea is empty',
        },
        {
          name: 'rows',
          type: 'number',
          description: 'Visible height of textarea in number of lines',
        },
        {
          name: 'cols',
          type: 'number',
          description: 'Visible width of textarea in characters',
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum number of characters allowed',
        },
        {
          name: 'minLength',
          type: 'number',
          description: 'Minimum number of characters required',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Marks textarea as required in form submission',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Makes textarea read-only, preventing user edits',
        },
        {
          name: 'spellCheck',
          type: 'boolean | \'true\' | \'false\'',
          description: 'Enables spell-checking for the textarea',
        },
        {
          name: 'wrap',
          type: '\'hard\' | \'soft\' | \'off\'',
          description: 'How text wrapping should be handled',
        },
        {
          name: 'aria-invalid',
          type: 'boolean',
          description: 'Marks the textarea as invalid for accessibility',
        },
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the textarea element',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the textarea',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLTextAreaElement>',
          description: 'Forward ref to access the underlying textarea DOM element',
        },
      ],
    },
  ],

  toggle: [
    {
      name: 'Toggle',
      description: 'A button component that toggles between pressed and unpressed states. Combines a headless primitive with styled variants, sizes, and colors.',
      props: [
        {
          name: 'pressed',
          type: 'boolean',
          description: 'Controlled pressed state (true when active/on, false when inactive/off)',
        },
        {
          name: 'defaultPressed',
          type: 'boolean',
          default: 'false',
          description: 'Uncontrolled initial pressed state',
        },
        {
          name: 'onPressedChange',
          type: '(pressed: boolean) => void',
          description: 'Callback fired when the pressed state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the toggle, preventing interaction and reducing opacity',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders as its child element instead of a button',
        },
        {
          name: 'variant',
          type: '\'default\' | \'outline\'',
          default: '\'default\'',
          description: 'Visual variant style (default has transparent background; outline has border)',
        },
        {
          name: 'color',
          type: '\'default\' | \'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'default\'',
          description: 'Color scheme applied when pressed/active (data-state=on)',
        },
        {
          name: 'size',
          type: '\'sm\' | \'default\' | \'lg\'',
          default: '\'default\'',
          description: 'Button size (sm: h-9 px-2.5; default: h-10 px-3; lg: h-11 px-5)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Tailwind CSS classes merged with variant styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button content (text, icons, or elements)',
        },
      ],
    },
  ],

  'toggle-group': [
    {
      name: 'ToggleGroup.Root',
      description: 'Container for toggle group items with controlled/uncontrolled state support. Supports single or multiple selection modes with roving focus navigation.',
      props: [
        {
          name: 'type',
          type: '\'single\' | \'multiple\'',
          description: 'Determines if one or multiple toggles can be active at a time',
        },
        {
          name: 'value',
          type: 'string | string[] (based on type)',
          description: 'Controlled value(s) of active toggle(s). string for type=\'single\', string[] for type=\'multiple\'',
        },
        {
          name: 'defaultValue',
          type: 'string | string[] (based on type)',
          description: 'Initial value(s) when uncontrolled. string for type=\'single\', string[] for type=\'multiple\'',
        },
        {
          name: 'onValueChange',
          type: '(value: string | string[]) => void',
          description: 'Callback fired when active toggle(s) change. Receives string for type=\'single\', string[] for type=\'multiple\'',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether all toggle items are disabled',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          description: 'Layout orientation for roving focus navigation',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for roving focus',
        },
        {
          name: 'rovingFocus',
          type: 'boolean',
          default: 'true',
          description: 'Enable roving tab focus behavior (arrow keys to navigate, Tab to enter group)',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether focus wraps at the end/start during roving focus navigation',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (from Radix Slot pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled layer adds flex items-center justify-center gap-1 as base)',
        },
        {
          name: 'variant',
          type: '\'default\' | \'outline\'',
          default: '\'default\'',
          description: 'Visual variant for toggle items (styled layer only)',
        },
        {
          name: 'size',
          type: '\'default\' | \'sm\' | \'lg\'',
          default: '\'default\'',
          description: 'Size variant for toggle items: \'sm\'=h-9 px-2.5, \'default\'=h-10 px-3, \'lg\'=h-11 px-5 (styled layer only)',
        },
        {
          name: 'color',
          type: '\'default\' | \'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'default\'',
          description: 'Color variant for active state of toggle items (styled layer only)',
        },
      ],
    },
    {
      name: 'ToggleGroup.Item',
      description: 'Individual toggle within a toggle group. Acts as a button that can be pressed/unpressed. Inherits variant/size/color from parent Root.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique identifier for this toggle item within the group',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether this specific toggle is disabled (combines with Root.disabled)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (from Radix Slot pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled layer applies toggleVariants with inherited variant/size/color)',
        },
        {
          name: 'variant',
          type: '\'default\' | \'outline\'',
          description: 'Visual variant override (styled layer only). Falls back to Root variant if not provided',
        },
        {
          name: 'size',
          type: '\'default\' | \'sm\' | \'lg\'',
          description: 'Size variant override (styled layer only). Falls back to Root size if not provided',
        },
        {
          name: 'color',
          type: '\'default\' | \'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          description: 'Color variant override (styled layer only). Falls back to Root color if not provided',
        },
      ],
    },
  ],

  'radio-group': [
    {
      name: 'Root',
      description: 'Container for radio group with managed state and keyboard navigation',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the selected radio item',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Uncontrolled default value for the selected radio item',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when selected value changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables all items in the group',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Makes selection required for form submission',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Name attribute for hidden input elements (for form submission)',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'vertical\'',
          description: 'Layout direction for keyboard navigation',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for keyboard navigation behavior',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether keyboard focus wraps around to opposite end',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child component (merge props with single child)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds default grid layout)',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual radio button option (styled version with color support)',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique value for this radio option (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables this individual radio item',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child component (merge props with single child)',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'Styled-layer only: color theme for border and indicator',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies 4x4 h-4 w-4 default)',
        },
      ],
    },
    {
      name: 'Indicator',
      description: 'Visual indicator shown when radio item is checked (primitives only)',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Mount indicator regardless of checked state (useful for animations)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child component (merge props with single child)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
  ],

  form: [
    {
      name: 'Form.Root',
      description: 'The root form element that manages field validation state and provides context to child components',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native form; pass a single React element child',
        },
        {
          name: 'onClearServerErrors',
          type: '() => void',
          description: 'Callback fired when the form changes, typically used to clear server-side validation errors',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies \'flex flex-col gap-4\' by default)',
        },
        {
          name: 'onInvalid',
          type: '(event: Event) => void',
          description: 'HTML form onInvalid handler (preventDefault is composed automatically)',
        },
        {
          name: 'onChange',
          type: '(event: ChangeEvent<HTMLFormElement>) => void',
          description: 'HTML form onChange handler (onClearServerErrors is composed automatically)',
        },
      ],
    },
    {
      name: 'Form.Field',
      description: 'Container for a form field that associates label, control, and message elements',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native div',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Field name; required and must match the input name',
        },
        {
          name: 'serverInvalid',
          type: 'boolean',
          default: 'false',
          description: 'Flag to mark field as invalid from server-side validation (shows error message)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies \'flex flex-col gap-1.5\' by default)',
        },
      ],
    },
    {
      name: 'Form.Label',
      description: 'Label element automatically associated with the field\'s input control via htmlFor',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native label',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies text-sm font-medium and disabled styling)',
        },
      ],
    },
    {
      name: 'Form.Control',
      description: 'Input element that tracks validation state and integrates with form validation',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native input',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies border, focus, and invalid state styling)',
        },
        {
          name: 'aria-invalid',
          type: 'boolean',
          description: 'Auto-set based on validity state or serverInvalid flag; reflects HTML5 validation',
        },
        {
          name: 'aria-describedby',
          type: 'string',
          description: 'Auto-set to message element ID for accessibility',
        },
        {
          name: 'type',
          type: 'string',
          description: 'HTML input type (e.g., \'text\', \'email\', \'number\', \'password\')',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'HTML5 validation: field is required',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the input element',
        },
        {
          name: 'pattern',
          type: 'string',
          description: 'HTML5 validation: regex pattern for input value',
        },
        {
          name: 'minLength',
          type: 'number',
          description: 'HTML5 validation: minimum string length',
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'HTML5 validation: maximum string length',
        },
        {
          name: 'min',
          type: 'string | number',
          description: 'HTML5 validation: minimum value for number/date inputs',
        },
        {
          name: 'max',
          type: 'string | number',
          description: 'HTML5 validation: maximum value for number/date inputs',
        },
        {
          name: 'step',
          type: 'string | number',
          description: 'HTML5 validation: step value for number/date inputs',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when input is empty',
        },
        {
          name: 'onChange',
          type: '(event: ChangeEvent<HTMLInputElement>) => void',
          description: 'Change event handler (validity state is tracked automatically)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Forward ref to underlying HTML input element',
        },
      ],
    },
    {
      name: 'Form.Message',
      description: 'Validation error message element that displays based on field validity or server errors',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native span',
        },
        {
          name: 'match',
          type: '\'badInput\' | \'patternMismatch\' | \'rangeOverflow\' | \'rangeUnderflow\' | \'stepMismatch\' | \'tooLong\' | \'tooShort\' | \'typeMismatch\' | \'valid\' | \'valueMissing\' | string | ((value: string, formData: FormData) => boolean | Promise<boolean>)',
          description: 'Validity matcher: show message when this HTML5 validation state or custom matcher matches',
        },
        {
          name: 'forceMatch',
          type: 'boolean',
          description: 'Force message to display even if validity doesn\'t match',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Message content; if omitted, shows default message for HTML5 validity matchers',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version applies \'text-destructive text-xs\')',
        },
      ],
    },
    {
      name: 'Form.ValidityState',
      description: 'Render prop component that provides the current field\'s HTML5 ValidityState for custom UI',
      props: [
        {
          name: 'children',
          type: '(validity: ValidityState | undefined) => React.ReactNode',
          description: 'Render function receiving the field\'s ValidityState object or undefined',
        },
      ],
    },
    {
      name: 'Form.Submit',
      description: 'Submit button element (HTML type=\'submit\' automatically set)',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of native button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the button',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler',
        },
        {
          name: 'type',
          type: '\'submit\'',
          default: '\'submit\'',
          description: 'Button type (automatically set to \'submit\', overridable via props)',
        },
      ],
    },
  ],

  'aspect-ratio': [
    {
      name: 'AspectRatio',
      description: 'A container component that maintains a specified aspect ratio for its contents, useful for responsive images and videos.',
      props: [
        {
          name: 'ratio',
          type: 'number',
          default: '1',
          description: 'The desired aspect ratio as width / height (e.g., 16/9 for widescreen, 1 for square). Defaults to 1.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, merges props onto child element instead of creating a wrapper div.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the outer container. The styled version applies \'overflow-hidden rounded-md\' by default.',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles merged with the container\'s default position: relative; width: 100% styles.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render within the aspect-ratio container, typically an image or video element.',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the outer container div.',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'All standard HTML div attributes are supported and forwarded to the container element.',
        },
      ],
    },
  ],

  'circular-progress': [
    {
      name: 'CircularProgress',
      description: 'A circular SVG progress indicator that displays progress as a circular arc, supporting both determinate and indeterminate (spinning) states.',
      props: [
        {
          name: 'value',
          type: 'number | null | undefined',
          default: 'undefined',
          description: 'Current progress value (0 to max). Omit or pass null/undefined for indeterminate spinning state.',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum progress value; progress is calculated as value/max.',
        },
        {
          name: 'size',
          type: 'number',
          default: '40',
          description: 'Width and height of the SVG element in pixels.',
        },
        {
          name: 'strokeWidth',
          type: 'number',
          default: '4',
          description: 'Width of the progress stroke in pixels.',
        },
        {
          name: 'label',
          type: 'string',
          default: '\'Loading\'',
          description: 'Aria-label text to announce the progress to screen readers.',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'inherit\'',
          default: '\'primary\'',
          description: 'Color variant; maps to Tailwind text color classes (e.g. text-primary, text-destructive).',
        },
        {
          name: 'className',
          type: 'string | undefined',
          description: 'Additional CSS classes merged with internal classes.',
        },
        {
          name: '...SVGAttributes',
          type: 'React.SVGAttributes<SVGSVGElement>',
          description: 'All standard SVG element attributes (e.g. aria-*, data-*, style, id, etc.) are supported via spread.',
        },
      ],
    },
  ],

  meter: [
    {
      name: 'Meter',
      description: 'A quantitative measurement component that displays a progress bar with low/high/optimum thresholds and automatic status coloring (normal, sub-optimal, optimal).',
      props: [
        {
          name: 'value',
          type: 'number',
          description: 'The current value of the meter (required). Clamped between min and max.',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'The minimum value of the meter range.',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'The maximum value of the meter range.',
        },
        {
          name: 'low',
          type: 'number',
          description: 'The lower threshold value. Values below this trigger sub-optimal status.',
        },
        {
          name: 'high',
          type: 'number',
          description: 'The upper threshold value. Values above this trigger sub-optimal status.',
        },
        {
          name: 'optimum',
          type: 'number',
          description: 'The optimal value. When defined, affects status calculation for values beyond low/high thresholds.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Accessible label for the meter, used in aria-label attribute.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to merge with default meter styles.',
        },
      ],
    },
  ],

  'copy-button': [
    {
      name: 'CopyButton',
      description: 'A button component that copies text to clipboard with visual feedback (icon change and reset timer)',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The text to copy to clipboard when button is clicked (required)',
        },
        {
          name: 'resetAfter',
          type: 'number',
          default: '2000',
          description: 'Duration in milliseconds before the copied state resets back to idle',
        },
        {
          name: 'onCopied',
          type: '(value: string) => void',
          description: 'Callback fired after successful clipboard copy',
        },
        {
          name: 'variant',
          type: '\'default\' | \'destructive\' | \'outline\' | \'secondary\' | \'ghost\' | \'link\' | \'success\' | \'warning\' | \'contained\' | \'outlined\' | \'text\'',
          default: '\'ghost\'',
          description: 'Button style variant',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\' | \'default\' | \'inherit\'',
          description: 'Button color (used with semantic variants: contained, outlined, text)',
        },
        {
          name: 'size',
          type: '\'default\' | \'sm\' | \'lg\' | \'xl\' | \'icon\' | \'icon-sm\' | \'icon-lg\' | \'icon-xl\'',
          default: '\'icon\'',
          description: 'Button size',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'If true, renders children as the button element (Slot polymorphism)',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'When true, shows spinner and disables the button',
        },
        {
          name: 'loadingText',
          type: 'React.ReactNode',
          description: 'Text shown next to spinner when loading; defaults to children',
        },
        {
          name: 'leftIcon',
          type: 'React.ReactNode',
          description: 'Icon element rendered before button text',
        },
        {
          name: 'rightIcon',
          type: 'React.ReactNode',
          description: 'Icon element rendered after button text',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the button and prevents interaction',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to merge with component styles',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button content; if not provided defaults to Copy/Check icons based on state',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLButtonElement>',
          description: 'Forward ref to underlying button element',
        },
      ],
    },
  ],

  collapsible: [
    {
      name: 'Root',
      description: 'The root container for the collapsible component. Manages open/closed state and provides context to child components.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the collapsible',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial uncontrolled open state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when the open state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the collapsible is disabled (disables trigger)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Use the component\'s child as the root element instead of creating a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for the root element',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (e.g. id, data-*, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The clickable button that toggles the collapsible open/closed state. Styled variant includes default flex/cursor/transition classes.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Use the component\'s child as the trigger element instead of creating a button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merged with default styled classes: flex cursor-pointer items-center justify-between font-medium transition-all)',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (e.g. type, id, data-*, aria-expanded, aria-controls, etc.)',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The collapsible content panel that shows/hides based on open state. Styled variant includes overflow-hidden and animation classes.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force the content to be mounted in the DOM even when closed (useful for animations)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (merged with default styled classes: overflow-hidden text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Use the component\'s child as the content element instead of creating a div',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (e.g. id, data-*, aria-*, etc.)',
        },
      ],
    },
  ],

  breadcrumb: [
    {
      name: 'Breadcrumb (Primitive Root)',
      description: 'Headless breadcrumb navigation container; wraps children in a <nav> with an <ol>.',
      props: [
        {
          name: 'label',
          type: 'string',
          default: '\'Breadcrumb\'',
          description: 'aria-label for the nav element',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the <ol>',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the nav element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLElement>',
          description: 'Ref forwarded to the <nav> element',
        },
      ],
    },
    {
      name: 'BreadcrumbItem (Primitive)',
      description: 'Headless breadcrumb list item; renders as <li>.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the <li>',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the li element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLLIElement>',
          description: 'Ref forwarded to the <li> element',
        },
      ],
    },
    {
      name: 'BreadcrumbLink (Primitive)',
      description: 'Headless breadcrumb link; renders as <a>.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Link text content',
        },
        {
          name: 'href',
          type: 'string',
          description: 'URL the link navigates to',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the anchor element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLAnchorElement>',
          description: 'Ref forwarded to the <a> element',
        },
      ],
    },
    {
      name: 'Root (Styled)',
      description: 'Styled breadcrumb navigation container; renders <nav aria-label="breadcrumb">.',
      props: [
        {
          name: 'separator',
          type: 'React.ReactNode',
          description: 'Optional custom separator element (not actively used, provided for API completeness)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the nav element',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLElement>',
          description: 'Ref forwarded to the <nav> element',
        },
      ],
    },
    {
      name: 'List (Styled)',
      description: 'Styled breadcrumb list container; renders <ol> with flex layout and gap styling.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLOListElement>',
          description: 'Ref forwarded to the <ol> element',
        },
      ],
    },
    {
      name: 'Item (Styled)',
      description: 'Styled breadcrumb list item; renders <li> with inline-flex and gap styling.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLLIElement>',
          description: 'Ref forwarded to the <li> element',
        },
      ],
    },
    {
      name: 'Link (Styled)',
      description: 'Styled breadcrumb link; renders <a> (or custom component via Slot when asChild=true) with hover styling.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, render child component instead of <a> tag',
        },
        {
          name: 'href',
          type: 'string',
          description: 'URL the link navigates to',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLAnchorElement>',
          description: 'Ref forwarded to the <a> element',
        },
      ],
    },
    {
      name: 'Page (Styled)',
      description: 'Styled breadcrumb current page indicator; renders <span role="link" aria-disabled="true" aria-current="page">.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Page label text',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Ref forwarded to the <span> element',
        },
      ],
    },
    {
      name: 'Separator (Styled)',
      description: 'Breadcrumb path separator; renders <li role="presentation" aria-hidden="true"> with default ChevronRight icon.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom separator icon/element; defaults to <ChevronRight /> if not provided',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
      ],
    },
    {
      name: 'Ellipsis (Styled)',
      description: 'Breadcrumb ellipsis indicator for truncated path sections; renders <span> with MoreHorizontal icon and sr-only label.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class merged with design system styles',
        },
      ],
    },
  ],

  pagination: [
    {
      name: 'Pagination',
      description: 'A data-table pagination component with page navigation, rows-per-page selector, and total row count display. Supports both page selection and page size configuration.',
      props: [
        {
          name: 'page',
          type: 'number',
          description: 'Current page number (1-based), required',
        },
        {
          name: 'pageCount',
          type: 'number',
          description: 'Total number of pages, required',
        },
        {
          name: 'pageSize',
          type: 'number',
          default: '10',
          description: 'Current page size (rows per page)',
        },
        {
          name: 'totalRows',
          type: 'number | undefined',
          description: 'Total row count shown on the left',
        },
        {
          name: 'onPageChange',
          type: '(page: number) => void',
          description: 'Called when the user navigates to a different page, required',
        },
        {
          name: 'onPageSizeChange',
          type: '((pageSize: number) => void) | undefined',
          description: 'Called when the user changes the page size; if omitted the rows-per-page selector is hidden',
        },
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          default: '[10, 25, 50, 100]',
          description: 'Options for the rows-per-page selector',
        },
        {
          name: 'showTotalRows',
          type: 'boolean',
          default: 'true',
          description: 'Show the \'X total rows\' label (only visible when totalRows is provided)',
        },
        {
          name: 'className',
          type: 'string | undefined',
          description: 'Additional CSS classes applied to the root div',
        },
      ],
    },
    {
      name: 'Pagination.Root',
      description: 'Headless primitive pagination component with basic page navigation. Extends HTML nav element. This is the low-level primitive; most users should use the styled Pagination component instead.',
      props: [
        {
          name: 'current',
          type: 'number | undefined',
          default: '1',
          description: 'Current page number (1-based)',
        },
        {
          name: 'total',
          type: 'number | undefined',
          default: '1',
          description: 'Total number of pages',
        },
        {
          name: 'onChange',
          type: '((page: number) => void) | undefined',
          description: 'Called when the user navigates to a different page',
        },
        {
          name: 'className',
          type: 'string | undefined',
          description: 'Additional CSS classes',
        },
      ],
    },
  ],

  stepper: [
    {
      name: 'Primitives.Root',
      description: 'Headless numerical stepper component with increment/decrement controls',
      props: [
        {
          name: 'value',
          type: 'number',
          description: 'Controlled current value of the stepper',
        },
        {
          name: 'defaultValue',
          type: 'number',
          default: '0',
          description: 'Initial value when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(value: number) => void',
          description: 'Callback fired when value changes',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum allowed value; decrement is clamped to this',
        },
        {
          name: 'max',
          type: 'number',
          default: 'Infinity',
          description: 'Maximum allowed value; increment is clamped to this',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Step size for increment/decrement operations',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the root div element',
        },
      ],
    },
    {
      name: 'Styled.Root',
      description: 'Root progress/visual stepper component that provides context and wraps Step children',
      props: [
        {
          name: 'activeStep',
          type: 'number',
          description: 'Index of the currently active step; determines step status (complete/current/upcoming)',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Layout direction of the stepper',
        },
        {
          name: 'color',
          type: '\'primary\' | \'secondary\' | \'error\' | \'warning\' | \'info\' | \'success\'',
          default: '\'primary\'',
          description: 'Color scheme for completed and current step indicators',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the root div',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Step and Separator components to be rendered within the stepper',
        },
      ],
    },
    {
      name: 'Styled.Step',
      description: 'Individual step component that displays status indicator and step content',
      props: [
        {
          name: 'index',
          type: 'number',
          description: 'Zero-based index of this step; used to determine status (complete/current/upcoming)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the step div',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Step content; defaults to Indicator if not provided',
        },
      ],
    },
    {
      name: 'Styled.Title',
      description: 'Semantic wrapper for step title text',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the span',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Title text content',
        },
      ],
    },
    {
      name: 'Styled.Description',
      description: 'Semantic wrapper for step description text',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the span',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Description text content',
        },
      ],
    },
    {
      name: 'Styled.Separator',
      description: 'Horizontal or vertical divider between steps; orientation auto-adapts from parent Root',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the separator div',
        },
      ],
    },
  ],

  'alert-dialog': [
    {
      name: 'Root',
      description: 'Root provider component for AlertDialog; controls open state and focus management. Always forces modal=true.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the dialog',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when open state changes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Dialog subcomponents',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that opens the dialog. Accepts all standard button HTML attributes.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler (composed with open toggle)',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal container that renders dialog content at document root (or custom container)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Portal children (typically Overlay, Content)',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM node to render portal into; defaults to body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting of portal content even when dialog is closed',
        },
      ],
    },
    {
      name: 'Overlay',
      description: 'Semi-transparent backdrop behind the dialog. Styled wrapper around dialog overlay.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults include fixed inset-0 z-50 bg-overlay/60 and animations',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting even when dialog is closed',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Main dialog content container with role=\'alertdialog\'. Automatically prevents outside interaction and auto-focuses cancel button.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults include fixed positioning, max-w-lg, rounded-2xl, and animations',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting even when dialog is closed',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when Escape key pressed inside dialog',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback before focus moves to content on open; can preventDefault to skip default focus behavior',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback before focus returns on close',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Header',
      description: 'Convenience wrapper container for Title and Description; uses flexbox column with gap and text alignment.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to flex flex-col gap-2 text-center sm:text-left',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Header content',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Footer',
      description: 'Convenience wrapper container for Action and Cancel buttons; uses flexbox with responsive row layout.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Footer content (typically Action and Cancel buttons)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Title',
      description: 'Dialog title heading (h2). Styled with text-lg font-semibold.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to text-lg font-semibold',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Title text',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Description',
      description: 'Dialog description paragraph (p). Styled with text-sm text-muted-foreground.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to text-sm text-muted-foreground',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Description text',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Action',
      description: 'Primary action button (typically confirm/destructive). Styled with default button variants.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to buttonVariants() styles',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler (composed with dialog close)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button text',
        },
        {
          name: 'type',
          type: '\'button\' | \'submit\' | \'reset\'',
          default: '\'button\'',
          description: 'Button type',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the button',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
    {
      name: 'Cancel',
      description: 'Cancel button (typically secondary). Styled with outline variant and auto-focused on dialog open.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, passing props to first child',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; defaults to buttonVariants({ variant: \'outline\' }) plus mt-2 sm:mt-0',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler (composed with dialog close)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Button text',
        },
        {
          name: 'type',
          type: '\'button\' | \'submit\' | \'reset\'',
          default: '\'button\'',
          description: 'Button type',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the button',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLButtonElement>',
          description: 'Forwarded ref; automatically connected to cancel focus management',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
      ],
    },
  ],

  sheet: [
    {
      name: 'Sheet.Root',
      description: 'Container and state manager for the entire sheet component',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the sheet',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when open state changes',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether the sheet behaves as a modal (traps focus, blocks interaction outside)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the root context',
        },
      ],
    },
    {
      name: 'Sheet.Trigger',
      description: 'Button that opens the sheet when clicked',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the trigger element instead of wrapping in a button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler',
        },
      ],
    },
    {
      name: 'Sheet.Portal',
      description: 'Renders sheet content in a portal container',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render in the portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal content into (defaults to document.body)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force the portal content to mount even when sheet is closed',
        },
      ],
    },
    {
      name: 'Sheet.Overlay',
      description: 'Semi-transparent backdrop behind the sheet content',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the overlay element instead of wrapping in a div',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force the overlay to mount even when sheet is closed',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Sheet.Content',
      description: 'Main container for sheet content that slides in from the specified side',
      props: [
        {
          name: 'side',
          type: '\'top\' | \'bottom\' | \'left\' | \'right\'',
          default: '\'right\'',
          description: 'Side of the screen the sheet slides in from',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the content element instead of wrapping in a div',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force the content to mount even when sheet is closed',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when Escape key is pressed while content is focused',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback when pointer down occurs outside the sheet',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback when any interaction occurs outside the sheet',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback to control initial focus when sheet opens',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback to control focus restoration when sheet closes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the sheet',
        },
      ],
    },
    {
      name: 'Sheet.Header',
      description: 'Helper component for sheet header layout with default spacing and text alignment',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the header',
        },
      ],
    },
    {
      name: 'Sheet.Footer',
      description: 'Helper component for sheet footer layout with default spacing and right-aligned button arrangement',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the footer',
        },
      ],
    },
    {
      name: 'Sheet.Title',
      description: 'Semantic heading for the sheet with default text styling',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the title element instead of wrapping in an h2',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render as the title',
        },
      ],
    },
    {
      name: 'Sheet.Description',
      description: 'Semantic description text for the sheet with default text styling',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the description element instead of wrapping in a p',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render as the description',
        },
      ],
    },
    {
      name: 'Sheet.Close',
      description: 'Button that closes the sheet when clicked',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Pass child as the close element instead of wrapping in a button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler',
        },
      ],
    },
  ],

  drawer: [
    {
      name: 'Root',
      description: 'Container component that manages drawer open/closed state. Wraps all other drawer parts.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled state: whether drawer is open',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Uncontrolled initial state: drawer open on mount',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when drawer open state changes',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether drawer is modal (disables outside interaction when open)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Drawer content and child parts',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button element that toggles drawer open/closed state',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'onClick',
          type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler',
        },
        {
          name: '...buttonProps',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (type, aria-*, data-*, etc.)',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal component that renders drawer content outside DOM hierarchy',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Portal content (Overlay and Content)',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal into (defaults to document.body)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Mount portal contents even when drawer is closed',
        },
      ],
    },
    {
      name: 'Overlay',
      description: 'Semi-transparent backdrop behind drawer content',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Mount overlay even when drawer is closed',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (style, data-*, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Main drawer container with animations. Positioned at bottom by default.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Mount content even when drawer is closed',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when Escape key pressed inside drawer',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Callback when pointer down outside drawer',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Callback when any interaction outside drawer occurs',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback to control focus when drawer opens',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Callback to control focus when drawer closes',
        },
        {
          name: '...divProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (style, data-*, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Header',
      description: 'Container for drawer title and description with default padding and layout',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Header content',
        },
        {
          name: '...divProps',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Footer',
      description: 'Container for drawer action buttons with default padding and layout',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Footer content',
        },
        {
          name: '...divProps',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Title',
      description: 'Drawer title heading element (h2). Associates with aria-labelledby.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of h2',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Title text',
        },
        {
          name: '...h2Props',
          type: 'React.ComponentPropsWithoutRef<\'h2\'>',
          description: 'All standard HTML h2 attributes (id, data-*, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Description',
      description: 'Drawer description/subtitle element (p). Associates with aria-describedby.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of p',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Description text',
        },
        {
          name: '...pProps',
          type: 'React.ComponentPropsWithoutRef<\'p\'>',
          description: 'All standard HTML p attributes (id, data-*, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Close',
      description: 'Button element that closes the drawer',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'onClick',
          type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click event handler',
        },
        {
          name: '...buttonProps',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (type, aria-*, data-*, etc.)',
        },
      ],
    },
  ],

  'hover-card': [
    {
      name: 'Root',
      description: 'Wrapper component that manages hover card state and timing',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the hover card root',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the hover card',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when the open state changes',
        },
        {
          name: 'openDelay',
          type: 'number',
          default: '700',
          description: 'Delay in milliseconds before the card opens on hover',
        },
        {
          name: 'closeDelay',
          type: 'number',
          default: '300',
          description: 'Delay in milliseconds before the card closes after pointer leaves',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Anchor element that triggers the hover card. Renders as <a> by default, accepts all HTML anchor attributes',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, merges props onto child element instead of rendering as anchor',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the trigger element',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal container that renders the hover card content outside the DOM tree',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render in the portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element where the portal should be rendered (defaults to document.body)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'If true, renders content regardless of open state',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Styled container for hover card content with positioning and animations',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names merged with default styled classes',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'center\'',
          description: 'Vertical alignment of content relative to trigger',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          description: 'Side of the trigger where content should appear',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'Distance in pixels from the trigger element',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset in pixels for the alignment position',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          description: 'Padding between arrow and edge of content',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'If true, adjusts position to avoid viewport collisions',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding between content and viewport edges when avoiding collisions',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, merges props onto child element instead of rendering as div',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'If true, renders content regardless of open state',
        },
      ],
    },
    {
      name: 'Arrow',
      description: 'SVG arrow pointing from content toward trigger',
      props: [
        {
          name: 'width',
          type: 'number',
          description: 'Width of the arrow element',
        },
        {
          name: 'height',
          type: 'number',
          description: 'Height of the arrow element',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the arrow',
        },
      ],
    },
  ],

  'context-menu': [
    {
      name: 'Root',
      description: 'Context menu root provider that manages open/closed state and modal behavior',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (Trigger, Portal, Content, etc.)',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for the menu',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when menu open state changes',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether menu operates in modal mode (traps focus, disables outside interaction)',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Right-click or long-press trigger element for opening the context menu',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of wrapping in span',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the trigger',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'onContextMenu',
          type: '(event: React.MouseEvent) => void',
          description: 'Right-click event handler (composed with internal handler)',
        },
        {
          name: 'onPointerDown',
          type: '(event: React.PointerEvent) => void',
          description: 'Pointer down event handler (composed with internal handler)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent) => void',
          description: 'Pointer move event handler (composed with internal handler)',
        },
        {
          name: 'onPointerCancel',
          type: '(event: React.PointerEvent) => void',
          description: 'Pointer cancel event handler (composed with internal handler)',
        },
        {
          name: 'onPointerUp',
          type: '(event: React.PointerEvent) => void',
          description: 'Pointer up event handler (composed with internal handler)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (composed with WebkitTouchCallout: \'none\')',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portal container for rendering menu content outside DOM hierarchy',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements to portal',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal into',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting of content regardless of open state',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Menu content wrapper with positioning, animations, and dismiss behavior (automatically portalled)',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting of content',
        },
        {
          name: 'loop',
          type: 'boolean',
          description: 'Enable keyboard navigation looping',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Called when menu closes and focus returns',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Called when Escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Called when pointer down occurs outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Called when focus moves outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Called when any interaction occurs outside content',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'bottom\'',
          description: 'Preferred side to anchor menu (auto-adjusted)',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '2',
          description: 'Distance from trigger to content',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'start\'',
          description: 'Alignment relative to trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Additional offset for alignment',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Automatically adjust position to avoid collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Element(s) to use as collision boundary',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding to maintain from collision boundary',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'Positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Stick behavior when scrolling',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide content when detached from trigger',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'Position update strategy',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Menu item with support for disabled state and custom selection',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment with checkboxes/radios (styled wrapper only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the item',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text value for keyboard search',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Group container for organizing menu items',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Non-interactive label for grouping menu sections',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment (styled wrapper only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual separator between menu item groups',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
      ],
    },
    {
      name: 'Sub',
      description: 'Submenu container with independent open state',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'SubTrigger and SubContent elements',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Default open state for uncontrolled mode',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when submenu open state changes',
        },
      ],
    },
    {
      name: 'SubTrigger',
      description: 'Trigger for opening submenu with chevron icon',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment (styled wrapper only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the submenu trigger',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when submenu trigger is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text value for keyboard search',
        },
      ],
    },
    {
      name: 'SubContent',
      description: 'Submenu content container with auto-positioning',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting of content',
        },
        {
          name: 'loop',
          type: 'boolean',
          description: 'Enable keyboard navigation looping',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Called when submenu closes and focus returns',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Called when Escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Called when pointer down occurs outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Called when focus moves outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Called when any interaction occurs outside content',
        },
        {
          name: 'sideOffset',
          type: 'number',
          description: 'Distance from trigger to content',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Additional offset for alignment',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Automatically adjust position to avoid collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Element(s) to use as collision boundary',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding to maintain from collision boundary',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'Positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Stick behavior when scrolling',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide content when detached from trigger',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'Position update strategy',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'Menu item with checkbox state indicator',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the item',
        },
        {
          name: 'checked',
          type: 'boolean | \'indeterminate\'',
          default: 'false',
          description: 'Checkbox checked state',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Called when checkbox state changes',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text value for keyboard search',
        },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'Radio group container for mutually exclusive menu items',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Current selected radio item value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when radio selection changes',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'Menu item with radio button state indicator',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Radio item value (required)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the item',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text value for keyboard search',
        },
      ],
    },
    {
      name: 'ItemIndicator',
      description: 'Conditional indicator shown for checked checkbox/radio items',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting regardless of checked state',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
      ],
    },
  ],

  menubar: [
    {
      name: 'Root',
      description: 'Main container for the menubar. Manages open state and keyboard navigation across all menu items.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled open menu ID (identifies which menu is currently open)',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Initial open menu ID when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when the open menu changes',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction (left-to-right or right-to-left)',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether keyboard navigation wraps around at list boundaries',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Menu',
      description: 'Container for a single menu trigger and its content. Use multiple Menu components for multiple menu items in the bar.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Optional unique identifier for this menu (auto-generated if not provided)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (typically Trigger and Content)',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that opens/closes a menu. Placed inside Menu.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the trigger is disabled',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Container for menu items. Appears as a popover below the trigger.',
      props: [
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          description: 'Which side of the trigger to position the menu',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '8',
          description: 'Distance in pixels from the trigger',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          description: 'Alignment relative to trigger (start, center, or end)',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Offset from the align position',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Keep in DOM even when closed',
        },
        {
          name: 'loop',
          type: 'boolean',
          description: 'Whether focus wraps around menu items',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Flip position to avoid viewport collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Elements that define collision detection boundary',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding around collision boundary',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Keep menu visible during partial scrolling',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide when trigger becomes detached from viewport',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'When to update position during scroll',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Called when focus returns to trigger on close',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Called when Escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Called when pointer down occurs outside content',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Called when focus moves outside content',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Called for any interaction outside content',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Item',
      description: 'A clickable menu item. Can contain text or arbitrary children.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the item is disabled',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when the item is selected (clicked or Enter pressed)',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text value for typeahead search',
        },
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment with checkbox/radio items (styled only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'Menu item with a checkbox that toggles on/off.',
      props: [
        {
          name: 'checked',
          type: 'boolean | \'indeterminate\'',
          default: 'false',
          description: 'Whether the checkbox is checked or in indeterminate state',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Called when the checked state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the item is disabled',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when the item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text value for typeahead search',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'Container for radio items where only one can be selected at a time.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Currently selected radio item value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the selected radio item changes',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'A radio button menu item. Must be inside RadioGroup.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique value for this radio item (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the item is disabled',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when the item is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text value for typeahead search',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Sub',
      description: 'Container for a submenu. Must contain SubTrigger and SubContent.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state for the submenu',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when the submenu open state changes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (SubTrigger and SubContent)',
        },
      ],
    },
    {
      name: 'SubTrigger',
      description: 'Button that opens/closes a submenu. Placed inside Sub.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the trigger is disabled',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when the trigger is selected',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text value for typeahead search',
        },
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment (styled only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'SubContent',
      description: 'Container for submenu items. Appears as a popover to the side of the SubTrigger.',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          description: 'Whether focus wraps around submenu items',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Keep in DOM even when closed',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Called when focus returns on close',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Called when Escape key is pressed',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Called when pointer down occurs outside',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Called when focus moves outside',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Called for any interaction outside',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Container to group related menu items.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Non-interactive label or section heading inside a menu.',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          description: 'Add left padding for alignment (styled only)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual divider between menu items.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'ItemIndicator',
      description: 'Displays the check mark or radio dot icon. Automatically shown/hidden based on checked state.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Keep in DOM even when not checked',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of span',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Renders menu content in a portal (typically at document root). Optional; Content wraps this automatically.',
      props: [
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Optional custom DOM node to render portal into',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Keep portal content in DOM even when menu is closed',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements to render in portal',
        },
      ],
    },
  ],

  'navigation-menu': [
    {
      name: 'Root',
      description: 'Root container for the navigation menu system. Manages state, timing, and direction. Accepts nav element props.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled active menu item value',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Initial active menu item value (uncontrolled)',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when the active menu item changes',
        },
        {
          name: 'delayDuration',
          type: 'number',
          default: '200',
          description: 'Delay in ms before opening submenu on hover when first trigger is activated',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description: 'Delay in ms before resuming open delay after all menus close',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction (left-to-right or right-to-left)',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Layout direction of menu items',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of nav',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'List',
      description: 'Container for navigation menu items. Accepts ul element props.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Container for a menu item (trigger + content pair). Accepts li element props.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique identifier for this menu item (auto-generated if not provided)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of li',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button that opens/closes the menu content. Accepts button element props.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Container for menu item content shown when trigger is active. Accepts div element props.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting content in DOM even when closed',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Link',
      description: 'Anchor link element within navigation menu. Supports active state styling.',
      props: [
        {
          name: 'active',
          type: 'boolean',
          description: 'Mark link as currently active/selected',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of a',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Indicator',
      description: 'Visual indicator element (typically animated arrow/chevron). Accepts div element props.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting indicator in DOM even when hidden',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
    {
      name: 'Viewport',
      description: 'Viewport container that constrains content size and position. Accepts div element props.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting viewport in DOM even when closed',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
      ],
    },
  ],

  combobox: [
    {
      name: 'Root',
      description: 'Container/context provider for the combobox. Manages state for open, value, and input value.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (Input, Content, etc.)',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the selected item',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Initial value when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when selected value changes',
        },
        {
          name: 'inputValue',
          type: 'string',
          description: 'Controlled input field text',
        },
        {
          name: 'defaultInputValue',
          type: 'string',
          default: '\'\'',
          description: 'Initial input text when uncontrolled',
        },
        {
          name: 'onInputValueChange',
          type: '(value: string) => void',
          description: 'Callback when input text changes',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of dropdown',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback when dropdown open state changes',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for the combobox',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the combobox is disabled',
        },
      ],
    },
    {
      name: 'Input',
      description: 'The searchable input field. Extends HTML input element with keyboard navigation (arrow keys, enter, escape).',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child; prop forwarding pattern',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (styled version provides default styling)',
        },
        {
          name: '...htmlInputAttributes',
          type: 'React.ComponentPropsWithoutRef<\'input\'>',
          description: 'All standard HTML input attributes (placeholder, type, onChange, onFocus, onKeyDown, etc.)',
        },
      ],
    },
    {
      name: 'Portal',
      description: 'Portals the dropdown content to avoid overflow issues. Wraps Content.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements, typically Content',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'DOM element to portal into; defaults to document.body',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force render content even when dropdown is closed',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Dropdown container for items. Positioned via Popper, responds to open state.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child; prop forwarding pattern',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force render content even when dropdown is closed',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          default: '\'bottom\'',
          description: 'Preferred side to position dropdown relative to input',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'Distance in pixels between input and dropdown',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'start\'',
          description: 'Horizontal alignment of dropdown',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'Flip/shift dropdown to avoid viewport collisions',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Callback when escape key pressed',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (styled version provides default styling)',
        },
        {
          name: '...htmlDivAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual selectable option in the dropdown. Highlighted on hover/keyboard navigation, selected via click or enter.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Unique identifier for this option (required)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether this item is selectable',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Text to set as input value when selected (defaults to value prop)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child; prop forwarding pattern',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (styled version provides default styling with checkmark icon)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Label/content to display for the item',
        },
        {
          name: '...htmlDivAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Empty',
      description: 'Shown when there are no items to display (e.g., no search results).',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to display when no items available',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (styled version provides default styling)',
        },
        {
          name: '...htmlDivAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Semantic grouping container for related items (e.g., frontend vs backend languages).',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child; prop forwarding pattern',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Item elements to group',
        },
        {
          name: '...htmlDivAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual divider between groups or sections in the dropdown.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child; prop forwarding pattern',
        },
        {
          name: '...htmlDivAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (className, style, etc.)',
        },
      ],
    },
  ],

  command: [
    {
      name: 'Root',
      description: 'Root command container that manages state and provides context for all command subcomponents',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled selected item value',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default selected item value when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when selected value changes',
        },
        {
          name: 'filter',
          type: '(value: string, search: string, keywords?: string[]) => number',
          description: 'Custom filter function that scores items for search; defaults to prefix/include matching',
        },
        {
          name: 'shouldFilter',
          type: 'boolean',
          default: 'true',
          description: 'Whether to apply filtering based on search input',
        },
        {
          name: 'label',
          type: 'string',
          default: '\'Command Menu\'',
          description: 'Aria-label for the root element',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether arrow navigation loops from last to first item and vice versa',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds default popover styling)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the root div element',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Search/filter input field that updates the command\'s search state',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version wraps input with search icon)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled input value',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback when input value changes',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Input placeholder text',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to the input element',
        },
      ],
    },
    {
      name: 'List',
      description: 'Container for command items and groups; scrollable container with role listbox',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds max-height and scroll behavior)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'aria-label',
          type: 'string',
          default: '\'Command results\'',
          description: 'Aria-label for the list',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the list div element',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Selectable command item within a list or group',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Item value; falls back to textContent if not provided',
        },
        {
          name: 'keywords',
          type: 'string[]',
          description: 'Additional keywords for search matching beyond the item text',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Prevents selection and interaction with the item',
        },
        {
          name: 'onSelect',
          type: '(value: string) => void',
          description: 'Callback fired when item is clicked or selected via keyboard',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds selection and disabled styling)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the item div element',
        },
      ],
    },
    {
      name: 'Group',
      description: 'Logical grouping of command items with optional heading',
      props: [
        {
          name: 'heading',
          type: 'React.ReactNode',
          description: 'Section heading displayed above items in the group',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds padding and heading styles)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the group div element',
        },
      ],
    },
    {
      name: 'Empty',
      description: 'Placeholder content shown when no items match the search query',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds padding and text centering)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the empty state div element',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Visual divider between command groups or sections',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds border styling)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element, merging props with child component',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the separator div element',
        },
      ],
    },
    {
      name: 'Loading',
      description: 'Loading indicator displayed during async operations',
      props: [
        {
          name: 'progress',
          type: 'number',
          description: 'Progress value (0-100) for aria-valuenow',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the loading div element',
        },
      ],
    },
    {
      name: 'Shortcut',
      description: 'Keyboard shortcut hint displayed in command items (styled version only)',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version adds muted text styling and right alignment)',
        },
      ],
    },
  ],

  'one-time-password-field': [
    {
      name: 'Root',
      description: 'The root container for the one-time-password field. Manages state and context for all inputs.',
      props: [
        {
          name: 'length',
          type: 'number',
          default: '6',
          description: 'Number of input fields to display',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the OTP field',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: '\'\'',
          description: 'Initial uncontrolled value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when the OTP value changes',
        },
        {
          name: 'type',
          type: '\'numeric\' | \'alphanumeric\'',
          default: '\'numeric\'',
          description: 'Input type constraint',
        },
        {
          name: 'mask',
          type: 'boolean',
          description: 'Mask input as password field when true',
        },
        {
          name: 'autoSubmit',
          type: 'boolean',
          default: 'true',
          description: 'Trigger onComplete when all fields are filled',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable all input fields',
        },
        {
          name: 'onComplete',
          type: '(value: string) => void',
          description: 'Callback fired when all OTP fields are completed and autoSubmit is true',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref forwarded to root div element',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Individual OTP input field. Must be used inside Root. Requires an index prop.',
      props: [
        {
          name: 'index',
          type: 'number',
          description: 'Position of this input in the OTP field (0-based)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable this specific input field',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Native change event handler (composed with internal handler)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
          description: 'Native keydown event handler (composed with internal arrow/backspace handler)',
        },
        {
          name: 'onFocus',
          type: '(event: React.FocusEvent<HTMLInputElement>) => void',
          description: 'Native focus event handler (composed with internal select handler)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref forwarded to input element',
        },
      ],
    },
    {
      name: 'HiddenInput',
      description: 'Hidden input field that submits the complete OTP value as a single field. Useful for form submission.',
      props: [
        {
          name: 'name',
          type: 'string',
          description: 'Name attribute for form submission',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (rarely needed for hidden input)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref forwarded to hidden input element',
        },
      ],
    },
  ],

  'password-toggle-field': [
    {
      name: 'Root',
      description: 'Root container that manages visibility state for the password field',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace the root element with the first child element, merging props',
        },
        {
          name: 'visible',
          type: 'boolean',
          description: 'Controlled visibility state of the password field (true=text visible, false=password hidden)',
        },
        {
          name: 'defaultVisible',
          type: 'boolean',
          default: 'false',
          description: 'Default visibility state when uncontrolled',
        },
        {
          name: 'onVisibleChange',
          type: '(visible: boolean) => void',
          description: 'Callback fired when visibility state changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled version adds \'relative\' by default)',
        },
        {
          name: '...rest',
          type: 'HTMLDivProps',
          description: 'All standard div HTML attributes (id, data-*, role, aria-*, etc.)',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Input element that toggles between password and text type based on visibility state',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled version has pre-applied styling for input appearance, focus, and disabled states)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the input field',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text to show when input is empty',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the password field',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default value when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback fired when the input value changes',
        },
        {
          name: '...rest',
          type: 'HTMLInputProps',
          description: 'All standard input HTML attributes (id, aria-*, data-*, etc.); autoComplete defaults to \'current-password\' in primitives',
        },
      ],
    },
    {
      name: 'Toggle',
      description: 'Button that toggles the password visibility state; primitives version automatically renders Icon child in styled version',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled version has pre-applied styling for positioning, hover, and focus states)',
        },
        {
          name: 'onClick',
          type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback fired when button is clicked (composed with internal toggle handler)',
        },
        {
          name: '...rest',
          type: 'HTMLButtonProps',
          description: 'All standard button HTML attributes; primitives version sets type=\'button\', aria-pressed to visibility state, aria-label to \'Show password\'/\'Hide password\', and data-state to \'visible\'/\'hidden\'',
        },
      ],
    },
    {
      name: 'Icon',
      description: 'Conditional icon renderer (primitives only; styled Root/Input/Toggle automatically use Eye/EyeOff icons)',
      props: [
        {
          name: 'visible',
          type: 'React.ReactNode',
          description: 'Icon/element to render when password is visible (text shown)',
        },
        {
          name: 'hidden',
          type: 'React.ReactNode',
          description: 'Icon/element to render when password is hidden (dots shown)',
        },
      ],
    },
  ],

  'number-field': [
    {
      name: 'Root',
      description: 'Container component that manages number field state and provides context to child components',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Merge props with immediate child element instead of rendering a div',
        },
        {
          name: 'value',
          type: 'number | undefined',
          description: 'Controlled numeric value',
        },
        {
          name: 'defaultValue',
          type: 'number | undefined',
          description: 'Initial uncontrolled numeric value',
        },
        {
          name: 'onValueChange',
          type: '(value: number | undefined) => void',
          description: 'Callback fired when the numeric value changes',
        },
        {
          name: 'min',
          type: 'number | undefined',
          description: 'Minimum allowed value; enforced on all value changes',
        },
        {
          name: 'max',
          type: 'number | undefined',
          description: 'Maximum allowed value; enforced on all value changes',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Amount to increment/decrement with arrow keys or triggers',
        },
        {
          name: 'disabled',
          type: 'boolean | undefined',
          description: 'Disables input and trigger buttons',
        },
        {
          name: 'readOnly',
          type: 'boolean | undefined',
          description: 'Prevents editing but allows display; triggers remain functional',
        },
        {
          name: 'formatOptions',
          type: 'Intl.NumberFormatOptions | undefined',
          description: 'Options passed to Intl.NumberFormat for display formatting',
        },
        {
          name: 'locale',
          type: 'string | undefined',
          description: 'Locale string passed to Intl.NumberFormat for number formatting',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the root div element',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Text input element with role=\'spinbutton\'; forwards all standard HTML input props plus onChange/onKeyDown/onWheel event handlers',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the input element',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback fired on input value change; composed with internal change handler',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
          description: 'Callback fired on key down; composed with internal arrow/page/home/end key handlers',
        },
        {
          name: 'onWheel',
          type: '(event: React.WheelEvent<HTMLInputElement>) => void',
          description: 'Callback fired on wheel scroll when focused; composed with internal increment/decrement handler',
        },
      ],
    },
    {
      name: 'IncrementTrigger',
      description: 'Button to increase the numeric value by step amount; disabled when value >= max',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the button element',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback fired on button click; composed with internal increment handler',
        },
      ],
    },
    {
      name: 'DecrementTrigger',
      description: 'Button to decrease the numeric value by step amount; disabled when value <= min',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the button element',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback fired on button click; composed with internal decrement handler',
        },
      ],
    },
  ],

  calendar: [
    {
      name: 'Calendar (styled)',
      description: 'Ready-to-use calendar component with built-in layout, styling, and navigation controls',
      props: [
        {
          name: 'mode',
          type: '\'single\' | \'range\' | \'multiple\'',
          default: '\'single\'',
          description: 'Selection mode: single date, date range, or multiple dates',
        },
        {
          name: 'selected',
          type: 'Date | Date[] | { from?: Date; to?: Date } | undefined',
          description: 'Selected value (controlled); shape depends on mode',
        },
        {
          name: 'defaultSelected',
          type: 'Date | Date[] | { from?: Date; to?: Date } | undefined',
          description: 'Initial selected value (uncontrolled)',
        },
        {
          name: 'onSelect',
          type: '(value: Date | Date[] | { from?: Date; to?: Date } | undefined) => void',
          description: 'Callback fired when selection changes',
        },
        {
          name: 'month',
          type: 'Date',
          description: 'Displayed month (controlled)',
        },
        {
          name: 'defaultMonth',
          type: 'Date',
          description: 'Initial month (uncontrolled); defaults to month of selected value or today',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Callback fired when displayed month changes',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Earliest selectable date (inclusive)',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Latest selectable date (inclusive)',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable all dates before today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable all dates after today',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable entire calendar',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates (alternative to disabledDays)',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable months for month/year navigation',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable years for month/year navigation',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'First day of week (0=Sunday, 1=Monday, etc)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale code for formatting dates and day names',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today\'s date',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show ISO week numbers in grid',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed number of weeks to display (pads with next/prev month dates)',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          default: 'true',
          description: 'Show dates from adjacent months in calendar grid',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom formatter for weekday headers',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Callback fired when displayed year changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child of another component',
        },
      ],
    },
    {
      name: 'Calendar.Root (primitive)',
      description: 'Headless calendar root providing selection state and context',
      props: [
        {
          name: 'mode',
          type: '\'single\' | \'range\' | \'multiple\'',
          default: '\'single\'',
          description: 'Selection mode: single date, date range, or multiple dates',
        },
        {
          name: 'selected',
          type: 'Date | Date[] | { from?: Date; to?: Date } | undefined',
          description: 'Selected value (controlled); shape depends on mode',
        },
        {
          name: 'defaultSelected',
          type: 'Date | Date[] | { from?: Date; to?: Date } | undefined',
          description: 'Initial selected value (uncontrolled)',
        },
        {
          name: 'onSelect',
          type: '(value: Date | Date[] | { from?: Date; to?: Date } | undefined) => void',
          description: 'Callback fired when selection changes',
        },
        {
          name: 'month',
          type: 'Date',
          description: 'Displayed month (controlled)',
        },
        {
          name: 'defaultMonth',
          type: 'Date',
          description: 'Initial month (uncontrolled); defaults to month of selected value or today',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Callback fired when displayed month changes',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Earliest selectable date (inclusive)',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Latest selectable date (inclusive)',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable all dates before today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable all dates after today',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable entire calendar',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates (alternative to disabledDays)',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable months for month/year navigation',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable years for month/year navigation',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'First day of week (0=Sunday, 1=Monday, etc)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale code for formatting dates and day names',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today\'s date',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show ISO week numbers in grid',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed number of weeks to display (pads with next/prev month dates)',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom formatter for weekday headers',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Callback fired when displayed year changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child of another component',
        },
      ],
    },
    {
      name: 'Calendar.Header',
      description: 'Container for calendar header controls (previous, heading, next buttons)',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.PreviousButton',
      description: 'Button to navigate to previous month',
      props: [
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click handler (composition automatically adds previous month navigation)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.NextButton',
      description: 'Button to navigate to next month',
      props: [
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click handler (composition automatically adds next month navigation)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.Heading',
      description: 'Displays current month and year with live region updates',
      props: [
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions',
          default: '{ month: \'long\', year: \'numeric\' }',
          description: 'Date format options for Intl.DateTimeFormat',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale override for formatting (falls back to Calendar.Root locale)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.Grid',
      description: 'Table wrapper for calendar days',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.GridHead',
      description: 'Table header displaying day-of-week labels',
      props: [
        {
          name: 'format',
          type: '\'narrow\' | \'short\' | \'long\'',
          default: '\'narrow\'',
          description: 'Day name format width',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale override for day name formatting',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.GridBody',
      description: 'Table body rendering weeks and days using render function',
      props: [
        {
          name: 'children',
          type: '(date: Date, props: { isOutsideMonth: boolean }) => React.ReactNode',
          description: 'Render function for each day cell',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Calendar.Day',
      description: 'Individual day button with selection state and keyboard navigation',
      props: [
        {
          name: 'date',
          type: 'Date',
          description: 'Date this button represents (required)',
        },
        {
          name: 'isOutsideMonth',
          type: 'boolean',
          description: 'Whether date is outside current displayed month',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click handler (composition automatically adds date selection)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLButtonElement>) => void',
          description: 'Keyboard handler (composition supports arrow keys, Page Up/Down, Home, End)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the day button',
        },
      ],
    },
  ],

  'date-picker': [
    {
      name: 'DatePicker (main)',
      description: 'A styled date picker component with label, helper text, and integrated trigger/content. The default export, suitable for most use cases.',
      props: [
        {
          name: 'value',
          type: 'Date | null',
          description: 'Controlled selected date value',
        },
        {
          name: 'defaultValue',
          type: 'Date | null',
          description: 'Default date when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(date: Date | null, context: PickerChangeContext<DateValidationError>) => void',
          description: 'Callback when date value changes',
        },
        {
          name: 'onValueChange',
          type: '(date: Date | undefined) => void',
          description: 'Simplified callback when date value changes',
        },
        {
          name: 'onAccept',
          type: '(date: Date | null, context: PickerChangeContext<DateValidationError>) => void',
          description: 'Callback when a date is accepted/committed',
        },
        {
          name: 'onError',
          type: '(error: DateValidationError | null, value: Date | null) => void',
          description: 'Callback when validation error occurs',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled popover open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Default open state when uncontrolled',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback when open state changes',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Callback when popover opens',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Callback when popover closes',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'true',
          description: 'Close popover immediately after selecting a date',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable all date picker interactions',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevent value changes (read-only mode)',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable all dates before today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable all dates after today',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Predicate function to disable specific dates',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Predicate function to disable specific dates (alias for disabledDays)',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Predicate function to disable specific months',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Predicate function to disable specific years',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'Starting day of the week (0=Sunday, 1=Monday, etc.)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale for date formatting and localization',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus the trigger on mount',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom formatter for day-of-week headers',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Disable visual highlight of today\'s date',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable opening the date picker (trigger becomes non-interactive)',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show week numbers in the calendar',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed number of weeks to display per month',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ dateStyle: \'medium\' }',
          description: 'Date format for display (Intl options or pattern like \'MM/DD/YYYY\')',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          default: '\'dense\'',
          description: 'Spacing density for formatted date output',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state in popover',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom loading indicator render function',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Display days from adjacent months in calendar grid',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label text displayed above the trigger',
        },
        {
          name: 'helperText',
          type: 'React.ReactNode',
          description: 'Helper text displayed below the trigger',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'MM/DD/YYYY\'',
          description: 'Placeholder text when no date is selected',
        },
        {
          name: 'id',
          type: 'string',
          description: 'HTML id attribute for the trigger element',
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute for the trigger element',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Mark the label with a required indicator',
        },
        {
          name: 'error',
          type: 'boolean',
          description: 'Mark helper text and trigger as errored',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Alias for showDaysOutsideCurrentMonth',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the root wrapper',
        },
        {
          name: 'triggerClassName',
          type: 'string',
          description: 'CSS class for the trigger button',
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'CSS class for the popover content',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS class for the calendar component',
        },
        {
          name: 'rootProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Native HTML props forwarded to root wrapper div (onClick, style, role, data-*, aria-*)',
        },
      ],
    },
    {
      name: 'DatePicker.Root',
      description: 'The root provider component for date picker context and popover state management. Used for building custom layouts.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child components (Trigger, Content, etc.)',
        },
        {
          name: 'value',
          type: 'Date | null',
          description: 'Controlled selected date',
        },
        {
          name: 'defaultValue',
          type: 'Date | null',
          description: 'Default date when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(date: Date | null, context: PickerChangeContext<DateValidationError>) => void',
          description: 'Called when date changes',
        },
        {
          name: 'onValueChange',
          type: '(date: Date | undefined) => void',
          description: 'Simplified date change callback',
        },
        {
          name: 'onAccept',
          type: '(date: Date | null, context: PickerChangeContext<DateValidationError>) => void',
          description: 'Called when date is accepted',
        },
        {
          name: 'onError',
          type: '(error: DateValidationError | null, value: Date | null) => void',
          description: 'Called on validation error',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled popover open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Default popover open state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when popover open state changes',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Called when popover opens',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Called when popover closes',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'true',
          description: 'Auto-close popover after date selection',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable interactions',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Read-only mode',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable past dates',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable future dates',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific dates',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific months',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Predicate to disable specific years',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'First day of week (0=Sunday, 1=Monday, etc.)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale for formatting',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus trigger',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom day-of-week formatter',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'Media query for desktop mode detection',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable opening picker',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show week numbers',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed weeks per month',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          description: 'Date format specification',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          description: 'Format spacing',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to underlying input element',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep popover open when field is focused',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label node',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state',
        },
        {
          name: 'localeText',
          type: 'PickerLocaleText',
          description: 'Localized text overrides (Record<string, React.ReactNode>)',
        },
        {
          name: 'monthsPerRow',
          type: '3 | 4',
          description: 'Months to display per row in month view',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Form input name',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Called when displayed month changes',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(newValue: PickerSelectedSections) => void',
          description: 'Called when selected field section changes',
        },
        {
          name: 'onViewChange',
          type: '(view: DatePickerView) => void',
          description: 'Called when view changes (day/month/year)',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Called when displayed year changes',
        },
        {
          name: 'openTo',
          type: '\'day\' | \'month\' | \'year\'',
          default: '\'day\'',
          description: 'Initial view when opened',
        },
        {
          name: 'orientation',
          type: '\'landscape\' | \'portrait\'',
          description: 'Picker layout orientation',
        },
        {
          name: 'reduceAnimations',
          type: 'boolean',
          description: 'Disable animations',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Reference date for calculations',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom loading render function',
        },
        {
          name: 'selectedSections',
          type: 'PickerSelectedSections',
          description: 'Controlled selected field section',
        },
        {
          name: 'defaultSelectedSections',
          type: 'PickerSelectedSections',
          description: 'Default selected field section',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'slotProps',
          type: 'PickerSlotProps',
          description: 'Slot component props (Record<string, unknown>)',
        },
        {
          name: 'slots',
          type: 'PickerSlots',
          description: 'Slot component overrides (Record<string, React.ElementType>)',
        },
        {
          name: 'sx',
          type: 'PickerSx',
          description: 'System prop styles',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'Timezone for date operations',
        },
        {
          name: 'view',
          type: '\'day\' | \'month\' | \'year\'',
          description: 'Controlled current view',
        },
        {
          name: 'defaultView',
          type: '\'day\' | \'month\' | \'year\'',
          description: 'Default initial view',
        },
        {
          name: 'viewRenderers',
          type: 'Partial<Record<DatePickerView, DatePickerViewRenderer | null>>',
          description: 'Custom renderers per view (day/month/year)',
        },
        {
          name: 'views',
          type: '(\'day\' | \'month\' | \'year\')[]',
          description: 'Array of enabled views',
        },
        {
          name: 'yearsOrder',
          type: '\'asc\' | \'desc\'',
          description: 'Year list sort order',
        },
        {
          name: 'yearsPerRow',
          type: '3 | 4',
          description: 'Years to display per row in year view',
        },
      ],
    },
    {
      name: 'DatePicker.Trigger',
      description: 'The button that opens the date picker popover. Inherits from Popover.Trigger.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the trigger button',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Trigger content',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Click handler',
        },
        {
          name: 'Standard HTML button attributes',
          type: 'various',
          description: 'aria-*, data-*, role, tabIndex, style, etc.',
        },
      ],
    },
    {
      name: 'DatePicker.Content',
      description: 'The popover content wrapper containing the calendar. Inherits from Popover.Content with additional date picker props.',
      props: [
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'center\'',
          description: 'Alignment relative to trigger',
        },
        {
          name: 'side',
          type: '\'top\' | \'right\' | \'bottom\' | \'left\'',
          description: 'Position relative to trigger',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Distance from trigger',
        },
        {
          name: 'alignOffset',
          type: 'number',
          description: 'Alignment offset',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          description: 'Arrow padding from edges',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          description: 'Auto-adjust position to avoid collisions',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | Element[] | null',
          description: 'Collision detection boundary',
        },
        {
          name: 'collisionPadding',
          type: 'number',
          description: 'Padding for collision detection',
        },
        {
          name: 'strategy',
          type: '\'fixed\' | \'absolute\'',
          description: 'Positioning strategy',
        },
        {
          name: 'sticky',
          type: '\'partial\' | \'always\'',
          description: 'Sticky behavior',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          description: 'Hide when trigger is off-screen',
        },
        {
          name: 'updatePositionStrategy',
          type: '\'always\' | \'optimized\'',
          description: 'Position update frequency',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mount in DOM (even when closed)',
        },
        {
          name: 'onOpenAutoFocus',
          type: '(event: Event) => void',
          description: 'Focus trap on open',
        },
        {
          name: 'onCloseAutoFocus',
          type: '(event: Event) => void',
          description: 'Focus return on close',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event: KeyboardEvent) => void',
          description: 'Escape key handler',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event: PointerDownOutsideEvent) => void',
          description: 'Pointer down outside handler',
        },
        {
          name: 'onFocusOutside',
          type: '(event: FocusOutsideEvent) => void',
          description: 'Focus outside handler',
        },
        {
          name: 'onInteractOutside',
          type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
          description: 'Generic outside interaction handler',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS class for inner calendar',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading indicator',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Display adjacent month days',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Display adjacent month days (alias)',
        },
        {
          name: 'Standard HTML div attributes',
          type: 'various',
          description: 'style, data-*, role, aria-*, etc.',
        },
      ],
    },
    {
      name: 'DatePicker.Calendar',
      description: 'The calendar grid component. Inherits from Calendar.Root with date picker context integration.',
      props: [
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable past dates',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable future dates',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable calendar',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Disable predicate for dates',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Disable predicate for dates',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Disable predicate for months',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Disable predicate for years',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'First day of week',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale for formatting',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show week numbers',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed weeks per month',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom day-of-week formatter',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Month change callback',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Year change callback',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show adjacent month days (alias)',
        },
        {
          name: 'Standard HTML div attributes',
          type: 'various',
          description: 'style, data-*, role, aria-*, etc.',
        },
      ],
    },
    {
      name: 'DatePicker.Value',
      description: 'A text component that displays the formatted selected date or a placeholder.',
      props: [
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ dateStyle: \'medium\' }',
          description: 'Date format (Intl options or pattern string)',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          default: '\'dense\'',
          description: 'Spacing for formatted output',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Locale for formatting',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'Pick a date\'',
          description: 'Text when no date is selected',
        },
      ],
    },
    {
      name: 'DatePicker.Loading',
      description: 'A component that displays a loading indicator or custom loading content.',
      props: [
        {
          name: 'No props',
          type: 'none',
          description: 'Uses context renderLoading or localeText.loading from DatePicker.Root',
        },
      ],
    },
  ],

  'date-range-picker': [
    {
      name: 'DateRangePicker',
      description: 'Main date range picker component with integrated label, trigger, and popover content. Accepts all Root props plus styling variants.',
      props: [
        {
          name: 'value',
          type: 'DateRange | DateRangeTuple | null | undefined',
          description: 'The selected date range (controlled)',
        },
        {
          name: 'defaultValue',
          type: 'DateRange | DateRangeTuple | null | undefined',
          default: '{}',
          description: 'Initial date range (uncontrolled)',
        },
        {
          name: 'onChange',
          type: '(range: DateRangeTuple, context: PickerChangeContext<DateRangeValidationError>) => void',
          description: 'Fired when range changes with validation context',
        },
        {
          name: 'onValueChange',
          type: '(range: DateRange) => void',
          description: 'Fired when range changes (alternative callback)',
        },
        {
          name: 'onAccept',
          type: '(range: DateRangeTuple, context: PickerChangeContext<DateRangeValidationError>) => void',
          description: 'Fired when both start and end dates are selected',
        },
        {
          name: 'onError',
          type: '(error: DateRangeValidationError | null, value: DateRangeTuple) => void',
          description: 'Fired when validation error changes',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Whether the popover is open (controlled)',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state (uncontrolled)',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Fired when open state changes',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Fired when popover opens',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Fired when popover closes',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'true',
          description: 'Close popover after both dates are selected',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the entire picker',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevent changes to the range',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable all dates before today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable all dates after today',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Function to determine if a date is disabled',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date, position: DateRangePosition) => boolean',
          description: 'Function to disable dates by position (\'start\' | \'end\')',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          description: 'Day of week calendar starts (0=Sunday, 1=Monday, etc.)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale for date formatting',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus the trigger on mount',
        },
        {
          name: 'calendars',
          type: '1 | 2 | 3',
          default: '2',
          description: 'Number of calendars to display',
        },
        {
          name: 'currentMonthCalendarPosition',
          type: '1 | 2 | 3',
          description: 'Which calendar position shows the current month',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom formatter for day-of-week headers',
        },
        {
          name: 'defaultRangePosition',
          type: '\'start\' | \'end\'',
          default: '\'start\'',
          description: 'Which part of the range to edit initially',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'CSS media query for desktop mode',
        },
        {
          name: 'disableAutoMonthSwitching',
          type: 'boolean',
          description: 'Prevent automatic month switching while selecting',
        },
        {
          name: 'disableDragEditing',
          type: 'boolean',
          description: 'Disable drag-to-select range',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today\'s date',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable opening the picker popover',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show week numbers in calendar',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed number of weeks to display',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ dateStyle: \'medium\' }',
          description: 'Date format for display (e.g., { dateStyle: \'short\' } or \'yyyy-MM-dd\')',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          default: '\'dense\'',
          description: 'Spacing in formatted date output',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to the underlying input element',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep popover open while field is focused',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label text displayed above the trigger',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state',
        },
        {
          name: 'localeText',
          type: 'PickerLocaleText',
          description: 'Locale-specific text overrides',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Name attribute for the trigger input',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Fired when displayed month changes',
        },
        {
          name: 'onRangePositionChange',
          type: '(position: \'start\' | \'end\') => void',
          description: 'Fired when range position changes',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(sections: PickerSelectedSections) => void',
          description: 'Fired when selected date sections change',
        },
        {
          name: 'rangePosition',
          type: '\'start\' | \'end\'',
          description: 'Which part of range is being edited (controlled)',
        },
        {
          name: 'referenceDate',
          type: 'Date | DateRangeTuple',
          description: 'Reference date for picker logic',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom loading state renderer',
        },
        {
          name: 'selectedSections',
          type: 'PickerSelectedSections',
          description: 'Which date sections are selected (controlled)',
        },
        {
          name: 'defaultSelectedSections',
          type: 'PickerSelectedSections',
          description: 'Initial selected sections (uncontrolled)',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show days from adjacent months',
        },
        {
          name: 'slotProps',
          type: 'PickerSlotProps',
          description: 'Props passed to internal slot components',
        },
        {
          name: 'slots',
          type: 'PickerSlots',
          description: 'Custom components for internal slots',
        },
        {
          name: 'sx',
          type: 'PickerSx',
          description: 'Emotion-style sx prop for styling',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'IANA timezone for date operations',
        },
        {
          name: 'viewRenderers',
          type: '{ day?: DateRangePickerViewRenderer | null }',
          description: 'Custom renderer for day view',
        },
        {
          name: 'shortcuts',
          type: 'DateRangePickerShortcut[] | false',
          description: 'Quick-select shortcuts (e.g., \'Last 7 days\'); false hides shortcuts',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the root wrapper',
        },
        {
          name: 'triggerClassName',
          type: 'string',
          description: 'CSS class for the trigger button',
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'CSS class for the popover content',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS class for the calendar grid',
        },
        {
          name: 'helperText',
          type: 'React.ReactNode',
          description: 'Helper text displayed below the trigger',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'MM/DD/YYYY - MM/DD/YYYY\'',
          description: 'Placeholder when no date is selected',
        },
        {
          name: 'separator',
          type: 'string',
          default: '\' – \'',
          description: 'Separator between start and end dates',
        },
        {
          name: 'id',
          type: 'string',
          description: 'HTML id for the trigger element',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Show required indicator in label',
        },
        {
          name: 'error',
          type: 'boolean',
          description: 'Display error state styling',
        },
        {
          name: 'shortcutsClassName',
          type: 'string',
          description: 'CSS class for the shortcuts container',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show days from adjacent months (alias for showDaysOutsideCurrentMonth)',
        },
        {
          name: 'rootProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Native HTML attributes (onClick, style, data-*, aria-*, etc.) on root wrapper',
        },
      ],
    },
    {
      name: 'DateRangePicker.Root',
      description: 'Low-level root container for date range picker state (primitives layer)',
      props: [
        {
          name: 'value',
          type: 'DateRange | DateRangeTuple | null | undefined',
          description: 'The selected date range (controlled)',
        },
        {
          name: 'defaultValue',
          type: 'DateRange | DateRangeTuple | null | undefined',
          default: '{}',
          description: 'Initial date range (uncontrolled)',
        },
        {
          name: 'onChange',
          type: '(range: DateRangeTuple, context: PickerChangeContext<DateRangeValidationError>) => void',
          description: 'Fired when range changes',
        },
        {
          name: 'onValueChange',
          type: '(range: DateRange) => void',
          description: 'Fired when range changes (alternative)',
        },
        {
          name: 'onAccept',
          type: '(range: DateRangeTuple, context: PickerChangeContext<DateRangeValidationError>) => void',
          description: 'Fired when complete range is selected',
        },
        {
          name: 'onError',
          type: '(error: DateRangeValidationError | null, value: DateRangeTuple) => void',
          description: 'Fired when validation error changes',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Popover open state (controlled)',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial popover state (uncontrolled)',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Fired when open state changes',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Fired when popover opens',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Fired when popover closes',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'true',
          description: 'Close popover after both dates selected',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the picker',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevent changes',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable dates before today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable dates after today',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Custom date disable function',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date, position: \'start\' | \'end\') => boolean',
          description: 'Disable by range position',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          description: 'First day of week (0-6)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus on mount',
        },
        {
          name: 'calendars',
          type: '1 | 2 | 3',
          description: 'Number of calendars',
        },
        {
          name: 'currentMonthCalendarPosition',
          type: '1 | 2 | 3',
          description: 'Calendar position showing current month',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom weekday formatter',
        },
        {
          name: 'defaultRangePosition',
          type: '\'start\' | \'end\'',
          default: '\'start\'',
          description: 'Initial range position',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'Desktop mode media query',
        },
        {
          name: 'disableAutoMonthSwitching',
          type: 'boolean',
          description: 'Prevent auto month switch',
        },
        {
          name: 'disableDragEditing',
          type: 'boolean',
          description: 'Disable drag-to-select',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable opening picker',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show week numbers',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Fixed week count',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          description: 'Date format options',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          default: '\'dense\'',
          description: 'Format spacing',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to input element',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep open during focus',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label text',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Loading state',
        },
        {
          name: 'localeText',
          type: 'Record<string, React.ReactNode>',
          description: 'Locale text overrides',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Input name attribute',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Fired when displayed month changes',
        },
        {
          name: 'onRangePositionChange',
          type: '(position: \'start\' | \'end\') => void',
          description: 'Fired when range position changes',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(sections: PickerSelectedSections) => void',
          description: 'Fired when selected sections change',
        },
        {
          name: 'rangePosition',
          type: '\'start\' | \'end\'',
          description: 'Current range position (controlled)',
        },
        {
          name: 'referenceDate',
          type: 'Date | DateRangeTuple',
          description: 'Reference date',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom loading renderer',
        },
        {
          name: 'selectedSections',
          type: 'PickerSelectedSections',
          description: 'Selected sections (controlled)',
        },
        {
          name: 'defaultSelectedSections',
          type: 'PickerSelectedSections',
          description: 'Initial sections (uncontrolled)',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'slotProps',
          type: 'Record<string, unknown>',
          description: 'Slot component props',
        },
        {
          name: 'slots',
          type: 'Record<string, React.ElementType | null | undefined>',
          description: 'Custom slot components',
        },
        {
          name: 'sx',
          type: 'PickerSx',
          description: 'Emotion sx prop',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'IANA timezone',
        },
        {
          name: 'viewRenderers',
          type: '{ day?: DateRangePickerViewRenderer | null }',
          description: 'Custom view renderer',
        },
        {
          name: 'shortcuts',
          type: 'DateRangePickerShortcut[] | false',
          description: 'Shortcut buttons',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child components',
        },
      ],
    },
    {
      name: 'DateRangePicker.Trigger',
      description: 'Button that opens the date range picker popover',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Trigger content (icon, text, etc.)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the trigger',
        },
        {
          name: 'aria-invalid',
          type: 'boolean | \'true\' | \'false\'',
          description: 'Marks invalid state for assistive tech',
        },
        {
          name: 'aria-describedby',
          type: 'string',
          description: 'Helper text element id',
        },
        {
          name: 'aria-label',
          type: 'string',
          description: 'Accessible label',
        },
      ],
    },
    {
      name: 'DateRangePicker.Content',
      description: 'Popover content containing calendar and shortcuts',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom content (overrides defaults)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class on content wrapper',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'center\'',
          description: 'Popover alignment relative to trigger',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Distance from trigger in pixels',
        },
        {
          name: 'calendars',
          type: '1 | 2 | 3',
          description: 'Number of calendars to display',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS class on calendar wrapper',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state',
        },
        {
          name: 'shortcuts',
          type: 'DateRangePickerShortcut[] | false',
          description: 'Quick-select shortcuts (false hides)',
        },
        {
          name: 'shortcutsClassName',
          type: 'string',
          description: 'CSS class on shortcuts container',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days (alias)',
        },
      ],
    },
    {
      name: 'DateRangePicker.Calendar',
      description: 'Styled calendar display with 1-3 month grids',
      props: [
        {
          name: 'calendars',
          type: '1 | 2 | 3',
          default: '2',
          description: 'Number of calendars to show',
        },
        {
          name: 'month',
          type: 'Date',
          description: 'Displayed month (controlled)',
        },
        {
          name: 'defaultMonth',
          type: 'Date',
          description: 'Initial month (uncontrolled)',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Fired when month changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class on wrapper',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days (alias)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale',
        },
      ],
    },
    {
      name: 'DateRangePicker.CalendarMonth',
      description: 'Single month calendar grid',
      props: [
        {
          name: 'month',
          type: 'Date',
          description: 'Month to display',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show adjacent month days',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month days (alias)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale',
        },
      ],
    },
    {
      name: 'DateRangePicker.Shortcuts',
      description: 'Container for quick-select shortcut buttons',
      props: [
        {
          name: 'shortcuts',
          type: 'DateRangePickerShortcut[]',
          description: 'Array of shortcut definitions',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class on container',
        },
      ],
    },
    {
      name: 'DateRangePicker.Value',
      description: 'Displays the formatted selected date range',
      props: [
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ dateStyle: \'medium\' }',
          description: 'Date format (e.g., { dateStyle: \'short\' } or \'yyyy-MM-dd\')',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          default: '\'dense\'',
          description: 'Spacing in formatted output',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale for formatting',
        },
        {
          name: 'separator',
          type: 'string',
          default: '\' – \'',
          description: 'Separator between dates',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'Pick a date range\'',
          description: 'Text when no date selected',
        },
      ],
    },
    {
      name: 'DateRangePicker.Loading',
      description: 'Displays loading state message',
      props: [],
    },
    {
      name: 'DateRangePicker.Portal',
      description: 'Portal container for popover content (re-exported from Popover primitive)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to portal',
        },
      ],
    },
    {
      name: 'DateRangePicker.Anchor',
      description: 'Anchor point for popover positioning (re-exported from Popover primitive)',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Anchor content',
        },
      ],
    },
    {
      name: 'DateRangePickerShortcut',
      description: 'Type definition for quick-select shortcuts',
      props: [
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Display text for the shortcut button',
        },
        {
          name: 'getValue',
          type: '(today: Date) => DateRange | DateRangeTuple | null | undefined',
          description: 'Function returning the range when shortcut is selected',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable this shortcut',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          description: 'Close popover after selecting this shortcut',
        },
      ],
    },
  ],

  'time-picker': [
    {
      name: 'TimePicker (default export / TimePickerRoot)',
      description: 'The main time picker component with popover trigger, clock panel, and form integration. Supports controlled and uncontrolled value states.',
      props: [
        {
          name: 'value',
          type: 'Date | { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' } | null | undefined',
          description: 'Controlled time value (Date or TimeValue object)',
        },
        {
          name: 'defaultValue',
          type: 'Date | { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' } | null | undefined',
          description: 'Initial time value when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(value: Date | null, context: { validationError: TimeValidationError | null; source: \'view\' | \'field\' | \'shortcut\' | \'unknown\' }) => void',
          description: 'Fired when time changes via any source (clock, keyboard, etc.)',
        },
        {
          name: 'onValueChange',
          type: '(v: { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' }) => void',
          description: 'Fired with TimeValue object when time changes',
        },
        {
          name: 'onAccept',
          type: '(value: Date | null, context: { validationError: TimeValidationError | null; source: \'view\' }) => void',
          description: 'Fired when user accepts selection (OK button or closeOnSelect)',
        },
        {
          name: 'onError',
          type: '(error: \'minTime\' | \'maxTime\' | \'minutesStep\' | \'shouldDisableTime\' | null, value: Date | null) => void',
          description: 'Fired when validation error state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the picker and all interactions',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          default: 'false',
          description: 'Makes the picker read-only; prevents value changes',
        },
        {
          name: 'ampm',
          type: 'boolean',
          default: 'true',
          description: 'Show AM/PM selector and use 12-hour format (overrides hour12 if provided)',
        },
        {
          name: 'hour12',
          type: 'boolean',
          description: 'Use 12-hour format (overridden by ampm if both present)',
        },
        {
          name: 'withSeconds',
          type: 'boolean',
          default: 'false',
          description: 'Include seconds picker clock view',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'false',
          description: 'Close popover after selecting a value',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          default: 'false',
          description: 'Disable the trigger button (popover cannot be opened)',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time (validation + clock disabling)',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time (validation + clock disabling)',
        },
        {
          name: 'minutesStep',
          type: 'number',
          default: '1',
          description: 'Step for minute picker; disables non-aligned minutes on clock',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\') => boolean',
          description: 'Custom validation function to disable specific times',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'Hide disabled clock positions instead of showing them grayed out',
        },
        {
          name: 'timeSteps',
          type: '{ hours?: number; minutes?: number; seconds?: number }',
          description: 'Increment steps for each clock view',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Fallback date used when value is a TimeValue object (for time-only conversion)',
        },
        {
          name: 'views',
          type: '(\'hours\' | \'minutes\' | \'seconds\')[]',
          description: 'Restrict which clock views are available',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale string for Intl formatting (future)',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Visible label above the trigger button',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'HH:mm\'',
          description: 'Text displayed when no time is selected',
        },
        {
          name: 'helperText',
          type: 'React.ReactNode',
          description: 'Small text below the trigger (e.g. error or hint)',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Show required asterisk in label',
        },
        {
          name: 'error',
          type: 'boolean',
          description: 'Highlight field as erroneous; sets aria-invalid and error text color',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ timeStyle: \'short\' }',
          description: 'Format for displaying selected time in trigger (e.g. \'HH:mm:ss\' or Intl options)',
        },
        {
          name: 'id',
          type: 'string',
          description: 'HTML id for the trigger button and label association',
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name for the trigger button (future form integration)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the root wrapper div',
        },
        {
          name: 'triggerClassName',
          type: 'string',
          description: 'CSS class for the trigger button',
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'CSS class for the popover content wrapper',
        },
        {
          name: 'columnClassName',
          type: 'string',
          description: 'CSS class for clock number buttons',
        },
        {
          name: 'rootProps',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'Props forwarded to the root div (onClick, style, role, tabIndex, data-*, aria-*)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref forwarded to the root wrapper div',
        },
      ],
    },
    {
      name: 'TimePicker.Root',
      description: 'Primitive headless root that provides context for segments and manages controlled time state. Extends div.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace with child element (Radix compound pattern)',
        },
        {
          name: 'value',
          type: 'Date | { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' } | null | undefined',
          description: 'Controlled time value',
        },
        {
          name: 'defaultValue',
          type: 'Date | { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' } | null | undefined',
          description: 'Initial time value when uncontrolled',
        },
        {
          name: 'onChange',
          type: '(value: Date | null, context: { validationError: TimeValidationError | null; source: \'view\' }) => void',
          description: 'Fired when time changes from segments',
        },
        {
          name: 'onValueChange',
          type: '(v: { hour: number; minute: number; second?: number; period?: \'am\' | \'pm\' }) => void',
          description: 'Fired with TimeValue when time changes',
        },
        {
          name: 'onAccept',
          type: '(value: Date | null, context: { validationError: TimeValidationError | null; source: \'view\' }) => void',
          description: 'Fired on closeOnSelect',
        },
        {
          name: 'onError',
          type: '(error: TimeValidationError | null, value: Date | null) => void',
          description: 'Fired when validation error changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables all segments and interactions',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevents value changes',
        },
        {
          name: 'hour12',
          type: 'boolean',
          default: 'false',
          description: 'Use 12-hour format for hours segment',
        },
        {
          name: 'ampm',
          type: 'boolean',
          description: 'Enable AM/PM period segment (overrides hour12)',
        },
        {
          name: 'withSeconds',
          type: 'boolean',
          default: 'false',
          description: 'Include seconds segment',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'false',
          description: 'Trigger onAccept on value change',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time',
        },
        {
          name: 'minutesStep',
          type: 'number',
          description: 'Minutes increment (>1 fails validation for non-aligned values)',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable times before current moment',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable times after current moment',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\') => boolean',
          description: 'Custom validation predicate',
        },
        {
          name: 'disableIgnoringDatePartForTimeValidation',
          type: 'boolean',
          description: 'Use full Date context for minTime/maxTime comparison (future)',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Fallback date for TimeValue to Date conversion',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Form label (future)',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Hidden input name (future)',
        },
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          description: 'Display format (future)',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Controlled open state change (future)',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(newValue: \'all\' | \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\' | number | null) => void',
          description: 'Segment selection changed (future)',
        },
        {
          name: 'onViewChange',
          type: '(view: \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\') => void',
          description: 'Clock view changed (future)',
        },
        {
          name: 'selectedSections',
          type: '\'all\' | \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\' | number | null',
          description: 'Controlled selected segment (future)',
        },
        {
          name: 'defaultSelectedSections',
          type: '\'all\' | \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\' | number | null',
          description: 'Initial selected segment (future)',
        },
        {
          name: 'view',
          type: '\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\'',
          description: 'Controlled active clock view (future)',
        },
        {
          name: 'defaultView',
          type: '\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\'',
          description: 'Initial active clock view (future)',
        },
        {
          name: 'timeSteps',
          type: '{ hours?: number; minutes?: number; seconds?: number }',
          description: 'Increment steps per view',
        },
        {
          name: 'views',
          type: '(\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\')[]',
          description: 'Allowed clock views (future)',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to hidden input (future)',
        },
        {
          name: 'localeText',
          type: 'Record<string, React.ReactNode>',
          description: 'i18n string overrides (future)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale (future)',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          description: 'Spacing density for format (future)',
        },
        {
          name: 'orientation',
          type: '\'landscape\' | \'portrait\'',
          description: 'Clock layout orientation (future)',
        },
        {
          name: 'readOnlyInput',
          type: 'boolean',
          description: 'Make text non-editable (future)',
        },
        {
          name: 'reduceAnimations',
          type: 'boolean',
          description: 'Disable CSS transitions (future)',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep popover open while segment focused (future)',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'Responsive layout trigger (future)',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Hide popover trigger icon (future)',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus first segment (future)',
        },
        {
          name: 'ampmInClock',
          type: 'boolean',
          description: 'AM/PM indicator in analog clock (future)',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'Skip disabled values on navigation (future)',
        },
        {
          name: 'thresholdToRenderTimeInASingleColumn',
          type: 'number',
          description: 'Single-column clock threshold (future)',
        },
        {
          name: 'slotProps',
          type: 'Record<string, unknown>',
          description: 'Per-slot prop overrides (future)',
        },
        {
          name: 'slots',
          type: 'Record<string, React.ElementType | null | undefined>',
          description: 'Slot component overrides (future)',
        },
        {
          name: 'sx',
          type: 'Record<string, unknown> | (theme: unknown) => Record<string, unknown>',
          description: 'MUI system sx prop (future)',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'IANA timezone string (future)',
        },
        {
          name: 'viewRenderers',
          type: 'Partial<Record<\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\', (params: { view: TimePickerView; value: Date | null; onChange: (value: Date | null) => void }) => React.ReactNode | null>>',
          description: 'Custom view render functions (future)',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state (future)',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Initial open state (future)',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Popover opened (future)',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Popover closed (future)',
        },
        {
          name: 'openTo',
          type: '\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\'',
          default: '\'hours\'',
          description: 'Initial clock view (future)',
        },
      ],
    },
    {
      name: 'TimePicker.Segment',
      description: 'Spinbutton for individual time segments (hour, minute, second, period). Responds to arrow keys and keyboard input.',
      props: [
        {
          name: 'segment',
          type: '\'hour\' | \'minute\' | \'second\' | \'period\'',
          description: 'Which segment this spinbutton represents',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the segment span',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Ref to the span element',
        },
      ],
    },
    {
      name: 'TimePicker.Separator',
      description: 'Visual separator between segments (e.g. colons between HH:mm:ss).',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          default: '\':\'',
          description: 'Separator content',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the span',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Ref to the span element',
        },
      ],
    },
    {
      name: 'TimePicker.Value',
      description: 'Formatted display of the selected time. Supports Intl.DateTimeFormat or custom format strings.',
      props: [
        {
          name: 'format',
          type: 'Intl.DateTimeFormatOptions | string',
          default: '{ timeStyle: \'short\' }',
          description: 'Format spec (Intl options or template string with HH/H/hh/h/mm/m/ss/s/aa/a tokens)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale for Intl formatting',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'Pick a time\'',
          description: 'Text shown when no time is selected',
        },
      ],
    },
    {
      name: 'TimePicker.Panel',
      description: 'Standalone analog clock panel for time selection. Used internally by the main TimePicker but can be used independently.',
      props: [
        {
          name: 'value',
          type: 'Date | null',
          description: 'Current selected time',
        },
        {
          name: 'onChange',
          type: '(value: Date) => void',
          description: 'Fired as user adjusts clock hands',
        },
        {
          name: 'onAccept',
          type: '(value: Date) => void',
          description: 'Fired when OK button clicked',
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: 'Fired when Cancel button clicked',
        },
        {
          name: 'ampm',
          type: 'boolean',
          default: 'true',
          description: 'Show AM/PM toggle',
        },
        {
          name: 'withSeconds',
          type: 'boolean',
          description: 'Include seconds clock view',
        },
        {
          name: 'minutesStep',
          type: 'number',
          description: 'Minute increment; disables non-aligned positions on clock',
        },
        {
          name: 'timeSteps',
          type: '{ hours?: number; minutes?: number; seconds?: number }',
          description: 'Step size per view',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time (disables positions on clock)',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time (disables positions on clock)',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: \'hours\' | \'minutes\' | \'seconds\' | \'meridiem\') => boolean',
          description: 'Custom validation to disable clock positions',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'Hide disabled positions instead of showing them faded',
        },
        {
          name: 'views',
          type: '(\'hours\' | \'minutes\' | \'seconds\' | \'meridiem\')[]',
          description: 'Restrict which clock views are available',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Fallback date when value is undefined',
        },
        {
          name: 'columnClassName',
          type: 'string',
          description: 'CSS class for clock number buttons',
        },
        {
          name: 'title',
          type: 'React.ReactNode',
          default: '\'SELECT TIME\'',
          description: 'Header text above clock',
        },
        {
          name: 'showActions',
          type: 'boolean',
          default: 'true',
          description: 'Show OK/Cancel buttons',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class for the panel wrapper',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Ref to the panel div',
        },
      ],
    },
  ],

  'date-time-picker': [
    {
      name: 'DateTimePicker (default export / Root component)',
      description: 'Styled date-time picker component with integrated label, helper text, and trigger. A wrapper around the primitive Root with added UI styling and convenience props.',
      props: [
        {
          name: 'value',
          type: 'Date | null',
          description: 'Controlled date-time value',
        },
        {
          name: 'defaultValue',
          type: 'Date | null',
          description: 'Uncontrolled initial date-time value',
        },
        {
          name: 'onChange',
          type: '(value: Date | null, context: PickerChangeContext<DateTimeValidationError>) => void',
          description: 'Fires on any internal state change (view switch, validation, etc.); includes validation error context',
        },
        {
          name: 'onValueChange',
          type: '(value: Date | undefined) => void',
          description: 'Simplified callback; fires when a date/time is committed',
        },
        {
          name: 'onAccept',
          type: '(value: Date | null, context: PickerChangeContext<DateTimeValidationError>) => void',
          description: 'Fires only when a date-time selection is explicitly accepted (e.g., closeOnSelect or accept button)',
        },
        {
          name: 'onError',
          type: '(error: DateTimeValidationError | null, value: Date | null) => void',
          description: 'Fires when validation state changes; passes current error (null if valid) and the value',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state of the popover',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Uncontrolled initial open state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Fires when popover open state changes',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Fires when popover opens',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Fires when popover closes',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'false',
          description: 'Auto-close popover after a time segment is committed (in time picker mode)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable all interaction; disables trigger button and blocks value changes',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevent value changes but allow viewing/navigation',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date (inclusive); enforced by calendar and validation',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date (inclusive); enforced by calendar and validation',
        },
        {
          name: 'minDateTime',
          type: 'Date',
          description: 'Minimum selectable date-time; used in validation',
        },
        {
          name: 'maxDateTime',
          type: 'Date',
          description: 'Maximum selectable date-time; used in validation',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time of day; validated against time picker',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time of day; validated against time picker',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Prevent selection of any date/time in the past relative to today',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Prevent selection of any date/time in the future relative to today',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Callback to disable specific dates (deprecated alias for shouldDisableDate)',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Callback to disable specific calendar dates; used in validation',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Callback to disable specific months; used in validation and calendar navigation',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Callback to disable specific years; used in validation and calendar navigation',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: TimePickerView) => boolean',
          description: 'Callback to disable specific times based on the current view (hours/minutes/seconds)',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          description: 'Day index (0–6) that weeks start on in the calendar; 0 = Sunday',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale tag; affects calendar headers, month names, and time formatting',
        },
        {
          name: 'ampm',
          type: 'boolean',
          description: 'Use 12-hour format in time picker and Value display (true = AM/PM, false = 24-hour)',
        },
        {
          name: 'ampmInClock',
          type: 'boolean',
          description: 'If true, display AM/PM selector in clock/time picker (when using time views)',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus the trigger button on mount',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom formatter for day-of-week labels in the calendar header',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'Media query string to determine desktop vs mobile layout',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Remove visual highlight on today\'s date in the calendar',
        },
        {
          name: 'disableIgnoringDatePartForTimeValidation',
          type: 'boolean',
          description: 'Include date part in time validation (normally only time is checked against minTime/maxTime)',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable the trigger button (prevents opening); different from disabled which also blocks internal state changes',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show ISO week numbers in the calendar grid',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Force a fixed number of weeks in the calendar grid (e.g. 6 for consistent height)',
        },
        {
          name: 'format',
          type: 'string | Intl.DateTimeFormatOptions',
          description: 'Format for the Value display; string uses custom tokens (yyyy, MM, dd, HH, mm, ss, aa), or pass Intl options',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          description: 'Compact or spacious date/time field layout in some internal views',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref forwarded to internal input element (if any)',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep popover open when field receives focus (normally closes on blur)',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label text or node displayed above the trigger; adds * if required=true',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state instead of the picker content',
        },
        {
          name: 'localeText',
          type: 'PickerLocaleText',
          description: 'Object of translated UI strings (e.g. { loading: \'Loading...\', ... })',
        },
        {
          name: 'minutesStep',
          type: 'number',
          description: 'Step size for minute increments in the time picker (default from timeSteps.minutes)',
        },
        {
          name: 'monthsPerRow',
          type: '3 | 4',
          description: 'Number of month columns in month-picker view (3 or 4)',
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute for the trigger button',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Fires when the user navigates to a different month in the calendar',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(newValue: PickerSelectedSections) => void',
          description: 'Fires when the selected field section changes (for field-based input modes)',
        },
        {
          name: 'onViewChange',
          type: '(view: DateTimePickerView) => void',
          description: 'Fires when the internal view switches (day → hours, etc.)',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Fires when the user navigates to a different year in the calendar',
        },
        {
          name: 'openTo',
          type: 'DateTimePickerView',
          default: '\'day\'',
          description: 'Initial view to display when popover opens (e.g. \'day\', \'month\', \'hours\')',
        },
        {
          name: 'orientation',
          type: '\'landscape\' | \'portrait\'',
          description: 'Layout orientation hint for the picker',
        },
        {
          name: 'reduceAnimations',
          type: 'boolean',
          description: 'Disable animations and transitions',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Base date used for context (e.g. when navigating time without a selected date)',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom render function for the loading state',
        },
        {
          name: 'selectedSections',
          type: 'PickerSelectedSections',
          description: 'Controlled selected section in field-based input (day, month, hours, minutes, etc., or \'all\')',
        },
        {
          name: 'defaultSelectedSections',
          type: 'PickerSelectedSections',
          description: 'Uncontrolled initial selected section',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Display dates from adjacent months in the calendar grid',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'In time picker, skip over disabled time values when using arrow keys',
        },
        {
          name: 'slotProps',
          type: 'PickerSlotProps',
          description: 'Props to pass to internal slot components (advanced)',
        },
        {
          name: 'slots',
          type: 'PickerSlots',
          description: 'Replace internal components via slot (advanced)',
        },
        {
          name: 'sx',
          type: 'PickerSx',
          description: 'MUI-style sx prop for styling (advanced)',
        },
        {
          name: 'thresholdToRenderTimeInASingleColumn',
          type: 'number',
          description: 'Break point (in pixels) below which time picker switches to single-column layout',
        },
        {
          name: 'timeSteps',
          type: 'TimeSteps',
          description: 'Object { hours?, minutes?, seconds? } defining step size for each time unit',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'IANA timezone identifier (if supported by underlying implementation)',
        },
        {
          name: 'view',
          type: 'DateTimePickerView',
          description: 'Controlled current view (day/month/year/hours/minutes/seconds/meridiem)',
        },
        {
          name: 'defaultView',
          type: 'DateTimePickerView',
          description: 'Uncontrolled initial view (overrides openTo if not controlled)',
        },
        {
          name: 'viewRenderers',
          type: 'Partial<Record<DateTimePickerView, DateTimePickerViewRenderer | null>>',
          description: 'Custom renderers for specific views (advanced); null disables that view',
        },
        {
          name: 'views',
          type: 'DateTimePickerView[]',
          description: 'Array of enabled views (e.g. [\'day\', \'hours\', \'minutes\']); determines available navigation',
        },
        {
          name: 'yearsOrder',
          type: '\'asc\' | \'desc\'',
          description: 'Sort order of year options in year picker',
        },
        {
          name: 'yearsPerRow',
          type: '3 | 4',
          description: 'Number of year columns in year-picker view',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class applied to the root wrapper div',
        },
        {
          name: 'triggerClassName',
          type: 'string',
          description: 'CSS class applied to the trigger button (in addition to base button styles)',
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'CSS class applied to the popover content container',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS class applied to the calendar grid',
        },
        {
          name: 'helperText',
          type: 'React.ReactNode',
          description: 'Helper/description text displayed below the trigger; styled as muted',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          description: 'Placeholder text when no value is selected (passed to Value component)',
        },
        {
          name: 'id',
          type: 'string',
          description: 'HTML id for the trigger button (auto-generated if not provided)',
        },
        {
          name: 'required',
          type: 'boolean',
          description: 'Mark label with * and set aria-required; does not enforce validation',
        },
        {
          name: 'error',
          type: 'boolean',
          description: 'Set aria-invalid on trigger and apply error styling to helperText',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Alias for showDaysOutsideCurrentMonth (for convenience)',
        },
      ],
    },
    {
      name: 'DateTimePicker.Trigger',
      description: 'Button that toggles the popover open/closed; pre-styled with calendar icon and default value display',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (merged with base button styles)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: '<DateTimePickerPrimitive.Value />',
          description: 'Content; defaults to formatted date-time value if not provided',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable the button',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLButtonElement>',
          description: 'Standard HTML button attributes (onClick, onFocus, etc.)',
        },
      ],
    },
    {
      name: 'DateTimePicker.Content',
      description: 'Popover content container; renders calendar + time picker panels with loading state support',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (merged with popover base styles)',
        },
        {
          name: 'align',
          type: '\'start\' | \'center\' | \'end\'',
          default: '\'center\'',
          description: 'Popover alignment relative to trigger',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '6',
          description: 'Distance (px) between popover and trigger',
        },
        {
          name: 'calendarClassName',
          type: 'string',
          description: 'CSS classes for the calendar grid inside Content',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state instead of date/time pickers',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Pass through to Calendar (show adjacent month dates)',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Pass through to Calendar (show adjacent month dates); alias for showOutsideDays',
        },
        {
          name: 'withSeconds',
          type: 'boolean',
          description: 'Include seconds field in time picker display',
        },
        {
          name: 'ampm',
          type: 'boolean',
          description: 'Use 12-hour format in time picker',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time; passed to TimePickerPanel',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time; passed to TimePickerPanel',
        },
        {
          name: 'minutesStep',
          type: 'number',
          description: 'Step size for minute increments; passed to TimePickerPanel',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: TimePickerView) => boolean',
          description: 'Disable specific times; passed to TimePickerPanel',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'Skip disabled time values in navigation; passed to TimePickerPanel',
        },
        {
          name: 'timeSteps',
          type: 'TimeSteps',
          description: 'Time step config; passed to TimePickerPanel',
        },
        {
          name: 'views',
          type: 'DateTimePickerView[]',
          description: 'Enabled views; passed to TimePickerPanel for filtering time views',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom content; if provided, overrides default calendar + time picker layout',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'DateTimePicker.Calendar',
      description: 'Calendar grid for selecting the date part; renders month/year/day views with styled day buttons',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes (merged with base calendar styles)',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          description: 'Show dates from adjacent months in the grid',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Alias for showOutsideDays',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale (inherited from Root context)',
        },
        {
          name: '...other',
          type: 'Omit<CalendarPrimitive.CalendarRootProps, \'selected\' | \'onSelect\' | \'mode\'>',
          description: 'Calendar props; selected/onSelect/mode are internally controlled',
        },
      ],
    },
    {
      name: 'DateTimePicker.DatePanel',
      description: 'Container shown when the date view is active; renders the Calendar inside',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'DateTimePicker.TimePanel',
      description: 'Container shown when a time view is active; renders time picker controls with date switcher button',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode | (props: TimePanelRenderProps) => React.ReactNode',
          description: 'Content or render function; receive value, onChange, onAccept, onCancel, view, setView',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Standard HTML div attributes',
        },
      ],
    },
    {
      name: 'DateTimePicker.DateButton',
      description: 'Button inside TimePanel to switch back to date picker; labeled \'Change date\'',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (merged with base button styles)',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLButtonElement>',
          description: 'Standard HTML button attributes',
        },
      ],
    },
    {
      name: 'DateTimePicker.Segment',
      description: 'Spinbutton-style segment (hour, minute, second, or AM/PM) in the time picker; keyboard-navigable with arrow keys',
      props: [
        {
          name: 'segment',
          type: '\'hour\' | \'minute\' | \'second\' | \'period\'',
          description: 'Which time segment this control represents',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes (merged with base segment styles)',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Standard HTML span attributes; ArrowUp/ArrowDown adjust the value',
        },
      ],
    },
    {
      name: 'DateTimePicker.Separator',
      description: 'Visual separator (typically \':\') between time segments',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: '\':\'',
          description: 'Separator character or content',
        },
        {
          name: '...other',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Standard HTML span attributes',
        },
      ],
    },
    {
      name: 'DateTimePicker.Value',
      description: 'Formatted display of the selected date-time; used as default Trigger/Content children',
      props: [
        {
          name: 'format',
          type: 'string | Intl.DateTimeFormatOptions',
          default: '{ dateStyle: \'medium\', timeStyle: \'short\' }',
          description: 'Format for display; string uses custom tokens (yyyy, MM, dd, HH, mm, ss, aa)',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale for Intl.DateTimeFormat',
        },
        {
          name: 'placeholder',
          type: 'React.ReactNode',
          default: '\'Pick date and time\'',
          description: 'Fallback text when no value is selected',
        },
      ],
    },
    {
      name: 'DateTimePicker.Loading',
      description: 'Loading state display; shown in Content when loading=true',
      props: [],
    },
    {
      name: 'DateTimePicker.Root (primitive export)',
      description: 'Unstyled primitive root; provides context and state management for all sub-components. Use this for fully custom layouts.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Sub-components (Trigger, Content, Calendar, TimePanel, etc.)',
        },
        {
          name: 'value',
          type: 'Date | null',
          description: 'Controlled date-time value',
        },
        {
          name: 'defaultValue',
          type: 'Date | null',
          description: 'Uncontrolled initial date-time value',
        },
        {
          name: 'onChange',
          type: '(value: Date | null, context: PickerChangeContext<DateTimeValidationError>) => void',
          description: 'Internal state change callback with validation context',
        },
        {
          name: 'onValueChange',
          type: '(value: Date | undefined) => void',
          description: 'Committed value change callback',
        },
        {
          name: 'onAccept',
          type: '(value: Date | null, context: PickerChangeContext<DateTimeValidationError>) => void',
          description: 'Explicit accept (close) callback',
        },
        {
          name: 'onError',
          type: '(error: DateTimeValidationError | null, value: Date | null) => void',
          description: 'Validation error change callback',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled popover open state',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Uncontrolled initial open state',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Open state change callback',
        },
        {
          name: 'onOpen',
          type: '() => void',
          description: 'Popover opened callback',
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Popover closed callback',
        },
        {
          name: 'closeOnSelect',
          type: 'boolean',
          default: 'false',
          description: 'Auto-close on time segment commit',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable interactions',
        },
        {
          name: 'readOnly',
          type: 'boolean',
          description: 'Prevent changes but allow viewing',
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date',
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date',
        },
        {
          name: 'minDateTime',
          type: 'Date',
          description: 'Minimum selectable date-time',
        },
        {
          name: 'maxDateTime',
          type: 'Date',
          description: 'Maximum selectable date-time',
        },
        {
          name: 'minTime',
          type: 'Date',
          description: 'Minimum selectable time of day',
        },
        {
          name: 'maxTime',
          type: 'Date',
          description: 'Maximum selectable time of day',
        },
        {
          name: 'disablePast',
          type: 'boolean',
          description: 'Disable past dates/times',
        },
        {
          name: 'disableFuture',
          type: 'boolean',
          description: 'Disable future dates/times',
        },
        {
          name: 'disabledDays',
          type: '(date: Date) => boolean',
          description: 'Deprecated; use shouldDisableDate',
        },
        {
          name: 'shouldDisableDate',
          type: '(date: Date) => boolean',
          description: 'Custom date disable logic',
        },
        {
          name: 'shouldDisableMonth',
          type: '(date: Date) => boolean',
          description: 'Custom month disable logic',
        },
        {
          name: 'shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Custom year disable logic',
        },
        {
          name: 'shouldDisableTime',
          type: '(value: Date, view: TimePickerView) => boolean',
          description: 'Custom time disable logic',
        },
        {
          name: 'weekStartsOn',
          type: 'number',
          description: 'Day index (0=Sunday) that weeks start on',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'BCP 47 locale tag',
        },
        {
          name: 'ampm',
          type: 'boolean',
          default: 'false',
          description: 'Use 12-hour format',
        },
        {
          name: 'ampmInClock',
          type: 'boolean',
          description: 'Show AM/PM selector in time views',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          description: 'Auto-focus first interactive element',
        },
        {
          name: 'dayOfWeekFormatter',
          type: '(date: Date) => string',
          description: 'Custom day-of-week label formatter',
        },
        {
          name: 'desktopModeMediaQuery',
          type: 'string',
          description: 'Media query for desktop mode',
        },
        {
          name: 'disableHighlightToday',
          type: 'boolean',
          description: 'Don\'t highlight today\'s date',
        },
        {
          name: 'disableIgnoringDatePartForTimeValidation',
          type: 'boolean',
          description: 'Include date in time validation',
        },
        {
          name: 'disableOpenPicker',
          type: 'boolean',
          description: 'Disable opening the picker',
        },
        {
          name: 'displayWeekNumber',
          type: 'boolean',
          description: 'Show ISO week numbers',
        },
        {
          name: 'fixedWeekNumber',
          type: 'number',
          description: 'Force fixed number of weeks in calendar',
        },
        {
          name: 'format',
          type: 'string | Intl.DateTimeFormatOptions',
          description: 'Value display format',
        },
        {
          name: 'formatDensity',
          type: '\'dense\' | \'spacious\'',
          description: 'Field density',
        },
        {
          name: 'inputRef',
          type: 'React.Ref<HTMLInputElement>',
          description: 'Ref to internal input (if present)',
        },
        {
          name: 'keepOpenDuringFieldFocus',
          type: 'boolean',
          description: 'Keep popover open on field focus',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Label node',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state',
        },
        {
          name: 'localeText',
          type: 'PickerLocaleText',
          description: 'Translated UI strings',
        },
        {
          name: 'minutesStep',
          type: 'number',
          description: 'Step size for minutes',
        },
        {
          name: 'monthsPerRow',
          type: '3 | 4',
          description: 'Columns in month view',
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute',
        },
        {
          name: 'onMonthChange',
          type: '(month: Date) => void',
          description: 'Calendar month navigation',
        },
        {
          name: 'onSelectedSectionsChange',
          type: '(newValue: PickerSelectedSections) => void',
          description: 'Selected field section change',
        },
        {
          name: 'onViewChange',
          type: '(view: DateTimePickerView) => void',
          description: 'View switch callback',
        },
        {
          name: 'onYearChange',
          type: '(year: Date) => void',
          description: 'Calendar year navigation',
        },
        {
          name: 'openTo',
          type: 'DateTimePickerView',
          default: '\'day\'',
          description: 'Initial view on open',
        },
        {
          name: 'orientation',
          type: '\'landscape\' | \'portrait\'',
          description: 'Layout orientation',
        },
        {
          name: 'reduceAnimations',
          type: 'boolean',
          description: 'Disable animations',
        },
        {
          name: 'referenceDate',
          type: 'Date',
          description: 'Base date for context',
        },
        {
          name: 'renderLoading',
          type: '() => React.ReactNode',
          description: 'Custom loading render function',
        },
        {
          name: 'selectedSections',
          type: 'PickerSelectedSections',
          description: 'Controlled selected section',
        },
        {
          name: 'defaultSelectedSections',
          type: 'PickerSelectedSections',
          description: 'Uncontrolled initial selected section',
        },
        {
          name: 'showDaysOutsideCurrentMonth',
          type: 'boolean',
          description: 'Show adjacent month dates',
        },
        {
          name: 'skipDisabled',
          type: 'boolean',
          description: 'Skip disabled times in navigation',
        },
        {
          name: 'slotProps',
          type: 'PickerSlotProps',
          description: 'Advanced: props for slots',
        },
        {
          name: 'slots',
          type: 'PickerSlots',
          description: 'Advanced: component slot overrides',
        },
        {
          name: 'sx',
          type: 'PickerSx',
          description: 'Advanced: MUI-style sx prop',
        },
        {
          name: 'thresholdToRenderTimeInASingleColumn',
          type: 'number',
          description: 'Responsive breakpoint for time layout',
        },
        {
          name: 'timeSteps',
          type: 'TimeSteps',
          description: 'Step sizes { hours?, minutes?, seconds? }',
        },
        {
          name: 'timezone',
          type: 'string',
          description: 'IANA timezone identifier',
        },
        {
          name: 'view',
          type: 'DateTimePickerView',
          description: 'Controlled current view',
        },
        {
          name: 'defaultView',
          type: 'DateTimePickerView',
          description: 'Uncontrolled initial view',
        },
        {
          name: 'viewRenderers',
          type: 'Partial<Record<DateTimePickerView, DateTimePickerViewRenderer | null>>',
          description: 'Custom view renderers',
        },
        {
          name: 'views',
          type: 'DateTimePickerView[]',
          description: 'Enabled views array',
        },
        {
          name: 'yearsOrder',
          type: '\'asc\' | \'desc\'',
          description: 'Year sort order',
        },
        {
          name: 'yearsPerRow',
          type: '3 | 4',
          description: 'Columns in year view',
        },
      ],
    },
  ],

  'color-picker': [
    {
      name: 'Root',
      description: 'Main color picker container. Manages HSVA color state and provides context to child components. Can be controlled or uncontrolled.',
      props: [
        {
          name: 'value',
          type: 'HsvaColor',
          description: 'Controlled color value as HSVA object with h (0-360), s (0-1), v (0-1), a (0-1) channels',
        },
        {
          name: 'defaultValue',
          type: 'HsvaColor',
          default: '{ h: 0, s: 1, v: 1, a: 1 }',
          description: 'Initial color value for uncontrolled component',
        },
        {
          name: 'onValueChange',
          type: '(value: HsvaColor) => void',
          description: 'Callback fired when color value changes from any sub-component',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables all child color picker interactions (passed to context, can be checked by child components)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element instead of div, merging props with child component',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version includes default: \'flex w-64 flex-col gap-3 p-3\')',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the root div element',
        },
      ],
    },
    {
      name: 'Area',
      description: 'Interactive hue/saturation/value picker area. Displays a gradient from white/black to the current hue. Click/drag or use arrow keys to pick colors.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version includes default: \'relative h-40 w-full rounded-md border border-border\')',
        },
        {
          name: 'onPointerDown',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer down handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer move handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerUp',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer up handler (composed with internal drag handler)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
          description: 'Keyboard handler (composed with arrow key handlers for fine-tuning). Arrow keys adjust saturation/value; Shift+arrow adjusts by 0.1 instead of 0.01',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with internal gradient background)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the area div element',
        },
      ],
    },
    {
      name: 'AreaThumb',
      description: 'Visual indicator (thumb/cursor) showing the currently selected position in the color area. Automatically positioned based on saturation and value.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version includes default: \'h-3 w-3 rounded-full shadow-[0_0_0_2px_white,0_0_0_3px_rgba(0,0,0,0.4)]\')',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with internal absolute positioning)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLSpanElement>',
          description: 'Forwarded ref to the span element',
        },
      ],
    },
    {
      name: 'HueSlider',
      description: 'Styled convenience wrapper for selecting hue (0-360 degrees). Part of styled package only.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: '\'relative h-3 w-full rounded-full\'',
          description: 'CSS class name',
        },
        {
          name: 'onPointerDown',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer down handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer move handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerUp',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer up handler (composed with internal drag handler)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with rainbow gradient background)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the slider div element',
        },
      ],
    },
    {
      name: 'AlphaSlider',
      description: 'Styled convenience wrapper for selecting alpha/opacity (0-1). Part of styled package only.',
      props: [
        {
          name: 'className',
          type: 'string',
          default: '\'relative h-3 w-full rounded-full\'',
          description: 'CSS class name',
        },
        {
          name: 'onPointerDown',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer down handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer move handler (composed with internal drag handler)',
        },
        {
          name: 'onPointerUp',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Pointer up handler (composed with internal drag handler)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with transparent-to-color gradient background)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the slider div element',
        },
      ],
    },
    {
      name: 'Swatch',
      description: 'Color preview display showing the current color. Renders as a div with background color set to the hex equivalent of the current HSVA value with opacity.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name (styled version includes default: \'h-8 w-8 rounded-md border border-border\')',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with background color and opacity computed from current value)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the swatch div element',
        },
      ],
    },
  ],

  'file-upload': [
    {
      name: 'Root',
      description: 'The main provider component that manages file state and validation; accepts all standard div HTML attributes',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace the root div with a child element (use Slot pattern)',
        },
        {
          name: 'value',
          type: 'File[]',
          description: 'Controlled list of currently selected files',
        },
        {
          name: 'defaultValue',
          type: 'File[]',
          default: '[]',
          description: 'Initial uncontrolled file list',
        },
        {
          name: 'onValueChange',
          type: '(files: File[]) => void',
          description: 'Callback when the file list changes (add/remove)',
        },
        {
          name: 'accept',
          type: 'string',
          description: 'Comma-separated MIME types or file extensions to accept (e.g. \'image/*\' or \'.pdf,.doc\')',
        },
        {
          name: 'multiple',
          type: 'boolean',
          default: 'false',
          description: 'Allow selecting multiple files; if false, only one file at a time',
        },
        {
          name: 'maxSize',
          type: 'number',
          description: 'Maximum file size in bytes; files exceeding this trigger a \'size\' error',
        },
        {
          name: 'maxFiles',
          type: 'number',
          description: 'Maximum number of files allowed; files exceeding this trigger a \'count\' error',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disable file selection in Dropzone, Trigger, and Input',
        },
        {
          name: 'onError',
          type: '(errors: Array<{file: File; reason: \'size\' | \'type\' | \'count\'}>) => void',
          description: 'Callback for validation errors (size exceeded, type not accepted, max count exceeded)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for custom styling',
        },
      ],
    },
    {
      name: 'Dropzone',
      description: 'Drag-and-drop zone; accepts all standard div HTML attributes; features drag state data-state=\'dragging\'|\'idle\' and data-disabled attribute',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for custom styling (styled version includes sensible defaults)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom content; styled version defaults to Upload icon + descriptive text if omitted',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLDivElement>) => void',
          description: 'Triggered on click; automatically opens file picker',
        },
        {
          name: 'onDragOver',
          type: '(event: React.DragEvent<HTMLDivElement>) => void',
          description: 'Triggered during drag; composable with internal drag state',
        },
        {
          name: 'onDragLeave',
          type: '(event: React.DragEvent<HTMLDivElement>) => void',
          description: 'Triggered when drag leaves; composable with internal drag state',
        },
        {
          name: 'onDrop',
          type: '(event: React.DragEvent<HTMLDivElement>) => void',
          description: 'Triggered on drop; composable with file addition',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Hidden file input element (type=\'file\'); automatically receives accept and multiple from Root context; forwards standard input HTML attributes',
      props: [
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Triggered on file selection; composable with internal file addition logic',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'Button to trigger file selection; automatically opens the hidden input on click; forwards standard button HTML attributes',
      props: [
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Triggered on click; composable with file picker opening',
        },
      ],
    },
    {
      name: 'Clear',
      description: 'Button to clear all selected files; automatically disabled when Root.disabled is true or no files exist; forwards standard button HTML attributes',
      props: [
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Triggered on click; composable with internal clear logic',
        },
      ],
    },
    {
      name: 'List',
      description: 'Container for file items (ul element); accepts all standard ul/list HTML attributes',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for custom styling (styled version defaults to \'mt-2 space-y-1\')',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual file item (li element); displays file name and size in styled version; forwards standard li HTML attributes',
      props: [
        {
          name: 'file',
          type: 'File',
          description: 'Required - the File object to display; used as key and for data-file-name attribute',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom content; styled version defaults to file name + size display if omitted',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for custom styling',
        },
      ],
    },
  ],

  'scroll-area': [
    {
      name: 'Root',
      description: 'The root container for the scroll area. Wraps the viewport and scrollbars. Supports all standard div props.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as a child element instead of a div',
        },
        {
          name: 'type',
          type: '\'auto\' | \'always\' | \'scroll\' | \'hover\'',
          default: '\'hover\'',
          description: 'Scrollbar visibility behavior: auto (visible on hover), always (always visible), scroll (visible during scroll), or hover (visible on pointer enter)',
        },
        {
          name: 'scrollHideDelay',
          type: 'number',
          default: '600',
          description: 'Delay in milliseconds before hiding the scrollbar when using type=\'scroll\' or type=\'hover\'',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling (styled version adds \'relative overflow-hidden\')',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to scroll (primitives use as Viewport children; styled version accepts content directly)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with position: \'relative\')',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the root div element',
        },
      ],
    },
    {
      name: 'Viewport',
      description: 'The scrollable container (primitives only). In styled version, this is pre-configured inside Root.',
      props: [
        {
          name: 'tabIndex',
          type: 'number',
          default: '0',
          description: 'Tab index for keyboard navigation (defaults to 0)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling (styled version pre-applies \'h-full w-full rounded-[inherit]\')',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with overflow: \'auto\' and WebkitOverflowScrolling: \'touch\')',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to be scrolled',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the viewport div element',
        },
      ],
    },
    {
      name: 'Scrollbar',
      description: 'The scrollbar track container. Manages visibility and orientation.',
      props: [
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'vertical\'',
          description: 'Scrollbar orientation (vertical for up-down scrolling, horizontal for left-right scrolling)',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force the scrollbar to mount and be visible regardless of type or scroll state',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling (styled version pre-applies flex, touch-none, select-none, transition-colors, and orientation-specific classes)',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with position: \'absolute\' and orientation-specific positioning)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the scrollbar div element',
        },
      ],
    },
    {
      name: 'Thumb',
      description: 'The draggable thumb element (handle) on the scrollbar. Automatically sizes and positions based on scroll ratio.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling (styled version pre-applies \'relative flex-1 rounded-full bg-border\')',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles (merged with computed width, height, and translate transform)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the thumb div element',
        },
      ],
    },
    {
      name: 'Corner',
      description: 'The corner element displayed where horizontal and vertical scrollbars meet (primitives only, not exposed in styled).',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name for styling',
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: 'Inline styles',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forwarded ref to the corner div element',
        },
      ],
    },
  ],

  toolbar: [
    {
      name: 'Root',
      description: 'Container for toolbar components with focus management and keyboard navigation. Renders as a div with role="toolbar".',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'When true, renders the component\'s children as the root element instead of rendering its own div.',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Defines whether the toolbar items are arranged horizontally or vertically.',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Sets the reading direction. Auto-detected from useDirection hook if not provided.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'When true, focus loops from the last to the first element and vice versa.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the root element. Styled version applies default toolbar styles.',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (id, aria-label, data-*, etc.) are supported.',
        },
      ],
    },
    {
      name: 'Button',
      description: 'A button element in the toolbar with roving focus and keyboard navigation support.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, disables the button and removes it from the roving focus group.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the button element. Styled version applies default button styles.',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes (type, onClick, title, aria-*, data-*, etc.) are supported.',
        },
      ],
    },
    {
      name: 'Link',
      description: 'An anchor element in the toolbar with roving focus support.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the link element.',
        },
        {
          name: 'href',
          type: 'string',
          description: 'The URL that the link points to.',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'a\'>',
          description: 'All standard HTML anchor attributes (target, rel, title, aria-*, data-*, etc.) are supported.',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'A visual separator element in the toolbar. Automatically adapts its orientation (vertical for horizontal toolbars, horizontal for vertical toolbars).',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the separator element. Styled version applies default separator styles.',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (aria-*, data-*, etc.) are supported. The role is set to \'separator\' automatically.',
        },
      ],
    },
  ],

  resizable: [
    {
      name: 'Resizable.Group',
      description: 'Container for resizable panels with drag handles. Manages layout direction and panel size state.',
      props: [
        {
          name: 'direction',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Direction of the panel layout (horizontal = left/right, vertical = up/down)',
        },
        {
          name: 'onLayout',
          type: '(sizes: number[]) => void',
          description: 'Callback fired when panel sizes change, receives array of all panel sizes in order',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders the primitive\'s child element instead of a div wrapper (Radix-style asChild)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names; styled version defaults to \'flex h-full w-full\' plus custom classes',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to the underlying div element',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes (style, id, data-*, event handlers, etc.)',
        },
      ],
    },
    {
      name: 'Resizable.Panel',
      description: 'Individual resizable panel within a Group. Expands/contracts based on handle drag interactions.',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Required unique identifier for the panel, used in Handle \'between\' prop',
        },
        {
          name: 'defaultSize',
          type: 'number',
          default: '50',
          description: 'Initial flex size (0-100, treated as flex units); controls initial width/height ratio',
        },
        {
          name: 'minSize',
          type: 'number',
          default: '10',
          description: 'Minimum allowed size; prevents resizing below this flex unit value',
        },
        {
          name: 'maxSize',
          type: 'number',
          default: '90',
          description: 'Maximum allowed size; prevents resizing above this flex unit value',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders the primitive\'s child element instead of a div wrapper',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for custom styling',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to the underlying div element',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes; note tabIndex defaults to 0 for keyboard accessibility',
        },
      ],
    },
    {
      name: 'Resizable.Handle',
      description: 'Draggable resize handle positioned between two panels. Emits size changes as user drags.',
      props: [
        {
          name: 'between',
          type: '[string, string]',
          description: 'Required tuple of two panel IDs on each side of the handle; controls which panels resize together',
        },
        {
          name: 'withHandle',
          type: 'boolean',
          description: 'Styled version only: if true, renders a visual grip icon inside the handle',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders the primitive\'s child element instead of a div wrapper',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names; styled version defaults to flex styling with border and focus ring',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to the underlying div element',
        },
        {
          name: '...htmlAttributes',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes; handle has role=\'separator\', aria-orientation set automatically, tabIndex defaults to 0',
        },
      ],
    },
  ],

  carousel: [
    {
      name: 'Root',
      description: 'The root carousel container that manages state, navigation, and autoplay',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Enable wrapping navigation (cycles back to start when reaching end)',
        },
        {
          name: 'autoPlay',
          type: 'number',
          description: 'Autoplay interval in milliseconds; pauses on hover',
        },
        {
          name: 'slideCount',
          type: 'number',
          default: '0',
          description: 'Total number of slides (used by Dots/Counter components)',
        },
        {
          name: 'index',
          type: 'number',
          description: 'Controlled current slide index',
        },
        {
          name: 'defaultIndex',
          type: 'number',
          default: '0',
          description: 'Initial slide index when uncontrolled',
        },
        {
          name: 'onIndexChange',
          type: '(index: number) => void',
          description: 'Callback fired when active slide index changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (primitives only)',
        },
        {
          name: 'orientation',
          type: '\'horizontal\' | \'vertical\'',
          default: '\'horizontal\'',
          description: 'Carousel direction (primitives only)',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'Content',
      description: 'Container for carousel slides; includes viewport and slide container',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual carousel slide container',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'div\'>',
          description: 'All standard HTML div attributes and event handlers',
        },
      ],
    },
    {
      name: 'Previous',
      description: 'Button to navigate to previous slide; auto-disabled when at start and loop is false',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes and event handlers',
        },
      ],
    },
    {
      name: 'Next',
      description: 'Button to navigate to next slide; auto-disabled when at end and loop is false',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.ComponentPropsWithoutRef<\'button\'>',
          description: 'All standard HTML button attributes and event handlers',
        },
      ],
    },
    {
      name: 'Dots',
      description: 'Dot indicators for slide navigation; shows current position and allows direct navigation',
      props: [
        {
          name: 'count',
          type: 'number',
          description: 'Number of slides; falls back to slideCount from Root context',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'All standard HTML div attributes',
        },
      ],
    },
    {
      name: 'Counter',
      description: 'Slide counter display showing current position (e.g., \'3 / 5\')',
      props: [
        {
          name: 'count',
          type: 'number',
          description: 'Total number of slides; falls back to slideCount from Root context',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'All standard HTML span attributes',
        },
      ],
    },
  ],

  tree: [
    {
      name: 'Tree.Root',
      description: 'Root component for the tree; manages expanded, selected, and focused states. Extends ul element.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace element with first child and merge props',
        },
        {
          name: 'defaultExpanded',
          type: 'string[]',
          default: '[]',
          description: 'Initial expanded item IDs (uncontrolled)',
        },
        {
          name: 'expanded',
          type: 'string[]',
          description: 'Controlled expanded item IDs',
        },
        {
          name: 'onExpandedChange',
          type: '(expanded: string[]) => void',
          description: 'Callback when expanded items change',
        },
        {
          name: 'defaultSelected',
          type: 'string',
          description: 'Initial selected item ID (uncontrolled)',
        },
        {
          name: 'selected',
          type: 'string',
          description: 'Controlled selected item ID',
        },
        {
          name: 'onSelectedChange',
          type: '(id: string | undefined) => void',
          description: 'Callback when selected item changes',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled adds \'text-sm\' default)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLUListElement>',
          description: 'Forward ref to underlying ul element',
        },
      ],
    },
    {
      name: 'Tree.Item',
      description: 'Container for a tree item. Extends li element. Must be a direct child of Root or Group.',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the tree item (required)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Replace element with first child and merge props',
        },
        {
          name: 'hasChildren',
          type: 'boolean',
          default: 'false',
          description: 'Whether this item has child items (shows expand chevron)',
        },
        {
          name: 'level',
          type: 'number',
          default: '1',
          description: 'Nesting level for accessibility (aria-level)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLLIElement>',
          description: 'Forward ref to underlying li element',
        },
      ],
    },
    {
      name: 'Tree.Trigger',
      description: 'Clickable trigger for item expansion and selection. Extends div element.',
      props: [
        {
          name: 'hasChildren',
          type: 'boolean',
          description: 'When false, hides the expand chevron icon (styled only)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled adds default styles for layout, hover, focus ring)',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLDivElement>) => void',
          description: 'Native click handler (composed with selection/expansion logic)',
        },
        {
          name: 'onFocus',
          type: '(event: React.FocusEvent<HTMLDivElement>) => void',
          description: 'Native focus handler (composed with focus tracking)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
          description: 'Native keydown handler (composed with keyboard navigation: Arrow Right/Left for expand/collapse, Enter/Space for select)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLDivElement>',
          description: 'Forward ref to underlying div element',
        },
      ],
    },
    {
      name: 'Tree.Group',
      description: 'Container for child tree items. Only renders when parent item is expanded. Extends ul element.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names (styled adds left border and left padding)',
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLUListElement>',
          description: 'Forward ref to underlying ul element',
        },
      ],
    },
  ],

  editable: [
    {
      name: 'Root',
      description: 'The root container for the editable component that manages state and provides context to its children.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the editable input',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: '\'\'',
          description: 'Initial value when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when the input value changes',
        },
        {
          name: 'editing',
          type: 'boolean',
          description: 'Controlled editing state',
        },
        {
          name: 'defaultEditing',
          type: 'boolean',
          default: 'false',
          description: 'Initial editing state when uncontrolled',
        },
        {
          name: 'onEditingChange',
          type: '(editing: boolean) => void',
          description: 'Callback fired when editing state changes',
        },
        {
          name: 'submitMode',
          type: '\'enter\' | \'blur\' | \'both\'',
          default: '\'both\'',
          description: 'Determines when input submission occurs (Enter key, blur event, or both)',
        },
        {
          name: 'onSubmit',
          type: '(value: string) => void',
          description: 'Callback fired when the input value is submitted',
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: 'Callback fired when editing is cancelled (Escape key)',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables editing and prevents preview from entering edit mode',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'If true, renders as a child element instead of a div',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the root element',
        },
      ],
    },
    {
      name: 'Preview',
      description: 'The display element showing the current value; clicking it enters edit mode.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Placeholder text displayed when the value is empty',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the preview element',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLSpanElement>) => void',
          description: 'Custom click handler (composed with built-in enter-edit handler)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLSpanElement>) => void',
          description: 'Custom keydown handler (composed with built-in Enter/Space handler)',
        },
      ],
    },
    {
      name: 'Input',
      description: 'The text input element that appears during edit mode.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name applied to the input element',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when the input is empty',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Custom change handler (composed with built-in value tracking)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
          description: 'Custom keydown handler (composed with submit/cancel handlers)',
        },
        {
          name: 'onBlur',
          type: '(event: React.FocusEvent<HTMLInputElement>) => void',
          description: 'Custom blur handler (composed with built-in submit handler)',
        },
      ],
    },
  ],

  'tags-input': [
    {
      name: 'Root',
      description: 'Container for tags and input. Manages tag state and context.',
      props: [
        {
          name: 'value',
          type: 'string[]',
          description: 'Controlled array of tag strings',
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          default: '[]',
          description: 'Initial tags when uncontrolled',
        },
        {
          name: 'onValueChange',
          type: '(tags: string[]) => void',
          description: 'Callback fired when tags array changes',
        },
        {
          name: 'delimiters',
          type: 'string[]',
          default: '[\',\', \'Enter\']',
          description: 'Keyboard keys that trigger tag addition',
        },
        {
          name: 'maxTags',
          type: 'number',
          description: 'Maximum number of tags allowed; prevents adding beyond this',
        },
        {
          name: 'duplicateTags',
          type: 'boolean',
          default: 'false',
          description: 'Whether duplicate tag values are allowed',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Disables the input and tag operations',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Render as child element (Radix/Headless pattern)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; styled version applies default border/flex styles',
        },
      ],
    },
    {
      name: 'Input',
      description: 'Text input field for typing and adding tags. Handles delimiter keys and paste.',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; styled version applies flex/outline styles',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Input placeholder text (native HTML)',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
          description: 'Composed with internal value setter; fires on input change',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
          description: 'Composed with delimiter logic and backspace handling',
        },
        {
          name: 'onPaste',
          type: '(event: React.ClipboardEvent<HTMLInputElement>) => void',
          description: 'Composed with paste-split logic; splits pasted text by delimiters',
        },
      ],
    },
    {
      name: 'Tag',
      description: 'Renders a single tag. Displays tag text with remove button.',
      props: [
        {
          name: 'index',
          type: 'number',
          description: 'Required; position of tag in the array',
        },
        {
          name: 'tag',
          type: 'string',
          description: 'Tag text; used by styled version to display and label remove button',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom content to render instead of default tag + remove button',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class name; styled version applies badge/pill styles',
        },
      ],
    },
    {
      name: 'Items',
      description: 'Maps over all tags and renders each via a render function.',
      props: [
        {
          name: 'children',
          type: '(tag: string, index: number) => React.ReactNode',
          description: 'Required; called for each tag, receives tag string and index',
        },
      ],
    },
  ],

  mentions: [
    {
      name: 'Root',
      description: 'Container component that manages mentions state and provides context to child components. Supports controlled/uncontrolled value and custom trigger characters.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled text value of the mentions textarea',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: '\'\'',
          description: 'Default uncontrolled initial value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when the textarea value changes',
        },
        {
          name: 'triggerChar',
          type: 'string',
          default: '\'@\'',
          description: 'Character that triggers mention suggestions (e.g., \'@\' for people, \'#\' for tags)',
        },
        {
          name: 'asChild',
          type: 'boolean',
          description: 'Whether to render the component as its single child instead of a div wrapper',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the root div element',
        },
      ],
    },
    {
      name: 'Textarea',
      description: 'Textarea input that manages caret position detection, query tracking, and keyboard navigation (arrow keys, escape). Automatically handles mention trigger detection and suggestion filtering.',
      props: [
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
          description: 'Native textarea onChange handler (composed with internal mention logic)',
        },
        {
          name: 'onKeyDown',
          type: '(event: React.KeyboardEvent<HTMLTextAreaElement>) => void',
          description: 'Native textarea onKeyDown handler (composed with arrow key and escape navigation)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the textarea element',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when textarea is empty',
        },
      ],
    },
    {
      name: 'Suggestions',
      description: 'Container for filtered mention suggestions. Renders suggestions in a portal by default unless disablePortal is true. Handles visibility based on open state and filtered items.',
      props: [
        {
          name: 'items',
          type: 'MentionSuggestion[]',
          description: 'Array of suggestion objects with id and label properties to filter and display',
        },
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Portal container element; if not provided, portals to document.body',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the wrapper div element',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements (typically a div containing Items component)',
        },
      ],
    },
    {
      name: 'Items',
      description: 'Render prop component that iterates over filtered suggestions and calls the render function for each item with access to the item, index, and highlighted state.',
      props: [
        {
          name: 'children',
          type: '(item: MentionSuggestion, index: number, highlighted: boolean) => React.ReactNode',
          description: 'Render function called for each filtered suggestion item with the item data, its index, and boolean indicating if it\'s currently highlighted',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Individual suggestion item component. Handles click selection, pointer move highlighting, and semantic option role for accessibility.',
      props: [
        {
          name: 'suggestion',
          type: 'MentionSuggestion',
          description: 'The suggestion object with id and label to be inserted when selected',
        },
        {
          name: 'index',
          type: 'number',
          description: 'The index of this item in the filtered suggestions list',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Content to render inside the item; defaults to suggestion.label if not provided',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLDivElement>) => void',
          description: 'Native click handler (composed with suggestion selection logic)',
        },
        {
          name: 'onPointerMove',
          type: '(event: React.PointerEvent<HTMLDivElement>) => void',
          description: 'Native pointer move handler (composed with highlight logic)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names to apply to the item div',
        },
      ],
    },
  ],

  'data-table': [
    {
      name: 'DataTable',
      description: 'Full-featured data grid component with sorting, filtering, pagination, virtualization, row/column selection, inline editing, export, and more',
      props: [
        {
          name: 'columns',
          type: 'DataTableColumnDef<TData, TValue>[]',
          description: 'Column definitions array',
        },
        {
          name: 'data',
          type: 'TData[]',
          description: 'Array of row data',
        },
        {
          name: 'virtual',
          type: 'boolean | { estimatedRowHeight?: number; overscan?: number }',
          description: 'Enable row virtualization with optional height and overscan config',
        },
        {
          name: 'virtualColumns',
          type: 'boolean | { estimatedColumnWidth?: number; overscan?: number }',
          description: 'Enable column virtualization for wide grids',
        },
        {
          name: 'enableSorting',
          type: 'boolean',
          default: 'true',
          description: 'Enable column sorting',
        },
        {
          name: 'enableFiltering',
          type: 'boolean',
          default: 'false',
          description: 'Enable column filtering',
        },
        {
          name: 'enableAdvancedFiltering',
          type: 'boolean',
          default: 'false',
          description: 'Enable advanced filter groups with AND/OR logic',
        },
        {
          name: 'enableGlobalSearch',
          type: 'boolean',
          default: 'false',
          description: 'Enable global search across all columns',
        },
        {
          name: 'enableRowSelection',
          type: 'boolean | \'single\'',
          default: 'false',
          description: 'Enable row selection (multi-select or single)',
        },
        {
          name: 'enableColumnSelection',
          type: 'boolean',
          default: 'false',
          description: 'Enable column selection',
        },
        {
          name: 'enablePagination',
          type: 'boolean',
          default: 'false',
          description: 'Enable pagination',
        },
        {
          name: 'enableExpanding',
          type: 'boolean',
          default: 'false',
          description: 'Enable row expanding/detail panels',
        },
        {
          name: 'enableGrouping',
          type: 'boolean',
          default: 'false',
          description: 'Enable row grouping',
        },
        {
          name: 'enableColumnResizing',
          type: 'boolean',
          default: 'false',
          description: 'Enable column width resizing',
        },
        {
          name: 'enableColumnReordering',
          type: 'boolean',
          default: 'false',
          description: 'Enable drag-to-reorder columns',
        },
        {
          name: 'enableRowReordering',
          type: 'boolean',
          default: 'false',
          description: 'Enable drag-to-reorder rows',
        },
        {
          name: 'enableColumnPinning',
          type: 'boolean',
          default: 'false',
          description: 'Enable pinning columns left/right',
        },
        {
          name: 'enableRowPinning',
          type: 'boolean',
          default: 'false',
          description: 'Enable pinning rows top/bottom',
        },
        {
          name: 'enableColumnConfiguration',
          type: 'boolean',
          default: 'false',
          description: 'Enable column visibility/order configuration UI',
        },
        {
          name: 'pageSize',
          type: 'number',
          default: '10',
          description: 'Initial page size for pagination',
        },
        {
          name: 'loading',
          type: 'boolean',
          description: 'Show loading state covering the entire table',
        },
        {
          name: 'loadingMore',
          type: 'boolean',
          description: 'Show loading indicator at bottom for infinite scroll',
        },
        {
          name: 'loadingVariant',
          type: '\'text\' | \'skeleton\' | \'spinner\'',
          default: '\'text\'',
          description: 'Loading overlay variant',
        },
        {
          name: 'skeletonRows',
          type: 'number',
          default: '5',
          description: 'Number of skeleton rows to show',
        },
        {
          name: 'error',
          type: 'React.ReactNode',
          description: 'Error message overlay content',
        },
        {
          name: 'emptyState',
          type: 'React.ReactNode',
          description: 'Custom empty state when data is empty',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Root wrapper CSS class',
        },
        {
          name: 'tableClassName',
          type: 'string',
          description: 'Table element CSS class',
        },
        {
          name: 'toolbar',
          type: 'React.ReactNode | ((table: Table<TData>) => React.ReactNode)',
          description: 'Custom toolbar content or render function',
        },
        {
          name: 'toolbarStart',
          type: 'React.ReactNode',
          description: 'Content for left side of toolbar',
        },
        {
          name: 'toolbarEnd',
          type: 'React.ReactNode',
          description: 'Content for right side of toolbar',
        },
        {
          name: 'globalFilter',
          type: 'string',
          description: 'Controlled global search value',
        },
        {
          name: 'defaultGlobalFilter',
          type: 'string',
          description: 'Initial global filter value',
        },
        {
          name: 'onGlobalFilterChange',
          type: '(value: string) => void',
          description: 'Callback when global search value changes',
        },
        {
          name: 'globalFilterPlaceholder',
          type: 'string',
          description: 'Placeholder text for global search input',
        },
        {
          name: 'advancedFilter',
          type: 'DataTableFilterGroup',
          description: 'Controlled advanced filter configuration',
        },
        {
          name: 'defaultAdvancedFilter',
          type: 'DataTableFilterGroup',
          description: 'Initial advanced filter configuration',
        },
        {
          name: 'onAdvancedFilterChange',
          type: '(filter: DataTableFilterGroup | undefined) => void',
          description: 'Callback when advanced filter changes',
        },
        {
          name: 'getAdvancedFilterValue',
          type: '(row: TData, columnId: string) => unknown',
          description: 'Function to extract filter-able value from row',
        },
        {
          name: 'rowActions',
          type: '(row: Row<TData>) => React.ReactNode',
          description: 'Render custom actions for each row',
        },
        {
          name: 'inlineCreateRow',
          type: 'DataTableInlineCreate',
          description: 'Configuration for inline row creation',
        },
        {
          name: 'aggregations',
          type: 'Record<string, DataTableAggregation>',
          description: 'Column aggregation functions (sum, avg, min, max, count, or custom)',
        },
        {
          name: 'showColumnTotals',
          type: 'boolean',
          description: 'Show totals row for aggregated columns',
        },
        {
          name: 'rowTotals',
          type: 'boolean | DataTableRowTotals<TData>',
          description: 'Configuration for row-level totals',
        },
        {
          name: 'rowPinning',
          type: 'DataTableRowPinningState',
          description: 'Controlled row pinning state',
        },
        {
          name: 'defaultRowPinning',
          type: 'DataTableRowPinningState',
          description: 'Initial row pinning state',
        },
        {
          name: 'onRowPinningChange',
          type: '(state: DataTableRowPinningState) => void',
          description: 'Callback when row pinning changes',
        },
        {
          name: 'columnSelection',
          type: 'string[]',
          description: 'Controlled selected column IDs',
        },
        {
          name: 'defaultColumnSelection',
          type: 'string[]',
          description: 'Initial selected column IDs',
        },
        {
          name: 'onColumnSelectionChange',
          type: '(columnIds: string[]) => void',
          description: 'Callback when column selection changes',
        },
        {
          name: 'renderDetailPanel',
          type: '(row: Row<TData>) => React.ReactNode',
          description: 'Render detail/expansion panel for a row',
        },
        {
          name: 'getCellColSpan',
          type: '(cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined',
          description: 'Get column span for a cell',
        },
        {
          name: 'getCellRowSpan',
          type: '(cell: Cell<TData, unknown>, row: Row<TData>) => number | undefined',
          description: 'Get row span for a cell',
        },
        {
          name: 'getRowClassName',
          type: '(row: Row<TData>) => string | undefined',
          description: 'Get CSS class for a row',
        },
        {
          name: 'getRowStyle',
          type: '(row: Row<TData>) => React.CSSProperties | undefined',
          description: 'Get inline styles for a row',
        },
        {
          name: 'getRowHeight',
          type: '(row: Row<TData>) => number | undefined',
          description: 'Get height of a row for virtualization',
        },
        {
          name: 'height',
          type: 'number | string',
          description: 'Fixed height of table container',
        },
        {
          name: 'maxHeight',
          type: 'number | string',
          description: 'Maximum height of table container',
        },
        {
          name: 'fullHeight',
          type: 'boolean',
          description: 'Fill all available height',
        },
        {
          name: 'autoHeight',
          type: 'boolean',
          description: 'Auto-size height to content',
        },
        {
          name: 'onLoadMore',
          type: '() => void',
          description: 'Callback for infinite scroll load more',
        },
        {
          name: 'hasMore',
          type: 'boolean',
          description: 'Whether more data is available to load',
        },
        {
          name: 'loadMoreThreshold',
          type: 'number',
          default: '96',
          description: 'Pixels from bottom to trigger loadMore',
        },
        {
          name: 'onRowOrderChange',
          type: '(rows: TData[], rowIds: string[]) => void',
          description: 'Callback when row order changes via drag',
        },
        {
          name: 'onColumnOrderChange',
          type: '(columnIds: string[]) => void',
          description: 'Callback when column order changes',
        },
        {
          name: 'localeText',
          type: 'Partial<DataTableLocaleText>',
          description: 'Override default locale strings',
        },
        {
          name: 'serverSide',
          type: '{ state: ServerDataState; onStateChange: (state: ServerDataState) => void; rowCount: number }',
          description: 'Server-side data adapter config (disables internal sort/filter/pagination)',
        },
        {
          name: 'getRowId',
          type: '(row: TData, index: number) => string',
          description: 'Get unique ID for a row',
        },
        {
          name: 'getSubRows',
          type: '(row: TData) => TData[] | undefined',
          description: 'Get sub-rows for tree/expandable data',
        },
        {
          name: 'onRowSelectionChange',
          type: '(state: RowSelectionState) => void',
          description: 'Callback when row selection changes',
        },
        {
          name: 'onSortingChange',
          type: '(state: SortingState) => void',
          description: 'Callback when sorting changes',
        },
        {
          name: 'tableRef',
          type: 'React.MutableRefObject<Table<TData> | null>',
          description: 'Ref to underlying TanStack Table instance',
        },
        {
          name: 'slots',
          type: 'DataTableSlots<TData>',
          description: 'Replace built-in sub-components (Toolbar, Pagination, ColumnMenu, Filter, Search, etc)',
        },
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          default: '[10, 25, 50, 100]',
          description: 'Options for rows-per-page selector',
        },
        {
          name: 'showTotalRows',
          type: 'boolean',
          default: 'true',
          description: 'Show total row count in pagination',
        },
        {
          name: 'noRowsOverlay',
          type: 'React.ReactNode',
          description: 'Custom overlay when dataset is empty',
        },
        {
          name: 'noResultsOverlay',
          type: 'React.ReactNode',
          description: 'Custom overlay when filters produce no results',
        },
        {
          name: 'bulkActions',
          type: 'DataTableBulkAction<TData>[]',
          description: 'Actions shown in bulk-action bar for selected rows',
        },
        {
          name: 'rowActionMenu',
          type: 'DataTableRowActionItem<TData>[]',
          description: 'Row action items in 3-dot dropdown menu',
        },
        {
          name: 'rowActionButtons',
          type: 'DataTableRowActionItem<TData>[]',
          description: 'Row action items as inline buttons',
        },
        {
          name: 'enableRowCopy',
          type: 'boolean',
          default: 'false',
          description: 'Ctrl+C copies single row (in addition to multi-row)',
        },
        {
          name: 'enableColumnCopy',
          type: 'boolean',
          default: 'false',
          description: 'Add \'Copy column\' to column context menu',
        },
        {
          name: 'density',
          type: '\'compact\' | \'standard\' | \'comfortable\'',
          description: 'Controlled row/cell density',
        },
        {
          name: 'defaultDensity',
          type: '\'compact\' | \'standard\' | \'comfortable\'',
          default: '\'standard\'',
          description: 'Initial density setting',
        },
        {
          name: 'enableDensityToggle',
          type: 'boolean',
          default: 'false',
          description: 'Show density toggle in toolbar',
        },
        {
          name: 'onDensityChange',
          type: '(density: DataTableDensity) => void',
          description: 'Callback when density changes',
        },
        {
          name: 'treeData',
          type: 'boolean',
          default: 'false',
          description: 'Enable tree data view (use with getSubRows)',
        },
        {
          name: 'enableCopyPaste',
          type: 'boolean',
          default: 'false',
          description: 'Enable Ctrl+C to copy selected rows as TSV',
        },
        {
          name: 'onCopy',
          type: '(rows: Row<TData>[], text: string) => void',
          description: 'Callback when rows are copied',
        },
        {
          name: 'toolbarActions',
          type: 'DataTableToolbarAction<TData>[]',
          description: 'Custom toolbar action buttons',
        },
        {
          name: 'onRefresh',
          type: '() => void',
          description: 'Callback for Refresh toolbar action',
        },
        {
          name: 'getCellClassName',
          type: '(cell: Cell<TData, unknown>, row: Row<TData>) => string | undefined',
          description: 'Get CSS class for a cell',
        },
        {
          name: 'enableRowNumbers',
          type: 'boolean',
          default: 'false',
          description: 'Show fixed row-number column (1, 2, 3…)',
        },
        {
          name: 'striped',
          type: 'boolean',
          default: 'false',
          description: 'Alternate row background color',
        },
        {
          name: 'enableCellTooltip',
          type: 'boolean',
          default: 'false',
          description: 'Show truncated cell content as tooltip',
        },
        {
          name: 'stateKey',
          type: 'string',
          description: 'localStorage key for persisting state (column order/visibility/sizing, sort, filters, pagination)',
        },
        {
          name: 'enableStatusBar',
          type: 'boolean',
          default: 'false',
          description: 'Show status bar with row and selection counts',
        },
        {
          name: 'fullscreen',
          type: 'boolean',
          description: 'Controlled fullscreen state',
        },
        {
          name: 'onFullscreenChange',
          type: '(fullscreen: boolean) => void',
          description: 'Callback when fullscreen is toggled',
        },
        {
          name: 'enableFullscreen',
          type: 'boolean',
          default: 'false',
          description: 'Show fullscreen toggle button in toolbar',
        },
        {
          name: 'loadingRowIds',
          type: 'string[]',
          description: 'Row IDs showing loading spinner (async row action)',
        },
        {
          name: 'onPrint',
          type: '() => void',
          description: 'Callback before window.print()',
        },
        {
          name: 'quickFilterColumns',
          type: 'string[]',
          description: 'Column IDs showing quick-filter input below header',
        },
        {
          name: 'onCellContextMenu',
          type: '(cell: Cell<TData, unknown>, row: Row<TData>, event: React.MouseEvent) => void',
          description: 'Callback on right-click context menu on cell',
        },
        {
          name: 'onRowContextMenu',
          type: '(row: Row<TData>, event: React.MouseEvent) => void',
          description: 'Callback on right-click context menu on row',
        },
        {
          name: 'enableColumnAutoSize',
          type: 'boolean',
          default: 'false',
          description: 'Auto-size column to content on double-click resize handle',
        },
        {
          name: 'lockedColumns',
          type: 'string[]',
          description: 'Column IDs that cannot be hidden, reordered, or resized',
        },
        {
          name: 'onLockedColumnsChange',
          type: '(columnIds: string[]) => void',
          description: 'Callback when column lock state changes',
        },
        {
          name: 'mobileBreakpoint',
          type: '\'sm\' | \'md\' | \'lg\'',
          description: 'Tailwind breakpoint below which rows render as cards',
        },
        {
          name: 'enableExport',
          type: 'boolean | { csv?: boolean; json?: boolean; selectedCsv?: boolean; xlsx?: boolean }',
          default: 'false',
          description: 'Enable export dropdown (CSV, JSON, XLSX)',
        },
        {
          name: 'enableConditionalFormatting',
          type: 'boolean',
          default: 'false',
          description: 'Enable conditional formatting drawer in toolbar',
        },
        {
          name: 'conditionalFormattingRules',
          type: 'DataTableConditionalRule[]',
          description: 'Controlled conditional formatting rules',
        },
        {
          name: 'onConditionalFormattingRulesChange',
          type: '(rules: DataTableConditionalRule[]) => void',
          description: 'Callback when conditional formatting rules change',
        },
        {
          name: 'getRowStatus',
          type: '(row: Row<TData>) => \'success\' | \'warning\' | \'error\' | \'info\' | undefined',
          description: 'Return status for colored left border indicator',
        },
        {
          name: 'rowHeight',
          type: 'number | ((row: Row<TData>, index: number) => number)',
          description: 'Fixed or computed row height',
        },
        {
          name: 'enableFilterChips',
          type: 'boolean',
          default: 'false',
          description: 'Show active column-filter chips above table',
        },
        {
          name: 'enablePaste',
          type: 'boolean',
          default: 'false',
          description: 'Enable Ctrl+V paste of TSV data into editable cells',
        },
        {
          name: 'dir',
          type: '\'ltr\' | \'rtl\'',
          description: 'Text direction for RTL support',
        },
        {
          name: 'enableKeyboardShortcuts',
          type: 'boolean',
          default: 'false',
          description: 'Show keyboard shortcuts modal when ? is pressed',
        },
        {
          name: 'editMode',
          type: '\'click\' | \'dblclick\'',
          description: 'Interaction mode to start inline cell editing',
        },
        {
          name: 'onCellEditCommit',
          type: '(params: { field: string; row: TData; oldValue: unknown; newValue: unknown }) => void',
          description: 'Callback after cell edit is committed via valueSetter',
        },
        {
          name: 'enableUndoRedo',
          type: 'boolean',
          default: 'false',
          description: 'Enable Ctrl+Z / Ctrl+Y undo-redo for inline edits',
        },
        {
          name: 'dirtyRows',
          type: 'Set<string>',
          description: 'Controlled set of row IDs with unsaved changes',
        },
        {
          name: 'onDirtyRowsChange',
          type: '(dirtyRows: Set<string>) => void',
          description: 'Callback when dirty row set changes',
        },
        {
          name: 'enableCellSelection',
          type: 'boolean',
          default: 'false',
          description: 'Enable cell-range selection (disables row-selection click)',
        },
        {
          name: 'onCellSelectionChange',
          type: '(selection: DataTableCellSelection | null) => void',
          description: 'Callback when cell selection changes',
        },
        {
          name: 'enableToolPanel',
          type: 'boolean',
          default: 'false',
          description: 'Show collapsible right-side tool panel',
        },
        {
          name: 'defaultToolPanelTab',
          type: '\'columns\' | \'filters\' | \'stats\'',
          default: '\'columns\'',
          description: 'Default tab in tool panel',
        },
        {
          name: 'enableLiveData',
          type: 'boolean',
          default: 'false',
          description: 'Enable real-time cell flash animation on data changes',
        },
        {
          name: 'liveDataKey',
          type: 'keyof TData',
          description: 'Field used as row identity for live-data diffing (default: \'id\')',
        },
        {
          name: 'onLiveDataUpdate',
          type: '(updatedRows: TData[]) => void',
          description: 'Callback when live-data diff detects updated rows',
        },
        {
          name: 'loadDetailPanel',
          type: '(row: Row<TData>) => Promise<React.ReactNode>',
          description: 'Async loader for detail panel content (cached after first load)',
        },
        {
          name: 'detailPanelCacheSize',
          type: 'number',
          default: '20',
          description: 'Maximum cached detail panels (LRU)',
        },
        {
          name: 'enablePrintStyles',
          type: 'boolean',
          default: 'false',
          description: 'Inject @media print styles that hide toolbar/pagination',
        },
        {
          name: 'enablePivot',
          type: 'boolean',
          default: 'false',
          description: 'Enable pivot mode with toolbar button',
        },
        {
          name: 'pivotConfig',
          type: 'DataTablePivotConfig',
          description: 'Controlled pivot configuration',
        },
        {
          name: 'onPivotConfigChange',
          type: '(config: DataTablePivotConfig) => void',
          description: 'Callback when pivot config changes',
        },
        {
          name: 'enableSavedViews',
          type: 'boolean',
          default: 'false',
          description: 'Enable saved views toolbar button',
        },
        {
          name: 'savedViews',
          type: 'DataTableSavedView[]',
          description: 'Controlled saved views list',
        },
        {
          name: 'onSavedViewsChange',
          type: '(views: DataTableSavedView[]) => void',
          description: 'Callback when saved views list changes',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          description: 'Accessible label for grid root element',
        },
        {
          name: 'ariaLabelledBy',
          type: 'string',
          description: 'ID of element that labels the grid',
        },
        {
          name: 'enableHeaderStats',
          type: 'boolean',
          default: 'false',
          description: 'Show aggregated stats row pinned below column headers',
        },
        {
          name: 'headerStatsConfig',
          type: 'Partial<Record<string, \'count\' | \'sum\' | \'avg\' | \'min\' | \'max\' | \'nullCount\' | \'unique\'>>',
          description: 'Per-column stat type override (defaults: sum for number, count for others)',
        },
        {
          name: 'enableValidation',
          type: 'boolean',
          default: 'false',
          description: 'Enable display-mode cell validation using displayValidate',
        },
        {
          name: 'onValidationChange',
          type: '(errors: DataTableValidationError[]) => void',
          description: 'Callback when validation errors change',
        },
        {
          name: 'locale',
          type: 'string',
          description: 'Default locale for column formatting (e.g. \'en-US\', \'de-DE\')',
        },
      ],
    },
  ],

  'video-player': [
    {
      name: 'VideoPlayer',
      description: 'A feature-rich video player component supporting multiple video sources, playlists, subtitles, chapters, quality selection, filters, and keyboard controls. Supports MP4/WebM, YouTube URLs, and HLS streams.',
      props: [
        {
          name: 'src',
          type: 'string',
          description: 'The video source URL (MP4, WebM, YouTube URL, or HLS .m3u8 stream)',
        },
        {
          name: 'poster',
          type: 'string | undefined',
          description: 'Poster/thumbnail image URL displayed before playback starts',
        },
        {
          name: 'autoPlay',
          type: 'boolean',
          default: 'false',
          description: 'Whether the video should start playing automatically',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether the video should loop when it reaches the end',
        },
        {
          name: 'muted',
          type: 'boolean',
          default: 'false',
          description: 'Whether the audio is muted by default',
        },
        {
          name: 'className',
          type: 'string',
          default: '\'\'',
          description: 'Custom CSS classes applied to the container div',
        },
        {
          name: 'subtitles',
          type: 'SubtitleTrack[]',
          default: '[]',
          description: 'Array of subtitle tracks to load ({ label, language, src, kind? })',
        },
        {
          name: 'playlist',
          type: 'PlaylistItem[]',
          default: '[]',
          description: 'Array of playlist items for multi-video playback ({ id, title, src, poster?, duration? })',
        },
        {
          name: 'chapters',
          type: 'Chapter[]',
          default: '[]',
          description: 'Array of chapter markers ({ id, title, startTime, endTime })',
        },
        {
          name: 'onPlay',
          type: '(() => void) | undefined',
          description: 'Callback fired when playback starts',
        },
        {
          name: 'onPause',
          type: '(() => void) | undefined',
          description: 'Callback fired when playback pauses',
        },
        {
          name: 'onEnded',
          type: '(() => void) | undefined',
          description: 'Callback fired when the video ends',
        },
        {
          name: 'onTimeUpdate',
          type: '((currentTime: number) => void) | undefined',
          description: 'Callback fired on each time update, providing the current playback time in seconds',
        },
        {
          name: 'onVolumeChange',
          type: '((volume: number) => void) | undefined',
          description: 'Callback fired when volume changes, providing the new volume (0-1)',
        },
      ],
    },
  ],
};

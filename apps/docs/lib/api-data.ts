import type { ApiPart } from './registry';

/**
 * Full prop reference for every documented component, keyed by slug.
 * Merged into the component page when the registry entry has no inline `api`.
 */

const div = "Omit<React.ComponentProps<'div'>, 'ref'>";
const asChild: ApiPart['props'][number] = {
  name: 'asChild',
  type: 'boolean',
  default: 'false',
  description: 'Merge props onto the immediate child instead of rendering a default element.',
};
const className: ApiPart['props'][number] = {
  name: 'className',
  type: 'string',
  description: 'Additional Tailwind classes, merged with the component defaults.',
};

export const API: Record<string, ApiPart[]> = {
  /* ── Atoms ──────────────────────────────────────────────────────── */
  badge: [
    {
      name: 'Badge',
      description: 'A small status descriptor. Renders a span by default.',
      props: [
        { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'", default: "'default'", description: 'Visual style.' },
        asChild,
        className,
      ],
    },
  ],
  card: [
    { name: 'Card.Root', description: 'The outer card container.', props: [className] },
    { name: 'Card.Header', description: 'Top section, holds Title and Description.', props: [className] },
    { name: 'Card.Title', description: 'The card heading. Renders an h3.', props: [className] },
    { name: 'Card.Description', description: 'Supporting text under the title.', props: [className] },
    { name: 'Card.Content', description: 'The main body of the card.', props: [className] },
    { name: 'Card.Footer', description: 'Bottom section, typically actions.', props: [className] },
  ],
  alert: [
    {
      name: 'Alert.Root',
      description: 'The alert container. Has role="alert".',
      props: [
        { name: 'variant', type: "'default' | 'destructive' | 'success' | 'warning' | 'info'", default: "'default'", description: 'Visual style.' },
        className,
      ],
    },
    { name: 'Alert.Title', description: 'The alert heading.', props: [className] },
    { name: 'Alert.Description', description: 'The alert body text.', props: [className] },
  ],
  avatar: [
    { name: 'Avatar.Root', description: 'Contains the image and fallback.', props: [asChild, className] },
    {
      name: 'Avatar.Image',
      description: 'The avatar image. Renders only once loaded successfully.',
      props: [
        { name: 'src', type: 'string', description: 'Image source URL.' },
        { name: 'onLoadingStatusChange', type: "(status: 'idle' | 'loading' | 'loaded' | 'error') => void", description: 'Called when the loading status changes.' },
        className,
      ],
    },
    {
      name: 'Avatar.Fallback',
      description: 'Renders while the image is loading or has failed.',
      props: [
        { name: 'delayMs', type: 'number', description: 'Delay in ms before showing, to avoid flicker on fast loads.' },
        className,
      ],
    },
  ],
  progress: [
    {
      name: 'Progress',
      description: 'A linear progress bar. Has role="progressbar".',
      props: [
        { name: 'value', type: 'number | null', description: 'Current value (0–max). Pass null for indeterminate.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'getValueLabel', type: '(value, max) => string', description: 'Returns the localized aria-valuetext label.' },
        className,
      ],
    },
  ],
  skeleton: [
    { name: 'Skeleton', description: 'A pulse-animated placeholder. Shape it with classes.', props: [className] },
  ],
  separator: [
    {
      name: 'Separator',
      description: 'A visual or semantic divider.',
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The axis of the separator.' },
        { name: 'decorative', type: 'boolean', default: 'true', description: 'When true, removes it from the accessibility tree.' },
        className,
      ],
    },
  ],
  'aspect-ratio': [
    {
      name: 'AspectRatio',
      description: 'Constrains content to a width/height ratio.',
      props: [
        { name: 'ratio', type: 'number', default: '1', description: 'The desired ratio, e.g. 16 / 9.' },
        className,
      ],
    },
  ],

  /* ── Form ───────────────────────────────────────────────────────── */
  input: [
    {
      name: 'Input',
      description: 'A styled text input. Forwards all native input props.',
      props: [
        { name: 'type', type: 'string', default: "'text'", description: 'Native input type.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
        { name: "'aria-invalid'", type: 'boolean', description: 'Marks the field invalid and applies error styling.' },
        className,
      ],
    },
  ],
  textarea: [
    {
      name: 'Textarea',
      description: 'A styled multi-line text input. Forwards all native textarea props.',
      props: [
        { name: 'rows', type: 'number', description: 'Visible number of text lines.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the textarea.' },
        className,
      ],
    },
  ],
  switch: [
    {
      name: 'Switch',
      description: 'A toggle control with role="switch".',
      props: [
        { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
        { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state when uncontrolled.' },
        { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when the checked state changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required in a form.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Visual size.' },
        className,
      ],
    },
  ],
  checkbox: [
    {
      name: 'Checkbox',
      description: 'A checkbox supporting an indeterminate state.',
      props: [
        { name: 'checked', type: "boolean | 'indeterminate'", description: 'Controlled checked state.' },
        { name: 'defaultChecked', type: "boolean | 'indeterminate'", description: 'Initial checked state when uncontrolled.' },
        { name: 'onCheckedChange', type: '(checked) => void', description: 'Called when the checked state changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
        className,
      ],
    },
  ],
  slider: [
    {
      name: 'Slider',
      description: 'A range input supporting one or more thumbs.',
      props: [
        { name: 'value', type: 'number[]', description: 'Controlled value(s). One entry per thumb.' },
        { name: 'defaultValue', type: 'number[]', default: '[min]', description: 'Initial value(s) when uncontrolled.' },
        { name: 'onValueChange', type: '(value: number[]) => void', description: 'Called as the value changes.' },
        { name: 'onValueCommit', type: '(value: number[]) => void', description: 'Called when the value settles (pointer up / key release).' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'step', type: 'number', default: '1', description: 'Stepping interval.' },
        { name: 'minStepsBetweenThumbs', type: 'number', default: '0', description: 'Minimum steps between adjacent thumbs.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Slider axis.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the slider.' },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
        className,
      ],
    },
  ],
  'radio-group': [
    {
      name: 'RadioGroup.Root',
      description: 'Groups radio items; manages selection and roving focus.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled selected value.' },
        { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selection changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the whole group.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Arrow-key navigation axis.' },
        { name: 'loop', type: 'boolean', default: 'true', description: 'Whether arrow navigation wraps.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
      ],
    },
    {
      name: 'RadioGroup.Item',
      description: 'An individual radio button.',
      props: [
        { name: 'value', type: 'string', description: 'The value submitted when selected.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item.' },
      ],
    },
  ],
  form: [
    {
      name: 'Form.Root',
      description: 'The form element; tracks validity per field.',
      props: [{ name: 'onClearServerErrors', type: '() => void', description: 'Called on change to clear server-side errors.' }],
    },
    {
      name: 'Form.Field',
      description: 'Wraps a control with its label and messages.',
      props: [
        { name: 'name', type: 'string', description: 'Field name — links label, control and messages.' },
        { name: 'serverInvalid', type: 'boolean', description: 'Force-mark the field invalid from server validation.' },
      ],
    },
    { name: 'Form.Label', description: 'Label bound to the field control.', props: [asChild] },
    { name: 'Form.Control', description: 'The input. Reports native ValidityState.', props: [asChild] },
    {
      name: 'Form.Message',
      description: 'A validation message, shown when its match fails.',
      props: [
        { name: 'match', type: 'ValidityMatcher | function', description: "A built-in matcher (e.g. 'valueMissing') or a custom predicate." },
        { name: 'forceMatch', type: 'boolean', description: 'Always render the message.' },
      ],
    },
    { name: 'Form.Submit', description: 'A submit button.', props: [asChild] },
  ],
  'number-field': [
    {
      name: 'NumberField.Root',
      description: 'Numeric input with steppers and Intl formatting.',
      props: [
        { name: 'value', type: 'number', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'number', description: 'Initial value when uncontrolled.' },
        { name: 'onValueChange', type: '(value?: number) => void', description: 'Called when the value changes.' },
        { name: 'min', type: 'number', description: 'Minimum allowed value.' },
        { name: 'max', type: 'number', description: 'Maximum allowed value.' },
        { name: 'step', type: 'number', default: '1', description: 'Increment / decrement amount.' },
        { name: 'formatOptions', type: 'Intl.NumberFormatOptions', description: 'Number formatting options.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field.' },
      ],
    },
    { name: 'NumberField.Input', description: 'The text input with role="spinbutton".', props: [] },
    { name: 'NumberField.IncrementTrigger', description: 'Button that increases the value.', props: [] },
    { name: 'NumberField.DecrementTrigger', description: 'Button that decreases the value.', props: [] },
  ],

  /* ── Disclosure ─────────────────────────────────────────────────── */
  accordion: [
    {
      name: 'Accordion.Root',
      description: 'Contains all accordion items.',
      props: [
        { name: 'type', type: "'single' | 'multiple'", description: 'Whether one or many panels can be open.' },
        { name: 'value', type: 'string | string[]', description: 'Controlled open item(s).' },
        { name: 'defaultValue', type: 'string | string[]', description: 'Initial open item(s).' },
        { name: 'onValueChange', type: '(value) => void', description: 'Called when the open set changes.' },
        { name: 'collapsible', type: 'boolean', default: 'false', description: "For type='single', allow closing the open item." },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the whole accordion.' },
      ],
    },
    {
      name: 'Accordion.Item',
      description: 'A single collapsible section.',
      props: [
        { name: 'value', type: 'string', description: 'Unique value identifying the item.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item.' },
      ],
    },
    { name: 'Accordion.Trigger', description: 'Toggles its panel. Wrapped in a Header.', props: [] },
    { name: 'Accordion.Content', description: 'The collapsible panel content.', props: [{ name: 'forceMount', type: 'boolean', description: 'Force mounting for animation control.' }] },
  ],
  tabs: [
    {
      name: 'Tabs.Root',
      description: 'Contains the tab list and panels.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled active tab.' },
        { name: 'defaultValue', type: 'string', description: 'Initial active tab.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout axis.' },
        { name: 'activationMode', type: "'automatic' | 'manual'", default: "'automatic'", description: 'Whether focusing a tab activates it.' },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
      ],
    },
    { name: 'Tabs.List', description: 'The container of tab triggers.', props: [{ name: 'loop', type: 'boolean', default: 'true', description: 'Whether arrow navigation wraps.' }] },
    {
      name: 'Tabs.Trigger',
      description: 'Activates its associated panel.',
      props: [
        { name: 'value', type: 'string', description: 'Links the trigger to its content.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this tab.' },
      ],
    },
    { name: 'Tabs.Content', description: 'The panel for a given value.', props: [{ name: 'value', type: 'string', description: 'Links the content to its trigger.' }, { name: 'forceMount', type: 'boolean', description: 'Force mounting for animation control.' }] },
  ],
  collapsible: [
    {
      name: 'Collapsible.Root',
      description: 'A single show/hide section.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the collapsible.' },
      ],
    },
    { name: 'Collapsible.Trigger', description: 'Toggles the content.', props: [asChild] },
    { name: 'Collapsible.Content', description: 'The collapsible region.', props: [{ name: 'forceMount', type: 'boolean', description: 'Force mounting for animation control.' }] },
  ],
  breadcrumb: [
    { name: 'Breadcrumb.Root', description: 'A nav landmark labelled "breadcrumb".', props: [] },
    { name: 'Breadcrumb.List', description: 'The ordered list of crumbs.', props: [className] },
    { name: 'Breadcrumb.Item', description: 'A single crumb.', props: [className] },
    { name: 'Breadcrumb.Link', description: 'A navigable crumb link.', props: [asChild, className] },
    { name: 'Breadcrumb.Page', description: 'The current page crumb (non-link).', props: [className] },
    { name: 'Breadcrumb.Separator', description: 'Divider between crumbs.', props: [className] },
  ],
  pagination: [
    { name: 'Pagination.Root', description: 'A nav landmark for pagination.', props: [className] },
    { name: 'Pagination.Content', description: 'The list of page links.', props: [className] },
    {
      name: 'Pagination.Link',
      description: 'A page link.',
      props: [
        { name: 'isActive', type: 'boolean', description: 'Marks the current page.' },
        { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", description: 'Link size.' },
      ],
    },
    { name: 'Pagination.Previous', description: 'Link to the previous page.', props: [] },
    { name: 'Pagination.Next', description: 'Link to the next page.', props: [] },
    { name: 'Pagination.Ellipsis', description: 'Indicates skipped pages.', props: [] },
  ],
  stepper: [
    {
      name: 'Stepper.Root',
      description: 'A multi-step progress indicator.',
      props: [
        { name: 'activeStep', type: 'number', description: 'Zero-based index of the current step.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout axis.' },
      ],
    },
    { name: 'Stepper.Step', description: 'A single step.', props: [{ name: 'index', type: 'number', description: 'Zero-based position of this step.' }] },
    { name: 'Stepper.Separator', description: 'Connector line between steps.', props: [] },
  ],

  /* ── Overlays ───────────────────────────────────────────────────── */
  popover: [
    {
      name: 'Popover.Root',
      description: 'Contains all popover parts.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'modal', type: 'boolean', default: 'false', description: 'Whether outside interaction is disabled.' },
      ],
    },
    { name: 'Popover.Trigger', description: 'The button that toggles the popover.', props: [asChild] },
    { name: 'Popover.Anchor', description: 'Optional custom positioning anchor.', props: [asChild] },
    {
      name: 'Popover.Content',
      description: 'The floating content.',
      props: [
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Preferred side of the anchor.' },
        { name: 'sideOffset', type: 'number', default: '0', description: 'Distance in px from the anchor.' },
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment against the anchor.' },
        { name: 'onEscapeKeyDown', type: '(event) => void', description: 'Called when Escape is pressed.' },
        { name: 'onPointerDownOutside', type: '(event) => void', description: 'Called on outside pointer-down.' },
        { name: 'forceMount', type: 'boolean', description: 'Force mounting for animation control.' },
      ],
    },
    { name: 'Popover.Close', description: 'A button that closes the popover.', props: [asChild] },
    { name: 'Popover.Arrow', description: 'An optional pointing arrow.', props: [{ name: 'width', type: 'number', default: '10', description: 'Arrow width.' }, { name: 'height', type: 'number', default: '5', description: 'Arrow height.' }] },
  ],
  tooltip: [
    {
      name: 'Tooltip.Provider',
      description: 'Coordinates delay timing across all tooltips inside it.',
      props: [
        { name: 'delayDuration', type: 'number', default: '700', description: 'Open delay in ms.' },
        { name: 'skipDelayDuration', type: 'number', default: '300', description: 'Window in which the next tooltip opens instantly.' },
        { name: 'disableHoverableContent', type: 'boolean', default: 'false', description: 'Disable hovering into tooltip content.' },
      ],
    },
    {
      name: 'Tooltip.Root',
      description: 'A single tooltip.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'delayDuration', type: 'number', description: 'Override the provider delay.' },
      ],
    },
    { name: 'Tooltip.Trigger', description: 'The element that triggers the tooltip.', props: [asChild] },
    {
      name: 'Tooltip.Content',
      description: 'The tooltip popup.',
      props: [
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Preferred side.' },
        { name: 'sideOffset', type: 'number', default: '0', description: 'Distance from the trigger.' },
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment.' },
      ],
    },
  ],
  'hover-card': [
    {
      name: 'HoverCard.Root',
      description: 'A hover-triggered rich popover.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'openDelay', type: 'number', default: '700', description: 'Delay before opening on hover.' },
        { name: 'closeDelay', type: 'number', default: '300', description: 'Delay before closing on leave.' },
      ],
    },
    { name: 'HoverCard.Trigger', description: 'The element that opens the card on hover.', props: [asChild] },
    { name: 'HoverCard.Content', description: 'The floating card content.', props: [{ name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", description: 'Preferred side.' }, { name: 'sideOffset', type: 'number', description: 'Distance from the trigger.' }] },
  ],
  'alert-dialog': [
    {
      name: 'AlertDialog.Root',
      description: 'A confirmation dialog requiring an explicit choice.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
      ],
    },
    { name: 'AlertDialog.Trigger', description: 'Opens the alert dialog.', props: [asChild] },
    { name: 'AlertDialog.Content', description: 'The dialog body. Outside interaction is blocked.', props: [{ name: 'onOpenAutoFocus', type: '(event) => void', description: 'Customize initial focus.' }] },
    { name: 'AlertDialog.Cancel', description: 'The cancelling action. Receives initial focus.', props: [asChild] },
    { name: 'AlertDialog.Action', description: 'The confirming action.', props: [asChild] },
    { name: 'AlertDialog.Title', description: 'Accessible dialog title.', props: [] },
    { name: 'AlertDialog.Description', description: 'Accessible dialog description.', props: [] },
  ],
  sheet: [
    { name: 'Sheet.Root', description: 'Contains all sheet parts (built on Dialog).', props: [{ name: 'open', type: 'boolean', description: 'Controlled open state.' }, { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' }] },
    { name: 'Sheet.Trigger', description: 'Opens the sheet.', props: [asChild] },
    {
      name: 'Sheet.Content',
      description: 'The sliding panel.',
      props: [{ name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'Edge the sheet slides from.' }, className],
    },
  ],
  drawer: [
    { name: 'Drawer.Root', description: 'Contains all drawer parts (bottom sheet).', props: [{ name: 'open', type: 'boolean', description: 'Controlled open state.' }, { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' }] },
    { name: 'Drawer.Trigger', description: 'Opens the drawer.', props: [asChild] },
    { name: 'Drawer.Content', description: 'The bottom-anchored panel.', props: [className] },
  ],
  toast: [
    {
      name: 'Toast.Provider',
      description: 'Wraps the app; configures duration and swipe behaviour.',
      props: [
        { name: 'duration', type: 'number', default: '5000', description: 'Auto-dismiss time in ms.' },
        { name: 'swipeDirection', type: "'up' | 'down' | 'left' | 'right'", default: "'right'", description: 'Direction to swipe-dismiss.' },
        { name: 'swipeThreshold', type: 'number', default: '50', description: 'Swipe distance in px to dismiss.' },
        { name: 'label', type: 'string', default: "'Notifications'", description: 'Accessible region label.' },
      ],
    },
    { name: 'Toast.Viewport', description: 'The fixed region toasts render into.', props: [{ name: 'hotkey', type: 'string[]', default: "['F8']", description: 'Keys to focus the viewport.' }] },
    {
      name: 'Toast.Root',
      description: 'A single toast.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'duration', type: 'number', description: 'Override the provider duration.' },
        { name: 'type', type: "'foreground' | 'background'", default: "'foreground'", description: 'Announcement priority.' },
      ],
    },
    { name: 'Toast.Title', description: 'The toast heading.', props: [] },
    { name: 'Toast.Description', description: 'The toast body.', props: [] },
    { name: 'Toast.Action', description: 'An action button.', props: [{ name: 'altText', type: 'string', description: 'Required text alternative for screen readers.' }] },
    { name: 'Toast.Close', description: 'A button that dismisses the toast.', props: [] },
  ],

  /* ── Compound ───────────────────────────────────────────────────── */
  'dropdown-menu': [
    {
      name: 'DropdownMenu.Root',
      description: 'Contains all dropdown-menu parts.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
        { name: 'modal', type: 'boolean', default: 'true', description: 'Whether outside interaction is disabled.' },
      ],
    },
    { name: 'DropdownMenu.Trigger', description: 'The button that opens the menu.', props: [asChild] },
    {
      name: 'DropdownMenu.Content',
      description: 'The menu surface.',
      props: [
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", description: 'Preferred side.' },
        { name: 'sideOffset', type: 'number', description: 'Distance from the trigger.' },
        { name: 'align', type: "'start' | 'center' | 'end'", description: 'Alignment.' },
        { name: 'loop', type: 'boolean', default: 'false', description: 'Whether arrow navigation wraps.' },
      ],
    },
    {
      name: 'DropdownMenu.Item',
      description: 'A selectable menu item.',
      props: [
        { name: 'onSelect', type: '(event: Event) => void', description: 'Called on selection. preventDefault to keep open.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the item.' },
        { name: 'inset', type: 'boolean', description: 'Indent to align with checkable items.' },
      ],
    },
    { name: 'DropdownMenu.CheckboxItem', description: 'An item with a checkable state.', props: [{ name: 'checked', type: "boolean | 'indeterminate'", description: 'Checked state.' }, { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when toggled.' }] },
    { name: 'DropdownMenu.RadioGroup', description: 'Groups radio items.', props: [{ name: 'value', type: 'string', description: 'Selected value.' }, { name: 'onValueChange', type: '(value: string) => void', description: 'Called on change.' }] },
    { name: 'DropdownMenu.RadioItem', description: 'An exclusive radio item.', props: [{ name: 'value', type: 'string', description: 'The item value.' }] },
    { name: 'DropdownMenu.Sub', description: 'Wraps a submenu.', props: [] },
    { name: 'DropdownMenu.SubTrigger', description: 'Opens a submenu.', props: [] },
    { name: 'DropdownMenu.SubContent', description: 'The submenu surface.', props: [] },
    { name: 'DropdownMenu.Label', description: 'A non-interactive group label.', props: [] },
    { name: 'DropdownMenu.Separator', description: 'A visual divider.', props: [] },
  ],
  'context-menu': [
    { name: 'ContextMenu.Root', description: 'Contains all context-menu parts.', props: [{ name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' }, { name: 'modal', type: 'boolean', default: 'true', description: 'Whether outside interaction is disabled.' }] },
    { name: 'ContextMenu.Trigger', description: 'The area that opens the menu on right-click / long-press.', props: [{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable triggering.' }] },
    { name: 'ContextMenu.Content', description: 'The menu surface, positioned at the cursor.', props: [] },
    { name: 'ContextMenu.Item', description: 'A selectable item.', props: [{ name: 'onSelect', type: '(event: Event) => void', description: 'Called on selection.' }, { name: 'disabled', type: 'boolean', description: 'Disable the item.' }] },
  ],
  menubar: [
    { name: 'Menubar.Root', description: 'A horizontal bar of menus.', props: [{ name: 'value', type: 'string', description: 'Controlled open menu.' }, { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the open menu changes.' }, { name: 'loop', type: 'boolean', default: 'true', description: 'Whether arrow navigation wraps.' }] },
    { name: 'Menubar.Menu', description: 'A single menu within the bar.', props: [{ name: 'value', type: 'string', description: 'Optional stable identifier.' }] },
    { name: 'Menubar.Trigger', description: 'The button that opens a menu.', props: [{ name: 'disabled', type: 'boolean', description: 'Disable this menu.' }] },
    { name: 'Menubar.Content', description: 'The menu surface.', props: [] },
    { name: 'Menubar.Item', description: 'A selectable item.', props: [{ name: 'inset', type: 'boolean', description: 'Indent the item.' }] },
  ],
  'navigation-menu': [
    {
      name: 'NavigationMenu.Root',
      description: 'Site-level navigation with submenus.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled active item.' },
        { name: 'defaultValue', type: 'string', description: 'Initial active item.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active item changes.' },
        { name: 'delayDuration', type: 'number', default: '200', description: 'Hover open delay in ms.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout axis.' },
      ],
    },
    { name: 'NavigationMenu.List', description: 'The list of top-level items.', props: [] },
    { name: 'NavigationMenu.Item', description: 'A top-level entry.', props: [{ name: 'value', type: 'string', description: 'Stable identifier.' }] },
    { name: 'NavigationMenu.Trigger', description: 'Opens an item submenu.', props: [] },
    { name: 'NavigationMenu.Content', description: 'The submenu panel.', props: [] },
    { name: 'NavigationMenu.Link', description: 'A navigable link.', props: [{ name: 'active', type: 'boolean', description: 'Marks the current page.' }] },
  ],
  select: [
    {
      name: 'Select.Root',
      description: 'Contains all select parts.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Initial value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the value changes.' },
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
      ],
    },
    { name: 'Select.Trigger', description: 'The button that opens the listbox.', props: [className] },
    { name: 'Select.Value', description: 'Displays the selected value.', props: [{ name: 'placeholder', type: 'ReactNode', description: 'Shown when no value is selected.' }] },
    {
      name: 'Select.Content',
      description: 'The listbox popup.',
      props: [
        { name: 'position', type: "'item-aligned' | 'popper'", default: "'popper'", description: 'Positioning strategy.' },
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", description: 'Preferred side.' },
        { name: 'align', type: "'start' | 'center' | 'end'", description: 'Alignment.' },
      ],
    },
    {
      name: 'Select.Item',
      description: 'A selectable option.',
      props: [
        { name: 'value', type: 'string', description: 'The value submitted when selected.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the option.' },
        { name: 'textValue', type: 'string', description: 'Override the typeahead text.' },
      ],
    },
    { name: 'Select.Group', description: 'Groups related items.', props: [] },
    { name: 'Select.Label', description: 'A group label.', props: [] },
    { name: 'Select.Separator', description: 'A visual divider.', props: [] },
  ],
  combobox: [
    {
      name: 'Combobox.Root',
      description: 'A searchable autocomplete select.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled selected value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selection changes.' },
        { name: 'inputValue', type: 'string', description: 'Controlled input text.' },
        { name: 'onInputValueChange', type: '(value: string) => void', description: 'Called when the input text changes.' },
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the combobox.' },
      ],
    },
    { name: 'Combobox.Input', description: 'The search input.', props: [className] },
    { name: 'Combobox.Content', description: 'The results listbox.', props: [] },
    { name: 'Combobox.Item', description: 'A result option.', props: [{ name: 'value', type: 'string', description: 'The option value.' }, { name: 'disabled', type: 'boolean', description: 'Disable the option.' }] },
    { name: 'Combobox.Empty', description: 'Shown when no results match.', props: [] },
  ],
  command: [
    {
      name: 'Command.Root',
      description: 'A command palette with fuzzy search.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled highlighted value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the highlighted item changes.' },
        { name: 'filter', type: '(value, search, keywords?) => number', description: 'Custom scoring function.' },
        { name: 'shouldFilter', type: 'boolean', default: 'true', description: 'Whether to filter items internally.' },
        { name: 'loop', type: 'boolean', default: 'false', description: 'Whether arrow navigation wraps.' },
      ],
    },
    { name: 'Command.Input', description: 'The search field.', props: [] },
    { name: 'Command.List', description: 'The scrollable result list.', props: [] },
    { name: 'Command.Item', description: 'A command entry.', props: [{ name: 'value', type: 'string', description: 'Match value.' }, { name: 'keywords', type: 'string[]', description: 'Extra search terms.' }, { name: 'onSelect', type: '(value: string) => void', description: 'Called on selection.' }, { name: 'disabled', type: 'boolean', description: 'Disable the item.' }] },
    { name: 'Command.Group', description: 'A labelled group of items.', props: [{ name: 'heading', type: 'ReactNode', description: 'Group heading.' }] },
    { name: 'Command.Empty', description: 'Shown when nothing matches.', props: [] },
    { name: 'Command.Separator', description: 'A visual divider.', props: [] },
  ],

  /* ── Specialty / misc ───────────────────────────────────────────── */
  calendar: [
    {
      name: 'Calendar',
      description: 'A standalone calendar supporting single, range and multiple selection.',
      props: [
        { name: 'mode', type: "'single' | 'range' | 'multiple'", default: "'single'", description: 'Selection mode.' },
        { name: 'selected', type: 'Date | Date[] | { from, to }', description: 'Controlled selection.' },
        { name: 'onSelect', type: '(value) => void', description: 'Called when the selection changes.' },
        { name: 'month', type: 'Date', description: 'Controlled displayed month.' },
        { name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
        { name: 'weekStartsOn', type: 'number', default: '0', description: 'First day of the week (0 = Sunday).' },
        { name: 'showOutsideDays', type: 'boolean', default: 'true', description: 'Render days from adjacent months.' },
      ],
    },
  ],
  'date-picker': [
    { name: 'DatePicker.Root', description: 'A date input — Calendar inside a Popover.', props: [{ name: 'value', type: 'Date', description: 'Controlled date.' }, { name: 'onValueChange', type: '(date?: Date) => void', description: 'Called when the date changes.' }] },
    { name: 'DatePicker.Trigger', description: 'The button that opens the calendar.', props: [] },
    { name: 'DatePicker.Content', description: 'The popover containing the calendar.', props: [] },
  ],
  'color-picker': [
    {
      name: 'ColorPicker.Root',
      description: 'An HSV color picker.',
      props: [
        { name: 'value', type: 'HsvaColor', description: 'Controlled color.' },
        { name: 'onValueChange', type: '(value: HsvaColor) => void', description: 'Called when the color changes.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the picker.' },
      ],
    },
    { name: 'ColorPicker.Area', description: 'The saturation / value 2-D area.', props: [] },
    { name: 'ColorPicker.HueSlider', description: 'The hue slider.', props: [] },
    { name: 'ColorPicker.AlphaSlider', description: 'The alpha slider.', props: [] },
    { name: 'ColorPicker.Swatch', description: 'A preview of the current color.', props: [] },
  ],
  'file-upload': [
    {
      name: 'FileUpload.Root',
      description: 'A drag-and-drop file input.',
      props: [
        { name: 'value', type: 'File[]', description: 'Controlled file list.' },
        { name: 'onValueChange', type: '(files: File[]) => void', description: 'Called when files change.' },
        { name: 'accept', type: 'string', description: 'Accepted MIME types / extensions.' },
        { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files.' },
        { name: 'maxSize', type: 'number', description: 'Maximum file size in bytes.' },
        { name: 'maxFiles', type: 'number', description: 'Maximum number of files.' },
      ],
    },
    { name: 'FileUpload.Dropzone', description: 'The drop target.', props: [] },
    { name: 'FileUpload.Input', description: 'The hidden native file input.', props: [] },
  ],
  'scroll-area': [
    { name: 'ScrollArea.Root', description: 'A container with custom scrollbars.', props: [{ name: 'type', type: "'auto' | 'always' | 'scroll' | 'hover'", default: "'hover'", description: 'When scrollbars appear.' }, { name: 'scrollHideDelay', type: 'number', default: '600', description: 'Delay before hiding scrollbars (ms).' }] },
    { name: 'ScrollArea.Scrollbar', description: 'A scrollbar track.', props: [{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Scrollbar axis.' }] },
  ],
  toolbar: [
    { name: 'Toolbar.Root', description: 'A row of controls with roving focus.', props: [{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout axis.' }, { name: 'loop', type: 'boolean', default: 'true', description: 'Whether arrow navigation wraps.' }] },
    { name: 'Toolbar.Button', description: 'A toolbar button.', props: [] },
    { name: 'Toolbar.Separator', description: 'A divider.', props: [] },
  ],
  resizable: [
    { name: 'Resizable.Group', description: 'A set of resizable panels.', props: [{ name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Resize axis.' }, { name: 'onLayout', type: '(sizes: number[]) => void', description: 'Called when sizes change.' }] },
    { name: 'Resizable.Panel', description: 'A single panel.', props: [{ name: 'id', type: 'string', description: 'Unique panel id.' }, { name: 'defaultSize', type: 'number', description: 'Initial size (flex units).' }, { name: 'minSize', type: 'number', description: 'Minimum size.' }] },
    { name: 'Resizable.Handle', description: 'The drag handle between panels.', props: [{ name: 'between', type: '[string, string]', description: 'IDs of the panels on each side.' }, { name: 'withHandle', type: 'boolean', description: 'Render a visible grip.' }] },
  ],
  carousel: [
    {
      name: 'Carousel.Root',
      description: 'An image / content slider.',
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Slide axis.' },
        { name: 'loop', type: 'boolean', default: 'false', description: 'Whether it wraps around.' },
        { name: 'index', type: 'number', description: 'Controlled active slide.' },
        { name: 'onIndexChange', type: '(index: number) => void', description: 'Called when the slide changes.' },
        { name: 'autoPlayInterval', type: 'number', description: 'Autoplay interval in ms.' },
      ],
    },
    { name: 'Carousel.Content', description: 'The slide track.', props: [] },
    { name: 'Carousel.Item', description: 'A single slide.', props: [] },
    { name: 'Carousel.Previous', description: 'Goes to the previous slide.', props: [] },
    { name: 'Carousel.Next', description: 'Goes to the next slide.', props: [] },
  ],
  tree: [
    {
      name: 'Tree.Root',
      description: 'A file-explorer-style tree.',
      props: [
        { name: 'expanded', type: 'string[]', description: 'Controlled expanded item ids.' },
        { name: 'onExpandedChange', type: '(expanded: string[]) => void', description: 'Called when expansion changes.' },
        { name: 'selected', type: 'string', description: 'Controlled selected id.' },
        { name: 'onSelectedChange', type: '(id?: string) => void', description: 'Called when selection changes.' },
      ],
    },
    { name: 'Tree.Item', description: 'A tree node.', props: [{ name: 'id', type: 'string', description: 'Unique node id.' }, { name: 'hasChildren', type: 'boolean', description: 'Whether the node is expandable.' }] },
    { name: 'Tree.Trigger', description: 'The clickable node label.', props: [] },
    { name: 'Tree.Group', description: 'The children of an expandable node.', props: [] },
  ],
  editable: [
    {
      name: 'Editable.Root',
      description: 'Inline-editable text.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when committed.' },
        { name: 'submitMode', type: "'enter' | 'blur' | 'both'", default: "'both'", description: 'How edits are committed.' },
        { name: 'onSubmit', type: '(value: string) => void', description: 'Called on commit.' },
      ],
    },
    { name: 'Editable.Preview', description: 'The read-only display.', props: [] },
    { name: 'Editable.Input', description: 'The edit field.', props: [] },
  ],
  'tags-input': [
    {
      name: 'TagsInput.Root',
      description: 'A tag input with chips.',
      props: [
        { name: 'value', type: 'string[]', description: 'Controlled tags.' },
        { name: 'onValueChange', type: '(tags: string[]) => void', description: 'Called when tags change.' },
        { name: 'delimiters', type: 'string[]', default: "[',', 'Enter']", description: 'Keys that commit a tag.' },
        { name: 'maxTags', type: 'number', description: 'Maximum number of tags.' },
        { name: 'duplicateTags', type: 'boolean', default: 'false', description: 'Allow duplicate tags.' },
      ],
    },
    { name: 'TagsInput.Input', description: 'The text input.', props: [] },
    { name: 'TagsInput.Tag', description: 'A single chip.', props: [{ name: 'index', type: 'number', description: 'The tag index.' }] },
  ],
  mentions: [
    {
      name: 'Mentions.Root',
      description: 'An @-mention textarea.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled text.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the text changes.' },
        { name: 'triggerChar', type: 'string', default: "'@'", description: 'Character that opens suggestions.' },
      ],
    },
    { name: 'Mentions.Textarea', description: 'The editable textarea.', props: [] },
    { name: 'Mentions.Suggestions', description: 'The suggestion popover.', props: [{ name: 'items', type: 'MentionSuggestion[]', description: 'Suggestion data.' }] },
  ],
  meter: [
    {
      name: 'Meter',
      description: 'A quantitative measurement display.',
      props: [
        { name: 'value', type: 'number', description: 'Current value.' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'low', type: 'number', description: 'Upper bound of the low range.' },
        { name: 'high', type: 'number', description: 'Lower bound of the high range.' },
        { name: 'optimum', type: 'number', description: 'The optimal value.' },
      ],
    },
  ],
  'circular-progress': [
    {
      name: 'CircularProgress',
      description: 'A circular progress / spinner.',
      props: [
        { name: 'value', type: 'number | null', description: 'Progress value; null for indeterminate.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'size', type: 'number', default: '40', description: 'Diameter in px.' },
        { name: 'strokeWidth', type: 'number', default: '4', description: 'Ring thickness.' },
      ],
    },
  ],
  'copy-button': [
    {
      name: 'CopyButton',
      description: 'Copies text to the clipboard with success feedback.',
      props: [
        { name: 'value', type: 'string', description: 'The text to copy.' },
        { name: 'resetAfter', type: 'number', default: '2000', description: 'Time before the icon resets (ms).' },
        { name: 'onCopied', type: '(value: string) => void', description: 'Called after a successful copy.' },
      ],
    },
  ],
  toggle: [
    {
      name: 'Toggle',
      description: 'A two-state pressable button.',
      props: [
        { name: 'pressed', type: 'boolean', description: 'Controlled pressed state.' },
        { name: 'defaultPressed', type: 'boolean', description: 'Initial pressed state.' },
        { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Called when toggled.' },
        { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'Visual style.' },
        { name: 'size', type: "'default' | 'sm' | 'lg'", default: "'default'", description: 'Control size.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the toggle.' },
      ],
    },
  ],
  'toggle-group': [
    {
      name: 'ToggleGroup.Root',
      description: 'A group of toggles.',
      props: [
        { name: 'type', type: "'single' | 'multiple'", description: 'Selection mode.' },
        { name: 'value', type: 'string | string[]', description: 'Controlled value.' },
        { name: 'onValueChange', type: '(value) => void', description: 'Called when selection changes.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the whole group.' },
      ],
    },
    { name: 'ToggleGroup.Item', description: 'A single toggle.', props: [{ name: 'value', type: 'string', description: 'The item value.' }, { name: 'disabled', type: 'boolean', description: 'Disable the item.' }] },
  ],
  label: [
    { name: 'Label', description: 'An accessible form label.', props: [{ name: 'htmlFor', type: 'string', description: 'Associates the label with a control id.' }, asChild, className] },
  ],
  'one-time-password-field': [
    {
      name: 'OneTimePasswordField.Root',
      description: 'An OTP / PIN input.',
      props: [
        { name: 'length', type: 'number', default: '6', description: 'Number of digits.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the value changes.' },
        { name: 'type', type: "'numeric' | 'alphanumeric'", default: "'numeric'", description: 'Allowed characters.' },
        { name: 'mask', type: 'boolean', description: 'Mask the entered characters.' },
        { name: 'onComplete', type: '(value: string) => void', description: 'Called when all slots are filled.' },
      ],
    },
    { name: 'OneTimePasswordField.Input', description: 'A single digit slot.', props: [{ name: 'index', type: 'number', description: 'Zero-based slot index.' }] },
  ],
  'password-toggle-field': [
    { name: 'PasswordToggleField.Root', description: 'A password input with a visibility toggle.', props: [{ name: 'visible', type: 'boolean', description: 'Controlled visibility.' }, { name: 'onVisibleChange', type: '(visible: boolean) => void', description: 'Called when visibility changes.' }] },
    { name: 'PasswordToggleField.Input', description: 'The password input.', props: [] },
    { name: 'PasswordToggleField.Toggle', description: 'The show / hide button.', props: [] },
  ],
  'time-picker': [
    {
      name: 'TimePicker.Root',
      description: 'A segmented time input.',
      props: [
        { name: 'value', type: 'TimeValue', description: 'Controlled time.' },
        { name: 'onValueChange', type: '(value: TimeValue) => void', description: 'Called when the time changes.' },
        { name: 'hour12', type: 'boolean', default: 'false', description: 'Use a 12-hour clock.' },
        { name: 'withSeconds', type: 'boolean', default: 'false', description: 'Include a seconds segment.' },
      ],
    },
    { name: 'TimePicker.Segment', description: 'An editable hour / minute / second segment.', props: [{ name: 'segment', type: "'hour' | 'minute' | 'second' | 'period'", description: 'Which unit this segment edits.' }] },
  ],
  'date-range-picker': [
    { name: 'DateRangePicker.Root', description: 'A date-range input — Calendar in a Popover.', props: [{ name: 'value', type: '{ from?: Date; to?: Date }', description: 'Controlled range.' }, { name: 'onValueChange', type: '(range) => void', description: 'Called when the range changes.' }] },
    { name: 'DateRangePicker.Trigger', description: 'Opens the calendar.', props: [] },
    { name: 'DateRangePicker.Content', description: 'The popover with the range calendar.', props: [] },
  ],
};

void div;

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
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'",
          default: "'default'",
          description: 'Visual style.',
        },
        asChild,
        className,
      ],
    },
  ],
  card: [
    { name: 'Card.Root', description: 'The outer card container.', props: [className] },
    {
      name: 'Card.Header',
      description: 'Top section, holds Title and Description.',
      props: [className],
    },
    { name: 'Card.Title', description: 'The card heading. Renders an h3.', props: [className] },
    {
      name: 'Card.Description',
      description: 'Supporting text under the title.',
      props: [className],
    },
    { name: 'Card.Content', description: 'The main body of the card.', props: [className] },
    { name: 'Card.Footer', description: 'Bottom section, typically actions.', props: [className] },
  ],
  alert: [
    {
      name: 'Alert.Root',
      description: 'The alert container. Has role="alert".',
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
          default: "'default'",
          description: 'Visual style.',
        },
        className,
      ],
    },
    { name: 'Alert.Title', description: 'The alert heading.', props: [className] },
    { name: 'Alert.Description', description: 'The alert body text.', props: [className] },
  ],
  avatar: [
    {
      name: 'Avatar.Root',
      description: 'Contains the image and fallback.',
      props: [asChild, className],
    },
    {
      name: 'Avatar.Image',
      description: 'The avatar image. Renders only once loaded successfully.',
      props: [
        { name: 'src', type: 'string', description: 'Image source URL.' },
        {
          name: 'onLoadingStatusChange',
          type: "(status: 'idle' | 'loading' | 'loaded' | 'error') => void",
          description: 'Called when the loading status changes.',
        },
        className,
      ],
    },
    {
      name: 'Avatar.Fallback',
      description: 'Renders while the image is loading or has failed.',
      props: [
        {
          name: 'delayMs',
          type: 'number',
          description: 'Delay in ms before showing, to avoid flicker on fast loads.',
        },
        className,
      ],
    },
  ],
  progress: [
    {
      name: 'Progress',
      description: 'A linear progress bar. Has role="progressbar".',
      props: [
        {
          name: 'value',
          type: 'number | null',
          description: 'Current value (0–max). Pass null for indeterminate.',
        },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        {
          name: 'getValueLabel',
          type: '(value, max) => string',
          description: 'Returns the localized aria-valuetext label.',
        },
        className,
      ],
    },
  ],
  skeleton: [
    {
      name: 'Skeleton',
      description: 'A pulse-animated placeholder. Shape it with classes.',
      props: [className],
    },
  ],
  spinner: [
    {
      name: 'Spinner',
      description: 'A loading status indicator.',
      props: [
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'xl'",
          default: "'md'",
          description: 'Visual size.',
        },
        {
          name: 'label',
          type: 'string',
          default: "'Loading'",
          description: 'Visually hidden label announced to assistive technology.',
        },
        className,
      ],
    },
  ],
  separator: [
    {
      name: 'Separator',
      description: 'A visual or semantic divider.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The axis of the separator.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'true',
          description: 'When true, removes it from the accessibility tree.',
        },
        className,
      ],
    },
  ],
  'aspect-ratio': [
    {
      name: 'AspectRatio',
      description: 'Constrains content to a width/height ratio.',
      props: [
        {
          name: 'ratio',
          type: 'number',
          default: '1',
          description: 'The desired ratio, e.g. 16 / 9.',
        },
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
        {
          name: "'aria-invalid'",
          type: 'boolean',
          description: 'Marks the field invalid and applies error styling.',
        },
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
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the textarea.',
        },
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
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: 'Initial checked state when uncontrolled.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Called when the checked state changes.',
        },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch.' },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Mark as required in a form.',
        },
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
        {
          name: 'checked',
          type: "boolean | 'indeterminate'",
          description: 'Controlled checked state.',
        },
        {
          name: 'defaultChecked',
          type: "boolean | 'indeterminate'",
          description: 'Initial checked state when uncontrolled.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked) => void',
          description: 'Called when the checked state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the checkbox.',
        },
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
        {
          name: 'value',
          type: 'number[]',
          description: 'Controlled value(s). One entry per thumb.',
        },
        {
          name: 'defaultValue',
          type: 'number[]',
          default: '[min]',
          description: 'Initial value(s) when uncontrolled.',
        },
        {
          name: 'onValueChange',
          type: '(value: number[]) => void',
          description: 'Called as the value changes.',
        },
        {
          name: 'onValueCommit',
          type: '(value: number[]) => void',
          description: 'Called when the value settles (pointer up / key release).',
        },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'step', type: 'number', default: '1', description: 'Stepping interval.' },
        {
          name: 'minStepsBetweenThumbs',
          type: 'number',
          default: '0',
          description: 'Minimum steps between adjacent thumbs.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Slider axis.',
        },
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
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the selection changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the whole group.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'vertical'",
          description: 'Arrow-key navigation axis.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether arrow navigation wraps.',
        },
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
      props: [
        {
          name: 'onClearServerErrors',
          type: '() => void',
          description: 'Called on change to clear server-side errors.',
        },
      ],
    },
    {
      name: 'Form.Field',
      description: 'Wraps a control with its label and messages.',
      props: [
        {
          name: 'name',
          type: 'string',
          description: 'Field name — links label, control and messages.',
        },
        {
          name: 'serverInvalid',
          type: 'boolean',
          description: 'Force-mark the field invalid from server validation.',
        },
      ],
    },
    { name: 'Form.Label', description: 'Label bound to the field control.', props: [asChild] },
    {
      name: 'Form.Control',
      description: 'The input. Reports native ValidityState.',
      props: [asChild],
    },
    {
      name: 'Form.Message',
      description: 'A validation message, shown when its match fails.',
      props: [
        {
          name: 'match',
          type: 'ValidityMatcher | function',
          description: "A built-in matcher (e.g. 'valueMissing') or a custom predicate.",
        },
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
        {
          name: 'onValueChange',
          type: '(value?: number) => void',
          description: 'Called when the value changes.',
        },
        { name: 'min', type: 'number', description: 'Minimum allowed value.' },
        { name: 'max', type: 'number', description: 'Maximum allowed value.' },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Increment / decrement amount.',
        },
        {
          name: 'formatOptions',
          type: 'Intl.NumberFormatOptions',
          description: 'Number formatting options.',
        },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field.' },
      ],
    },
    { name: 'NumberField.Input', description: 'The text input with role="spinbutton".', props: [] },
    {
      name: 'NumberField.IncrementTrigger',
      description: 'Button that increases the value.',
      props: [],
    },
    {
      name: 'NumberField.DecrementTrigger',
      description: 'Button that decreases the value.',
      props: [],
    },
  ],

  /* ── Disclosure ─────────────────────────────────────────────────── */
  accordion: [
    {
      name: 'Accordion.Root',
      description: 'Contains all accordion items.',
      props: [
        {
          name: 'type',
          type: "'single' | 'multiple'",
          description: 'Whether one or many panels can be open.',
        },
        { name: 'value', type: 'string | string[]', description: 'Controlled open item(s).' },
        { name: 'defaultValue', type: 'string | string[]', description: 'Initial open item(s).' },
        {
          name: 'onValueChange',
          type: '(value) => void',
          description: 'Called when the open set changes.',
        },
        {
          name: 'collapsible',
          type: 'boolean',
          default: 'false',
          description: "For type='single', allow closing the open item.",
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the whole accordion.',
        },
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
    {
      name: 'Accordion.Trigger',
      description: 'Toggles its panel. Wrapped in a Header.',
      props: [],
    },
    {
      name: 'Accordion.Content',
      description: 'The collapsible panel content.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting for animation control.',
        },
      ],
    },
  ],
  tabs: [
    {
      name: 'Tabs.Root',
      description: 'Contains the tab list and panels.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled active tab.' },
        { name: 'defaultValue', type: 'string', description: 'Initial active tab.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the active tab changes.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Layout axis.',
        },
        {
          name: 'activationMode',
          type: "'automatic' | 'manual'",
          default: "'automatic'",
          description: 'Whether focusing a tab activates it.',
        },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
      ],
    },
    {
      name: 'Tabs.List',
      description: 'The container of tab triggers.',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether arrow navigation wraps.',
        },
      ],
    },
    {
      name: 'Tabs.Trigger',
      description: 'Activates its associated panel.',
      props: [
        { name: 'value', type: 'string', description: 'Links the trigger to its content.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this tab.' },
      ],
    },
    {
      name: 'Tabs.Content',
      description: 'The panel for a given value.',
      props: [
        { name: 'value', type: 'string', description: 'Links the content to its trigger.' },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting for animation control.',
        },
      ],
    },
  ],
  collapsible: [
    {
      name: 'Collapsible.Root',
      description: 'A single show/hide section.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the collapsible.',
        },
      ],
    },
    { name: 'Collapsible.Trigger', description: 'Toggles the content.', props: [asChild] },
    {
      name: 'Collapsible.Content',
      description: 'The collapsible region.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting for animation control.',
        },
      ],
    },
  ],
  breadcrumb: [
    { name: 'Breadcrumb.Root', description: 'A nav landmark labelled "breadcrumb".', props: [] },
    { name: 'Breadcrumb.List', description: 'The ordered list of crumbs.', props: [className] },
    { name: 'Breadcrumb.Item', description: 'A single crumb.', props: [className] },
    {
      name: 'Breadcrumb.Link',
      description: 'A navigable crumb link.',
      props: [asChild, className],
    },
    {
      name: 'Breadcrumb.Page',
      description: 'The current page crumb (non-link).',
      props: [className],
    },
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
        {
          name: 'activeStep',
          type: 'number',
          description: 'Zero-based index of the current step.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Layout axis.',
        },
      ],
    },
    {
      name: 'Stepper.Step',
      description: 'A single step.',
      props: [{ name: 'index', type: 'number', description: 'Zero-based position of this step.' }],
    },
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
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'false',
          description: 'Whether outside interaction is disabled.',
        },
      ],
    },
    {
      name: 'Popover.Trigger',
      description: 'The button that toggles the popover.',
      props: [asChild],
    },
    {
      name: 'Popover.Anchor',
      description: 'Optional custom positioning anchor.',
      props: [asChild],
    },
    {
      name: 'Popover.Content',
      description: 'The floating content.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'bottom'",
          description: 'Preferred side of the anchor.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '0',
          description: 'Distance in px from the anchor.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'center'",
          description: 'Alignment against the anchor.',
        },
        {
          name: 'onEscapeKeyDown',
          type: '(event) => void',
          description: 'Called when Escape is pressed.',
        },
        {
          name: 'onPointerDownOutside',
          type: '(event) => void',
          description: 'Called on outside pointer-down.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Force mounting for animation control.',
        },
      ],
    },
    { name: 'Popover.Close', description: 'A button that closes the popover.', props: [asChild] },
    {
      name: 'Popover.Arrow',
      description: 'An optional pointing arrow.',
      props: [
        { name: 'width', type: 'number', default: '10', description: 'Arrow width.' },
        { name: 'height', type: 'number', default: '5', description: 'Arrow height.' },
      ],
    },
  ],
  tooltip: [
    {
      name: 'Tooltip.Provider',
      description: 'Coordinates delay timing across all tooltips inside it.',
      props: [
        { name: 'delayDuration', type: 'number', default: '700', description: 'Open delay in ms.' },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description: 'Window in which the next tooltip opens instantly.',
        },
        {
          name: 'disableHoverableContent',
          type: 'boolean',
          default: 'false',
          description: 'Disable hovering into tooltip content.',
        },
      ],
    },
    {
      name: 'Tooltip.Root',
      description: 'A single tooltip.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        { name: 'delayDuration', type: 'number', description: 'Override the provider delay.' },
      ],
    },
    {
      name: 'Tooltip.Trigger',
      description: 'The element that triggers the tooltip.',
      props: [asChild],
    },
    {
      name: 'Tooltip.Content',
      description: 'The tooltip popup.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'top'",
          description: 'Preferred side.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '0',
          description: 'Distance from the trigger.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'center'",
          description: 'Alignment.',
        },
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
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'openDelay',
          type: 'number',
          default: '700',
          description: 'Delay before opening on hover.',
        },
        {
          name: 'closeDelay',
          type: 'number',
          default: '300',
          description: 'Delay before closing on leave.',
        },
      ],
    },
    {
      name: 'HoverCard.Trigger',
      description: 'The element that opens the card on hover.',
      props: [asChild],
    },
    {
      name: 'HoverCard.Content',
      description: 'The floating card content.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          description: 'Preferred side.',
        },
        { name: 'sideOffset', type: 'number', description: 'Distance from the trigger.' },
      ],
    },
  ],
  'alert-dialog': [
    {
      name: 'AlertDialog.Root',
      description: 'A confirmation dialog requiring an explicit choice.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
      ],
    },
    { name: 'AlertDialog.Trigger', description: 'Opens the alert dialog.', props: [asChild] },
    {
      name: 'AlertDialog.Content',
      description: 'The dialog body. Outside interaction is blocked.',
      props: [
        {
          name: 'onOpenAutoFocus',
          type: '(event) => void',
          description: 'Customize initial focus.',
        },
      ],
    },
    {
      name: 'AlertDialog.Cancel',
      description: 'The cancelling action. Receives initial focus.',
      props: [asChild],
    },
    { name: 'AlertDialog.Action', description: 'The confirming action.', props: [asChild] },
    { name: 'AlertDialog.Title', description: 'Accessible dialog title.', props: [] },
    { name: 'AlertDialog.Description', description: 'Accessible dialog description.', props: [] },
  ],
  sheet: [
    {
      name: 'Sheet.Root',
      description: 'Contains all sheet parts (built on Dialog).',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
      ],
    },
    { name: 'Sheet.Trigger', description: 'Opens the sheet.', props: [asChild] },
    {
      name: 'Sheet.Content',
      description: 'The sliding panel.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'right'",
          description: 'Edge the sheet slides from.',
        },
        className,
      ],
    },
  ],
  drawer: [
    {
      name: 'Drawer.Root',
      description: 'Contains all drawer parts (bottom sheet).',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
      ],
    },
    { name: 'Drawer.Trigger', description: 'Opens the drawer.', props: [asChild] },
    { name: 'Drawer.Content', description: 'The bottom-anchored panel.', props: [className] },
  ],
  toast: [
    {
      name: 'Toast.Provider',
      description: 'Wraps the app; configures duration and swipe behaviour.',
      props: [
        {
          name: 'duration',
          type: 'number',
          default: '5000',
          description: 'Auto-dismiss time in ms.',
        },
        {
          name: 'swipeDirection',
          type: "'up' | 'down' | 'left' | 'right'",
          default: "'right'",
          description: 'Direction to swipe-dismiss.',
        },
        {
          name: 'swipeThreshold',
          type: 'number',
          default: '50',
          description: 'Swipe distance in px to dismiss.',
        },
        {
          name: 'label',
          type: 'string',
          default: "'Notifications'",
          description: 'Accessible region label.',
        },
      ],
    },
    {
      name: 'Toast.Viewport',
      description: 'The fixed region toasts render into.',
      props: [
        {
          name: 'hotkey',
          type: 'string[]',
          default: "['F8']",
          description: 'Keys to focus the viewport.',
        },
      ],
    },
    {
      name: 'Toast.Root',
      description: 'A single toast.',
      props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        { name: 'duration', type: 'number', description: 'Override the provider duration.' },
        {
          name: 'type',
          type: "'foreground' | 'background'",
          default: "'foreground'",
          description: 'Announcement priority.',
        },
      ],
    },
    { name: 'Toast.Title', description: 'The toast heading.', props: [] },
    { name: 'Toast.Description', description: 'The toast body.', props: [] },
    {
      name: 'Toast.Action',
      description: 'An action button.',
      props: [
        {
          name: 'altText',
          type: 'string',
          description: 'Required text alternative for screen readers.',
        },
      ],
    },
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
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether outside interaction is disabled.',
        },
      ],
    },
    {
      name: 'DropdownMenu.Trigger',
      description: 'The button that opens the menu.',
      props: [asChild],
    },
    {
      name: 'DropdownMenu.Content',
      description: 'The menu surface.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          description: 'Preferred side.',
        },
        { name: 'sideOffset', type: 'number', description: 'Distance from the trigger.' },
        { name: 'align', type: "'start' | 'center' | 'end'", description: 'Alignment.' },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether arrow navigation wraps.',
        },
      ],
    },
    {
      name: 'DropdownMenu.Item',
      description: 'A selectable menu item.',
      props: [
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called on selection. preventDefault to keep open.',
        },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the item.' },
        { name: 'inset', type: 'boolean', description: 'Indent to align with checkable items.' },
      ],
    },
    {
      name: 'DropdownMenu.CheckboxItem',
      description: 'An item with a checkable state.',
      props: [
        { name: 'checked', type: "boolean | 'indeterminate'", description: 'Checked state.' },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Called when toggled.',
        },
      ],
    },
    {
      name: 'DropdownMenu.RadioGroup',
      description: 'Groups radio items.',
      props: [
        { name: 'value', type: 'string', description: 'Selected value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called on change.',
        },
      ],
    },
    {
      name: 'DropdownMenu.RadioItem',
      description: 'An exclusive radio item.',
      props: [{ name: 'value', type: 'string', description: 'The item value.' }],
    },
    { name: 'DropdownMenu.Sub', description: 'Wraps a submenu.', props: [] },
    { name: 'DropdownMenu.SubTrigger', description: 'Opens a submenu.', props: [] },
    { name: 'DropdownMenu.SubContent', description: 'The submenu surface.', props: [] },
    { name: 'DropdownMenu.Label', description: 'A non-interactive group label.', props: [] },
    { name: 'DropdownMenu.Separator', description: 'A visual divider.', props: [] },
  ],
  'context-menu': [
    {
      name: 'ContextMenu.Root',
      description: 'Contains all context-menu parts.',
      props: [
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description: 'Whether outside interaction is disabled.',
        },
      ],
    },
    {
      name: 'ContextMenu.Trigger',
      description: 'The area that opens the menu on right-click / long-press.',
      props: [
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable triggering.' },
      ],
    },
    {
      name: 'ContextMenu.Content',
      description: 'The menu surface, positioned at the cursor.',
      props: [],
    },
    {
      name: 'ContextMenu.Item',
      description: 'A selectable item.',
      props: [
        { name: 'onSelect', type: '(event: Event) => void', description: 'Called on selection.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the item.' },
      ],
    },
  ],
  menubar: [
    {
      name: 'Menubar.Root',
      description: 'A horizontal bar of menus.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled open menu.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the open menu changes.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether arrow navigation wraps.',
        },
      ],
    },
    {
      name: 'Menubar.Menu',
      description: 'A single menu within the bar.',
      props: [{ name: 'value', type: 'string', description: 'Optional stable identifier.' }],
    },
    {
      name: 'Menubar.Trigger',
      description: 'The button that opens a menu.',
      props: [{ name: 'disabled', type: 'boolean', description: 'Disable this menu.' }],
    },
    { name: 'Menubar.Content', description: 'The menu surface.', props: [] },
    {
      name: 'Menubar.Item',
      description: 'A selectable item.',
      props: [{ name: 'inset', type: 'boolean', description: 'Indent the item.' }],
    },
  ],
  'navigation-menu': [
    {
      name: 'NavigationMenu.Root',
      description: 'Site-level navigation with submenus.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled active item.' },
        { name: 'defaultValue', type: 'string', description: 'Initial active item.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the active item changes.',
        },
        {
          name: 'delayDuration',
          type: 'number',
          default: '200',
          description: 'Hover open delay in ms.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Layout axis.',
        },
      ],
    },
    { name: 'NavigationMenu.List', description: 'The list of top-level items.', props: [] },
    {
      name: 'NavigationMenu.Item',
      description: 'A top-level entry.',
      props: [{ name: 'value', type: 'string', description: 'Stable identifier.' }],
    },
    { name: 'NavigationMenu.Trigger', description: 'Opens an item submenu.', props: [] },
    { name: 'NavigationMenu.Content', description: 'The submenu panel.', props: [] },
    {
      name: 'NavigationMenu.Link',
      description: 'A navigable link.',
      props: [{ name: 'active', type: 'boolean', description: 'Marks the current page.' }],
    },
  ],
  select: [
    {
      name: 'Select.Root',
      description: 'Contains all select parts.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Initial value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the value changes.',
        },
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Reading direction.' },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: 'Enable option search.',
        },
        { name: 'searchValue', type: 'string', description: 'Controlled search value.' },
        {
          name: 'onSearchValueChange',
          type: '(value: string) => void',
          description: 'Called when search text changes.',
        },
        {
          name: 'filterOption',
          type: '(option, searchValue) => boolean',
          description: 'Customize option matching.',
        },
        {
          name: 'onCreateOption',
          type: '(value: string) => void',
          description: 'Called when a new option is created.',
        },
        {
          name: 'createOptionLabel',
          type: 'ReactNode | (value) => ReactNode',
          description: 'Customize the create option label.',
        },
        {
          name: 'resetSearchOnClose',
          type: 'boolean',
          default: 'true',
          description: 'Clear search when the popup closes.',
        },
      ],
    },
    {
      name: 'Select.Trigger',
      description: 'The button that opens the listbox.',
      props: [className],
    },
    {
      name: 'Select.Value',
      description: 'Displays the selected value.',
      props: [
        { name: 'placeholder', type: 'ReactNode', description: 'Shown when no value is selected.' },
      ],
    },
    {
      name: 'Select.SearchInput',
      description: 'Search field shown when the root is searchable.',
      props: [className],
    },
    {
      name: 'Select.Content',
      description: 'The listbox popup.',
      props: [
        {
          name: 'position',
          type: "'item-aligned' | 'popper'",
          default: "'popper'",
          description: 'Positioning strategy.',
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          description: 'Preferred side.',
        },
        { name: 'align', type: "'start' | 'center' | 'end'", description: 'Alignment.' },
        {
          name: 'options',
          type: 'SelectOption[]',
          description: 'Array-backed options rendered with windowing.',
        },
        {
          name: 'optionHeight',
          type: 'number',
          default: '36',
          description: 'Virtual row height in pixels.',
        },
        {
          name: 'optionOverscan',
          type: 'number',
          default: '6',
          description: 'Extra rows rendered above and below the viewport.',
        },
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
    {
      name: 'Select.CreateItem',
      description: 'Creates the current search text with `onCreateOption`.',
      props: [className],
    },
    {
      name: 'Select.Options',
      description: 'Virtualized renderer for large array-backed option lists.',
      props: [
        { name: 'options', type: 'SelectOption[]', description: 'Options to render.' },
        { name: 'itemHeight', type: 'number', default: '36', description: 'Row height in pixels.' },
        {
          name: 'overscan',
          type: 'number',
          default: '6',
          description: 'Extra rows rendered outside the viewport.',
        },
      ],
    },
    { name: 'Select.Group', description: 'Groups related items.', props: [] },
    { name: 'Select.Label', description: 'A group label.', props: [] },
    { name: 'Select.Separator', description: 'A visual divider.', props: [] },
  ],
  'multi-select': [
    {
      name: 'MultiSelect.Root',
      description: 'Contains all multi-select parts.',
      props: [
        { name: 'value', type: 'string[]', description: 'Controlled selected values.' },
        { name: 'defaultValue', type: 'string[]', description: 'Initial selected values.' },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: 'Called when selected values change.',
        },
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the multi-select.',
        },
        { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
        { name: 'name', type: 'string', description: 'Name for form submission.' },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: 'Enable option search.',
        },
        {
          name: 'onCreateOption',
          type: '(value: string) => void',
          description: 'Called when a new option is created.',
        },
      ],
    },
    {
      name: 'MultiSelect.Trigger',
      description: 'The button that opens the listbox.',
      props: [className],
    },
    {
      name: 'MultiSelect.Value',
      description: 'Displays selected values inside the trigger.',
      props: [
        { name: 'placeholder', type: 'ReactNode', description: 'Shown when no value is selected.' },
        {
          name: 'options',
          type: 'MultiSelectOption[]',
          description: 'Used to resolve selected value labels.',
        },
        {
          name: 'maxVisible',
          type: 'number',
          description: 'Styled wrapper limit before showing an overflow count.',
        },
      ],
    },
    {
      name: 'MultiSelect.SearchInput',
      description: 'Search field shown when the root is searchable.',
      props: [className],
    },
    {
      name: 'MultiSelect.Content',
      description: 'The multi-selectable listbox popup.',
      props: [
        {
          name: 'options',
          type: 'MultiSelectOption[]',
          description: 'Array-backed options rendered with windowing.',
        },
        {
          name: 'optionHeight',
          type: 'number',
          default: '36',
          description: 'Virtual row height in pixels.',
        },
        {
          name: 'optionOverscan',
          type: 'number',
          default: '6',
          description: 'Extra rows rendered above and below the viewport.',
        },
      ],
    },
    {
      name: 'MultiSelect.Item',
      description: 'A toggleable option.',
      props: [
        { name: 'value', type: 'string', description: 'The value toggled when selected.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the option.' },
        { name: 'textValue', type: 'string', description: 'Override the search text.' },
      ],
    },
    {
      name: 'MultiSelect.CreateItem',
      description: 'Creates and selects the current search text with `onCreateOption`.',
      props: [className],
    },
    {
      name: 'MultiSelect.Options',
      description: 'Virtualized renderer for large array-backed option lists.',
      props: [
        { name: 'options', type: 'MultiSelectOption[]', description: 'Options to render.' },
        { name: 'itemHeight', type: 'number', default: '36', description: 'Row height in pixels.' },
        {
          name: 'overscan',
          type: 'number',
          default: '6',
          description: 'Extra rows rendered outside the viewport.',
        },
      ],
    },
    { name: 'MultiSelect.Group', description: 'Groups related items.', props: [] },
    { name: 'MultiSelect.Label', description: 'A group label.', props: [] },
    { name: 'MultiSelect.Separator', description: 'A visual divider.', props: [] },
  ],
  combobox: [
    {
      name: 'Combobox.Root',
      description: 'A searchable autocomplete select.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled selected value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the selection changes.',
        },
        { name: 'inputValue', type: 'string', description: 'Controlled input text.' },
        {
          name: 'onInputValueChange',
          type: '(value: string) => void',
          description: 'Called when the input text changes.',
        },
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when open state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the combobox.',
        },
      ],
    },
    { name: 'Combobox.Input', description: 'The search input.', props: [className] },
    { name: 'Combobox.Content', description: 'The results listbox.', props: [] },
    {
      name: 'Combobox.Item',
      description: 'A result option.',
      props: [
        { name: 'value', type: 'string', description: 'The option value.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the option.' },
      ],
    },
    { name: 'Combobox.Empty', description: 'Shown when no results match.', props: [] },
  ],
  command: [
    {
      name: 'Command.Root',
      description: 'A command palette with fuzzy search.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled highlighted value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the highlighted item changes.',
        },
        {
          name: 'filter',
          type: '(value, search, keywords?) => number',
          description: 'Custom scoring function.',
        },
        {
          name: 'shouldFilter',
          type: 'boolean',
          default: 'true',
          description: 'Whether to filter items internally.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether arrow navigation wraps.',
        },
      ],
    },
    { name: 'Command.Input', description: 'The search field.', props: [] },
    { name: 'Command.List', description: 'The scrollable result list.', props: [] },
    {
      name: 'Command.Item',
      description: 'A command entry.',
      props: [
        { name: 'value', type: 'string', description: 'Match value.' },
        { name: 'keywords', type: 'string[]', description: 'Extra search terms.' },
        { name: 'onSelect', type: '(value: string) => void', description: 'Called on selection.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the item.' },
      ],
    },
    {
      name: 'Command.Group',
      description: 'A labelled group of items.',
      props: [{ name: 'heading', type: 'ReactNode', description: 'Group heading.' }],
    },
    { name: 'Command.Empty', description: 'Shown when nothing matches.', props: [] },
    { name: 'Command.Separator', description: 'A visual divider.', props: [] },
  ],

  /* ── Specialty / misc ───────────────────────────────────────────── */
  calendar: [
    {
      name: 'Calendar',
      description: 'A standalone calendar supporting single, range and multiple selection.',
      props: [
        {
          name: 'mode',
          type: "'single' | 'range' | 'multiple'",
          default: "'single'",
          description: 'Selection mode.',
        },
        {
          name: 'selected',
          type: 'Date | Date[] | { from, to }',
          description: 'Controlled selection.',
        },
        {
          name: 'onSelect',
          type: '(value) => void',
          description: 'Called when the selection changes.',
        },
        { name: 'month', type: 'Date', description: 'Controlled displayed month.' },
        { name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
        {
          name: 'weekStartsOn',
          type: 'number',
          default: '0',
          description: 'First day of the week (0 = Sunday).',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          default: 'true',
          description: 'Render days from adjacent months.',
        },
      ],
    },
  ],
  'date-picker': [
    {
      name: 'DatePicker',
      description: 'MUI-style date field with label, trigger and calendar popover.',
      props: [
        {
          name: 'value / defaultValue',
          type: 'Date | null',
          description: 'Controlled or uncontrolled date value.',
        },
        {
          name: 'onChange / onAccept',
          type: '(value, context) => void',
          description: 'MUI-style callbacks with validationError, source and shortcut metadata.',
        },
        {
          name: 'onError',
          type: '(error, value) => void',
          description: 'Called when validation error state changes.',
        },
        {
          name: 'open / onOpen / onClose',
          type: 'boolean / callbacks',
          description: 'Controlled popover state and lifecycle callbacks.',
        },
        {
          name: 'label / name / inputRef',
          type: 'React.ReactNode / string / ref',
          description: 'Field label and form integration props.',
        },
        {
          name: 'format / formatDensity',
          type: 'string | Intl.DateTimeFormatOptions',
          description: 'Input display format and dense/spacious separator density.',
        },
        {
          name: 'minDate / maxDate / disablePast / disableFuture',
          type: 'Date / boolean',
          description: 'Date validation bounds.',
        },
        {
          name: 'shouldDisableDate / shouldDisableMonth / shouldDisableYear',
          type: '(date: Date) => boolean',
          description: 'Custom date, month and year validation callbacks.',
        },
        {
          name: 'views / view / openTo / onViewChange',
          type: "Array<'day' | 'month' | 'year'>",
          description: 'MUI-compatible view control props.',
        },
        {
          name: 'selectedSections / onSelectedSectionsChange',
          type: 'FieldSelectedSections',
          description: 'MUI-compatible field section selection props.',
        },
        {
          name: 'loading / renderLoading',
          type: 'boolean / () => ReactNode',
          description: 'Render a loading state instead of the calendar.',
        },
        {
          name: 'dayOfWeekFormatter / displayWeekNumber / fixedWeekNumber / showDaysOutsideCurrentMonth',
          type: 'calendar props',
          description: 'Calendar rendering options.',
        },
        {
          name: 'disableOpenPicker / disabled / readOnly / autoFocus',
          type: 'boolean',
          description: 'Interaction and field state props.',
        },
        {
          name: 'desktopModeMediaQuery / orientation / reduceAnimations / referenceDate / timezone',
          type: 'MUI compatibility props',
          description: 'Accepted for API parity.',
        },
        {
          name: 'slots / slotProps / sx / viewRenderers',
          type: 'object',
          description: 'MUI customization props accepted by the component surface.',
        },
      ],
    },
    {
      name: 'DatePicker.Root',
      description: 'Compound date input — Calendar inside a Popover.',
      props: [
        { name: 'value', type: 'Date | null', description: 'Controlled date.' },
        {
          name: 'onValueChange',
          type: '(date?: Date) => void',
          description: 'Aura-style change callback.',
        },
      ],
    },
    { name: 'DatePicker.Trigger', description: 'The button that opens the calendar.', props: [] },
    {
      name: 'DatePicker.Content',
      description: 'The popover containing the calendar.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Custom calendar content. Defaults to DatePicker.Calendar.',
        },
      ],
    },
    {
      name: 'DatePicker.Calendar',
      description: 'Styled calendar bound to DatePicker state.',
      props: [],
    },
  ],
  'color-picker': [
    {
      name: 'ColorPicker.Root',
      description: 'An HSV color picker.',
      props: [
        { name: 'value', type: 'HsvaColor', description: 'Controlled color.' },
        {
          name: 'onValueChange',
          type: '(value: HsvaColor) => void',
          description: 'Called when the color changes.',
        },
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
        {
          name: 'onValueChange',
          type: '(files: File[]) => void',
          description: 'Called when files change.',
        },
        { name: 'accept', type: 'string', description: 'Accepted MIME types / extensions.' },
        {
          name: 'multiple',
          type: 'boolean',
          default: 'false',
          description: 'Allow multiple files.',
        },
        { name: 'maxSize', type: 'number', description: 'Maximum file size in bytes.' },
        { name: 'maxFiles', type: 'number', description: 'Maximum number of files.' },
      ],
    },
    { name: 'FileUpload.Dropzone', description: 'The drop target.', props: [] },
    { name: 'FileUpload.Input', description: 'The hidden native file input.', props: [] },
  ],
  'scroll-area': [
    {
      name: 'ScrollArea.Root',
      description: 'A container with custom scrollbars.',
      props: [
        {
          name: 'type',
          type: "'auto' | 'always' | 'scroll' | 'hover'",
          default: "'hover'",
          description: 'When scrollbars appear.',
        },
        {
          name: 'scrollHideDelay',
          type: 'number',
          default: '600',
          description: 'Delay before hiding scrollbars (ms).',
        },
      ],
    },
    {
      name: 'ScrollArea.Scrollbar',
      description: 'A scrollbar track.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'vertical'",
          description: 'Scrollbar axis.',
        },
      ],
    },
  ],
  toolbar: [
    {
      name: 'Toolbar.Root',
      description: 'A row of controls with roving focus.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Layout axis.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'Whether arrow navigation wraps.',
        },
      ],
    },
    { name: 'Toolbar.Button', description: 'A toolbar button.', props: [] },
    { name: 'Toolbar.Separator', description: 'A divider.', props: [] },
  ],
  resizable: [
    {
      name: 'Resizable.Group',
      description: 'A set of resizable panels.',
      props: [
        {
          name: 'direction',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Resize axis.',
        },
        {
          name: 'onLayout',
          type: '(sizes: number[]) => void',
          description: 'Called when sizes change.',
        },
      ],
    },
    {
      name: 'Resizable.Panel',
      description: 'A single panel.',
      props: [
        { name: 'id', type: 'string', description: 'Unique panel id.' },
        { name: 'defaultSize', type: 'number', description: 'Initial size (flex units).' },
        { name: 'minSize', type: 'number', description: 'Minimum size.' },
      ],
    },
    {
      name: 'Resizable.Handle',
      description: 'The drag handle between panels.',
      props: [
        {
          name: 'between',
          type: '[string, string]',
          description: 'IDs of the panels on each side.',
        },
        { name: 'withHandle', type: 'boolean', description: 'Render a visible grip.' },
      ],
    },
  ],
  carousel: [
    {
      name: 'Carousel.Root',
      description: 'An image / content slider.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Slide axis.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether it wraps around.',
        },
        { name: 'index', type: 'number', description: 'Controlled active slide.' },
        {
          name: 'onIndexChange',
          type: '(index: number) => void',
          description: 'Called when the slide changes.',
        },
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
        {
          name: 'onExpandedChange',
          type: '(expanded: string[]) => void',
          description: 'Called when expansion changes.',
        },
        { name: 'selected', type: 'string', description: 'Controlled selected id.' },
        {
          name: 'onSelectedChange',
          type: '(id?: string) => void',
          description: 'Called when selection changes.',
        },
      ],
    },
    {
      name: 'Tree.Item',
      description: 'A tree node.',
      props: [
        { name: 'id', type: 'string', description: 'Unique node id.' },
        { name: 'hasChildren', type: 'boolean', description: 'Whether the node is expandable.' },
      ],
    },
    { name: 'Tree.Trigger', description: 'The clickable node label.', props: [] },
    { name: 'Tree.Group', description: 'The children of an expandable node.', props: [] },
  ],
  editable: [
    {
      name: 'Editable.Root',
      description: 'Inline-editable text.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when committed.',
        },
        {
          name: 'submitMode',
          type: "'enter' | 'blur' | 'both'",
          default: "'both'",
          description: 'How edits are committed.',
        },
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
        {
          name: 'onValueChange',
          type: '(tags: string[]) => void',
          description: 'Called when tags change.',
        },
        {
          name: 'delimiters',
          type: 'string[]',
          default: "[',', 'Enter']",
          description: 'Keys that commit a tag.',
        },
        { name: 'maxTags', type: 'number', description: 'Maximum number of tags.' },
        {
          name: 'duplicateTags',
          type: 'boolean',
          default: 'false',
          description: 'Allow duplicate tags.',
        },
      ],
    },
    { name: 'TagsInput.Input', description: 'The text input.', props: [] },
    {
      name: 'TagsInput.Tag',
      description: 'A single chip.',
      props: [{ name: 'index', type: 'number', description: 'The tag index.' }],
    },
  ],
  mentions: [
    {
      name: 'Mentions.Root',
      description: 'An @-mention textarea.',
      props: [
        { name: 'value', type: 'string', description: 'Controlled text.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the text changes.',
        },
        {
          name: 'triggerChar',
          type: 'string',
          default: "'@'",
          description: 'Character that opens suggestions.',
        },
      ],
    },
    { name: 'Mentions.Textarea', description: 'The editable textarea.', props: [] },
    {
      name: 'Mentions.Suggestions',
      description: 'The suggestion popover.',
      props: [{ name: 'items', type: 'MentionSuggestion[]', description: 'Suggestion data.' }],
    },
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
        {
          name: 'value',
          type: 'number | null',
          description: 'Progress value; null for indeterminate.',
        },
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
        {
          name: 'resetAfter',
          type: 'number',
          default: '2000',
          description: 'Time before the icon resets (ms).',
        },
        {
          name: 'onCopied',
          type: '(value: string) => void',
          description: 'Called after a successful copy.',
        },
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
        {
          name: 'onPressedChange',
          type: '(pressed: boolean) => void',
          description: 'Called when toggled.',
        },
        {
          name: 'variant',
          type: "'default' | 'outline'",
          default: "'default'",
          description: 'Visual style.',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg'",
          default: "'default'",
          description: 'Control size.',
        },
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
        {
          name: 'onValueChange',
          type: '(value) => void',
          description: 'Called when selection changes.',
        },
        { name: 'disabled', type: 'boolean', description: 'Disable the whole group.' },
      ],
    },
    {
      name: 'ToggleGroup.Item',
      description: 'A single toggle.',
      props: [
        { name: 'value', type: 'string', description: 'The item value.' },
        { name: 'disabled', type: 'boolean', description: 'Disable the item.' },
      ],
    },
  ],
  label: [
    {
      name: 'Label',
      description: 'An accessible form label.',
      props: [
        { name: 'htmlFor', type: 'string', description: 'Associates the label with a control id.' },
        asChild,
        className,
      ],
    },
  ],
  'one-time-password-field': [
    {
      name: 'OneTimePasswordField.Root',
      description: 'An OTP / PIN input.',
      props: [
        { name: 'length', type: 'number', default: '6', description: 'Number of digits.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called when the value changes.',
        },
        {
          name: 'type',
          type: "'numeric' | 'alphanumeric'",
          default: "'numeric'",
          description: 'Allowed characters.',
        },
        { name: 'mask', type: 'boolean', description: 'Mask the entered characters.' },
        {
          name: 'onComplete',
          type: '(value: string) => void',
          description: 'Called when all slots are filled.',
        },
      ],
    },
    {
      name: 'OneTimePasswordField.Input',
      description: 'A single digit slot.',
      props: [{ name: 'index', type: 'number', description: 'Zero-based slot index.' }],
    },
  ],
  'password-toggle-field': [
    {
      name: 'PasswordToggleField.Root',
      description: 'A password input with a visibility toggle.',
      props: [
        { name: 'visible', type: 'boolean', description: 'Controlled visibility.' },
        {
          name: 'onVisibleChange',
          type: '(visible: boolean) => void',
          description: 'Called when visibility changes.',
        },
      ],
    },
    { name: 'PasswordToggleField.Input', description: 'The password input.', props: [] },
    { name: 'PasswordToggleField.Toggle', description: 'The show / hide button.', props: [] },
  ],
  'time-picker': [
    {
      name: 'TimePicker',
      description:
        'MUI-style time field with a 12-hour analog clock panel, AM/PM selection and segmented primitive parts.',
      props: [
        {
          name: 'value / defaultValue',
          type: 'Date | TimeValue | null',
          description: 'Controlled or uncontrolled time.',
        },
        {
          name: 'onChange / onAccept',
          type: '(value, context) => void',
          description: 'MUI-style callbacks with validation context.',
        },
        {
          name: 'ampm / ampmInClock',
          type: 'boolean',
          description: '12-hour AM/PM mode is enabled by default in the styled picker.',
        },
        {
          name: 'minTime / maxTime / disablePast / disableFuture',
          type: 'Date / boolean',
          description: 'Time validation bounds.',
        },
        {
          name: 'minutesStep / timeSteps',
          type: 'number / { hours, minutes, seconds }',
          description: 'Clock number stepping, including optional seconds clock selection.',
        },
        {
          name: 'shouldDisableTime / skipDisabled',
          type: '(value, view) => boolean',
          description: 'Disable or hide specific clock values.',
        },
        {
          name: 'views / view / openTo / onViewChange',
          type: "Array<'hours' | 'minutes' | 'seconds'>",
          description: 'MUI-compatible time view props.',
        },
        {
          name: 'format / formatDensity / selectedSections',
          type: 'MUI field props',
          description: 'Formatting and field section props.',
        },
        {
          name: 'disableOpenPicker / disabled / readOnly / autoFocus',
          type: 'boolean',
          description: 'Interaction and field state props.',
        },
        {
          name: 'slots / slotProps / sx / viewRenderers / timezone',
          type: 'object / string',
          description: 'MUI customization and timezone compatibility props.',
        },
      ],
    },
    {
      name: 'TimePicker.Root',
      description: 'Compound segmented time input.',
      props: [
        { name: 'value', type: 'Date | TimeValue | null', description: 'Controlled time.' },
        {
          name: 'onValueChange',
          type: '(value: TimeValue) => void',
          description: 'Aura-style segment callback.',
        },
      ],
    },
    {
      name: 'TimePicker.Panel',
      description: 'Analog clock panel used by the styled TimePicker and DateTimePicker time step.',
      props: [
        { name: 'onAccept / onCancel', type: 'callbacks', description: 'Action button callbacks.' },
      ],
    },
    {
      name: 'TimePicker.Segment',
      description: 'An editable hour / minute / second segment.',
      props: [
        {
          name: 'segment',
          type: "'hour' | 'minute' | 'second' | 'period'",
          description: 'Which unit this segment edits.',
        },
      ],
    },
  ],
  'date-range-picker': [
    {
      name: 'DateRangePicker',
      description: 'MUI-style range field with tuple values and calendar popover.',
      props: [
        {
          name: 'value / defaultValue',
          type: '[Date | null, Date | null] | { from?: Date; to?: Date }',
          description: 'Controlled or uncontrolled range.',
        },
        {
          name: 'onChange / onAccept',
          type: '(range, context) => void',
          description: 'MUI-style callbacks with validation context.',
        },
        {
          name: 'shortcuts',
          type: 'DateRangePickerShortcut[] | false',
          description:
            'Preset action buttons. Defaults include Today, Yesterday, Last 7 days, Last 30 days, This month and Last month.',
        },
        {
          name: 'calendars / currentMonthCalendarPosition',
          type: '1 | 2 | 3',
          description: 'Visible month count and current month placement compatibility.',
        },
        {
          name: 'rangePosition / defaultRangePosition / onRangePositionChange',
          type: "'start' | 'end'",
          description: 'Controlled edited edge of the range.',
        },
        {
          name: 'minDate / maxDate / disablePast / disableFuture',
          type: 'Date / boolean',
          description: 'Date validation bounds.',
        },
        {
          name: 'shouldDisableDate',
          type: "(date: Date, position: 'start' | 'end') => boolean",
          description: 'Custom disabled-date predicate with range edge.',
        },
        {
          name: 'disableAutoMonthSwitching / disableDragEditing',
          type: 'boolean',
          description: 'MUI range behavior compatibility props.',
        },
        {
          name: 'format / formatDensity / selectedSections',
          type: 'MUI field props',
          description: 'Formatting and field section props.',
        },
        {
          name: 'loading / renderLoading',
          type: 'boolean / () => ReactNode',
          description: 'Render loading state.',
        },
        {
          name: 'displayWeekNumber / fixedWeekNumber / showDaysOutsideCurrentMonth',
          type: 'calendar props',
          description: 'Calendar rendering options.',
        },
        {
          name: 'slots / slotProps / sx / viewRenderers / timezone',
          type: 'object / string',
          description: 'MUI customization and timezone compatibility props.',
        },
      ],
    },
    {
      name: 'DateRangePicker.Root',
      description: 'Compound date-range input — Calendar in a Popover.',
      props: [
        {
          name: 'value',
          type: '{ from?: Date; to?: Date } | [Date | null, Date | null]',
          description: 'Controlled range.',
        },
        {
          name: 'onValueChange',
          type: '(range) => void',
          description: 'Aura-style change callback.',
        },
      ],
    },
    { name: 'DateRangePicker.Trigger', description: 'Opens the calendar.', props: [] },
    {
      name: 'DateRangePicker.Content',
      description: 'The popover with the range calendar.',
      props: [{ name: 'calendars', type: '1 | 2', description: 'Number of visible months.' }],
    },
    {
      name: 'DateRangePicker.Calendar',
      description: 'Styled range calendar bound to DateRangePicker state.',
      props: [],
    },
  ],
  'date-time-picker': [
    {
      name: 'DateTimePicker',
      description:
        'MUI-style date-time field that selects the date first, then shows the time picker.',
      props: [
        {
          name: 'value / defaultValue',
          type: 'Date | null',
          description: 'Controlled or uncontrolled date-time value.',
        },
        {
          name: 'onChange / onAccept',
          type: '(value, context) => void',
          description: 'MUI-style callbacks with validation context.',
        },
        {
          name: 'minDateTime / maxDateTime',
          type: 'Date',
          description: 'Absolute date-time validation bounds.',
        },
        {
          name: 'minDate / maxDate / minTime / maxTime',
          type: 'Date',
          description: 'Separate date and time validation bounds.',
        },
        {
          name: 'ampm / minutesStep / timeSteps',
          type: 'boolean / number / object',
          description: 'Time selection behavior.',
        },
        {
          name: 'shouldDisableDate / shouldDisableMonth / shouldDisableYear / shouldDisableTime',
          type: 'validation callbacks',
          description: 'Custom validation callbacks.',
        },
        {
          name: 'views / view / openTo / onViewChange',
          type: 'date-time views',
          description: 'MUI-compatible view control props.',
        },
        {
          name: 'loading / renderLoading / format / formatDensity',
          type: 'MUI field props',
          description: 'Display and loading props.',
        },
        {
          name: 'slots / slotProps / sx / viewRenderers / timezone',
          type: 'object / string',
          description: 'MUI customization and timezone compatibility props.',
        },
      ],
    },
    {
      name: 'DateTimePicker.Root',
      description: 'Compound date-time input with one controlled Date value.',
      props: [{ name: 'value', type: 'Date | null', description: 'Controlled date-time.' }],
    },
    { name: 'DateTimePicker.Trigger', description: 'Opens the date-time popover.', props: [] },
    {
      name: 'DateTimePicker.Content',
      description: 'The popover with staged calendar and time controls.',
      props: [],
    },
    {
      name: 'DateTimePicker.Calendar',
      description: 'Styled calendar bound to DateTimePicker state.',
      props: [],
    },
    {
      name: 'DateTimePicker.DatePanel',
      description: 'Renders children only while the active view is date-based.',
      props: [],
    },
    {
      name: 'DateTimePicker.TimePanel',
      description:
        'Renders children after date selection and exposes analog time panel render props.',
      props: [
        {
          name: 'children',
          type: 'ReactNode | (props) => ReactNode',
          description: 'Custom time picker panel renderer.',
        },
      ],
    },
    {
      name: 'DateTimePicker.DateButton',
      description: 'Returns from the time panel to the date calendar.',
      props: [],
    },
    {
      name: 'DateTimePicker.Segment',
      description: 'Time segment bound to DateTimePicker state.',
      props: [
        {
          name: 'segment',
          type: "'hour' | 'minute' | 'second' | 'period'",
          description: 'Time unit to edit.',
        },
      ],
    },
  ],
  'data-table': [
    {
      name: 'DataTable',
      description:
        'A typed, batteries-included data grid with MUI-like feature coverage on top of TanStack Table.',
      props: [
        {
          name: 'columns',
          type: 'DataTableColumn<TData>[]',
          description: 'Column definitions for the dataset.',
        },
        { name: 'data', type: 'TData[]', description: 'Rows to render.' },
        {
          name: 'virtual',
          type: 'boolean | { estimatedRowHeight?: number; overscan?: number }',
          description: 'Render rows with virtualization.',
        },
        {
          name: 'virtualColumns',
          type: 'boolean | { estimatedColumnWidth?: number; overscan?: number }',
          description: 'Render visible leaf columns with horizontal virtualization for wide grids.',
        },
        {
          name: 'enableSorting',
          type: 'boolean',
          default: 'true',
          description: 'Enable sortable column headers.',
        },
        {
          name: 'enableFiltering',
          type: 'boolean',
          default: 'false',
          description: 'Enable column filtering state.',
        },
        {
          name: 'enableAdvancedFiltering',
          type: 'boolean',
          default: 'false',
          description: 'Render the nested AND/OR filter builder.',
        },
        {
          name: 'enableGlobalSearch',
          type: 'boolean',
          default: 'false',
          description: 'Render a global quick-search input.',
        },
        {
          name: 'enableRowSelection',
          type: "boolean | 'single'",
          default: 'false',
          description: 'Enable row selection checkboxes.',
        },
        {
          name: 'enableColumnSelection',
          type: 'boolean',
          default: 'false',
          description: 'Track selected columns from the column menu/configuration panel.',
        },
        {
          name: 'enablePagination',
          type: 'boolean',
          default: 'false',
          description: 'Render pagination controls.',
        },
        {
          name: 'enableExpanding',
          type: 'boolean',
          default: 'false',
          description: 'Enable expandable rows or tree rows when sub-rows are provided.',
        },
        {
          name: 'enableGrouping',
          type: 'boolean',
          default: 'false',
          description: 'Enable row grouping from column menus.',
        },
        {
          name: 'enableColumnResizing',
          type: 'boolean',
          default: 'false',
          description: 'Allow resizing columns.',
        },
        {
          name: 'enableColumnReordering',
          type: 'boolean',
          default: 'false',
          description: 'Allow reordering columns.',
        },
        {
          name: 'enableRowReordering',
          type: 'boolean',
          default: 'false',
          description: 'Allow drag-and-drop row reordering.',
        },
        {
          name: 'enableColumnPinning',
          type: 'boolean',
          default: 'false',
          description: 'Allow pinning columns.',
        },
        {
          name: 'enableRowPinning',
          type: 'boolean',
          default: 'false',
          description: 'Allow rows to be pinned to top or bottom.',
        },
        {
          name: 'enableColumnConfiguration',
          type: 'boolean',
          default: 'false',
          description: 'Render the column visibility/configuration panel.',
        },
        { name: 'pageSize', type: 'number', default: '10', description: 'Initial rows per page.' },
        { name: 'loading', type: 'boolean', description: 'Show the loading state.' },
        {
          name: 'loadingMore',
          type: 'boolean',
          description: 'Show a lazy-loading row at the bottom.',
        },
        {
          name: 'loadingVariant',
          type: "'text' | 'skeleton' | 'spinner'",
          default: "'text'",
          description: 'Choose text, skeleton, or spinner loading UI.',
        },
        {
          name: 'skeletonRows',
          type: 'number',
          default: '5',
          description: 'Rows to render for the skeleton loading state.',
        },
        { name: 'error', type: 'ReactNode', description: 'Render an error state.' },
        { name: 'emptyState', type: 'ReactNode', description: 'Render custom empty content.' },
        { name: 'globalFilter', type: 'string', description: 'Controlled global search value.' },
        {
          name: 'defaultGlobalFilter',
          type: 'string',
          description: 'Uncontrolled initial global search value.',
        },
        {
          name: 'onGlobalFilterChange',
          type: '(value: string) => void',
          description: 'Called when the global search changes.',
        },
        {
          name: 'advancedFilter',
          type: 'DataTableFilterGroup',
          description: 'Controlled nested filter model.',
        },
        {
          name: 'defaultAdvancedFilter',
          type: 'DataTableFilterGroup',
          description: 'Uncontrolled initial nested filter model.',
        },
        {
          name: 'onAdvancedFilterChange',
          type: '(filter?: DataTableFilterGroup) => void',
          description: 'Called when the filter builder changes.',
        },
        {
          name: 'rowActions',
          type: '(row: Row<TData>) => ReactNode',
          description: 'Adds an actions column at the end of the grid.',
        },
        {
          name: 'inlineCreateRow',
          type: 'DataTableInlineCreate',
          description: 'Renders inline add-row fields above the data rows.',
        },
        {
          name: 'aggregations',
          type: "Record<string, 'sum' | 'avg' | 'min' | 'max' | 'count' | fn>",
          description: 'Column aggregation functions for footer totals.',
        },
        {
          name: 'rowTotals',
          type: 'boolean | DataTableRowTotals<TData>',
          description: 'Adds a row total column calculated from selected columns.',
        },
        {
          name: 'rowPinning',
          type: 'DataTableRowPinningState',
          description: 'Controlled top/bottom row pinning state.',
        },
        {
          name: 'renderDetailPanel',
          type: '(row: Row<TData>) => ReactNode',
          description: 'Renders a master/detail panel below expanded rows.',
        },
        {
          name: 'getCellColSpan',
          type: '(cell, row) => number | undefined',
          description: 'Returns a cell column span.',
        },
        {
          name: 'getCellRowSpan',
          type: '(cell, row) => number | undefined',
          description: 'Returns a cell row span.',
        },
        {
          name: 'getRowClassName',
          type: '(row) => string | undefined',
          description: 'Adds row-level classes for row configuration.',
        },
        {
          name: 'getRowStyle',
          type: '(row) => CSSProperties | undefined',
          description: 'Adds row-level inline styles.',
        },
        {
          name: 'getRowHeight',
          type: '(row) => number | undefined',
          description: 'Custom row height, used by row virtualization.',
        },
        { name: 'height', type: 'number | string', description: 'Fixed grid body height.' },
        { name: 'maxHeight', type: 'number | string', description: 'Maximum grid body height.' },
        { name: 'fullHeight', type: 'boolean', description: 'Fill the parent height.' },
        {
          name: 'autoHeight',
          type: 'boolean',
          description: 'Let content determine the body height.',
        },
        {
          name: 'onLoadMore',
          type: '() => void',
          description: 'Called near the bottom for lazy loading.',
        },
        {
          name: 'hasMore',
          type: 'boolean',
          description: 'Whether lazy loading can request more rows.',
        },
        {
          name: 'onRowOrderChange',
          type: '(rows, rowIds) => void',
          description: 'Called after drag-and-drop row reorder.',
        },
        {
          name: 'onColumnOrderChange',
          type: '(columnIds) => void',
          description: 'Called after drag-and-drop column reorder.',
        },
        {
          name: 'localeText',
          type: 'Partial<DataTableLocaleText>',
          description: 'Localizes built-in labels, buttons, and state text.',
        },
        {
          name: 'serverSide',
          type: '{ state; onStateChange; rowCount }',
          description: 'External state adapter for remote data.',
        },
        {
          name: 'tableRef',
          type: 'MutableRefObject<Table<TData> | null>',
          description: 'Imperative access to the TanStack Table instance.',
        },
        className,
      ],
    },
    {
      name: 'DataTableToolbar',
      description: 'Optional toolbar for search and actions.',
      props: [{ name: 'table', type: 'Table<TData>', description: 'TanStack Table instance.' }],
    },
    {
      name: 'DataTableAdvancedFilter',
      description: 'Nested AND/OR filter builder.',
      props: [{ name: 'table', type: 'Table<TData>', description: 'TanStack Table instance.' }],
    },
    {
      name: 'DataTableColumnConfiguration',
      description: 'Column visibility, pinning, grouping, and selection menu.',
      props: [{ name: 'table', type: 'Table<TData>', description: 'TanStack Table instance.' }],
    },
    {
      name: 'DataTableColumnVisibility',
      description: 'Column visibility menu alias.',
      props: [{ name: 'table', type: 'Table<TData>', description: 'TanStack Table instance.' }],
    },
  ],
};

void div;

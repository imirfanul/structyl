'use client';

import * as React from 'react';
import {
  Button, Switch, Checkbox, Label, Dialog, Popover, Tooltip, Select,
  DropdownMenu, Accordion, Tabs, Slider, Avatar, Badge, Card, Alert,
  Input, Progress, Toast, Skeleton, Spinner, Separator,
  AspectRatio, Textarea, RadioGroup, Toggle, ToggleGroup, Form,
  Collapsible, Breadcrumb, Pagination, Stepper, AlertDialog, Sheet,
  Drawer, HoverCard, ContextMenu, Menubar, NavigationMenu, Combobox,
  Command, OneTimePasswordField, PasswordToggleField, NumberField,
  Calendar, DatePicker, TimePicker, DateRangePicker, ColorPicker,
  FileUpload, CircularProgress, Meter, ScrollArea, Toolbar, Resizable,
  Carousel, Tree, Editable, TagsInput, Mentions, CopyButton,
} from '@aura-ui/styled';
import { DataTable, type DataTableColumn } from '@aura-ui/data-table';

/* ── Types ──────────────────────────────────────────────────────────── */

export interface ApiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ApiPart {
  name: string;
  description: string;
  props: ApiProp[];
}

export interface KeyboardRow {
  key: string;
  description: string;
}

export interface ComponentEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  preview: () => React.ReactNode;
  code: string;
  anatomy?: string;
  api?: ApiPart[];
  keyboard?: KeyboardRow[];
  ariaPattern?: string;
}

type DocsUser = { id: number; name: string; email: string; role: string };

const docsTableData: DocsUser[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' },
  { id: 4, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Viewer' },
];

const docsTableColumns: DataTableColumn<DocsUser>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

/* ── Component registry ─────────────────────────────────────────────── */

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Atoms',
    description: 'A clickable control with six variants and four sizes, complete with spring-press feedback.',
    features: [
      'Six visual variants and four sizes.',
      'Spring-eased press animation on tap.',
      'Supports `asChild` to render any element.',
      'Full keyboard and screen-reader support.',
    ],
    preview: () => (
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `import { Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
    api: [
      {
        name: 'Button',
        description: 'The button element.',
        props: [
          { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'", default: "'default'", description: 'Visual style.' },
          { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: 'Control size.' },
          { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props onto the child element instead of rendering a button.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
        ],
      },
    ],
    keyboard: [
      { key: 'Space', description: 'Activates the button.' },
      { key: 'Enter', description: 'Activates the button.' },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlays',
    description: 'A window overlaid on the primary content, rendering the content underneath inert.',
    features: [
      'Focus is automatically trapped while open.',
      'Body scroll is locked.',
      'Can be controlled or uncontrolled.',
      'Esc closes the component automatically.',
      'Manages screen-reader announcements with Title and Description.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    preview: () => (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>Make changes to your profile here.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
              <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    ),
    code: `import { Dialog, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
    anatomy: `<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
    api: [
      {
        name: 'Dialog.Root',
        description: 'Contains all the parts of a dialog.',
        props: [
          { name: 'open', type: 'boolean', description: 'Controlled open state.' },
          { name: 'defaultOpen', type: 'boolean', description: 'Initial open state when uncontrolled.' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
          { name: 'modal', type: 'boolean', default: 'true', description: 'Whether interaction outside is disabled.' },
        ],
      },
      {
        name: 'Dialog.Content',
        description: 'Contains content to be rendered in the open dialog.',
        props: [
          { name: 'onEscapeKeyDown', type: '(event: KeyboardEvent) => void', description: 'Called when Escape is pressed.' },
          { name: 'onPointerDownOutside', type: '(event) => void', description: 'Called on outside pointer-down.' },
          { name: 'forceMount', type: 'boolean', description: 'Force mounting for animation control.' },
        ],
      },
    ],
    keyboard: [
      { key: 'Space', description: 'Opens/closes the dialog from the trigger.' },
      { key: 'Enter', description: 'Opens/closes the dialog from the trigger.' },
      { key: 'Tab', description: 'Moves focus to the next focusable element; trapped within content.' },
      { key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
      { key: 'Esc', description: 'Closes the dialog and moves focus to the trigger.' },
    ],
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Compound',
    description: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
    features: [
      'Can be controlled or uncontrolled.',
      'Supports submenus with configurable reading direction.',
      'Supports items, labels, groups of items.',
      'Supports checkable items (single or multiple).',
      'Customize side, alignment, offsets, collision handling.',
      'Focus is fully managed; full keyboard navigation; typeahead support.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
    preview: () => (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-48">
          <DropdownMenu.Label>My account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
    code: `import { DropdownMenu, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-48">
        <DropdownMenu.Label>My account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Billing</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}`,
    keyboard: [
      { key: 'Space / Enter', description: 'Opens the menu and focuses the first item.' },
      { key: 'ArrowDown / ArrowUp', description: 'Moves focus between items.' },
      { key: 'ArrowRight / ArrowLeft', description: 'Opens / closes a submenu.' },
      { key: 'Esc', description: 'Closes the menu and returns focus to the trigger.' },
    ],
  },
  {
    slug: 'popover',
    name: 'Popover',
    category: 'Overlays',
    description: 'Displays rich content in a portal, triggered by a button.',
    features: [
      'Can be controlled or uncontrolled.',
      'Customize side, alignment, offsets, collision handling.',
      'Optional rendering of a positioned arrow.',
      'Focus is fully managed and customizable.',
      'Dismissing and layering behaviour is highly customizable.',
    ],
    preview: () => (
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="grid gap-2">
            <h4 className="font-medium text-sm">Dimensions</h4>
            <p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
        </Popover.Content>
      </Popover.Root>
    ),
    code: `import { Popover, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <h4 className="font-medium text-sm">Dimensions</h4>
        <p className="text-xs text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </Popover.Content>
    </Popover.Root>
  );
}`,
    keyboard: [
      { key: 'Space / Enter', description: 'Opens / closes the popover.' },
      { key: 'Tab', description: 'Moves focus to the next focusable element.' },
      { key: 'Esc', description: 'Closes the popover and returns focus to the trigger.' },
    ],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    description: 'A popup that displays information related to an element when it receives keyboard focus or hover.',
    features: [
      'Opens on hover and on focus.',
      'Closes on Esc.',
      'Provider coordinates delay across multiple tooltips.',
      'Customize side, alignment, offsets, collision handling.',
    ],
    preview: () => (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Add to library</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    ),
    code: `import { Tooltip, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Add to library</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}`,
    keyboard: [{ key: 'Esc', description: 'Closes the tooltip.' }],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Compound',
    description: 'Displays a list of options for the user to pick from, triggered by a button.',
    features: [
      'Can be controlled or uncontrolled.',
      'Full keyboard support with typeahead.',
      'Supports items, labels, groups of items.',
      'Positioning and collision handling.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    preview: () => (
      <Select.Root>
        <Select.Trigger className="w-[200px]">
          <Select.Value placeholder="Select a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="cherry">Cherry</Select.Item>
        </Select.Content>
      </Select.Root>
    ),
    code: `import { Select } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Select.Root>
      <Select.Trigger className="w-[200px]">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}`,
    keyboard: [
      { key: 'Space / Enter', description: 'Opens the select / selects the focused item.' },
      { key: 'ArrowDown / ArrowUp', description: 'Moves focus between options.' },
      { key: 'Esc', description: 'Closes the select.' },
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Form',
    description: 'A control that allows the user to toggle between checked and not checked.',
    features: [
      'Full keyboard navigation.',
      'Can be controlled or uncontrolled.',
      'iOS-style spring thumb animation.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
    preview: () => (
      <div className="flex items-center gap-2">
        <Switch id="s1" defaultChecked />
        <Label htmlFor="s1">Airplane mode</Label>
      </div>
    ),
    code: `import { Switch, Label } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="s1" defaultChecked />
      <Label htmlFor="s1">Airplane mode</Label>
    </div>
  );
}`,
    keyboard: [{ key: 'Space / Enter', description: 'Toggles the switch.' }],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Form',
    description: 'A control that allows the user to toggle between checked, not checked, and indeterminate.',
    features: ['Supports indeterminate state.', 'Full keyboard navigation.', 'Can be controlled or uncontrolled.'],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
    preview: () => (
      <div className="flex items-center gap-2">
        <Checkbox id="c1" defaultChecked />
        <Label htmlFor="c1">Accept terms and conditions</Label>
      </div>
    ),
    code: `import { Checkbox, Label } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="c1" defaultChecked />
      <Label htmlFor="c1">Accept terms and conditions</Label>
    </div>
  );
}`,
    keyboard: [{ key: 'Space', description: 'Toggles the checkbox.' }],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Disclosure',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    features: [
      'Full keyboard navigation.',
      'Supports single or multiple expanded panels.',
      'Can be controlled or uncontrolled.',
      'Spring-eased height animation.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    preview: () => (
      <Accordion.Root type="single" collapsible className="w-full max-w-sm">
        <Accordion.Item value="a">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>Yes. It follows the WAI-ARIA Accordion pattern.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>Yes, with spring-eased height transitions.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    ),
    code: `import { Accordion } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="a">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It follows the WAI-ARIA Accordion pattern.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}`,
    keyboard: [
      { key: 'Space / Enter', description: 'Expands / collapses the focused panel.' },
      { key: 'ArrowDown / ArrowUp', description: 'Moves focus between headers.' },
      { key: 'Home / End', description: 'Moves focus to the first / last header.' },
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Disclosure',
    description: 'A set of layered sections of content — known as tab panels — displayed one at a time.',
    features: [
      'Can be controlled or uncontrolled.',
      'Supports horizontal/vertical orientation.',
      'Supports automatic and manual activation.',
      'Full keyboard navigation.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
    preview: () => (
      <Tabs.Root defaultValue="account" className="w-full max-w-sm">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account" className="text-sm text-muted-foreground">
          Make changes to your account here.
        </Tabs.Content>
        <Tabs.Content value="password" className="text-sm text-muted-foreground">
          Change your password here.
        </Tabs.Content>
      </Tabs.Root>
    ),
    code: `import { Tabs } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Account settings.</Tabs.Content>
      <Tabs.Content value="password">Password settings.</Tabs.Content>
    </Tabs.Root>
  );
}`,
    keyboard: [
      { key: 'Tab', description: 'Moves focus to the active trigger, then the panel.' },
      { key: 'ArrowLeft / ArrowRight', description: 'Moves to the previous / next tab.' },
      { key: 'Home / End', description: 'Moves to the first / last tab.' },
    ],
  },
  {
    slug: 'slider',
    name: 'Slider',
    category: 'Form',
    description: 'An input where the user selects a value from within a given range.',
    features: [
      'Can be controlled or uncontrolled.',
      'Supports multiple thumbs.',
      'Supports keyboard and touch.',
      'Supports a stepped interval and min/max.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
    preview: () => <Slider defaultValue={[50]} max={100} className="w-full max-w-sm" />,
    code: `import { Slider } from '@aura-ui/styled';

export default function Demo() {
  return <Slider defaultValue={[50]} max={100} />;
}`,
    keyboard: [
      { key: 'ArrowRight / ArrowUp', description: 'Increases the value by the step amount.' },
      { key: 'ArrowLeft / ArrowDown', description: 'Decreases the value by the step amount.' },
      { key: 'Home / End', description: 'Sets the value to its minimum / maximum.' },
      { key: 'PageUp / PageDown', description: 'Increases / decreases by a larger step.' },
    ],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Atoms',
    description: 'An image element with a fallback for representing the user.',
    features: ['Automatic and manual control over when the image renders.', 'Fallback accepts an arbitrary node.', 'Delays fallback to avoid flicker.'],
    preview: () => (
      <div className="flex gap-3">
        <Avatar.Root>
          <Avatar.Image src="https://i.pravatar.cc/64?img=3" alt="" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar.Root>
      </div>
    ),
    code: `import { Avatar } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Avatar.Root>
      <Avatar.Image src="/me.jpg" alt="" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  );
}`,
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Atoms',
    description: 'A small visual indicator for statuses, counts and labels.',
    features: ['Six variants.', 'Supports `asChild`.'],
    preview: () => (
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
    code: `import { Badge } from '@aura-ui/styled';

export default function Demo() {
  return <Badge variant="success">Success</Badge>;
}`,
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Atoms',
    description: 'A container that groups related content and actions.',
    features: ['Compound parts: Root, Header, Title, Description, Content, Footer.'],
    preview: () => (
      <Card.Root className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Deploy your new project in one click.</Card.Description>
        </Card.Header>
        <Card.Content className="text-sm text-muted-foreground">Project details go here.</Card.Content>
        <Card.Footer>
          <Button size="sm" variant="outline" className="ml-auto">Cancel</Button>
          <Button size="sm">Deploy</Button>
        </Card.Footer>
      </Card.Root>
    ),
    code: `import { Card, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create project</Card.Title>
        <Card.Description>Deploy in one click.</Card.Description>
      </Card.Header>
      <Card.Content>Project details.</Card.Content>
      <Card.Footer><Button>Deploy</Button></Card.Footer>
    </Card.Root>
  );
}`,
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Atoms',
    description: 'Displays a callout for user attention.',
    features: ['Five variants: default, destructive, success, warning, info.'],
    preview: () => (
      <div className="w-full max-w-md space-y-2">
        <Alert.Root><Alert.Title>Heads up!</Alert.Title><Alert.Description>You can edit this later.</Alert.Description></Alert.Root>
        <Alert.Root variant="destructive"><Alert.Title>Error</Alert.Title><Alert.Description>Something went wrong.</Alert.Description></Alert.Root>
      </div>
    ),
    code: `import { Alert } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Alert.Root variant="destructive">
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>Something went wrong.</Alert.Description>
    </Alert.Root>
  );
}`,
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Form',
    description: 'A styled text input with focus ring and invalid state.',
    features: ['Hover and focus transitions.', 'aria-invalid styling.', 'Wraps the native input.'],
    preview: () => <Input placeholder="you@example.com" className="w-full max-w-sm" />,
    code: `import { Input } from '@aura-ui/styled';

export default function Demo() {
  return <Input placeholder="you@example.com" />;
}`,
  },
  {
    slug: 'progress',
    name: 'Progress',
    category: 'Atoms',
    description: 'Displays an indicator showing the completion progress of a task.',
    features: ['Smooth animated fill.', 'Supports indeterminate state.'],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/meter/',
    preview: () => <Progress value={66} className="w-full max-w-sm" />,
    code: `import { Progress } from '@aura-ui/styled';

export default function Demo() {
  return <Progress value={66} />;
}`,
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Overlays',
    description: 'A succinct message that is displayed temporarily.',
    features: [
      'Automatically closes.',
      'Pauses closing on hover, focus and window blur.',
      'Supports swipe to dismiss.',
      'Exposes a hotkey to jump to the toast viewport.',
    ],
    preview: () => <ToastDemo />,
    code: `import { Toast, Button } from '@aura-ui/styled';

export default function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Toast.Provider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast.Root open={open} onOpenChange={setOpen}>
        <Toast.Title>Scheduled</Toast.Title>
        <Toast.Description>Friday at 5:00 PM</Toast.Description>
        <Toast.Close />
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}`,
    keyboard: [
      { key: 'F8', description: 'Jumps focus into the toast viewport.' },
      { key: 'Tab', description: 'Moves focus through the toast.' },
      { key: 'Esc', description: 'Closes the focused toast.' },
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Atoms',
    description: 'A placeholder preview of content before the data loads.',
    features: ['Pulse animation.', 'Compose any shape with utility classes.'],
    preview: () => (
      <div className="w-full max-w-sm space-y-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </div>
    ),
    code: `import { Skeleton } from '@aura-ui/styled';

export default function Demo() {
  return <Skeleton className="h-10 w-40" />;
}`,
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Atoms',
    description: 'A status indicator for pending work.',
    features: ['Announces loading state with role="status".', 'Four token-driven sizes.', 'Accepts a custom screen-reader label.'],
    preview: () => (
      <div className="flex items-center gap-4">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
        <Spinner size="xl" label="Loading large preview" />
      </div>
    ),
    code: `import { Spinner } from '@aura-ui/styled';

export default function Demo() {
  return <Spinner label="Loading results" />;
}`,
  },
  {
    slug: 'separator',
    name: 'Separator',
    category: 'Atoms',
    description: 'Visually or semantically separates content.',
    features: ['Horizontal and vertical orientation.', 'Decorative or semantic.'],
    preview: () => (
      <div className="text-sm">
        <p>aura-ui</p>
        <Separator className="my-2" />
        <div className="flex h-5 items-center gap-3">
          <span>Docs</span>
          <Separator className="h-4 w-px" />
          <span>Source</span>
        </div>
      </div>
    ),
    code: `import { Separator } from '@aura-ui/styled';

export default function Demo() {
  return <Separator />;
}`,
  },

  /* ── Additional components ─────────────────────────────────────── */
  {
    slug: 'label', name: 'Label', category: 'Form',
    description: 'An accessible label associated with a form control.',
    features: ['Associates with a control via htmlFor.', 'Supports asChild.'],
    preview: () => <Label htmlFor="x">Email address</Label>,
    code: `import { Label } from '@aura-ui/styled';\n\n<Label htmlFor="email">Email address</Label>`,
  },
  {
    slug: 'textarea', name: 'Textarea', category: 'Form',
    description: 'A styled multi-line text input.',
    features: ['Smooth focus ring.', 'Wraps the native textarea.'],
    preview: () => <Textarea placeholder="Type your message…" className="w-full max-w-sm" />,
    code: `import { Textarea } from '@aura-ui/styled';\n\n<Textarea placeholder="Type your message…" />`,
  },
  {
    slug: 'toggle', name: 'Toggle', category: 'Form',
    description: 'A two-state button that can be on or off.',
    features: ['Controlled or uncontrolled.', 'Two variants, three sizes.'],
    preview: () => <Toggle defaultPressed>Bold</Toggle>,
    code: `import { Toggle } from '@aura-ui/styled';\n\n<Toggle defaultPressed>Bold</Toggle>`,
  },
  {
    slug: 'toggle-group', name: 'Toggle Group', category: 'Form',
    description: 'A set of two-state buttons that can be single or multiple select.',
    features: ['Single or multiple selection.', 'Roving focus navigation.'],
    preview: () => (
      <ToggleGroup.Root type="multiple" defaultValue={['bold']}>
        <ToggleGroup.Item value="bold"><strong>B</strong></ToggleGroup.Item>
        <ToggleGroup.Item value="italic"><em>I</em></ToggleGroup.Item>
        <ToggleGroup.Item value="underline"><span className="underline">U</span></ToggleGroup.Item>
      </ToggleGroup.Root>
    ),
    code: `import { ToggleGroup } from '@aura-ui/styled';\n\n<ToggleGroup.Root type="multiple">\n  <ToggleGroup.Item value="bold">B</ToggleGroup.Item>\n  <ToggleGroup.Item value="italic">I</ToggleGroup.Item>\n</ToggleGroup.Root>`,
  },
  {
    slug: 'radio-group', name: 'Radio Group', category: 'Form',
    description: 'A set of checkable buttons where only one can be checked at a time.',
    features: ['Roving focus.', 'Controlled or uncontrolled.'],
    preview: () => (
      <RadioGroup.Root defaultValue="a" className="grid gap-2">
        <label className="flex items-center gap-2 text-sm"><RadioGroup.Item value="a" id="ra" /> Option A</label>
        <label className="flex items-center gap-2 text-sm"><RadioGroup.Item value="b" id="rb" /> Option B</label>
      </RadioGroup.Root>
    ),
    code: `import { RadioGroup } from '@aura-ui/styled';\n\n<RadioGroup.Root defaultValue="a">\n  <RadioGroup.Item value="a" />\n  <RadioGroup.Item value="b" />\n</RadioGroup.Root>`,
  },
  {
    slug: 'form', name: 'Form', category: 'Form',
    description: 'A form with declarative validation built on native ValidityState.',
    features: ['Built-in and custom matchers.', 'Accessible error messages.'],
    preview: () => (
      <Form.Root className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <Form.Field name="email" className="grid gap-1.5">
          <Form.Label asChild><Label>Email</Label></Form.Label>
          <Form.Control asChild><Input type="email" required placeholder="you@example.com" /></Form.Control>
          <Form.Message match="valueMissing" className="text-xs text-destructive">Required</Form.Message>
        </Form.Field>
        <Form.Submit asChild><Button className="mt-3">Submit</Button></Form.Submit>
      </Form.Root>
    ),
    code: `import { Form, Input, Button } from '@aura-ui/styled';\n\n<Form.Root>\n  <Form.Field name="email">\n    <Form.Label>Email</Form.Label>\n    <Form.Control asChild><Input type="email" required /></Form.Control>\n    <Form.Message match="valueMissing">Required</Form.Message>\n  </Form.Field>\n  <Form.Submit asChild><Button>Submit</Button></Form.Submit>\n</Form.Root>`,
  },
  {
    slug: 'aspect-ratio', name: 'Aspect Ratio', category: 'Atoms',
    description: 'Constrains content to a desired width / height ratio.',
    features: ['Any ratio.', 'Works with images or any node.'],
    preview: () => (
      <div className="w-64"><AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
        <div className="flex h-full w-full items-center justify-center bg-accent text-sm">16:9</div>
      </AspectRatio></div>
    ),
    code: `import { AspectRatio } from '@aura-ui/styled';\n\n<AspectRatio ratio={16 / 9}>\n  <img src="/photo.jpg" alt="" />\n</AspectRatio>`,
  },
  {
    slug: 'circular-progress', name: 'Circular Progress', category: 'Atoms',
    description: 'A circular progress indicator with determinate and indeterminate modes.',
    features: ['Determinate + indeterminate.', 'Configurable size and stroke.'],
    preview: () => (
      <div className="flex gap-4"><CircularProgress value={null} /><CircularProgress value={66} /></div>
    ),
    code: `import { CircularProgress } from '@aura-ui/styled';\n\n<CircularProgress value={66} />`,
  },
  {
    slug: 'meter', name: 'Meter', category: 'Atoms',
    description: 'A quantitative measurement within a known range.',
    features: ['low / high / optimum thresholds.', 'role="meter".'],
    preview: () => <Meter value={70} max={100} low={30} high={80} optimum={60} className="w-full max-w-sm" />,
    code: `import { Meter } from '@aura-ui/styled';\n\n<Meter value={70} low={30} high={80} optimum={60} />`,
  },
  {
    slug: 'copy-button', name: 'Copy Button', category: 'Atoms',
    description: 'Copies text to the clipboard with success feedback.',
    features: ['Animated check feedback.', 'Configurable reset delay.'],
    preview: () => (
      <div className="flex items-center gap-2">
        <code className="rounded bg-muted px-2 py-1 text-sm">npx aura-ui init</code>
        <CopyButton value="npx aura-ui init" />
      </div>
    ),
    code: `import { CopyButton } from '@aura-ui/styled';\n\n<CopyButton value="npx aura-ui init" />`,
  },
  {
    slug: 'collapsible', name: 'Collapsible', category: 'Disclosure',
    description: 'An interactive component that expands / collapses a panel.',
    features: ['Smooth height animation.', 'Controlled or uncontrolled.'],
    preview: () => (
      <Collapsible.Root className="w-full max-w-sm">
        <Collapsible.Trigger asChild><Button variant="outline">Toggle details</Button></Collapsible.Trigger>
        <Collapsible.Content className="mt-2 rounded-md border border-border p-3 text-sm">Hidden content.</Collapsible.Content>
      </Collapsible.Root>
    ),
    code: `import { Collapsible, Button } from '@aura-ui/styled';\n\n<Collapsible.Root>\n  <Collapsible.Trigger asChild><Button>Toggle</Button></Collapsible.Trigger>\n  <Collapsible.Content>Hidden content.</Collapsible.Content>\n</Collapsible.Root>`,
  },
  {
    slug: 'breadcrumb', name: 'Breadcrumb', category: 'Disclosure',
    description: 'Displays the path to the current resource.',
    features: ['Navigable links + current page.', 'Custom separators.'],
    preview: () => (
      <Breadcrumb.Root><Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="#">Home</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Page>Docs</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List></Breadcrumb.Root>
    ),
    code: `import { Breadcrumb } from '@aura-ui/styled';\n\n<Breadcrumb.Root><Breadcrumb.List>\n  <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>\n  <Breadcrumb.Separator />\n  <Breadcrumb.Item><Breadcrumb.Page>Docs</Breadcrumb.Page></Breadcrumb.Item>\n</Breadcrumb.List></Breadcrumb.Root>`,
  },
  {
    slug: 'pagination', name: 'Pagination', category: 'Disclosure',
    description: 'Navigation for splitting content across multiple pages.',
    features: ['Previous / next / ellipsis.', 'Active page styling.'],
    preview: () => (
      <Pagination.Root><Pagination.Content>
        <Pagination.Item><Pagination.Previous href="#" /></Pagination.Item>
        <Pagination.Item><Pagination.Link href="#" isActive>1</Pagination.Link></Pagination.Item>
        <Pagination.Item><Pagination.Link href="#">2</Pagination.Link></Pagination.Item>
        <Pagination.Item><Pagination.Next href="#" /></Pagination.Item>
      </Pagination.Content></Pagination.Root>
    ),
    code: `import { Pagination } from '@aura-ui/styled';\n\n<Pagination.Root><Pagination.Content>\n  <Pagination.Item><Pagination.Previous href="#" /></Pagination.Item>\n  <Pagination.Item><Pagination.Link href="#" isActive>1</Pagination.Link></Pagination.Item>\n  <Pagination.Item><Pagination.Next href="#" /></Pagination.Item>\n</Pagination.Content></Pagination.Root>`,
  },
  {
    slug: 'stepper', name: 'Stepper', category: 'Disclosure',
    description: 'A multi-step process indicator.',
    features: ['Complete / current / upcoming states.', 'Horizontal or vertical.'],
    preview: () => (
      <Stepper.Root activeStep={1} className="w-full max-w-sm">
        <Stepper.Step index={0} /><Stepper.Separator />
        <Stepper.Step index={1} /><Stepper.Separator />
        <Stepper.Step index={2} />
      </Stepper.Root>
    ),
    code: `import { Stepper } from '@aura-ui/styled';\n\n<Stepper.Root activeStep={1}>\n  <Stepper.Step index={0} /><Stepper.Separator />\n  <Stepper.Step index={1} /><Stepper.Separator />\n  <Stepper.Step index={2} />\n</Stepper.Root>`,
  },
  {
    slug: 'alert-dialog', name: 'Alert Dialog', category: 'Overlays',
    description: 'A modal dialog that interrupts the user and expects a response.',
    features: ['Focus starts on Cancel.', 'Outside interaction is blocked.'],
    preview: () => (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild><Button variant="destructive">Delete</Button></AlertDialog.Trigger>
        <AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content>
          <AlertDialog.Header><AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>This cannot be undone.</AlertDialog.Description></AlertDialog.Header>
          <AlertDialog.Footer><AlertDialog.Cancel>Cancel</AlertDialog.Cancel><AlertDialog.Action>Delete</AlertDialog.Action></AlertDialog.Footer>
        </AlertDialog.Content></AlertDialog.Portal>
      </AlertDialog.Root>
    ),
    code: `import { AlertDialog, Button } from '@aura-ui/styled';\n\n<AlertDialog.Root>\n  <AlertDialog.Trigger asChild><Button>Delete</Button></AlertDialog.Trigger>\n  <AlertDialog.Portal>\n    <AlertDialog.Overlay />\n    <AlertDialog.Content>\n      <AlertDialog.Title>Are you sure?</AlertDialog.Title>\n      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n      <AlertDialog.Action>Delete</AlertDialog.Action>\n    </AlertDialog.Content>\n  </AlertDialog.Portal>\n</AlertDialog.Root>`,
  },
  {
    slug: 'sheet', name: 'Sheet', category: 'Overlays',
    description: 'A panel that slides in from any edge of the screen.',
    features: ['Four sides.', 'Built on Dialog — focus trap + scroll lock.'],
    preview: () => (
      <Sheet.Root>
        <Sheet.Trigger asChild><Button variant="outline">Open sheet</Button></Sheet.Trigger>
        <Sheet.Content side="right">
          <Sheet.Header><Sheet.Title>Sheet</Sheet.Title><Sheet.Description>Slides from the right.</Sheet.Description></Sheet.Header>
        </Sheet.Content>
      </Sheet.Root>
    ),
    code: `import { Sheet, Button } from '@aura-ui/styled';\n\n<Sheet.Root>\n  <Sheet.Trigger asChild><Button>Open</Button></Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Title>Sheet</Sheet.Title>\n  </Sheet.Content>\n</Sheet.Root>`,
  },
  {
    slug: 'drawer', name: 'Drawer', category: 'Overlays',
    description: 'A bottom-anchored sheet, ideal for mobile.',
    features: ['Drag-handle affordance.', 'Slides up from the bottom.'],
    preview: () => (
      <Drawer.Root>
        <Drawer.Trigger asChild><Button variant="outline">Open drawer</Button></Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header><Drawer.Title>Drawer</Drawer.Title><Drawer.Description>A bottom sheet.</Drawer.Description></Drawer.Header>
        </Drawer.Content>
      </Drawer.Root>
    ),
    code: `import { Drawer, Button } from '@aura-ui/styled';\n\n<Drawer.Root>\n  <Drawer.Trigger asChild><Button>Open</Button></Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Title>Drawer</Drawer.Title>\n  </Drawer.Content>\n</Drawer.Root>`,
  },
  {
    slug: 'hover-card', name: 'Hover Card', category: 'Overlays',
    description: 'A rich popover shown when an element receives hover.',
    features: ['Open / close delays.', 'Pointer can enter the content.'],
    preview: () => (
      <HoverCard.Root>
        <HoverCard.Trigger asChild><a className="underline cursor-pointer">@aura-ui</a></HoverCard.Trigger>
        <HoverCard.Content>A React component library.</HoverCard.Content>
      </HoverCard.Root>
    ),
    code: `import { HoverCard } from '@aura-ui/styled';\n\n<HoverCard.Root>\n  <HoverCard.Trigger asChild><a>@aura-ui</a></HoverCard.Trigger>\n  <HoverCard.Content>A React component library.</HoverCard.Content>\n</HoverCard.Root>`,
  },
  {
    slug: 'context-menu', name: 'Context Menu', category: 'Compound',
    description: 'A menu triggered by right-click or long-press.',
    features: ['Submenus, checkable items.', 'Full keyboard navigation.'],
    preview: () => (
      <ContextMenu.Root>
        <ContextMenu.Trigger className="flex h-24 w-64 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground">
          Right-click here
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Paste</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    ),
    code: `import { ContextMenu } from '@aura-ui/styled';\n\n<ContextMenu.Root>\n  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>\n  <ContextMenu.Content>\n    <ContextMenu.Item>Copy</ContextMenu.Item>\n  </ContextMenu.Content>\n</ContextMenu.Root>`,
  },
  {
    slug: 'menubar', name: 'Menubar', category: 'Compound',
    description: 'A horizontal bar of dropdown menus, like a desktop app.',
    features: ['Multiple menus.', 'Roving focus across the bar.'],
    preview: () => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content><Menubar.Item>New</Menubar.Item><Menubar.Item>Open</Menubar.Item></Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content><Menubar.Item>Undo</Menubar.Item></Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
    ),
    code: `import { Menubar } from '@aura-ui/styled';\n\n<Menubar.Root>\n  <Menubar.Menu>\n    <Menubar.Trigger>File</Menubar.Trigger>\n    <Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content>\n  </Menubar.Menu>\n</Menubar.Root>`,
  },
  {
    slug: 'navigation-menu', name: 'Navigation Menu', category: 'Compound',
    description: 'A collection of links for navigating a website.',
    features: ['Submenus with delay.', 'Keyboard accessible.'],
    preview: () => (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="d"><NavigationMenu.Trigger>Docs</NavigationMenu.Trigger></NavigationMenu.Item>
          <NavigationMenu.Item value="l"><NavigationMenu.Trigger>Learn</NavigationMenu.Trigger></NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
    code: `import { NavigationMenu } from '@aura-ui/styled';\n\n<NavigationMenu.Root>\n  <NavigationMenu.List>\n    <NavigationMenu.Item value="docs">\n      <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>\n    </NavigationMenu.Item>\n  </NavigationMenu.List>\n</NavigationMenu.Root>`,
  },
  {
    slug: 'combobox', name: 'Combobox', category: 'Compound',
    description: 'An autocomplete input with a filtered list of options.',
    features: ['Search filtering.', 'Keyboard navigation.'],
    preview: () => (
      <Combobox.Root>
        <Combobox.Input placeholder="Search…" className="w-56" />
        <Combobox.Content>
          {['React', 'Vue', 'Svelte'].map((v) => <Combobox.Item key={v} value={v.toLowerCase()}>{v}</Combobox.Item>)}
        </Combobox.Content>
      </Combobox.Root>
    ),
    code: `import { Combobox } from '@aura-ui/styled';\n\n<Combobox.Root>\n  <Combobox.Input placeholder="Search…" />\n  <Combobox.Content>\n    <Combobox.Item value="react">React</Combobox.Item>\n  </Combobox.Content>\n</Combobox.Root>`,
  },
  {
    slug: 'command', name: 'Command', category: 'Compound',
    description: 'A command palette with fuzzy search, cmdk-style.',
    features: ['Fuzzy filtering.', 'Groups, items, shortcuts.'],
    preview: () => (
      <Command.Root className="w-80 rounded-lg border border-border">
        <Command.Input placeholder="Type a command…" />
        <Command.List>
          <Command.Empty>No results.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Search</Command.Item>
            <Command.Item>Settings</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    ),
    code: `import { Command } from '@aura-ui/styled';\n\n<Command.Root>\n  <Command.Input placeholder="Type a command…" />\n  <Command.List>\n    <Command.Group heading="Suggestions">\n      <Command.Item>Search</Command.Item>\n    </Command.Group>\n  </Command.List>\n</Command.Root>`,
  },
  {
    slug: 'one-time-password-field', name: 'One-Time Password Field', category: 'Form',
    description: 'A segmented input for OTP / PIN codes.',
    features: ['Paste support.', 'Numeric or alphanumeric.'],
    preview: () => (
      <OneTimePasswordField.Root length={4}>
        {[0, 1, 2, 3].map((i) => <OneTimePasswordField.Input key={i} index={i} />)}
      </OneTimePasswordField.Root>
    ),
    code: `import { OneTimePasswordField } from '@aura-ui/styled';\n\n<OneTimePasswordField.Root length={6}>\n  {[0,1,2,3,4,5].map((i) => (\n    <OneTimePasswordField.Input key={i} index={i} />\n  ))}\n</OneTimePasswordField.Root>`,
  },
  {
    slug: 'password-toggle-field', name: 'Password Toggle Field', category: 'Form',
    description: 'A password input with a show / hide toggle.',
    features: ['Accessible visibility toggle.', 'Controlled or uncontrolled.'],
    preview: () => (
      <PasswordToggleField.Root className="w-full max-w-sm">
        <PasswordToggleField.Input placeholder="Password" />
        <PasswordToggleField.Toggle />
      </PasswordToggleField.Root>
    ),
    code: `import { PasswordToggleField } from '@aura-ui/styled';\n\n<PasswordToggleField.Root>\n  <PasswordToggleField.Input placeholder="Password" />\n  <PasswordToggleField.Toggle />\n</PasswordToggleField.Root>`,
  },
  {
    slug: 'number-field', name: 'Number Field', category: 'Form',
    description: 'A numeric input with stepper buttons and Intl formatting.',
    features: ['Min / max / step.', 'Keyboard + wheel support.'],
    preview: () => (
      <NumberField.Root defaultValue={5} min={0} max={20}>
        <NumberField.DecrementTrigger /><NumberField.Input /><NumberField.IncrementTrigger />
      </NumberField.Root>
    ),
    code: `import { NumberField } from '@aura-ui/styled';\n\n<NumberField.Root defaultValue={5} min={0} max={20}>\n  <NumberField.DecrementTrigger />\n  <NumberField.Input />\n  <NumberField.IncrementTrigger />\n</NumberField.Root>`,
  },
  {
    slug: 'calendar', name: 'Calendar', category: 'Form',
    description: 'A standalone calendar for selecting dates.',
    features: ['Single / range / multiple.', 'Keyboard navigation.'],
    preview: () => <Calendar mode="single" />,
    code: `import { Calendar } from '@aura-ui/styled';\n\n<Calendar mode="single" />`,
  },
  {
    slug: 'date-picker', name: 'Date Picker', category: 'Form',
    description: 'A calendar inside a popover for picking a date.',
    features: ['Popover-anchored calendar.', 'Controlled or uncontrolled.'],
    preview: () => (
      <DatePicker.Root><DatePicker.Trigger /><DatePicker.Content /></DatePicker.Root>
    ),
    code: `import { DatePicker } from '@aura-ui/styled';\n\n<DatePicker.Root>\n  <DatePicker.Trigger />\n  <DatePicker.Content />\n</DatePicker.Root>`,
  },
  {
    slug: 'date-range-picker', name: 'Date Range Picker', category: 'Form',
    description: 'Pick a start and end date from a popover calendar.',
    features: ['Range selection.', 'Popover-anchored.'],
    preview: () => (
      <DateRangePicker.Root><DateRangePicker.Trigger /><DateRangePicker.Content /></DateRangePicker.Root>
    ),
    code: `import { DateRangePicker } from '@aura-ui/styled';\n\n<DateRangePicker.Root>\n  <DateRangePicker.Trigger />\n  <DateRangePicker.Content />\n</DateRangePicker.Root>`,
  },
  {
    slug: 'time-picker', name: 'Time Picker', category: 'Form',
    description: 'A segmented input for selecting a time.',
    features: ['Hour / minute / second segments.', 'Arrow-key adjustment.'],
    preview: () => (
      <TimePicker.Root defaultValue={{ hour: 9, minute: 30 }}>
        <TimePicker.Segment segment="hour" /><TimePicker.Separator /><TimePicker.Segment segment="minute" />
      </TimePicker.Root>
    ),
    code: `import { TimePicker } from '@aura-ui/styled';\n\n<TimePicker.Root defaultValue={{ hour: 9, minute: 30 }}>\n  <TimePicker.Segment segment="hour" />\n  <TimePicker.Separator />\n  <TimePicker.Segment segment="minute" />\n</TimePicker.Root>`,
  },
  {
    slug: 'color-picker', name: 'Color Picker', category: 'Form',
    description: 'An HSV color picker with hue and alpha sliders.',
    features: ['Saturation / value area.', 'Hue + alpha sliders.'],
    preview: () => (
      <ColorPicker.Root className="w-56 rounded-lg border border-border p-3">
        <ColorPicker.Area /><ColorPicker.HueSlider /><ColorPicker.AlphaSlider /><ColorPicker.Swatch />
      </ColorPicker.Root>
    ),
    code: `import { ColorPicker } from '@aura-ui/styled';\n\n<ColorPicker.Root>\n  <ColorPicker.Area />\n  <ColorPicker.HueSlider />\n  <ColorPicker.AlphaSlider />\n  <ColorPicker.Swatch />\n</ColorPicker.Root>`,
  },
  {
    slug: 'file-upload', name: 'File Upload', category: 'Form',
    description: 'A drag-and-drop file input with validation.',
    features: ['Drag-and-drop dropzone.', 'accept / size / count limits.'],
    preview: () => (
      <FileUpload.Root multiple className="w-full max-w-sm">
        <FileUpload.Dropzone /><FileUpload.Input />
      </FileUpload.Root>
    ),
    code: `import { FileUpload } from '@aura-ui/styled';\n\n<FileUpload.Root multiple maxFiles={3}>\n  <FileUpload.Dropzone />\n  <FileUpload.Input />\n</FileUpload.Root>`,
  },
  {
    slug: 'scroll-area', name: 'Scroll Area', category: 'Misc',
    description: 'A container with custom, themeable scrollbars.',
    features: ['hover / scroll / always modes.', 'Cross-browser consistency.'],
    preview: () => (
      <ScrollArea.Root className="h-32 w-56 rounded-md border border-border">
        <div className="p-3 space-y-1 text-sm">{Array.from({ length: 30 }, (_, i) => <div key={i}>Item {i + 1}</div>)}</div>
      </ScrollArea.Root>
    ),
    code: `import { ScrollArea } from '@aura-ui/styled';\n\n<ScrollArea.Root className="h-48">\n  {/* long content */}\n</ScrollArea.Root>`,
  },
  {
    slug: 'toolbar', name: 'Toolbar', category: 'Misc',
    description: 'A container for grouping a set of controls.',
    features: ['Roving focus.', 'Buttons, links, separators.'],
    preview: () => (
      <Toolbar.Root>
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Share</Toolbar.Button>
      </Toolbar.Root>
    ),
    code: `import { Toolbar } from '@aura-ui/styled';\n\n<Toolbar.Root>\n  <Toolbar.Button>Bold</Toolbar.Button>\n  <Toolbar.Separator />\n  <Toolbar.Button>Share</Toolbar.Button>\n</Toolbar.Root>`,
  },
  {
    slug: 'resizable', name: 'Resizable', category: 'Misc',
    description: 'Resizable panel groups with draggable handles.',
    features: ['Pointer + keyboard handles.', 'Horizontal or vertical.'],
    preview: () => (
      <Resizable.Group className="h-32 w-full max-w-sm rounded-md border border-border">
        <Resizable.Panel id="a" defaultSize={50} className="flex items-center justify-center text-sm">A</Resizable.Panel>
        <Resizable.Handle between={['a', 'b']} withHandle />
        <Resizable.Panel id="b" defaultSize={50} className="flex items-center justify-center text-sm">B</Resizable.Panel>
      </Resizable.Group>
    ),
    code: `import { Resizable } from '@aura-ui/styled';\n\n<Resizable.Group>\n  <Resizable.Panel id="a" defaultSize={50}>A</Resizable.Panel>\n  <Resizable.Handle between={['a','b']} withHandle />\n  <Resizable.Panel id="b" defaultSize={50}>B</Resizable.Panel>\n</Resizable.Group>`,
  },
  {
    slug: 'carousel', name: 'Carousel', category: 'Misc',
    description: 'A slideshow for cycling through images or content.',
    features: ['Horizontal / vertical.', 'Loop + autoplay.'],
    preview: () => (
      <Carousel.Root className="w-64">
        <Carousel.Content>
          {[1, 2, 3].map((i) => (
            <Carousel.Item key={i}>
              <div className="flex h-24 items-center justify-center rounded-lg bg-accent text-xl font-semibold">{i}</div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous /><Carousel.Next />
      </Carousel.Root>
    ),
    code: `import { Carousel } from '@aura-ui/styled';\n\n<Carousel.Root>\n  <Carousel.Content>\n    <Carousel.Item>Slide 1</Carousel.Item>\n  </Carousel.Content>\n  <Carousel.Previous />\n  <Carousel.Next />\n</Carousel.Root>`,
  },
  {
    slug: 'tree', name: 'Tree', category: 'Misc',
    description: 'A hierarchical list, like a file explorer.',
    features: ['Expand / collapse.', 'Keyboard navigation.'],
    preview: () => (
      <Tree.Root defaultExpanded={['root']} className="text-sm">
        <Tree.Item id="root" hasChildren>
          <Tree.Trigger hasChildren>src</Tree.Trigger>
          <Tree.Group>
            <Tree.Item id="a"><Tree.Trigger hasChildren={false}>index.ts</Tree.Trigger></Tree.Item>
            <Tree.Item id="b"><Tree.Trigger hasChildren={false}>app.tsx</Tree.Trigger></Tree.Item>
          </Tree.Group>
        </Tree.Item>
      </Tree.Root>
    ),
    code: `import { Tree } from '@aura-ui/styled';\n\n<Tree.Root defaultExpanded={['root']}>\n  <Tree.Item id="root" hasChildren>\n    <Tree.Trigger hasChildren>src</Tree.Trigger>\n    <Tree.Group>\n      <Tree.Item id="a"><Tree.Trigger>index.ts</Tree.Trigger></Tree.Item>\n    </Tree.Group>\n  </Tree.Item>\n</Tree.Root>`,
  },
  {
    slug: 'editable', name: 'Editable', category: 'Misc',
    description: 'Inline-editable text that swaps between preview and input.',
    features: ['Click to edit.', 'Enter / blur submit modes.'],
    preview: () => (
      <Editable.Root defaultValue="Click to edit"><Editable.Preview /><Editable.Input /></Editable.Root>
    ),
    code: `import { Editable } from '@aura-ui/styled';\n\n<Editable.Root defaultValue="Click to edit">\n  <Editable.Preview />\n  <Editable.Input />\n</Editable.Root>`,
  },
  {
    slug: 'tags-input', name: 'Tags Input', category: 'Misc',
    description: 'An input that collects a list of tags as chips.',
    features: ['Delimiter parsing.', 'Paste-split, max-tags.'],
    preview: () => (
      <TagsInput.Root defaultValue={['react', 'tailwind']} className="w-full max-w-sm">
        <TagsInput.Items>{(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}</TagsInput.Items>
        <TagsInput.Input placeholder="Add tag…" />
      </TagsInput.Root>
    ),
    code: `import { TagsInput } from '@aura-ui/styled';\n\n<TagsInput.Root defaultValue={['react']}>\n  <TagsInput.Items>\n    {(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}\n  </TagsInput.Items>\n  <TagsInput.Input placeholder="Add tag…" />\n</TagsInput.Root>`,
  },
  {
    slug: 'mentions', name: 'Mentions', category: 'Misc',
    description: 'A textarea with @-mention autocomplete.',
    features: ['Trigger character.', 'Suggestion filtering.'],
    preview: () => (
      <Mentions.Root className="w-full max-w-sm">
        <Mentions.Textarea placeholder="Try @ada…" rows={3} />
        <Mentions.Suggestions items={[{ id: '1', label: 'ada' }, { id: '2', label: 'grace' }]}>
          <div className="rounded-md border border-border bg-popover p-1 shadow-md">
            <Mentions.Items>
              {(item, i) => (
                <Mentions.Item key={item.id} suggestion={item} index={i}>
                  <div className="rounded px-2 py-1 text-sm hover:bg-accent">@{item.label}</div>
                </Mentions.Item>
              )}
            </Mentions.Items>
          </div>
        </Mentions.Suggestions>
      </Mentions.Root>
    ),
    code: `import { Mentions } from '@aura-ui/styled';\n\n<Mentions.Root>\n  <Mentions.Textarea placeholder="Try @ada…" />\n  <Mentions.Suggestions items={users}>\n    <Mentions.Items>\n      {(item, i) => <Mentions.Item key={item.id} suggestion={item} index={i}>@{item.label}</Mentions.Item>}\n    </Mentions.Items>\n  </Mentions.Suggestions>\n</Mentions.Root>`,
  },
  {
    slug: 'data-table',
    name: 'DataTable',
    category: 'Data',
    description: 'A full-featured data grid with sorting, filtering, pagination, virtualization and row selection.',
    features: [
      'Built on TanStack Table with typed column definitions.',
      'Sorting, filtering, pagination, selection, resizing and pinning.',
      'Virtualized rows for large datasets.',
      'Server-side state adapter for remote data.',
    ],
    preview: () => (
      <DataTable
        columns={docsTableColumns}
        data={docsTableData}
        enableSorting
        enablePagination
        pageSize={3}
        className="w-full max-w-2xl"
      />
    ),
    code: `import { DataTable, type DataTableColumn } from '@aura-ui/data-table';

type User = { id: number; name: string; email: string; role: string };

const columns: DataTableColumn<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

export default function Demo({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} enableSorting enablePagination />;
}`,
  },
];

function ToastDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Toast.Provider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast.Root open={open} onOpenChange={setOpen} duration={4000}>
        <Toast.Title>Scheduled</Toast.Title>
        <Toast.Description>Friday, February 10 at 5:00 PM</Toast.Description>
        <Toast.Close />
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

/* ── Hooks registry ─────────────────────────────────────────────────── */

export interface HookEntry {
  name: string;
  signature: string;
  description: string;
}

export const HOOKS: HookEntry[] = [
  { name: 'useControllableState', signature: '<T>({ prop, defaultProp, onChange }) => [T, setT]', description: 'Bridges controlled and uncontrolled state in a single hook.' },
  { name: 'useComposedRefs', signature: '(...refs) => (node) => void', description: 'Merges multiple refs into one callback ref.' },
  { name: 'useCallbackRef', signature: '(callback) => stableCallback', description: 'Returns a stable function identity that always calls the latest callback.' },
  { name: 'useToggle', signature: '(initial?) => [boolean, toggle]', description: 'Boolean state with a toggle setter.' },
  { name: 'useBoolean', signature: '(initial?) => { value, on, off, toggle }', description: 'Boolean state with named setters.' },
  { name: 'useCounter', signature: '(initial?) => { count, inc, dec, reset, set }', description: 'Numeric counter state.' },
  { name: 'usePrevious', signature: '<T>(value) => T | undefined', description: 'Returns the value from the previous render.' },
  { name: 'useLatest', signature: '<T>(value) => Ref<T>', description: 'A ref that always holds the latest value.' },
  { name: 'useClickOutside', signature: '(ref, handler) => void', description: 'Calls a handler when a click lands outside the ref.' },
  { name: 'useEventListener', signature: '(event, handler, target?) => void', description: 'Declarative addEventListener with cleanup.' },
  { name: 'useKeyPress', signature: '(key, handler) => void', description: 'Fires a handler when a specific key is pressed.' },
  { name: 'useHotkeys', signature: '(combo, handler) => void', description: 'Binds keyboard shortcut combinations.' },
  { name: 'useMediaQuery', signature: '(query) => boolean', description: 'Tracks a CSS media query, SSR-safe.' },
  { name: 'useDarkMode', signature: '() => { isDark, toggle }', description: 'Reads and toggles the dark color scheme.' },
  { name: 'useLocalStorage', signature: '<T>(key, initial) => [T, setT]', description: 'State synced to localStorage.' },
  { name: 'useCopyToClipboard', signature: '() => [copied, copy]', description: 'Copies text to the clipboard with status.' },
  { name: 'useDebounce', signature: '<T>(value, delay) => T', description: 'Debounces a rapidly-changing value.' },
  { name: 'useThrottle', signature: '<T>(value, delay) => T', description: 'Throttles a rapidly-changing value.' },
  { name: 'useId', signature: '(prefix?) => string', description: 'Generates a stable unique id, SSR-safe.' },
  { name: 'useMount', signature: '(fn) => void', description: 'Runs a function once on mount.' },
  { name: 'useUnmount', signature: '(fn) => void', description: 'Runs a function once on unmount.' },
  { name: 'useUpdateEffect', signature: '(effect, deps) => void', description: 'useEffect that skips the first render.' },
  { name: 'useIsomorphicLayoutEffect', signature: '(effect, deps) => void', description: 'useLayoutEffect on the client, useEffect on the server.' },
  { name: 'useWindowSize', signature: '() => { width, height }', description: 'Tracks the viewport size.' },
];

/* ── Packages registry ──────────────────────────────────────────────── */

export interface PackageEntry {
  name: string;
  description: string;
  install: string;
  highlights: string[];
}

export const PACKAGES: PackageEntry[] = [
  {
    name: '@aura-ui/core',
    description: 'Internal foundation: Slot, Primitive, Portal, Presence, FocusScope, DismissableLayer, RovingFocusGroup, Popper and more.',
    install: 'pnpm add @aura-ui/core',
    highlights: ['Headless behaviour primitives', 'Floating UI wrapper', 'Focus & dismiss management'],
  },
  {
    name: '@aura-ui/hooks',
    description: '24 reusable, SSR-safe, tree-shakeable React hooks.',
    install: 'pnpm add @aura-ui/hooks',
    highlights: ['State, refs, DOM, browser utilities', 'Zero dependencies', 'Fully typed'],
  },
  {
    name: '@aura-ui/utils',
    description: 'Pure utility functions: cn, composeEventHandlers, type guards, array/object/string helpers.',
    install: 'pnpm add @aura-ui/utils',
    highlights: ['Tree-shakeable named exports', 'No side effects', '< 2 KB gzip'],
  },
  {
    name: '@aura-ui/themes',
    description: 'Runtime theming: ThemeProvider, useTheme, ThemeScript and three built-in themes.',
    install: 'pnpm add @aura-ui/themes',
    highlights: ['CSS-variable based', 'No flash of unstyled content', 'Custom themes supported'],
  },
  {
    name: '@aura-ui/primitives',
    description: 'Headless, accessible behaviour components — the unstyled layer.',
    install: 'pnpm add @aura-ui/primitives',
    highlights: ['~50 components', 'WAI-ARIA APG compliant', 'asChild everywhere'],
  },
  {
    name: '@aura-ui/styled',
    description: 'Tailwind-styled components, batteries included.',
    install: 'pnpm add @aura-ui/styled',
    highlights: ['Apple-grade visuals', 'Theme-token driven', 'tailwind-variants API'],
  },
  {
    name: '@aura-ui/data-table',
    description: 'A full-featured DataTable built on TanStack Table.',
    install: 'pnpm add @aura-ui/data-table',
    highlights: ['Virtualization', 'Column resize / pin / reorder', 'CSV & JSON export'],
  },
  {
    name: '@aura-ui/icons',
    description: 'Curated icon set, re-exported from lucide-react.',
    install: 'pnpm add @aura-ui/icons',
    highlights: ['Tree-shakeable per-icon', '1000+ icons', 'Consistent stroke'],
  },
  {
    name: '@aura-ui/cli',
    description: 'Scaffolding CLI — init a project and add components from the registry.',
    install: 'pnpm add -D @aura-ui/cli',
    highlights: ['npx aura-ui init', 'npx aura-ui add <component>', 'Transitive dependency resolution'],
  },
];

export const CATEGORIES = ['Atoms', 'Form', 'Disclosure', 'Overlays', 'Compound', 'Misc', 'Data'];

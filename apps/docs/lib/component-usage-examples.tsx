import * as React from 'react';
import {
  Bell,
  Copy,
  FileText,
  Folder,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from '@aura-ui/icons';
import {
  Accordion,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Calendar,
  Checkbox,
  CircularProgress,
  Collapsible,
  ColorPicker,
  Combobox,
  Command,
  ContextMenu,
  CopyButton,
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  Editable,
  FileUpload,
  Form,
  HoverCard,
  Input,
  Label,
  Menubar,
  Mentions,
  Meter,
  MultiSelect,
  NavigationMenu,
  NumberField,
  OneTimePasswordField,
  Pagination,
  PasswordToggleField,
  Popover,
  Progress,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Stepper,
  Switch,
  Tabs,
  TagsInput,
  Textarea,
  TimePicker,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
  Tree,
} from '@aura-ui/styled';
import { DataTable, type DataTableColumn } from '@aura-ui/data-table';

export interface UsageExample {
  title: string;
  description?: string;
  preview: () => React.ReactNode;
  code: string;
}

type ProjectRow = {
  id: number;
  project: string;
  owner: string;
  status: 'Healthy' | 'Review' | 'Blocked' | 'Queued';
  budget: string;
  progress: number;
};

const people = [
  { id: 'ada', name: 'Ada Lovelace', role: 'Admin', email: 'ada@aura.dev', initials: 'AL' },
  { id: 'grace', name: 'Grace Hopper', role: 'Engineer', email: 'grace@aura.dev', initials: 'GH' },
  { id: 'margaret', name: 'Margaret Hamilton', role: 'Reviewer', email: 'margaret@aura.dev', initials: 'MH' },
  { id: 'alan', name: 'Alan Turing', role: 'Research', email: 'alan@aura.dev', initials: 'AT' },
  { id: 'katherine', name: 'Katherine Johnson', role: 'Analyst', email: 'katherine@aura.dev', initials: 'KJ' },
  { id: 'radia', name: 'Radia Perlman', role: 'Network', email: 'radia@aura.dev', initials: 'RP' },
];

const projectRows: ProjectRow[] = Array.from({ length: 24 }, (_, index) => {
  const statuses: ProjectRow['status'][] = ['Healthy', 'Review', 'Blocked', 'Queued'];
  const owners = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Alan Turing'];
  return {
    id: index + 1,
    project: `Workspace ${index + 1}`,
    owner: owners[index % owners.length] ?? 'Ada Lovelace',
    status: statuses[index % statuses.length] ?? 'Queued',
    budget: `$${(12 + index * 3).toLocaleString()}k`,
    progress: 35 + ((index * 7) % 60),
  };
});

const projectColumns: DataTableColumn<ProjectRow>[] = [
  { accessorKey: 'project', header: 'Project' },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'budget', header: 'Budget' },
  { accessorKey: 'progress', header: 'Progress' },
];

const productOptions = [
  'Analytics dashboard',
  'Billing portal',
  'Command center',
  'Customer console',
  'Design system',
  'Documentation',
  'Feature flags',
  'Incident room',
  'Release board',
  'Usage reports',
].map((label) => ({
  value: label.toLowerCase().replaceAll(' ', '-'),
  label,
}));

const largeOptions = Array.from({ length: 1000 }, (_, index) => ({
  value: `workspace-${index + 1}`,
  label: `Workspace ${index + 1}`,
  textValue: `Workspace ${index + 1}`,
  disabled: index % 97 === 0,
}));

const files = [
  { id: 'src', label: 'src', children: ['app.tsx', 'index.ts', 'theme.ts'] },
  { id: 'docs', label: 'docs', children: ['components.mdx', 'migration.mdx'] },
  { id: 'tests', label: 'tests', children: ['visual.spec.ts', 'a11y.spec.ts'] },
];

function ExampleShell({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid w-full max-w-xl gap-3 rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground">Realistic app composition</div>
        </div>
        <Badge variant="secondary">Example</Badge>
      </div>
      {children}
    </div>
  );
}

function ToastVariantsExample() {
  return (
    <Toast.Provider>
      <div className="grid gap-2">
        <Toast.Root open duration={8000} variant="success" className="relative translate-x-0">
          <div className="grid gap-1">
            <Toast.Title>Release promoted</Toast.Title>
            <Toast.Description>Production traffic is now serving v2.8.0.</Toast.Description>
          </div>
          <Toast.Action altText="View release">View</Toast.Action>
          <Toast.Close />
        </Toast.Root>
        <Toast.Root open duration={8000} variant="warning" className="relative translate-x-0">
          <div className="grid gap-1">
            <Toast.Title>Usage approaching limit</Toast.Title>
            <Toast.Description>Upgrade before the next billing cycle.</Toast.Description>
          </div>
          <Toast.Close />
        </Toast.Root>
      </div>
      <Toast.Viewport className="hidden" />
    </Toast.Provider>
  );
}

function MentionsPeopleExample() {
  return (
    <Mentions.Root
      className="w-full max-w-md"
      defaultValue="Please review this with @ada and @grace before release."
    >
      <Mentions.Textarea
        placeholder="Write an update..."
        rows={4}
      />
      <Mentions.Suggestions items={people.map((person) => ({ id: person.id, label: person.name }))}>
        <div className="rounded-md border border-border bg-popover p-1 shadow-md">
          <Mentions.Items>
            {(item, index) => (
              <Mentions.Item key={item.id} suggestion={item} index={index}>
                <div className="rounded px-2 py-1 text-sm hover:bg-accent">@{item.label}</div>
              </Mentions.Item>
            )}
          </Mentions.Items>
        </div>
      </Mentions.Suggestions>
    </Mentions.Root>
  );
}

export const componentUsageGroups = [
  {
    title: 'Atoms',
    slugs: [
      'button',
      'avatar',
      'badge',
      'card',
      'alert',
      'progress',
      'skeleton',
      'spinner',
      'separator',
      'aspect-ratio',
      'circular-progress',
      'meter',
      'copy-button',
    ],
  },
  {
    title: 'Form Controls',
    slugs: [
      'input',
      'textarea',
      'label',
      'switch',
      'checkbox',
      'radio-group',
      'toggle',
      'toggle-group',
      'slider',
      'form',
      'one-time-password-field',
      'password-toggle-field',
      'number-field',
      'calendar',
      'date-picker',
      'date-range-picker',
      'time-picker',
      'date-time-picker',
      'color-picker',
      'file-upload',
    ],
  },
  {
    title: 'Disclosure And Navigation',
    slugs: [
      'accordion',
      'tabs',
      'collapsible',
      'breadcrumb',
      'pagination',
      'stepper',
      'navigation-menu',
      'toolbar',
    ],
  },
  {
    title: 'Overlays And Menus',
    slugs: [
      'dialog',
      'alert-dialog',
      'sheet',
      'drawer',
      'popover',
      'tooltip',
      'hover-card',
      'toast',
      'dropdown-menu',
      'context-menu',
      'menubar',
    ],
  },
  {
    title: 'Compound And Data',
    slugs: [
      'select',
      'multi-select',
      'combobox',
      'command',
      'scroll-area',
      'resizable',
      'carousel',
      'tree',
      'editable',
      'tags-input',
      'mentions',
      'data-table',
    ],
  },
] as const;

export const componentUsageExamples: Record<string, UsageExample[]> = {
  button: [
    {
      title: 'Variants and sizes',
      description: 'Preview the common visual variants, icon affordance and disabled state together.',
      preview: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="icon" aria-label="Open settings">
            <Settings />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      ),
      code: `<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="icon" aria-label="Open settings"><Settings /></Button>
<Button disabled>Disabled</Button>`,
    },
  ],
  dialog: [
    {
      title: 'Form dialog',
      description: 'Use Dialog for edit flows that need focus trapping, labeled content and actions.',
      preview: () => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Edit customer</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit customer</Dialog.Title>
                <Dialog.Description>Update ownership and notification details.</Dialog.Description>
              </Dialog.Header>
              <div className="grid gap-3 py-3">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Ada Lovelace" />
                <Label htmlFor="dialog-email">Email</Label>
                <Input id="dialog-email" defaultValue="ada@aura.dev" />
              </div>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button>Save</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ),
      code: `<Dialog.Root>
  <Dialog.Trigger asChild><Button>Edit customer</Button></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Edit customer</Dialog.Title>
      <Dialog.Description>Update ownership and notification details.</Dialog.Description>
      <Input defaultValue="Ada Lovelace" />
      <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
    },
  ],
  'dropdown-menu': [
    {
      title: 'Rich action menu',
      description: 'Use labels, separators, checkbox items, radio items and shortcuts in one menu.',
      preview: () => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">
              Workspace
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56">
            <DropdownMenu.Label>Workspace actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              Open dashboard
              <DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>Invite members</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.CheckboxItem checked>Auto deploy</DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup value="prod">
              <DropdownMenu.RadioItem value="dev">Development</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="prod">Production</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ),
      code: `<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild><Button>Workspace</Button></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Workspace actions</DropdownMenu.Label>
    <DropdownMenu.Item>Open dashboard</DropdownMenu.Item>
    <DropdownMenu.CheckboxItem checked>Auto deploy</DropdownMenu.CheckboxItem>
    <DropdownMenu.RadioGroup value="prod">
      <DropdownMenu.RadioItem value="prod">Production</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>`,
    },
  ],
  popover: [
    {
      title: 'Inline settings panel',
      description: 'Popover works well for compact settings that should stay near the trigger.',
      preview: () => (
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4" />
              Preferences
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-72">
            <div className="grid gap-3">
              <div>
                <div className="text-sm font-medium">Notifications</div>
                <div className="text-xs text-muted-foreground">Control product updates.</div>
              </div>
              <label className="flex items-center justify-between gap-3 text-sm">
                Email summaries
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm">
                Security alerts
                <Switch defaultChecked />
              </label>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
      code: `<Popover.Root>
  <Popover.Trigger asChild><Button>Preferences</Button></Popover.Trigger>
  <Popover.Content>
    <label><Switch defaultChecked /> Email summaries</label>
    <label><Switch defaultChecked /> Security alerts</label>
  </Popover.Content>
</Popover.Root>`,
    },
  ],
  tooltip: [
    {
      title: 'Icon toolbar labels',
      description: 'Wrap icon-only controls with Tooltip so the command has an accessible visible hint.',
      preview: () => (
        <Tooltip.Provider>
          <div className="flex gap-2">
            {[
              { label: 'Search', icon: Search },
              { label: 'Notifications', icon: Bell },
              { label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip.Root key={item.label}>
                  <Tooltip.Trigger asChild>
                    <Button size="icon" variant="outline" aria-label={item.label}>
                      <Icon />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>{item.label}</Tooltip.Content>
                </Tooltip.Root>
              );
            })}
          </div>
        </Tooltip.Provider>
      ),
      code: `<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button size="icon" aria-label="Search"><Search /></Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Search</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`,
    },
  ],
  select: [
    {
      title: 'Searchable large options',
      description: 'Use searchable with the virtualized options prop to keep large lists responsive.',
      preview: () => (
        <Select.Root searchable defaultValue="workspace-12">
          <Select.Trigger className="w-72" aria-label="Select workspace">
            <Select.Value placeholder="Select workspace" />
          </Select.Trigger>
          <Select.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
        </Select.Root>
      ),
      code: `<Select.Root searchable defaultValue="workspace-12">
  <Select.Trigger>
    <Select.Value placeholder="Select workspace" />
  </Select.Trigger>
  <Select.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
</Select.Root>`,
    },
    {
      title: 'Creation flow',
      description: 'Pass onCreateOption to let users create a value when search has no match.',
      preview: () => (
        <Select.Root searchable onCreateOption={() => {}} createOptionLabel={(value) => `Create ${value}`}>
          <Select.Trigger className="w-72" aria-label="Choose or create product">
            <Select.Value placeholder="Choose or create" />
          </Select.Trigger>
          <Select.Content options={productOptions} />
        </Select.Root>
      ),
      code: `<Select.Root
  searchable
  onCreateOption={handleCreate}
  createOptionLabel={(value) => \`Create \${value}\`}
>
  <Select.Trigger><Select.Value placeholder="Choose or create" /></Select.Trigger>
  <Select.Content options={options} />
</Select.Root>`,
    },
  ],
  'multi-select': [
    {
      title: 'Selected chips and overflow',
      description: 'Selected values render in the trigger and can collapse into an overflow count.',
      preview: () => (
        <MultiSelect.Root searchable defaultValue={['workspace-2', 'workspace-8', 'workspace-13', 'workspace-21']}>
          <MultiSelect.Trigger className="w-80" aria-label="Select workspaces">
            <MultiSelect.Value options={largeOptions} maxVisible={3} placeholder="Select workspaces" />
          </MultiSelect.Trigger>
          <MultiSelect.Content options={largeOptions} optionHeight={36} optionOverscan={8} />
        </MultiSelect.Root>
      ),
      code: `<MultiSelect.Root searchable defaultValue={['workspace-2', 'workspace-8']}>
  <MultiSelect.Trigger>
    <MultiSelect.Value options={largeOptions} maxVisible={3} />
  </MultiSelect.Trigger>
  <MultiSelect.Content options={largeOptions} />
</MultiSelect.Root>`,
    },
  ],
  switch: [
    {
      title: 'Settings list',
      description: 'Use controlled or uncontrolled switches inside dense settings panels.',
      preview: () => (
        <ExampleShell title="Release preferences">
          {[
            ['Auto-merge approved pull requests', true],
            ['Notify release managers', true],
            ['Freeze deploys on weekends', false],
          ].map(([label, checked]) => (
            <label key={String(label)} className="flex items-center justify-between gap-4 text-sm">
              <span>{label}</span>
              <Switch defaultChecked={Boolean(checked)} />
            </label>
          ))}
        </ExampleShell>
      ),
      code: `<label className="flex items-center justify-between">
  Auto-merge approved pull requests
  <Switch defaultChecked name="autoMerge" />
</label>`,
    },
  ],
  checkbox: [
    {
      title: 'Checked, unchecked and indeterminate',
      description: 'Checkbox supports standard and indeterminate states for bulk selection flows.',
      preview: () => (
        <div className="grid gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Selected row
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox /> Available row
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked="indeterminate" /> Some rows selected
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox disabled /> Disabled option
          </label>
        </div>
      ),
      code: `<Checkbox defaultChecked />
<Checkbox />
<Checkbox defaultChecked="indeterminate" />
<Checkbox disabled />`,
    },
  ],
  accordion: [
    {
      title: 'Multiple open panels',
      description: 'Use type="multiple" for FAQ and settings pages where several sections can stay open.',
      preview: () => (
        <Accordion.Root type="multiple" defaultValue={['billing', 'security']} className="w-full max-w-md">
          {[
            { value: 'billing', title: 'Billing', content: 'Invoices, payment methods and tax details.' },
            { value: 'security', title: 'Security', content: 'Two-factor authentication and audit logs.' },
            { value: 'members', title: 'Members', content: 'Seats, roles and invitation settings.' },
          ].map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger>{item.title}</Accordion.Trigger>
              <Accordion.Content className="text-sm text-muted-foreground">{item.content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      ),
      code: `<Accordion.Root type="multiple" defaultValue={['billing']}>
  <Accordion.Item value="billing">
    <Accordion.Trigger>Billing</Accordion.Trigger>
    <Accordion.Content>Invoices and payment methods.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
    },
  ],
  tabs: [
    {
      title: 'Account settings layout',
      description: 'Tabs can organize forms and large detail panels without leaving the page.',
      preview: () => (
        <Tabs.Root defaultValue="profile" className="w-full max-w-lg">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="security">Security</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile" className="grid gap-3 text-sm">
            <Input aria-label="Profile name" defaultValue="Ada Lovelace" />
            <Input aria-label="Profile email" defaultValue="ada@aura.dev" />
          </Tabs.Content>
          <Tabs.Content value="security" className="text-sm text-muted-foreground">
            Two-factor authentication is enabled.
          </Tabs.Content>
          <Tabs.Content value="billing" className="text-sm text-muted-foreground">
            Team plan renews on June 1.
          </Tabs.Content>
        </Tabs.Root>
      ),
      code: `<Tabs.Root defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile"><Input defaultValue="Ada Lovelace" /></Tabs.Content>
</Tabs.Root>`,
    },
  ],
  slider: [
    {
      title: 'Range and vertical sliders',
      description: 'Slider supports multiple thumbs, step intervals and orientation changes.',
      preview: () => (
        <div className="grid w-full max-w-md grid-cols-[1fr_auto] gap-6">
          <div className="grid gap-4">
            <Label>Budget range</Label>
            <Slider defaultValue={[25, 75]} min={0} max={100} step={5} minStepsBetweenThumbs={2} />
            <Label>Confidence</Label>
            <Slider defaultValue={[60]} max={100} step={10} />
          </div>
          <Slider orientation="vertical" defaultValue={[40]} className="h-36" />
        </div>
      ),
      code: `<Slider defaultValue={[25, 75]} step={5} minStepsBetweenThumbs={2} />
<Slider orientation="vertical" defaultValue={[40]} />`,
    },
  ],
  avatar: [
    {
      title: 'Team stack with fallback',
      description: 'Show loaded images, initials fallbacks and delayed fallback states together.',
      preview: () => (
        <div className="flex items-center gap-3">
          {people.slice(0, 5).map((person, index) => (
            <Avatar.Root key={person.id} className="-ml-1 first:ml-0">
              {index % 2 === 0 ? (
                <Avatar.Image src={`https://i.pravatar.cc/96?img=${index + 12}`} alt={person.name} />
              ) : null}
              <Avatar.Fallback delayMs={index === 1 ? 300 : 0}>{person.initials}</Avatar.Fallback>
            </Avatar.Root>
          ))}
        </div>
      ),
      code: `<Avatar.Root>
  <Avatar.Image src="/ada.jpg" alt="Ada Lovelace" />
  <Avatar.Fallback delayMs={300}>AL</Avatar.Fallback>
</Avatar.Root>`,
    },
  ],
  badge: [
    {
      title: 'Status variants',
      description: 'Badges cover neutral labels, success, warning, destructive and outline statuses.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Healthy</Badge>
          <Badge variant="warning">Review</Badge>
          <Badge variant="destructive">Blocked</Badge>
        </div>
      ),
      code: `<Badge>Default</Badge>
<Badge variant="success">Healthy</Badge>
<Badge variant="warning">Review</Badge>
<Badge variant="destructive">Blocked</Badge>`,
    },
  ],
  card: [
    {
      title: 'Product card',
      description: 'Compose header, description, content and footer for a complete application card.',
      preview: () => (
        <Card.Root className="w-full max-w-sm">
          <Card.Header>
            <Card.Title>Team plan</Card.Title>
            <Card.Description>Usage this billing cycle across 32 seats.</Card.Description>
          </Card.Header>
          <Card.Content className="grid gap-3">
            <Progress value={72} aria-label="Plan usage" />
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
              <span>32 seats</span>
              <span>18 projects</span>
              <span>94% SLA</span>
            </div>
          </Card.Content>
          <Card.Footer className="justify-end gap-2">
            <Button variant="outline" size="sm">Details</Button>
            <Button size="sm">Upgrade</Button>
          </Card.Footer>
        </Card.Root>
      ),
      code: `<Card.Root>
  <Card.Header>
    <Card.Title>Team plan</Card.Title>
    <Card.Description>Usage this billing cycle.</Card.Description>
  </Card.Header>
  <Card.Content><Progress value={72} /></Card.Content>
  <Card.Footer><Button>Upgrade</Button></Card.Footer>
</Card.Root>`,
    },
  ],
  alert: [
    {
      title: 'Alert variants',
      description: 'Use semantic variants for success, warning, info and destructive states.',
      preview: () => (
        <div className="grid w-full max-w-lg gap-3">
          <Alert.Root variant="success">
            <Alert.Title role="heading" aria-level={4}>Deployment complete</Alert.Title>
            <Alert.Description>Production updated without errors.</Alert.Description>
          </Alert.Root>
          <Alert.Root variant="warning">
            <Alert.Title role="heading" aria-level={4}>Review required</Alert.Title>
            <Alert.Description>Two checks need manual approval.</Alert.Description>
          </Alert.Root>
          <Alert.Root variant="destructive">
            <Alert.Title role="heading" aria-level={4}>Payment failed</Alert.Title>
            <Alert.Description>Update billing to avoid workspace suspension.</Alert.Description>
          </Alert.Root>
        </div>
      ),
      code: `<Alert.Root variant="success">
  <Alert.Title>Deployment complete</Alert.Title>
  <Alert.Description>Production updated without errors.</Alert.Description>
</Alert.Root>`,
    },
  ],
  input: [
    {
      title: 'Native input states',
      description: 'Input forwards native props and styles disabled plus invalid states.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <Input aria-label="Search customers" placeholder="Search customers" />
          <Input aria-label="Contact email" type="email" defaultValue="ada@aura.dev" />
          <Input aria-label="Invalid email" aria-invalid defaultValue="invalid-email" />
          <Input aria-label="Disabled sample" disabled placeholder="Disabled input" />
        </div>
      ),
      code: `<Input placeholder="Search customers" />
<Input type="email" defaultValue="ada@aura.dev" />
<Input aria-invalid defaultValue="invalid-email" />
<Input disabled placeholder="Disabled input" />`,
    },
  ],
  progress: [
    {
      title: 'Determinate and indeterminate',
      description: 'Use value for known progress, or null for pending work without a measured value.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <Progress value={32} aria-label="Import progress" />
          <Progress
            value={76}
            aria-label="Sync progress"
            getValueLabel={(value) => `${value}% synced`}
          />
          <Progress value={null} aria-label="Loading progress" />
        </div>
      ),
      code: `<Progress value={32} />
<Progress value={76} getValueLabel={(value) => \`\${value}% synced\`} />
<Progress value={null} />`,
    },
  ],
  toast: [
    {
      title: 'Toast variants and actions',
      description: 'Toast supports variants, action buttons, close buttons and persistent viewports.',
      preview: () => <ToastVariantsExample />,
      code: `<Toast.Provider>
  <Toast.Root open variant="success">
    <Toast.Title>Release promoted</Toast.Title>
    <Toast.Description>Production traffic is now serving v2.8.0.</Toast.Description>
    <Toast.Action altText="View release">View</Toast.Action>
    <Toast.Close />
  </Toast.Root>
  <Toast.Viewport />
</Toast.Provider>`,
    },
  ],
  skeleton: [
    {
      title: 'Page loading skeleton',
      description: 'Shape Skeleton with Tailwind utilities to match the eventual content.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-lg" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        </div>
      ),
      code: `<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-28 w-full rounded-lg" />
<Skeleton className="h-14" />`,
    },
  ],
  spinner: [
    {
      title: 'Sizes and labels',
      description: 'Use different sizes and labels for button, inline and page-level loading states.',
      preview: () => (
        <div className="flex items-center gap-4">
          <Spinner size="sm" label="Loading small action" />
          <Spinner label="Loading content" />
          <Spinner size="lg" label="Loading page section" />
          <Spinner size="xl" label="Loading full page" />
        </div>
      ),
      code: `<Spinner size="sm" label="Loading small action" />
<Spinner label="Loading content" />
<Spinner size="lg" label="Loading page section" />
<Spinner size="xl" label="Loading full page" />`,
    },
  ],
  separator: [
    {
      title: 'Horizontal and vertical',
      description: 'Use decorative separators for layout rhythm or semantic separators for regions.',
      preview: () => (
        <div className="grid gap-4 text-sm">
          <div>
            <span>Account</span>
            <Separator className="my-2" />
            <span className="text-muted-foreground">Billing and invoices</span>
          </div>
          <div className="flex h-6 items-center gap-3">
            <span>Docs</span>
            <Separator orientation="vertical" className="h-5" />
            <span>API</span>
            <Separator orientation="vertical" decorative={false} className="h-5" />
            <span>Examples</span>
          </div>
        </div>
      ),
      code: `<Separator />
<Separator orientation="vertical" className="h-5" />
<Separator orientation="vertical" decorative={false} />`,
    },
  ],
  label: [
    {
      title: 'Form labeling',
      description: 'Pair labels with controls through htmlFor or compose with asChild.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="usage-email">Email</Label>
            <Input id="usage-email" type="email" placeholder="you@example.com" />
          </div>
          <Label asChild>
            <button type="button" className="text-left underline-offset-4 hover:underline">
              Rendered as a button with label styling
            </button>
          </Label>
        </div>
      ),
      code: `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
<Label asChild>
  <button type="button">Styled label button</button>
</Label>`,
    },
  ],
  textarea: [
    {
      title: 'Textarea states',
      description: 'Textarea keeps native behavior while matching input focus, invalid and disabled styling.',
      preview: () => (
        <div className="grid w-full max-w-md gap-3">
          <Textarea
            aria-label="Release notes"
            rows={3}
            defaultValue="Prepare launch notes for the design systems release."
          />
          <Textarea aria-label="Invalid notes" aria-invalid rows={2} defaultValue="Too short" />
          <Textarea aria-label="Disabled notes" disabled rows={2} placeholder="Disabled notes" />
        </div>
      ),
      code: `<Textarea rows={3} defaultValue="Release notes" />
<Textarea aria-invalid rows={2} defaultValue="Too short" />
<Textarea disabled rows={2} placeholder="Disabled notes" />`,
    },
  ],
  toggle: [
    {
      title: 'Toggle variants and sizes',
      description: 'Use Toggle for formatting controls, filters and icon buttons.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          <Toggle defaultPressed>Bold</Toggle>
          <Toggle variant="outline">Outline</Toggle>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="lg">Large</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      ),
      code: `<Toggle defaultPressed>Bold</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle size="sm">Small</Toggle>
<Toggle disabled>Disabled</Toggle>`,
    },
  ],
  'toggle-group': [
    {
      title: 'Single and multiple groups',
      description: 'Use type="single" for mutually exclusive choices and type="multiple" for toolbars.',
      preview: () => (
        <div className="grid gap-4">
          <ToggleGroup.Root type="single" defaultValue="left" aria-label="Text alignment">
            <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
            <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
            <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root type="multiple" defaultValue={['bold', 'code']} aria-label="Formatting">
            <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
            <ToggleGroup.Item value="code">Code</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      ),
      code: `<ToggleGroup.Root type="single" defaultValue="left">
  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
</ToggleGroup.Root>
<ToggleGroup.Root type="multiple" defaultValue={['bold']}>
  <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
</ToggleGroup.Root>`,
    },
  ],
  'radio-group': [
    {
      title: 'Card radio choices',
      description: 'Use radio items inside larger labels when the option needs supporting copy.',
      preview: () => (
        <RadioGroup.Root
          defaultValue="team"
          aria-label="Choose a plan"
          className="grid w-full max-w-md gap-2"
        >
          {[
            { value: 'starter', title: 'Starter', description: 'For personal projects.' },
            { value: 'team', title: 'Team', description: 'Shared workspaces and reviews.' },
            { value: 'enterprise', title: 'Enterprise', description: 'Advanced controls and support.' },
          ].map((item) => (
            <label key={item.value} className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
              <RadioGroup.Item value={item.value} className="mt-0.5" />
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="text-muted-foreground">{item.description}</span>
              </span>
            </label>
          ))}
        </RadioGroup.Root>
      ),
      code: `<RadioGroup.Root defaultValue="team">
  <label>
    <RadioGroup.Item value="team" />
    <span>Team plan</span>
  </label>
</RadioGroup.Root>`,
    },
  ],
  form: [
    {
      title: 'Validation states',
      description: 'Form coordinates labels, controls and native ValidityState messages.',
      preview: () => (
        <Form.Root className="grid w-full max-w-sm gap-3" onSubmit={(event) => event.preventDefault()}>
          <Form.Field name="email" className="grid gap-1.5">
            <Form.Label asChild>
              <Label>Email</Label>
            </Form.Label>
            <Form.Control asChild>
              <Input type="email" required placeholder="you@example.com" />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs text-destructive">
              Email is required.
            </Form.Message>
            <Form.Message match="typeMismatch" className="text-xs text-destructive">
              Use a valid email address.
            </Form.Message>
          </Form.Field>
          <Form.Submit asChild>
            <Button>Save profile</Button>
          </Form.Submit>
        </Form.Root>
      ),
      code: `<Form.Root onSubmit={(event) => event.preventDefault()}>
  <Form.Field name="email">
    <Form.Label asChild><Label>Email</Label></Form.Label>
    <Form.Control asChild><Input type="email" required /></Form.Control>
    <Form.Message match="valueMissing">Email is required.</Form.Message>
  </Form.Field>
  <Form.Submit asChild><Button>Save profile</Button></Form.Submit>
</Form.Root>`,
    },
  ],
  'aspect-ratio': [
    {
      title: 'Media cards',
      description: 'AspectRatio keeps image, video and preview tiles stable across responsive widths.',
      preview: () => (
        <div className="grid w-full max-w-md gap-3">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border border-border">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop"
              alt="Workspace desk"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <AspectRatio ratio={4 / 3} className="grid place-items-center rounded-lg bg-muted text-sm">
            4:3 preview area
          </AspectRatio>
        </div>
      ),
      code: `<AspectRatio ratio={16 / 9}>
  <img src="/workspace.jpg" alt="Workspace desk" />
</AspectRatio>
<AspectRatio ratio={4 / 3}>4:3 preview area</AspectRatio>`,
    },
  ],
  'circular-progress': [
    {
      title: 'Progress states',
      description: 'Use determinate values for known work and null for indeterminate loading.',
      preview: () => (
        <div className="flex items-center gap-5">
          <CircularProgress value={null} label="Loading report" />
          <CircularProgress value={25} size={44} label="Upload progress" />
          <CircularProgress value={68} size={56} strokeWidth={6} label="Sync progress" />
          <CircularProgress value={100} size={64} label="Completed progress" />
        </div>
      ),
      code: `<CircularProgress value={null} />
<CircularProgress value={25} size={44} />
<CircularProgress value={68} size={56} strokeWidth={6} />`,
    },
  ],
  meter: [
    {
      title: 'Threshold examples',
      description: 'Meter communicates known ranges with low, high and optimum thresholds.',
      preview: () => (
        <div className="grid w-full max-w-md gap-4">
          <Meter value={24} low={30} high={80} optimum={60} label="Low usage" />
          <Meter value={66} low={30} high={80} optimum={60} label="Healthy usage" />
          <Meter value={92} low={30} high={80} optimum={60} label="High usage" />
        </div>
      ),
      code: `<Meter value={24} low={30} high={80} optimum={60} />
<Meter value={66} low={30} high={80} optimum={60} />
<Meter value={92} low={30} high={80} optimum={60} />`,
    },
  ],
  'copy-button': [
    {
      title: 'Copy command and tokens',
      description: 'CopyButton can be used beside code, API keys and generated theme values.',
      preview: () => (
        <div className="grid gap-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 p-2">
            <code className="text-sm">pnpm add @aura-ui/styled</code>
            <CopyButton
              value="pnpm add @aura-ui/styled"
              size="icon-sm"
              aria-label="Copy install command"
            />
          </div>
          <CopyButton value="AURA_PUBLIC_TOKEN" variant="outline">
            Copy token
          </CopyButton>
        </div>
      ),
      code: `<CopyButton value="pnpm add @aura-ui/styled" size="icon-sm" />
<CopyButton value="AURA_PUBLIC_TOKEN" variant="outline">Copy token</CopyButton>`,
    },
  ],
  collapsible: [
    {
      title: 'Release notes disclosure',
      description: 'Use Collapsible for compact optional content with controlled or uncontrolled state.',
      preview: () => (
        <Collapsible.Root defaultOpen className="w-full max-w-md">
          <Collapsible.Trigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Release notes
              <Plus className="h-4 w-4" />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2 rounded-md border border-border p-4 text-sm text-muted-foreground">
            Added searchable selects, multi-select values, and expanded component examples.
          </Collapsible.Content>
        </Collapsible.Root>
      ),
      code: `<Collapsible.Root defaultOpen>
  <Collapsible.Trigger asChild><Button>Release notes</Button></Collapsible.Trigger>
  <Collapsible.Content>Added searchable selects.</Collapsible.Content>
</Collapsible.Root>`,
    },
  ],
  breadcrumb: [
    {
      title: 'Long path with ellipsis',
      description: 'Breadcrumb supports links, separators, current page and compact overflow markers.',
      preview: () => (
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Ellipsis />
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Select</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      ),
      code: `<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Ellipsis /></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Select</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`,
    },
  ],
  pagination: [
    {
      title: 'Dense page controls',
      description: 'Pagination combines previous/next links, page links and ellipsis markers.',
      preview: () => (
        <Pagination.Root>
          <Pagination.Content>
            <Pagination.Item><Pagination.Previous href="#" /></Pagination.Item>
            <Pagination.Item><Pagination.Link href="#">1</Pagination.Link></Pagination.Item>
            <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
            <Pagination.Item><Pagination.Link href="#" isActive>8</Pagination.Link></Pagination.Item>
            <Pagination.Item><Pagination.Link href="#">9</Pagination.Link></Pagination.Item>
            <Pagination.Item><Pagination.Next href="#" /></Pagination.Item>
          </Pagination.Content>
        </Pagination.Root>
      ),
      code: `<Pagination.Root>
  <Pagination.Content>
    <Pagination.Item><Pagination.Previous href="#" /></Pagination.Item>
    <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
    <Pagination.Item><Pagination.Link href="#" isActive>8</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Next href="#" /></Pagination.Item>
  </Pagination.Content>
</Pagination.Root>`,
    },
  ],
  stepper: [
    {
      title: 'Labeled checkout flow',
      description: 'Stepper supports active step state, titles, descriptions and vertical orientation.',
      preview: () => (
        <div className="grid gap-6">
          <Stepper.Root activeStep={1} className="w-full max-w-md">
            <Stepper.Step index={0}><Stepper.Title>Plan</Stepper.Title></Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={1}><Stepper.Title>Billing</Stepper.Title></Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={2}><Stepper.Title>Confirm</Stepper.Title></Stepper.Step>
          </Stepper.Root>
          <Stepper.Root activeStep={2} orientation="vertical" className="max-w-sm">
            <Stepper.Step index={0}><Stepper.Title>Created</Stepper.Title><Stepper.Description>Workspace is ready.</Stepper.Description></Stepper.Step>
            <Stepper.Separator />
            <Stepper.Step index={1}><Stepper.Title>Reviewed</Stepper.Title><Stepper.Description>Checks passed.</Stepper.Description></Stepper.Step>
          </Stepper.Root>
        </div>
      ),
      code: `<Stepper.Root activeStep={1}>
  <Stepper.Step index={0}><Stepper.Title>Plan</Stepper.Title></Stepper.Step>
  <Stepper.Separator />
  <Stepper.Step index={1}><Stepper.Title>Billing</Stepper.Title></Stepper.Step>
</Stepper.Root>`,
    },
  ],
  'alert-dialog': [
    {
      title: 'Destructive confirmation',
      description: 'AlertDialog blocks outside interaction and starts focus on the safest action.',
      preview: () => (
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button variant="destructive">Delete workspace</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Delete workspace?</AlertDialog.Title>
                <AlertDialog.Description>
                  This removes projects, tokens and deployment history permanently.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ),
      code: `<AlertDialog.Root>
  <AlertDialog.Trigger asChild><Button variant="destructive">Delete workspace</Button></AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Delete workspace?</AlertDialog.Title>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Delete</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`,
    },
  ],
  sheet: [
    {
      title: 'Side panel variants',
      description: 'Sheet supports every side and keeps dialog behavior for focus and dismissal.',
      preview: () => (
        <div className="flex flex-wrap gap-2">
          {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
            <Sheet.Root key={side}>
              <Sheet.Trigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </Sheet.Trigger>
              <Sheet.Content side={side}>
                <Sheet.Header>
                  <Sheet.Title>{side} sheet</Sheet.Title>
                  <Sheet.Description>Use side to choose the slide direction.</Sheet.Description>
                </Sheet.Header>
              </Sheet.Content>
            </Sheet.Root>
          ))}
        </div>
      ),
      code: `<Sheet.Root>
  <Sheet.Trigger asChild><Button>Open</Button></Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Title>Right sheet</Sheet.Title>
  </Sheet.Content>
</Sheet.Root>`,
    },
  ],
  drawer: [
    {
      title: 'Mobile action drawer',
      description: 'Drawer is a bottom sheet variant for dense mobile workflows.',
      preview: () => (
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button variant="outline">Open drawer</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Invite teammates</Drawer.Title>
              <Drawer.Description>Send invitations and assign roles.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer>
              <Button>Send invites</Button>
              <Drawer.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      ),
      code: `<Drawer.Root>
  <Drawer.Trigger asChild><Button>Open drawer</Button></Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Title>Invite teammates</Drawer.Title>
    <Drawer.Footer><Button>Send invites</Button></Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`,
    },
  ],
  'hover-card': [
    {
      title: 'Profile preview',
      description: 'HoverCard is useful for rich previews tied to links or compact references.',
      preview: () => (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <button type="button" className="font-medium text-primary underline-offset-4 hover:underline">
              @ada
            </button>
          </HoverCard.Trigger>
          <HoverCard.Content className="w-72">
            <div className="flex gap-3">
              <Avatar.Root><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Ada Lovelace</div>
                <div className="text-xs text-muted-foreground">Admin, release owner and systems reviewer.</div>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>
      ),
      code: `<HoverCard.Root>
  <HoverCard.Trigger asChild><a>@ada</a></HoverCard.Trigger>
  <HoverCard.Content>
    <Avatar.Root><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>
    Ada Lovelace
  </HoverCard.Content>
</HoverCard.Root>`,
    },
  ],
  'context-menu': [
    {
      title: 'File context menu',
      description: 'ContextMenu supports nested actions, checkboxes and radio groups from a right-click surface.',
      preview: () => (
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex h-32 w-72 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground">
            Right-click a file row
          </ContextMenu.Trigger>
          <ContextMenu.Content className="w-56">
            <ContextMenu.Item>Open</ContextMenu.Item>
            <ContextMenu.Item>Rename</ContextMenu.Item>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>Move to</ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>Archive</ContextMenu.Item>
                <ContextMenu.Item>Shared</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Separator />
            <ContextMenu.CheckboxItem checked>Favorite</ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ),
      code: `<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click a file row</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Open</ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger>Move to</ContextMenu.SubTrigger>
      <ContextMenu.SubContent><ContextMenu.Item>Archive</ContextMenu.Item></ContextMenu.SubContent>
    </ContextMenu.Sub>
  </ContextMenu.Content>
</ContextMenu.Root>`,
    },
  ],
  menubar: [
    {
      title: 'Application menubar',
      description: 'Menubar supports multiple menus, submenus, shortcuts, checkbox and radio items.',
      preview: () => (
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New project</Menubar.Item>
              <Menubar.Item>Import</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Export</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.CheckboxItem checked>Sidebar</Menubar.CheckboxItem>
              <Menubar.RadioGroup value="comfortable">
                <Menubar.RadioItem value="compact">Compact</Menubar.RadioItem>
                <Menubar.RadioItem value="comfortable">Comfortable</Menubar.RadioItem>
              </Menubar.RadioGroup>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      ),
      code: `<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content><Menubar.Item>New project</Menubar.Item></Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>`,
    },
  ],
  'navigation-menu': [
    {
      title: 'Documentation navigation',
      description: 'NavigationMenu supports triggers, content panels, links, viewport and indicator slots.',
      preview: () => (
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="components">
              <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div className="grid w-80 grid-cols-2 gap-2 p-3">
                  {['Button', 'Select', 'Dialog', 'DataTable'].map((item) => (
                    <NavigationMenu.Link key={item} href="#" className="rounded-md p-2 text-sm hover:bg-accent">
                      {item}
                    </NavigationMenu.Link>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="guides">
              <NavigationMenu.Link href="#">Guides</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Indicator />
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      ),
      code: `<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#">Button</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>`,
    },
  ],
  combobox: [
    {
      title: 'Large searchable collection',
      description: 'Combobox is useful when users need to search through application data.',
      preview: () => (
        <Combobox.Root>
          <Combobox.Input placeholder="Search workspace" className="w-80" />
          <Combobox.Content>
            <Combobox.Group>
              {largeOptions.slice(0, 20).map((option) => (
                <Combobox.Item key={option.value} value={option.value}>
                  {option.label}
                </Combobox.Item>
              ))}
            </Combobox.Group>
            <Combobox.Empty>No workspace found.</Combobox.Empty>
          </Combobox.Content>
        </Combobox.Root>
      ),
      code: `<Combobox.Root>
  <Combobox.Input placeholder="Search workspace" />
  <Combobox.Content>
    <Combobox.Group>
      {options.map((option) => (
        <Combobox.Item key={option.value} value={option.value}>{option.label}</Combobox.Item>
      ))}
    </Combobox.Group>
    <Combobox.Empty>No workspace found.</Combobox.Empty>
  </Combobox.Content>
</Combobox.Root>`,
    },
  ],
  command: [
    {
      title: 'Command palette with groups',
      description: 'Command combines search input, grouped actions, shortcuts and empty states.',
      preview: () => (
        <Command.Root className="w-full max-w-md rounded-lg border border-border">
          <Command.Input placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
              <Command.Item><Home className="h-4 w-4" /> Dashboard <Command.Shortcut>G D</Command.Shortcut></Command.Item>
              <Command.Item><Users className="h-4 w-4" /> Members <Command.Shortcut>G M</Command.Shortcut></Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Actions">
              <Command.Item><Plus className="h-4 w-4" /> Create project</Command.Item>
              <Command.Item><Settings className="h-4 w-4" /> Open settings</Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Root>
      ),
      code: `<Command.Root>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Group heading="Navigation">
      <Command.Item>Dashboard <Command.Shortcut>G D</Command.Shortcut></Command.Item>
    </Command.Group>
    <Command.Empty>No results found.</Command.Empty>
  </Command.List>
</Command.Root>`,
    },
  ],
  'one-time-password-field': [
    {
      title: 'Four and six digit codes',
      description: 'Use segmented inputs for OTP, PIN and confirmation code flows.',
      preview: () => (
        <div className="grid gap-4">
          <OneTimePasswordField.Root length={4} defaultValue="4821">
            {[0, 1, 2, 3].map((index) => (
              <OneTimePasswordField.Input
                key={index}
                index={index}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </OneTimePasswordField.Root>
          <OneTimePasswordField.Root length={6}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <OneTimePasswordField.Input
                key={index}
                index={index}
                aria-label={`Verification digit ${index + 1}`}
              />
            ))}
          </OneTimePasswordField.Root>
        </div>
      ),
      code: `<OneTimePasswordField.Root length={6}>
  {[0, 1, 2, 3, 4, 5].map((index) => (
    <OneTimePasswordField.Input key={index} index={index} />
  ))}
</OneTimePasswordField.Root>`,
    },
  ],
  'password-toggle-field': [
    {
      title: 'Password form field',
      description: 'Combine the root, input and toggle parts with labels and helper text.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="usage-password">Password</Label>
          <PasswordToggleField.Root>
            <PasswordToggleField.Input id="usage-password" placeholder="Enter password" />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
          <p className="text-xs text-muted-foreground">Use at least 12 characters.</p>
        </div>
      ),
      code: `<Label htmlFor="password">Password</Label>
<PasswordToggleField.Root>
  <PasswordToggleField.Input id="password" placeholder="Enter password" />
  <PasswordToggleField.Toggle />
</PasswordToggleField.Root>`,
    },
  ],
  'number-field': [
    {
      title: 'Quantities and currency',
      description: 'NumberField supports min, max, step and Intl formatting options.',
      preview: () => (
        <div className="grid gap-4">
          <NumberField.Root defaultValue={3} min={1} max={10}>
            <NumberField.DecrementTrigger />
            <NumberField.Input aria-label="Seats" />
            <NumberField.IncrementTrigger />
          </NumberField.Root>
          <NumberField.Root defaultValue={1200} step={100} formatOptions={{ style: 'currency', currency: 'USD' }}>
            <NumberField.DecrementTrigger />
            <NumberField.Input aria-label="Budget" />
            <NumberField.IncrementTrigger />
          </NumberField.Root>
        </div>
      ),
      code: `<NumberField.Root defaultValue={3} min={1} max={10}>
  <NumberField.DecrementTrigger />
  <NumberField.Input aria-label="Seats" />
  <NumberField.IncrementTrigger />
</NumberField.Root>`,
    },
  ],
  calendar: [
    {
      title: 'Selection modes',
      description: 'Calendar supports single, multiple and range selection plus date bounds.',
      preview: () => (
        <div className="grid gap-4 md:grid-cols-2">
          <Calendar mode="single" defaultSelected={new Date(2026, 4, 23)} />
          <Calendar
            mode="range"
            defaultSelected={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 26) }}
            minDate={new Date(2026, 4, 1)}
            maxDate={new Date(2026, 5, 30)}
          />
        </div>
      ),
      code: `<Calendar mode="single" defaultSelected={new Date(2026, 4, 23)} />
<Calendar
  mode="range"
  defaultSelected={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 26) }}
/>`,
    },
  ],
  'date-picker': [
    {
      title: 'MUI-style field',
      description: 'Use the direct component API for label, value, onChange, validation bounds, view props and helper text.',
      preview: () => (
        <DatePicker
          label="Release date"
          defaultValue={new Date(2026, 4, 23)}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          format="MM/dd/yyyy"
          formatDensity="spacious"
          views={['year', 'month', 'day']}
          openTo="day"
          helperText="Only dates inside the release window can be selected."
        />
      ),
      code: `<DatePicker
  label="Release date"
  value={date}
  onChange={setDate}
  minDate={releaseStart}
  maxDate={releaseEnd}
  helperText="Only dates inside the release window can be selected."
/>`,
    },
    {
      title: 'Validation and loading',
      description: 'Mirror MUI validation props such as disablePast, shouldDisableDate, loading and renderLoading.',
      preview: () => (
        <div className="grid gap-3">
          <DatePicker
            label="Business day"
            disablePast
            shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
            helperText="Weekends and past dates are disabled."
          />
          <DatePicker
            label="Async calendar"
            defaultOpen
            loading
            renderLoading={() => 'Loading release calendar...'}
          />
        </div>
      ),
      code: `<DatePicker
  label="Business day"
  disablePast
  shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
/>

<DatePicker
  loading
  renderLoading={() => 'Loading release calendar...'}
/>`,
    },
    {
      title: 'Date picker field',
      description: 'DatePicker combines a trigger, value display and calendar popover.',
      preview: () => (
        <DatePicker.Root defaultValue={new Date(2026, 4, 23)}>
          <DatePicker.Trigger className="w-64">
            <DatePicker.Value placeholder="Pick release date" />
          </DatePicker.Trigger>
          <DatePicker.Content />
        </DatePicker.Root>
      ),
      code: `<DatePicker.Root defaultValue={new Date(2026, 4, 23)}>
  <DatePicker.Trigger>
    <DatePicker.Value placeholder="Pick release date" />
  </DatePicker.Trigger>
  <DatePicker.Content />
</DatePicker.Root>`,
    },
  ],
  'date-range-picker': [
    {
      title: 'MUI-style range field',
      description: 'Use tuple values for MUI parity or the Aura range object for compound usage.',
      preview: () => (
        <DateRangePicker
          label="Sprint window"
          defaultValue={[new Date(2026, 4, 20), new Date(2026, 4, 27)]}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          calendars={2}
          helperText="Range closes after both start and end dates are selected."
        />
      ),
      code: `<DateRangePicker
  label="Sprint window"
  value={range}
  onChange={setRange}
  minDate={releaseStart}
  maxDate={releaseEnd}
/>`,
    },
    {
      title: 'Preset shortcuts',
      description: 'Use built-in shortcut buttons or provide your own shortcut ranges.',
      preview: () => (
        <DateRangePicker
          label="Report period"
          calendars={1}
          defaultOpen
          shortcuts={[
            { label: 'Yesterday', getValue: (today) => [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)] },
            { label: 'Last 14 days', getValue: (today) => [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13), today] },
            { label: 'Quarter to date', getValue: (today) => [new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1), today] },
          ]}
          helperText="Shortcut selections call onChange and onAccept with source='shortcut'."
        />
      ),
      code: `<DateRangePicker
  label="Report period"
  calendars={1}
  shortcuts={[
    { label: 'Yesterday', getValue: (today) => [yesterday(today), yesterday(today)] },
    { label: 'Last 14 days', getValue: (today) => [addDays(today, -13), today] },
    { label: 'Quarter to date', getValue: (today) => [startOfQuarter(today), today] },
  ]}
/>`,
    },
    {
      title: 'Date range field',
      description: 'Use DateRangePicker for reporting windows, bookings and project timelines.',
      preview: () => (
        <DateRangePicker.Root defaultValue={{ from: new Date(2026, 4, 20), to: new Date(2026, 4, 27) }}>
          <DateRangePicker.Trigger className="w-72">
            <DateRangePicker.Value placeholder="Pick date range" />
          </DateRangePicker.Trigger>
          <DateRangePicker.Content />
        </DateRangePicker.Root>
      ),
      code: `<DateRangePicker.Root defaultValue={{ from: startDate, to: endDate }}>
  <DateRangePicker.Trigger>
    <DateRangePicker.Value placeholder="Pick date range" />
  </DateRangePicker.Trigger>
  <DateRangePicker.Content />
</DateRangePicker.Root>`,
    },
  ],
  'time-picker': [
    {
      title: 'MUI-style time field',
      description: 'Use value/defaultValue, ampm, minutesStep, minTime, maxTime and shouldDisableTime.',
      preview: () => (
        <div className="grid gap-3">
          <TimePicker
            label="Start time"
            defaultValue={new Date(2026, 4, 23, 9, 30)}
            ampm
            minutesStep={15}
            minTime={new Date(2026, 4, 23, 8, 0)}
            maxTime={new Date(2026, 4, 23, 18, 0)}
            helperText="15-minute steps between 8:00 AM and 6:00 PM."
          />
          <TimePicker
            label="System time"
            defaultValue={new Date(2026, 4, 23, 14, 5, 45)}
            views={['hours', 'minutes', 'seconds']}
            timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
            format="HH:mm:ss"
          />
        </div>
      ),
      code: `<TimePicker
  label="Start time"
  value={time}
  onChange={setTime}
  ampm
  minutesStep={15}
  minTime={new Date(2026, 4, 23, 8, 0)}
  maxTime={new Date(2026, 4, 23, 18, 0)}
/>`,
    },
    {
      title: 'Time segments',
      description: 'Use segments for hour, minute and second editing with keyboard support.',
      preview: () => (
        <div className="grid gap-3">
          <TimePicker.Root defaultValue={{ hour: 9, minute: 30 }}>
            <TimePicker.Segment segment="hour" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="minute" />
          </TimePicker.Root>
          <TimePicker.Root defaultValue={{ hour: 14, minute: 5, second: 45 }}>
            <TimePicker.Segment segment="hour" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="minute" />
            <TimePicker.Separator />
            <TimePicker.Segment segment="second" />
          </TimePicker.Root>
        </div>
      ),
      code: `<TimePicker.Root defaultValue={{ hour: 14, minute: 5, second: 45 }}>
  <TimePicker.Segment segment="hour" />
  <TimePicker.Separator />
  <TimePicker.Segment segment="minute" />
  <TimePicker.Separator />
  <TimePicker.Segment segment="second" />
</TimePicker.Root>`,
    },
  ],
  'date-time-picker': [
    {
      title: 'MUI-style date time field',
      description: 'Combine DatePicker and TimePicker props in one popover.',
      preview: () => (
        <DateTimePicker
          label="Deployment window"
          defaultValue={new Date(2026, 4, 23, 14, 30)}
          minDateTime={new Date(2026, 4, 20, 9, 0)}
          maxDateTime={new Date(2026, 5, 30, 18, 0)}
          minutesStep={15}
          format="MM/dd/yyyy HH:mm"
          helperText="Date and time validation share one value."
        />
      ),
      code: `<DateTimePicker
  label="Deployment window"
  value={dateTime}
  onChange={setDateTime}
  minDateTime={new Date(2026, 4, 20, 9, 0)}
  maxDateTime={new Date(2026, 5, 30, 18, 0)}
  minutesStep={15}
/>`,
    },
    {
      title: 'AM/PM with seconds',
      description: 'Enable ampm and seconds through timeSteps just like MUI time views.',
      preview: () => (
        <DateTimePicker
          label="Audit timestamp"
          defaultValue={new Date(2026, 4, 23, 21, 15, 30)}
          ampm
          timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
          format="MM/dd/yyyy hh:mm:ss a"
        />
      ),
      code: `<DateTimePicker
  ampm
  timeSteps={{ hours: 1, minutes: 5, seconds: 15 }}
  format="MM/dd/yyyy hh:mm:ss a"
/>`,
    },
  ],
  'color-picker': [
    {
      title: 'Theme color editor',
      description: 'Compose area, hue, alpha and swatch controls for theme builder surfaces.',
      preview: () => (
        <ColorPicker.Root defaultValue={{ h: 236, s: 72, v: 86, a: 0.85 }} className="w-72 rounded-lg border border-border bg-card p-3">
          <ColorPicker.Area />
          <div className="mt-3 grid gap-3">
            <ColorPicker.HueSlider />
            <ColorPicker.AlphaSlider />
            <div className="flex items-center gap-2 text-sm">
              <ColorPicker.Swatch />
              Primary accent
            </div>
          </div>
        </ColorPicker.Root>
      ),
      code: `<ColorPicker.Root defaultValue={{ h: 236, s: 72, v: 86, a: 0.85 }}>
  <ColorPicker.Area />
  <ColorPicker.HueSlider />
  <ColorPicker.AlphaSlider />
  <ColorPicker.Swatch />
</ColorPicker.Root>`,
    },
  ],
  'file-upload': [
    {
      title: 'Upload constraints',
      description: 'FileUpload supports multiple files, accept filters, max size and max count.',
      preview: () => (
        <FileUpload.Root multiple accept="image/*,.pdf" maxFiles={3} maxSize={1024 * 1024 * 5} className="w-full max-w-md">
          <FileUpload.Dropzone>
            <FileText className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload PDFs or images up to 5 MB</span>
          </FileUpload.Dropzone>
          <FileUpload.Input />
          <FileUpload.List />
        </FileUpload.Root>
      ),
      code: `<FileUpload.Root multiple accept="image/*,.pdf" maxFiles={3} maxSize={1024 * 1024 * 5}>
  <FileUpload.Dropzone />
  <FileUpload.Input />
  <FileUpload.List />
</FileUpload.Root>`,
    },
  ],
  'scroll-area': [
    {
      title: 'Long activity feed',
      description: 'ScrollArea keeps long content usable with themeable scrollbars.',
      preview: () => (
        <ScrollArea.Root className="h-64 w-full max-w-md rounded-md border border-border">
          <div className="grid gap-2 p-3">
            {projectRows.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-3 rounded-md bg-muted/40 px-3 py-2 text-sm">
                <span>{row.project}</span>
                <Badge variant={row.status === 'Blocked' ? 'destructive' : row.status === 'Review' ? 'warning' : 'secondary'}>
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      ),
      code: `<ScrollArea.Root className="h-64">
  {items.map((item) => <div key={item.id}>{item.label}</div>)}
  <ScrollArea.Scrollbar />
</ScrollArea.Root>`,
    },
  ],
  toolbar: [
    {
      title: 'Editor toolbar',
      description: 'Toolbar groups commands, links and separators with roving focus behavior.',
      preview: () => (
        <Toolbar.Root aria-label="Editor toolbar">
          <Toolbar.Button aria-label="Bold"><strong>B</strong></Toolbar.Button>
          <Toolbar.Button aria-label="Italic"><em>I</em></Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button><Copy className="h-4 w-4" /> Copy</Toolbar.Button>
          <Toolbar.Link href="#">Docs</Toolbar.Link>
        </Toolbar.Root>
      ),
      code: `<Toolbar.Root>
  <Toolbar.Button aria-label="Bold"><strong>B</strong></Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Copy</Toolbar.Button>
  <Toolbar.Link href="#">Docs</Toolbar.Link>
</Toolbar.Root>`,
    },
  ],
  resizable: [
    {
      title: 'Dashboard panels',
      description: 'Resizable panels support horizontal and vertical groups with keyboard handles.',
      preview: () => (
        <Resizable.Group className="h-56 w-full max-w-lg rounded-md border border-border">
          <Resizable.Panel id="nav" defaultSize={28} className="grid place-items-center text-sm">
            Navigation
          </Resizable.Panel>
          <Resizable.Handle between={['nav', 'main']} withHandle />
          <Resizable.Panel id="main" defaultSize={72} className="grid place-items-center text-sm">
            Main panel
          </Resizable.Panel>
        </Resizable.Group>
      ),
      code: `<Resizable.Group>
  <Resizable.Panel id="nav" defaultSize={28}>Navigation</Resizable.Panel>
  <Resizable.Handle between={['nav', 'main']} withHandle />
  <Resizable.Panel id="main" defaultSize={72}>Main panel</Resizable.Panel>
</Resizable.Group>`,
    },
  ],
  carousel: [
    {
      title: 'Content carousel',
      description: 'Carousel supports looping content cards with previous and next controls.',
      preview: () => (
        <Carousel.Root className="w-full max-w-md">
          <Carousel.Content>
            {['Design tokens', 'Accessible primitives', 'Playground coverage', 'Docs examples'].map((item, index) => (
              <Carousel.Item key={item}>
                <div className="grid h-40 place-items-center rounded-lg bg-muted p-6 text-center">
                  <div>
                    <div className="text-2xl font-semibold">{index + 1}</div>
                    <div className="text-sm text-muted-foreground">{item}</div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      ),
      code: `<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item>Design tokens</Carousel.Item>
    <Carousel.Item>Accessible primitives</Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>`,
    },
  ],
  tree: [
    {
      title: 'Large file tree',
      description: 'Tree handles nested groups, expanded state and keyboard navigation.',
      preview: () => (
        <Tree.Root defaultExpanded={['src', 'docs']} className="w-full max-w-sm text-sm">
          {files.map((folder) => (
            <Tree.Item key={folder.id} id={folder.id} hasChildren>
              <Tree.Trigger hasChildren>
                <Folder className="h-4 w-4" />
                {folder.label}
              </Tree.Trigger>
              <Tree.Group>
                {folder.children.map((file) => (
                  <Tree.Item key={file} id={`${folder.id}-${file}`}>
                    <Tree.Trigger hasChildren={false}>
                      <FileText className="h-4 w-4" />
                      {file}
                    </Tree.Trigger>
                  </Tree.Item>
                ))}
              </Tree.Group>
            </Tree.Item>
          ))}
        </Tree.Root>
      ),
      code: `<Tree.Root defaultExpanded={['src']}>
  <Tree.Item id="src" hasChildren>
    <Tree.Trigger hasChildren>src</Tree.Trigger>
    <Tree.Group>
      <Tree.Item id="src-app"><Tree.Trigger hasChildren={false}>app.tsx</Tree.Trigger></Tree.Item>
    </Tree.Group>
  </Tree.Item>
</Tree.Root>`,
    },
  ],
  editable: [
    {
      title: 'Inline editing states',
      description: 'Editable swaps preview and input surfaces for titles, labels and metadata.',
      preview: () => (
        <div className="grid w-full max-w-sm gap-3">
          <Editable.Root defaultValue="Q2 growth report">
            <Editable.Preview />
            <Editable.Input aria-label="Report title" />
          </Editable.Root>
          <Editable.Root defaultValue="Click to rename" submitMode="enter">
            <Editable.Preview />
            <Editable.Input aria-label="Workspace name" />
          </Editable.Root>
        </div>
      ),
      code: `<Editable.Root defaultValue="Q2 growth report">
  <Editable.Preview />
  <Editable.Input aria-label="Report title" />
</Editable.Root>`,
    },
  ],
  'tags-input': [
    {
      title: 'Tag collection',
      description: 'TagsInput supports existing tags, rendered chips, input entry and max-tag workflows.',
      preview: () => (
        <TagsInput.Root defaultValue={['react', 'tailwind', 'storybook']} maxTags={6} className="w-full max-w-md">
          <TagsInput.Items>
            {(tag, index) => <TagsInput.Tag key={tag} index={index} tag={tag} />}
          </TagsInput.Items>
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Root>
      ),
      code: `<TagsInput.Root defaultValue={['react', 'tailwind']} maxTags={6}>
  <TagsInput.Items>
    {(tag, index) => <TagsInput.Tag key={tag} index={index} tag={tag} />}
  </TagsInput.Items>
  <TagsInput.Input placeholder="Add tag..." />
</TagsInput.Root>`,
    },
  ],
  mentions: [
    {
      title: 'People mention textarea',
      description: 'Mentions connects a textarea with filtered suggestions and custom item rendering.',
      preview: () => <MentionsPeopleExample />,
      code: `<Mentions.Root>
  <Mentions.Textarea placeholder="Try @ada..." />
  <Mentions.Suggestions items={people}>
    <Mentions.Items>
      {(item, index) => (
        <Mentions.Item key={item.id} suggestion={item} index={index}>
          @{item.label}
        </Mentions.Item>
      )}
    </Mentions.Items>
  </Mentions.Suggestions>
</Mentions.Root>`,
    },
  ],
  'data-table': [
    {
      title: 'Large sortable table',
      description: 'DataTable handles sorting, filtering, pagination, selection and virtualization with typed data.',
      preview: () => (
        <DataTable
          columns={projectColumns}
          data={projectRows}
          enableSorting
          enableFiltering
          enablePagination
          enableRowSelection
          virtual={{ estimatedRowHeight: 44, overscan: 8 }}
          pageSize={8}
          className="w-full max-w-3xl"
        />
      ),
      code: `<DataTable
  columns={columns}
  data={rows}
  enableSorting
  enableFiltering
  enablePagination
  enableRowSelection
  virtual={{ estimatedRowHeight: 44, overscan: 8 }}
  pageSize={8}
/>`,
    },
  ],
};

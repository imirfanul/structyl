import * as React from 'react';
import { Bell, Mail, Search, Settings, Star } from '@aura-ui/icons';
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Collapsible,
  ColorPicker,
  Combobox,
  Command,
  ContextMenu,
  DatePicker,
  DateRangePicker,
  Drawer,
  DropdownMenu,
  Editable,
  FileUpload,
  HoverCard,
  Input,
  Label,
  Mentions,
  Menubar,
  NavigationMenu,
  NumberField,
  OneTimePasswordField,
  Pagination,
  PasswordToggleField,
  Popover,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Sheet,
  Stepper,
  Tabs,
  TagsInput,
  TimePicker,
  Toast,
  ToggleGroup,
  Toolbar,
  Tooltip,
  Tree,
} from '@aura-ui/styled';

const frameworks = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

export function AccordionStory() {
  return (
    <Accordion.Root type="single" collapsible className="w-full max-w-md">
      {[
        { value: 'accessibility', label: 'Accessibility', body: 'Keyboard navigation and ARIA state are built in.' },
        { value: 'theming', label: 'Theming', body: 'Styles are composed from CSS-variable-backed Tailwind tokens.' },
        { value: 'composition', label: 'Composition', body: 'Use asChild to compose triggers with your own elements.' },
      ].map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Trigger>{item.label}</Accordion.Trigger>
          <Accordion.Content className="text-sm text-muted-foreground">{item.body}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export function AlertStory() {
  return (
    <div className="grid max-w-lg gap-3">
      <Alert.Root>
        <Alert.Title>Deployment started</Alert.Title>
        <Alert.Description>Production will update after the checks finish.</Alert.Description>
      </Alert.Root>
      <Alert.Root variant="destructive">
        <Alert.Title>Payment failed</Alert.Title>
        <Alert.Description>Update the billing method before the next retry.</Alert.Description>
      </Alert.Root>
    </div>
  );
}

export function AlertDialogStory() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete this project?</AlertDialog.Title>
            <AlertDialog.Description>
              This removes the project and its deployments permanently.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export function AvatarStory() {
  return (
    <div className="flex items-center gap-3">
      <Avatar.Root>
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/96?img=47" alt="Grace Hopper" />
        <Avatar.Fallback>GH</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>MT</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

export function BreadcrumbStory() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Library</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Components</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

export function CardStory() {
  return (
    <Card.Root className="max-w-sm">
      <Card.Header>
        <Card.Title>Team plan</Card.Title>
        <Card.Description>Shared components, tokens, and docs in one workspace.</Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="card-team">Team name</Label>
          <Input id="card-team" defaultValue="Design Systems" />
        </div>
      </Card.Content>
      <Card.Footer className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export function CarouselStory() {
  return (
    <Carousel.Root className="max-w-sm">
      <Carousel.Content>
        {['Tokens', 'Primitives', 'Patterns'].map((label, index) => (
          <Carousel.Item key={label}>
            <div className="flex h-36 items-center justify-center rounded-md bg-muted text-2xl font-semibold">
              {index + 1}. {label}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  );
}

export function CollapsibleStory() {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="w-full max-w-md">
      <Collapsible.Trigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Release notes
          <span aria-hidden="true">{open ? '-' : '+'}</span>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content className="mt-2 rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Added keyboard support, reduced motion handling, and token-based component styling.
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function ColorPickerStory() {
  return (
    <ColorPicker.Root defaultValue={{ h: 235, s: 70, v: 85, a: 1 }} className="rounded-md border border-border bg-card">
      <ColorPicker.Area />
      <ColorPicker.HueSlider />
      <ColorPicker.AlphaSlider />
      <ColorPicker.Swatch role="img" aria-label="Selected color" />
    </ColorPicker.Root>
  );
}

export function ComboboxStory() {
  return (
    <Combobox.Root>
      <Combobox.Input placeholder="Search frameworks" className="w-[260px]" />
      <Combobox.Content>
        {frameworks.map((framework) => (
          <Combobox.Item key={framework} value={framework.toLowerCase()}>
            {framework}
          </Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Root>
  );
}

export function CommandStory() {
  return (
    <Command.Root className="max-w-md rounded-md border border-border shadow-sm">
      <Command.Input placeholder="Type a command or search" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>
            <Search className="mr-2 h-4 w-4" />
            Search
            <Command.Shortcut>Ctrl K</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <Star className="mr-2 h-4 w-4" />
            Favorites
          </Command.Item>
          <Command.Item>
            <Mail className="mr-2 h-4 w-4" />
            Inbox
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
}

export function ContextMenuStory() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="flex h-36 w-full max-w-md items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground">
        Right-click inside this area
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

export function DatePickerStory() {
  return (
    <DatePicker.Root defaultValue={new Date(2026, 1, 10)}>
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker.Root>
  );
}

export function DateRangePickerStory() {
  return (
    <DateRangePicker.Root defaultValue={{ from: new Date(2026, 1, 10), to: new Date(2026, 1, 17) }}>
      <DateRangePicker.Trigger />
      <DateRangePicker.Content />
    </DateRangePicker.Root>
  );
}

export function DrawerStory() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Confirm deployment</Drawer.Title>
          <Drawer.Description>Review the production deploy before continuing.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Button>Deploy</Button>
          <Drawer.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export function DropdownMenuStory() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Workspace</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          Settings
          <DropdownMenu.Shortcut>Ctrl ,</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Inbox
          <DropdownMenu.Shortcut>Ctrl I</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function EditableStory() {
  return (
    <Editable.Root defaultValue="Double-click to edit" className="w-full max-w-sm">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  );
}

export function FileUploadStory() {
  return (
    <FileUpload.Root multiple maxFiles={3} className="w-full max-w-md">
      <FileUpload.Dropzone>
        <div className="grid gap-1 text-center">
          <span className="text-sm font-medium">Drop files here</span>
          <span className="text-xs text-muted-foreground">or click to browse</span>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.Input />
    </FileUpload.Root>
  );
}

export function HoverCardStory() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a href="#" className="text-sm font-medium underline underline-offset-4">
          @aura-ui
        </a>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div className="flex items-start gap-3">
          <Avatar.Root>
            <Avatar.Fallback>AU</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <h4 className="text-sm font-semibold">@aura-ui</h4>
            <p className="text-xs text-muted-foreground">Accessible React components with Tailwind styling.</p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

export function MentionsStory() {
  return (
    <Mentions.Root defaultValue="Loop in @a" className="w-full max-w-md">
      <Mentions.Textarea placeholder="Try typing @ada" rows={3} />
      <Mentions.Suggestions
        items={[
          { id: '1', label: 'ada' },
          { id: '2', label: 'grace' },
          { id: '3', label: 'alan' },
        ]}
      >
        <div className="rounded-md border border-border bg-popover p-1 shadow-md">
          <Mentions.Items>
            {(item, index, highlighted) => (
              <Mentions.Item key={item.id} suggestion={item} index={index}>
                <div
                  className={[
                    'cursor-pointer rounded-sm px-2 py-1.5 text-sm',
                    highlighted ? 'bg-accent text-accent-foreground' : 'text-popover-foreground',
                  ].join(' ')}
                >
                  @{item.label}
                </div>
              </Mentions.Item>
            )}
          </Mentions.Items>
        </div>
      </Mentions.Suggestions>
    </Mentions.Root>
  );
}

export function MenubarStory() {
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New file</Menubar.Item>
          <Menubar.Item>Open</Menubar.Item>
          <Menubar.Item>Save</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
          <Menubar.Item>Redo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Reload</Menubar.Item>
          <Menubar.Item>Force reload</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}

export function NavigationMenuStory() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div className="grid w-64 gap-2 p-3">
              <NavigationMenu.Link href="#" className="rounded-sm p-2 text-sm hover:bg-accent">
                Components
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#" className="rounded-sm p-2 text-sm hover:bg-accent">
                Theming
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="resources">
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="community">
          <NavigationMenu.Trigger>Community</NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

export function NumberFieldStory() {
  return (
    <NumberField.Root defaultValue={5} min={0} max={20}>
      <NumberField.DecrementTrigger />
      <NumberField.Input aria-label="Seats" />
      <NumberField.IncrementTrigger />
    </NumberField.Root>
  );
}

export function OneTimePasswordFieldStory() {
  return (
    <OneTimePasswordField.Root length={6} defaultValue="123">
      {Array.from({ length: 6 }, (_, index) => (
        <OneTimePasswordField.Input key={index} index={index} aria-label={`Digit ${index + 1}`} />
      ))}
    </OneTimePasswordField.Root>
  );
}

export function PaginationStory() {
  const [page, setPage] = React.useState(2);

  return (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous onClick={() => setPage((current) => Math.max(1, current - 1))} />
        </Pagination.Item>
        {[1, 2, 3].map((item) => (
          <Pagination.Item key={item}>
            <Pagination.Link isActive={page === item} onClick={() => setPage(item)}>
              {item}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next onClick={() => setPage((current) => Math.min(3, current + 1))} />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  );
}

export function PasswordToggleFieldStory() {
  return (
    <PasswordToggleField.Root className="w-full max-w-sm">
      <PasswordToggleField.Input placeholder="Enter your password" />
      <PasswordToggleField.Toggle />
    </PasswordToggleField.Root>
  );
}

export function PopoverStory() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="Layer settings">
        <div className="grid gap-2">
          <h4 className="text-sm font-medium">Dimensions</h4>
          <p className="text-xs text-muted-foreground">Set width and height for the layer.</p>
          <div className="mt-2 grid grid-cols-3 items-center gap-2">
            <Label htmlFor="popover-width" className="text-xs">
              Width
            </Label>
            <Input id="popover-width" defaultValue="100%" className="col-span-2 h-7 text-xs" />
            <Label htmlFor="popover-height" className="text-xs">
              Height
            </Label>
            <Input id="popover-height" defaultValue="25px" className="col-span-2 h-7 text-xs" />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

export function RadioGroupStory() {
  return (
    <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
      {([
        ['compact', 'Compact'],
        ['comfortable', 'Comfortable'],
        ['spacious', 'Spacious'],
      ] satisfies [string, string][]).map(([value, label]) => (
        <label key={value} className="flex items-center gap-2 text-sm">
          <RadioGroup.Item value={value} />
          {label}
        </label>
      ))}
    </RadioGroup.Root>
  );
}

export function ResizableStory() {
  return (
    <Resizable.Group className="h-36 max-w-lg overflow-hidden rounded-md border border-border">
      <Resizable.Panel id="preview" defaultSize={45} className="flex items-center justify-center bg-muted/30 text-sm">
        Preview
      </Resizable.Panel>
      <Resizable.Handle between={['preview', 'details']} withHandle />
      <Resizable.Panel id="details" defaultSize={55} className="flex items-center justify-center text-sm">
        Details
      </Resizable.Panel>
    </Resizable.Group>
  );
}

export function ScrollAreaStory() {
  return (
    <ScrollArea.Root className="h-40 w-64 rounded-md border border-border">
      <div className="space-y-1 p-3">
        {Array.from({ length: 24 }, (_, index) => (
          <div key={index} className="rounded-sm px-2 py-1 text-sm hover:bg-accent">
            Item {index + 1}
          </div>
        ))}
      </div>
      <ScrollArea.Scrollbar />
    </ScrollArea.Root>
  );
}

export function SelectStory() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger aria-label="Fruit" className="w-[220px]">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
        <Select.Separator />
        <Select.Item value="grape">Grape</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export function SheetStory() {
  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button variant="outline">Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>Update account details and notification preferences.</Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-3 py-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Ada Lovelace" />
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close asChild>
            <Button>Save changes</Button>
          </Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
}

export function StepperStory() {
  return (
    <Stepper.Root activeStep={1} className="max-w-lg">
      <Stepper.Step index={0}>
        <Stepper.Title>Account</Stepper.Title>
      </Stepper.Step>
      <Stepper.Separator />
      <Stepper.Step index={1}>
        <Stepper.Title>Profile</Stepper.Title>
      </Stepper.Step>
      <Stepper.Separator />
      <Stepper.Step index={2}>
        <Stepper.Title>Billing</Stepper.Title>
      </Stepper.Step>
    </Stepper.Root>
  );
}

export function TabsStory() {
  return (
    <Tabs.Root defaultValue="account" className="w-full max-w-md">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="p-3 text-sm text-muted-foreground">
        Make changes to your account here.
      </Tabs.Content>
      <Tabs.Content value="password" className="p-3 text-sm text-muted-foreground">
        Update your password and recovery methods.
      </Tabs.Content>
      <Tabs.Content value="billing" className="p-3 text-sm text-muted-foreground">
        Manage invoices and seats.
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function TagsInputStory() {
  const [tags, setTags] = React.useState(['react', 'tailwind']);

  return (
    <TagsInput.Root value={tags} onValueChange={setTags} className="w-full max-w-md">
      <TagsInput.Items>
        {(tag, index) => <TagsInput.Tag key={tag} index={index} tag={tag} />}
      </TagsInput.Items>
      <TagsInput.Input placeholder="Add tags" />
    </TagsInput.Root>
  );
}

export function TimePickerStory() {
  return (
    <TimePicker.Root defaultValue={{ hour: 10, minute: 30 }} aria-label="Start time">
      <TimePicker.Segment segment="hour" />
      <TimePicker.Separator />
      <TimePicker.Segment segment="minute" />
    </TimePicker.Root>
  );
}

export function ToastStory() {
  const [open, setOpen] = React.useState(true);

  return (
    <Toast.Provider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast.Root open={open} onOpenChange={setOpen} duration={6000}>
        <Toast.Title>Scheduled</Toast.Title>
        <Toast.Description>Design review is queued for Friday at 5:00 PM.</Toast.Description>
        <Toast.Close />
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

export function ToggleGroupStory() {
  return (
    <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Formatting">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        B
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        I
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        U
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export function ToolbarStory() {
  return (
    <Toolbar.Root aria-label="Editor toolbar">
      <Toolbar.Button aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Settings">
        <Settings className="h-4 w-4" />
      </Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Done</Toolbar.Button>
    </Toolbar.Root>
  );
}

export function TooltipStory() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Subtle and snappy.</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function TreeStory() {
  return (
    <Tree.Root defaultExpanded={['src', 'components']} className="text-sm">
      <Tree.Item id="src" hasChildren>
        <Tree.Trigger hasChildren>src</Tree.Trigger>
        <Tree.Group>
          <Tree.Item id="index">
            <Tree.Trigger hasChildren={false}>index.ts</Tree.Trigger>
          </Tree.Item>
          <Tree.Item id="app">
            <Tree.Trigger hasChildren={false}>App.tsx</Tree.Trigger>
          </Tree.Item>
          <Tree.Item id="components" hasChildren>
            <Tree.Trigger hasChildren>components</Tree.Trigger>
            <Tree.Group>
              <Tree.Item id="button">
                <Tree.Trigger hasChildren={false}>Button.tsx</Tree.Trigger>
              </Tree.Item>
            </Tree.Group>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}

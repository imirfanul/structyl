import { useState, useRef } from 'react';
import { Moon, Sun, Bell, Mail, Settings, Star, Search } from '@aura-ui/icons';
import {
  Button,
  Checkbox,
  Dialog,
  Label,
  Separator,
  Switch,
  Toggle,
  // Phase B
  AspectRatio,
  Avatar,
  Progress,
  Skeleton,
  Badge,
  Card,
  Spinner,
  Alert,
  // Phase C
  Input,
  Textarea,
  RadioGroup,
  ToggleGroup,
  Slider,
  Form,
  // Phase D
  Collapsible,
  Accordion,
  Tabs,
  Breadcrumb,
  Pagination,
  Stepper,
  // Phase E
  AlertDialog,
  Sheet,
  Drawer,
  Popover,
  Tooltip,
  HoverCard,
  Toast,
  // Phase F
  DropdownMenu,
  ContextMenu,
  Menubar,
  NavigationMenu,
  Select,
  Combobox,
  Command,
  // Phase G
  OneTimePasswordField,
  PasswordToggleField,
  NumberField,
  Calendar,
  DatePicker,
  TimePicker,
  DateRangePicker,
  ColorPicker,
  FileUpload,
  // Phase H
  CircularProgress,
  Meter,
  ScrollArea,
  Toolbar,
  Resizable,
  Carousel,
  Tree,
  Editable,
  TagsInput,
  Mentions,
  CopyButton,
} from '@aura-ui/styled';
import { useTheme } from '@aura-ui/themes';
import {
  DataTable,
  DataTableToolbar,
  DataTableColumnVisibility,
  exportToCSV,
  type DataTableColumn,
  type Table,
} from '@aura-ui/data-table';

type User = { id: number; name: string; email: string; role: string };
const sampleData: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' },
  { id: 4, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Viewer' },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Admin' },
];
const columns: DataTableColumn<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

const sections = [
  'Foundations',
  'Atoms (Phase B)',
  'Form basics (Phase C)',
  'Disclosure & nav (Phase D)',
  'Overlays (Phase E)',
  'Complex compound (Phase F)',
  'Specialty form (Phase G)',
  'Feedback & misc (Phase H)',
  'DataTable (Phase I)',
];

export default function App() {
  const { theme, setTheme, resolvedMode, setMode, themes } = useTheme();
  const [active, setActive] = useState(0);
  const tableRef = useRef<Table<User> | null>(null);

  return (
    <Toast.Provider>
      <Tooltip.Provider>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/80 px-6 py-3 backdrop-blur">
            <div>
              <h1 className="text-lg font-semibold">aura-ui playground</h1>
              <p className="text-xs text-muted-foreground">All ~70 components, themed.</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="h-9 rounded-md border border-input bg-bg px-3 text-sm"
              >
                {themes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
              >
                {resolvedMode === 'dark' ? <Sun /> : <Moon />}
              </Button>
            </div>
          </header>

          <div className="mx-auto flex max-w-7xl gap-6 p-6">
            <nav className="sticky top-20 h-fit w-56 shrink-0 space-y-1 text-sm">
              {sections.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActive(i)}
                  className={`block w-full rounded px-3 py-1.5 text-left ${
                    active === i ? 'bg-accent font-medium' : 'hover:bg-accent/50 text-muted-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </nav>

            <main className="min-w-0 flex-1 space-y-10">
              {active === 0 && <Foundations />}
              {active === 1 && <AtomsSection />}
              {active === 2 && <FormBasics />}
              {active === 3 && <Disclosure />}
              {active === 4 && <Overlays />}
              {active === 5 && <Compound />}
              {active === 6 && <SpecialtyForm />}
              {active === 7 && <FeedbackMisc />}
              {active === 8 && <DataTableDemo tableRef={tableRef} />}
            </main>
          </div>
        </div>
        <Toast.Viewport />
      </Tooltip.Provider>
    </Toast.Provider>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
      <div className="rounded-lg border border-border bg-bg p-6">{children}</div>
    </section>
  );
}

function Foundations() {
  const [switchOn, setSwitchOn] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Section title="Button">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Settings"><Settings /></Button>
        </div>
      </Section>
      <Section title="Switch / Toggle / Checkbox">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="sw" />
            <Label htmlFor="sw">Notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb" />
            <Label htmlFor="cb">Accept terms</Label>
          </div>
          <Toggle pressed={pressed} onPressedChange={setPressed}>Bold</Toggle>
        </div>
      </Section>
      <Section title="Label & Separator">
        <Label>Inline label</Label>
        <div className="my-3"><Separator /></div>
        <span className="inline-flex items-center gap-2 text-sm">
          A <Separator className="h-4 w-px" /> B <Separator className="h-4 w-px" /> C
        </span>
      </Section>
    </>
  );
}

function AtomsSection() {
  return (
    <>
      <Section title="AspectRatio">
        <div className="max-w-sm">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center bg-accent text-sm">16 : 9</div>
          </AspectRatio>
        </div>
      </Section>
      <Section title="Avatar">
        <div className="flex gap-3">
          <Avatar.Root><Avatar.Image src="https://i.pravatar.cc/80?img=1" alt="" /><Avatar.Fallback>AD</Avatar.Fallback></Avatar.Root>
          <Avatar.Root><Avatar.Fallback>JS</Avatar.Fallback></Avatar.Root>
        </div>
      </Section>
      <Section title="Progress"><Progress value={62} /></Section>
      <Section title="Skeleton">
        <div className="space-y-2"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-3/4" /></div>
      </Section>
      <Section title="Badge">
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </Section>
      <Section title="Card">
        <Card.Root className="max-w-sm">
          <Card.Header><Card.Title>Project</Card.Title><Card.Description>An overview.</Card.Description></Card.Header>
          <Card.Content><p className="text-sm">Body content here.</p></Card.Content>
          <Card.Footer><Button size="sm">Action</Button></Card.Footer>
        </Card.Root>
      </Section>
      <Section title="Spinner">
        <div className="flex items-center gap-3">
          <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" /><Spinner size="xl" />
        </div>
      </Section>
      <Section title="Alert">
        <div className="space-y-2">
          <Alert.Root><Alert.Title>Heads up</Alert.Title><Alert.Description>This is an info alert.</Alert.Description></Alert.Root>
          <Alert.Root variant="destructive"><Alert.Title>Error</Alert.Title><Alert.Description>Something broke.</Alert.Description></Alert.Root>
          <Alert.Root variant="success"><Alert.Title>Success</Alert.Title><Alert.Description>All good.</Alert.Description></Alert.Root>
        </div>
      </Section>
    </>
  );
}

function FormBasics() {
  const [radio, setRadio] = useState('a');
  const [tg, setTg] = useState<string[]>(['bold']);
  const [slider, setSlider] = useState([40]);
  return (
    <>
      <Section title="Input">
        <div className="grid max-w-sm gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@example.com" /></div>
      </Section>
      <Section title="Textarea">
        <Textarea placeholder="Tell us about yourself…" className="max-w-md" />
      </Section>
      <Section title="RadioGroup">
        <RadioGroup.Root value={radio} onValueChange={setRadio} className="grid gap-2">
          {['a', 'b', 'c'].map((v) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroup.Item value={v} id={`r-${v}`} /><Label htmlFor={`r-${v}`}>Option {v.toUpperCase()}</Label>
            </div>
          ))}
        </RadioGroup.Root>
      </Section>
      <Section title="ToggleGroup">
        <ToggleGroup.Root type="multiple" value={tg} onValueChange={setTg}>
          <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
          <ToggleGroup.Item value="italic"><span className="italic">I</span></ToggleGroup.Item>
          <ToggleGroup.Item value="underline"><span className="underline">U</span></ToggleGroup.Item>
        </ToggleGroup.Root>
      </Section>
      <Section title="Slider">
        <Slider value={slider} onValueChange={setSlider} max={100} className="max-w-md" />
        <p className="mt-2 text-xs text-muted-foreground">Value: {slider[0]}</p>
      </Section>
      <Section title="Form">
        <Form.Root className="max-w-md" onSubmit={(e) => { e.preventDefault(); alert('submitted'); }}>
          <Form.Field name="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required placeholder="you@example.com" />
            <Form.Message match="valueMissing" />
            <Form.Message match="typeMismatch" />
          </Form.Field>
          <Form.Submit asChild><Button>Submit</Button></Form.Submit>
        </Form.Root>
      </Section>
    </>
  );
}

function Disclosure() {
  const [collOpen, setCollOpen] = useState(false);
  const [page, setPage] = useState(1);
  return (
    <>
      <Section title="Collapsible">
        <Collapsible.Root open={collOpen} onOpenChange={setCollOpen}>
          <Collapsible.Trigger asChild><Button variant="outline">{collOpen ? 'Hide' : 'Show'} details</Button></Collapsible.Trigger>
          <Collapsible.Content className="mt-2 rounded-md border border-border p-3 text-sm">
            Hidden content revealed.
          </Collapsible.Content>
        </Collapsible.Root>
      </Section>
      <Section title="Accordion">
        <Accordion.Root type="single" collapsible>
          {['One', 'Two', 'Three'].map((t, i) => (
            <Accordion.Item key={t} value={`v${i}`}>
              <Accordion.Trigger>Section {t}</Accordion.Trigger>
              <Accordion.Content>Content for {t}.</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section>
      <Section title="Tabs">
        <Tabs.Root defaultValue="acc">
          <Tabs.List>
            <Tabs.Trigger value="acc">Account</Tabs.Trigger>
            <Tabs.Trigger value="pwd">Password</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="acc">Account settings here.</Tabs.Content>
          <Tabs.Content value="pwd">Change your password.</Tabs.Content>
        </Tabs.Root>
      </Section>
      <Section title="Breadcrumb">
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item><Breadcrumb.Link href="#">Home</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Link href="#">Library</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Page>Components</Breadcrumb.Page></Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Section>
      <Section title="Pagination">
        <Pagination.Root>
          <Pagination.Content>
            <Pagination.Item><Pagination.Previous onClick={() => setPage((p) => Math.max(1, p - 1))} /></Pagination.Item>
            {[1, 2, 3].map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={page === p} onClick={() => setPage(p)}>{p}</Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item><Pagination.Next onClick={() => setPage((p) => Math.min(3, p + 1))} /></Pagination.Item>
          </Pagination.Content>
        </Pagination.Root>
      </Section>
      <Section title="Stepper">
        <Stepper.Root activeStep={1}>
          <Stepper.Step index={0} /><Stepper.Separator />
          <Stepper.Step index={1} /><Stepper.Separator />
          <Stepper.Step index={2} />
        </Stepper.Root>
      </Section>
    </>
  );
}

function Overlays() {
  const [toastOpen, setToastOpen] = useState(false);
  return (
    <>
      <Section title="Dialog">
        <Dialog.Root>
          <Dialog.Trigger asChild><Button>Open dialog</Button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header><Dialog.Title>Confirm action</Dialog.Title><Dialog.Description>This is a dialog.</Dialog.Description></Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
                <Dialog.Close asChild><Button>OK</Button></Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Section>
      <Section title="AlertDialog">
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild><Button variant="destructive">Delete</Button></AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header><AlertDialog.Title>Are you sure?</AlertDialog.Title><AlertDialog.Description>This cannot be undone.</AlertDialog.Description></AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Section>
      <Section title="Sheet">
        <Sheet.Root>
          <Sheet.Trigger asChild><Button variant="outline">Open sheet (right)</Button></Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header><Sheet.Title>Sheet</Sheet.Title><Sheet.Description>Side-slide overlay.</Sheet.Description></Sheet.Header>
          </Sheet.Content>
        </Sheet.Root>
      </Section>
      <Section title="Drawer">
        <Drawer.Root>
          <Drawer.Trigger asChild><Button variant="outline">Open drawer</Button></Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header><Drawer.Title>Drawer</Drawer.Title><Drawer.Description>Bottom-sheet.</Drawer.Description></Drawer.Header>
          </Drawer.Content>
        </Drawer.Root>
      </Section>
      <Section title="Popover">
        <Popover.Root>
          <Popover.Trigger asChild><Button variant="outline">Open popover</Button></Popover.Trigger>
          <Popover.Content>Popover content with arbitrary children.</Popover.Content>
        </Popover.Root>
      </Section>
      <Section title="Tooltip">
        <Tooltip.Root>
          <Tooltip.Trigger asChild><Button variant="outline">Hover me</Button></Tooltip.Trigger>
          <Tooltip.Content>Tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Section>
      <Section title="HoverCard">
        <HoverCard.Root>
          <HoverCard.Trigger asChild><a className="underline" href="#">@username</a></HoverCard.Trigger>
          <HoverCard.Content>Profile preview content.</HoverCard.Content>
        </HoverCard.Root>
      </Section>
      <Section title="Toast">
        <Button onClick={() => setToastOpen(true)}>Show toast</Button>
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
          <Toast.Title>Saved</Toast.Title>
          <Toast.Description>Your changes have been saved.</Toast.Description>
          <Toast.Close />
        </Toast.Root>
      </Section>
    </>
  );
}

function Compound() {
  return (
    <>
      <Section title="DropdownMenu">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild><Button variant="outline">Open menu</Button></DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>My account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Billing</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Section>
      <Section title="ContextMenu">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="block rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Right-click here
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </Section>
      <Section title="Menubar">
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
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
        </Menubar.Root>
      </Section>
      <Section title="NavigationMenu">
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="docs"><NavigationMenu.Trigger>Docs</NavigationMenu.Trigger></NavigationMenu.Item>
            <NavigationMenu.Item value="learn"><NavigationMenu.Trigger>Learn</NavigationMenu.Trigger></NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Section>
      <Section title="Select">
        <Select.Root>
          <Select.Trigger className="w-[180px]"><Select.Value placeholder="Pick a fruit" /></Select.Trigger>
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
          </Select.Content>
        </Select.Root>
      </Section>
      <Section title="Combobox">
        <Combobox.Root>
          <Combobox.Input placeholder="Search…" className="w-[240px]" />
          <Combobox.Content>
            {['Alpha', 'Beta', 'Gamma'].map((v) => (
              <Combobox.Item key={v} value={v}>{v}</Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Root>
      </Section>
      <Section title="Command palette">
        <Command.Root className="max-w-md rounded-lg border border-border">
          <Command.Input placeholder="Type a command…" />
          <Command.List>
            <Command.Empty>No results.</Command.Empty>
            <Command.Group heading="Suggestions">
              <Command.Item><Search className="mr-2 h-4 w-4" />Search</Command.Item>
              <Command.Item><Star className="mr-2 h-4 w-4" />Favorite</Command.Item>
              <Command.Item><Mail className="mr-2 h-4 w-4" />Mail</Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Section>
    </>
  );
}

function SpecialtyForm() {
  const [otp, setOtp] = useState('');
  const [num, setNum] = useState<number | undefined>(5);
  const [date, setDate] = useState<Date>();
  return (
    <>
      <Section title="OneTimePasswordField">
        <OneTimePasswordField.Root length={6} value={otp} onValueChange={setOtp}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <OneTimePasswordField.Input key={i} index={i} />
          ))}
        </OneTimePasswordField.Root>
      </Section>
      <Section title="PasswordToggleField">
        <PasswordToggleField.Root className="max-w-sm">
          <PasswordToggleField.Input placeholder="Password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </Section>
      <Section title="NumberField">
        <NumberField.Root value={num} onValueChange={setNum} min={0} max={20}>
          <NumberField.DecrementTrigger />
          <NumberField.Input />
          <NumberField.IncrementTrigger />
        </NumberField.Root>
      </Section>
      <Section title="Calendar"><Calendar mode="single" /></Section>
      <Section title="DatePicker">
        <DatePicker.Root value={date} onValueChange={setDate}>
          <DatePicker.Trigger />
          <DatePicker.Content />
        </DatePicker.Root>
      </Section>
      <Section title="TimePicker">
        <TimePicker.Root defaultValue={{ hour: 10, minute: 30 }}>
          <TimePicker.Segment segment="hour" />
          <TimePicker.Separator />
          <TimePicker.Segment segment="minute" />
        </TimePicker.Root>
      </Section>
      <Section title="DateRangePicker">
        <DateRangePicker.Root>
          <DateRangePicker.Trigger />
          <DateRangePicker.Content />
        </DateRangePicker.Root>
      </Section>
      <Section title="ColorPicker">
        <ColorPicker.Root>
          <ColorPicker.Area />
          <ColorPicker.HueSlider />
          <ColorPicker.AlphaSlider />
          <ColorPicker.Swatch />
        </ColorPicker.Root>
      </Section>
      <Section title="FileUpload">
        <FileUpload.Root multiple maxFiles={3}>
          <FileUpload.Dropzone />
          <FileUpload.Input />
        </FileUpload.Root>
      </Section>
    </>
  );
}

function FeedbackMisc() {
  const [tags, setTags] = useState<string[]>(['react', 'tailwind']);
  return (
    <>
      <Section title="CircularProgress">
        <div className="flex gap-3">
          <CircularProgress value={null} /><CircularProgress value={30} /><CircularProgress value={75} />
        </div>
      </Section>
      <Section title="Meter">
        <Meter value={45} max={100} low={30} high={70} optimum={50} className="max-w-sm" />
      </Section>
      <Section title="ScrollArea">
        <ScrollArea.Root className="h-32 w-72 rounded-md border border-border">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="px-3 py-1 text-sm">Item {i + 1}</div>
          ))}
        </ScrollArea.Root>
      </Section>
      <Section title="Toolbar">
        <Toolbar.Root>
          <Toolbar.Button><Bell className="h-4 w-4" /></Toolbar.Button>
          <Toolbar.Button>Action</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Done</Toolbar.Button>
        </Toolbar.Root>
      </Section>
      <Section title="Resizable">
        <Resizable.Group className="h-32 rounded-md border border-border">
          <Resizable.Panel id="a" defaultSize={50} className="p-2 text-sm">Panel A</Resizable.Panel>
          <Resizable.Handle between={['a', 'b']} withHandle />
          <Resizable.Panel id="b" defaultSize={50} className="p-2 text-sm">Panel B</Resizable.Panel>
        </Resizable.Group>
      </Section>
      <Section title="Carousel">
        <Carousel.Root className="max-w-md">
          <Carousel.Content>
            {[1, 2, 3].map((i) => (
              <Carousel.Item key={i}>
                <div className="flex h-32 items-center justify-center rounded-md bg-accent text-2xl font-semibold">{i}</div>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      </Section>
      <Section title="Tree">
        <Tree.Root defaultExpanded={['root']}>
          <Tree.Item id="root" hasChildren>
            <Tree.Trigger hasChildren>Root folder</Tree.Trigger>
            <Tree.Group>
              <Tree.Item id="a"><Tree.Trigger hasChildren={false}>file.tsx</Tree.Trigger></Tree.Item>
              <Tree.Item id="b"><Tree.Trigger hasChildren={false}>readme.md</Tree.Trigger></Tree.Item>
            </Tree.Group>
          </Tree.Item>
        </Tree.Root>
      </Section>
      <Section title="Editable">
        <Editable.Root defaultValue="Click to edit">
          <Editable.Preview /><Editable.Input />
        </Editable.Root>
      </Section>
      <Section title="TagsInput">
        <TagsInput.Root value={tags} onValueChange={setTags}>
          <TagsInput.Items>{(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}</TagsInput.Items>
          <TagsInput.Input placeholder="Add tags…" />
        </TagsInput.Root>
      </Section>
      <Section title="Mentions">
        <Mentions.Root>
          <Mentions.Textarea placeholder="Try @ada or @grace" />
          <Mentions.Suggestions
            items={[
              { id: '1', label: 'ada' },
              { id: '2', label: 'grace' },
              { id: '3', label: 'alan' },
            ]}
          >
            <div className="rounded-md border border-border bg-popover p-1 shadow">
              <Mentions.Items>
                {(item, i) => (
                  <Mentions.Item key={item.id} suggestion={item} index={i}>
                    <div className="cursor-pointer rounded px-2 py-1 text-sm">{item.label}</div>
                  </Mentions.Item>
                )}
              </Mentions.Items>
            </div>
          </Mentions.Suggestions>
        </Mentions.Root>
      </Section>
      <Section title="CopyButton">
        <div className="flex items-center gap-2">
          <code className="rounded bg-muted px-2 py-1 text-sm">npm install aura-ui</code>
          <CopyButton value="npm install aura-ui" />
        </div>
      </Section>
    </>
  );
}

function DataTableDemo({ tableRef }: { tableRef: React.MutableRefObject<Table<User> | null> }) {
  return (
    <Section title="DataTable (with toolbar, visibility, CSV export)">
      <DataTable
        columns={columns}
        data={sampleData}
        enableSorting
        enableFiltering
        enableRowSelection
        enablePagination
        enableColumnResizing
        pageSize={3}
        tableRef={tableRef}
      />
      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => tableRef.current && exportToCSV(tableRef.current, 'users.csv')}>
          Export CSV
        </Button>
        {tableRef.current && <DataTableColumnVisibility table={tableRef.current} />}
        {tableRef.current && <DataTableToolbar table={tableRef.current} filterColumnId="name" />}
      </div>
    </Section>
  );
}

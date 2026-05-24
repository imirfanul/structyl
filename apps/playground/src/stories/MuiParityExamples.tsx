import * as React from 'react';
import { Bell, Mail, Search, Settings, Star } from '@aura-ui/icons';
import {
  AppBar,
  Autocomplete,
  Backdrop,
  BottomNavigation,
  Box,
  Button,
  ButtonGroup,
  Chart,
  Chip,
  ClickAwayListener,
  Container,
  CssBaseline,
  FloatingActionButton,
  Grid,
  ImageList,
  InitColorSchemeScript,
  Input,
  Label,
  Link,
  List,
  Masonry,
  Modal,
  NoSsr,
  Paper,
  Popper,
  Portal,
  Rating,
  Snackbar,
  SpeedDial,
  Spinner,
  Stack,
  SvgIcon,
  Table,
  TextareaAutosize,
  Timeline,
  TransferList,
  Transition,
  Typography,
} from '@aura-ui/styled';

const materialOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const imageTiles = [
  {
    label: 'Forest',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=240&h=240&fit=crop',
  },
  {
    label: 'Desert',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=240&h=240&fit=crop',
  },
  {
    label: 'Coast',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=240&h=240&fit=crop',
  },
];

function StorySurface({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid max-w-5xl gap-4">
      <div>
        <Typography variant="h3">{title}</Typography>
        {description ? <Typography variant="muted">{description}</Typography> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function ExamplePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper className="grid min-h-40 place-items-center gap-4 p-5">
      <Typography variant="small" className="text-muted-foreground justify-self-start font-medium">
        {title}
      </Typography>
      <div className="flex w-full items-center justify-center">{children}</div>
    </Paper>
  );
}

export function MuiBoxExamplesStory() {
  return (
    <StorySurface title="Box" description="Low-level layout wrapper and asChild composition.">
      <ExamplePanel title="Layout wrapper">
        <Box className="border-border grid w-72 gap-2 rounded-md border p-4">
          <Typography variant="h4">Project status</Typography>
          <Typography variant="muted">Build checks are running.</Typography>
        </Box>
      </ExamplePanel>
      <ExamplePanel title="asChild">
        <Box asChild className="bg-muted block w-72 rounded-md p-4 text-sm">
          <section aria-label="Release notes">Semantic section rendered through Box.</section>
        </Box>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiContainerExamplesStory() {
  return (
    <StorySurface title="Container" description="Centered responsive content widths.">
      <ExamplePanel title="Sizes">
        <Stack spacing="sm" className="w-full">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Container
              key={size}
              size={size}
              className="border-border rounded-md border p-2 text-center text-xs"
            >
              size={size}
            </Container>
          ))}
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Full width">
        <Container size="full" className="bg-muted w-full rounded-md p-4 text-center text-sm">
          Full-width app section
        </Container>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiStackExamplesStory() {
  return (
    <StorySurface title="Stack" description="Row and column layouts with consistent spacing.">
      <ExamplePanel title="Row">
        <Stack direction="row" spacing="sm">
          <Chip label="Draft" variant="outline" />
          <Chip label="Review" variant="secondary" />
          <Chip label="Ready" />
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Column">
        <Stack spacing="xs" className="w-64">
          <Typography variant="small">Owner</Typography>
          <Typography variant="muted">Design systems team</Typography>
        </Stack>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiGridExamplesStory() {
  return (
    <StorySurface title="Grid" description="Equal columns and dashboard composition.">
      <ExamplePanel title="Equal columns">
        <Grid columns={3} className="w-72">
          {['Open', 'Review', 'Done'].map((item) => (
            <Paper key={item} className="p-3 text-center text-sm">
              {item}
            </Paper>
          ))}
        </Grid>
      </ExamplePanel>
      <ExamplePanel title="Column spans">
        <Grid columns={4} className="w-80">
          <Paper className="col-span-3 p-3 text-sm">Activity</Paper>
          <Paper className="p-3 text-sm">72%</Paper>
          <Paper className="col-span-2 p-3 text-sm">Queue</Paper>
          <Paper className="col-span-2 p-3 text-sm">Health</Paper>
        </Grid>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiPaperExamplesStory() {
  return (
    <StorySurface title="Paper" description="Theme-aware surfaces with elevation.">
      <ExamplePanel title="Elevation">
        <Stack direction="row" spacing="sm">
          {[0, 1, 2, 3].map((elevation) => (
            <Paper key={elevation} elevation={elevation as 0 | 1 | 2 | 3} className="p-3 text-xs">
              {elevation}
            </Paper>
          ))}
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Content card">
        <Paper elevation={2} className="w-72 p-4">
          <Typography variant="h4">Billing</Typography>
          <Typography variant="muted">Invoices and payment methods.</Typography>
        </Paper>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTypographyExamplesStory() {
  return (
    <StorySurface title="Typography" description="Reusable type variants for app copy.">
      <ExamplePanel title="Text scale">
        <Stack spacing="sm">
          <Typography variant="h2">Build components faster</Typography>
          <Typography variant="body">Compose primitives with Tailwind tokens.</Typography>
          <Typography variant="muted">Muted copy for supporting context.</Typography>
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Inline code">
        <Typography>
          Set <Typography variant="code">defaultOpen</Typography> for uncontrolled components.
        </Typography>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiLinkExamplesStory() {
  return (
    <StorySurface title="Link" description="Styled anchors with focus and hover affordances.">
      <ExamplePanel title="External">
        <Link href="https://github.com" target="_blank" rel="noreferrer">
          View source
        </Link>
      </ExamplePanel>
      <ExamplePanel title="Inline">
        <Typography>
          Read the <Link href="/docs">component documentation</Link> before shipping.
        </Typography>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiSvgIconExamplesStory() {
  return (
    <StorySurface
      title="SvgIcon"
      description="Current-color SVG wrapper with accessible title support."
    >
      <ExamplePanel title="Accessible">
        <SvgIcon title="Success" className="text-success">
          <path d="M20 6 9 17l-5-5" />
        </SvgIcon>
      </ExamplePanel>
      <ExamplePanel title="Decorative">
        <Button variant="outline" size="sm">
          <SvgIcon>
            <path d="M12 5v14M5 12h14" />
          </SvgIcon>
          Add item
        </Button>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiChartExamplesStory() {
  return (
    <StorySurface title="Chart" description="Simple built-in bar and line chart snapshots.">
      <ExamplePanel title="Bar chart">
        <Chart data={[4, 10, 7, 14, 9, 12]} type="bar" title="Tickets" className="w-80" />
      </ExamplePanel>
      <ExamplePanel title="Line chart">
        <Chart data={[2, 6, 5, 11, 8, 15]} type="line" title="Revenue" className="w-80" />
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiChipExamplesStory() {
  return (
    <StorySurface
      title="Chip"
      description="Compact labels with variants and optional delete action."
    >
      <ExamplePanel title="Variants">
        <Stack direction="row" spacing="sm">
          <Chip label="Default" />
          <Chip label="Secondary" variant="secondary" />
          <Chip label="Outline" variant="outline" />
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Deletable">
        <Chip label="Removable" variant="outline" onDelete={() => {}} />
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiButtonGroupExamplesStory() {
  return (
    <StorySurface title="Button Group" description="Group related button actions.">
      <ExamplePanel title="Horizontal">
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </ExamplePanel>
      <ExamplePanel title="Vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiFloatingActionButtonExamplesStory() {
  return (
    <StorySurface
      title="Floating Action Button"
      description="Prominent circular and extended actions."
    >
      <ExamplePanel title="Circular">
        <FloatingActionButton aria-label="Create">+</FloatingActionButton>
      </ExamplePanel>
      <ExamplePanel title="Extended">
        <FloatingActionButton extended>New report</FloatingActionButton>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiRatingExamplesStory() {
  return (
    <StorySurface title="Rating" description="Controlled, uncontrolled and read-only score input.">
      <ExamplePanel title="Read-only">
        <Rating value={4} readOnly />
      </ExamplePanel>
      <ExamplePanel title="Custom max">
        <Rating defaultValue={7} max={10} getLabelText={(value) => `${value} points`} />
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiAutocompleteExamplesStory() {
  return (
    <StorySurface title="Autocomplete" description="Combobox-based searchable options.">
      <ExamplePanel title="Searchable">
        <Autocomplete.Root>
          <Autocomplete.Input placeholder="Search framework" className="w-64" />
          <Autocomplete.Content>
            {materialOptions.map((option) => (
              <Autocomplete.Item key={option.value} value={option.value}>
                {option.label}
              </Autocomplete.Item>
            ))}
          </Autocomplete.Content>
        </Autocomplete.Root>
      </ExamplePanel>
      <ExamplePanel title="With label">
        <Stack spacing="sm" className="w-64">
          <Label htmlFor="playground-autocomplete">Framework</Label>
          <Autocomplete.Root>
            <Autocomplete.Input id="playground-autocomplete" placeholder="Choose one" />
            <Autocomplete.Content>
              <Autocomplete.Item value="react">React</Autocomplete.Item>
              <Autocomplete.Item value="svelte">Svelte</Autocomplete.Item>
            </Autocomplete.Content>
          </Autocomplete.Root>
          <Typography variant="muted">Type to filter available options.</Typography>
        </Stack>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTransferListExamplesStory() {
  return (
    <StorySurface title="Transfer List" description="Move selected options between two lists.">
      <ExamplePanel title="Custom titles">
        <TransferList
          options={materialOptions}
          defaultValue={['react']}
          sourceTitle="Available frameworks"
          targetTitle="Selected"
        />
      </ExamplePanel>
      <ExamplePanel title="Disabled option">
        <TransferList
          options={[...materialOptions, { value: 'ember', label: 'Ember', disabled: true }]}
          defaultValue={['vue']}
        />
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiListExamplesStory() {
  return (
    <StorySurface title="List" description="Semantic list parts for actions or static content.">
      <ExamplePanel title="Navigation list">
        <List.Root className="border-border w-64 rounded-md border">
          <List.Subheader>Workspace</List.Subheader>
          <List.Item>
            <List.ItemButton>
              <List.ItemText>Dashboard</List.ItemText>
            </List.ItemButton>
          </List.Item>
          <List.Item>
            <List.ItemButton>
              <List.ItemText>Projects</List.ItemText>
            </List.ItemButton>
          </List.Item>
          <List.Item>
            <List.ItemButton>
              <List.ItemText>Settings</List.ItemText>
            </List.ItemButton>
          </List.Item>
        </List.Root>
      </ExamplePanel>
      <ExamplePanel title="Static items">
        <List.Root className="border-border w-64 rounded-md border">
          <List.Item className="px-3 py-2">
            <List.ItemText>Build completed</List.ItemText>
          </List.Item>
          <List.Item className="px-3 py-2">
            <List.ItemText>Deploy queued</List.ItemText>
          </List.Item>
        </List.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiImageListExamplesStory() {
  return (
    <StorySurface title="Image List" description="Image grids with optional captions.">
      <ExamplePanel title="Captioned">
        <ImageList.Root className="w-80 grid-cols-3">
          {imageTiles.map((tile) => (
            <ImageList.Item key={tile.label}>
              <ImageList.Image src={tile.src} alt={tile.label} />
              <ImageList.Caption>{tile.label}</ImageList.Caption>
            </ImageList.Item>
          ))}
        </ImageList.Root>
      </ExamplePanel>
      <ExamplePanel title="Dense">
        <ImageList.Root className="w-64 grid-cols-2 gap-2">
          {imageTiles.slice(0, 2).map((tile) => (
            <ImageList.Item key={tile.label}>
              <ImageList.Image src={tile.src} alt={tile.label} />
            </ImageList.Item>
          ))}
        </ImageList.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTableExamplesStory() {
  return (
    <StorySurface title="Table" description="Styled native table anatomy.">
      <ExamplePanel title="Header and footer">
        <Table.Root className="w-80">
          <Table.Header>
            <Table.Row>
              <Table.Head>Plan</Table.Head>
              <Table.Head>Seats</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Pro</Table.Cell>
              <Table.Cell>12</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Team</Table.Cell>
              <Table.Cell>32</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell>Total</Table.Cell>
              <Table.Cell>44</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </ExamplePanel>
      <ExamplePanel title="Caption">
        <Table.Root className="w-80">
          <Table.Caption>Recent invoices</Table.Caption>
          <Table.Body>
            <Table.Row>
              <Table.Cell>INV-001</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiBackdropExamplesStory() {
  return (
    <StorySurface title="Backdrop" description="Scrim for modal or blocking states.">
      <ExamplePanel title="Inline">
        <Backdrop open forceMount className="relative inset-auto h-28 w-64 rounded-md" />
      </ExamplePanel>
      <ExamplePanel title="Loading">
        <Box className="border-border relative grid h-32 w-72 place-items-center overflow-hidden rounded-md border">
          <Backdrop open forceMount className="absolute inset-0 rounded-md" />
          <Spinner className="relative z-10" />
        </Box>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiSnackbarExamplesStory() {
  return (
    <StorySurface title="Snackbar" description="Temporary status messages.">
      <ExamplePanel title="Static">
        <Snackbar defaultOpen className="static translate-x-0">
          Profile updated
        </Snackbar>
      </ExamplePanel>
      <ExamplePanel title="Auto hide">
        <Snackbar defaultOpen autoHideDuration={6000} className="static translate-x-0">
          Saved for later
        </Snackbar>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiModalExamplesStory() {
  const [open, setOpen] = React.useState(false);

  return (
    <StorySurface title="Modal" description="Low-level controlled or uncontrolled modal overlay.">
      <ExamplePanel title="Interactive">
        <Stack spacing="sm" className="items-center">
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal open={open} onOpenChange={setOpen}>
            <Paper className="w-full max-w-sm p-4">
              <Typography variant="h4">Invite member</Typography>
              <Typography variant="muted">Modal content is composed by the app.</Typography>
              <Stack direction="row" spacing="sm" className="mt-4">
                <Button size="sm" onClick={() => setOpen(false)}>
                  Send
                </Button>
                <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Stack>
            </Paper>
          </Modal>
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Dismiss behavior">
        <Typography variant="muted">
          Use closeOnEscape and closeOnPointerDownOutside for blocking flows.
        </Typography>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiAppBarExamplesStory() {
  return (
    <StorySurface title="App Bar" description="Top app shell surface with title and actions.">
      <ExamplePanel title="Toolbar">
        <AppBar className="relative w-80 rounded-md">
          <Typography variant="h4" className="flex-1">
            Aura
          </Typography>
          <Button size="sm" variant="outline">
            Docs
          </Button>
        </AppBar>
      </ExamplePanel>
      <ExamplePanel title="Sticky">
        <AppBar position="sticky" className="relative top-auto w-80 rounded-md">
          Sticky page header
        </AppBar>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiBottomNavigationExamplesStory() {
  return (
    <StorySurface title="Bottom Navigation" description="Tab-style destination switcher.">
      <ExamplePanel title="Destinations">
        <BottomNavigation.Root
          defaultValue="activity"
          className="border-border w-80 rounded-md border"
        >
          <BottomNavigation.Item value="home">
            <Mail />
            Home
          </BottomNavigation.Item>
          <BottomNavigation.Item value="activity">
            <Bell />
            Activity
          </BottomNavigation.Item>
          <BottomNavigation.Item value="settings">
            <Settings />
            Settings
          </BottomNavigation.Item>
        </BottomNavigation.Root>
      </ExamplePanel>
      <ExamplePanel title="Controlled value">
        <BottomNavigation.Root value="home" className="border-border w-72 rounded-md border">
          <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
          <BottomNavigation.Item value="search">Search</BottomNavigation.Item>
        </BottomNavigation.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiSpeedDialExamplesStory() {
  return (
    <StorySurface title="Speed Dial" description="Floating action menu with controlled open state.">
      <ExamplePanel title="Open menu">
        <SpeedDial.Root defaultOpen className="relative bottom-auto right-auto">
          <SpeedDial.Content>
            <SpeedDial.Action aria-label="Create">+</SpeedDial.Action>
            <SpeedDial.Action aria-label="Close">x</SpeedDial.Action>
          </SpeedDial.Content>
          <SpeedDial.Trigger />
        </SpeedDial.Root>
      </ExamplePanel>
      <ExamplePanel title="Closed">
        <SpeedDial.Root open={false} className="relative bottom-auto right-auto">
          <SpeedDial.Trigger aria-label="Open actions" />
        </SpeedDial.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiMasonryExamplesStory() {
  return (
    <StorySurface title="Masonry" description="Column layout for uneven card heights.">
      <ExamplePanel title="Three columns">
        <Masonry columns={3} className="w-80">
          {[72, 104, 88, 128, 96].map((height, index) => (
            <Paper
              key={`${height}-${index}`}
              className="grid place-items-center p-3 text-sm"
              style={{ minHeight: height }}
            >
              Card {index + 1}
            </Paper>
          ))}
        </Masonry>
      </ExamplePanel>
      <ExamplePanel title="Two columns">
        <Masonry columns={2} className="w-64">
          <Paper className="p-3 text-sm">Short</Paper>
          <Paper className="p-3 text-sm">A taller item with more content.</Paper>
          <Paper className="p-3 text-sm">Compact</Paper>
        </Masonry>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTimelineExamplesStory() {
  return (
    <StorySurface title="Timeline" description="Chronological activity with dots and content.">
      <ExamplePanel title="Multiple events">
        <Timeline.Root className="w-72">
          {['Created project', 'Invited team', 'Deployed preview'].map((event) => (
            <Timeline.Item key={event}>
              <Timeline.Separator>
                <Timeline.Dot />
              </Timeline.Separator>
              <Timeline.Content>{event}</Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </ExamplePanel>
      <ExamplePanel title="Status dots">
        <Timeline.Root className="w-72">
          <Timeline.Item>
            <Timeline.Separator>
              <Timeline.Dot className="bg-success" />
            </Timeline.Separator>
            <Timeline.Content>Checks passed</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Separator>
              <Timeline.Dot className="bg-warning" />
            </Timeline.Separator>
            <Timeline.Content>Review pending</Timeline.Content>
          </Timeline.Item>
        </Timeline.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiClickAwayListenerExamplesStory() {
  const [message, setMessage] = React.useState('Waiting for outside click');

  return (
    <StorySurface title="Click-Away Listener" description="Observe interactions outside one child.">
      <ExamplePanel title="Dismiss panel">
        <ClickAwayListener onClickAway={() => setMessage('Outside click detected')}>
          <Paper className="p-4 text-sm">{message}</Paper>
        </ClickAwayListener>
      </ExamplePanel>
      <ExamplePanel title="Observed button">
        <ClickAwayListener onClickAway={() => setMessage('Button observer updated')}>
          <Button variant="outline">Observed button</Button>
        </ClickAwayListener>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiNoSsrExamplesStory() {
  return (
    <StorySurface title="No SSR" description="Defer rendering until after mount.">
      <ExamplePanel title="Fallback">
        <NoSsr fallback={<Typography variant="muted">Loading client state...</Typography>}>
          Client state loaded
        </NoSsr>
      </ExamplePanel>
      <ExamplePanel title="No fallback">
        <NoSsr fallback={null}>
          <Chip label="Mounted on client" variant="outline" />
        </NoSsr>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiPortalExamplesStory() {
  return (
    <StorySurface
      title="Portal"
      description="Render content into document.body or a custom container."
    >
      <ExamplePanel title="Body portal">
        <Stack spacing="sm" className="items-center">
          <Typography variant="muted">Portaled badge appears near the viewport edge.</Typography>
          <Portal>
            <span className="border-border bg-popover fixed bottom-3 left-3 rounded-md border px-2 py-1 text-xs shadow-md">
              Portaled
            </span>
          </Portal>
        </Stack>
      </ExamplePanel>
      <ExamplePanel title="Custom target">
        <Typography variant="muted">
          Use a ref-backed container when the target should be local.
        </Typography>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiPopperExamplesStory() {
  return (
    <StorySurface title="Popper" description="Low-level anchored positioning.">
      <ExamplePanel title="Button anchor">
        <Popper.Root>
          <Popper.Anchor>
            <Button variant="outline">Anchor</Button>
          </Popper.Anchor>
          <Popper.Content className="border-border bg-popover rounded-md border p-2 text-xs shadow-md">
            Positioned content
          </Popper.Content>
        </Popper.Root>
      </ExamplePanel>
      <ExamplePanel title="Chip anchor">
        <Popper.Root>
          <Popper.Anchor>
            <Chip label="Status" />
          </Popper.Anchor>
          <Popper.Content className="border-border bg-card rounded-md border p-3 text-sm shadow-md">
            Healthy
          </Popper.Content>
        </Popper.Root>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTextareaAutosizeExamplesStory() {
  return (
    <StorySurface title="Textarea Autosize" description="Native textarea that grows with content.">
      <ExamplePanel title="Minimum rows">
        <TextareaAutosize minRows={3} placeholder="Write release notes..." className="w-72" />
      </ExamplePanel>
      <ExamplePanel title="Maximum rows">
        <TextareaAutosize
          minRows={2}
          maxRows={4}
          defaultValue={'Line one\nLine two\nLine three'}
          className="w-72"
        />
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiTransitionExamplesStory() {
  return (
    <StorySurface
      title="Transition"
      description="Open and closed data-state for Tailwind animation composition."
    >
      <ExamplePanel title="Open">
        <Transition in className="border-border rounded-md border p-4 text-sm">
          Open content
        </Transition>
      </ExamplePanel>
      <ExamplePanel title="Unmount on exit">
        <Stack spacing="sm" className="items-center">
          <Transition
            in={false}
            unmountOnExit
            className="border-border rounded-md border p-4 text-sm"
          >
            Hidden
          </Transition>
          <Typography variant="muted">Closed content is unmounted.</Typography>
        </Stack>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiCssBaselineExamplesStory() {
  return (
    <StorySurface title="CSS Baseline" description="Small global reset for app roots.">
      <ExamplePanel title="Mounted">
        <>
          <CssBaseline />
          <Typography variant="muted">Baseline is mounted for this story.</Typography>
        </>
      </ExamplePanel>
      <ExamplePanel title="With form controls">
        <Stack spacing="sm" className="w-64">
          <Label htmlFor="baseline-input">Inherited font</Label>
          <Input id="baseline-input" placeholder="Form control" />
        </Stack>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiInitColorSchemeScriptExamplesStory() {
  return (
    <StorySurface
      title="Init Color Scheme Script"
      description="Initial theme attribute script for hydration."
    >
      <ExamplePanel title="System mode">
        <>
          <InitColorSchemeScript defaultMode="system" />
          <Typography variant="muted">Script mounted with system default.</Typography>
        </>
      </ExamplePanel>
      <ExamplePanel title="Custom storage key">
        <Typography variant="muted">
          Use attribute, defaultMode and storageKey in the app document.
        </Typography>
      </ExamplePanel>
    </StorySurface>
  );
}

export function MuiMaterialPropsGalleryStory() {
  return (
    <div className="grid max-w-6xl gap-8">
      <StorySurface
        title="MUI-style props and variants"
        description="A compact playground pass over the supported parity props."
      >
        <ExamplePanel title="Layout props">
          <Stack spacing={3} className="w-full">
            <Container
              maxWidth={false}
              disableGutters
              className="border-border rounded-md border p-3 text-center text-sm"
            >
              Container maxWidth=false
            </Container>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="wrap"
              divider={<span className="bg-border h-6 w-px" />}
            >
              <Box display="grid" padding={2} className="bg-muted rounded-md text-sm">
                Box
              </Box>
              <Chip label="divider" size="small" />
              <Chip label="wrap" size="small" variant="outlined" />
            </Stack>
            <Grid columns={12} spacing={2}>
              <Paper className="col-span-12 p-2 text-sm sm:col-span-6">sm=6</Paper>
              <Paper className="col-span-12 p-2 text-sm sm:col-span-6">sm=6</Paper>
            </Grid>
          </Stack>
        </ExamplePanel>
        <ExamplePanel title="Surface and text props">
          <Stack spacing="sm" className="w-full">
            <Stack direction="row" spacing="sm">
              <Paper variant="outlined" square className="p-3 text-sm">
                outlined square
              </Paper>
              <Paper elevation={4} className="p-3 text-sm">
                elevation 4
              </Paper>
            </Stack>
            <Typography variant="overline" color="primary">
              Overline primary
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Centered heading
            </Typography>
            <Link href="#" underline="always" variant="button">
              Button link
            </Link>
            <SvgIcon fontSize="large" color="success" titleAccess="Success">
              <path d="M20 6 9 17l-5-5" />
            </SvgIcon>
          </Stack>
        </ExamplePanel>
        <ExamplePanel title="Input and action variants">
          <Stack spacing="sm" className="items-center">
            <Stack direction="row" spacing="sm" flexWrap="wrap" className="justify-center">
              <Chip label="Filled" color="primary" />
              <Chip label="Outlined" variant="outlined" color="success" />
              <Chip
                label="Small"
                size="small"
                icon={<Star className="size-3" />}
                onDelete={() => {}}
              />
            </Stack>
            <ButtonGroup variant="contained" color="secondary" size="small">
              <Button>Day</Button>
              <Button>Week</Button>
              <Button>Month</Button>
            </ButtonGroup>
            <Stack direction="row" spacing="sm">
              <FloatingActionButton size="small" aria-label="Add">
                +
              </FloatingActionButton>
              <FloatingActionButton variant="extended" color="secondary">
                New
              </FloatingActionButton>
            </Stack>
            <Rating defaultValue={4} max={6} size="large" color="warning" />
          </Stack>
        </ExamplePanel>
        <ExamplePanel title="Data display props">
          <Stack spacing="sm" className="w-full">
            <List.Root dense className="border-border w-full rounded-md border">
              <List.Subheader disableSticky>Inbox</List.Subheader>
              <List.Item divider>
                <List.ItemButton selected alignItems="flex-start">
                  <List.ItemIcon>
                    <Mail className="size-4" />
                  </List.ItemIcon>
                  <List.ItemText primary="Message" secondary="Secondary text" />
                  <List.ItemSecondaryAction>
                    <Chip label="2" size="small" />
                  </List.ItemSecondaryAction>
                </List.ItemButton>
              </List.Item>
            </List.Root>
            <ImageList.Root cols={3} gap={2} rowHeight={64} variant="quilted" className="w-full">
              {imageTiles.map((tile) => (
                <ImageList.Item key={tile.label}>
                  <ImageList.Image src={tile.src} alt={tile.label} />
                </ImageList.Item>
              ))}
            </ImageList.Root>
            <Table.Root size="small" stickyHeader>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Name</Table.Head>
                  <Table.Head>Status</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ada</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Stack>
        </ExamplePanel>
        <ExamplePanel title="Feedback and navigation props">
          <Stack spacing="sm" className="w-full items-center">
            <Backdrop
              open
              forceMount
              invisible
              className="border-border relative inset-auto h-16 w-48 rounded-md border"
            />
            <Snackbar
              defaultOpen
              message="Archived"
              action={
                <Button size="sm" variant="ghost">
                  Undo
                </Button>
              }
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className="static"
            />
            <AppBar
              position="relative"
              color="primary"
              elevation={3}
              square={false}
              className="w-full"
            >
              <Typography variant="h6" color="inherit" className="flex-1">
                App bar
              </Typography>
            </AppBar>
            <BottomNavigation.Root
              defaultValue="home"
              showLabels
              className="border-border w-full rounded-md border"
            >
              <BottomNavigation.Item value="home" icon={<Mail className="size-4" />} label="Home" />
              <BottomNavigation.Item
                value="search"
                icon={<Search className="size-4" />}
                label="Search"
              />
            </BottomNavigation.Root>
          </Stack>
        </ExamplePanel>
        <ExamplePanel title="Utility props">
          <Stack spacing="sm" className="w-full items-center">
            <SpeedDial.Root
              defaultOpen
              direction="left"
              className="relative bottom-auto right-auto"
            >
              <SpeedDial.Content>
                <SpeedDial.Action aria-label="Add" tooltipTitle="Add" tooltipOpen>
                  +
                </SpeedDial.Action>
              </SpeedDial.Content>
              <SpeedDial.Trigger aria-label="Actions" icon="+" openIcon="x" />
            </SpeedDial.Root>
            <Masonry columns={2} spacing={2} className="w-56">
              <Paper className="p-2 text-sm">Short</Paper>
              <Paper className="p-2 text-sm">A taller content item</Paper>
            </Masonry>
            <Timeline.Root position="alternate" className="w-64">
              <Timeline.Item>
                <Timeline.Separator>
                  <Timeline.Dot color="success" />
                </Timeline.Separator>
                <Timeline.Content>Passed</Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Separator>
                  <Timeline.Dot color="warning" variant="outlined" />
                </Timeline.Separator>
                <Timeline.Content>Pending</Timeline.Content>
              </Timeline.Item>
            </Timeline.Root>
            <TextareaAutosize
              minRows={2}
              maxRows={4}
              defaultValue={'Line one\nLine two'}
              className="w-full"
            />
            <Transition
              in
              appear
              timeout={200}
              className="border-border rounded-md border p-3 text-sm"
            >
              Transition
            </Transition>
            <NoSsr fallback={<Typography variant="muted">Loading...</Typography>} defer>
              <Chip label="Client" variant="outlined" />
            </NoSsr>
            <CssBaseline enableColorScheme />
            <Typography variant="muted">
              InitColorSchemeScript accepts storageKey, defaultMode and attribute.
            </Typography>
          </Stack>
        </ExamplePanel>
      </StorySurface>
    </div>
  );
}

export function MuiParityExamplesStory() {
  return (
    <div className="grid max-w-6xl gap-8">
      <AppBar className="relative rounded-md">
        <Typography variant="h4" className="flex-1">
          MUI parity playground
        </Typography>
        <Button size="sm" variant="outline">
          <Search />
          Explore
        </Button>
      </AppBar>
      <MuiBoxExamplesStory />
      <MuiContainerExamplesStory />
      <MuiStackExamplesStory />
      <MuiGridExamplesStory />
      <MuiPaperExamplesStory />
      <MuiTypographyExamplesStory />
      <MuiLinkExamplesStory />
      <MuiSvgIconExamplesStory />
      <MuiChartExamplesStory />
      <MuiChipExamplesStory />
      <MuiButtonGroupExamplesStory />
      <MuiFloatingActionButtonExamplesStory />
      <MuiRatingExamplesStory />
      <MuiAutocompleteExamplesStory />
      <MuiTransferListExamplesStory />
      <MuiListExamplesStory />
      <MuiImageListExamplesStory />
      <MuiTableExamplesStory />
      <MuiBackdropExamplesStory />
      <MuiSnackbarExamplesStory />
      <MuiModalExamplesStory />
      <MuiAppBarExamplesStory />
      <MuiBottomNavigationExamplesStory />
      <MuiSpeedDialExamplesStory />
      <MuiMasonryExamplesStory />
      <MuiTimelineExamplesStory />
      <MuiClickAwayListenerExamplesStory />
      <MuiNoSsrExamplesStory />
      <MuiPortalExamplesStory />
      <MuiPopperExamplesStory />
      <MuiTextareaAutosizeExamplesStory />
      <MuiTransitionExamplesStory />
      <MuiCssBaselineExamplesStory />
      <MuiInitColorSchemeScriptExamplesStory />
      <MuiMaterialPropsGalleryStory />
      <Paper className="p-4">
        <Stack direction="row" spacing="sm" className="items-center">
          <Star className="text-primary size-4" />
          <Typography variant="muted">
            Every MUI-parity component has dedicated usage examples above.
          </Typography>
        </Stack>
      </Paper>
    </div>
  );
}

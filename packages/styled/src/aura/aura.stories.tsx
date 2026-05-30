import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Container,
  Stack,
  Grid,
  Paper,
  Typography,
  Link,
  Chip,
  ButtonGroup,
  FloatingActionButton,
  Rating,
  List,
  Table,
  AppBar,
  BottomNavigation,
  Backdrop,
  Timeline,
  Masonry,
  TextareaAutosize,
  Transition,
} from './index';
import { Button } from '../button';

const meta: Meta = {
  title: 'Styled/Aura',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/* ─── Layout ──────────────────────────────────────────────────────── */

export const BoxDemo: Story = {
  name: 'Box',
  render: () => (
    <Box display="flex" padding={4} className="gap-3 rounded-md border border-border">
      <Box display="inline-block" padding={2} className="rounded bg-primary/10 text-xs">
        Box A
      </Box>
      <Box display="inline-block" padding={2} className="rounded bg-secondary/40 text-xs">
        Box B
      </Box>
      <Box display="inline-block" padding={2} className="rounded bg-success/10 text-xs">
        Box C
      </Box>
    </Box>
  ),
};

export const ContainerDemo: Story = {
  name: 'Container',
  render: () => (
    <Container maxWidth="sm" className="rounded-md border border-dashed border-border bg-muted/20 p-6">
      <Typography variant="h5" gutterBottom>Container (sm)</Typography>
      <Typography variant="body" color="muted">
        This container is constrained to the &quot;sm&quot; breakpoint max-width with horizontal gutters.
      </Typography>
    </Container>
  ),
};

export const StackDemo: Story = {
  name: 'Stack',
  render: () => (
    <div className="flex gap-12">
      <div>
        <Typography variant="overline" color="muted">Column</Typography>
        <Stack direction="column" spacing="sm">
          {['Item 1', 'Item 2', 'Item 3'].map((item) => (
            <Paper key={item} elevation={1} className="px-4 py-2 text-sm">{item}</Paper>
          ))}
        </Stack>
      </div>
      <div>
        <Typography variant="overline" color="muted">Row</Typography>
        <Stack direction="row" spacing="sm" alignItems="center">
          {['A', 'B', 'C'].map((item) => (
            <Paper key={item} elevation={1} className="flex h-10 w-10 items-center justify-center text-sm font-medium">{item}</Paper>
          ))}
        </Stack>
      </div>
    </div>
  ),
};

export const GridDemo: Story = {
  name: 'Grid',
  render: () => (
    <Grid container columns={12} gap="md" className="w-[480px]">
      {[
        { span: 12, label: 'Full width (12)' },
        { span: 6, label: 'Half (6)' },
        { span: 6, label: 'Half (6)' },
        { span: 4, label: '1/3 (4)' },
        { span: 4, label: '1/3 (4)' },
        { span: 4, label: '1/3 (4)' },
        { span: 3, label: '1/4' },
        { span: 3, label: '1/4' },
        { span: 3, label: '1/4' },
        { span: 3, label: '1/4' },
      ].map((cell, i) => (
        <Grid key={i} container={false} size={cell.span as 4 | 6 | 12 | 3}>
          <Paper elevation={1} className="flex h-10 items-center justify-center text-xs text-muted-foreground">
            {cell.label}
          </Paper>
        </Grid>
      ))}
    </Grid>
  ),
};

/* ─── Surfaces ────────────────────────────────────────────────────── */

export const PaperDemo: Story = {
  name: 'Paper (elevations)',
  render: () => (
    <Stack direction="row" spacing="md" alignItems="center">
      {([0, 1, 2, 3, 4] as const).map((elevation) => (
        <Paper
          key={elevation}
          elevation={elevation}
          className="flex h-20 w-20 items-center justify-center text-xs text-muted-foreground"
        >
          elevation={elevation}
        </Paper>
      ))}
      <Paper
        variant="outlined"
        className="flex h-20 w-20 items-center justify-center text-xs text-muted-foreground"
      >
        outlined
      </Paper>
    </Stack>
  ),
};

/* ─── Typography ──────────────────────────────────────────────────── */

export const TypographyDemo: Story = {
  name: 'Typography',
  render: () => (
    <Stack direction="column" spacing="sm" className="w-80">
      <Typography variant="h1">H1 Heading</Typography>
      <Typography variant="h2">H2 Heading</Typography>
      <Typography variant="h3">H3 Heading</Typography>
      <Typography variant="h4">H4 Heading</Typography>
      <Typography variant="h5">H5 Heading</Typography>
      <Typography variant="h6">H6 Heading</Typography>
      <Typography variant="subtitle1">Subtitle 1 — slightly bolder body</Typography>
      <Typography variant="subtitle2">Subtitle 2 — smaller medium</Typography>
      <Typography variant="body1">Body 1 — regular paragraph text</Typography>
      <Typography variant="body2">Body 2 — smaller paragraph</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline label</Typography>
      <Typography variant="muted">Muted text for secondary content</Typography>
      <Typography variant="code">const x = 42;</Typography>
    </Stack>
  ),
};

export const LinkDemo: Story = {
  name: 'Link',
  render: () => (
    <Stack direction="row" spacing="md" alignItems="center">
      <Link href="#" underline="always">Always underlined</Link>
      <Link href="#" underline="hover">Hover underline</Link>
      <Link href="#" underline="none">No underline</Link>
      <Link href="#" color="muted">Muted color</Link>
      <Link href="#" color="destructive">Destructive</Link>
    </Stack>
  ),
};

/* ─── Components ──────────────────────────────────────────────────── */

export const ChipDemo: Story = {
  name: 'Chip',
  render: () => (
    <Stack direction="column" spacing="sm">
      <Stack direction="row" spacing="xs" alignItems="center">
        <Typography variant="caption" color="muted" className="w-20">filled</Typography>
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Success" color="success" />
        <Chip label="Warning" color="warning" />
        <Chip label="Danger" color="destructive" />
      </Stack>
      <Stack direction="row" spacing="xs" alignItems="center">
        <Typography variant="caption" color="muted" className="w-20">outlined</Typography>
        <Chip label="Default" variant="outlined" />
        <Chip label="Primary" color="primary" variant="outlined" />
        <Chip label="Success" color="success" variant="outlined" />
      </Stack>
      <Stack direction="row" spacing="xs" alignItems="center">
        <Typography variant="caption" color="muted" className="w-20">deletable</Typography>
        <Chip label="Removable" onDelete={() => {}} />
        <Chip label="React" color="primary" onDelete={() => {}} />
      </Stack>
      <Stack direction="row" spacing="xs" alignItems="center">
        <Typography variant="caption" color="muted" className="w-20">small</Typography>
        <Chip label="Small" size="small" />
        <Chip label="Primary sm" color="primary" size="small" />
      </Stack>
    </Stack>
  ),
};

export const ButtonGroupDemo: Story = {
  name: 'ButtonGroup',
  render: () => (
    <Stack direction="column" spacing="md" alignItems="start">
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" color="primary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </Stack>
  ),
};

export const FabDemo: Story = {
  name: 'FloatingActionButton',
  render: () => (
    <Stack direction="row" spacing="md" alignItems="center">
      <FloatingActionButton size="small" aria-label="Add item">+</FloatingActionButton>
      <FloatingActionButton size="medium" aria-label="Add item">+</FloatingActionButton>
      <FloatingActionButton size="large" aria-label="Add item">+</FloatingActionButton>
      <FloatingActionButton variant="extended" aria-label="Add item">
        + New Item
      </FloatingActionButton>
      <FloatingActionButton color="secondary" aria-label="Edit">✎</FloatingActionButton>
    </Stack>
  ),
};

export const RatingDemo: Story = {
  name: 'Rating',
  render: () => {
    const [value, setValue] = React.useState(3);
    return (
      <Stack direction="column" spacing="sm">
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="caption" color="muted" className="w-20">default</Typography>
          <Rating value={value} onChange={(v) => setValue(v as number)} max={5} />
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="caption" color="muted" className="w-20">warning</Typography>
          <Rating value={4} color="warning" max={5} readOnly />
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="caption" color="muted" className="w-20">small</Typography>
          <Rating value={2} size="small" max={5} readOnly />
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="caption" color="muted" className="w-20">large</Typography>
          <Rating value={5} size="large" max={5} readOnly />
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="caption" color="muted" className="w-20">disabled</Typography>
          <Rating value={3} max={5} disabled />
        </Stack>
      </Stack>
    );
  },
};

/* ─── List ────────────────────────────────────────────────────────── */

export const ListDemo: Story = {
  name: 'List',
  render: () => (
    <Paper elevation={1} className="w-64">
      <List.Root>
        <List.Subheader>Recently Viewed</List.Subheader>
        {[
          { primary: 'Dashboard', secondary: 'Last visited 2 min ago' },
          { primary: 'Analytics', secondary: 'Last visited 15 min ago' },
          { primary: 'User Management', secondary: 'Last visited 1 hr ago' },
        ].map((item) => (
          <List.Item key={item.primary}>
            <List.ItemButton>
              <List.ItemText primary={item.primary} secondary={item.secondary} />
            </List.ItemButton>
          </List.Item>
        ))}
        <List.Subheader>Other</List.Subheader>
        <List.Item>
          <List.ItemButton selected>
            <List.ItemText primary="Settings" secondary="Manage your preferences" />
          </List.ItemButton>
        </List.Item>
        <List.Item>
          <List.ItemButton disabled>
            <List.ItemText primary="Billing" secondary="Unavailable in your plan" />
          </List.ItemButton>
        </List.Item>
      </List.Root>
    </Paper>
  ),
};

/* ─── Table ───────────────────────────────────────────────────────── */

export const TableDemo: Story = {
  name: 'Table',
  render: () => {
    const rows = [
      { name: 'Button', category: 'Input', status: 'Stable', version: '1.0.0' },
      { name: 'Dialog', category: 'Overlay', status: 'Stable', version: '1.0.0' },
      { name: 'DataTable', category: 'Display', status: 'Beta', version: '0.8.0' },
      { name: 'TimePicker', category: 'Input', status: 'Alpha', version: '0.3.0' },
    ];
    return (
      <Paper elevation={1} className="w-[520px] overflow-hidden">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>Component</Table.Head>
              <Table.Head>Category</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Version</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.name}>
                <Table.Cell className="font-medium">{row.name}</Table.Cell>
                <Table.Cell>{row.category}</Table.Cell>
                <Table.Cell>{row.status}</Table.Cell>
                <Table.Cell className="text-muted-foreground">{row.version}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={3}>Total</Table.Cell>
              <Table.Cell>{rows.length} components</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </Paper>
    );
  },
};

/* ─── Navigation ──────────────────────────────────────────────────── */

export const AppBarDemo: Story = {
  name: 'AppBar',
  render: () => (
    <AppBar className="w-[600px]">
      <Typography variant="h6">aura-ui</Typography>
      <Stack direction="row" spacing="sm" className="ml-auto" alignItems="center">
        <Link href="#" underline="none" color="default" className="text-sm">
          Docs
        </Link>
        <Link href="#" underline="none" color="default" className="text-sm">
          GitHub
        </Link>
      </Stack>
    </AppBar>
  ),
};

export const BottomNavigationDemo: Story = {
  name: 'BottomNavigation',
  render: () => {
    const [active, setActive] = React.useState('home');
    const items = [
      { value: 'home', label: 'Home' },
      { value: 'search', label: 'Search' },
      { value: 'favorites', label: 'Favorites' },
      { value: 'profile', label: 'Profile' },
    ];
    return (
      <BottomNavigation.Root className="w-80">
        {items.map((item) => (
          <BottomNavigation.Item
            key={item.value}
            value={item.value}
            checked={active === item.value}
            onCheckedChange={() => setActive(item.value)}
          >
            <span data-bottom-navigation-icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <span data-bottom-navigation-label>{item.label}</span>
          </BottomNavigation.Item>
        ))}
      </BottomNavigation.Root>
    );
  },
};

/* ─── Timeline ────────────────────────────────────────────────────── */

export const TimelineDemo: Story = {
  name: 'Timeline',
  render: () => (
    <Timeline.Root position="right" className="w-72">
      {[
        { label: 'Project Kickoff', detail: 'Stakeholders aligned', color: 'primary' as const },
        { label: 'Design Sprint', detail: 'Wireframes approved', color: 'success' as const },
        { label: 'Alpha Release', detail: 'Internal testing begins', color: 'warning' as const },
        { label: 'Beta Launch', detail: 'Public beta available', color: 'primary' as const },
        { label: 'GA Release', detail: 'v1.0.0 shipped!', color: 'success' as const },
      ].map((event) => (
        <Timeline.Item key={event.label}>
          <Timeline.Separator>
            <Timeline.Dot color={event.color} />
            <div className="h-full w-px bg-border" />
          </Timeline.Separator>
          <Timeline.Content>
            <Typography variant="subtitle2">{event.label}</Typography>
            <Typography variant="caption" color="muted">{event.detail}</Typography>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  ),
};

/* ─── Masonry ─────────────────────────────────────────────────────── */

export const MasonryDemo: Story = {
  name: 'Masonry',
  render: () => {
    const heights = [80, 120, 64, 160, 96, 140, 72, 110, 88, 150, 100, 76];
    return (
      <Masonry columns={3} spacing={3} className="w-72">
        {heights.map((h, i) => (
          <Paper
            key={i}
            elevation={1}
            className="flex items-center justify-center text-xs text-muted-foreground"
            style={{ height: h }}
          >
            Item {i + 1}
          </Paper>
        ))}
      </Masonry>
    );
  },
};

/* ─── Misc ────────────────────────────────────────────────────────── */

export const TextareaAutosizeDemo: Story = {
  name: 'TextareaAutosize',
  render: () => (
    <Stack direction="column" spacing="sm" className="w-72">
      <Typography variant="subtitle2">Auto-growing textarea</Typography>
      <TextareaAutosize
        placeholder="Type to expand..."
        minRows={2}
        className="resize-none"
      />
    </Stack>
  ),
};

export const BackdropDemo: Story = {
  name: 'Backdrop',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Show Backdrop
        </Button>
        {open && (
          <Backdrop onClick={() => setOpen(false)}>
            <Paper elevation={3} className="p-6">
              <Typography variant="h5" gutterBottom>Modal-like content</Typography>
              <Typography variant="body">Click the backdrop to dismiss.</Typography>
            </Paper>
          </Backdrop>
        )}
      </div>
    );
  },
};

export const TransitionDemo: Story = {
  name: 'Transition',
  render: () => {
    const [visible, setVisible] = React.useState(true);
    return (
      <Stack direction="column" spacing="md" alignItems="start">
        <Button
          variant="outline"
          onClick={() => setVisible((v) => !v)}
        >
          Toggle
        </Button>
        <Transition open={visible}>
          <Paper elevation={1} className="p-4 text-sm">
            Animated content — fades in/out
          </Paper>
        </Transition>
      </Stack>
    );
  },
};

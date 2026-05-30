'use client';
/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import {
  Button,
  Switch,
  Checkbox,
  Dialog,
  Popover,
  Tooltip,
  Select,
  MultiSelect,
  DropdownMenu,
  Accordion,
  Tabs,
  Slider,
  Avatar,
  Badge,
  Card,
  Alert,
  Input,
  Progress,
  Toast,
  toast,
  Skeleton,
  Spinner,
  Separator,
  AspectRatio,
  Textarea,
  RadioGroup,
  Toggle,
  ToggleGroup,
  Form,
  Collapsible,
  Breadcrumb,
  Pagination,
  Stepper,
  AlertDialog,
  Sheet,
  Drawer,
  HoverCard,
  ContextMenu,
  Menubar,
  NavigationMenu,
  Combobox,
  Command,
  OneTimePasswordField,
  PasswordToggleField,
  NumberField,
  Calendar,
  DatePicker,
  DateTimePicker,
  TimePicker,
  DateRangePicker,
  ColorPicker,
  FileUpload,
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
  Box,
  Container,
  Stack,
  Grid,
  Paper,
  Typography,
  Link as AuraLink,
  SvgIcon,
  Chart,
  Chip,
  ButtonGroup,
  FloatingActionButton,
  Rating,
  Autocomplete,
  TransferList,
  List,
  ImageList,
  Table,
  Backdrop,
  Snackbar,
  AppBar,
  BottomNavigation,
  SpeedDial,
  Masonry,
  Timeline,
  ClickAwayListener,
  NoSsr,
  MaterialPortal as Portal,
  Popper,
  TextareaAutosize,
  Transition,
  CssBaseline,
  InitColorSchemeScript,
} from '@aura-ui/styled';
import { DataTable, type DataTableColumnDef, type DataTableFilterGroup } from '@aura-ui/data-table';
import { componentUsageExamples } from './component-usage-examples';

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

export interface ComponentExample {
  title: string;
  description?: string;
  preview: () => React.ReactNode;
  code: string;
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
  examples?: ComponentExample[];
}

type DocsUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  team: string;
  status: 'Active' | 'Paused' | 'Blocked' | 'Invited';
  revenue: number;
  cost: number;
  score: number;
};

const docsTableData: DocsUser[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Admin',
    team: 'Platform',
    status: 'Active',
    revenue: 1800,
    cost: 920,
    score: 91,
  },
  {
    id: 2,
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Editor',
    team: 'Risk',
    status: 'Paused',
    revenue: 1300,
    cost: 810,
    score: 74,
  },
  {
    id: 3,
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Admin',
    team: 'Growth',
    status: 'Active',
    revenue: 2100,
    cost: 990,
    score: 88,
  },
  {
    id: 4,
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    role: 'Viewer',
    team: 'Design',
    status: 'Blocked',
    revenue: 980,
    cost: 720,
    score: 67,
  },
  {
    id: 5,
    name: 'Katherine Johnson',
    email: 'katherine@example.com',
    role: 'Owner',
    team: 'Support',
    status: 'Invited',
    revenue: 1500,
    cost: 760,
    score: 82,
  },
];

const docsTableColumns: DataTableColumnDef<DocsUser>[] = [
  { field: 'name', headerName: 'Name', size: 170 },
  { field: 'email', headerName: 'Email', size: 220 },
  { field: 'role', headerName: 'Role', size: 110, align: 'center' },
  { field: 'team', headerName: 'Team', size: 120 },
  { field: 'status', headerName: 'Status', size: 120 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', size: 120 },
  { field: 'cost', headerName: 'Cost', type: 'number', size: 110 },
  { field: 'score', headerName: 'Score', type: 'number', size: 90 },
];

const docsTableFilter: DataTableFilterGroup = {
  id: 'root',
  logic: 'or',
  items: [
    { id: 'active', columnId: 'status', operator: 'equals', value: 'Active' },
    { id: 'score', columnId: 'score', operator: 'gte', value: 80 },
  ],
};

const materialOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

const materialClassNameProp: ApiProp = {
  name: 'className',
  type: 'string',
  description: 'Additional Tailwind classes merged with the component defaults.',
};

const materialAsChildProp: ApiProp = {
  name: 'asChild',
  type: 'boolean',
  default: 'false',
  description: 'Merge props onto the immediate child instead of rendering the default element.',
};

const materialApi: Record<string, ApiPart[]> = {
  box: [
    {
      name: 'Box',
      description: 'Low-level layout wrapper.',
      props: [
        {
          name: 'display',
          type: "'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'contents'",
          description: 'Display utility applied to the root.',
        },
        {
          name: 'padding',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          description: 'Tokenized padding shortcut.',
        },
        {
          name: 'margin',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          description: 'Tokenized margin shortcut.',
        },
        materialAsChildProp,
        materialClassNameProp,
      ],
    },
  ],
  container: [
    {
      name: 'Container',
      description: 'Responsive centered page container.',
      props: [
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
          default: "'lg'",
          description: 'Aura alias for maxWidth.',
        },
        {
          name: 'maxWidth',
          type: "false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
          default: "'lg'",
          description: 'Maximum container width. Pass false for full width.',
        },
        {
          name: 'disableGutters',
          type: 'boolean',
          default: 'false',
          description: 'Remove horizontal page padding.',
        },
        {
          name: 'fixed',
          type: 'boolean',
          default: 'false',
          description: 'Use fixed breakpoint widths.',
        },
        materialClassNameProp,
      ],
    },
  ],
  stack: [
    {
      name: 'Stack',
      description: 'Flex stack layout.',
      props: [
        {
          name: 'direction',
          type: "'row' | 'row-reverse' | 'column' | 'column-reverse'",
          default: "'column'",
          description: 'Flex direction.',
        },
        {
          name: 'spacing',
          type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8",
          default: "'md'",
          description: 'Gap between children.',
        },
        { name: 'divider', type: 'React.ReactNode', description: 'Inserted between children.' },
        {
          name: 'alignItems',
          type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
          description: 'Cross-axis alignment.',
        },
        {
          name: 'justifyContent',
          type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
          description: 'Main-axis alignment.',
        },
        {
          name: 'flexWrap',
          type: "'nowrap' | 'wrap' | 'wrap-reverse'",
          description: 'Flex wrapping behavior.',
        },
        materialClassNameProp,
      ],
    },
  ],
  grid: [
    {
      name: 'Grid',
      description: 'Grid container and item helper.',
      props: [
        {
          name: 'container',
          type: 'boolean',
          default: 'true',
          description: 'Apply grid container styles.',
        },
        {
          name: 'item',
          type: 'boolean',
          description: 'Marks usage as a grid item for API parity.',
        },
        {
          name: 'columns',
          type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12',
          default: '12',
          description: 'Number of grid columns.',
        },
        {
          name: 'spacing',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          description: 'Gap for both axes.',
        },
        {
          name: 'rowSpacing',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          description: 'Vertical gap override.',
        },
        {
          name: 'columnSpacing',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          description: 'Horizontal gap override.',
        },
        {
          name: 'size | xs | sm | md | lg | xl',
          type: "'auto' | 'grow' | 1…12",
          description: 'Column span at each breakpoint.',
        },
        materialClassNameProp,
      ],
    },
  ],
  paper: [
    {
      name: 'Paper',
      description: 'Theme-aware surface.',
      props: [
        {
          name: 'variant',
          type: "'elevation' | 'outlined'",
          default: "'elevation'",
          description: 'Surface treatment.',
        },
        {
          name: 'elevation',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
          default: '1',
          description: 'Shadow depth when variant is elevation.',
        },
        {
          name: 'square',
          type: 'boolean',
          default: 'false',
          description: 'Remove rounded corners.',
        },
        materialClassNameProp,
      ],
    },
  ],
  typography: [
    {
      name: 'Typography',
      description: 'Text variants and text behavior.',
      props: [
        {
          name: 'variant',
          type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'body' | 'small' | 'caption' | 'button' | 'overline' | 'muted' | 'code'",
          default: "'body'",
          description: 'Text style.',
        },
        {
          name: 'align',
          type: "'inherit' | 'left' | 'center' | 'right' | 'justify'",
          description: 'Text alignment.',
        },
        {
          name: 'color',
          type: "'default' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'default'",
          description: 'Tokenized text color.',
        },
        {
          name: 'gutterBottom',
          type: 'boolean',
          default: 'false',
          description: 'Add bottom margin.',
        },
        {
          name: 'noWrap',
          type: 'boolean',
          default: 'false',
          description: 'Truncate long text on one line.',
        },
        {
          name: 'paragraph',
          type: 'boolean',
          default: 'false',
          description: 'Display as paragraph-like block spacing.',
        },
        materialClassNameProp,
      ],
    },
  ],
  link: [
    {
      name: 'Link',
      description: 'Styled anchor element.',
      props: [
        {
          name: 'underline',
          type: "'always' | 'hover' | 'none'",
          default: "'hover'",
          description: 'Underline behavior.',
        },
        {
          name: 'color',
          type: "'default' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'primary'",
          description: 'Tokenized link color.',
        },
        {
          name: 'variant',
          type: "'body2' | 'button' | 'caption' | Typography variant",
          description: 'Optional text variant.',
        },
        materialAsChildProp,
        materialClassNameProp,
      ],
    },
  ],
  'svg-icon': [
    {
      name: 'SvgIcon',
      description: 'Current-color SVG wrapper.',
      props: [
        { name: 'title', type: 'string', description: 'Accessible SVG title.' },
        { name: 'titleAccess', type: 'string', description: 'MUI-style alias for title.' },
        {
          name: 'fontSize',
          type: "'inherit' | 'small' | 'medium' | 'large'",
          default: "'medium'",
          description: 'Icon size.',
        },
        {
          name: 'color',
          type: "'default' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'inherit'",
          description: 'Tokenized icon color.',
        },
        materialClassNameProp,
      ],
    },
  ],
  chart: [
    {
      name: 'Chart.Root',
      description: 'Cartesian chart container. Compose Bar, Line, Area, Scatter and Bubble inside.',
      props: [
        { name: 'data', type: 'Record<string, unknown>[]', description: 'Array of data objects.' },
        { name: 'height', type: 'number', default: '300', description: 'SVG height in pixels.' },
        { name: 'width', type: 'number', description: 'SVG width. Omit for responsive layout.' },
        { name: 'margin', type: '{ top, right, bottom, left }', default: '{ top:10, right:10, bottom:30, left:40 }', description: 'Inner margin for axes.' },
        { name: 'accessibilityLabel', type: 'string', description: 'Sets aria-label on the SVG.' },
        { name: 'accessibilityMode', type: 'boolean', default: 'false', description: 'Enables pattern fills for colorblind accessibility.' },
      ],
    },
    {
      name: 'Chart.Bar',
      description: 'Vertical (or horizontal) bar series inside Chart.Root.',
      props: [
        { name: 'dataKey', type: 'string', description: 'Required. Field name in data.' },
        { name: 'name', type: 'string', description: 'Display name in legend and tooltip.' },
        { name: 'color', type: 'string', description: 'Override color.' },
        { name: 'stackId', type: 'string', description: 'Bars with the same stackId are stacked.' },
        { name: 'radius', type: 'number', default: '2', description: 'Corner radius.' },
        { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Bar direction.' },
      ],
    },
    {
      name: 'Chart.Line',
      description: 'Line series inside Chart.Root.',
      props: [
        { name: 'dataKey', type: 'string', description: 'Required. Field name in data.' },
        { name: 'name', type: 'string', description: 'Display name.' },
        { name: 'color', type: 'string', description: 'Override color.' },
        { name: 'curve', type: "'linear' | 'catmullRom' | 'step'", default: "'linear'", description: 'Line interpolation.' },
        { name: 'dot', type: 'boolean', default: 'true', description: 'Show data point dots.' },
        { name: 'strokeWidth', type: 'number', default: '2', description: 'Line stroke width.' },
      ],
    },
    {
      name: 'Chart.Area',
      description: 'Filled area series inside Chart.Root. Accepts all Chart.Line props plus fillOpacity and stackId.',
      props: [
        { name: 'dataKey', type: 'string', description: 'Required. Field name in data.' },
        { name: 'fillOpacity', type: 'number', default: '0.2', description: 'Fill transparency (0–1).' },
        { name: 'stackId', type: 'string', description: 'Areas with the same stackId are stacked.' },
      ],
    },
    {
      name: 'Chart.Pie / Chart.PieRoot',
      description: 'Pie or donut chart. Wrap Chart.Pie in Chart.PieRoot.',
      props: [
        { name: 'dataKey', type: 'string', description: 'Required. Numeric value field.' },
        { name: 'nameKey', type: 'string', description: 'Label field for segments.' },
        { name: 'innerRadius', type: 'number', default: '0', description: 'Inner radius (> 0 = donut).' },
        { name: 'padAngle', type: 'number', description: 'Gap between segments in radians.' },
        { name: 'cornerRadius', type: 'number', description: 'Rounded segment corners.' },
        { name: 'colors', type: 'string[]', description: 'Per-segment color overrides.' },
      ],
    },
    {
      name: 'Chart.Radar / Chart.RadarRoot',
      description: 'Radar/spider chart. Wrap Chart.Radar(s) in Chart.RadarRoot.',
      props: [
        { name: 'dataKey', type: 'string', description: 'Required. Numeric value field to plot.' },
        { name: 'name', type: 'string', description: 'Display name.' },
        { name: 'color', type: 'string', description: 'Override color.' },
        { name: 'fillOpacity', type: 'number', default: '0.25', description: 'Fill transparency.' },
      ],
    },
    {
      name: 'Chart.Heatmap',
      description: 'Standalone heatmap grid. xKey, yKey and valueKey map data fields to cells.',
      props: [
        { name: 'data', type: 'Record<string, unknown>[]', description: 'Required.' },
        { name: 'xKey', type: 'string', description: 'Required. Horizontal axis field.' },
        { name: 'yKey', type: 'string', description: 'Required. Vertical axis field.' },
        { name: 'valueKey', type: 'string', description: 'Required. Numeric intensity field.' },
        { name: 'width', type: 'number', default: '500', description: 'SVG width.' },
        { name: 'height', type: 'number', default: '280', description: 'SVG height.' },
      ],
    },
    {
      name: 'Chart.Treemap',
      description: 'Standalone treemap using the squarify algorithm. Supports nested children.',
      props: [
        { name: 'data', type: 'TreemapNode[]', description: 'Required. Hierarchical data with name, value and optional children.' },
        { name: 'width', type: 'number', default: '500', description: 'SVG width.' },
        { name: 'height', type: 'number', default: '350', description: 'SVG height.' },
      ],
    },
    {
      name: 'Chart.Funnel',
      description: 'Standalone funnel chart rendered top-down.',
      props: [
        { name: 'data', type: '{ name: string; value: number }[]', description: 'Required. Stages in descending order.' },
        { name: 'width', type: 'number', default: '400', description: 'SVG width.' },
        { name: 'height', type: 'number', default: '300', description: 'SVG height.' },
      ],
    },
    {
      name: 'Chart.Gauge',
      description: 'Standalone half-circle arc gauge.',
      props: [
        { name: 'value', type: 'number', description: 'Required. Current value.' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'width', type: 'number', default: '240', description: 'SVG width.' },
        { name: 'height', type: 'number', default: '180', description: 'SVG height.' },
        { name: 'label', type: 'string', description: 'Text shown in center of arc.' },
      ],
    },
    {
      name: 'Chart.Candlestick',
      description: 'Standalone OHLC candlestick chart.',
      props: [
        { name: 'data', type: 'OhlcEntry[]', description: 'Required. Objects with open, high, low, close.' },
        { name: 'width', type: 'number', default: '600', description: 'SVG width.' },
        { name: 'height', type: 'number', default: '300', description: 'SVG height.' },
        { name: 'bullColor', type: 'string', default: 'hsl(var(--chart-2))', description: 'Color for bullish (close > open) candles.' },
        { name: 'bearColor', type: 'string', default: 'hsl(var(--chart-5))', description: 'Color for bearish (close < open) candles.' },
      ],
    },
  ],
  chip: [
    {
      name: 'Chip',
      description: 'Compact label with optional icon/avatar/delete action.',
      props: [
        { name: 'label', type: 'React.ReactNode', description: 'Label content.' },
        {
          name: 'variant',
          type: "'filled' | 'outlined' | 'default' | 'secondary' | 'outline'",
          default: "'filled'",
          description: 'Chip treatment.',
        },
        {
          name: 'color',
          type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'default'",
          description: 'Tokenized chip color.',
        },
        {
          name: 'size',
          type: "'small' | 'medium'",
          default: "'medium'",
          description: 'Chip height.',
        },
        {
          name: 'icon | avatar | deleteIcon',
          type: 'React.ReactNode',
          description: 'Optional leading or delete visuals.',
        },
        {
          name: 'onDelete',
          type: '() => void',
          description: 'Shows delete button and handles removal.',
        },
        {
          name: 'clickable',
          type: 'boolean',
          default: 'false',
          description: 'Adds button semantics and focusability.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable chip interactions.',
        },
        materialClassNameProp,
      ],
    },
  ],
  'button-group': [
    {
      name: 'ButtonGroup',
      description: 'Groups buttons and propagates shared button props.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Button group axis.',
        },
        {
          name: 'variant',
          type: "'contained' | 'outlined' | 'text'",
          default: "'outlined'",
          description: 'Variant applied to Aura Button children.',
        },
        {
          name: 'color',
          type: "'default' | 'primary' | 'secondary' | 'destructive' | 'muted'",
          default: "'default'",
          description: 'Color mapped to Aura button variants.',
        },
        {
          name: 'size',
          type: "'small' | 'medium' | 'large'",
          default: "'medium'",
          description: 'Size applied to Aura Button children.',
        },
        { name: 'disabled', type: 'boolean', description: 'Disable child buttons.' },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Stretch group and children.',
        },
        materialClassNameProp,
      ],
    },
  ],
  'floating-action-button': [
    {
      name: 'FloatingActionButton',
      description: 'Prominent floating action.',
      props: [
        {
          name: 'variant',
          type: "'circular' | 'extended'",
          default: "'circular'",
          description: 'Shape mode.',
        },
        { name: 'extended', type: 'boolean', description: 'Alias for variant="extended".' },
        {
          name: 'color',
          type: "'primary' | 'secondary' | 'destructive' | 'muted'",
          default: "'primary'",
          description: 'Button color.',
        },
        {
          name: 'size',
          type: "'small' | 'medium' | 'large'",
          default: "'medium'",
          description: 'Button size.',
        },
        materialClassNameProp,
      ],
    },
  ],
  rating: [
    {
      name: 'Rating',
      description: 'Star rating input.',
      props: [
        {
          name: 'value | defaultValue',
          type: 'number',
          description: 'Controlled or uncontrolled rating value.',
        },
        {
          name: 'onValueChange',
          type: '(value: number) => void',
          description: 'Called when value changes.',
        },
        { name: 'max', type: 'number', default: '5', description: 'Number of rating items.' },
        {
          name: 'disabled | readOnly',
          type: 'boolean',
          default: 'false',
          description: 'Interaction state.',
        },
        { name: 'name', type: 'string', description: 'Hidden input name for forms.' },
        {
          name: 'size',
          type: "'small' | 'medium' | 'large'",
          default: "'medium'",
          description: 'Star size.',
        },
        {
          name: 'color',
          type: "'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'primary'",
          description: 'Checked item color.',
        },
        {
          name: 'icon | emptyIcon',
          type: 'React.ReactNode',
          description: 'Custom checked and unchecked visuals.',
        },
        {
          name: 'getLabelText',
          type: '(value: number) => string',
          description: 'Accessible label generator.',
        },
        {
          name: 'precision',
          type: 'number',
          description: 'Documented precision marker for design parity.',
        },
        materialClassNameProp,
      ],
    },
  ],
  autocomplete: [
    {
      name: 'Autocomplete.Root',
      description: 'Combobox root; accepts controlled/uncontrolled combobox props.',
      props: [materialClassNameProp],
    },
    {
      name: 'Autocomplete.Input',
      description: 'Search input.',
      props: [
        { name: 'placeholder', type: 'string', description: 'Input placeholder.' },
        materialClassNameProp,
      ],
    },
    { name: 'Autocomplete.Content', description: 'Popup content.', props: [materialClassNameProp] },
    {
      name: 'Autocomplete.Item',
      description: 'Selectable option.',
      props: [
        { name: 'value', type: 'string', description: 'Option value.' },
        materialClassNameProp,
      ],
    },
  ],
  'transfer-list': [
    {
      name: 'TransferList',
      description: 'Two-list transfer control.',
      props: [
        {
          name: 'options',
          type: '{ value: string; label: React.ReactNode; disabled?: boolean }[]',
          description: 'Available options.',
        },
        {
          name: 'value | defaultValue',
          type: 'string[]',
          description: 'Controlled or uncontrolled selected values.',
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: 'Called after moving values.',
        },
        {
          name: 'sourceTitle | targetTitle',
          type: 'React.ReactNode',
          description: 'Panel headings.',
        },
        materialClassNameProp,
      ],
    },
  ],
  list: [
    {
      name: 'List.Root',
      description: 'List container.',
      props: [
        { name: 'dense', type: 'boolean', default: 'false', description: 'Compact item density.' },
        {
          name: 'disablePadding',
          type: 'boolean',
          default: 'false',
          description: 'Remove root padding.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'List.Item',
      description: 'List item.',
      props: [
        {
          name: 'disablePadding',
          type: 'boolean',
          default: 'false',
          description: 'Remove item padding.',
        },
        { name: 'divider', type: 'boolean', default: 'false', description: 'Show bottom divider.' },
        materialClassNameProp,
      ],
    },
    {
      name: 'List.ItemButton',
      description: 'Clickable list row.',
      props: [
        { name: 'selected', type: 'boolean', default: 'false', description: 'Selected styling.' },
        { name: 'dense', type: 'boolean', default: 'false', description: 'Compact row.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable row.' },
        {
          name: 'alignItems',
          type: "'center' | 'flex-start'",
          default: "'center'",
          description: 'Row alignment.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'List.ItemText',
      description: 'Primary and secondary text.',
      props: [
        { name: 'primary | secondary', type: 'React.ReactNode', description: 'Text slots.' },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'Align text with icon rows.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'List.ItemIcon / ItemAvatar / ItemSecondaryAction / Subheader',
      description: 'Additional list slots.',
      props: [materialClassNameProp],
    },
  ],
  'image-list': [
    {
      name: 'ImageList.Root',
      description: 'Image collection root.',
      props: [
        { name: 'cols', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Column count.' },
        {
          name: 'gap',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          default: '3',
          description: 'Tile gap.',
        },
        {
          name: 'rowHeight',
          type: "number | 'auto'",
          default: "'auto'",
          description: 'Fixed image row height.',
        },
        {
          name: 'variant',
          type: "'standard' | 'woven' | 'masonry' | 'quilted'",
          default: "'standard'",
          description: 'Image layout mode.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'ImageList.Item / Image / Caption',
      description: 'Image tile parts.',
      props: [materialClassNameProp],
    },
  ],
  table: [
    {
      name: 'Table.Root',
      description: 'Native table root.',
      props: [
        {
          name: 'size',
          type: "'small' | 'medium'",
          default: "'medium'",
          description: 'Cell density.',
        },
        {
          name: 'stickyHeader',
          type: 'boolean',
          default: 'false',
          description: 'Stick table header.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'Table.Header / Body / Footer / Row / Head / Cell / Caption',
      description: 'Semantic table parts.',
      props: [materialClassNameProp],
    },
  ],
  backdrop: [
    {
      name: 'Backdrop',
      description: 'Blocking scrim.',
      props: [
        { name: 'open', type: 'boolean', default: 'false', description: 'Open state.' },
        {
          name: 'forceMount',
          type: 'boolean',
          default: 'false',
          description: 'Keep mounted when closed.',
        },
        {
          name: 'invisible',
          type: 'boolean',
          default: 'false',
          description: 'Remove visible scrim color.',
        },
        materialClassNameProp,
      ],
    },
  ],
  snackbar: [
    {
      name: 'Snackbar',
      description: 'Floating status message.',
      props: [
        {
          name: 'open | defaultOpen',
          type: 'boolean',
          description: 'Controlled or uncontrolled open state.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Open state callback.',
        },
        {
          name: 'anchorOrigin',
          type: "{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }",
          default: "{ vertical: 'bottom', horizontal: 'left' }",
          description: 'Screen placement.',
        },
        {
          name: 'message | action',
          type: 'React.ReactNode',
          description: 'Message and action slots.',
        },
        { name: 'autoHideDuration', type: 'number', description: 'Auto-dismiss delay.' },
        {
          name: 'onClose',
          type: "(event, reason: 'timeout' | 'clickaway' | 'escapeKeyDown') => void",
          description: 'Close request callback.',
        },
        materialClassNameProp,
      ],
    },
  ],
  'app-bar': [
    {
      name: 'AppBar',
      description: 'Top app shell surface.',
      props: [
        {
          name: 'position',
          type: "'static' | 'sticky' | 'fixed' | 'absolute' | 'relative'",
          default: "'static'",
          description: 'Positioning mode.',
        },
        {
          name: 'color',
          type: "'default' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted' | 'transparent'",
          default: "'default'",
          description: 'Surface color.',
        },
        {
          name: 'elevation',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
          default: '0',
          description: 'Shadow depth.',
        },
        {
          name: 'square',
          type: 'boolean',
          default: 'true',
          description: 'Remove rounded corners.',
        },
        materialClassNameProp,
      ],
    },
  ],
  'bottom-navigation': [
    {
      name: 'BottomNavigation.Root',
      description: 'Bottom tablist root.',
      props: [
        {
          name: 'value | defaultValue',
          type: 'string',
          description: 'Controlled or uncontrolled selected value.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Selection callback.',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: 'false',
          description: 'Show all labels instead of only selected labels.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'BottomNavigation.Item',
      description: 'Bottom navigation action.',
      props: [
        { name: 'value', type: 'string', description: 'Item value.' },
        { name: 'label', type: 'React.ReactNode', description: 'Visible label slot.' },
        { name: 'icon', type: 'React.ReactNode', description: 'Icon slot.' },
        { name: 'showLabel', type: 'boolean', description: 'Override root label visibility.' },
        materialClassNameProp,
      ],
    },
  ],
  'speed-dial': [
    {
      name: 'SpeedDial.Root',
      description: 'Floating action menu root.',
      props: [
        {
          name: 'open | defaultOpen',
          type: 'boolean',
          description: 'Controlled or uncontrolled open state.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Open state callback.',
        },
        {
          name: 'direction',
          type: "'up' | 'down' | 'left' | 'right'",
          default: "'up'",
          description: 'Action expansion direction.',
        },
        {
          name: 'hidden',
          type: 'boolean',
          default: 'false',
          description: 'Unmount the speed dial.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'SpeedDial.Trigger',
      description: 'Floating trigger.',
      props: [
        { name: 'icon | openIcon', type: 'React.ReactNode', description: 'Closed and open icons.' },
        materialClassNameProp,
      ],
    },
    {
      name: 'SpeedDial.Action',
      description: 'Action button.',
      props: [
        { name: 'tooltipTitle', type: 'React.ReactNode', description: 'Tooltip text.' },
        {
          name: 'tooltipOpen',
          type: 'boolean',
          default: 'false',
          description: 'Force tooltip visible.',
        },
        materialClassNameProp,
      ],
    },
  ],
  masonry: [
    {
      name: 'Masonry',
      description: 'Column masonry layout.',
      props: [
        {
          name: 'columns',
          type: '1 | 2 | 3 | 4 | 5 | 6',
          default: '3',
          description: 'Column count.',
        },
        {
          name: 'spacing',
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8',
          default: '4',
          description: 'Column/item spacing.',
        },
        materialClassNameProp,
      ],
    },
  ],
  timeline: [
    {
      name: 'Timeline.Root',
      description: 'Timeline list root.',
      props: [
        {
          name: 'position',
          type: "'left' | 'right' | 'alternate'",
          default: "'right'",
          description: 'Timeline content position.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'Timeline.Dot',
      description: 'Timeline marker.',
      props: [
        {
          name: 'color',
          type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
          default: "'primary'",
          description: 'Marker color.',
        },
        {
          name: 'variant',
          type: "'filled' | 'outlined'",
          default: "'filled'",
          description: 'Marker treatment.',
        },
        materialClassNameProp,
      ],
    },
    {
      name: 'Timeline.Item / Separator / Content',
      description: 'Timeline composition parts.',
      props: [materialClassNameProp],
    },
  ],
  'click-away-listener': [
    {
      name: 'ClickAwayListener',
      description: 'Outside interaction observer.',
      props: [
        {
          name: 'onClickAway',
          type: '(event: MouseEvent | TouchEvent) => void',
          description: 'Called when the user interacts outside the child.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Observed child.' },
      ],
    },
  ],
  'no-ssr': [
    {
      name: 'NoSsr',
      description: 'Client-only renderer.',
      props: [
        {
          name: 'fallback',
          type: 'React.ReactNode',
          default: 'null',
          description: 'Rendered until mounted.',
        },
        {
          name: 'defer',
          type: 'boolean',
          default: 'false',
          description: 'Wait one animation frame before rendering children.',
        },
      ],
    },
  ],
  portal: [
    {
      name: 'Portal',
      description: 'Portal utility.',
      props: [
        {
          name: 'container',
          type: 'Element | DocumentFragment | null',
          description: 'Custom target container.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Portaled content.' },
      ],
    },
  ],
  popper: [
    {
      name: 'Popper.Root / Anchor / Content',
      description: 'Floating positioning primitives.',
      props: [materialClassNameProp],
    },
  ],
  'textarea-autosize': [
    {
      name: 'TextareaAutosize',
      description: 'Auto-growing textarea.',
      props: [
        { name: 'minRows', type: 'number', default: '1', description: 'Minimum rows.' },
        { name: 'maxRows', type: 'number', description: 'Maximum rows before scrolling.' },
        materialClassNameProp,
      ],
    },
  ],
  transition: [
    {
      name: 'Transition',
      description: 'Data-state transition wrapper.',
      props: [
        { name: 'in', type: 'boolean', default: 'false', description: 'Open state.' },
        { name: 'appear', type: 'boolean', description: 'Marks initial appearance.' },
        {
          name: 'mountOnEnter | unmountOnExit',
          type: 'boolean',
          default: 'false',
          description: 'Mount behavior.',
        },
        {
          name: 'timeout',
          type: 'number | { appear?: number; enter?: number; exit?: number }',
          description: 'Transition duration metadata.',
        },
        materialClassNameProp,
      ],
    },
  ],
  'css-baseline': [
    {
      name: 'CssBaseline',
      description: 'Small reset injector.',
      props: [
        {
          name: 'enableColorScheme',
          type: 'boolean',
          default: 'false',
          description: 'Add color-scheme support to html.',
        },
      ],
    },
  ],
  'init-color-scheme-script': [
    {
      name: 'InitColorSchemeScript',
      description: 'Initial color mode script.',
      props: [
        {
          name: 'storageKey',
          type: 'string',
          default: "'aura-ui-mode'",
          description: 'LocalStorage key.',
        },
        {
          name: 'defaultMode',
          type: "'light' | 'dark' | 'system'",
          default: "'system'",
          description: 'Initial mode fallback.',
        },
        {
          name: 'attribute',
          type: 'string',
          default: "'data-theme'",
          description: 'Document attribute to set.',
        },
      ],
    },
  ],
};

const MATERIAL_COMPONENTS_BASE: ComponentEntry[] = [
  {
    slug: 'box',
    name: 'Box',
    category: 'Layout',
    description: 'A low-level layout primitive.',
    features: ['Renders a div by default.', 'Supports asChild composition.'],
    preview: () => <Box className="border-border rounded-md border p-4 text-sm">Box</Box>,
    code: `import { Box } from '@aura-ui/styled';\n\n<Box>Content</Box>`,
  },
  {
    slug: 'container',
    name: 'Container',
    category: 'Layout',
    description: 'Centers content with responsive max-widths.',
    features: ['Responsive horizontal padding.', 'Preset max-width sizes.'],
    preview: () => (
      <Container size="sm" className="border-border rounded-md border p-4 text-center text-sm">
        Container
      </Container>
    ),
    code: `import { Container } from '@aura-ui/styled';\n\n<Container size="lg">Content</Container>`,
  },
  {
    slug: 'stack',
    name: 'Stack',
    category: 'Layout',
    description: 'Arranges children in a row or column with consistent spacing.',
    features: ['Row or column direction.', 'Tokenized spacing.'],
    preview: () => (
      <Stack className="w-48">
        <Chip label="One" />
        <Chip label="Two" />
      </Stack>
    ),
    code: `import { Stack } from '@aura-ui/styled';\n\n<Stack spacing="md">...</Stack>`,
  },
  {
    slug: 'grid',
    name: 'Grid',
    category: 'Layout',
    description: 'A responsive CSS grid wrapper.',
    features: ['Column presets.', 'Gap presets.'],
    preview: () => (
      <Grid columns={2} className="w-56">
        <Paper className="p-3 text-sm">A</Paper>
        <Paper className="p-3 text-sm">B</Paper>
      </Grid>
    ),
    code: `import { Grid } from '@aura-ui/styled';\n\n<Grid columns={2}>...</Grid>`,
  },
  {
    slug: 'paper',
    name: 'Paper',
    category: 'Surface',
    description: 'A neutral elevated surface.',
    features: ['Bordered surface.', 'Elevation presets.'],
    preview: () => (
      <Paper elevation={2} className="p-5 text-sm">
        Paper surface
      </Paper>
    ),
    code: `import { Paper } from '@aura-ui/styled';\n\n<Paper elevation={2}>Content</Paper>`,
  },
  {
    slug: 'typography',
    name: 'Typography',
    category: 'Atoms',
    description: 'Theme-aware text styles.',
    features: ['Heading and body variants.', 'Token-based colors.'],
    preview: () => (
      <Stack>
        <Typography variant="h3">Heading</Typography>
        <Typography variant="muted">Supporting text</Typography>
      </Stack>
    ),
    code: `import { Typography } from '@aura-ui/styled';\n\n<Typography variant="h3">Heading</Typography>`,
  },
  {
    slug: 'link',
    name: 'Link',
    category: 'Atoms',
    description: 'A styled anchor element.',
    features: ['Focus-visible ring.', 'Theme-aware color.'],
    preview: () => <AuraLink href="#">Open documentation</AuraLink>,
    code: `import { Link } from '@aura-ui/styled';\n\n<Link href="/docs">Docs</Link>`,
  },
  {
    slug: 'svg-icon',
    name: 'SvgIcon',
    category: 'Atoms',
    description: 'A wrapper for custom SVG icons.',
    features: ['Accessible title support.', 'Current-color sizing.'],
    preview: () => (
      <SvgIcon title="Check">
        <path d="M20 6 9 17l-5-5" />
      </SvgIcon>
    ),
    code: `import { SvgIcon } from '@aura-ui/styled';\n\n<SvgIcon title="Check"><path d="M20 6 9 17l-5-5" /></SvgIcon>`,
  },
  {
    slug: 'chart',
    name: 'Chart',
    category: 'Data',
    description: 'A comprehensive custom SVG chart library with 45+ components — bar, line, area, pie/donut, scatter, bubble, radar, heatmap, treemap, funnel, gauge, candlestick, radial bar, radial line, sankey, waterfall, gantt, boxplot, sunburst, chord, histogram, and more. No external charting dependency.',
    features: [
      '20+ chart types with 45+ composable components.',
      'Every chart type has multiple variants (stacked, horizontal, arc labels, fill-by-value, etc.).',
      'Fully responsive cartesian charts via ResizeObserver.',
      'CSS variable color system (--chart-1 through --chart-5).',
      'Colorblind-safe accessibilityMode with SVG pattern fills.',
      'Compound Chart.* API — composable and tree-shakeable.',
      'No Recharts, Chart.js or D3 dependency — pure SVG.',
    ],
    preview: () => (
      <Chart.Root
        data={[
          { month: 'Jan', revenue: 4200 },
          { month: 'Feb', revenue: 5800 },
          { month: 'Mar', revenue: 3900 },
          { month: 'Apr', revenue: 7100 },
          { month: 'May', revenue: 6400 },
        ]}
        height={180}
      >
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.Tooltip />
      </Chart.Root>
    ),
    code: `import { Chart } from '@aura-ui/styled';\n\n<Chart.Root data={data} height={300}>\n  <Chart.Grid />\n  <Chart.XAxis dataKey="month" />\n  <Chart.YAxis />\n  <Chart.Bar dataKey="revenue" name="Revenue" />\n  <Chart.Tooltip />\n  <Chart.Legend />\n</Chart.Root>`,
  },
  {
    slug: 'chip',
    name: 'Chip',
    category: 'Atoms',
    description: 'A compact label with optional delete action.',
    features: ['Variant styles.', 'Optional delete button.'],
    preview: () => <Chip label="Ready" onDelete={() => {}} />,
    code: `import { Chip } from '@aura-ui/styled';\n\n<Chip label="Ready" onDelete={remove} />`,
  },
  {
    slug: 'button-group',
    name: 'Button Group',
    category: 'Inputs',
    description: 'Groups related buttons together.',
    features: ['Horizontal or vertical.', 'Shared border treatment.'],
    preview: () => (
      <ButtonGroup>
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
      </ButtonGroup>
    ),
    code: `import { ButtonGroup, Button } from '@aura-ui/styled';\n\n<ButtonGroup><Button>One</Button><Button>Two</Button></ButtonGroup>`,
  },
  {
    slug: 'floating-action-button',
    name: 'Floating Action Button',
    category: 'Inputs',
    description: 'A prominent circular action button.',
    features: ['Icon and extended modes.', 'Button variants.'],
    preview: () => <FloatingActionButton aria-label="Add">+</FloatingActionButton>,
    code: `import { FloatingActionButton } from '@aura-ui/styled';\n\n<FloatingActionButton aria-label="Add">+</FloatingActionButton>`,
  },
  {
    slug: 'rating',
    name: 'Rating',
    category: 'Inputs',
    description: 'Collects a numeric star rating.',
    features: ['Controlled or uncontrolled.', 'Keyboard-focusable items.'],
    preview: () => <Rating defaultValue={3} />,
    code: `import { Rating } from '@aura-ui/styled';\n\n<Rating defaultValue={3} />`,
  },
  {
    slug: 'autocomplete',
    name: 'Autocomplete',
    category: 'Inputs',
    description: 'MUI-style alias around the combobox pattern.',
    features: ['Search input.', 'Option popup.'],
    preview: () => (
      <Autocomplete.Root>
        <Autocomplete.Input placeholder="Search…" className="w-56" />
        <Autocomplete.Content>
          {materialOptions.map((option) => (
            <Autocomplete.Item key={option.value} value={option.value}>
              {option.label}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Content>
      </Autocomplete.Root>
    ),
    code: `import { Autocomplete } from '@aura-ui/styled';\n\n<Autocomplete.Root>\n  <Autocomplete.Input />\n  <Autocomplete.Content><Autocomplete.Item value="react">React</Autocomplete.Item></Autocomplete.Content>\n</Autocomplete.Root>`,
  },
  {
    slug: 'transfer-list',
    name: 'Transfer List',
    category: 'Inputs',
    description: 'Moves options between available and selected lists.',
    features: ['Controlled or uncontrolled.', 'Checkbox selection.'],
    preview: () => <TransferList options={materialOptions} defaultValue={['vue']} />,
    code: `import { TransferList } from '@aura-ui/styled';\n\n<TransferList options={options} />`,
  },
  {
    slug: 'list',
    name: 'List',
    category: 'Data display',
    description: 'A vertical list of items and actions.',
    features: ['Compound list parts.', 'Button rows.'],
    preview: () => (
      <List.Root className="border-border w-56 rounded-md border">
        <List.Subheader>Inbox</List.Subheader>
        <List.Item>
          <List.ItemButton>
            <List.ItemText>Messages</List.ItemText>
          </List.ItemButton>
        </List.Item>
      </List.Root>
    ),
    code: `import { List } from '@aura-ui/styled';\n\n<List.Root><List.Item><List.ItemText>Item</List.ItemText></List.Item></List.Root>`,
  },
  {
    slug: 'image-list',
    name: 'Image List',
    category: 'Data display',
    description: 'A grid for image collections.',
    features: ['Image and caption parts.', 'Responsive grid styling.'],
    preview: () => (
      <ImageList.Root className="w-64">
        <ImageList.Item>
          <ImageList.Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&h=300&fit=crop"
            alt="Landscape"
          />
          <ImageList.Caption>Landscape</ImageList.Caption>
        </ImageList.Item>
      </ImageList.Root>
    ),
    code: `import { ImageList } from '@aura-ui/styled';\n\n<ImageList.Root><ImageList.Item><ImageList.Image src={src} alt="" /></ImageList.Item></ImageList.Root>`,
  },
  {
    slug: 'table',
    name: 'Table',
    category: 'Data display',
    description: 'Styled native table parts.',
    features: ['Semantic table elements.', 'Header, body, row and cell parts.'],
    preview: () => (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Ada</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
    code: `import { Table } from '@aura-ui/styled';\n\n<Table.Root><Table.Body><Table.Row><Table.Cell>Cell</Table.Cell></Table.Row></Table.Body></Table.Root>`,
  },
  {
    slug: 'backdrop',
    name: 'Backdrop',
    category: 'Feedback',
    description: 'A full-screen scrim for modal states.',
    features: ['Open/closed mounting.', 'Theme-aware overlay.'],
    preview: () => <Backdrop open forceMount className="relative h-24 w-48 rounded-md" />,
    code: `import { Backdrop } from '@aura-ui/styled';\n\n<Backdrop open />`,
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    category: 'Feedback',
    description: 'A brief status message.',
    features: ['Controlled or uncontrolled.', 'Optional auto-hide duration.'],
    preview: () => (
      <Snackbar defaultOpen className="static translate-x-0">
        Saved successfully
      </Snackbar>
    ),
    code: `import { Snackbar } from '@aura-ui/styled';\n\n<Snackbar open={open}>Saved</Snackbar>`,
  },
  {
    slug: 'app-bar',
    name: 'App Bar',
    category: 'Navigation',
    description: 'A top application bar.',
    features: ['Static, sticky or fixed positioning.', 'Backdrop-blurred surface.'],
    preview: () => (
      <AppBar className="relative w-72 rounded-md">
        <Typography>App title</Typography>
      </AppBar>
    ),
    code: `import { AppBar } from '@aura-ui/styled';\n\n<AppBar position="sticky">Title</AppBar>`,
  },
  {
    slug: 'bottom-navigation',
    name: 'Bottom Navigation',
    category: 'Navigation',
    description: 'Bottom tab-style navigation.',
    features: ['Controlled or uncontrolled.', 'Selected item state.'],
    preview: () => (
      <BottomNavigation.Root defaultValue="home" className="border-border w-72 rounded-md border">
        <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
        <BottomNavigation.Item value="search">Search</BottomNavigation.Item>
      </BottomNavigation.Root>
    ),
    code: `import { BottomNavigation } from '@aura-ui/styled';\n\n<BottomNavigation.Root defaultValue="home"><BottomNavigation.Item value="home">Home</BottomNavigation.Item></BottomNavigation.Root>`,
  },
  {
    slug: 'speed-dial',
    name: 'Speed Dial',
    category: 'Navigation',
    description: 'A floating action menu.',
    features: ['Controlled or uncontrolled open state.', 'Action list.'],
    preview: () => (
      <SpeedDial.Root defaultOpen className="relative bottom-auto right-auto">
        <SpeedDial.Content>
          <SpeedDial.Action aria-label="Add">+</SpeedDial.Action>
        </SpeedDial.Content>
        <SpeedDial.Trigger />
      </SpeedDial.Root>
    ),
    code: `import { SpeedDial } from '@aura-ui/styled';\n\n<SpeedDial.Root><SpeedDial.Trigger /><SpeedDial.Content><SpeedDial.Action /></SpeedDial.Content></SpeedDial.Root>`,
  },
  {
    slug: 'masonry',
    name: 'Masonry',
    category: 'Layout',
    description: 'A masonry-style column layout.',
    features: ['Column presets.', 'Avoids item breaks.'],
    preview: () => (
      <Masonry columns={3} className="w-72">
        {[1, 2, 3].map((item) => (
          <Paper key={item} className="p-3 text-sm">
            Item {item}
          </Paper>
        ))}
      </Masonry>
    ),
    code: `import { Masonry } from '@aura-ui/styled';\n\n<Masonry columns={3}>...</Masonry>`,
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    category: 'Data display',
    description: 'A chronological event list.',
    features: ['Compound timeline parts.', 'Styled dot and content.'],
    preview: () => (
      <Timeline.Root>
        <Timeline.Item>
          <Timeline.Separator>
            <Timeline.Dot />
          </Timeline.Separator>
          <Timeline.Content>Created project</Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>
    ),
    code: `import { Timeline } from '@aura-ui/styled';\n\n<Timeline.Root><Timeline.Item><Timeline.Dot /><Timeline.Content>Event</Timeline.Content></Timeline.Item></Timeline.Root>`,
  },
  {
    slug: 'click-away-listener',
    name: 'Click-Away Listener',
    category: 'Utils',
    description: 'Calls a handler when interaction happens outside its child.',
    features: ['Document-level mouse and touch support.', 'No visual wrapper.'],
    preview: () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-4 p-4">
          {!open ? (
            <Button variant="outline" onClick={() => setOpen(true)}>Open panel</Button>
          ) : (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Paper className="flex flex-col gap-1 p-4 text-sm shadow-md">
                <span className="font-medium">Click outside to close</span>
                <span className="text-muted-foreground text-xs">Clicks inside here are ignored</span>
              </Paper>
            </ClickAwayListener>
          )}
        </div>
      );
    },
    code: `import { ClickAwayListener, Paper } from '@aura-ui/styled';

const [open, setOpen] = useState(false);

{!open ? (
  <Button onClick={() => setOpen(true)}>Open panel</Button>
) : (
  <ClickAwayListener onClickAway={() => setOpen(false)}>
    <Paper>Click outside to close</Paper>
  </ClickAwayListener>
)}`,
  },
  {
    slug: 'no-ssr',
    name: 'No SSR',
    category: 'Utils',
    description: 'Defers rendering until after mount.',
    features: ['SSR-safe fallback.', 'Client-only children.'],
    preview: () => (
      <NoSsr fallback={<Typography variant="muted" className="text-xs italic">Rendering on server…</Typography>}>
        <Paper className="flex flex-col gap-1 p-4 text-sm">
          <span className="font-medium">Rendered on client</span>
          <span className="text-muted-foreground text-xs">Window: {typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : ''}</span>
        </Paper>
      </NoSsr>
    ),
    code: `import { NoSsr } from '@aura-ui/styled';

<NoSsr fallback={<span>Rendering on server…</span>}>
  Window: {window.innerWidth}×{window.innerHeight}
</NoSsr>`,
  },
  {
    slug: 'portal',
    name: 'Portal',
    category: 'Utils',
    description: 'Renders children into document.body or a custom container.',
    features: ['SSR-safe mount.', 'Custom container support.'],
    preview: () => {
      const containerRef = React.useRef<HTMLDivElement>(null);
      const [mounted, setMounted] = React.useState(false);
      React.useEffect(() => { setMounted(true); }, []);
      return (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <div ref={containerRef} className="border-border rounded-md border p-3 text-sm min-h-10 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">Container:</span>
            {mounted && containerRef.current && (
              <Portal container={containerRef.current}>
                <span className="text-primary font-medium text-xs">Portalled inside here</span>
              </Portal>
            )}
          </div>
          <span className="text-xs text-muted-foreground">Content is portalled into the container div above</span>
        </div>
      );
    },
    code: `import { Portal } from '@aura-ui/styled';

const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef}>
  <Portal container={containerRef.current}>
    <span>Portalled here</span>
  </Portal>
</div>`,
  },
  {
    slug: 'popper',
    name: 'Popper',
    category: 'Utils',
    description: 'Low-level floating positioning primitive anchored to an element.',
    features: ['open / anchorEl API.', 'Collision-aware placement via floating-ui.'],
    preview: () => {
      const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef<HTMLButtonElement>(null);
      return (
        <div className="flex flex-col items-center gap-4 py-8">
          <Button ref={anchorRef} variant="outline" onClick={() => setOpen(o => !o)}>
            {open ? 'Hide Popper' : 'Show Popper'}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom"
            className="border-border bg-popover rounded-md border p-3 text-sm shadow-md z-50"
          >
            Popper content
          </Popper>
        </div>
      );
    },
    code: `import { Button, Popper } from '@aura-ui/styled';

const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(o => !o)}>Toggle</Button>
<Popper open={open} anchorEl={anchorRef.current} placement="bottom">
  Popper content
</Popper>`,
  },
  {
    slug: 'textarea-autosize',
    name: 'Textarea Autosize',
    category: 'Inputs',
    description: 'A textarea that grows with its content.',
    features: ['Minimum and maximum row limits.', 'Native textarea props.'],
    preview: () => <TextareaAutosize minRows={2} placeholder="Type…" className="w-64" />,
    code: `import { TextareaAutosize } from '@aura-ui/styled';\n\n<TextareaAutosize minRows={2} />`,
  },
  {
    slug: 'transition',
    name: 'Transition',
    category: 'Utils',
    description: 'Manages entering/entered/exiting/exited states for CSS transitions.',
    features: ['Eight animation types.', 'Four-stage state machine.', 'unmountOnExit support.', 'Timeout control.'],
    preview: () => {
      const ANIMS = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom', 'grow', 'collapse'] as const;
      type Anim = typeof ANIMS[number];
      const [show, setShow] = React.useState(true);
      const [anim, setAnim] = React.useState<Anim>('fade');
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="flex flex-wrap justify-center gap-1">
            {ANIMS.map(a => (
              <button
                key={a}
                onClick={() => setAnim(a)}
                className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${anim === a ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-fg'}`}
              >{a}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShow(s => !s)}>
            {show ? 'Hide' : 'Show'}
          </Button>
          <Transition in={show} timeout={300} animation={anim} unmountOnExit className="border-border rounded-md border p-4 text-sm w-48 text-center">
            <span className="font-mono text-xs">{anim}</span>
          </Transition>
        </div>
      );
    },
    code: `import { Button, Transition } from '@aura-ui/styled';

const [show, setShow] = useState(true);

<Button onClick={() => setShow(s => !s)}>Toggle</Button>
<Transition in={show} timeout={300} animation="slide-up" unmountOnExit>
  Content
</Transition>`,
  },
  {
    slug: 'css-baseline',
    name: 'CSS Baseline',
    category: 'Utils',
    description: 'Injects a small global reset.',
    features: ['Box sizing reset.', 'Form font inheritance.'],
    preview: () => (
      <div className="flex flex-col gap-2 w-full max-w-sm text-xs">
        <CssBaseline />
        <span className="text-muted-foreground">Injected CSS reset:</span>
        <pre className="bg-muted overflow-auto rounded p-2 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
          {`*,*::before,*::after { box-sizing: border-box }\nhtml { line-height: 1.5; -webkit-text-size-adjust: 100% }\nbody { margin: 0 }\nbutton,input,textarea,select { font: inherit }`}
        </pre>
      </div>
    ),
    code: `import { CssBaseline } from '@aura-ui/styled';

// Place once at your app root — injects a minimal CSS reset
<CssBaseline />`,
  },
  {
    slug: 'init-color-scheme-script',
    name: 'Init Color Scheme Script',
    category: 'Utils',
    description: 'Sets the initial color-scheme attribute before hydration.',
    features: ['LocalStorage-aware.', 'System mode support.'],
    preview: () => (
      <div className="flex flex-col gap-2 w-full max-w-sm text-xs">
        <InitColorSchemeScript defaultMode="system" />
        <span className="text-muted-foreground">Script injected into &lt;head&gt; before hydration:</span>
        <pre className="bg-muted overflow-auto rounded p-2 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
          {`var m = localStorage.getItem("aura-ui-mode") || "system";\nif (m === "system") {\n  m = matchMedia("(prefers-color-scheme: dark)").matches\n    ? "dark" : "light";\n}\ndocument.documentElement.setAttribute("data-theme", m);`}
        </pre>
      </div>
    ),
    code: `import { InitColorSchemeScript } from '@aura-ui/styled';

// In your root layout <head> — runs before hydration to prevent flash
<InitColorSchemeScript defaultMode="system" />`,
  },
];

const materialExamples: Record<string, ComponentExample[]> = {
  box: [
    {
      title: 'As a layout wrapper',
      description:
        'Use Box when you want the smallest possible styled layout primitive and full control through className.',
      preview: () => (
        <Box className="border-border grid w-72 gap-2 rounded-md border p-4">
          <Typography variant="h4">Project status</Typography>
          <Typography variant="muted">Build checks are running for the release branch.</Typography>
        </Box>
      ),
      code: `import { Box, Typography } from '@aura-ui/styled';

<Box className="grid gap-2 rounded-md border border-border p-4">
  <Typography variant="h4">Project status</Typography>
  <Typography variant="muted">Build checks are running.</Typography>
</Box>`,
    },
    {
      title: 'asChild composition',
      description:
        'Pass asChild when Box should style another element, such as a semantic section.',
      preview: () => (
        <Box asChild className="bg-muted block w-72 rounded-md p-4 text-sm">
          <section aria-label="Release notes">Semantic section rendered through Box.</section>
        </Box>
      ),
      code: `import { Box } from '@aura-ui/styled';

<Box asChild className="rounded-md bg-muted p-4">
  <section aria-label="Release notes">Semantic section</section>
</Box>`,
    },
  ],
  container: [
    {
      title: 'Responsive sizes',
      description: 'Pick the max-width that matches the density of the page area.',
      preview: () => (
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
      ),
      code: `import { Container } from '@aura-ui/styled';

<Container size="sm">Small page</Container>
<Container size="md">Docs page</Container>
<Container size="lg">Dashboard page</Container>`,
    },
    {
      title: 'Full-width sections',
      description: 'Use size="full" for app surfaces that should stretch edge to edge.',
      preview: () => (
        <Container size="full" className="bg-muted w-full rounded-md p-4 text-sm">
          Full-width app section
        </Container>
      ),
      code: `import { Container } from '@aura-ui/styled';

<Container size="full" className="bg-muted p-4">
  Full-width app section
</Container>`,
    },
  ],
  stack: [
    {
      title: 'Direction and spacing',
      description: 'Use column stacks for form groups and row stacks for action clusters.',
      preview: () => (
        <Stack spacing="lg">
          <Stack direction="row" spacing="sm">
            <Chip label="Draft" variant="outline" />
            <Chip label="Review" variant="secondary" />
            <Chip label="Ready" />
          </Stack>
          <Stack spacing="xs">
            <Typography variant="small">Owner</Typography>
            <Typography variant="muted">Design systems team</Typography>
          </Stack>
        </Stack>
      ),
      code: `import { Chip, Stack, Typography } from '@aura-ui/styled';

<Stack spacing="lg">
  <Stack direction="row" spacing="sm">
    <Chip label="Draft" />
    <Chip label="Review" />
  </Stack>
  <Stack spacing="xs">
    <Typography variant="small">Owner</Typography>
    <Typography variant="muted">Design systems team</Typography>
  </Stack>
</Stack>`,
    },
    {
      title: 'Action rows',
      description:
        'Stack keeps repeated action rows predictable without introducing another layout component.',
      preview: () => (
        <Stack direction="row" spacing="sm">
          <Button size="sm">Save</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </Stack>
      ),
      code: `import { Button, Stack } from '@aura-ui/styled';

<Stack direction="row" spacing="sm">
  <Button size="sm">Save</Button>
  <Button size="sm" variant="outline">Cancel</Button>
</Stack>`,
    },
  ],
  grid: [
    {
      title: 'Equal columns',
      description: 'Use the columns prop for simple equal-width grids.',
      preview: () => (
        <Grid columns={3} className="w-72">
          {['Open', 'Review', 'Done'].map((item) => (
            <Paper key={item} className="p-3 text-center text-sm">
              {item}
            </Paper>
          ))}
        </Grid>
      ),
      code: `import { Grid, Paper } from '@aura-ui/styled';

<Grid columns={3}>
  <Paper>Open</Paper>
  <Paper>Review</Paper>
  <Paper>Done</Paper>
</Grid>`,
    },
    {
      title: 'Dashboard composition',
      description: 'Combine Grid with column spans through className for dashboard cards.',
      preview: () => (
        <Grid columns={4} className="w-80">
          <Paper className="col-span-3 p-3 text-sm">Activity</Paper>
          <Paper className="p-3 text-sm">72%</Paper>
          <Paper className="col-span-2 p-3 text-sm">Queue</Paper>
          <Paper className="col-span-2 p-3 text-sm">Health</Paper>
        </Grid>
      ),
      code: `import { Grid, Paper } from '@aura-ui/styled';

<Grid columns={4}>
  <Paper className="col-span-3">Activity</Paper>
  <Paper>72%</Paper>
  <Paper className="col-span-2">Queue</Paper>
  <Paper className="col-span-2">Health</Paper>
</Grid>`,
    },
  ],
  paper: [
    {
      title: 'Elevation levels',
      description: 'Elevation changes shadow depth while preserving the same theme-aware surface.',
      preview: () => (
        <Stack direction="row" spacing="sm">
          {[0, 1, 2, 3].map((elevation) => (
            <Paper key={elevation} elevation={elevation as 0 | 1 | 2 | 3} className="p-3 text-xs">
              {elevation}
            </Paper>
          ))}
        </Stack>
      ),
      code: `import { Paper } from '@aura-ui/styled';

<Paper elevation={0}>Flat</Paper>
<Paper elevation={1}>Low</Paper>
<Paper elevation={2}>Medium</Paper>
<Paper elevation={3}>High</Paper>`,
    },
    {
      title: 'Content surface',
      description: 'Use Paper for bounded content blocks inside larger layouts.',
      preview: () => (
        <Paper elevation={2} className="w-72 p-4">
          <Typography variant="h4">Billing</Typography>
          <Typography variant="muted">Invoices and payment methods.</Typography>
        </Paper>
      ),
      code: `import { Paper, Typography } from '@aura-ui/styled';

<Paper elevation={2} className="p-4">
  <Typography variant="h4">Billing</Typography>
  <Typography variant="muted">Invoices and payment methods.</Typography>
</Paper>`,
    },
  ],
  typography: [
    {
      title: 'Text scale',
      description: 'Typography gives common headings and body text a consistent rhythm.',
      preview: () => (
        <Stack spacing="sm">
          <Typography variant="h2">Build components faster</Typography>
          <Typography variant="body">Compose primitives with Tailwind tokens.</Typography>
          <Typography variant="muted">Muted copy for supporting context.</Typography>
        </Stack>
      ),
      code: `import { Typography } from '@aura-ui/styled';

<Typography variant="h2">Build components faster</Typography>
<Typography variant="body">Compose primitives with Tailwind tokens.</Typography>
<Typography variant="muted">Muted copy for supporting context.</Typography>`,
    },
    {
      title: 'Inline code',
      description: 'Use the code variant for short tokens and prop names.',
      preview: () => (
        <Typography>
          Set <Typography variant="code">defaultOpen</Typography> for uncontrolled components.
        </Typography>
      ),
      code: `import { Typography } from '@aura-ui/styled';

<Typography>
  Set <Typography variant="code">defaultOpen</Typography> for uncontrolled components.
</Typography>`,
    },
  ],
  link: [
    {
      title: 'External links',
      description: 'Links keep focus treatment and theme color consistent.',
      preview: () => (
        <AuraLink href="https://github.com" target="_blank" rel="noreferrer">
          View source
        </AuraLink>
      ),
      code: `import { Link } from '@aura-ui/styled';

<Link href="https://github.com" target="_blank" rel="noreferrer">
  View source
</Link>`,
    },
    {
      title: 'Inline sentence links',
      description: 'Link can sit naturally inside text without extra wrappers.',
      preview: () => (
        <Typography>
          Read the <AuraLink href="/docs">component documentation</AuraLink> before shipping.
        </Typography>
      ),
      code: `import { Link, Typography } from '@aura-ui/styled';

<Typography>
  Read the <Link href="/docs">component documentation</Link>.
</Typography>`,
    },
  ],
  'svg-icon': [
    {
      title: 'Accessible icon',
      description: 'Provide a title when the icon communicates meaning.',
      preview: () => (
        <SvgIcon title="Success" className="text-success">
          <path d="M20 6 9 17l-5-5" />
        </SvgIcon>
      ),
      code: `import { SvgIcon } from '@aura-ui/styled';

<SvgIcon title="Success" className="text-success">
  <path d="M20 6 9 17l-5-5" />
</SvgIcon>`,
    },
    {
      title: 'Decorative icon',
      description: 'Leave title empty when nearby text already names the action.',
      preview: () => (
        <Button variant="outline" size="sm">
          <SvgIcon>
            <path d="M12 5v14M5 12h14" />
          </SvgIcon>
          Add item
        </Button>
      ),
      code: `import { Button, SvgIcon } from '@aura-ui/styled';

<Button variant="outline">
  <SvgIcon>
    <path d="M12 5v14M5 12h14" />
  </SvgIcon>
  Add item
</Button>`,
    },
  ],
  chart: [],
  chip: [
    {
      title: 'Variants',
      description: 'Chips support default, secondary and outline treatments.',
      preview: () => (
        <Stack direction="row" spacing="sm">
          <Chip label="Default" />
          <Chip label="Secondary" variant="secondary" />
          <Chip label="Outline" variant="outline" />
        </Stack>
      ),
      code: `import { Chip } from '@aura-ui/styled';

<Chip label="Default" />
<Chip label="Secondary" variant="secondary" />
<Chip label="Outline" variant="outline" />`,
    },
    {
      title: 'Deletable chip',
      description: 'Pass onDelete to show the dismiss action.',
      preview: () => <Chip label="Removable" variant="outline" onDelete={() => {}} />,
      code: `import { Chip } from '@aura-ui/styled';

<Chip label="Removable" variant="outline" onDelete={removeTag} />`,
    },
  ],
  'button-group': [
    {
      title: 'Horizontal group',
      description: 'Group related actions into one visual control.',
      preview: () => (
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '@aura-ui/styled';

<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
    },
    {
      title: 'Vertical group',
      description: 'Use vertical orientation for toolbar menus or compact side controls.',
      preview: () => (
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '@aura-ui/styled';

<ButtonGroup orientation="vertical">
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`,
    },
  ],
  'floating-action-button': [
    {
      title: 'Circular action',
      description: 'Use a short accessible label when the visual child is only a symbol.',
      preview: () => <FloatingActionButton aria-label="Create">+</FloatingActionButton>,
      code: `import { FloatingActionButton } from '@aura-ui/styled';

<FloatingActionButton aria-label="Create">+</FloatingActionButton>`,
    },
    {
      title: 'Extended action',
      description: 'Use extended for a prominent action that needs visible text.',
      preview: () => <FloatingActionButton extended>New report</FloatingActionButton>,
      code: `import { FloatingActionButton } from '@aura-ui/styled';

<FloatingActionButton extended>New report</FloatingActionButton>`,
    },
  ],
  rating: [
    {
      title: 'Read-only rating',
      description: 'Use readOnly to display an existing score without interaction.',
      preview: () => <Rating value={4} readOnly />,
      code: `import { Rating } from '@aura-ui/styled';

<Rating value={4} readOnly />`,
    },
    {
      title: 'Custom max and labels',
      description: 'Change max or label text for different scoring systems.',
      preview: () => (
        <Rating defaultValue={7} max={10} getLabelText={(value) => `${value} points`} />
      ),
      code: `import { Rating } from '@aura-ui/styled';

<Rating
  defaultValue={7}
  max={10}
  getLabelText={(value) => \`\${value} points\`}
/>`,
    },
  ],
  autocomplete: [
    {
      title: 'Searchable options',
      description:
        'Autocomplete is the styled Combobox pattern with input, popup and option parts.',
      preview: () => (
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
      ),
      code: `import { Autocomplete } from '@aura-ui/styled';

<Autocomplete.Root>
  <Autocomplete.Input placeholder="Search framework" />
  <Autocomplete.Content>
    <Autocomplete.Item value="react">React</Autocomplete.Item>
    <Autocomplete.Item value="vue">Vue</Autocomplete.Item>
  </Autocomplete.Content>
</Autocomplete.Root>`,
    },
    {
      title: 'Grouped with a label',
      description: 'Wrap the input with your own label and helper text when used inside forms.',
      preview: () => (
        <Stack spacing="sm" className="w-64">
          <Typography as="label" htmlFor="docs-autocomplete" variant="input-label">Framework</Typography>
          <Autocomplete.Root>
            <Autocomplete.Input id="docs-autocomplete" placeholder="Choose one" />
            <Autocomplete.Content>
              <Autocomplete.Item value="react">React</Autocomplete.Item>
              <Autocomplete.Item value="svelte">Svelte</Autocomplete.Item>
            </Autocomplete.Content>
          </Autocomplete.Root>
          <Typography variant="muted">Type to filter available options.</Typography>
        </Stack>
      ),
      code: `import { Autocomplete, Stack, Typography } from '@aura-ui/styled';

<Stack spacing="sm">
  <Typography as="label" htmlFor="framework" variant="input-label">Framework</Typography>
  <Autocomplete.Root>
    <Autocomplete.Input id="framework" placeholder="Choose one" />
    <Autocomplete.Content>
      <Autocomplete.Item value="react">React</Autocomplete.Item>
    </Autocomplete.Content>
  </Autocomplete.Root>
  <Typography variant="muted">Type to filter available options.</Typography>
</Stack>`,
    },
  ],
  'transfer-list': [
    {
      title: 'Custom panel titles',
      description: 'Rename the source and target panels to match the workflow.',
      preview: () => (
        <TransferList
          options={materialOptions}
          defaultValue={['react']}
          sourceTitle="Available frameworks"
          targetTitle="Selected"
        />
      ),
      code: `import { TransferList } from '@aura-ui/styled';

<TransferList
  options={options}
  defaultValue={['react']}
  sourceTitle="Available frameworks"
  targetTitle="Selected"
/>`,
    },
    {
      title: 'Disabled options',
      description: 'Disable options that cannot be moved.',
      preview: () => (
        <TransferList
          options={[...materialOptions, { value: 'solid', label: 'Solid', disabled: true }]}
          defaultValue={['vue']}
        />
      ),
      code: `import { TransferList } from '@aura-ui/styled';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid', disabled: true },
];

<TransferList options={options} />`,
    },
  ],
  list: [
    {
      title: 'Navigation list',
      description: 'Use ItemButton for selectable or clickable rows.',
      preview: () => (
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
      ),
      code: `import { List } from '@aura-ui/styled';

<List.Root>
  <List.Subheader>Workspace</List.Subheader>
  <List.Item>
    <List.ItemButton>
      <List.ItemText>Dashboard</List.ItemText>
    </List.ItemButton>
  </List.Item>
</List.Root>`,
    },
    {
      title: 'Static list items',
      description: 'Use Item and ItemText for semantic list content that is not clickable.',
      preview: () => (
        <List.Root className="border-border w-64 rounded-md border">
          <List.Item className="px-3 py-2">
            <List.ItemText>Build completed</List.ItemText>
          </List.Item>
          <List.Item className="px-3 py-2">
            <List.ItemText>Deploy queued</List.ItemText>
          </List.Item>
        </List.Root>
      ),
      code: `import { List } from '@aura-ui/styled';

<List.Root>
  <List.Item>
    <List.ItemText>Build completed</List.ItemText>
  </List.Item>
  <List.Item>
    <List.ItemText>Deploy queued</List.ItemText>
  </List.Item>
</List.Root>`,
    },
  ],
  'image-list': [
    {
      title: 'Image grid with captions',
      description: 'Compose image, item and caption parts for gallery cards.',
      preview: () => (
        <ImageList.Root className="w-80 grid-cols-3">
          {['Forest', 'Desert', 'Coast'].map((label, index) => (
            <ImageList.Item key={label}>
              <ImageList.Image
                src={`https://images.unsplash.com/photo-${index === 0 ? '1500530855697-b586d89ba3ee' : index === 1 ? '1501785888041-af3ef285b470' : '1507525428034-b723cf961d3e'}?w=240&h=240&fit=crop`}
                alt={label}
              />
              <ImageList.Caption>{label}</ImageList.Caption>
            </ImageList.Item>
          ))}
        </ImageList.Root>
      ),
      code: `import { ImageList } from '@aura-ui/styled';

<ImageList.Root>
  <ImageList.Item>
    <ImageList.Image src={src} alt="Forest" />
    <ImageList.Caption>Forest</ImageList.Caption>
  </ImageList.Item>
</ImageList.Root>`,
    },
    {
      title: 'Dense image tiles',
      description: 'Override grid classes when you need a tighter layout.',
      preview: () => (
        <ImageList.Root className="w-64 grid-cols-2 gap-2">
          {['One', 'Two'].map((label) => (
            <ImageList.Item key={label}>
              <ImageList.Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=240&h=240&fit=crop"
                alt={label}
              />
            </ImageList.Item>
          ))}
        </ImageList.Root>
      ),
      code: `import { ImageList } from '@aura-ui/styled';

<ImageList.Root className="grid-cols-2 gap-2">
  <ImageList.Item>
    <ImageList.Image src={src} alt="Workspace" />
  </ImageList.Item>
</ImageList.Root>`,
    },
  ],
  table: [
    {
      title: 'Header, body and footer',
      description: 'Use semantic table parts for tabular data.',
      preview: () => (
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
      ),
      code: `import { Table } from '@aura-ui/styled';

<Table.Root>
  <Table.Header>
    <Table.Row><Table.Head>Plan</Table.Head><Table.Head>Seats</Table.Head></Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row><Table.Cell>Pro</Table.Cell><Table.Cell>12</Table.Cell></Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.Row><Table.Cell>Total</Table.Cell><Table.Cell>44</Table.Cell></Table.Row>
  </Table.Footer>
</Table.Root>`,
    },
    {
      title: 'Captioned table',
      description: 'Use Caption for screen-reader and visual context.',
      preview: () => (
        <Table.Root className="w-80">
          <Table.Caption>Recent invoices</Table.Caption>
          <Table.Body>
            <Table.Row>
              <Table.Cell>INV-001</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      ),
      code: `import { Table } from '@aura-ui/styled';

<Table.Root>
  <Table.Caption>Recent invoices</Table.Caption>
  <Table.Body>
    <Table.Row><Table.Cell>INV-001</Table.Cell><Table.Cell>Paid</Table.Cell></Table.Row>
  </Table.Body>
</Table.Root>`,
    },
  ],
  backdrop: [
    {
      title: 'Inline demonstration',
      description:
        'Force mount the backdrop and override positioning when documenting or testing it inline.',
      preview: () => (
        <Backdrop open forceMount className="relative inset-auto h-28 w-64 rounded-md" />
      ),
      code: `import { Backdrop } from '@aura-ui/styled';

<Backdrop open forceMount className="relative inset-auto h-28 w-64 rounded-md" />`,
    },
    {
      title: 'Modal loading state',
      description: 'Use Backdrop behind blocking async work or low-level modal surfaces.',
      preview: () => (
        <Box className="border-border relative grid h-32 w-72 place-items-center overflow-hidden rounded-md border">
          <Backdrop open forceMount className="absolute inset-0 rounded-md" />
          <Spinner className="relative z-10" />
        </Box>
      ),
      code: `import { Backdrop, Spinner } from '@aura-ui/styled';

<div className="relative">
  <Backdrop open />
  <Spinner />
</div>`,
    },
  ],
  snackbar: [
    {
      title: 'Static placement',
      description: 'Override positioning for embedded examples and tests.',
      preview: () => (
        <Snackbar defaultOpen className="static translate-x-0">
          Profile updated
        </Snackbar>
      ),
      code: `import { Snackbar } from '@aura-ui/styled';

<Snackbar defaultOpen className="static translate-x-0">
  Profile updated
</Snackbar>`,
    },
    {
      title: 'Auto-hide message',
      description: 'Use autoHideDuration when the snackbar should dismiss itself.',
      preview: () => (
        <Snackbar defaultOpen autoHideDuration={6000} className="static translate-x-0">
          Saved for later
        </Snackbar>
      ),
      code: `import { Snackbar } from '@aura-ui/styled';

<Snackbar open={open} onOpenChange={setOpen} autoHideDuration={6000}>
  Saved for later
</Snackbar>`,
    },
  ],
  'app-bar': [
    {
      title: 'Toolbar composition',
      description: 'Place navigation, title and actions inside the app bar.',
      preview: () => (
        <AppBar className="relative w-80 rounded-md">
          <Typography variant="h4" className="flex-1">
            Aura
          </Typography>
          <Button size="sm" variant="outline">
            Docs
          </Button>
        </AppBar>
      ),
      code: `import { AppBar, Button, Typography } from '@aura-ui/styled';

<AppBar>
  <Typography variant="h4" className="flex-1">Aura</Typography>
  <Button size="sm" variant="outline">Docs</Button>
</AppBar>`,
    },
    {
      title: 'Sticky app bar',
      description:
        'Use position for page-level behavior, then override to relative only in embedded previews.',
      preview: () => (
        <AppBar position="sticky" className="relative top-auto w-80 rounded-md">
          Sticky page header
        </AppBar>
      ),
      code: `import { AppBar } from '@aura-ui/styled';

<AppBar position="sticky">
  Sticky page header
</AppBar>`,
    },
  ],
  'bottom-navigation': [
    {
      title: 'Three destinations',
      description:
        'BottomNavigation uses tab semantics and controlled/uncontrolled selected value.',
      preview: () => (
        <BottomNavigation.Root
          defaultValue="activity"
          className="border-border w-80 rounded-md border"
        >
          <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
          <BottomNavigation.Item value="activity">Activity</BottomNavigation.Item>
          <BottomNavigation.Item value="settings">Settings</BottomNavigation.Item>
        </BottomNavigation.Root>
      ),
      code: `import { BottomNavigation } from '@aura-ui/styled';

<BottomNavigation.Root defaultValue="activity">
  <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
  <BottomNavigation.Item value="activity">Activity</BottomNavigation.Item>
  <BottomNavigation.Item value="settings">Settings</BottomNavigation.Item>
</BottomNavigation.Root>`,
    },
    {
      title: 'Controlled value',
      description: 'Use value and onValueChange when route state owns the selected item.',
      preview: () => (
        <BottomNavigation.Root value="home" className="border-border w-72 rounded-md border">
          <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
          <BottomNavigation.Item value="search">Search</BottomNavigation.Item>
        </BottomNavigation.Root>
      ),
      code: `import { BottomNavigation } from '@aura-ui/styled';

<BottomNavigation.Root value={value} onValueChange={setValue}>
  <BottomNavigation.Item value="home">Home</BottomNavigation.Item>
  <BottomNavigation.Item value="search">Search</BottomNavigation.Item>
</BottomNavigation.Root>`,
    },
  ],
  'speed-dial': [
    {
      title: 'Open action menu',
      description: 'Use defaultOpen for uncontrolled demos and action discovery.',
      preview: () => (
        <SpeedDial.Root defaultOpen className="relative bottom-auto right-auto">
          <SpeedDial.Content>
            <SpeedDial.Action aria-label="Create">+</SpeedDial.Action>
            <SpeedDial.Action aria-label="Close">x</SpeedDial.Action>
          </SpeedDial.Content>
          <SpeedDial.Trigger />
        </SpeedDial.Root>
      ),
      code: `import { SpeedDial } from '@aura-ui/styled';

<SpeedDial.Root defaultOpen>
  <SpeedDial.Content>
    <SpeedDial.Action aria-label="Create">+</SpeedDial.Action>
    <SpeedDial.Action aria-label="Close">x</SpeedDial.Action>
  </SpeedDial.Content>
  <SpeedDial.Trigger />
</SpeedDial.Root>`,
    },
    {
      title: 'Controlled speed dial',
      description: 'Control open state when the speed dial is coordinated with other app state.',
      preview: () => (
        <SpeedDial.Root open={false} className="relative bottom-auto right-auto">
          <SpeedDial.Trigger aria-label="Open actions" />
        </SpeedDial.Root>
      ),
      code: `import { SpeedDial } from '@aura-ui/styled';

<SpeedDial.Root open={open} onOpenChange={setOpen}>
  <SpeedDial.Content>
    <SpeedDial.Action aria-label="Upload">U</SpeedDial.Action>
  </SpeedDial.Content>
  <SpeedDial.Trigger aria-label="Open actions" />
</SpeedDial.Root>`,
    },
  ],
  masonry: [
    {
      title: 'Responsive card wall',
      description: 'Masonry balances uneven content heights across columns.',
      preview: () => (
        <Masonry columns={3} className="w-80">
          {[72, 104, 88, 128, 96].map((height, index) => (
            <Paper
              key={height}
              className="grid place-items-center p-3 text-sm"
              style={{ minHeight: height }}
            >
              Card {index + 1}
            </Paper>
          ))}
        </Masonry>
      ),
      code: `import { Masonry, Paper } from '@aura-ui/styled';

<Masonry columns={3}>
  {items.map((item) => (
    <Paper key={item.id}>{item.title}</Paper>
  ))}
</Masonry>`,
    },
    {
      title: 'Two-column masonry',
      description: 'Use fewer columns for narrow panels.',
      preview: () => (
        <Masonry columns={2} className="w-64">
          <Paper className="p-3 text-sm">Short</Paper>
          <Paper className="p-3 text-sm">A taller item with more content.</Paper>
          <Paper className="p-3 text-sm">Compact</Paper>
        </Masonry>
      ),
      code: `import { Masonry } from '@aura-ui/styled';

<Masonry columns={2}>
  ...
</Masonry>`,
    },
  ],
  timeline: [
    {
      title: 'Multiple events',
      description: 'Compose separators, dots and content for chronological activity.',
      preview: () => (
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
      ),
      code: `import { Timeline } from '@aura-ui/styled';

<Timeline.Root>
  <Timeline.Item>
    <Timeline.Separator><Timeline.Dot /></Timeline.Separator>
    <Timeline.Content>Created project</Timeline.Content>
  </Timeline.Item>
</Timeline.Root>`,
    },
    {
      title: 'Custom dot states',
      description: 'Customize dot color with token classes for status timelines.',
      preview: () => (
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
      ),
      code: `import { Timeline } from '@aura-ui/styled';

<Timeline.Dot className="bg-success" />
<Timeline.Dot className="bg-warning" />`,
    },
  ],
  'click-away-listener': [
    {
      title: 'Dismiss a panel',
      description: 'Open a panel and click anywhere outside to close it. Clicks inside are ignored.',
      preview: () => {
        const [open, setOpen] = React.useState(false);
        return (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 p-4">
            {!open ? (
              <Button variant="outline" onClick={() => setOpen(true)}>Open panel</Button>
            ) : (
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper className="flex flex-col gap-2 p-4 shadow-md">
                  <span className="text-sm font-medium">Panel is open</span>
                  <span className="text-muted-foreground text-xs">Click outside to dismiss</span>
                  <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Close</Button>
                </Paper>
              </ClickAwayListener>
            )}
          </div>
        );
      },
      code: `import { ClickAwayListener, Paper, Button } from '@aura-ui/styled';

const [open, setOpen] = useState(false);

{!open ? (
  <Button onClick={() => setOpen(true)}>Open panel</Button>
) : (
  <ClickAwayListener onClickAway={() => setOpen(false)}>
    <Paper>
      <p>Click outside to dismiss</p>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </Paper>
  </ClickAwayListener>
)}`,
    },
    {
      title: 'Tooltip-style popover',
      description: 'Use with a dropdown or popover surface — inside clicks keep it open.',
      preview: () => {
        const [open, setOpen] = React.useState(false);
        return (
          <div className="flex min-h-[140px] flex-col items-start gap-3 p-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(o => !o)}>
              {open ? 'Opened (click outside)' : 'Open menu'}
            </Button>
            {open && (
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper className="flex flex-col gap-1 p-2 text-xs shadow-md min-w-[140px]">
                  <button className="hover:bg-muted rounded px-3 py-1.5 text-left" onClick={() => setOpen(false)}>Item A</button>
                  <button className="hover:bg-muted rounded px-3 py-1.5 text-left" onClick={() => setOpen(false)}>Item B</button>
                  <button className="hover:bg-muted rounded px-3 py-1.5 text-left" onClick={() => setOpen(false)}>Item C</button>
                </Paper>
              </ClickAwayListener>
            )}
          </div>
        );
      },
      code: `import { ClickAwayListener, Paper } from '@aura-ui/styled';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(o => !o)}>Open menu</Button>
{open && (
  <ClickAwayListener onClickAway={() => setOpen(false)}>
    <Paper>
      <button onClick={() => setOpen(false)}>Item A</button>
      <button onClick={() => setOpen(false)}>Item B</button>
    </Paper>
  </ClickAwayListener>
)}`,
    },
  ],
  'no-ssr': [
    {
      title: 'Browser-only value',
      description: 'Show content that relies on browser APIs — safe on the server, accurate on the client.',
      preview: () => (
        <NoSsr fallback={
          <Paper className="flex flex-col gap-1 p-4 text-sm opacity-50">
            <span>Rendering on server…</span>
          </Paper>
        }>
          <Paper className="flex flex-col gap-1 p-4 text-sm">
            <span className="font-medium">Rendered on client ✓</span>
            <span className="text-muted-foreground text-xs">
              Viewport: {typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}px` : ''}
            </span>
          </Paper>
        </NoSsr>
      ),
      code: `import { NoSsr } from '@aura-ui/styled';

<NoSsr fallback={<span>Loading…</span>}>
  Viewport: {window.innerWidth}×{window.innerHeight}px
</NoSsr>`,
    },
    {
      title: 'Deferred with one frame',
      description: 'Pass defer to delay one animation frame after mount, smoothing flash for slow renders.',
      preview: () => (
        <NoSsr fallback={<Chip label="Loading…" variant="outline" />} defer>
          <Chip label="Deferred client render ✓" />
        </NoSsr>
      ),
      code: `import { Chip, NoSsr } from '@aura-ui/styled';

<NoSsr fallback={<Chip label="Loading…" />} defer>
  <Chip label="Deferred client render" />
</NoSsr>`,
    },
  ],
  portal: [
    {
      title: 'Inline container portal',
      description: 'Portal renders children inside a specific DOM node — here visible within the preview.',
      preview: () => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const [mounted, setMounted] = React.useState(false);
        React.useEffect(() => { setMounted(true); }, []);
        return (
          <div ref={containerRef} className="border-border flex min-h-12 items-center gap-2 rounded-md border p-3 text-sm">
            <span className="text-muted-foreground text-xs shrink-0">Container:</span>
            {mounted && containerRef.current && (
              <Portal container={containerRef.current}>
                <span className="text-primary font-medium text-xs">Portalled here ✓</span>
              </Portal>
            )}
          </div>
        );
      },
      code: `import { Portal } from '@aura-ui/styled';

const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef}>
  <Portal container={containerRef.current}>
    <span>Portalled here</span>
  </Portal>
</div>`,
    },
    {
      title: 'Body portal',
      description: 'Without a container, Portal renders into document.body — useful for modals and overlays.',
      preview: () => (
        <Typography variant="muted" className="text-xs">
          Content portalled to document.body exits this preview container — useful for z-index isolation.
        </Typography>
      ),
      code: `import { Portal } from '@aura-ui/styled';

// renders into document.body
<Portal>
  <div className="fixed inset-0 z-50">Overlay</div>
</Portal>`,
    },
  ],
  popper: [
    {
      title: 'Toggle with anchorEl',
      description: 'Pass open and anchorEl to show/hide positioned content next to an element.',
      preview: () => {
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef<HTMLButtonElement>(null);
        return (
          <div className="flex flex-col items-center gap-6 py-6">
            <Button ref={anchorRef} variant="outline" onClick={() => setOpen(o => !o)}>
              {open ? 'Hide' : 'Show'} Popper
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              placement="bottom"
              className="border-border bg-popover rounded-md border p-3 text-sm shadow-md z-50"
            >
              Floating content
            </Popper>
          </div>
        );
      },
      code: `import { Button, Popper } from '@aura-ui/styled';

const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(o => !o)}>Toggle</Button>
<Popper open={open} anchorEl={anchorRef.current} placement="bottom">
  Floating content
</Popper>`,
    },
    {
      title: 'Placement variants',
      description: 'Use placement to control which side the content appears on.',
      preview: () => {
        const [placement, setPlacement] = React.useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
        const anchorRef = React.useRef<HTMLButtonElement>(null);
        const [open, setOpen] = React.useState(true);
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="flex gap-2">
              {(['top', 'bottom', 'left', 'right'] as const).map(p => (
                <Button key={p} size="sm" variant={placement === p ? 'default' : 'outline'} onClick={() => { setPlacement(p); setOpen(true); }}>{p}</Button>
              ))}
            </div>
            <Button ref={anchorRef} variant="secondary" size="sm">Anchor</Button>
            <Popper open={open} anchorEl={anchorRef.current} placement={placement} className="border-border bg-popover rounded-md border px-3 py-1.5 text-xs shadow-md z-50">
              {placement}
            </Popper>
          </div>
        );
      },
      code: `import { Button, Popper } from '@aura-ui/styled';

<Popper open={open} anchorEl={el} placement="top">Top</Popper>
<Popper open={open} anchorEl={el} placement="right">Right</Popper>`,
    },
  ],
  'textarea-autosize': [
    {
      title: 'Minimum rows',
      description: 'The textarea starts at minRows and grows as content wraps.',
      preview: () => (
        <TextareaAutosize minRows={3} placeholder="Write release notes..." className="w-72" />
      ),
      code: `import { TextareaAutosize } from '@aura-ui/styled';

<TextareaAutosize minRows={3} placeholder="Write release notes..." />`,
    },
    {
      title: 'Maximum rows',
      description: 'Set maxRows to stop growth and let the textarea scroll.',
      preview: () => (
        <TextareaAutosize
          minRows={2}
          maxRows={4}
          defaultValue={'Line one\\nLine two\\nLine three'}
          className="w-72"
        />
      ),
      code: `import { TextareaAutosize } from '@aura-ui/styled';

<TextareaAutosize minRows={2} maxRows={4} />`,
    },
  ],
  transition: [
    {
      title: 'Slide animations',
      description: 'slide-up, slide-down, slide-left, slide-right — content enters from the opposite edge.',
      preview: () => {
        const dirs = [
          { anim: 'slide-up', label: '↑ Up' },
          { anim: 'slide-down', label: '↓ Down' },
          { anim: 'slide-left', label: '← Left' },
          { anim: 'slide-right', label: '→ Right' },
        ] as const;
        type Dir = typeof dirs[number]['anim'];
        const [shows, setShows] = React.useState<Record<Dir, boolean>>({ 'slide-up': true, 'slide-down': true, 'slide-left': true, 'slide-right': true });
        return (
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {dirs.map(({ anim, label }) => (
              <div key={anim} className="flex flex-col items-center gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setShows(s => ({ ...s, [anim]: !s[anim] }))}>
                  {label}
                </Button>
                <div className="min-h-[40px] flex items-center justify-center w-full">
                  <Transition in={shows[anim]} timeout={300} animation={anim} unmountOnExit className="border-border bg-muted rounded px-3 py-1.5 text-[11px]">
                    {anim}
                  </Transition>
                </div>
              </div>
            ))}
          </div>
        );
      },
      code: `import { Transition } from '@aura-ui/styled';

<Transition in={show} timeout={300} animation="slide-up" unmountOnExit>
  Content
</Transition>

// other directions: slide-down | slide-left | slide-right`,
    },
    {
      title: 'Scale animations',
      description: 'zoom scales from 75%, grow scales from 90% — both combine with fade.',
      preview: () => {
        const [showZoom, setShowZoom] = React.useState(true);
        const [showGrow, setShowGrow] = React.useState(true);
        return (
          <div className="flex gap-8">
            {[
              { label: 'zoom', anim: 'zoom' as const, show: showZoom, toggle: () => setShowZoom(s => !s) },
              { label: 'grow', anim: 'grow' as const, show: showGrow, toggle: () => setShowGrow(s => !s) },
            ].map(({ label, anim, show, toggle }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Button variant="outline" size="sm" onClick={toggle}>{label}</Button>
                <div className="min-h-[48px] flex items-center justify-center">
                  <Transition in={show} timeout={250} animation={anim} unmountOnExit className="border-border bg-muted rounded px-3 py-2 text-xs">
                    {label}
                  </Transition>
                </div>
              </div>
            ))}
          </div>
        );
      },
      code: `import { Transition } from '@aura-ui/styled';

<Transition in={show} timeout={250} animation="zoom" unmountOnExit>
  Content
</Transition>

// gentle scale: animation="grow"`,
    },
    {
      title: 'Collapse and fade',
      description: 'collapse slides from the top edge; fade is pure opacity-only.',
      preview: () => {
        const [showCollapse, setShowCollapse] = React.useState(true);
        const [showFade, setShowFade] = React.useState(true);
        return (
          <div className="flex gap-8">
            {[
              { label: 'collapse', anim: 'collapse' as const, show: showCollapse, toggle: () => setShowCollapse(s => !s) },
              { label: 'fade', anim: 'fade' as const, show: showFade, toggle: () => setShowFade(s => !s) },
            ].map(({ label, anim, show, toggle }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Button variant="outline" size="sm" onClick={toggle}>{label}</Button>
                <div className="min-h-[48px] flex items-center justify-center">
                  <Transition in={show} timeout={300} animation={anim} unmountOnExit className="border-border bg-muted rounded px-3 py-2 text-xs">
                    {label}
                  </Transition>
                </div>
              </div>
            ))}
          </div>
        );
      },
      code: `import { Transition } from '@aura-ui/styled';

<Transition in={show} timeout={300} animation="collapse" unmountOnExit>
  Content
</Transition>

// pure opacity: animation="fade" (default)`,
    },
    {
      title: 'Render function (status)',
      description: 'Pass a function as children to receive the current transition status and drive custom styles.',
      preview: () => {
        const [show, setShow] = React.useState(true);
        return (
          <div className="flex flex-col items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setShow(s => !s)}>Toggle</Button>
            <Transition in={show} timeout={400}>
              {(status) => (
                <div className="border-border rounded-md border p-3 text-xs font-mono">
                  state: <span className="text-primary">{status}</span>
                </div>
              )}
            </Transition>
          </div>
        );
      },
      code: `import { Transition } from '@aura-ui/styled';

<Transition in={show} timeout={400}>
  {(status) => (
    <div style={{ opacity: status === 'entered' ? 1 : 0 }}>
      {status}
    </div>
  )}
</Transition>`,
    },
  ],
  'css-baseline': [
    {
      title: 'Injected styles',
      description: 'CssBaseline injects a minimal CSS reset as a <style> tag — mount it once at your app root.',
      preview: () => (
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <CssBaseline />
          <Typography variant="muted" className="text-xs">CssBaseline is mounted. Injected rules:</Typography>
          <pre className="bg-muted rounded p-3 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
            {`*, *::before, *::after {\n  box-sizing: border-box;\n}\nhtml {\n  line-height: 1.5;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\nbutton, input, textarea, select {\n  font: inherit;\n}`}
          </pre>
        </div>
      ),
      code: `import { CssBaseline } from '@aura-ui/styled';

export function RootLayout() {
  return (
    <>
      <CssBaseline />
      <App />
    </>
  );
}`,
    },
    {
      title: 'With color-scheme',
      description: 'Pass enableColorScheme to also inject color-scheme: light dark on html.',
      preview: () => (
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <CssBaseline enableColorScheme />
          <pre className="bg-muted rounded p-3 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
            {`html {\n  color-scheme: light dark;\n  /* ... other reset rules */\n}`}
          </pre>
        </div>
      ),
      code: `import { CssBaseline } from '@aura-ui/styled';

<CssBaseline enableColorScheme />`,
    },
  ],
  'init-color-scheme-script': [
    {
      title: 'System mode default',
      description: 'defaultMode="system" reads prefers-color-scheme on first paint — no flash of wrong theme.',
      preview: () => (
        <div className="flex flex-col gap-2 w-full max-w-sm text-xs">
          <InitColorSchemeScript defaultMode="system" />
          <Typography variant="muted">Generated inline script (runs before React hydrates):</Typography>
          <pre className="bg-muted rounded p-3 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
            {`var m = localStorage.getItem("aura-ui-mode") || "system";\nif (m === "system") {\n  m = matchMedia("(prefers-color-scheme: dark)").matches\n    ? "dark" : "light";\n}\ndocument.documentElement\n  .setAttribute("data-theme", m);`}
          </pre>
        </div>
      ),
      code: `// In Next.js root layout.tsx <head>:
import { InitColorSchemeScript } from '@aura-ui/styled';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <InitColorSchemeScript defaultMode="system" />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
    },
    {
      title: 'Custom attribute and storage key',
      description: 'Override the HTML attribute and localStorage key to match your existing theme system.',
      preview: () => (
        <div className="flex flex-col gap-2 w-full max-w-sm text-xs">
          <InitColorSchemeScript attribute="data-color-mode" defaultMode="light" storageKey="my-app-theme" />
          <Typography variant="muted">Script sets data-color-mode on &lt;html&gt;:</Typography>
          <pre className="bg-muted rounded p-3 font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all">
            {`var m = localStorage.getItem("my-app-theme") || "light";\n// ...\ndocument.documentElement\n  .setAttribute("data-color-mode", m);`}
          </pre>
        </div>
      ),
      code: `import { InitColorSchemeScript } from '@aura-ui/styled';

<InitColorSchemeScript
  attribute="data-color-mode"
  defaultMode="light"
  storageKey="my-app-theme"
/>`,
    },
  ],
};

const materialPropExamples: Record<string, ComponentExample> = {
  box: {
    title: 'Supported props',
    description:
      'Use display, spacing shortcuts, asChild and className for system-style composition.',
    preview: () => (
      <Box display="grid" padding={4} margin={1} className="border-border w-72 rounded-md border">
        Grid display with padding 4
      </Box>
    ),
    code: `<Box display="grid" padding={4} margin={1} asChild>
  <section>System-style layout</section>
</Box>`,
  },
  container: {
    title: 'Widths and gutters',
    description: 'maxWidth mirrors the MUI naming, while size remains the Aura alias.',
    preview: () => (
      <Container
        maxWidth={false}
        disableGutters
        className="border-border rounded-md border p-3 text-center text-sm"
      >
        maxWidth=false disableGutters
      </Container>
    ),
    code: `<Container maxWidth={false} disableGutters fixed>
  Full-width content
</Container>`,
  },
  stack: {
    title: 'Alignment and dividers',
    description:
      'Stack supports row/column directions, numeric spacing, wrapping and inserted dividers.',
    preview: () => (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        divider={<Separator orientation="vertical" className="h-6" />}
      >
        <Chip label="One" />
        <Chip label="Two" />
      </Stack>
    ),
    code: `<Stack
  direction="row"
  spacing={2}
  alignItems="center"
  justifyContent="between"
  flexWrap="wrap"
  divider={<Separator orientation="vertical" />}
>
  ...
</Stack>`,
  },
  grid: {
    title: 'Responsive spans',
    description: 'Use columns, spacing and breakpoint span props for MUI-style grid layouts.',
    preview: () => (
      <Grid columns={12} spacing={2} className="w-80">
        <Paper className="col-span-12 p-2 text-sm sm:col-span-6">sm=6</Paper>
        <Paper className="col-span-12 p-2 text-sm sm:col-span-6">sm=6</Paper>
      </Grid>
    ),
    code: `<Grid columns={12} spacing={2}>
  <Grid item xs={12} sm={6}>Left</Grid>
  <Grid item xs={12} sm={6}>Right</Grid>
</Grid>`,
  },
  paper: {
    title: 'Variants',
    description: 'Use outlined, square and elevation levels for common MUI surface states.',
    preview: () => (
      <Stack direction="row" spacing="sm">
        <Paper variant="outlined" square className="p-3 text-sm">
          outlined square
        </Paper>
        <Paper elevation={4} className="p-3 text-sm">
          elevation 4
        </Paper>
      </Stack>
    ),
    code: `<Paper variant="outlined" square>Outlined</Paper>
<Paper variant="elevation" elevation={4}>Elevated</Paper>`,
  },
  typography: {
    title: 'Text props',
    description: 'The supported typography props cover variants, alignment, color and spacing.',
    preview: () => (
      <Stack spacing="xs">
        <Typography variant="overline" color="primary">
          Overline
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Centered heading
        </Typography>
        <Typography noWrap className="w-56">
          This line is intentionally long and will truncate.
        </Typography>
      </Stack>
    ),
    code: `<Typography variant="h6" align="center" color="primary" gutterBottom>
  Heading
</Typography>
<Typography noWrap>Long text...</Typography>
<Typography paragraph>Paragraph-like spacing.</Typography>`,
  },
  link: {
    title: 'Underline and text style',
    description: 'Control underline behavior and text color while keeping anchor semantics.',
    preview: () => (
      <Stack direction="row" spacing="sm">
        <AuraLink href="#" underline="always">
          Always
        </AuraLink>
        <AuraLink href="#" underline="none" color="muted">
          None
        </AuraLink>
      </Stack>
    ),
    code: `<Link href="/docs" underline="always" color="primary" variant="button">
  Docs
</Link>`,
  },
  'svg-icon': {
    title: 'Size and color',
    description: 'Use titleAccess for MUI-style accessible titles.',
    preview: () => (
      <Stack direction="row" spacing="sm">
        <SvgIcon fontSize="small" color="primary" titleAccess="Small">
          <path d="M20 6 9 17l-5-5" />
        </SvgIcon>
        <SvgIcon fontSize="large" color="success" titleAccess="Large">
          <path d="M20 6 9 17l-5-5" />
        </SvgIcon>
      </Stack>
    ),
    code: `<SvgIcon fontSize="large" color="success" titleAccess="Success">
  <path d="M20 6 9 17l-5-5" />
</SvgIcon>`,
  },
  chart: {
    title: 'Bar + Line combined',
    description: 'Combine Chart.Bar and Chart.Line inside Chart.Root. Each series picks from the CSS variable palette automatically.',
    preview: () => (
      <Chart.Root
        data={[
          { month: 'Jan', revenue: 4200, profit: 1400 },
          { month: 'Feb', revenue: 5800, profit: 2700 },
          { month: 'Mar', revenue: 3900, profit: 1300 },
          { month: 'Apr', revenue: 7100, profit: 2900 },
          { month: 'May', revenue: 6400, profit: 2600 },
          { month: 'Jun', revenue: 8300, profit: 3400 },
        ]}
        height={240}
      >
        <Chart.Grid />
        <Chart.XAxis dataKey="month" />
        <Chart.YAxis />
        <Chart.Bar dataKey="revenue" name="Revenue" />
        <Chart.Line dataKey="profit" name="Profit" curve="catmullRom" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Root>
    ),
    code: `import { Chart } from '@aura-ui/styled';

<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.Line dataKey="profit" name="Profit" curve="catmullRom" />
  <Chart.Tooltip />
  <Chart.Legend />
</Chart.Root>`,
  },
  chip: {
    title: 'Variants, colors and slots',
    description:
      'Chips now cover MUI-style filled/outlined, colors, sizes, icons and delete actions.',
    preview: () => (
      <Stack direction="row" spacing="sm" flexWrap="wrap">
        <Chip label="Primary" color="primary" />
        <Chip label="Success" variant="outlined" color="success" />
        <Chip label="Small" size="small" icon={<span>*</span>} onDelete={() => {}} />
      </Stack>
    ),
    code: `<Chip label="Primary" color="primary" />
<Chip label="Success" variant="outlined" color="success" />
<Chip label="Small" size="small" icon={<Icon />} onDelete={remove} clickable />`,
  },
  'button-group': {
    title: 'Shared button props',
    description:
      'ButtonGroup propagates variant, color, size, disabled and fullWidth to Aura Button children.',
    preview: () => (
      <ButtonGroup variant="contained" color="secondary" size="sm">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup variant="contained" color="secondary" size="sm" fullWidth>
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>`,
  },
  'floating-action-button': {
    title: 'Sizes and shapes',
    description: 'Use circular or extended variants with token colors.',
    preview: () => (
      <Stack direction="row" spacing="sm">
        <FloatingActionButton size="small" aria-label="Add">
          +
        </FloatingActionButton>
        <FloatingActionButton variant="extended" color="secondary">
          New
        </FloatingActionButton>
      </Stack>
    ),
    code: `<FloatingActionButton size="small" aria-label="Add">+</FloatingActionButton>
<FloatingActionButton variant="extended" color="secondary">New</FloatingActionButton>`,
  },
  rating: {
    title: 'Sizes, colors and custom icons',
    description:
      'Rating supports controlled/uncontrolled values, custom labels, max, sizes and colors.',
    preview: () => (
      <Stack spacing="sm">
        <Rating defaultValue={3} size="sm" color="yellow" />
        <Rating defaultValue={4} max={6} size="lg" color="orange" />
      </Stack>
    ),
    code: `<Rating defaultValue={3} size="sm" color="yellow" />
<Rating value={value} onValueChange={setValue} max={10} icon="●" emptyIcon="○" />`,
  },
  autocomplete: {
    title: 'Combobox slots',
    description:
      'Autocomplete exposes the underlying combobox root, input, content, group, empty and item slots.',
    preview: () => (
      <Autocomplete.Root>
        <Autocomplete.Input placeholder="Search" className="w-64" />
        <Autocomplete.Content>
          <Autocomplete.Group>
            <Autocomplete.Item value="react">React</Autocomplete.Item>
          </Autocomplete.Group>
          <Autocomplete.Empty>No results</Autocomplete.Empty>
        </Autocomplete.Content>
      </Autocomplete.Root>
    ),
    code: `<Autocomplete.Root>
  <Autocomplete.Input placeholder="Search" />
  <Autocomplete.Content>
    <Autocomplete.Group>
      <Autocomplete.Item value="react">React</Autocomplete.Item>
    </Autocomplete.Group>
    <Autocomplete.Empty>No results</Autocomplete.Empty>
  </Autocomplete.Content>
</Autocomplete.Root>`,
  },
  'transfer-list': {
    title: 'Controlled transfer',
    description: 'Use value and onValueChange when app state owns the selected side.',
    preview: () => (
      <TransferList
        options={materialOptions}
        value={['react']}
        sourceTitle="Available"
        targetTitle="Chosen"
      />
    ),
    code: `<TransferList
  options={options}
  value={selected}
  onValueChange={setSelected}
  sourceTitle="Available"
  targetTitle="Chosen"
/>`,
  },
  list: {
    title: 'Dense rows and slots',
    description:
      'List includes item icon, avatar, text, secondary action, selected, divider and dense props.',
    preview: () => (
      <List.Root dense className="border-border w-72 rounded-md border">
        <List.Subheader disableSticky>Inbox</List.Subheader>
        <List.Item divider>
          <List.ItemButton selected alignItems="flex-start">
            <List.ItemIcon>*</List.ItemIcon>
            <List.ItemText primary="Message" secondary="Secondary text" />
            <List.ItemSecondaryAction>
              <Chip label="2" size="small" />
            </List.ItemSecondaryAction>
          </List.ItemButton>
        </List.Item>
      </List.Root>
    ),
    code: `<List.Root dense disablePadding>
  <List.Item divider>
    <List.ItemButton selected alignItems="flex-start">
      <List.ItemIcon><Icon /></List.ItemIcon>
      <List.ItemText primary="Message" secondary="Secondary text" />
      <List.ItemSecondaryAction>...</List.ItemSecondaryAction>
    </List.ItemButton>
  </List.Item>
</List.Root>`,
  },
  'image-list': {
    title: 'Layout variants',
    description:
      'ImageList supports cols, gap, rowHeight and standard/woven/masonry/quilted variants.',
    preview: () => (
      <ImageList.Root cols={3} gap={2} rowHeight={72} variant="quilted" className="w-72">
        <ImageList.Item>
          <ImageList.Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&h=200&fit=crop"
            alt="Forest"
          />
        </ImageList.Item>
        <ImageList.Item>
          <ImageList.Image
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop"
            alt="Desert"
          />
        </ImageList.Item>
        <ImageList.Item>
          <ImageList.Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop"
            alt="Coast"
          />
        </ImageList.Item>
      </ImageList.Root>
    ),
    code: `<ImageList.Root cols={3} gap={2} rowHeight={120} variant="quilted">
  <ImageList.Item><ImageList.Image src={src} alt="..." /></ImageList.Item>
</ImageList.Root>`,
  },
  table: {
    title: 'Density and sticky header',
    description: 'Table.Root controls density and sticky header styling for semantic table parts.',
    preview: () => (
      <Table.Root size="small" stickyHeader className="w-80">
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
    ),
    code: `<Table.Root size="small" stickyHeader>
  <Table.Header>...</Table.Header>
  <Table.Body>...</Table.Body>
</Table.Root>`,
  },
  backdrop: {
    title: 'Invisible mode',
    description: 'Invisible backdrops keep blocking behavior while removing the scrim color.',
    preview: () => (
      <Backdrop
        open
        forceMount
        invisible
        className="border-border relative inset-auto h-24 w-56 rounded-md border"
      />
    ),
    code: `<Backdrop open invisible />`,
  },
  snackbar: {
    title: 'Anchors and actions',
    description:
      'Snackbar supports MUI-style anchorOrigin, message, action, auto-hide and close reasons.',
    preview: () => (
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
    ),
    code: `<Snackbar
  open={open}
  message="Archived"
  action={<Button>Undo</Button>}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  autoHideDuration={6000}
  onClose={(event, reason) => ...}
/>`,
  },
  'app-bar': {
    title: 'Color and elevation',
    description: 'AppBar supports MUI-like position, color, elevation and square props.',
    preview: () => (
      <AppBar position="relative" color="primary" elevation={3} square={false} className="w-80">
        <Typography variant="h6" color="inherit">
          Primary app bar
        </Typography>
      </AppBar>
    ),
    code: `<AppBar position="sticky" color="primary" elevation={3} square={false}>
  <Typography color="inherit">Title</Typography>
</AppBar>`,
  },
  'bottom-navigation': {
    title: 'Icons and labels',
    description: 'Use showLabels on the root or showLabel per item.',
    preview: () => (
      <BottomNavigation.Root
        defaultValue="home"
        showLabels
        className="border-border w-80 rounded-md border"
      >
        <BottomNavigation.Item value="home" label="Home" icon={<span>*</span>} />
        <BottomNavigation.Item value="search" label="Search" icon={<span>?</span>} />
      </BottomNavigation.Root>
    ),
    code: `<BottomNavigation.Root value={value} onValueChange={setValue} showLabels>
  <BottomNavigation.Item value="home" icon={<HomeIcon />} label="Home" />
  <BottomNavigation.Item value="search" icon={<SearchIcon />} label="Search" />
</BottomNavigation.Root>`,
  },
  'speed-dial': {
    title: 'Direction and tooltips',
    description: 'SpeedDial supports direction, hidden, custom icons and action tooltip labels.',
    preview: () => (
      <SpeedDial.Root defaultOpen direction="left" className="relative bottom-auto right-auto">
        <SpeedDial.Content>
          <SpeedDial.Action aria-label="Add" tooltipTitle="Add" tooltipOpen>
            +
          </SpeedDial.Action>
        </SpeedDial.Content>
        <SpeedDial.Trigger aria-label="Actions" icon="+" openIcon="x" />
      </SpeedDial.Root>
    ),
    code: `<SpeedDial.Root direction="left" open={open} onOpenChange={setOpen}>
  <SpeedDial.Content>
    <SpeedDial.Action tooltipTitle="Add" aria-label="Add">+</SpeedDial.Action>
  </SpeedDial.Content>
  <SpeedDial.Trigger icon={<AddIcon />} openIcon={<CloseIcon />} />
</SpeedDial.Root>`,
  },
  masonry: {
    title: 'Columns and spacing',
    description: 'Masonry supports 1-6 columns and token spacing.',
    preview: () => (
      <Masonry columns={2} spacing={2} className="w-64">
        <Paper className="p-2 text-sm">Short</Paper>
        <Paper className="p-2 text-sm">A taller content item</Paper>
      </Masonry>
    ),
    code: `<Masonry columns={4} spacing={2}>
  {items.map((item) => <Paper key={item.id}>{item.title}</Paper>)}
</Masonry>`,
  },
  timeline: {
    title: 'Position and dot variants',
    description: 'Timeline supports position plus filled/outlined colored dots.',
    preview: () => (
      <Timeline.Root position="alternate" className="w-72">
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
    ),
    code: `<Timeline.Root position="alternate">
  <Timeline.Item>
    <Timeline.Separator><Timeline.Dot color="success" /></Timeline.Separator>
    <Timeline.Content>Passed</Timeline.Content>
  </Timeline.Item>
</Timeline.Root>`,
  },
  'click-away-listener': {
    title: 'onClickAway callback',
    description: 'Receives the raw mouse or touch event — use it to close, dismiss, or reset.',
    preview: () => {
      const [open, setOpen] = React.useState(false);
      const [count, setCount] = React.useState(0);
      return (
        <div className="flex min-h-[100px] flex-col items-center justify-center gap-3 p-4">
          {!open ? (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open</Button>
          ) : (
            <ClickAwayListener onClickAway={() => { setOpen(false); setCount(c => c + 1); }}>
              <Paper className="flex flex-col gap-1 p-3 text-xs shadow-md">
                <span className="font-medium">Panel open</span>
                <span className="text-muted-foreground">Click outside to close ({count} times)</span>
              </Paper>
            </ClickAwayListener>
          )}
        </div>
      );
    },
    code: `<ClickAwayListener onClickAway={(event) => {
  console.log('clicked away', event);
  close();
}}>
  <Paper>Observed content</Paper>
</ClickAwayListener>`,
  },
  'no-ssr': {
    title: 'fallback and defer',
    description: 'fallback shows during SSR; defer waits one animation frame after mount.',
    preview: () => (
      <NoSsr fallback={<Chip label="Server fallback" variant="outline" />} defer>
        <Chip label="Client render (deferred) ✓" />
      </NoSsr>
    ),
    code: `<NoSsr fallback={<span>Loading...</span>} defer>
  Client-only content
</NoSsr>`,
  },
  portal: {
    title: 'Custom container',
    description: 'Portal renders into document.body by default; pass container for a specific node.',
    preview: () => {
      const containerRef = React.useRef<HTMLDivElement>(null);
      const [mounted, setMounted] = React.useState(false);
      React.useEffect(() => { setMounted(true); }, []);
      return (
        <div ref={containerRef} className="border-border flex min-h-10 items-center gap-2 rounded-md border p-3 text-sm">
          <span className="text-muted-foreground text-xs">Container:</span>
          {mounted && containerRef.current && (
            <Portal container={containerRef.current}>
              <span className="text-primary text-xs font-medium">Portalled ✓</span>
            </Portal>
          )}
        </div>
      );
    },
    code: `<Portal container={containerRef.current}>
  <div>Portaled content</div>
</Portal>`,
  },
  popper: {
    title: 'open + anchorEl',
    description: 'Pass open and anchorEl to show positioned content next to an element.',
    preview: () => {
      const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef<HTMLButtonElement>(null);
      return (
        <div className="flex flex-col items-center gap-6 py-4">
          <Button ref={anchorRef} variant="outline" size="sm" onClick={() => setOpen(o => !o)}>
            {open ? 'Hide' : 'Show'}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} placement="bottom" className="border-border bg-popover rounded-md border p-2 text-xs shadow-md z-50">
            Floating content
          </Popper>
        </div>
      );
    },
    code: `<Popper open={open} anchorEl={anchorRef.current} placement="bottom">
  Floating content
</Popper>`,
  },
  'textarea-autosize': {
    title: 'Row limits',
    description: 'minRows and maxRows define the growth range.',
    preview: () => (
      <TextareaAutosize
        minRows={2}
        maxRows={4}
        defaultValue={'Line one\nLine two'}
        className="w-72"
      />
    ),
    code: `<TextareaAutosize minRows={2} maxRows={4} defaultValue="Line one\\nLine two" />`,
  },
  transition: {
    title: 'animation prop',
    description: 'Pick from 8 built-in animations: fade, slide-up/down/left/right, zoom, grow, collapse.',
    preview: () => {
      const ANIMS = ['fade', 'slide-up', 'zoom', 'grow', 'collapse'] as const;
      type Anim = typeof ANIMS[number];
      const [active, setActive] = React.useState<Anim>('slide-up');
      const [show, setShow] = React.useState(true);
      return (
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <div className="flex flex-wrap justify-center gap-1">
            {ANIMS.map(a => (
              <button key={a} onClick={() => setActive(a)} className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${active === a ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
                {a}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShow(s => !s)}>
            {show ? 'Hide' : 'Show'}
          </Button>
          <Transition in={show} timeout={300} animation={active} unmountOnExit className="border-border rounded-md border px-4 py-2 text-xs">
            {active}
          </Transition>
        </div>
      );
    },
    code: `<Transition
  in={show}
  timeout={300}
  animation="slide-up"
  unmountOnExit
>
  Content
</Transition>`,
  },
  'css-baseline': {
    title: 'Color scheme baseline',
    description: 'enableColorScheme adds color-scheme metadata to the global reset.',
    preview: () => (
      <>
        <CssBaseline enableColorScheme />
        <Typography variant="muted">Baseline with color-scheme enabled.</Typography>
      </>
    ),
    code: `<CssBaseline enableColorScheme />`,
  },
  'init-color-scheme-script': {
    title: 'Storage and attribute',
    description: 'Configure storageKey, defaultMode and attribute before hydration.',
    preview: () => <Typography variant="muted">Place this script before app markup.</Typography>,
    code: `<InitColorSchemeScript
  storageKey="aura-theme"
  defaultMode="system"
  attribute="data-theme"
/>`,
  },
};

const MATERIAL_COMPONENTS: ComponentEntry[] = MATERIAL_COMPONENTS_BASE.map((entry) => {
  const propExample = materialPropExamples[entry.slug];
  return {
    ...entry,
    api: materialApi[entry.slug],
    examples: [...(materialExamples[entry.slug] ?? []), ...(propExample ? [propExample] : [])],
  };
});

/* ── Component registry ─────────────────────────────────────────────── */

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Atoms',
    description:
      'A clickable control with six variants and four sizes, complete with spring-press feedback.',
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
    examples: [
      {
        title: 'Sizes',
        description: 'Four sizes — sm, default, lg, and icon — plus a disabled state.',
        preview: () => (
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">⚙</Button>
            <Button disabled>Disabled</Button>
          </div>
        ),
        code: `import { Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">⚙</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}`,
      },
    ],
    api: [
      {
        name: 'Button',
        description: 'The button element.',
        props: [
          {
            name: 'variant',
            type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'",
            default: "'default'",
            description: 'Visual style.',
          },
          {
            name: 'size',
            type: "'default' | 'sm' | 'lg' | 'icon'",
            default: "'default'",
            description: 'Control size.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Merge props onto the child element instead of rendering a button.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disable the button.',
          },
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
    description:
      'A window overlaid on the primary content, rendering the content underneath inert.',
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
          {
            name: 'defaultOpen',
            type: 'boolean',
            description: 'Initial open state when uncontrolled.',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Called when open state changes.',
          },
          {
            name: 'modal',
            type: 'boolean',
            default: 'true',
            description: 'Whether interaction outside is disabled.',
          },
        ],
      },
      {
        name: 'Dialog.Content',
        description: 'Contains content to be rendered in the open dialog.',
        props: [
          {
            name: 'onEscapeKeyDown',
            type: '(event: KeyboardEvent) => void',
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
    ],
    examples: [
      {
        title: 'Controlled',
        description: 'Manage open state externally to programmatically open or close the dialog.',
        preview: () => {
          function ControlledDialog() {
            const [open, setOpen] = React.useState(false);
            return (
              <div className="flex items-center gap-3">
                <Button onClick={() => setOpen(true)}>Open dialog</Button>
                <span className="text-muted-foreground text-xs">
                  State: {open ? 'open' : 'closed'}
                </span>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                  <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Controlled dialog</Dialog.Title>
                        <Dialog.Description>Open state is managed externally.</Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close asChild>
                          <Button variant="outline">Cancel</Button>
                        </Dialog.Close>
                        <Button onClick={() => setOpen(false)}>Confirm</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            );
          }
          return <ControlledDialog />;
        },
        code: `import { Dialog, Button } from '@aura-ui/styled';

export default function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Controlled dialog</Dialog.Title>
            <Dialog.Description>Open state is managed externally.</Dialog.Description>
            <Dialog.Footer>
              <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}`,
      },
    ],
    keyboard: [
      { key: 'Space', description: 'Opens/closes the dialog from the trigger.' },
      { key: 'Enter', description: 'Opens/closes the dialog from the trigger.' },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element; trapped within content.',
      },
      { key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
      { key: 'Esc', description: 'Closes the dialog and moves focus to the trigger.' },
    ],
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Compound',
    description:
      'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
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
    examples: [
      {
        title: 'With checkboxes and radio items',
        description: 'Toggle options and select an exclusive value inside a dropdown.',
        preview: () => {
          function RichDropdown() {
            const [autoDeploy, setAutoDeploy] = React.useState(true);
            const [env, setEnv] = React.useState('production');
            return (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline">Settings</Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="w-52">
                  <DropdownMenu.Label>Deploy settings</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.CheckboxItem
                    checked={autoDeploy}
                    onCheckedChange={setAutoDeploy}
                  >
                    Auto deploy
                  </DropdownMenu.CheckboxItem>
                  <DropdownMenu.Separator />
                  <DropdownMenu.RadioGroup value={env} onValueChange={setEnv}>
                    <DropdownMenu.RadioItem value="staging">Staging</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="production">Production</DropdownMenu.RadioItem>
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            );
          }
          return <RichDropdown />;
        },
        code: `import { DropdownMenu, Button } from '@aura-ui/styled';

export default function Demo() {
  const [autoDeploy, setAutoDeploy] = React.useState(true);
  const [env, setEnv] = React.useState('production');
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Settings</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-52">
        <DropdownMenu.Label>Deploy settings</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked={autoDeploy} onCheckedChange={setAutoDeploy}>
          Auto deploy
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value={env} onValueChange={setEnv}>
          <DropdownMenu.RadioItem value="staging">Staging</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="production">Production</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}`,
      },
    ],
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
            <h4 className="text-sm font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-xs">Set the dimensions for the layer.</p>
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
    examples: [
      {
        title: 'With form fields',
        description: 'Use a Popover to surface an inline settings panel near its trigger.',
        preview: () => (
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="outline">Team settings</Button>
            </Popover.Trigger>
            <Popover.Content className="w-72">
              <div className="grid gap-3">
                <p className="text-sm font-medium">Team settings</p>
                <div className="grid gap-1.5">
                  <Typography as="label" htmlFor="pop-name" variant="input-label">Team name</Typography>
                  <Input id="pop-name" defaultValue="Design Systems" />
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  Public workspace
                  <Switch defaultChecked />
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
        ),
        code: `import { Popover, Button, Typography, Input, Switch } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Team settings</Button>
      </Popover.Trigger>
      <Popover.Content className="w-72">
        <p className="text-sm font-medium">Team settings</p>
        <Typography as="label" htmlFor="name" variant="input-label">Team name</Typography>
        <Input id="name" defaultValue="Design Systems" />
        <div className="flex items-center justify-between text-sm">
          Public workspace <Switch defaultChecked />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}`,
      },
    ],
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
    description:
      'A popup that displays information related to an element when it receives keyboard focus or hover.',
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
    examples: [
      {
        title: 'Delayed open',
        description: 'Control open/close delays at the Provider level to reduce visual noise.',
        preview: () => (
          <Tooltip.Provider delayDuration={800} skipDelayDuration={300}>
            <div className="flex gap-2">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button variant="outline" size="sm">Hover (800ms delay)</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">Opens after 800ms</Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button variant="outline" size="sm">Hover quickly</Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">Skip delay: 300ms</Tooltip.Content>
              </Tooltip.Root>
            </div>
          </Tooltip.Provider>
        ),
        code: `import { Tooltip, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Tooltip.Provider delayDuration={800} skipDelayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Opens after 800ms</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'Controlled with groups',
        description: 'Group related options under labelled sections and control the value.',
        preview: () => {
          function SelectDemo() {
            const [val, setVal] = React.useState('');
            return (
              <div className="grid gap-2">
                <Select.Root value={val} onValueChange={setVal}>
                  <Select.Trigger className="w-[220px]">
                    <Select.Value placeholder="Assign to team" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Engineering</Select.Label>
                      <Select.Item value="frontend">Frontend</Select.Item>
                      <Select.Item value="backend">Backend</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Product</Select.Label>
                      <Select.Item value="design">Design</Select.Item>
                      <Select.Item value="research">Research</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                {val && <p className="text-muted-foreground text-xs">Selected: {val}</p>}
              </div>
            );
          }
          return <SelectDemo />;
        },
        code: `import { Select } from '@aura-ui/styled';

export default function Demo() {
  const [val, setVal] = React.useState('');
  return (
    <Select.Root value={val} onValueChange={setVal}>
      <Select.Trigger className="w-[220px]">
        <Select.Value placeholder="Assign to team" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Engineering</Select.Label>
          <Select.Item value="frontend">Frontend</Select.Item>
          <Select.Item value="backend">Backend</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Product</Select.Label>
          <Select.Item value="design">Design</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}`,
      },
    ],
    keyboard: [
      { key: 'Space / Enter', description: 'Opens the select / selects the focused item.' },
      { key: 'ArrowDown / ArrowUp', description: 'Moves focus between options.' },
      { key: 'Esc', description: 'Closes the select.' },
    ],
  },
  {
    slug: 'multi-select',
    name: 'Multi Select',
    category: 'Compound',
    description: 'Lets users choose multiple options from a searchable dropdown list.',
    features: [
      'Can be controlled or uncontrolled.',
      'Shows selected values in the trigger.',
      'Supports search, creation and virtualized option rendering.',
      'Keeps the listbox open while toggling options.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    preview: () => {
      const options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ];
      return (
        <MultiSelect.Root defaultValue={['react', 'svelte']}>
          <MultiSelect.Trigger className="w-[240px]">
            <MultiSelect.Value placeholder="Select frameworks" options={options} />
          </MultiSelect.Trigger>
          <MultiSelect.Content options={options} />
        </MultiSelect.Root>
      );
    },
    code: `import { MultiSelect } from '@aura-ui/styled';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export default function Demo() {
  return (
    <MultiSelect.Root defaultValue={['react']} searchable>
      <MultiSelect.Trigger className="w-[320px]">
        <MultiSelect.Value placeholder="Select frameworks" options={options} />
      </MultiSelect.Trigger>
      <MultiSelect.Content options={options} />
    </MultiSelect.Root>
  );
}`,
    examples: [
      {
        title: 'Controlled with max selection',
        description: 'Track selected values externally and cap the selection count.',
        preview: () => {
          const options = [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'solid', label: 'Solid' },
          ];
          function MultiSelectDemo() {
            const [values, setValues] = React.useState<string[]>(['react']);
            return (
              <div className="grid gap-2">
                <MultiSelect.Root value={values} onValueChange={setValues}>
                  <MultiSelect.Trigger className="w-[260px]">
                    <MultiSelect.Value placeholder="Pick up to 2 frameworks" options={options} />
                  </MultiSelect.Trigger>
                  <MultiSelect.Content options={options} />
                </MultiSelect.Root>
                <p className="text-muted-foreground text-xs">
                  Selected: {values.join(', ') || 'none'}
                </p>
              </div>
            );
          }
          return <MultiSelectDemo />;
        },
        code: `import { MultiSelect } from '@aura-ui/styled';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

export default function Demo() {
  const [values, setValues] = React.useState(['react']);
  return (
    <MultiSelect.Root value={values} onValueChange={setValues} max={2}>
      <MultiSelect.Trigger className="w-[260px]">
        <MultiSelect.Value placeholder="Pick up to 2" options={options} />
      </MultiSelect.Trigger>
      <MultiSelect.Content options={options} />
    </MultiSelect.Root>
  );
}`,
      },
    ],
    keyboard: [
      { key: 'Space / Enter', description: 'Opens the multi-select / toggles the focused item.' },
      { key: 'ArrowDown / ArrowUp', description: 'Moves focus between options.' },
      { key: 'Esc', description: 'Closes the multi-select.' },
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
        <Typography as="label" htmlFor="s1" variant="input-label">Airplane mode</Typography>
      </div>
    ),
    code: `import { Switch, Typography } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="s1" defaultChecked />
      <Typography as="label" htmlFor="s1" variant="input-label">Airplane mode</Typography>
    </div>
  );
}`,
    examples: [
      {
        title: 'Controlled toggle',
        description: 'Track the checked state externally to drive other UI.',
        preview: () => {
          function SwitchDemo() {
            const [enabled, setEnabled] = React.useState(false);
            return (
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="s-notifications"
                    checked={enabled}
                    onCheckedChange={setEnabled}
                  />
                  <Typography as="label" htmlFor="s-notifications" variant="input-label">Email notifications</Typography>
                </div>
                <p className="text-muted-foreground text-xs">
                  Status: {enabled ? 'enabled' : 'disabled'}
                </p>
              </div>
            );
          }
          return <SwitchDemo />;
        },
        code: `import { Switch, Typography } from '@aura-ui/styled';

export default function Demo() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="flex items-center gap-2">
      <Switch id="notifications" checked={enabled} onCheckedChange={setEnabled} />
      <Typography as="label" htmlFor="notifications" variant="input-label">Email notifications</Typography>
    </div>
  );
}`,
      },
    ],
    keyboard: [{ key: 'Space / Enter', description: 'Toggles the switch.' }],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Form',
    description:
      'A control that allows the user to toggle between checked, not checked, and indeterminate.',
    features: [
      'Supports indeterminate state.',
      'Full keyboard navigation.',
      'Can be controlled or uncontrolled.',
    ],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
    preview: () => (
      <div className="flex items-center gap-2">
        <Checkbox id="c1" defaultChecked />
        <Typography as="label" htmlFor="c1" variant="input-label">Accept terms and conditions</Typography>
      </div>
    ),
    code: `import { Checkbox, Typography } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="c1" defaultChecked />
      <Typography as="label" htmlFor="c1" variant="input-label">Accept terms and conditions</Typography>
    </div>
  );
}`,
    examples: [
      {
        title: 'Indeterminate state',
        description: 'Use the indeterminate state for a "select all" parent checkbox.',
        preview: () => {
          function CheckboxDemo() {
            const [items, setItems] = React.useState([false, true, false]);
            const allChecked = items.every(Boolean);
            const someChecked = items.some(Boolean);
            const parentState = allChecked ? true : someChecked ? 'indeterminate' : false;
            return (
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="parent"
                    checked={parentState}
                    onCheckedChange={(v) => setItems(items.map(() => !!v))}
                  />
                  <Typography as="label" htmlFor="parent" variant="input-label">Select all</Typography>
                </div>
                {items.map((checked, i) => (
                  <div key={i} className="ml-5 flex items-center gap-2">
                    <Checkbox
                      id={`item-${i}`}
                      checked={checked}
                      onCheckedChange={(v) =>
                        setItems(items.map((c, j) => (j === i ? !!v : c)))
                      }
                    />
                    <Typography as="label" htmlFor={`item-${i}`} variant="input-label">Option {i + 1}</Typography>
                  </div>
                ))}
              </div>
            );
          }
          return <CheckboxDemo />;
        },
        code: `import { Checkbox, Typography } from '@aura-ui/styled';

export default function Demo() {
  const [items, setItems] = React.useState([false, true, false]);
  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const parentState = allChecked ? true : someChecked ? 'indeterminate' : false;
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="parent" checked={parentState}
          onCheckedChange={(v) => setItems(items.map(() => !!v))} />
        <Typography as="label" htmlFor="parent" variant="input-label">Select all</Typography>
      </div>
      {items.map((checked, i) => (
        <div key={i} className="ml-5 flex items-center gap-2">
          <Checkbox id={\`item-\${i}\`} checked={checked}
            onCheckedChange={(v) => setItems(items.map((c, j) => j === i ? !!v : c))} />
          <Typography as="label" htmlFor={\`item-\${i}\`} variant="input-label">Option {i + 1}</Typography>
        </div>
      ))}
    </div>
  );
}`,
      },
    ],
    keyboard: [{ key: 'Space', description: 'Toggles the checkbox.' }],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Disclosure',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
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
    examples: [
      {
        title: 'Multiple panels',
        description: 'Allow several panels to be open simultaneously.',
        preview: () => (
          <Accordion.Root type="multiple" className="w-full max-w-sm">
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
        ),
        code: `import { Accordion } from '@aura-ui/styled';

const items = [
  { value: 'accessibility', label: 'Accessibility', body: 'Keyboard navigation and ARIA state are built in.' },
  { value: 'theming', label: 'Theming', body: 'Styles are composed from CSS-variable-backed Tailwind tokens.' },
  { value: 'composition', label: 'Composition', body: 'Use asChild to compose triggers with your own elements.' },
];

export default function Demo() {
  return (
    <Accordion.Root type="multiple">
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Trigger>{item.label}</Accordion.Trigger>
          <Accordion.Content>{item.body}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}`,
      },
    ],
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
    description:
      'A set of layered sections of content — known as tab panels — displayed one at a time.',
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
        <Tabs.Content value="account" className="text-muted-foreground text-sm">
          Make changes to your account here.
        </Tabs.Content>
        <Tabs.Content value="password" className="text-muted-foreground text-sm">
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
    examples: [
      {
        title: 'Three tabs',
        description: 'Multiple tabs for account, password, and billing settings.',
        preview: () => (
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
        ),
        code: `import { Tabs } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
      <Tabs.Content value="password">Update your password and recovery methods.</Tabs.Content>
      <Tabs.Content value="billing">Manage invoices and seats.</Tabs.Content>
    </Tabs.Root>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'Range slider',
        description: 'Pass two default values to create a range slider with two thumbs.',
        preview: () => {
          function RangeDemo() {
            const [range, setRange] = React.useState([20, 80]);
            return (
              <div className="grid gap-3 w-full max-w-sm">
                <Slider
                  value={range}
                  onValueChange={setRange}
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-muted-foreground text-xs text-center">
                  {range[0]} – {range[1]}
                </p>
              </div>
            );
          }
          return <RangeDemo />;
        },
        code: `import { Slider } from '@aura-ui/styled';

export default function Demo() {
  const [range, setRange] = React.useState([20, 80]);
  return (
    <Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
  );
}`,
      },
    ],
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
    features: [
      'Automatic and manual control over when the image renders.',
      'Fallback accepts an arbitrary node.',
      'Delays fallback to avoid flicker.',
    ],
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
    examples: [
      {
        title: 'Avatar group',
        description: 'Stack avatars with negative margin to form a compact group.',
        preview: () => {
          const people = [
            { initials: 'AL', src: 'https://i.pravatar.cc/64?img=1' },
            { initials: 'GH', src: 'https://i.pravatar.cc/64?img=2' },
            { initials: 'MH', src: undefined },
            { initials: 'AT', src: undefined },
          ];
          return (
            <div className="flex -space-x-2">
              {people.map((p) => (
                <Avatar.Root key={p.initials} className="ring-background ring-2">
                  {p.src && <Avatar.Image src={p.src} alt="" />}
                  <Avatar.Fallback>{p.initials}</Avatar.Fallback>
                </Avatar.Root>
              ))}
            </div>
          );
        },
        code: `import { Avatar } from '@aura-ui/styled';

const people = [
  { initials: 'AL', src: '/al.jpg' },
  { initials: 'GH', src: '/gh.jpg' },
  { initials: 'MH', src: undefined },
];

export default function Demo() {
  return (
    <div className="flex -space-x-2">
      {people.map((p) => (
        <Avatar.Root key={p.initials} className="ring-2 ring-background">
          {p.src && <Avatar.Image src={p.src} alt="" />}
          <Avatar.Fallback>{p.initials}</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'Status indicators',
        description: 'Show all five semantic variants to communicate pipeline or task status.',
        preview: () => (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Draft</Badge>
            <Badge variant="success">Published</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Failed</Badge>
          </div>
        ),
        code: `import { Badge } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  );
}`,
      },
    ],
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
        <Card.Content className="text-muted-foreground text-sm">
          Project details go here.
        </Card.Content>
        <Card.Footer>
          <Button size="sm" variant="outline" className="ml-auto">
            Cancel
          </Button>
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
    examples: [
      {
        title: 'With form',
        description: 'A card that wraps a form for collecting user input.',
        preview: () => (
          <Card.Root className="max-w-sm">
            <Card.Header>
              <Card.Title>Team plan</Card.Title>
              <Card.Description>Shared components, tokens, and docs in one workspace.</Card.Description>
            </Card.Header>
            <Card.Content className="grid gap-3">
              <div className="grid gap-1.5">
                <Typography as="label" htmlFor="card-team-name" variant="input-label">Team name</Typography>
                <Input id="card-team-name" defaultValue="Design Systems" />
              </div>
            </Card.Content>
            <Card.Footer className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Card.Footer>
          </Card.Root>
        ),
        code: `import { Card, Button, Typography, Input } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Team plan</Card.Title>
        <Card.Description>Shared workspace.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography as="label" htmlFor="name" variant="input-label">Team name</Typography>
        <Input id="name" defaultValue="Design Systems" />
      </Card.Content>
      <Card.Footer className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Atoms',
    description: 'Displays a callout for user attention.',
    features: ['Five variants: default, destructive, success, warning, info.'],
    preview: () => (
      <div className="w-full max-w-md space-y-2">
        <Alert.Root>
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>You can edit this later.</Alert.Description>
        </Alert.Root>
        <Alert.Root variant="destructive">
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Something went wrong.</Alert.Description>
        </Alert.Root>
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
    examples: [
      {
        title: 'All variants',
        description: 'Five semantic variants to cover every notification context.',
        preview: () => (
          <div className="w-full max-w-md space-y-2">
            <Alert.Root variant="success">
              <Alert.Title>Deployed</Alert.Title>
              <Alert.Description>v2.8.0 is live in production.</Alert.Description>
            </Alert.Root>
            <Alert.Root variant="warning">
              <Alert.Title>Approaching limit</Alert.Title>
              <Alert.Description>Upgrade before the billing cycle ends.</Alert.Description>
            </Alert.Root>
            <Alert.Root variant="info">
              <Alert.Title>Tip</Alert.Title>
              <Alert.Description>Use keyboard shortcuts to move faster.</Alert.Description>
            </Alert.Root>
          </div>
        ),
        code: `import { Alert } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="space-y-2">
      <Alert.Root variant="success">
        <Alert.Title>Deployed</Alert.Title>
        <Alert.Description>v2.8.0 is live in production.</Alert.Description>
      </Alert.Root>
      <Alert.Root variant="warning">
        <Alert.Title>Approaching limit</Alert.Title>
        <Alert.Description>Upgrade before the billing cycle ends.</Alert.Description>
      </Alert.Root>
      <Alert.Root variant="info">
        <Alert.Title>Tip</Alert.Title>
        <Alert.Description>Use keyboard shortcuts to move faster.</Alert.Description>
      </Alert.Root>
    </div>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'States',
        description: 'Input with disabled and invalid (aria-invalid) states.',
        preview: () => (
          <div className="grid gap-2 w-full max-w-sm">
            <Input placeholder="Normal" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Invalid" aria-invalid />
          </div>
        ),
        code: `import { Input } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="grid gap-2">
      <Input placeholder="Normal" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" aria-invalid />
    </div>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'Indeterminate',
        description: 'Pass null or undefined as value to render an indeterminate progress bar.',
        preview: () => (
          <div className="w-full max-w-sm space-y-2">
            <Progress value={null} className="w-full" />
            <p className="text-muted-foreground text-xs text-center">Loading…</p>
          </div>
        ),
        code: `import { Progress } from '@aura-ui/styled';

export default function Demo() {
  return <Progress value={null} />;
}`,
      },
    ],
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
    code: `import { toast, Button } from '@aura-ui/styled';
// Add <Toaster /> once in your root layout

export default function Demo() {
  return (
    <Button onClick={() => toast.success('Scheduled: Friday at 5:00 PM')}>
      Show toast
    </Button>
  );
}`,
    examples: [
      {
        title: 'Success variant',
        description: 'Show a success toast after a user action like saving a record.',
        preview: () => (
          <Button
            variant="outline"
            onClick={() => toast.success('Record saved', { description: 'Changes were persisted successfully.' })}
          >
            Save record
          </Button>
        ),
        code: `import { toast, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Button variant="outline" onClick={() => toast.success('Record saved', { description: 'Changes were persisted successfully.' })}>
      Save record
    </Button>
  );
}`,
      },
      {
        title: 'Error with retry',
        description: 'Show an error toast with a retry button for recoverable failures.',
        preview: () => (
          <Button
            variant="destructive"
            onClick={() =>
              toast.error('Upload failed', {
                description: 'Connection timed out.',
                retry: () => toast.success('File uploaded!'),
              })
            }
          >
            Trigger error
          </Button>
        ),
        code: `import { toast, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Button variant="destructive" onClick={() =>
      toast.error('Upload failed', {
        description: 'Connection timed out.',
        retry: () => toast.success('File uploaded!'),
      })
    }>
      Trigger error
    </Button>
  );
}`,
      },
      {
        title: 'All positions',
        description:
          'Each toast can be placed at any corner or edge via the horizontal and vertical options. Click a button to see the toast appear at that position.',
        preview: () => {
          const verticals = ['top', 'bottom'] as const;
          const horizontals = ['left', 'center', 'right'] as const;
          return (
            <div className="grid grid-cols-3 gap-2">
              {verticals.flatMap((v) =>
                horizontals.map((h) => (
                  <Button
                    key={`${v}-${h}`}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast.info(`${v} · ${h}`, { horizontal: h, vertical: v })
                    }
                  >
                    {v} · {h}
                  </Button>
                )),
              )}
            </div>
          );
        },
        code: `import { toast, Button } from '@aura-ui/styled';
// <Toaster /> in root layout handles all positions

const verticals  = ['top', 'bottom'] as const;
const horizontals = ['left', 'center', 'right'] as const;

export default function Demo() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {verticals.flatMap((v) =>
        horizontals.map((h) => (
          <Button
            key={\`\${v}-\${h}\`}
            variant="outline"
            size="sm"
            onClick={() => toast.info(\`\${v} · \${h}\`, { horizontal: h, vertical: v })}
          >
            {v} · {h}
          </Button>
        )),
      )}
    </div>
  );
}`,
      },
    ],
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
          <div className="flex-1 space-y-2">
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
    examples: [
      {
        title: 'Card placeholder',
        description: 'Compose Skeleton into a card layout while data is loading.',
        preview: () => (
          <div className="w-full max-w-sm rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-2.5 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ),
        code: `import { Skeleton } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-8 w-24 rounded-md" />
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Atoms',
    description: 'A status indicator for pending work.',
    features: [
      'Announces loading state with role="status".',
      'Four token-driven sizes.',
      'Accepts a custom screen-reader label.',
    ],
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
    examples: [
      {
        title: 'Loading button',
        description: 'Embed a Spinner inside a Button to indicate an async action in progress.',
        preview: () => {
          function LoadingButtonDemo() {
            const [loading, setLoading] = React.useState(false);
            return (
              <Button
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 2000);
                }}
              >
                {loading && <Spinner size="sm" label="Saving…" className="mr-2" />}
                {loading ? 'Saving…' : 'Save changes'}
              </Button>
            );
          }
          return <LoadingButtonDemo />;
        },
        code: `import { Button, Spinner } from '@aura-ui/styled';

export default function Demo() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Button disabled={loading} onClick={() => setLoading(true)}>
      {loading && <Spinner size="sm" label="Saving…" className="mr-2" />}
      {loading ? 'Saving…' : 'Save changes'}
    </Button>
  );
}`,
      },
    ],
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
    examples: [
      {
        title: 'Vertical separator',
        description: 'Use orientation="vertical" to separate inline items like nav links.',
        preview: () => (
          <nav className="flex h-5 items-center gap-3 text-sm">
            <a href="#" className="hover:underline">Home</a>
            <Separator orientation="vertical" />
            <a href="#" className="hover:underline">Docs</a>
            <Separator orientation="vertical" />
            <a href="#" className="hover:underline">Blog</a>
          </nav>
        ),
        code: `import { Separator } from '@aura-ui/styled';

export default function Demo() {
  return (
    <nav className="flex h-5 items-center gap-3 text-sm">
      <a href="/">Home</a>
      <Separator orientation="vertical" />
      <a href="/docs">Docs</a>
      <Separator orientation="vertical" />
      <a href="/blog">Blog</a>
    </nav>
  );
}`,
      },
    ],
  },

  /* ── Additional components ─────────────────────────────────────── */
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Form',
    description: 'A styled multi-line text input.',
    features: ['Smooth focus ring.', 'Wraps the native textarea.'],
    preview: () => <Textarea placeholder="Type your message…" className="w-full max-w-sm" />,
    code: `import { Textarea } from '@aura-ui/styled';\n\n<Textarea placeholder="Type your message…" />`,
    examples: [
      {
        title: 'With character count',
        description: 'Combine with state to show a live character counter.',
        preview: () => {
          function TextareaDemo() {
            const [value, setValue] = React.useState('');
            const max = 200;
            return (
              <div className="grid gap-1 w-full max-w-sm">
                <Textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value.slice(0, max))}
                  placeholder="Type your message…"
                  rows={3}
                />
                <p className={`text-xs text-right ${value.length >= max ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {value.length}/{max}
                </p>
              </div>
            );
          }
          return <TextareaDemo />;
        },
        code: `import { Textarea } from '@aura-ui/styled';

export default function Demo() {
  const [value, setValue] = React.useState('');
  const max = 200;
  return (
    <div className="grid gap-1">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, max))}
        placeholder="Type your message…"
        rows={3}
      />
      <p className="text-xs text-right text-muted-foreground">{value.length}/{max}</p>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    category: 'Form',
    description: 'A two-state button that can be on or off.',
    features: ['Controlled or uncontrolled.', 'Two variants, three sizes.'],
    preview: () => <Toggle defaultPressed>Bold</Toggle>,
    code: `import { Toggle } from '@aura-ui/styled';\n\n<Toggle defaultPressed>Bold</Toggle>`,
    examples: [
      {
        title: 'Outline variant',
        description: 'The outline variant pairs well with text editor toolbars.',
        preview: () => (
          <div className="flex gap-1">
            <Toggle variant="outline" defaultPressed aria-label="Bold">
              <strong>B</strong>
            </Toggle>
            <Toggle variant="outline" aria-label="Italic">
              <em>I</em>
            </Toggle>
            <Toggle variant="outline" aria-label="Underline">
              <span className="underline">U</span>
            </Toggle>
          </div>
        ),
        code: `import { Toggle } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex gap-1">
      <Toggle variant="outline" defaultPressed><strong>B</strong></Toggle>
      <Toggle variant="outline"><em>I</em></Toggle>
      <Toggle variant="outline"><span className="underline">U</span></Toggle>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'toggle-group',
    name: 'Toggle Group',
    category: 'Form',
    description: 'A set of two-state buttons that can be single or multiple select.',
    features: ['Single or multiple selection.', 'Roving focus navigation.'],
    preview: () => (
      <ToggleGroup.Root type="multiple" defaultValue={['bold']}>
        <ToggleGroup.Item value="bold">
          <strong>B</strong>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic">
          <em>I</em>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="underline">
          <span className="underline">U</span>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    ),
    code: `import { ToggleGroup } from '@aura-ui/styled';\n\n<ToggleGroup.Root type="multiple">\n  <ToggleGroup.Item value="bold">B</ToggleGroup.Item>\n  <ToggleGroup.Item value="italic">I</ToggleGroup.Item>\n</ToggleGroup.Root>`,
    examples: [
      {
        title: 'Single selection (alignment)',
        description: 'Use type="single" for mutually exclusive choices like text alignment.',
        preview: () => {
          function AlignDemo() {
            const [align, setAlign] = React.useState('left');
            return (
              <div className="grid gap-2">
                <ToggleGroup.Root type="single" value={align} onValueChange={(v) => v && setAlign(v)}>
                  <ToggleGroup.Item value="left" aria-label="Left">L</ToggleGroup.Item>
                  <ToggleGroup.Item value="center" aria-label="Center">C</ToggleGroup.Item>
                  <ToggleGroup.Item value="right" aria-label="Right">R</ToggleGroup.Item>
                </ToggleGroup.Root>
                <p className="text-muted-foreground text-xs">Alignment: {align}</p>
              </div>
            );
          }
          return <AlignDemo />;
        },
        code: `import { ToggleGroup } from '@aura-ui/styled';

export default function Demo() {
  const [align, setAlign] = React.useState('left');
  return (
    <ToggleGroup.Root type="single" value={align} onValueChange={(v) => v && setAlign(v)}>
      <ToggleGroup.Item value="left">L</ToggleGroup.Item>
      <ToggleGroup.Item value="center">C</ToggleGroup.Item>
      <ToggleGroup.Item value="right">R</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'radio-group',
    name: 'Radio Group',
    category: 'Form',
    description: 'A set of checkable buttons where only one can be checked at a time.',
    features: ['Roving focus.', 'Controlled or uncontrolled.'],
    preview: () => (
      <RadioGroup.Root defaultValue="a" className="grid gap-2">
        <label className="flex items-center gap-2 text-sm">
          <RadioGroup.Item value="a" id="ra" /> Option A
        </label>
        <label className="flex items-center gap-2 text-sm">
          <RadioGroup.Item value="b" id="rb" /> Option B
        </label>
      </RadioGroup.Root>
    ),
    code: `import { RadioGroup } from '@aura-ui/styled';\n\n<RadioGroup.Root defaultValue="a">\n  <RadioGroup.Item value="a" />\n  <RadioGroup.Item value="b" />\n</RadioGroup.Root>`,
    examples: [
      {
        title: 'Density selector',
        description: 'Three options with descriptive labels for choosing UI density.',
        preview: () => (
          <RadioGroup.Root defaultValue="comfortable" aria-label="Density" className="grid gap-2">
            {([
              ['compact', 'Compact'],
              ['comfortable', 'Comfortable'],
              ['spacious', 'Spacious'],
            ] as [string, string][]).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-sm">
                <RadioGroup.Item value={value} />
                {label}
              </label>
            ))}
          </RadioGroup.Root>
        ),
        code: `import { RadioGroup } from '@aura-ui/styled';

const options = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'spacious', label: 'Spacious' },
];

export default function Demo() {
  return (
    <RadioGroup.Root defaultValue="comfortable">
      {options.map(({ value, label }) => (
        <label key={value} className="flex items-center gap-2 text-sm">
          <RadioGroup.Item value={value} />
          {label}
        </label>
      ))}
    </RadioGroup.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'form',
    name: 'Form',
    category: 'Form',
    description: 'A form with declarative validation built on native ValidityState.',
    features: ['Built-in and custom matchers.', 'Accessible error messages.'],
    preview: () => (
      <Form.Root className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <Form.Field name="email" className="grid gap-1.5">
          <Form.Label>Email</Form.Label>
          <Form.Control asChild>
            <Input type="email" required placeholder="you@example.com" />
          </Form.Control>
          <Form.Message match="valueMissing" className="text-destructive text-xs">
            Required
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <Button className="mt-3">Submit</Button>
        </Form.Submit>
      </Form.Root>
    ),
    code: `import { Form, Input, Button } from '@aura-ui/styled';\n\n<Form.Root>\n  <Form.Field name="email">\n    <Form.Label>Email</Form.Label>\n    <Form.Control asChild><Input type="email" required /></Form.Control>\n    <Form.Message match="valueMissing">Required</Form.Message>\n  </Form.Field>\n  <Form.Submit asChild><Button>Submit</Button></Form.Submit>\n</Form.Root>`,
    examples: [
      {
        title: 'Login form',
        description: 'A complete login form with email, password, and validation messages.',
        preview: () => (
          <Form.Root className="w-full max-w-sm grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <Form.Field name="email" className="grid gap-1.5">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <Input type="email" required placeholder="you@example.com" />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-destructive text-xs">
                Email is required.
              </Form.Message>
              <Form.Message match="typeMismatch" className="text-destructive text-xs">
                Enter a valid email address.
              </Form.Message>
            </Form.Field>
            <Form.Field name="password" className="grid gap-1.5">
              <Form.Label>Password</Form.Label>
              <Form.Control asChild>
                <Input type="password" required minLength={8} placeholder="••••••••" />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-destructive text-xs">
                Password is required.
              </Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button className="w-full">Log in</Button>
            </Form.Submit>
          </Form.Root>
        ),
        code: `import { Form, Input, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Form.Root className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
      <Form.Field name="email" className="grid gap-1.5">
        <Form.Label>Email</Form.Label>
        <Form.Control asChild>
          <Input type="email" required placeholder="you@example.com" />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-xs text-destructive">Required</Form.Message>
        <Form.Message match="typeMismatch" className="text-xs text-destructive">Invalid email</Form.Message>
      </Form.Field>
      <Form.Field name="password" className="grid gap-1.5">
        <Form.Label>Password</Form.Label>
        <Form.Control asChild><Input type="password" required minLength={8} /></Form.Control>
        <Form.Message match="valueMissing" className="text-xs text-destructive">Required</Form.Message>
      </Form.Field>
      <Form.Submit asChild><Button className="w-full">Log in</Button></Form.Submit>
    </Form.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Atoms',
    description: 'Constrains content to a desired width / height ratio.',
    features: ['Any ratio.', 'Works with images or any node.'],
    preview: () => (
      <div className="w-64">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <div className="bg-accent flex h-full w-full items-center justify-center text-sm">
            16:9
          </div>
        </AspectRatio>
      </div>
    ),
    code: `import { AspectRatio } from '@aura-ui/styled';\n\n<AspectRatio ratio={16 / 9}>\n  <img src="/photo.jpg" alt="" />\n</AspectRatio>`,
    examples: [
      {
        title: 'Portrait and square',
        description: 'Use different ratios for portrait (4/5) and square (1/1) crops.',
        preview: () => (
          <div className="flex gap-3">
            <div className="w-28">
              <AspectRatio ratio={4 / 5} className="overflow-hidden rounded-lg">
                <div className="bg-accent flex h-full w-full items-center justify-center text-xs">4:5</div>
              </AspectRatio>
            </div>
            <div className="w-28">
              <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                <div className="bg-muted flex h-full w-full items-center justify-center text-xs">1:1</div>
              </AspectRatio>
            </div>
          </div>
        ),
        code: `import { AspectRatio } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex gap-3">
      <div className="w-28">
        <AspectRatio ratio={4 / 5} className="overflow-hidden rounded-lg">
          <img src="/portrait.jpg" alt="" className="object-cover w-full h-full" />
        </AspectRatio>
      </div>
      <div className="w-28">
        <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
          <img src="/square.jpg" alt="" className="object-cover w-full h-full" />
        </AspectRatio>
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'circular-progress',
    name: 'Circular Progress',
    category: 'Atoms',
    description: 'A circular progress indicator with determinate and indeterminate modes.',
    features: ['Determinate + indeterminate.', 'Configurable size and stroke.'],
    preview: () => (
      <div className="flex gap-4">
        <CircularProgress value={null} />
        <CircularProgress value={66} />
      </div>
    ),
    code: `import { CircularProgress } from '@aura-ui/styled';\n\n<CircularProgress value={66} />`,
    examples: [
      {
        title: 'Sized with label',
        description: 'Customize track size and embed a label inside the circle.',
        preview: () => (
          <div className="flex gap-6 items-center">
            <CircularProgress value={42} size={64} strokeWidth={6} />
            <CircularProgress value={75} size={80} strokeWidth={8} />
            <CircularProgress value={null} size={64} strokeWidth={6} />
          </div>
        ),
        code: `import { CircularProgress } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex gap-6 items-center">
      <CircularProgress value={42} size={64} strokeWidth={6} />
      <CircularProgress value={75} size={80} strokeWidth={8} />
      <CircularProgress value={null} size={64} strokeWidth={6} />
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'meter',
    name: 'Meter',
    category: 'Atoms',
    description: 'A quantitative measurement within a known range.',
    features: ['low / high / optimum thresholds.', 'role="meter".'],
    preview: () => (
      <Meter value={70} max={100} low={30} high={80} optimum={60} className="w-full max-w-sm" />
    ),
    code: `import { Meter } from '@aura-ui/styled';\n\n<Meter value={70} low={30} high={80} optimum={60} />`,
    examples: [
      {
        title: 'Storage usage',
        description: 'Show disk or quota usage with thresholds for low, high, and optimum.',
        preview: () => (
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-xs">
              <span>Storage</span>
              <span className="text-muted-foreground">47 GB / 100 GB</span>
            </div>
            <Meter value={47} max={100} low={20} high={80} optimum={50} className="w-full" />
          </div>
        ),
        code: `import { Meter } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>Storage</span>
        <span className="text-muted-foreground">47 GB / 100 GB</span>
      </div>
      <Meter value={47} max={100} low={20} high={80} optimum={50} />
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'copy-button',
    name: 'Copy Button',
    category: 'Atoms',
    description: 'Copies text to the clipboard with success feedback.',
    features: ['Animated check feedback.', 'Configurable reset delay.'],
    preview: () => (
      <div className="flex items-center gap-2">
        <code className="bg-muted rounded px-2 py-1 text-sm">npx aura-ui init</code>
        <CopyButton value="npx aura-ui init" />
      </div>
    ),
    code: `import { CopyButton } from '@aura-ui/styled';\n\n<CopyButton value="npx aura-ui init" />`,
    examples: [
      {
        title: 'In a code block',
        description: 'Pair CopyButton with a styled code block — the typical documentation pattern.',
        preview: () => (
          <div className="flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 font-mono text-sm w-full max-w-sm">
            <span>pnpm add @aura-ui/styled</span>
            <CopyButton value="pnpm add @aura-ui/styled" />
          </div>
        ),
        code: `import { CopyButton } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2 font-mono text-sm">
      <span>pnpm add @aura-ui/styled</span>
      <CopyButton value="pnpm add @aura-ui/styled" />
    </div>
  );
}`,
      },
    ],
  },
  ...MATERIAL_COMPONENTS,
  {
    slug: 'collapsible',
    name: 'Collapsible',
    category: 'Disclosure',
    description: 'An interactive component that expands / collapses a panel.',
    features: ['Smooth height animation.', 'Controlled or uncontrolled.'],
    preview: () => (
      <Collapsible.Root className="w-full max-w-sm">
        <Collapsible.Trigger asChild>
          <Button variant="outline">Toggle details</Button>
        </Collapsible.Trigger>
        <Collapsible.Content className="border-border mt-2 rounded-md border p-3 text-sm">
          Hidden content.
        </Collapsible.Content>
      </Collapsible.Root>
    ),
    code: `import { Collapsible, Button } from '@aura-ui/styled';\n\n<Collapsible.Root>\n  <Collapsible.Trigger asChild><Button>Toggle</Button></Collapsible.Trigger>\n  <Collapsible.Content>Hidden content.</Collapsible.Content>\n</Collapsible.Root>`,
    examples: [
      {
        title: 'Controlled',
        description: 'Fully controlled open state with a dynamic toggle indicator.',
        preview: () => {
          function CollapsibleDemo() {
            const [open, setOpen] = React.useState(true);
            return (
              <Collapsible.Root open={open} onOpenChange={setOpen} className="w-full max-w-md">
                <Collapsible.Trigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Release notes
                    <span aria-hidden="true">{open ? '−' : '+'}</span>
                  </Button>
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Added keyboard support, reduced motion handling, and token-based styling.
                </Collapsible.Content>
              </Collapsible.Root>
            );
          }
          return <CollapsibleDemo />;
        },
        code: `import { Collapsible, Button } from '@aura-ui/styled';

export default function Demo() {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Release notes <span>{open ? '−' : '+'}</span>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content className="mt-2 rounded-md border p-4 text-sm">
        Added keyboard support and token-based styling.
      </Collapsible.Content>
    </Collapsible.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Disclosure',
    description: 'Displays the path to the current resource.',
    features: ['Navigable links + current page.', 'Custom separators.'],
    preview: () => (
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Docs</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    ),
    code: `import { Breadcrumb } from '@aura-ui/styled';\n\n<Breadcrumb.Root><Breadcrumb.List>\n  <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>\n  <Breadcrumb.Separator />\n  <Breadcrumb.Item><Breadcrumb.Page>Docs</Breadcrumb.Page></Breadcrumb.Item>\n</Breadcrumb.List></Breadcrumb.Root>`,
    examples: [
      {
        title: 'Multi-level navigation',
        description: 'Three levels showing the full path to the current resource.',
        preview: () => (
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
        ),
        code: `import { Breadcrumb } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Link href="/library">Library</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Page>Components</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Disclosure',
    description: 'Navigation bar matching DataTable pagination: page controls, rows-per-page selector, and total row count.',
    features: ['First / prev / next / last buttons.', 'Page dropdown and rows-per-page selector.', 'Total row count display.'],
    preview: () => {
      function PaginationPreview() {
        const [page, setPage] = React.useState(3);
        return (
          <Pagination
            page={page}
            pageCount={10}
            pageSize={25}
            totalRows={243}
            onPageChange={setPage}
          />
        );
      }
      return <PaginationPreview />;
    },
    code: `import { Pagination } from '@aura-ui/styled';

const [page, setPage] = useState(1);

<Pagination
  page={page}
  pageCount={10}
  totalRows={243}
  onPageChange={setPage}
/>`,
    examples: [
      {
        title: 'With rows-per-page selector',
        description: 'Pass onPageSizeChange to show the rows-per-page dropdown alongside navigation.',
        preview: () => {
          function PaginationWithSizeDemo() {
            const [page, setPage] = React.useState(1);
            const [pageSize, setPageSize] = React.useState(25);
            const totalRows = 389;
            const pageCount = Math.ceil(totalRows / pageSize);
            return (
              <Pagination
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                totalRows={totalRows}
                onPageChange={setPage}
                onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
                pageSizeOptions={[10, 25, 50, 100]}
              />
            );
          }
          return <PaginationWithSizeDemo />;
        },
        code: `import { Pagination } from '@aura-ui/styled';

export default function Demo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalRows = 389;
  const pageCount = Math.ceil(totalRows / pageSize);
  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      totalRows={totalRows}
      onPageChange={setPage}
      onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
      pageSizeOptions={[10, 25, 50, 100]}
    />
  );
}`,
      },
    ],
  },
  {
    slug: 'stepper',
    name: 'Stepper',
    category: 'Disclosure',
    description: 'A multi-step process indicator.',
    features: ['Complete / current / upcoming states.', 'Horizontal or vertical.'],
    preview: () => {
      const [active, setActive] = React.useState(0);
      const steps = 3;
      return (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Stepper.Root activeStep={active} className="w-full">
            <Stepper.Step index={0} />
            <Stepper.Separator />
            <Stepper.Step index={1} />
            <Stepper.Separator />
            <Stepper.Step index={2} />
          </Stepper.Root>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive(a => a - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={active === steps - 1} onClick={() => setActive(a => a + 1)}>Next</Button>
          </div>
        </div>
      );
    },
    code: `import { Stepper, Button } from '@aura-ui/styled';

const [active, setActive] = useState(0);

<Stepper.Root activeStep={active}>
  <Stepper.Step index={0} /><Stepper.Separator />
  <Stepper.Step index={1} /><Stepper.Separator />
  <Stepper.Step index={2} />
</Stepper.Root>
<Button disabled={active === 0} onClick={() => setActive(a => a - 1)}>Previous</Button>
<Button disabled={active === 2} onClick={() => setActive(a => a + 1)}>Next</Button>`,
    examples: [
      {
        title: 'With labels',
        description: 'Each step labeled to describe what happens at that stage.',
        preview: () => {
          const [active, setActive] = React.useState(0);
          const labels = ['Account', 'Profile', 'Billing'];
          return (
            <div className="flex w-full max-w-lg flex-col gap-4">
              <Stepper.Root activeStep={active} className="w-full">
                {labels.map((label, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <Stepper.Separator />}
                    <Stepper.Step index={i}>
                      <Stepper.Title>{label}</Stepper.Title>
                    </Stepper.Step>
                  </React.Fragment>
                ))}
              </Stepper.Root>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive(a => a - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={active === labels.length - 1} onClick={() => setActive(a => a + 1)}>Next</Button>
              </div>
            </div>
          );
        },
        code: `import { Stepper, Button } from '@aura-ui/styled';

const [active, setActive] = useState(0);

<Stepper.Root activeStep={active}>
  <Stepper.Step index={0}><Stepper.Title>Account</Stepper.Title></Stepper.Step>
  <Stepper.Separator />
  <Stepper.Step index={1}><Stepper.Title>Profile</Stepper.Title></Stepper.Step>
  <Stepper.Separator />
  <Stepper.Step index={2}><Stepper.Title>Billing</Stepper.Title></Stepper.Step>
</Stepper.Root>
<Button disabled={active === 0} onClick={() => setActive(a => a - 1)}>Previous</Button>
<Button disabled={active === 2} onClick={() => setActive(a => a + 1)}>Next</Button>`,
      },
    ],
  },
  {
    slug: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlays',
    description: 'A modal dialog that interrupts the user and expects a response.',
    features: ['Focus starts on Cancel.', 'Outside interaction is blocked.'],
    preview: () => (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action>Delete</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    ),
    code: `import { AlertDialog, Button } from '@aura-ui/styled';\n\n<AlertDialog.Root>\n  <AlertDialog.Trigger asChild><Button>Delete</Button></AlertDialog.Trigger>\n  <AlertDialog.Portal>\n    <AlertDialog.Overlay />\n    <AlertDialog.Content>\n      <AlertDialog.Title>Are you sure?</AlertDialog.Title>\n      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n      <AlertDialog.Action>Delete</AlertDialog.Action>\n    </AlertDialog.Content>\n  </AlertDialog.Portal>\n</AlertDialog.Root>`,
    examples: [
      {
        title: 'With async action',
        description: 'Disable the action button while async work is in progress.',
        preview: () => {
          function AlertDialogDemo() {
            const [loading, setLoading] = React.useState(false);
            return (
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
                        All projects and data will be permanently removed. This action cannot be undone.
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <AlertDialog.Cancel disabled={loading}>Cancel</AlertDialog.Cancel>
                      <AlertDialog.Action
                        disabled={loading}
                        onClick={(e) => {
                          e.preventDefault();
                          setLoading(true);
                          setTimeout(() => setLoading(false), 1500);
                        }}
                      >
                        {loading ? 'Deleting…' : 'Delete'}
                      </AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            );
          }
          return <AlertDialogDemo />;
        },
        code: `import { AlertDialog, Button } from '@aura-ui/styled';

export default function Demo() {
  const [loading, setLoading] = React.useState(false);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="destructive">Delete workspace</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Delete workspace?</AlertDialog.Title>
          <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel disabled={loading}>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
              disabled={loading}
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                await deleteWorkspace();
                setLoading(false);
              }}
            >
              {loading ? 'Deleting…' : 'Delete'}
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    category: 'Overlays',
    description: 'A panel that slides in from any edge of the screen.',
    features: ['Four sides.', 'Built on Dialog — focus trap + scroll lock.'],
    preview: () => (
      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button variant="outline">Open sheet</Button>
        </Sheet.Trigger>
        <Sheet.Content side="right">
          <Sheet.Header>
            <Sheet.Title>Sheet</Sheet.Title>
            <Sheet.Description>Slides from the right.</Sheet.Description>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet.Root>
    ),
    code: `import { Sheet, Button } from '@aura-ui/styled';\n\n<Sheet.Root>\n  <Sheet.Trigger asChild><Button>Open</Button></Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Title>Sheet</Sheet.Title>\n  </Sheet.Content>\n</Sheet.Root>`,
    examples: [
      {
        title: 'Edit profile',
        description: 'A right-side sheet with a form for updating user details.',
        preview: () => (
          <Sheet.Root>
            <Sheet.Trigger asChild>
              <Button variant="outline">Edit profile</Button>
            </Sheet.Trigger>
            <Sheet.Content side="right">
              <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>Update account details and notification preferences.</Sheet.Description>
              </Sheet.Header>
              <div className="grid gap-3 py-4">
                <div className="grid gap-1.5">
                  <Typography as="label" htmlFor="sheet-name" variant="input-label">Name</Typography>
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
        ),
        code: `import { Sheet, Button, Typography, Input } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Sheet.Root>
      <Sheet.Trigger asChild><Button variant="outline">Edit profile</Button></Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>Update account details.</Sheet.Description>
        </Sheet.Header>
        <Typography as="label" htmlFor="name" variant="input-label">Name</Typography>
        <Input id="name" defaultValue="Ada Lovelace" />
        <Sheet.Footer>
          <Sheet.Close asChild><Button>Save changes</Button></Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlays',
    description: 'A bottom-anchored sheet, ideal for mobile.',
    features: ['Drag-handle affordance.', 'Slides up from the bottom.'],
    preview: () => (
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button variant="outline">Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer</Drawer.Title>
            <Drawer.Description>A bottom sheet.</Drawer.Description>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer.Root>
    ),
    code: `import { Drawer, Button } from '@aura-ui/styled';\n\n<Drawer.Root>\n  <Drawer.Trigger asChild><Button>Open</Button></Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Title>Drawer</Drawer.Title>\n  </Drawer.Content>\n</Drawer.Root>`,
    examples: [
      {
        title: 'With footer actions',
        description: 'A confirmation drawer with primary and cancel actions in the footer.',
        preview: () => (
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button variant="outline">Confirm deployment</Button>
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
        ),
        code: `import { Drawer, Button } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild><Button variant="outline">Confirm deployment</Button></Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Confirm deployment</Drawer.Title>
          <Drawer.Description>Review before continuing.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Button>Deploy</Button>
          <Drawer.Close asChild><Button variant="outline">Cancel</Button></Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'hover-card',
    name: 'Hover Card',
    category: 'Overlays',
    description: 'A rich popover shown when an element receives hover.',
    features: ['Open / close delays.', 'Pointer can enter the content.'],
    preview: () => (
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <a href="#" className="text-sm font-medium underline underline-offset-4">@aura-ui</a>
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
    ),
    code: `import { HoverCard, Avatar } from '@aura-ui/styled';\n\n<HoverCard.Root>\n  <HoverCard.Trigger asChild><a href="#">@aura-ui</a></HoverCard.Trigger>\n  <HoverCard.Content>\n    <div className="flex items-start gap-3">\n      <Avatar.Root><Avatar.Fallback>AU</Avatar.Fallback></Avatar.Root>\n      <div>\n        <h4 className="text-sm font-semibold">@aura-ui</h4>\n        <p className="text-xs text-muted-foreground">Accessible React components.</p>\n      </div>\n    </div>\n  </HoverCard.Content>\n</HoverCard.Root>`,
  },
  {
    slug: 'context-menu',
    name: 'Context Menu',
    category: 'Compound',
    description: 'A menu triggered by right-click or long-press.',
    features: ['Submenus, checkable items.', 'Full keyboard navigation.'],
    preview: () => (
      <ContextMenu.Root>
        <ContextMenu.Trigger className="border-border text-muted-foreground flex h-24 w-64 items-center justify-center rounded-md border-2 border-dashed text-sm">
          Right-click here
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Paste</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    ),
    code: `import { ContextMenu } from '@aura-ui/styled';\n\n<ContextMenu.Root>\n  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>\n  <ContextMenu.Content>\n    <ContextMenu.Item>Copy</ContextMenu.Item>\n  </ContextMenu.Content>\n</ContextMenu.Root>`,
    examples: [
      {
        title: 'Rich context menu',
        description: 'Include labels, separators, and checkbox items.',
        preview: () => (
          <ContextMenu.Root>
            <ContextMenu.Trigger className="border-border text-muted-foreground flex h-24 w-64 items-center justify-center rounded-md border-2 border-dashed text-sm">
              Right-click for actions
            </ContextMenu.Trigger>
            <ContextMenu.Content className="w-52">
              <ContextMenu.Label>File</ContextMenu.Label>
              <ContextMenu.Item>Open</ContextMenu.Item>
              <ContextMenu.Item>Save</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.CheckboxItem checked>Show toolbar</ContextMenu.CheckboxItem>
              <ContextMenu.Separator />
              <ContextMenu.Item className="text-destructive">Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ),
        code: `import { ContextMenu } from '@aura-ui/styled';

export default function Demo() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="flex h-24 w-64 items-center justify-center rounded-md border-2 border-dashed text-sm">
        Right-click for actions
      </ContextMenu.Trigger>
      <ContextMenu.Content className="w-52">
        <ContextMenu.Label>File</ContextMenu.Label>
        <ContextMenu.Item>Open</ContextMenu.Item>
        <ContextMenu.Item>Save</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.CheckboxItem checked>Show toolbar</ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    category: 'Compound',
    description: 'A horizontal bar of dropdown menus, like a desktop app.',
    features: ['Multiple menus.', 'Roving focus across the bar.'],
    preview: () => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
            <Menubar.Item>Open</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
    ),
    code: `import { Menubar } from '@aura-ui/styled';\n\n<Menubar.Root>\n  <Menubar.Menu>\n    <Menubar.Trigger>File</Menubar.Trigger>\n    <Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content>\n  </Menubar.Menu>\n</Menubar.Root>`,
    examples: [
      {
        title: 'Full application menubar',
        description: 'Three menus with submenus, separators, shortcuts, and radio groups.',
        preview: () => (
          <Menubar.Root>
            <Menubar.Menu>
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>New</Menubar.Item>
                <Menubar.Item>Open</Menubar.Item>
                <Menubar.Separator />
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
                <Menubar.RadioGroup value="system">
                  <Menubar.RadioItem value="light">Light</Menubar.RadioItem>
                  <Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
                  <Menubar.RadioItem value="system">System</Menubar.RadioItem>
                </Menubar.RadioGroup>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        ),
        code: `import { Menubar } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New</Menubar.Item>
          <Menubar.Item>Open</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Save</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.RadioGroup value="system">
            <Menubar.RadioItem value="light">Light</Menubar.RadioItem>
            <Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
            <Menubar.RadioItem value="system">System</Menubar.RadioItem>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Compound',
    description: 'A collection of links for navigating a website.',
    features: ['Submenus with delay.', 'Keyboard accessible.'],
    preview: () => (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="d">
            <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="l">
            <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
    code: `import { NavigationMenu } from '@aura-ui/styled';\n\n<NavigationMenu.Root>\n  <NavigationMenu.List>\n    <NavigationMenu.Item value="docs">\n      <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>\n    </NavigationMenu.Item>\n  </NavigationMenu.List>\n</NavigationMenu.Root>`,
    examples: [
      {
        title: 'With viewport content',
        description: 'Add NavigationMenu.Content to display a rich link grid on hover.',
        preview: () => (
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item value="components">
                <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[280px] p-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {['Button', 'Dialog', 'Popover', 'Tooltip'].map((c) => (
                      <NavigationMenu.Link key={c} href="#" className="hover:bg-accent rounded p-2">
                        {c}
                      </NavigationMenu.Link>
                    ))}
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item value="docs">
                <NavigationMenu.Link href="#" className="px-3 py-2">
                  Docs
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
          </NavigationMenu.Root>
        ),
        code: `import { NavigationMenu } from '@aura-ui/styled';

export default function Demo() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="components">
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content className="w-[280px] p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Button', 'Dialog', 'Popover', 'Tooltip'].map((c) => (
                <NavigationMenu.Link key={c} href="#" className="rounded p-2 hover:bg-accent">
                  {c}
                </NavigationMenu.Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    category: 'Compound',
    description: 'An autocomplete input with a filtered list of options.',
    features: ['Search filtering.', 'Keyboard navigation.'],
    preview: () => (
      <Combobox.Root>
        <Combobox.Input placeholder="Search…" className="w-56" />
        <Combobox.Content>
          {['React', 'Vue', 'Svelte'].map((v) => (
            <Combobox.Item key={v} value={v.toLowerCase()}>
              {v}
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Root>
    ),
    code: `import { Combobox } from '@aura-ui/styled';\n\n<Combobox.Root>\n  <Combobox.Input placeholder="Search…" />\n  <Combobox.Content>\n    <Combobox.Item value="react">React</Combobox.Item>\n  </Combobox.Content>\n</Combobox.Root>`,
    examples: [
      {
        title: 'Controlled value',
        description: 'Track the selected value externally to drive other parts of the UI.',
        preview: () => {
          const frameworks = ['React', 'Vue', 'Svelte', 'Solid', 'Angular'];
          function ComboboxDemo() {
            const [selected, setSelected] = React.useState('');
            return (
              <div className="grid gap-2">
                <Combobox.Root value={selected} onValueChange={setSelected}>
                  <Combobox.Input placeholder="Pick a framework…" className="w-56" />
                  <Combobox.Content>
                    {frameworks.map((f) => (
                      <Combobox.Item key={f} value={f.toLowerCase()}>{f}</Combobox.Item>
                    ))}
                  </Combobox.Content>
                </Combobox.Root>
                {selected && (
                  <p className="text-muted-foreground text-xs">Selected: {selected}</p>
                )}
              </div>
            );
          }
          return <ComboboxDemo />;
        },
        code: `import { Combobox } from '@aura-ui/styled';

const frameworks = ['React', 'Vue', 'Svelte', 'Solid', 'Angular'];

export default function Demo() {
  const [selected, setSelected] = React.useState('');
  return (
    <Combobox.Root value={selected} onValueChange={setSelected}>
      <Combobox.Input placeholder="Pick a framework…" />
      <Combobox.Content>
        {frameworks.map((f) => (
          <Combobox.Item key={f} value={f.toLowerCase()}>{f}</Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'command',
    name: 'Command',
    category: 'Compound',
    description: 'A command palette with fuzzy search, cmdk-style.',
    features: ['Fuzzy filtering.', 'Groups, items, shortcuts.'],
    preview: () => (
      <Command.Root className="border-border w-80 rounded-lg border">
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
    examples: [
      {
        title: 'With shortcuts and groups',
        description: 'A command palette with keyboard shortcuts, icons, and multiple sections.',
        preview: () => (
          <Command.Root className="max-w-md rounded-md border border-border shadow-sm">
            <Command.Input placeholder="Type a command or search" />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group heading="Suggestions">
                <Command.Item>
                  Search
                  <Command.Shortcut>Ctrl K</Command.Shortcut>
                </Command.Item>
                <Command.Item>Favorites</Command.Item>
                <Command.Item>Inbox</Command.Item>
              </Command.Group>
              <Command.Separator />
              <Command.Group heading="Settings">
                <Command.Item>
                  Preferences
                  <Command.Shortcut>Ctrl ,</Command.Shortcut>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>
        ),
        code: `import { Command } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Command.Root>
      <Command.Input placeholder="Type a command or search" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>Search <Command.Shortcut>Ctrl K</Command.Shortcut></Command.Item>
          <Command.Item>Favorites</Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>Preferences <Command.Shortcut>Ctrl ,</Command.Shortcut></Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'one-time-password-field',
    name: 'One-Time Password Field',
    category: 'Form',
    description: 'A segmented input for OTP / PIN codes.',
    features: ['Paste support.', 'Numeric or alphanumeric.'],
    preview: () => (
      <OneTimePasswordField.Root length={4}>
        {[0, 1, 2, 3].map((i) => (
          <OneTimePasswordField.Input key={i} index={i} />
        ))}
      </OneTimePasswordField.Root>
    ),
    code: `import { OneTimePasswordField } from '@aura-ui/styled';\n\n<OneTimePasswordField.Root length={6}>\n  {[0,1,2,3,4,5].map((i) => (\n    <OneTimePasswordField.Input key={i} index={i} />\n  ))}\n</OneTimePasswordField.Root>`,
    examples: [
      {
        title: '6-digit OTP',
        description: 'A six-cell OTP input with completion callback.',
        preview: () => {
          function OTPDemo() {
            const [done, setDone] = React.useState(false);
            return (
              <div className="grid gap-3 text-center">
                <OneTimePasswordField.Root
                  length={6}
                  onComplete={() => setDone(true)}
                  className="gap-2"
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <OneTimePasswordField.Input key={i} index={i} />
                  ))}
                </OneTimePasswordField.Root>
                {done && <p className="text-success text-xs">Code verified!</p>}
              </div>
            );
          }
          return <OTPDemo />;
        },
        code: `import { OneTimePasswordField } from '@aura-ui/styled';

export default function Demo() {
  const [done, setDone] = React.useState(false);
  return (
    <OneTimePasswordField.Root length={6} onComplete={() => setDone(true)}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <OneTimePasswordField.Input key={i} index={i} />
      ))}
    </OneTimePasswordField.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'password-toggle-field',
    name: 'Password Toggle Field',
    category: 'Form',
    description: 'A password input with a show / hide toggle.',
    features: ['Accessible visibility toggle.', 'Controlled or uncontrolled.'],
    preview: () => (
      <PasswordToggleField.Root className="w-full max-w-sm">
        <PasswordToggleField.Input placeholder="Password" />
        <PasswordToggleField.Toggle />
      </PasswordToggleField.Root>
    ),
    code: `import { PasswordToggleField } from '@aura-ui/styled';\n\n<PasswordToggleField.Root>\n  <PasswordToggleField.Input placeholder="Password" />\n  <PasswordToggleField.Toggle />\n</PasswordToggleField.Root>`,
    examples: [
      {
        title: 'With label and strength hint',
        description: 'Wrap in a field layout and add a password strength message.',
        preview: () => (
          <div className="grid gap-1.5 w-full max-w-sm">
            <Typography as="label" htmlFor="pw" variant="input-label">Password</Typography>
            <PasswordToggleField.Root className="w-full" id="pw">
              <PasswordToggleField.Input placeholder="Min. 8 characters" />
              <PasswordToggleField.Toggle />
            </PasswordToggleField.Root>
            <p className="text-muted-foreground text-xs">
              Use at least 8 characters with letters and numbers.
            </p>
          </div>
        ),
        code: `import { PasswordToggleField, Typography } from '@aura-ui/styled';

export default function Demo() {
  return (
    <div className="grid gap-1.5">
      <Typography as="label" htmlFor="pw" variant="input-label">Password</Typography>
      <PasswordToggleField.Root id="pw">
        <PasswordToggleField.Input placeholder="Min. 8 characters" />
        <PasswordToggleField.Toggle />
      </PasswordToggleField.Root>
      <p className="text-xs text-muted-foreground">
        Use at least 8 characters with letters and numbers.
      </p>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'number-field',
    name: 'Number Field',
    category: 'Form',
    description: 'A numeric input with stepper buttons and Intl formatting.',
    features: ['Min / max / step.', 'Keyboard + wheel support.'],
    preview: () => (
      <NumberField.Root defaultValue={5} min={0} max={20}>
        <NumberField.DecrementTrigger />
        <NumberField.Input />
        <NumberField.IncrementTrigger />
      </NumberField.Root>
    ),
    code: `import { NumberField } from '@aura-ui/styled';\n\n<NumberField.Root defaultValue={5} min={0} max={20}>\n  <NumberField.DecrementTrigger />\n  <NumberField.Input />\n  <NumberField.IncrementTrigger />\n</NumberField.Root>`,
    examples: [
      {
        title: 'Quantity selector',
        description: 'A controlled number field used as a cart quantity input.',
        preview: () => {
          function QuantityDemo() {
            const [qty, setQty] = React.useState(1);
            return (
              <div className="flex items-center gap-3">
                <Typography as="label" htmlFor="qty" variant="input-label">Quantity</Typography>
                <NumberField.Root
                  id="qty"
                  value={qty}
                  onValueChange={(v) => setQty(v ?? 1)}
                  min={1}
                  max={99}
                  step={1}
                >
                  <NumberField.DecrementTrigger />
                  <NumberField.Input className="w-14 text-center" />
                  <NumberField.IncrementTrigger />
                </NumberField.Root>
              </div>
            );
          }
          return <QuantityDemo />;
        },
        code: `import { NumberField, Typography } from '@aura-ui/styled';

export default function Demo() {
  const [qty, setQty] = React.useState(1);
  return (
    <div className="flex items-center gap-3">
      <Typography as="label" htmlFor="qty" variant="input-label">Quantity</Typography>
      <NumberField.Root id="qty" value={qty} onValueChange={setQty} min={1} max={99}>
        <NumberField.DecrementTrigger />
        <NumberField.Input className="w-14 text-center" />
        <NumberField.IncrementTrigger />
      </NumberField.Root>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    category: 'Form',
    description: 'A standalone calendar for selecting dates.',
    features: ['Single / range / multiple.', 'Keyboard navigation.'],
    preview: () => <Calendar mode="single" />,
    code: `import { Calendar } from '@aura-ui/styled';\n\n<Calendar mode="single" />`,
    examples: [
      {
        title: 'Range selection',
        description: 'Switch to mode="range" to allow selecting a start and end date.',
        preview: () => <Calendar mode="range" />,
        code: `import { Calendar } from '@aura-ui/styled';

export default function Demo() {
  const [range, setRange] = React.useState(undefined);
  return <Calendar mode="range" selected={range} onSelect={setRange} />;
}`,
      },
    ],
  },
  {
    slug: 'date-picker',
    name: 'Date Picker',
    category: 'Form',
    description: 'A calendar inside a popover for picking a date.',
    features: ['MUI-style field API.', 'Popover-anchored calendar.', 'Controlled or uncontrolled.'],
    preview: () => <DatePicker label="Release date" defaultValue={new Date(2026, 4, 23)} />,
    code: `import { DatePicker } from '@aura-ui/styled';\n\n<DatePicker\n  label="Release date"\n  value={date}\n  onChange={setDate}\n/>`,
    examples: [
      {
        title: 'Controlled with min/max',
        description: 'Restrict selectable dates to a valid booking window.',
        preview: () => {
          function DatePickerDemo() {
            const [date, setDate] = React.useState<Date | null>(null);
            const min = new Date(2026, 4, 1);
            const max = new Date(2026, 11, 31);
            return (
              <div className="grid gap-2">
                <DatePicker
                  label="Booking date"
                  value={date}
                  onChange={setDate}
                  minDate={min}
                  maxDate={max}
                />
                {date && (
                  <p className="text-muted-foreground text-xs">
                    Selected: {date.toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          }
          return <DatePickerDemo />;
        },
        code: `import { DatePicker } from '@aura-ui/styled';

export default function Demo() {
  const [date, setDate] = React.useState(null);
  return (
    <DatePicker
      label="Booking date"
      value={date}
      onChange={setDate}
      minDate={new Date(2026, 0, 1)}
      maxDate={new Date(2026, 11, 31)}
    />
  );
}`,
      },
    ],
  },
  {
    slug: 'date-range-picker',
    name: 'Date Range Picker',
    category: 'Form',
    description: 'Pick a start and end date from a popover calendar.',
    features: ['MUI-style tuple values.', 'Range selection.', 'Popover-anchored.'],
    preview: () => (
      <DateRangePicker
        label="Sprint window"
        defaultValue={[new Date(2026, 4, 20), new Date(2026, 4, 27)]}
      />
    ),
    code: `import { DateRangePicker } from '@aura-ui/styled';\n\n<DateRangePicker\n  label="Sprint window"\n  value={range}\n  onChange={setRange}\n/>`,
    examples: [
      {
        title: 'Controlled range',
        description: 'Track the selected date range externally for form submission.',
        preview: () => {
          function DateRangeDemo() {
            const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null]);
            return (
              <div className="grid gap-2">
                <DateRangePicker
                  label="Report period"
                  value={range}
                  onChange={setRange}
                />
                {range[0] && range[1] && (
                  <p className="text-muted-foreground text-xs">
                    {range[0].toLocaleDateString()} – {range[1].toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          }
          return <DateRangeDemo />;
        },
        code: `import { DateRangePicker } from '@aura-ui/styled';

export default function Demo() {
  const [range, setRange] = React.useState([null, null]);
  return (
    <DateRangePicker
      label="Report period"
      value={range}
      onChange={setRange}
    />
  );
}`,
      },
    ],
  },
  {
    slug: 'time-picker',
    name: 'Time Picker',
    category: 'Form',
    description: 'A MUI-style time field with a 12-hour analog clock panel.',
    features: ['1-12 hour clock.', 'AM/PM and seconds selection.', 'Min/max time validation.'],
    preview: () => (
      <TimePicker label="Start time" defaultValue={new Date(2026, 4, 23, 9, 30)} ampm />
    ),
    code: `import { TimePicker } from '@aura-ui/styled';\n\n<TimePicker\n  label="Start time"\n  value={time}\n  onChange={setTime}\n  ampm\n  minutesStep={15}\n/>`,
    examples: [
      {
        title: '24-hour with step',
        description: 'Use 24-hour mode and snap minutes to 30-minute intervals.',
        preview: () => (
          <TimePicker
            label="Meeting time"
            defaultValue={new Date(2026, 4, 23, 14, 0)}
            minutesStep={30}
          />
        ),
        code: `import { TimePicker } from '@aura-ui/styled';

export default function Demo() {
  return (
    <TimePicker
      label="Meeting time"
      value={time}
      onChange={setTime}
      minutesStep={30}
    />
  );
}`,
      },
    ],
  },
  {
    slug: 'date-time-picker',
    name: 'Date Time Picker',
    category: 'Form',
    description: 'Pick a date first, then choose the time from one popover with MUI-style props.',
    features: [
      'Date-first time picker flow.',
      'Min/max date-time validation.',
      'AM/PM and seconds support.',
    ],
    preview: () => (
      <DateTimePicker
        label="Deployment window"
        defaultValue={new Date(2026, 4, 23, 14, 30)}
        minutesStep={15}
        helperText="Select the date, then choose the time."
      />
    ),
    code: `import { DateTimePicker } from '@aura-ui/styled';\n\n<DateTimePicker\n  label="Deployment window"\n  value={dateTime}\n  onChange={setDateTime}\n  minDateTime={start}\n  maxDateTime={end}\n/>`,
    examples: [
      {
        title: 'With AM/PM and helper text',
        description: 'Enable 12-hour clock and guide the user with helper text.',
        preview: () => (
          <DateTimePicker
            label="Publish at"
            defaultValue={new Date(2026, 4, 23, 9, 0)}
            ampm
            minutesStep={15}
            helperText="Pick the date and then the time."
          />
        ),
        code: `import { DateTimePicker } from '@aura-ui/styled';

export default function Demo() {
  return (
    <DateTimePicker
      label="Publish at"
      value={dateTime}
      onChange={setDateTime}
      ampm
      minutesStep={15}
      helperText="Pick the date and then the time."
    />
  );
}`,
      },
    ],
  },
  {
    slug: 'color-picker',
    name: 'Color Picker',
    category: 'Form',
    description: 'An HSV color picker with hue and alpha sliders.',
    features: ['Saturation / value area.', 'Hue + alpha sliders.'],
    preview: () => (
      <ColorPicker.Root className="border-border w-56 rounded-lg border p-3">
        <ColorPicker.Area />
        <ColorPicker.HueSlider />
        <ColorPicker.AlphaSlider />
        <ColorPicker.Swatch />
      </ColorPicker.Root>
    ),
    code: `import { ColorPicker } from '@aura-ui/styled';\n\n<ColorPicker.Root>\n  <ColorPicker.Area />\n  <ColorPicker.HueSlider />\n  <ColorPicker.AlphaSlider />\n  <ColorPicker.Swatch />\n</ColorPicker.Root>`,
    examples: [
      {
        title: 'Without alpha slider',
        description: 'Omit the AlphaSlider for opaque color selection only.',
        preview: () => (
          <ColorPicker.Root className="border-border w-56 rounded-lg border p-3">
            <ColorPicker.Area />
            <ColorPicker.HueSlider />
            <ColorPicker.Swatch />
          </ColorPicker.Root>
        ),
        code: `import { ColorPicker } from '@aura-ui/styled';

export default function Demo() {
  return (
    <ColorPicker.Root>
      <ColorPicker.Area />
      <ColorPicker.HueSlider />
      <ColorPicker.Swatch />
    </ColorPicker.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'file-upload',
    name: 'File Upload',
    category: 'Form',
    description: 'A drag-and-drop file input with validation.',
    features: ['Drag-and-drop dropzone.', 'accept / size / count limits.'],
    preview: () => (
      <FileUpload.Root multiple className="w-full max-w-sm">
        <FileUpload.Dropzone />
        <FileUpload.Input />
      </FileUpload.Root>
    ),
    code: `import { FileUpload } from '@aura-ui/styled';\n\n<FileUpload.Root multiple maxFiles={3}>\n  <FileUpload.Dropzone />\n  <FileUpload.Input />\n</FileUpload.Root>`,
    examples: [
      {
        title: 'With accepted types and size limit',
        description: 'Restrict uploads to images with a 5 MB size cap.',
        preview: () => (
          <FileUpload.Root
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            className="w-full max-w-sm"
          >
            <FileUpload.Dropzone />
            <FileUpload.Input />
          </FileUpload.Root>
        ),
        code: `import { FileUpload } from '@aura-ui/styled';

export default function Demo() {
  return (
    <FileUpload.Root
      accept="image/*"
      maxSize={5 * 1024 * 1024}
    >
      <FileUpload.Dropzone />
      <FileUpload.Input />
    </FileUpload.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'scroll-area',
    name: 'Scroll Area',
    category: 'Misc',
    description: 'A container with custom, themeable scrollbars.',
    features: ['hover / scroll / always modes.', 'Cross-browser consistency.'],
    preview: () => (
      <ScrollArea.Root className="border-border h-32 w-56 rounded-md border">
        <div className="space-y-1 p-3 text-sm">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea.Root>
    ),
    code: `import { ScrollArea } from '@aura-ui/styled';\n\n<ScrollArea.Root className="h-48">\n  {/* long content */}\n</ScrollArea.Root>`,
    examples: [
      {
        title: 'Horizontal scroll',
        description: 'Combine ScrollArea with a wide inner element for horizontal scrolling.',
        preview: () => (
          <ScrollArea.Root className="border-border w-64 rounded-md border">
            <div className="flex gap-3 p-3" style={{ width: '600px' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="bg-accent flex h-16 w-20 flex-shrink-0 items-center justify-center rounded text-sm font-medium"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
            <ScrollArea.Scrollbar orientation="horizontal" />
          </ScrollArea.Root>
        ),
        code: `import { ScrollArea } from '@aura-ui/styled';

export default function Demo() {
  return (
    <ScrollArea.Root className="w-64 rounded-md border">
      <div className="flex gap-3 p-3" style={{ width: '600px' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex h-16 w-20 flex-shrink-0 items-center justify-center rounded bg-accent text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollArea.Scrollbar orientation="horizontal" />
    </ScrollArea.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'toolbar',
    name: 'Toolbar',
    category: 'Misc',
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
    examples: [
      {
        title: 'Rich text toolbar',
        description: 'Group formatting toggles, a separator, and a link button in a toolbar.',
        preview: () => (
          <Toolbar.Root>
            <Toolbar.Button aria-label="Bold"><strong>B</strong></Toolbar.Button>
            <Toolbar.Button aria-label="Italic"><em>I</em></Toolbar.Button>
            <Toolbar.Button aria-label="Underline"><span className="underline">U</span></Toolbar.Button>
            <Toolbar.Separator />
            <Toolbar.Button>Link</Toolbar.Button>
            <Toolbar.Button>Image</Toolbar.Button>
          </Toolbar.Root>
        ),
        code: `import { Toolbar } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Toolbar.Root>
      <Toolbar.Button aria-label="Bold"><strong>B</strong></Toolbar.Button>
      <Toolbar.Button aria-label="Italic"><em>I</em></Toolbar.Button>
      <Toolbar.Button aria-label="Underline"><span className="underline">U</span></Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Link</Toolbar.Button>
      <Toolbar.Button>Image</Toolbar.Button>
    </Toolbar.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'resizable',
    name: 'Resizable',
    category: 'Misc',
    description: 'Resizable panel groups with draggable handles.',
    features: ['Pointer + keyboard handles.', 'Horizontal or vertical.'],
    preview: () => (
      <Resizable.Group className="border-border h-32 w-full max-w-sm rounded-md border">
        <Resizable.Panel
          id="a"
          defaultSize={50}
          className="flex items-center justify-center text-sm"
        >
          A
        </Resizable.Panel>
        <Resizable.Handle between={['a', 'b']} withHandle />
        <Resizable.Panel
          id="b"
          defaultSize={50}
          className="flex items-center justify-center text-sm"
        >
          B
        </Resizable.Panel>
      </Resizable.Group>
    ),
    code: `import { Resizable } from '@aura-ui/styled';\n\n<Resizable.Group>\n  <Resizable.Panel id="a" defaultSize={50}>A</Resizable.Panel>\n  <Resizable.Handle between={['a','b']} withHandle />\n  <Resizable.Panel id="b" defaultSize={50}>B</Resizable.Panel>\n</Resizable.Group>`,
    examples: [
      {
        title: 'Three-panel layout',
        description: 'A sidebar, main content, and detail panel with draggable handles.',
        preview: () => (
          <Resizable.Group className="border-border h-40 w-full max-w-sm rounded-md border" direction="horizontal">
            <Resizable.Panel id="r-sidebar" defaultSize={25} minSize={15} className="flex items-center justify-center text-xs font-medium">
              Sidebar
            </Resizable.Panel>
            <Resizable.Handle between={['r-sidebar', 'r-main']} withHandle />
            <Resizable.Panel id="r-main" defaultSize={50} className="flex items-center justify-center text-xs font-medium">
              Main
            </Resizable.Panel>
            <Resizable.Handle between={['r-main', 'r-detail']} withHandle />
            <Resizable.Panel id="r-detail" defaultSize={25} minSize={15} className="flex items-center justify-center text-xs font-medium">
              Detail
            </Resizable.Panel>
          </Resizable.Group>
        ),
        code: `import { Resizable } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Resizable.Group className="h-40 w-full rounded-md border" direction="horizontal">
      <Resizable.Panel id="sidebar" defaultSize={25} minSize={15}>Sidebar</Resizable.Panel>
      <Resizable.Handle between={['sidebar', 'main']} withHandle />
      <Resizable.Panel id="main" defaultSize={50}>Main</Resizable.Panel>
      <Resizable.Handle between={['main', 'detail']} withHandle />
      <Resizable.Panel id="detail" defaultSize={25} minSize={15}>Detail</Resizable.Panel>
    </Resizable.Group>
  );
}`,
      },
    ],
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    category: 'Misc',
    description: 'A slideshow for cycling through images or content.',
    features: ['Horizontal / vertical.', 'Loop + autoplay.'],
    preview: () => (
      <Carousel.Root className="w-64">
        <Carousel.Content>
          {[1, 2, 3].map((i) => (
            <Carousel.Item key={i}>
              <div className="bg-accent flex h-24 items-center justify-center rounded-lg text-xl font-semibold">
                {i}
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    ),
    code: `import { Carousel } from '@aura-ui/styled';\n\n<Carousel.Root>\n  <Carousel.Content>\n    <Carousel.Item>Slide 1</Carousel.Item>\n  </Carousel.Content>\n  <Carousel.Previous />\n  <Carousel.Next />\n</Carousel.Root>`,
    examples: [
      {
        title: 'Card carousel',
        description: 'Wrap card content in each slide for a scrollable feature list.',
        preview: () => (
          <Carousel.Root className="w-64">
            <Carousel.Content>
              {[
                { title: 'Components', desc: '50+ accessible primitives' },
                { title: 'Themes', desc: 'CSS variable token system' },
                { title: 'DataTable', desc: 'Full-featured data grid' },
              ].map((item) => (
                <Carousel.Item key={item.title}>
                  <div className="bg-card border-border flex h-28 flex-col items-center justify-center rounded-lg border p-4 text-center">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs">{item.desc}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        ),
        code: `import { Carousel } from '@aura-ui/styled';

const slides = [
  { title: 'Components', desc: '50+ accessible primitives' },
  { title: 'Themes', desc: 'CSS variable token system' },
  { title: 'DataTable', desc: 'Full-featured data grid' },
];

export default function Demo() {
  return (
    <Carousel.Root className="w-64">
      <Carousel.Content>
        {slides.map((slide) => (
          <Carousel.Item key={slide.title}>
            <div className="flex h-28 flex-col items-center justify-center rounded-lg border p-4 text-center">
              <p className="text-sm font-semibold">{slide.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{slide.desc}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'tree',
    name: 'Tree',
    category: 'Misc',
    description: 'A hierarchical list, like a file explorer.',
    features: ['Expand / collapse.', 'Keyboard navigation.'],
    preview: () => (
      <Tree.Root defaultExpanded={['root']} className="text-sm">
        <Tree.Item id="root" hasChildren>
          <Tree.Trigger hasChildren>src</Tree.Trigger>
          <Tree.Group>
            <Tree.Item id="a">
              <Tree.Trigger hasChildren={false}>index.ts</Tree.Trigger>
            </Tree.Item>
            <Tree.Item id="b">
              <Tree.Trigger hasChildren={false}>app.tsx</Tree.Trigger>
            </Tree.Item>
          </Tree.Group>
        </Tree.Item>
      </Tree.Root>
    ),
    code: `import { Tree } from '@aura-ui/styled';\n\n<Tree.Root defaultExpanded={['root']}>\n  <Tree.Item id="root" hasChildren>\n    <Tree.Trigger hasChildren>src</Tree.Trigger>\n    <Tree.Group>\n      <Tree.Item id="a"><Tree.Trigger>index.ts</Tree.Trigger></Tree.Item>\n    </Tree.Group>\n  </Tree.Item>\n</Tree.Root>`,
    examples: [
      {
        title: 'Multi-level file tree',
        description: 'Deeply nested tree mimicking a project directory structure.',
        preview: () => (
          <Tree.Root defaultExpanded={['src', 'components']} className="text-sm w-56">
            <Tree.Item id="src" hasChildren>
              <Tree.Trigger hasChildren>src</Tree.Trigger>
              <Tree.Group>
                <Tree.Item id="components" hasChildren>
                  <Tree.Trigger hasChildren>components</Tree.Trigger>
                  <Tree.Group>
                    <Tree.Item id="button">
                      <Tree.Trigger hasChildren={false}>Button.tsx</Tree.Trigger>
                    </Tree.Item>
                    <Tree.Item id="dialog">
                      <Tree.Trigger hasChildren={false}>Dialog.tsx</Tree.Trigger>
                    </Tree.Item>
                  </Tree.Group>
                </Tree.Item>
                <Tree.Item id="index">
                  <Tree.Trigger hasChildren={false}>index.ts</Tree.Trigger>
                </Tree.Item>
              </Tree.Group>
            </Tree.Item>
          </Tree.Root>
        ),
        code: `import { Tree } from '@aura-ui/styled';

export default function Demo() {
  return (
    <Tree.Root defaultExpanded={['src', 'components']}>
      <Tree.Item id="src" hasChildren>
        <Tree.Trigger hasChildren>src</Tree.Trigger>
        <Tree.Group>
          <Tree.Item id="components" hasChildren>
            <Tree.Trigger hasChildren>components</Tree.Trigger>
            <Tree.Group>
              <Tree.Item id="button"><Tree.Trigger>Button.tsx</Tree.Trigger></Tree.Item>
              <Tree.Item id="dialog"><Tree.Trigger>Dialog.tsx</Tree.Trigger></Tree.Item>
            </Tree.Group>
          </Tree.Item>
          <Tree.Item id="index"><Tree.Trigger>index.ts</Tree.Trigger></Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'editable',
    name: 'Editable',
    category: 'Misc',
    description: 'Inline-editable text that swaps between preview and input.',
    features: ['Click to edit.', 'Enter / blur submit modes.'],
    preview: () => (
      <Editable.Root defaultValue="Click to edit">
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
    ),
    code: `import { Editable } from '@aura-ui/styled';\n\n<Editable.Root defaultValue="Click to edit">\n  <Editable.Preview />\n  <Editable.Input />\n</Editable.Root>`,
    examples: [
      {
        title: 'Inline title editing',
        description: 'Use Editable for a task or document title that the user can rename in place.',
        preview: () => {
          function EditableDemo() {
            const [title, setTitle] = React.useState('Untitled document');
            return (
              <div className="grid gap-1">
                <Editable.Root
                  value={title}
                  onValueChange={setTitle}
                >
                  <Editable.Preview className="text-lg font-semibold cursor-pointer hover:bg-accent/50 rounded px-1" />
                  <Editable.Input className="text-lg font-semibold" />
                </Editable.Root>
                <p className="text-muted-foreground text-xs">Click to rename</p>
              </div>
            );
          }
          return <EditableDemo />;
        },
        code: `import { Editable } from '@aura-ui/styled';

export default function Demo() {
  const [title, setTitle] = React.useState('Untitled document');
  return (
    <Editable.Root value={title} onValueChange={setTitle} activationMode="dblclick">
      <Editable.Preview className="text-lg font-semibold cursor-pointer rounded px-1 hover:bg-accent/50" />
      <Editable.Input className="text-lg font-semibold" />
    </Editable.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'tags-input',
    name: 'Tags Input',
    category: 'Misc',
    description: 'An input that collects a list of tags as chips.',
    features: ['Delimiter parsing.', 'Paste-split, max-tags.'],
    preview: () => (
      <TagsInput.Root defaultValue={['react', 'tailwind']} className="w-full max-w-sm">
        <TagsInput.Items>
          {(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}
        </TagsInput.Items>
        <TagsInput.Input placeholder="Add tag…" />
      </TagsInput.Root>
    ),
    code: `import { TagsInput } from '@aura-ui/styled';\n\n<TagsInput.Root defaultValue={['react']}>\n  <TagsInput.Items>\n    {(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}\n  </TagsInput.Items>\n  <TagsInput.Input placeholder="Add tag…" />\n</TagsInput.Root>`,
    examples: [
      {
        title: 'Controlled with max tags',
        description: 'Cap the tag count and track the value externally.',
        preview: () => {
          function TagsDemo() {
            const [tags, setTags] = React.useState(['react', 'typescript']);
            const max = 5;
            return (
              <div className="grid gap-2 w-full max-w-sm">
                <TagsInput.Root value={tags} onValueChange={setTags} className="w-full">
                  <TagsInput.Items>
                    {(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}
                  </TagsInput.Items>
                  <TagsInput.Input placeholder="Add up to 5 tags…" />
                </TagsInput.Root>
                <p className="text-muted-foreground text-xs">{tags.length}/{max} tags</p>
              </div>
            );
          }
          return <TagsDemo />;
        },
        code: `import { TagsInput } from '@aura-ui/styled';

export default function Demo() {
  const [tags, setTags] = React.useState(['react', 'typescript']);
  return (
    <TagsInput.Root value={tags} onValueChange={setTags} max={5}>
      <TagsInput.Items>
        {(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}
      </TagsInput.Items>
      <TagsInput.Input placeholder="Add up to 5 tags…" />
    </TagsInput.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'mentions',
    name: 'Mentions',
    category: 'Misc',
    description: 'A textarea with @-mention autocomplete.',
    features: ['Trigger character.', 'Suggestion filtering.'],
    preview: () => (
      <Mentions.Root className="w-full max-w-sm">
        <Mentions.Textarea placeholder="Try @ada…" rows={3} />
        <Mentions.Suggestions
          items={[
            { id: '1', label: 'ada' },
            { id: '2', label: 'grace' },
          ]}
        >
          <div className="border-border bg-popover rounded-md border p-1 shadow-md">
            <Mentions.Items>
              {(item, i) => (
                <Mentions.Item key={item.id} suggestion={item} index={i}>
                  <div className="hover:bg-accent rounded px-2 py-1 text-sm">@{item.label}</div>
                </Mentions.Item>
              )}
            </Mentions.Items>
          </div>
        </Mentions.Suggestions>
      </Mentions.Root>
    ),
    code: `import { Mentions } from '@aura-ui/styled';\n\n<Mentions.Root>\n  <Mentions.Textarea placeholder="Try @ada…" />\n  <Mentions.Suggestions items={users}>\n    <Mentions.Items>\n      {(item, i) => <Mentions.Item key={item.id} suggestion={item} index={i}>@{item.label}</Mentions.Item>}\n    </Mentions.Items>\n  </Mentions.Suggestions>\n</Mentions.Root>`,
    examples: [
      {
        title: 'With default value',
        description: 'Pre-populate the textarea with an existing mention to show highlighted tokens.',
        preview: () => {
          const team = [
            { id: 'ada', label: 'ada' },
            { id: 'grace', label: 'grace' },
            { id: 'margaret', label: 'margaret' },
          ];
          return (
            <Mentions.Root
              className="w-full max-w-sm"
              defaultValue="Hey @ada, can you review this with @grace?"
            >
              <Mentions.Textarea placeholder="Write an update…" rows={3} />
              <Mentions.Suggestions items={team}>
                <div className="border-border bg-popover rounded-md border p-1 shadow-md">
                  <Mentions.Items>
                    {(item, i) => (
                      <Mentions.Item key={item.id} suggestion={item} index={i}>
                        <div className="hover:bg-accent rounded px-2 py-1 text-sm">@{item.label}</div>
                      </Mentions.Item>
                    )}
                  </Mentions.Items>
                </div>
              </Mentions.Suggestions>
            </Mentions.Root>
          );
        },
        code: `import { Mentions } from '@aura-ui/styled';

const team = [
  { id: 'ada', label: 'ada' },
  { id: 'grace', label: 'grace' },
];

export default function Demo() {
  return (
    <Mentions.Root defaultValue="Hey @ada, can you review this?">
      <Mentions.Textarea placeholder="Write an update…" rows={3} />
      <Mentions.Suggestions items={team}>
        <div className="rounded-md border p-1 shadow-md bg-popover">
          <Mentions.Items>
            {(item, i) => (
              <Mentions.Item key={item.id} suggestion={item} index={i}>
                @{item.label}
              </Mentions.Item>
            )}
          </Mentions.Items>
        </div>
      </Mentions.Suggestions>
    </Mentions.Root>
  );
}`,
      },
    ],
  },
  {
    slug: 'data-table',
    name: 'DataTable',
    category: 'Data',
    description:
      'A full-featured data grid with a rich column definition API, tree data, copy/paste, density, bulk actions, row action menus, custom slots, search, nested filters, virtualization, pinning, grouping, aggregation and more.',
    features: [
      'Rich DataTableColumnDef API — field, type, align, flex, renderCell, description, filterOperators.',
      'Tree data with depth indentation and Expand All / Collapse All toolbar buttons.',
      'Ctrl+C copy/paste to TSV for Excel and Google Sheets.',
      'Density toggle — compact, standard, comfortable cell padding.',
      'Bulk actions panel when rows are selected; row action menu and inline button columns.',
      'Pagination with page-number dropdown, rows-per-page selector and total row count.',
      'Row copy and column copy via row/column menus.',
      'Full slot system — replace toolbar, pagination, column menu, filter, search, loaders, empty states.',
      'Distinct empty states: NoRowsOverlay (empty source) vs NoResultsOverlay (filtered empty).',
      'Sorting, global search, nested AND/OR filters, selection, resizing, pinning and reordering.',
      'Virtualized rows and columns for large datasets with lazy loading.',
      'Column configuration, aggregation totals, inline create, detail panels and localization.',
      'Server-side state adapter, skeleton/spinner/text loaders and accessibility built in.',
    ],
    preview: () => (
      <DataTable
        columns={docsTableColumns}
        data={docsTableData}
        getRowId={(row) => String(row.id)}
        enableSorting
        enableGlobalSearch
        enableAdvancedFiltering
        defaultAdvancedFilter={docsTableFilter}
        enableColumnConfiguration
        enableColumnPinning
        enableRowSelection
        enableRowPinning
        enablePagination
        pageSize={4}
        aggregations={{ revenue: 'sum', cost: 'avg', score: 'max' }}
        rowTotals={{ columns: ['revenue', 'cost'] }}
        rowActions={(row) => (
          <Button size="sm" variant="ghost">
            Open {row.original.id}
          </Button>
        )}
        renderDetailPanel={(row) => (
          <div className="grid gap-1 text-sm">
            <strong>{row.original.name}</strong>
            <span className="text-muted-foreground">{row.original.team} team details</span>
          </div>
        )}
        className="w-full max-w-4xl"
      />
    ),
    code: `import { DataTable, type DataTableColumnDef } from '@aura-ui/data-table';

type User = { id: number; name: string; email: string; role: string; revenue: number };

const columns: DataTableColumnDef<User>[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'role', headerName: 'Role', align: 'center' },
  { field: 'revenue', headerName: 'Revenue', type: 'number' },
];

export default function Demo({ data }: { data: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enableGlobalSearch
      enableAdvancedFiltering
      enableColumnConfiguration
      enableRowSelection
      enableColumnPinning
      aggregations={{ revenue: 'sum' }}
      renderDetailPanel={(row) => <UserDetail row={row} />}
    />
  );
}`,
  },
];

for (const entry of COMPONENTS) {
  const examples = componentUsageExamples[entry.slug];
  if (examples && examples.length > 0) {
    entry.examples = [...(entry.examples ?? []), ...examples];
  }
}

function ToastDemo() {
  return (
    <Button onClick={() => toast.success('Scheduled: Friday, February 10 at 5:00 PM')}>
      Show toast
    </Button>
  );
}

/* ── Hooks registry ─────────────────────────────────────────────────── */

export interface HookEntry {
  name: string;
  signature: string;
  description: string;
}

export const HOOKS: HookEntry[] = [
  {
    name: 'useControllableState',
    signature: '<T>({ prop, defaultProp, onChange }) => [T, setT]',
    description: 'Bridges controlled and uncontrolled state in a single hook.',
  },
  {
    name: 'useComposedRefs',
    signature: '(...refs) => (node) => void',
    description: 'Merges multiple refs into one callback ref.',
  },
  {
    name: 'useCallbackRef',
    signature: '(callback) => stableCallback',
    description: 'Returns a stable function identity that always calls the latest callback.',
  },
  {
    name: 'useToggle',
    signature: '(initial?) => [boolean, toggle]',
    description: 'Boolean state with a toggle setter.',
  },
  {
    name: 'useBoolean',
    signature: '(initial?) => { value, on, off, toggle }',
    description: 'Boolean state with named setters.',
  },
  {
    name: 'useCounter',
    signature: '(initial?) => { count, inc, dec, reset, set }',
    description: 'Numeric counter state.',
  },
  {
    name: 'usePrevious',
    signature: '<T>(value) => T | undefined',
    description: 'Returns the value from the previous render.',
  },
  {
    name: 'useLatest',
    signature: '<T>(value) => Ref<T>',
    description: 'A ref that always holds the latest value.',
  },
  {
    name: 'useClickOutside',
    signature: '(ref, handler) => void',
    description: 'Calls a handler when a click lands outside the ref.',
  },
  {
    name: 'useEventListener',
    signature: '(event, handler, target?) => void',
    description: 'Declarative addEventListener with cleanup.',
  },
  {
    name: 'useKeyPress',
    signature: '(key, handler) => void',
    description: 'Fires a handler when a specific key is pressed.',
  },
  {
    name: 'useHotkeys',
    signature: '(combo, handler) => void',
    description: 'Binds keyboard shortcut combinations.',
  },
  {
    name: 'useMediaQuery',
    signature: '(query) => boolean',
    description: 'Tracks a CSS media query, SSR-safe.',
  },
  {
    name: 'useDarkMode',
    signature: '() => { isDark, toggle }',
    description: 'Reads and toggles the dark color scheme.',
  },
  {
    name: 'useLocalStorage',
    signature: '<T>(key, initial) => [T, setT]',
    description: 'State synced to localStorage.',
  },
  {
    name: 'useCopyToClipboard',
    signature: '() => [copied, copy]',
    description: 'Copies text to the clipboard with status.',
  },
  {
    name: 'useDebounce',
    signature: '<T>(value, delay) => T',
    description: 'Debounces a rapidly-changing value.',
  },
  {
    name: 'useThrottle',
    signature: '<T>(value, delay) => T',
    description: 'Throttles a rapidly-changing value.',
  },
  {
    name: 'useId',
    signature: '(prefix?) => string',
    description: 'Generates a stable unique id, SSR-safe.',
  },
  { name: 'useMount', signature: '(fn) => void', description: 'Runs a function once on mount.' },
  {
    name: 'useUnmount',
    signature: '(fn) => void',
    description: 'Runs a function once on unmount.',
  },
  {
    name: 'useUpdateEffect',
    signature: '(effect, deps) => void',
    description: 'useEffect that skips the first render.',
  },
  {
    name: 'useIsomorphicLayoutEffect',
    signature: '(effect, deps) => void',
    description: 'useLayoutEffect on the client, useEffect on the server.',
  },
  {
    name: 'useWindowSize',
    signature: '() => { width, height }',
    description: 'Tracks the viewport size.',
  },
  {
    name: 'useTheme',
    signature: '() => { theme, setTheme, mode, setMode, resolvedMode, themes }',
    description: 'Access and control the active aura-ui theme and color mode. Must be inside ThemeProvider. From @aura-ui/themes.',
  },
  {
    name: 'useColorPreset',
    signature: '(options?) => { presets, activeId, activePreset, setPreset, clearPreset }',
    description: 'Manage an accent-color preset on top of the active theme. Persists to localStorage and re-applies after theme/mode changes. From @aura-ui/themes.',
  },
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
    description:
      'Internal foundation: Slot, Primitive, Portal, Presence, FocusScope, DismissableLayer, RovingFocusGroup, Popper and more.',
    install: 'pnpm add @aura-ui/core',
    highlights: [
      'Headless behaviour primitives',
      'Floating UI wrapper',
      'Focus & dismiss management',
    ],
  },
  {
    name: '@aura-ui/hooks',
    description: '24 reusable, SSR-safe, tree-shakeable React hooks.',
    install: 'pnpm add @aura-ui/hooks',
    highlights: ['State, refs, DOM, browser utilities', 'Zero dependencies', 'Fully typed'],
  },
  {
    name: '@aura-ui/utils',
    description:
      'Pure utility functions: cn, composeEventHandlers, type guards, array/object/string helpers.',
    install: 'pnpm add @aura-ui/utils',
    highlights: ['Tree-shakeable named exports', 'No side effects', '< 2 KB gzip'],
  },
  {
    name: '@aura-ui/themes',
    description: 'Runtime theming: ThemeProvider, useTheme, ThemeScript, 10 accent presets, and useColorPreset.',
    install: 'pnpm add @aura-ui/themes',
    highlights: ['CSS-variable based', 'No flash of unstyled content', '10 built-in accent presets'],
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
    highlights: [
      'npx aura-ui init',
      'npx aura-ui add <component>',
      'Transitive dependency resolution',
    ],
  },
  {
    name: '@aura-ui/api-client',
    description:
      'Lightweight Axios wrapper with React 18 cache, retries, SSR support, and zero extra dependencies.',
    install: 'pnpm add @aura-ui/api-client',
    highlights: [
      'No TanStack Query — custom useSyncExternalStore cache',
      'AbortController, polling, debounce, infinite scroll',
      'SSR dehydrate/hydrate + cache persistence',
    ],
  },
];

export const CATEGORIES = [
  'Atoms',
  'Inputs',
  'Form',
  'Data display',
  'Feedback',
  'Surface',
  'Layout',
  'Navigation',
  'Disclosure',
  'Overlays',
  'Compound',
  'Utils',
  'Misc',
  'Data',
];

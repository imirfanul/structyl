'use client';

import * as React from 'react';
import * as StructylIcons from '@structyl/icons';
import Link from 'next/link';
import { Sparkles, Search, X, Copy, Check } from '@structyl/icons';
import { useTheme } from '@structyl/themes';
import { Box, Button, Input, Typography } from '@structyl/styled';
import { CodeBlock } from '../../components/code-block';

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComp = React.FC<any>;
type StyleKey = 'Regular' | 'Thin' | 'Bold' | 'Sharp' | 'Duotone';

interface IconEntry {
  name: string;
  Component: IconComp;
  category: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Style variant definitions
───────────────────────────────────────────────────────────────────────────── */

const STYLES: StyleKey[] = ['Regular', 'Thin', 'Bold', 'Sharp', 'Duotone'];

const STYLE_PROPS: Record<StyleKey, Record<string, unknown>> = {
  Regular: { strokeWidth: 2 },
  Thin: { strokeWidth: 1 },
  Bold: { strokeWidth: 2.5 },
  Sharp: { strokeWidth: 2, strokeLinecap: 'square', strokeLinejoin: 'miter' },
  Duotone: { strokeWidth: 1.5 },
};

const STYLE_CODE_PROPS: Record<StyleKey, string> = {
  Regular: '',
  Thin: 'strokeWidth={1}',
  Bold: 'strokeWidth={2.5}',
  Sharp: 'strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter"',
  Duotone: 'strokeWidth={1.5} className="text-primary opacity-60"',
};

/* ─────────────────────────────────────────────────────────────────────────────
   Category definitions — first match wins, order matters
───────────────────────────────────────────────────────────────────────────── */

const CAT_PATTERNS: Array<{ name: string; re: RegExp[] }> = [
  {
    name: 'Arrows',
    re: [/^Arrow/, /^Chevron/, /^Corner/, /^Rotate(?!Ccw|Cw)/, /^Turn/, /^Repeat/, /^Shuffle/, /^Skip/, /^Rewind/],
  },
  {
    name: 'Actions',
    re: [
      /^Edit/, /^Pencil/, /^Eraser/, /^Cut/, /^Copy/, /^Save/, /^Download/, /^Upload/,
      /^Share/, /^Send/, /^Plus/, /^Minus/, /^Trash/, /^Delete/, /^Check(?!Circle|Square)/,
      /^Search/, /^Filter/, /^Sort/, /^Refresh/, /^Undo/, /^Redo/, /^Lock/, /^Unlock/,
      /^Eye(?!brow)/, /^Zoom/, /^Maximize/, /^Minimize/, /^Expand/, /^Collapse/, /^Scissors/,
      /^Stamp/, /^Bold/, /^Italic/, /^Underline/, /^Strikethrough/, /^Highlighter/,
      /^Link(?!2)/, /^Unlink/, /^ExternalLink/, /^Move/, /^Drag/, /^Grab/, /^Crop/, /^Flip/,
    ],
  },
  {
    name: 'Communication',
    re: [
      /^Mail/, /^Message/, /^Chat/, /^Phone/, /^Bell/, /^Rss/, /^Megaphone/,
      /^Radio/, /^Reply/, /^Inbox/, /^Outbox/, /^Voicemail/, /^Antenna/, /^Podcast/,
    ],
  },
  {
    name: 'Media',
    re: [
      /^Play/, /^Pause/, /^Stop/, /^Record/, /^Music/, /^Volume/, /^Mic/,
      /^Speaker/, /^Headphones/, /^Video/, /^Camera/, /^Film/, /^Image/, /^Photo/,
      /^Gallery/, /^Disc/, /^Airplay/, /^Cast/, /^Clapperboard/, /^Youtube/,
    ],
  },
  {
    name: 'Files',
    re: [
      /^File/, /^Folder/, /^Book(?!mark|Open|User|Check|Copy|Down|Up|Key|Template|Marked|Dashed|A|Audio|Image|Lock|Minus|Plus|Type|X)/,
      /^Bookmark/, /^Clipboard/, /^Archive/, /^Tag(?!s)?$/, /^Tags$/, /^Note/, /^Notepad/,
      /^Notebook/, /^Layers/, /^Presentation/, /^Scroll/, /^Newspaper/, /^Receipt/,
    ],
  },
  {
    name: 'Data & Charts',
    re: [
      /^Chart/, /^BarChart/, /^PieChart/, /^LineChart/, /^AreaChart/, /^Database/,
      /^Server/, /^Table/, /^Spreadsheet/, /^Trending/, /^Activity/, /^Gauge/,
      /^Signal/, /^Kanban/, /^Grid/, /^Rows/, /^Columns/,
    ],
  },
  {
    name: 'UI & Layout',
    re: [
      /^Panel/, /^Sidebar/, /^Layout/, /^Window/, /^Menu/, /^Toggle/, /^Tab/,
      /^Badge/, /^Card/, /^List/, /^Command/, /^Palette/, /^Paintbrush/, /^Sliders/,
      /^Settings/, /^Wrench/, /^Tool/, /^Component/, /^Blocks/, /^Section/,
      /^SidebarOpen/, /^SidebarClose/,
    ],
  },
  {
    name: 'Shapes',
    re: [
      /^Square/, /^Rectangle/, /^Circle/, /^Triangle/, /^Diamond/, /^Pentagon/,
      /^Hexagon/, /^Octagon/, /^Shield/, /^Flag/, /^Shapes/, /^Star(?!Off)/,
    ],
  },
  {
    name: 'Code & Dev',
    re: [
      /^Code/, /^Terminal/, /^Bug/, /^Braces/, /^Brackets/, /^Variable/, /^Function/,
      /^Hash/, /^Binary/, /^Webhook/, /^Github/, /^Gitlab/, /^Cpu/, /^Regex/,
      /^Package/, /^Git(?!hub|lab)/, /^Api/,
    ],
  },
  {
    name: 'Devices',
    re: [
      /^Laptop/, /^Desktop/, /^Tablet/, /^Smartphone/, /^Watch(?!man)/, /^Printer/,
      /^Scanner/, /^Keyboard/, /^Mouse/, /^Touchpad/, /^Chip/, /^Memory/,
      /^Wifi/, /^Bluetooth/, /^Usb/, /^Battery/, /^Robot/, /^QrCode/, /^Barcode/,
      /^Gpu/, /^HardDrive/, /^Monitor(?!Speaker)/, /^Tv(?!2)?/, /^Headset/, /^Power(?:Off|On)?/,
    ],
  },
  {
    name: 'People',
    re: [
      /^User/, /^Person/, /^Team/, /^Users/, /^Baby/, /^Bot/, /^Ghost/, /^Crown/,
      /^Contact/, /^Group/,
    ],
  },
  {
    name: 'Social',
    re: [
      /^Twitter/, /^Facebook/, /^Instagram/, /^Linkedin/, /^Twitch/,
      /^Discord/, /^Slack/, /^Figma/, /^Dribbble/, /^Github/, /^Gitlab/,
      /^Reddit/, /^Pinterest/, /^Snapchat/, /^Tiktok/,
    ],
  },
  {
    name: 'Commerce',
    re: [
      /^Shopping/, /^Cart/, /^Bag(?!pipe)/, /^Store/, /^Wallet/, /^CreditCard/,
      /^Banknote/, /^Dollar/, /^Euro/, /^Currency/, /^Coins?/, /^Bitcoin/,
      /^Gift/, /^Receipt/, /^Invoice/, /^Truck/, /^Barcode/, /^QrCode/,
    ],
  },
  {
    name: 'Nature',
    re: [
      /^Tree/, /^Leaf/, /^Flower/, /^Plant/, /^Mountain/, /^Wave/,
      /^Drop(?!let)/, /^Droplets/, /^Fire/, /^Flame/, /^Sprout/, /^Wheat/,
      /^Globe/, /^Earth/, /^Bug(?!Play)/, /^Snail/, /^Bird/, /^Fish/, /^Dog/, /^Cat/,
      /^Rabbit/, /^Turtle/, /^Squirrel/,
    ],
  },
  {
    name: 'Weather',
    re: [
      /^Sun/, /^Moon/, /^Cloud/, /^Rain/, /^Snow/, /^Wind/, /^Storm/,
      /^Lightning/, /^Rainbow/, /^Thermometer/, /^Umbrella/, /^Tornado/,
      /^Snowflake/, /^Cloudy/, /^Drizzle/, /^Haze/, /^Foggy/,
    ],
  },
  {
    name: 'Time & Calendar',
    re: [
      /^Clock/, /^Timer/, /^Stopwatch/, /^Alarm/, /^Calendar/, /^Schedule/,
      /^History/, /^Hourglass/, /^RotateCcw/, /^RotateCw/,
    ],
  },
  {
    name: 'Travel',
    re: [
      /^Map/, /^LocateFixed/, /^MapPin/, /^Plane/, /^Car/, /^Bus/, /^Train/,
      /^Bike/, /^Ship/, /^Boat/, /^Anchor/, /^House/, /^Home/, /^Building/,
      /^Hotel/, /^Taxi/, /^Navigation/, /^Compass/, /^Route/, /^Milestone/,
    ],
  },
  {
    name: 'Health',
    re: [
      /^Heartbeat/, /^Heart/, /^Pulse/, /^Pill/, /^Capsule/, /^Stethoscope/,
      /^Hospital/, /^Cross/, /^Bandage/, /^Dna/, /^Microscope/, /^Syringe/,
      /^Vaccine/, /^Brain/, /^Bone/, /^Tooth/, /^Ear(?!buds)/,
    ],
  },
  {
    name: 'Food & Drink',
    re: [
      /^Coffee/, /^Tea/, /^Cup/, /^Mug/, /^Wine/, /^Beer/, /^Pizza/,
      /^Burger/, /^Chef/, /^Utensil/, /^Apple/, /^Cake/, /^Cookie/, /^Candy/,
      /^Milk/, /^Egg/, /^Soup/, /^Sandwich/, /^Croissant/, /^IceCream/,
      /^Donut/, /^Carrot/, /^Corn/, /^Cherry/, /^Grape/, /^Lemon/, /^Banana/, /^Salad/,
    ],
  },
];

function categorizeIcon(name: string): string {
  for (const { name: cat, re } of CAT_PATTERNS) {
    if (re.some((r) => r.test(name))) return cat;
  }
  return 'Other';
}

/* ─────────────────────────────────────────────────────────────────────────────
   Build icon registry (module-level, computed once)
───────────────────────────────────────────────────────────────────────────── */

function isIconComponent(key: string, val: unknown): boolean {
  if (!/^[A-Z]/.test(key)) return false;
  if (key.endsWith('Icon')) return false; // skip NameIcon duplicates
  if (key === 'LucideIcon') return false;
  if (key.startsWith('create') || key.startsWith('use')) return false;
  // lucide-react exports forwardRef objects (not plain functions)
  if (typeof val === 'function') return true;
  if (
    typeof val === 'object' &&
    val !== null &&
    '$$typeof' in (val as Record<string, unknown>)
  )
    return true;
  return false;
}

const ICON_REGISTRY: IconEntry[] = Object.entries(StructylIcons)
  .filter(([key, val]) => isIconComponent(key, val))
  .map(([name, Component]) => ({
    name,
    Component: Component as IconComp,
    category: categorizeIcon(name),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const CATEGORY_NAMES = ['All', ...CAT_PATTERNS.map((c) => c.name), 'Other'].filter((cat) => {
  if (cat === 'All') return true;
  return ICON_REGISTRY.some((i) => i.category === cat);
});

/* ─────────────────────────────────────────────────────────────────────────────
   StyledIcon — renders an icon with the active style applied
───────────────────────────────────────────────────────────────────────────── */

function StyledIcon({
  Component,
  style,
  size = 20,
  className = '',
}: {
  Component: IconComp;
  style: StyleKey;
  size?: number;
  className?: string;
}) {
  if (style === 'Duotone') {
    return (
      <span
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Component
          aria-hidden
          size={size}
          strokeWidth={2.5}
          className={`absolute inset-0 text-primary opacity-20 ${className}`}
        />
        <Component
          size={size}
          strokeWidth={1.5}
          className={`relative ${className}`}
        />
      </span>
    );
  }
  return <Component size={size} className={className} {...STYLE_PROPS[style]} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   CodeBlock — syntax-highlighted code with copy button
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   IconModal — detail panel shown when an icon is clicked
───────────────────────────────────────────────────────────────────────────── */

function IconModal({
  icon,
  style,
  onStyleChange,
  onClose,
}: {
  icon: IconEntry;
  style: StyleKey;
  onStyleChange: (s: StyleKey) => void;
  onClose: () => void;
}) {
  const { name, Component, category } = icon;
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [copiedImport, setCopiedImport] = React.useState(false);

  React.useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const importCode = `import { ${name} } from '@structyl/icons';`;
  const basicCode = `<${name} />`;
  const sizedCode = `<${name} size={24} className="text-primary" />`;
  const styledCode =
    style !== 'Regular'
      ? `<${name} ${STYLE_CODE_PROPS[style]} />`
      : null;

  const copyImport = async () => {
    try {
      await navigator.clipboard.writeText(importCode);
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    } catch {
      /* unavailable */
    }
  };

  return (
    <>
      {/* Backdrop */}
      <Box
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />

      {/* Panel */}
      <Box
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} icon details`}
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl outline-none"
      >
        {/* Header */}
        <Box className="flex items-start justify-between border-b border-border/60 px-5 py-4">
          <Box>
            <Box className="flex items-center gap-2">
              <Typography as="h2" variant="h2" className="text-base font-semibold tracking-tight">{name}</Typography>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                {category}
              </span>
            </Box>
            <Typography as="p" variant="body2" className="mt-0.5 text-[11px] text-muted-foreground">
              @structyl/icons · lucide-react · {style}
            </Typography>
          </Box>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-fg"
          >
            <X className="h-4 w-4" />
          </Button>
        </Box>

        {/* Preview section */}
        <Box className="border-b border-border/60 bg-muted/10 px-5 py-6">
          {/* Size previews */}
          <Box className="mb-5 flex items-end justify-center gap-6">
            {([16, 24, 32, 48] as const).map((sz) => (
              <Box key={sz} className="flex flex-col items-center gap-2">
                <Box className="flex h-16 w-16 items-center justify-center rounded-xl border border-border/60 bg-bg">
                  <StyledIcon Component={Component} style={style} size={sz} />
                </Box>
                <span className="text-[10px] tabular-nums text-muted-foreground">{sz}px</span>
              </Box>
            ))}
          </Box>

          {/* Style variant selector */}
          <Box className="flex flex-wrap justify-center gap-1.5">
            {STYLES.map((s) => (
              <Button
                key={s}
                variant="ghost"
                onClick={() => onStyleChange(s)}
                className={`rounded-lg border px-3 py-1 text-[11px] font-medium transition-colors ${
                  style === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-fg'
                }`}
              >
                {s}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Code snippets */}
        <Box className="space-y-2.5 px-5 py-5">
          <CodeBlock filename="Import" code={importCode} />
          <CodeBlock
            filename="Usage"
            code={`${basicCode}\n${sizedCode}`}
          />
          {styledCode && (
            <CodeBlock filename={`${style} variant`} code={styledCode} />
          )}
        </Box>

        {/* Footer */}
        <Box className="flex items-center justify-between border-t border-border/60 bg-muted/10 px-5 py-3">
          <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
          <Button
            variant="ghost"
            onClick={copyImport}
            className="flex items-center gap-1.5 rounded-md border border-border bg-bg px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-fg"
          >
            {copiedImport ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copiedImport ? 'Copied!' : 'Copy import'}
          </Button>
        </Box>
      </Box>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────────────────────────── */

export default function IconsPage() {
  const { resolvedMode, setMode } = useTheme();
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeStyle, setActiveStyle] = React.useState<StyleKey>('Regular');
  const [selectedIcon, setSelectedIcon] = React.useState<IconEntry | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(
    () =>
      ICON_REGISTRY.filter(
        (icon) =>
          (activeCategory === 'All' || icon.category === activeCategory) &&
          icon.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, activeCategory],
  );

  // Category chip counts reflect current search query
  const categoryCount = React.useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    for (const icon of ICON_REGISTRY) {
      if (!icon.name.toLowerCase().includes(query.toLowerCase())) continue;
      counts.All = (counts.All ?? 0) + 1;
      counts[icon.category] = (counts[icon.category] ?? 0) + 1;
    }
    return counts;
  }, [query]);

  // Global keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIcon(null);
        return;
      }
      if (e.key === '/' && !selectedIcon && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selectedIcon]);

  return (
    <Box className="bg-bg text-fg min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-border/60 bg-bg/70 backdrop-blur-glass sticky top-0 z-40 border-b">
        <Box className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Box className="from-primary to-primary/70 text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm">
              <Sparkles className="h-4 w-4" />
            </Box>
            <span className="text-sm font-semibold tracking-tight">structyl</span>
          </Link>
          <span className="text-muted-foreground text-sm">/ Icons</span>
          <nav className="ml-4 hidden gap-5 text-sm md:flex">
            <Link href="/docs" className="text-muted-foreground hover:text-fg transition-colors">
              Documentation
            </Link>
            <Link href="/themes" className="text-muted-foreground hover:text-fg transition-colors">
              Themes
            </Link>
          </nav>
          <Box className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {resolvedMode === 'dark' ? '☀' : '☾'}
            </Button>
          </Box>
        </Box>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        {/* ── Page title ─────────────────────────────────────────────── */}
        <Box className="mb-8">
          <Typography as="h1" variant="h1" className="text-3xl font-semibold tracking-tight">Icons</Typography>
          <Typography as="p" variant="body2" className="text-muted-foreground mt-2 max-w-xl text-sm">
            {ICON_REGISTRY.length.toLocaleString()} icons from{' '}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              lucide-react
            </a>
            . Click any icon to copy usage code. Press{' '}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[11px]">/</kbd>{' '}
            to search.
          </Typography>
        </Box>

        {/* ── Controls row ───────────────────────────────────────────── */}
        <Box className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search bar */}
          <Box className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${ICON_REGISTRY.length} icons…`}
              className="h-10 w-full rounded-lg border border-border bg-bg pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            {query && (
              <Button
                variant="ghost"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-fg"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </Box>

          {/* Style variant tabs */}
          <Box className="flex shrink-0 rounded-lg border border-border bg-muted/30 p-0.5">
            {STYLES.map((s) => (
              <Button
                key={s}
                variant="ghost"
                onClick={() => setActiveStyle(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeStyle === s
                    ? 'bg-bg text-fg shadow-sm'
                    : 'text-muted-foreground hover:text-fg'
                }`}
              >
                {s}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ── Category chips ─────────────────────────────────────────── */}
        <Box className="mb-5 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORY_NAMES.map((cat) => {
            const count = categoryCount[cat] ?? 0;
            const isActive = activeCategory === cat;
            return (
              <Button
                key={cat}
                variant="ghost"
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-fg'
                }`}
              >
                {cat}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold tabular-nums ${
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Button>
            );
          })}
        </Box>

        {/* ── Results summary ────────────────────────────────────────── */}
        <Typography as="p" variant="body2" className="mb-4 text-[12px] text-muted-foreground">
          {filtered.length === ICON_REGISTRY.length
            ? `Showing all ${ICON_REGISTRY.length.toLocaleString()} icons`
            : `${filtered.length.toLocaleString()} of ${ICON_REGISTRY.length.toLocaleString()} icons`}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {query && ` matching "${query}"`}
        </Typography>

        {/* ── Icon grid ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <Box className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/30" />
            <Typography as="p" variant="body2" className="text-sm font-medium">No icons found</Typography>
            <Typography as="p" variant="body2" className="mt-1 text-xs text-muted-foreground">
              Try a different search term or select another category
            </Typography>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
              }}
            >
              Clear filters
            </Button>
          </Box>
        ) : (
          <Box className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-px rounded-xl border border-border/60 bg-border/20 overflow-hidden">
            {filtered.map(({ name, Component, category }) => (
              <Button
                key={name}
                variant="ghost"
                onClick={() => setSelectedIcon({ name, Component, category })}
                title={name}
                className="group flex flex-col items-center gap-2 bg-bg px-2 py-4 text-center transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/30"
              >
                <StyledIcon Component={Component} style={activeStyle} size={22} />
                <span className="w-full truncate text-[9.5px] leading-tight text-muted-foreground transition-colors group-hover:text-fg">
                  {name}
                </span>
              </Button>
            ))}
          </Box>
        )}
      </main>

      {/* ── Icon detail modal ─────────────────────────────────────────── */}
      {selectedIcon && (
        <IconModal
          icon={selectedIcon}
          style={activeStyle}
          onStyleChange={setActiveStyle}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </Box>
  );
}

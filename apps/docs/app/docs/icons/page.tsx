'use client';

import * as React from 'react';
import * as AuraIcons from '@aura-ui/icons';
import { Search, X, Copy, Check } from '@aura-ui/icons';
import { Button } from '@aura-ui/styled';

/* ─────────────────────────────────────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComp = React.FC<any>;
type StyleKey = 'Regular' | 'Thin' | 'Bold' | 'Sharp' | 'Duotone';

interface IconEntry {
  name: string;
  Component: IconComp;
  category: string;
}

const STYLES: StyleKey[] = ['Regular', 'Thin', 'Bold', 'Sharp', 'Duotone'];

const STYLE_PROPS: Record<StyleKey, Record<string, unknown>> = {
  Regular: { strokeWidth: 2 },
  Thin: { strokeWidth: 1 },
  Bold: { strokeWidth: 2.5 },
  Sharp: { strokeWidth: 2, strokeLinecap: 'square', strokeLinejoin: 'miter' },
  Duotone: { strokeWidth: 1.5 },
};

const STYLE_CODE: Record<StyleKey, string> = {
  Regular: '',
  Thin: 'strokeWidth={1}',
  Bold: 'strokeWidth={2.5}',
  Sharp: 'strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter"',
  Duotone: 'strokeWidth={1.5} className="text-primary opacity-60"',
};

/* ─────────────────────────────────────────────────────────────────────────────
   Category patterns
───────────────────────────────────────────────────────────────────────────── */

const CAT_PATTERNS: Array<{ name: string; re: RegExp[] }> = [
  { name: 'Arrows',    re: [/^Arrow/, /^Chevron/, /^Corner/, /^Repeat/, /^Shuffle/, /^Skip/, /^Rewind/] },
  { name: 'Actions',   re: [/^Edit/, /^Pencil/, /^Eraser/, /^Cut/, /^Copy/, /^Save/, /^Download/, /^Upload/, /^Share/, /^Send/, /^Plus/, /^Minus/, /^Trash/, /^Check(?!C|S)/, /^Search/, /^Filter/, /^Sort/, /^Refresh/, /^Undo/, /^Redo/, /^Lock/, /^Unlock/, /^Eye(?!b)/, /^Zoom/, /^Maximize/, /^Minimize/, /^Scissors/, /^Bold/, /^Italic/, /^Underline/, /^Link(?!2)/, /^Unlink/, /^Move/, /^Crop/] },
  { name: 'Communication', re: [/^Mail/, /^Message/, /^Chat/, /^Phone/, /^Bell/, /^Rss/, /^Megaphone/, /^Radio/, /^Reply/, /^Inbox/, /^Outbox/, /^Podcast/] },
  { name: 'Media',     re: [/^Play/, /^Pause/, /^Stop/, /^Music/, /^Volume/, /^Mic/, /^Speaker/, /^Headphones/, /^Video/, /^Camera/, /^Film/, /^Image/, /^Photo/, /^Disc/, /^Airplay/, /^Cast/] },
  { name: 'Files',     re: [/^File/, /^Folder/, /^Book(?!mark)/, /^Bookmark/, /^Clipboard/, /^Archive/, /^Tag(?!s)?$/, /^Tags$/, /^Note/, /^Layers/, /^Presentation/, /^Scroll/, /^Newspaper/] },
  { name: 'Data',      re: [/^Chart/, /^BarChart/, /^PieChart/, /^Database/, /^Server/, /^Table/, /^Trending/, /^Activity/, /^Gauge/, /^Signal/, /^Kanban/, /^Grid/, /^Rows/, /^Columns/] },
  { name: 'UI',        re: [/^Panel/, /^Sidebar/, /^Layout/, /^Window/, /^Menu/, /^Toggle/, /^Sliders/, /^Settings/, /^Wrench/, /^Component/, /^Blocks/, /^Palette/, /^Paintbrush/] },
  { name: 'Shapes',    re: [/^Square/, /^Rectangle/, /^Circle/, /^Triangle/, /^Diamond/, /^Pentagon/, /^Hexagon/, /^Octagon/, /^Shield/, /^Flag/, /^Shapes/] },
  { name: 'Code',      re: [/^Code/, /^Terminal/, /^Bug/, /^Braces/, /^Variable/, /^Function/, /^Hash/, /^Binary/, /^Webhook/, /^Github/, /^Gitlab/, /^Cpu/] },
  { name: 'Devices',   re: [/^Laptop/, /^Desktop/, /^Tablet/, /^Smartphone/, /^Watch(?!m)/, /^Printer/, /^Keyboard/, /^Mouse/, /^Chip/, /^Memory/, /^Wifi/, /^Bluetooth/, /^Usb/, /^Battery/, /^Robot/, /^QrCode/, /^Monitor(?!S)/] },
  { name: 'People',    re: [/^User/, /^Person/, /^Team/, /^Users/, /^Baby/, /^Bot/, /^Ghost/, /^Crown/] },
  { name: 'Social',    re: [/^Twitter/, /^Facebook/, /^Instagram/, /^Linkedin/, /^Twitch/, /^Discord/, /^Slack/, /^Figma/, /^Dribbble/, /^Github/, /^Gitlab/] },
  { name: 'Commerce',  re: [/^Shopping/, /^Cart/, /^Bag(?!p)/, /^Store/, /^Wallet/, /^CreditCard/, /^Banknote/, /^Dollar/, /^Euro/, /^Coins?/, /^Bitcoin/, /^Gift/, /^Truck/] },
  { name: 'Nature',    re: [/^Tree/, /^Leaf/, /^Flower/, /^Plant/, /^Mountain/, /^Wave/, /^Drop(?!l)/, /^Droplets/, /^Fire/, /^Flame/, /^Sprout/, /^Globe/, /^Earth/] },
  { name: 'Weather',   re: [/^Sun/, /^Moon/, /^Cloud/, /^Rain/, /^Snow/, /^Wind/, /^Lightning/, /^Rainbow/, /^Thermometer/, /^Umbrella/, /^Snowflake/] },
  { name: 'Time',      re: [/^Clock/, /^Timer/, /^Alarm/, /^Calendar/, /^History/, /^Hourglass/, /^RotateCcw/, /^RotateCw/] },
  { name: 'Travel',    re: [/^Map/, /^MapPin/, /^Plane/, /^Car/, /^Bus/, /^Train/, /^Bike/, /^Ship/, /^Anchor/, /^House/, /^Home/, /^Building/, /^Navigation/, /^Compass/, /^Route/] },
  { name: 'Health',    re: [/^Heart/, /^Pill/, /^Stethoscope/, /^Hospital/, /^Cross/, /^Bandage/, /^Dna/, /^Syringe/, /^Brain/] },
  { name: 'Food',      re: [/^Coffee/, /^Cup/, /^Mug/, /^Wine/, /^Beer/, /^Pizza/, /^Burger/, /^Chef/, /^Utensil/, /^Apple/, /^Cake/, /^Cookie/, /^IceCream/, /^Carrot/, /^Cherry/] },
];

function categorize(name: string): string {
  for (const { name: cat, re } of CAT_PATTERNS) {
    if (re.some((r) => r.test(name))) return cat;
  }
  return 'Other';
}

/* ─────────────────────────────────────────────────────────────────────────────
   Icon registry (built once at module level)
───────────────────────────────────────────────────────────────────────────── */

function isIcon(key: string, val: unknown): boolean {
  if (!/^[A-Z]/.test(key) || key.endsWith('Icon') || key === 'LucideIcon' || key.startsWith('create') || key.startsWith('use')) return false;
  if (typeof val === 'function') return true;
  if (typeof val === 'object' && val !== null && '$$typeof' in (val as Record<string, unknown>)) return true;
  return false;
}

const REGISTRY: IconEntry[] = Object.entries(AuraIcons)
  .filter(([k, v]) => isIcon(k, v))
  .map(([name, Component]) => ({ name, Component: Component as IconComp, category: categorize(name) }))
  .sort((a, b) => a.name.localeCompare(b.name));

const CAT_NAMES = ['All', ...CAT_PATTERNS.map((c) => c.name), 'Other'].filter(
  (c) => c === 'All' || REGISTRY.some((i) => i.category === c),
);

/* ─────────────────────────────────────────────────────────────────────────────
   Styled icon renderer
───────────────────────────────────────────────────────────────────────────── */

function StyledIcon({ Component, style, size = 20 }: { Component: IconComp; style: StyleKey; size?: number }) {
  if (style === 'Duotone') {
    return (
      <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <Component aria-hidden size={size} strokeWidth={2.5} className="absolute inset-0 text-primary opacity-20" />
        <Component size={size} strokeWidth={1.5} className="relative" />
      </span>
    );
  }
  return <Component size={size} {...STYLE_PROPS[style]} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Code block
───────────────────────────────────────────────────────────────────────────── */

function CodeSnippet({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* */ }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3.5 py-2">
        <span className="font-mono text-[11px] font-medium text-muted-foreground">{title}</span>
        <button onClick={copy} className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-fg">
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-muted/10 px-4 py-3 font-mono text-[12px] leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Icon detail modal
───────────────────────────────────────────────────────────────────────────── */

function IconModal({
  icon, style, onStyleChange, onClose,
}: {
  icon: IconEntry; style: StyleKey; onStyleChange: (s: StyleKey) => void; onClose: () => void;
}) {
  const { name, Component, category } = icon;
  const ref = React.useRef<HTMLDivElement>(null);
  const [copiedImport, setCopiedImport] = React.useState(false);

  React.useEffect(() => { ref.current?.focus(); }, []);

  const importCode = `import { ${name} } from '@aura-ui/icons';`;
  const usageCode = `<${name} />\n<${name} size={24} className="text-primary" />`;
  const styledCode = style !== 'Regular' ? `<${name} ${STYLE_CODE[style]} />` : null;

  const copyImport = async () => {
    try { await navigator.clipboard.writeText(importCode); setCopiedImport(true); setTimeout(() => setCopiedImport(false), 2000); } catch { /* */ }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" aria-hidden onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} details`}
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[15px] font-semibold">{name}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{category}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">@aura-ui/icons · lucide-react</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-fg">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview */}
        <div className="border-y border-border/50 bg-muted/10 px-5 py-6">
          <div className="mb-5 flex items-end justify-center gap-5">
            {([16, 24, 32, 48] as const).map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border/60 bg-bg">
                  <StyledIcon Component={Component} style={style} size={sz} />
                </div>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{sz}px</span>
              </div>
            ))}
          </div>
          {/* Style picker */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => onStyleChange(s)}
                className={`rounded-lg border px-3 py-1 text-[11px] font-medium transition-colors ${
                  style === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-fg'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Code */}
        <div className="space-y-2.5 px-5 py-4">
          <CodeSnippet title="Import" code={importCode} />
          <CodeSnippet title="Usage" code={usageCode} />
          {styledCode && <CodeSnippet title={`${style} variant`} code={styledCode} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 bg-muted/10 px-5 py-3">
          <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
          <button
            onClick={copyImport}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-bg px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-fg"
          >
            {copiedImport ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            {copiedImport ? 'Copied!' : 'Copy import'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function IconsPage() {
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeStyle, setActiveStyle] = React.useState<StyleKey>('Regular');
  const [selected, setSelected] = React.useState<IconEntry | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  // Pre-fill search from URL param (e.g. ?q=arrow from global search)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new window.URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const filtered = React.useMemo(
    () =>
      REGISTRY.filter(
        (i) =>
          (activeCategory === 'All' || i.category === activeCategory) &&
          i.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, activeCategory],
  );

  const catCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    for (const icon of REGISTRY) {
      if (!icon.name.toLowerCase().includes(query.toLowerCase())) continue;
      counts.All = (counts.All ?? 0) + 1;
      counts[icon.category] = (counts[icon.category] ?? 0) + 1;
    }
    return counts;
  }, [query]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelected(null); return; }
      if (e.key === '/' && !selected && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <div className="mx-auto max-w-5xl">

      {/* Page header */}
      <div className="mb-8 border-b border-border/40 pb-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">@aura-ui/icons</p>
        <h1 className="text-[28px] font-semibold tracking-tight">Icons</h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {REGISTRY.length.toLocaleString()} icons from{' '}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-2 decoration-border hover:decoration-fg transition-colors">
            lucide-react
          </a>
          . Five visual styles. Click any icon to copy usage code.
        </p>
      </div>

      {/* ── Sticky controls ─────────────────────────────────────────────── */}
      <div className="sticky top-[52px] z-20 -mx-6 mb-4 border-b border-border/50 bg-bg/95 px-6 pb-3 pt-3 backdrop-blur-md md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
        {/* Search + style switcher row */}
        <div className="mb-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${REGISTRY.length} icons… (press /)`}
              className="h-9 w-full rounded-xl border border-border/70 bg-muted/20 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground/50 focus-visible:border-ring/50 focus-visible:ring-2 focus-visible:ring-ring/20 transition-shadow"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-fg">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {/* Style switcher */}
          <div className="flex shrink-0 items-center rounded-xl border border-border/70 bg-muted/20 p-0.5">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStyle(s)}
                className={`rounded-[9px] px-3 py-1.5 text-[12px] font-medium transition-all ${
                  activeStyle === s ? 'bg-bg text-fg shadow-sm' : 'text-muted-foreground hover:text-fg'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]">
          {CAT_NAMES.map((cat) => {
            const count = catCounts[cat] ?? 0;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/60 text-muted-foreground hover:border-border hover:text-fg'
                }`}
              >
                {cat}
                {count > 0 && (
                  <span className={`rounded-full px-1 text-[9px] font-semibold ${active ? 'bg-white/20' : 'bg-muted text-muted-foreground'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Count line */}
      <p className="mb-3 text-[12px] text-muted-foreground">
        {filtered.length === REGISTRY.length
          ? `${REGISTRY.length.toLocaleString()} icons`
          : `${filtered.length.toLocaleString()} of ${REGISTRY.length.toLocaleString()}`}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {query && ` matching "${query}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground/30" />
          <p className="text-sm font-medium">No icons found</p>
          <p className="mt-1 text-xs text-muted-foreground">Try a different term or category</p>
          <Button variant="ghost" size="sm" className="mt-4" onClick={() => { setQuery(''); setActiveCategory('All'); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] overflow-hidden rounded-xl border border-border/50">
          {filtered.map(({ name, Component, category }) => (
            <button
              key={name}
              onClick={() => setSelected({ name, Component, category })}
              title={name}
              className="group flex flex-col items-center gap-2 border-b border-r border-border/30 bg-bg px-2 py-4 text-center transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/30 last:border-r-0"
            >
              <StyledIcon Component={Component} style={activeStyle} size={20} />
              <span className="w-full truncate text-[9.5px] leading-snug text-muted-foreground transition-colors group-hover:text-fg">
                {name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <IconModal
          icon={selected}
          style={activeStyle}
          onStyleChange={setActiveStyle}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

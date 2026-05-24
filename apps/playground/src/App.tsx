import { useState, useRef, useEffect } from 'react';
import {
  Moon, Sun, Bell, Mail, Settings, Star, Search, Sparkles, Layers,
  Boxes, Component, Palette, Type, MousePointer2, ChevronRight,
  Paintbrush, Copy, RotateCcw, Check,
} from '@aura-ui/icons';
import {
  // Foundations
  Button, Checkbox, Dialog, Label, Separator, Switch, Toggle,
  // Phase B atoms
  AspectRatio, Avatar, Progress, Skeleton, Badge, Card, Spinner, Alert,
  // Phase C form
  Input, Textarea, RadioGroup, ToggleGroup, Slider, Form,
  // Phase D disclosure
  Collapsible, Accordion, Tabs, Breadcrumb, Pagination, Stepper,
  // Phase E overlays
  AlertDialog, Sheet, Drawer, Popover, Tooltip, HoverCard, Toast,
  // Phase F compound
  DropdownMenu, ContextMenu, Menubar, NavigationMenu, Select, MultiSelect, Combobox, Command,
  // Phase G specialty
  OneTimePasswordField, PasswordToggleField, NumberField, Calendar, DatePicker,
  TimePicker, DateRangePicker, DateTimePicker, ColorPicker, FileUpload,
  // Phase H feedback
  CircularProgress, Meter, ScrollArea, Toolbar, Resizable, Carousel, Tree,
  Editable, TagsInput, Mentions, CopyButton,
} from '@aura-ui/styled';
import { useTheme } from '@aura-ui/themes';
import {
  DataTable, exportToCSV,
  type DataTableColumn, type Table,
} from '@aura-ui/data-table';
import {
  componentUsageExamples,
  componentUsageGroups,
  type UsageExample,
} from '../../docs/lib/component-usage-examples';

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

const multiSelectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `option-${index + 1}`,
    label: `Option ${index + 1}`,
  })),
];

interface NavSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  description: string;
}

const SECTIONS: NavSection[] = [
  { id: 'foundations', title: 'Foundations', icon: Type, count: 7, description: 'Building blocks that establish the design language.' },
  { id: 'atoms', title: 'Atoms', icon: Boxes, count: 8, description: 'Single-purpose styled components with no internal state.' },
  { id: 'form', title: 'Form Controls', icon: MousePointer2, count: 6, description: 'Inputs, selectors and validation primitives.' },
  { id: 'disclosure', title: 'Disclosure & Nav', icon: Layers, count: 6, description: 'Show/hide and navigation patterns.' },
  { id: 'overlays', title: 'Overlays', icon: Component, count: 8, description: 'Dialogs, popovers, tooltips and notifications.' },
  { id: 'compound', title: 'Compound', icon: Sparkles, count: 8, description: 'Complex menus, selects, and command palettes.' },
  { id: 'specialty', title: 'Specialty Form', icon: Palette, count: 9, description: 'Date, time, color, OTP and file inputs.' },
  { id: 'feedback', title: 'Feedback & Misc', icon: Bell, count: 11, description: 'Progress, scroll, resize, and editable surfaces.' },
  { id: 'data', title: 'Data', icon: Boxes, count: 1, description: 'Full-featured data grid with all the bells and whistles.' },
  { id: 'usage', title: 'Usage Gallery', icon: Component, count: 64, description: 'Large prop, state, composition, and data examples for every core component.' },
  { id: 'palette', title: 'Color Palette', icon: Palette, count: 12, description: 'Generate an accessible 12-step color scale from any accent color.' },
];

// Color presets — each preset is HSL "H S% L%" for primary
const COLOR_PRESETS = [
  { name: 'Slate', hsl: '222 47% 11%' },
  { name: 'Zinc', hsl: '240 6% 10%' },
  { name: 'Indigo', hsl: '239 84% 67%' },
  { name: 'Blue', hsl: '217 91% 60%' },
  { name: 'Cyan', hsl: '187 85% 43%' },
  { name: 'Green', hsl: '142 71% 45%' },
  { name: 'Lime', hsl: '85 78% 49%' },
  { name: 'Yellow', hsl: '48 96% 53%' },
  { name: 'Orange', hsl: '25 95% 53%' },
  { name: 'Red', hsl: '0 84% 60%' },
  { name: 'Rose', hsl: '347 77% 50%' },
  { name: 'Pink', hsl: '330 81% 60%' },
  { name: 'Violet', hsl: '262 83% 58%' },
  { name: 'Purple', hsl: '270 90% 60%' },
];

const RADIUS_PRESETS = [
  { name: 'None', value: '0' },
  { name: 'Small', value: '0.25rem' },
  { name: 'Default', value: '0.5rem' },
  { name: 'Medium', value: '0.625rem' },
  { name: 'Large', value: '0.75rem' },
  { name: 'XL', value: '1rem' },
];

const SCALE_PRESETS = [
  { name: '90%', value: 0.9 },
  { name: '95%', value: 0.95 },
  { name: '100%', value: 1 },
  { name: '105%', value: 1.05 },
  { name: '110%', value: 1.1 },
];

interface ThemeBuilderState {
  primary: string;
  radius: string;
  scale: number;
  contrast: number;
  panelMode: 'solid' | 'translucent';
}

const DEFAULT_BUILDER: ThemeBuilderState = {
  primary: '222 47% 11%',
  radius: '0.5rem',
  scale: 1,
  contrast: 100,
  panelMode: 'translucent',
};

export default function App() {
  const { theme, setTheme, resolvedMode, setMode, themes } = useTheme();
  const [active, setActive] = useState('foundations');
  const [search, setSearch] = useState('');
  const [builder, setBuilder] = useState<ThemeBuilderState>(DEFAULT_BUILDER);
  const [copied, setCopied] = useState(false);
  const tableRef = useRef<Table<User> | null>(null);
  const activeSection = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0]!;

  const filtered = SECTIONS.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Apply builder tokens to <html> so portaled overlays inherit them too
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', builder.primary);
    root.style.setProperty('--color-ring', builder.primary);
    root.style.setProperty('--radius', builder.radius);
    root.style.fontSize = `${16 * builder.scale}px`;
    document.body.style.filter =
      builder.contrast !== 100 ? `contrast(${builder.contrast}%)` : '';
    return () => {
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-ring');
      root.style.removeProperty('--radius');
      root.style.fontSize = '';
      document.body.style.filter = '';
    };
  }, [builder]);

  const cssOutput = `:root {
  --color-primary: ${builder.primary};
  --color-ring: ${builder.primary};
  --radius: ${builder.radius};
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { void e; }
  };

  return (
    <Toast.Provider>
      <Tooltip.Provider delayDuration={200}>
        <div className="min-h-screen bg-bg text-fg">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-glass">
            <div className="flex h-14 items-center gap-4 px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight">aura-ui</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">playground</div>
                </div>
              </div>
              <Badge variant="secondary" className="hidden md:inline-flex">v0.0.1 · 64 components</Badge>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search components…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-56 pl-8 text-xs"
                  />
                </div>
                <Select.Root value={theme} onValueChange={setTheme}>
                  <Select.Trigger className="h-8 w-[110px] text-xs">
                    <Select.Value placeholder="Theme" />
                  </Select.Trigger>
                  <Select.Content>
                    {themes.map((t) => (
                      <Select.Item key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
                      aria-label="Toggle dark mode"
                    >
                      {resolvedMode === 'dark' ? <Sun /> : <Moon />}
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>{resolvedMode === 'dark' ? 'Light mode' : 'Dark mode'}</Tooltip.Content>
                </Tooltip.Root>
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-[1600px] grid-cols-[240px_1fr_300px] gap-0">
            {/* Sidebar */}
            <aside className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border/60 px-3 py-6">
              <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Components
              </div>
              <nav className="space-y-0.5">
                {(filtered.length ? filtered : SECTIONS).map((s) => {
                  const Icon = s.icon;
                  const isActive = s.id === active;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      className={`group relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs transition-all duration-snappy ${
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-fg'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 transition-transform ${isActive ? 'text-primary' : ''}`} />
                      <span className="flex-1 text-left">{s.title}</span>
                      <span
                        className={`text-[10px] tabular-nums tracking-tight ${
                          isActive ? 'text-primary' : 'text-muted-foreground/70'
                        }`}
                      >
                        {s.count}
                      </span>
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </nav>
              <Separator className="my-4" />
              <div className="space-y-1 px-2 text-[10px] text-muted-foreground">
                <p>~76 components total</p>
                <p>WCAG 2.2 AA · Tailwind v3</p>
                <p>React 18 · 19 compatible</p>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0">
              {/* Hero */}
              <div className="border-b border-border/60 bg-gradient-to-b from-accent/20 to-transparent px-8 py-10">
                <Breadcrumb.Root>
                  <Breadcrumb.List>
                    <Breadcrumb.Item><Breadcrumb.Link href="#" className="text-xs">Playground</Breadcrumb.Link></Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item><Breadcrumb.Page className="text-xs">{activeSection.title}</Breadcrumb.Page></Breadcrumb.Item>
                  </Breadcrumb.List>
                </Breadcrumb.Root>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">{activeSection.title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{activeSection.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="font-mono text-[10px]">{activeSection.count} components</Badge>
                  <Badge variant="success" className="font-mono text-[10px]">Production-ready</Badge>
                  <Badge variant="secondary" className="font-mono text-[10px]">Themeable</Badge>
                </div>
              </div>

              <div className="px-8 py-8 space-y-8">
                {active === 'foundations' && <Foundations />}
                {active === 'atoms' && <Atoms />}
                {active === 'form' && <FormBasics />}
                {active === 'disclosure' && <Disclosure />}
                {active === 'overlays' && <Overlays />}
                {active === 'compound' && <Compound />}
                {active === 'specialty' && <SpecialtyForm />}
                {active === 'feedback' && <FeedbackMisc />}
                {active === 'data' && <DataTableDemo tableRef={tableRef} />}
                {active === 'usage' && <UsageCoverageGallery />}
                {active === 'palette' && <PaletteGenerator />}
              </div>
            </main>

            {/* Docked Theme Panel */}
            <aside className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-border/60 bg-card/30 px-5 py-6">
              <div className="flex items-center gap-2 mb-1">
                <Paintbrush className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold tracking-tight">Theme</h2>
              </div>
              <p className="text-[11px] text-muted-foreground mb-5">
                Build your theme. Changes apply live to every component.
              </p>

            <div className="space-y-6">
              {/* Base theme */}
              <ThemeSection title="Base theme" subtitle="The neutral color palette">
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium transition-all duration-snappy ${
                        theme === t
                          ? 'border-primary bg-primary text-primary-foreground shadow-sm scale-[1.02]'
                          : 'border-border hover:border-border-strong'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </ThemeSection>

              {/* Accent color */}
              <ThemeSection title="Accent color" subtitle="Primary brand color">
                <div className="grid grid-cols-7 gap-2">
                  {COLOR_PRESETS.map((c) => (
                    <Tooltip.Root key={c.name}>
                      <Tooltip.Trigger asChild>
                        <button
                          onClick={() => setBuilder((b) => ({ ...b, primary: c.hsl }))}
                          aria-label={c.name}
                          className={`group/swatch relative h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-bg transition-all duration-snappy active:scale-90 ${
                            builder.primary === c.hsl ? 'ring-primary' : 'ring-transparent hover:ring-border-strong'
                          }`}
                          style={{ backgroundColor: `hsl(${c.hsl})` }}
                        >
                          {builder.primary === c.hsl && (
                            <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow animate-in zoom-in-50 duration-150" />
                          )}
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{c.name}</Tooltip.Content>
                    </Tooltip.Root>
                  ))}
                </div>
              </ThemeSection>

              {/* Radius */}
              <ThemeSection title="Radius" subtitle="Border roundness">
                <div className="grid grid-cols-3 gap-2">
                  {RADIUS_PRESETS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setBuilder((b) => ({ ...b, radius: r.value }))}
                      className={`flex flex-col items-center gap-1.5 rounded-md border px-2 py-2 text-[10px] font-medium transition-all duration-snappy ${
                        builder.radius === r.value
                          ? 'border-primary bg-accent shadow-sm'
                          : 'border-border hover:border-border-strong'
                      }`}
                    >
                      <div
                        className="h-6 w-6 border-2 border-fg"
                        style={{ borderRadius: r.value }}
                      />
                      {r.name}
                    </button>
                  ))}
                </div>
              </ThemeSection>

              {/* Scale */}
              <ThemeSection title="Scaling" subtitle="Overall component size">
                <div className="grid grid-cols-5 gap-2">
                  {SCALE_PRESETS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setBuilder((b) => ({ ...b, scale: s.value }))}
                      className={`rounded-md border px-2 py-2 text-[10px] font-medium tabular-nums transition-all duration-snappy ${
                        builder.scale === s.value
                          ? 'border-primary bg-accent shadow-sm'
                          : 'border-border hover:border-border-strong'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </ThemeSection>

              {/* Contrast */}
              <ThemeSection title="Contrast" subtitle={`${builder.contrast}%`}>
                <Slider
                  value={[builder.contrast]}
                  onValueChange={([v]) => v !== undefined && setBuilder((b) => ({ ...b, contrast: v }))}
                  min={80}
                  max={130}
                  step={5}
                />
              </ThemeSection>

              {/* Mode */}
              <ThemeSection title="Appearance" subtitle="Light / Dark / Match system">
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'system'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-medium capitalize transition-all duration-snappy ${
                        (m === 'system' ? false : resolvedMode === m)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-border-strong'
                      }`}
                    >
                      {m === 'light' && <Sun className="h-3 w-3" />}
                      {m === 'dark' && <Moon className="h-3 w-3" />}
                      {m === 'system' && <Sparkles className="h-3 w-3" />}
                      {m}
                    </button>
                  ))}
                </div>
              </ThemeSection>

              {/* Live preview */}
              <ThemeSection title="Live preview" subtitle="See your theme in action">
                <div className="rounded-lg border border-border bg-card p-3 space-y-2">
                  <div className="flex gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                  </div>
                  <Input placeholder="Sample input" className="h-8 text-xs" />
                  <div className="flex gap-1.5">
                    <Badge>New</Badge>
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Beta</Badge>
                  </div>
                </div>
              </ThemeSection>

              {/* CSS output */}
              <ThemeSection title="Export CSS" subtitle="Paste into your globals.css">
                <pre className="rounded-md border border-border bg-muted/50 p-3 text-[11px] leading-relaxed font-mono text-fg overflow-x-auto">
                  {cssOutput}
                </pre>
              </ThemeSection>

              {/* Actions */}
              <div className="flex gap-2 sticky bottom-0 bg-card/95 backdrop-blur py-3 -mx-5 px-5 border-t border-border/50">
                <Button variant="outline" size="sm" onClick={() => setBuilder(DEFAULT_BUILDER)} className="flex-1 gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleCopy} className="flex-1 gap-1.5">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy theme'}
                </Button>
              </div>
            </div>
            </aside>
          </div>
        </div>

        <Toast.Viewport />
      </Tooltip.Provider>
    </Toast.Provider>
  );
}

function ThemeSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div>
        <h3 className="text-xs font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/* ─── Demo container ──────────────────────────────────────────────── */

interface DemoProps {
  name: string;
  description?: string;
  variant?: 'default' | 'wide' | 'inline' | 'plain';
  children: React.ReactNode;
}

function Demo({ name, description, variant = 'default', children }: DemoProps) {
  return (
    <section className="group/demo">
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{name}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{`<${name} />`}</code>
      </div>
      <div className={`rounded-xl border border-border/60 bg-card shadow-xs overflow-hidden`}>
        <div className="absolute right-2 top-2 hidden group-hover/demo:flex"></div>
        <div className={
          variant === 'plain' ? '' :
          variant === 'wide' ? 'p-6' :
          variant === 'inline' ? 'flex flex-wrap items-center gap-3 p-8 min-h-[140px]' :
          'flex items-center justify-center p-10 min-h-[200px] bg-gradient-to-br from-bg to-muted/20'
        }>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ─── Usage coverage gallery ─────────────────────────────────────── */

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function UsageCoverageCard({
  componentName,
  example,
}: {
  componentName: string;
  example: UsageExample;
}) {
  return (
    <section className="grid min-h-80 gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{example.title}</h3>
          {example.description ? (
            <p className="mt-1 text-xs text-muted-foreground">{example.description}</p>
          ) : null}
        </div>
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          {componentName}
        </Badge>
      </div>
      <div className="flex min-h-44 items-center justify-center rounded-lg border border-border/60 bg-muted/20 p-4">
        {example.preview()}
      </div>
    </section>
  );
}

function UsageCoverageGallery() {
  return (
    <div className="space-y-10">
      {componentUsageGroups.map((group) => (
        <section key={group.title} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Props, variants, composition patterns, and larger data examples.
            </p>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {group.slugs.flatMap((slug) => {
              const examples = componentUsageExamples[slug] ?? [];
              return examples.map((example) => (
                <UsageCoverageCard
                  key={`${slug}-${example.title}`}
                  componentName={titleFromSlug(slug)}
                  example={example}
                />
              ));
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ─── Foundations ─────────────────────────────────────────────────── */

function Foundations() {
  const [switchOn, setSwitchOn] = useState(true);
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Demo name="Button" description="Six variants × four sizes. Spring press, smooth color transitions." variant="inline">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Separator className="w-full my-1" />
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Settings"><Settings /></Button>
      </Demo>

      <Demo name="Switch" description="iOS-style toggle with spring thumb animation.">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="notif" />
            <Label htmlFor="notif" className="cursor-pointer">Notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch size="sm" defaultChecked /> <span className="text-xs text-muted-foreground">sm</span>
            <Switch size="md" defaultChecked /> <span className="text-xs text-muted-foreground">md</span>
            <Switch size="lg" defaultChecked /> <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
      </Demo>

      <Demo name="Checkbox" description="Square checkbox with animated check. Spring press." variant="inline">
        <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1">Accept terms</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c2" /><Label htmlFor="c2">Subscribe</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c3" checked="indeterminate" /><Label htmlFor="c3">Indeterminate</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c4" disabled /><Label htmlFor="c4">Disabled</Label></div>
      </Demo>

      <Demo name="Toggle" description="Two-state button toggle." variant="inline">
        <Toggle pressed={pressed} onPressedChange={setPressed}>Bold</Toggle>
        <Toggle defaultPressed><span className="italic">Italic</span></Toggle>
        <Toggle><span className="underline">Underline</span></Toggle>
      </Demo>

      <Demo name="Label & Separator" description="Form label + horizontal/vertical dividers." variant="inline">
        <Label>Standalone label</Label>
        <Separator className="w-full my-2" />
        <div className="flex items-center text-sm">
          A <Separator className="mx-3 h-4 w-px" /> B <Separator className="mx-3 h-4 w-px" /> C
        </div>
      </Demo>
    </>
  );
}

/* ─── Atoms ──────────────────────────────────────────────────────── */

function Atoms() {
  return (
    <>
      <Demo name="Card" description="Compound: Root, Header, Title, Description, Content, Footer." variant="wide">
        <Card.Root className="max-w-sm mx-auto">
          <Card.Header>
            <Card.Title>Notifications</Card.Title>
            <Card.Description>You have 3 unread messages.</Card.Description>
          </Card.Header>
          <Card.Content className="flex items-center gap-3">
            <Avatar.Root><Avatar.Image src="https://i.pravatar.cc/40?img=1" alt="" /><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>
            <div className="text-sm">
              <p className="font-medium">Ada Lovelace</p>
              <p className="text-muted-foreground text-xs">3 minutes ago</p>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button size="sm" variant="outline" className="ml-auto">Mark read</Button>
            <Button size="sm">View all</Button>
          </Card.Footer>
        </Card.Root>
      </Demo>

      <Demo name="Avatar" description="Image with intelligent fallback states." variant="inline">
        <Avatar.Root><Avatar.Image src="https://i.pravatar.cc/80?img=1" alt="" /><Avatar.Fallback>AD</Avatar.Fallback></Avatar.Root>
        <Avatar.Root><Avatar.Image src="https://i.pravatar.cc/80?img=8" alt="" /><Avatar.Fallback>JS</Avatar.Fallback></Avatar.Root>
        <Avatar.Root><Avatar.Image src="https://i.pravatar.cc/80?img=12" alt="" /><Avatar.Fallback>MK</Avatar.Fallback></Avatar.Root>
        <Avatar.Root><Avatar.Fallback>+5</Avatar.Fallback></Avatar.Root>
      </Demo>

      <Demo name="Badge" description="Status descriptors with six variants." variant="inline">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
      </Demo>

      <Demo name="Progress" description="Animated linear progress with smooth fill." variant="wide">
        <div className="space-y-4 max-w-md mx-auto">
          <Progress value={25} />
          <Progress value={62} />
          <Progress value={91} />
        </div>
      </Demo>

      <Demo name="AspectRatio" description="Constrains content to a fixed width/height ratio." variant="wide">
        <div className="max-w-md mx-auto">
          <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent text-sm font-medium">16 : 9</div>
          </AspectRatio>
        </div>
      </Demo>

      <Demo name="Skeleton" description="Pulse-animated loading placeholder.">
        <div className="space-y-3 w-full max-w-md">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </Demo>

      <Demo name="Spinner" description="Indeterminate loading indicator in four sizes." variant="inline">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </Demo>

      <Demo name="Alert" description="Contextual inline messages." variant="wide">
        <div className="space-y-3 max-w-md mx-auto">
          <Alert.Root><Alert.Title>Heads up!</Alert.Title><Alert.Description>You can edit this any time.</Alert.Description></Alert.Root>
          <Alert.Root variant="destructive"><Alert.Title>Error</Alert.Title><Alert.Description>Something broke. Try again.</Alert.Description></Alert.Root>
          <Alert.Root variant="success"><Alert.Title>Success</Alert.Title><Alert.Description>Your changes are saved.</Alert.Description></Alert.Root>
        </div>
      </Demo>
    </>
  );
}

/* ─── Form ──────────────────────────────────────────────────────── */

function FormBasics() {
  const [radio, setRadio] = useState('a');
  const [tg, setTg] = useState<string[]>(['bold']);
  const [slider, setSlider] = useState([40]);
  return (
    <>
      <Demo name="Input" description="Text input with focus ring and invalid state." variant="wide">
        <div className="grid gap-3 max-w-md mx-auto">
          <div className="grid gap-1.5"><Label htmlFor="em">Email</Label><Input id="em" type="email" placeholder="you@example.com" /></div>
          <div className="grid gap-1.5"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" placeholder="••••••••" /></div>
          <div className="grid gap-1.5"><Label htmlFor="dis">Disabled</Label><Input id="dis" placeholder="Disabled" disabled /></div>
        </div>
      </Demo>

      <Demo name="Textarea" description="Multi-line text with smooth focus.">
        <Textarea placeholder="Tell us about yourself…" className="max-w-md min-h-[100px]" />
      </Demo>

      <Demo name="RadioGroup" description="Mutually exclusive selection with arrow-key navigation.">
        <RadioGroup.Root value={radio} onValueChange={setRadio} className="grid gap-2 max-w-sm mx-auto">
          {[
            { v: 'a', l: 'Default option' },
            { v: 'b', l: 'Comfortable option' },
            { v: 'c', l: 'Compact option' },
          ].map(({ v, l }) => (
            <label key={v} className="flex items-center gap-3 rounded-md border border-border/50 p-3 cursor-pointer hover:bg-accent/30 transition-colors">
              <RadioGroup.Item value={v} id={`r-${v}`} /><span className="text-sm">{l}</span>
            </label>
          ))}
        </RadioGroup.Root>
      </Demo>

      <Demo name="ToggleGroup" description="Single or multiple toggle selection." variant="inline">
        <ToggleGroup.Root type="multiple" value={tg} onValueChange={setTg}>
          <ToggleGroup.Item value="bold"><strong>B</strong></ToggleGroup.Item>
          <ToggleGroup.Item value="italic"><em>I</em></ToggleGroup.Item>
          <ToggleGroup.Item value="underline"><span className="underline">U</span></ToggleGroup.Item>
        </ToggleGroup.Root>
      </Demo>

      <Demo name="Slider" description="Pointer + keyboard control. Multi-thumb support.">
        <div className="w-full max-w-md space-y-2">
          <Slider value={slider} onValueChange={setSlider} max={100} />
          <p className="text-xs text-muted-foreground text-center">Value: {slider[0]}</p>
        </div>
      </Demo>

      <Demo name="Form" description="Declarative validation built on native ValidityState.">
        <Form.Root className="max-w-md w-full" onSubmit={(e) => { e.preventDefault(); alert('submitted!'); }}>
          <Form.Field name="email" className="grid gap-1.5">
            <Form.Label asChild><Label>Email address</Label></Form.Label>
            <Form.Control type="email" required placeholder="you@example.com" />
            <Form.Message match="valueMissing">Please enter an email.</Form.Message>
            <Form.Message match="typeMismatch">That is not a valid email.</Form.Message>
          </Form.Field>
          <Form.Submit asChild><Button className="mt-3 w-full">Submit</Button></Form.Submit>
        </Form.Root>
      </Demo>
    </>
  );
}

/* ─── Disclosure & nav ───────────────────────────────────────────── */

function Disclosure() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  return (
    <>
      <Demo name="Collapsible" description="Show or hide a section with smooth height animation.">
        <Collapsible.Root open={open} onOpenChange={setOpen} className="w-full max-w-md">
          <Collapsible.Trigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {open ? 'Hide details' : 'Show details'}
              <ChevronRight className={`h-4 w-4 transition-transform duration-smooth ${open ? 'rotate-90' : ''}`} />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2 rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <p>This content is animated in and out smoothly.</p>
            <p className="mt-1 text-muted-foreground text-xs">The height transitions using CSS variables.</p>
          </Collapsible.Content>
        </Collapsible.Root>
      </Demo>

      <Demo name="Accordion" description="Multi-section disclosure with arrow-key navigation." variant="wide">
        <Accordion.Root type="single" collapsible className="w-full max-w-md mx-auto">
          {[
            { v: 'a', q: 'Is it accessible?', a: 'Yes. Each panel follows the WAI-ARIA APG specification.' },
            { v: 'b', q: 'Is it animated?', a: 'Yes. Spring-eased height transitions out of the box.' },
            { v: 'c', q: 'Is it themeable?', a: 'Yes. All colors come from CSS variables.' },
          ].map(({ v, q, a }) => (
            <Accordion.Item key={v} value={v}>
              <Accordion.Trigger>{q}</Accordion.Trigger>
              <Accordion.Content className="text-muted-foreground">{a}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Demo>

      <Demo name="Tabs" description="Active tab gets a subtle shadow lift. Arrow keys cycle." variant="wide">
        <Tabs.Root defaultValue="acc" className="w-full max-w-md mx-auto">
          <Tabs.List>
            <Tabs.Trigger value="acc">Account</Tabs.Trigger>
            <Tabs.Trigger value="pwd">Password</Tabs.Trigger>
            <Tabs.Trigger value="bill">Billing</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="acc" className="text-sm text-muted-foreground p-2">Make changes to your account here.</Tabs.Content>
          <Tabs.Content value="pwd" className="text-sm text-muted-foreground p-2">Change your password here.</Tabs.Content>
          <Tabs.Content value="bill" className="text-sm text-muted-foreground p-2">Manage your billing.</Tabs.Content>
        </Tabs.Root>
      </Demo>

      <Demo name="Breadcrumb" description="Trail of links showing the current location.">
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item><Breadcrumb.Link href="#">Home</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Link href="#">Library</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Page>Components</Breadcrumb.Page></Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Demo>

      <Demo name="Pagination" description="Navigate between pages of results.">
        <Pagination.Root>
          <Pagination.Content>
            <Pagination.Item><Pagination.Previous onClick={() => setPage((p) => Math.max(1, p - 1))} /></Pagination.Item>
            {[1, 2, 3].map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={page === p} onClick={() => setPage(p)}>{p}</Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
            <Pagination.Item><Pagination.Next onClick={() => setPage((p) => Math.min(3, p + 1))} /></Pagination.Item>
          </Pagination.Content>
        </Pagination.Root>
      </Demo>

      <Demo name="Stepper" description="Multi-step process indicator." variant="wide">
        <Stepper.Root activeStep={1} className="max-w-md mx-auto">
          <Stepper.Step index={0} /><Stepper.Separator />
          <Stepper.Step index={1} /><Stepper.Separator />
          <Stepper.Step index={2} />
        </Stepper.Root>
      </Demo>
    </>
  );
}

/* ─── Overlays ──────────────────────────────────────────────────── */

function Overlays() {
  const [toastOpen, setToastOpen] = useState(false);
  return (
    <>
      <Demo name="Dialog" description="Modal overlay with focus trap, scroll lock, zoom-in.">
        <Dialog.Root>
          <Dialog.Trigger asChild><Button>Open dialog</Button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description>Make changes to your profile. Click save when done.</Dialog.Description>
              </Dialog.Header>
              <div className="grid gap-3 py-2">
                <div className="grid gap-1.5"><Label htmlFor="name">Name</Label><Input id="name" defaultValue="Ada Lovelace" /></div>
                <div className="grid gap-1.5"><Label htmlFor="user">Username</Label><Input id="user" defaultValue="@ada" /></div>
              </div>
              <Dialog.Footer>
                <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
                <Dialog.Close asChild><Button>Save changes</Button></Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Demo>

      <Demo name="AlertDialog" description="Confirmation dialog requiring explicit action.">
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild><Button variant="destructive">Delete account</Button></AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description>This will permanently delete your account.</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Yes, delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Demo>

      <Demo name="Sheet" description="Side-anchored panel sliding in from any edge." variant="inline">
        {(['top','right','bottom','left'] as const).map((side) => (
          <Sheet.Root key={side}>
            <Sheet.Trigger asChild><Button variant="outline">{side}</Button></Sheet.Trigger>
            <Sheet.Content side={side}>
              <Sheet.Header><Sheet.Title>Sheet from {side}</Sheet.Title><Sheet.Description>Slides smoothly from the {side} edge.</Sheet.Description></Sheet.Header>
            </Sheet.Content>
          </Sheet.Root>
        ))}
      </Demo>

      <Demo name="Drawer" description="Mobile-friendly bottom-sheet with a drag handle.">
        <Drawer.Root>
          <Drawer.Trigger asChild><Button variant="outline">Open drawer</Button></Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header><Drawer.Title>Are you sure?</Drawer.Title><Drawer.Description>This action cannot be undone.</Drawer.Description></Drawer.Header>
            <Drawer.Footer><Button>Submit</Button><Drawer.Close asChild><Button variant="outline">Cancel</Button></Drawer.Close></Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </Demo>

      <Demo name="Popover" description="Glass-blur floating panel with spring entry.">
        <Popover.Root>
          <Popover.Trigger asChild><Button variant="outline">Open popover</Button></Popover.Trigger>
          <Popover.Content>
            <div className="grid gap-2">
              <h4 className="font-medium text-sm">Dimensions</h4>
              <p className="text-xs text-muted-foreground">Set width and height for the layer.</p>
              <div className="grid grid-cols-3 items-center gap-2 mt-2">
                <Label htmlFor="w" className="text-xs">Width</Label><Input id="w" defaultValue="100%" className="col-span-2 h-7 text-xs" />
                <Label htmlFor="h" className="text-xs">Height</Label><Input id="h" defaultValue="25px" className="col-span-2 h-7 text-xs" />
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      </Demo>

      <Demo name="Tooltip" description="Inverted dark bubble with backdrop blur." variant="inline">
        <Tooltip.Root>
          <Tooltip.Trigger asChild><Button variant="outline">Hover me</Button></Tooltip.Trigger>
          <Tooltip.Content>Subtle and snappy.</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild><Button variant="ghost" size="icon" aria-label="Star"><Star /></Button></Tooltip.Trigger>
          <Tooltip.Content>Add to favorites</Tooltip.Content>
        </Tooltip.Root>
      </Demo>

      <Demo name="HoverCard" description="Richer popover triggered by hover.">
        <HoverCard.Root>
          <HoverCard.Trigger asChild><a className="underline cursor-pointer">@aura-ui</a></HoverCard.Trigger>
          <HoverCard.Content>
            <div className="flex items-start gap-3">
              <Avatar.Root><Avatar.Fallback>AU</Avatar.Fallback></Avatar.Root>
              <div>
                <h4 className="text-sm font-semibold">@aura-ui</h4>
                <p className="text-xs text-muted-foreground">React component library — open source.</p>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>
      </Demo>

      <Demo name="Toast" description="Transient notification with swipe-to-dismiss.">
        <Button onClick={() => setToastOpen(true)}>Show toast</Button>
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen} duration={4000}>
          <Toast.Title>Scheduled: Catch up</Toast.Title>
          <Toast.Description>Friday, February 10, 2026 at 5:57 PM</Toast.Description>
          <Toast.Close />
        </Toast.Root>
      </Demo>
    </>
  );
}

/* ─── Compound ──────────────────────────────────────────────────── */

function Compound() {
  const [multiOptions, setMultiOptions] = useState(multiSelectOptions);

  return (
    <>
      <Demo name="DropdownMenu" description="Anchored menu with check/radio items and sub-menus.">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild><Button variant="outline">Open menu</Button></DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56">
            <DropdownMenu.Label>My account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item><Settings />Settings<DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut></DropdownMenu.Item>
            <DropdownMenu.Item><Mail />Inbox<DropdownMenu.Shortcut>⌘I</DropdownMenu.Shortcut></DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Demo>

      <Demo name="ContextMenu" description="Right-click menu.">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex h-32 w-full max-w-md items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground">
            Right-click anywhere inside
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </Demo>

      <Demo name="Menubar" description="Top-level menu bar with nested menus.">
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New <span className="ml-auto text-xs text-muted-foreground/70">⌘N</span></Menubar.Item>
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
      </Demo>

      <Demo name="NavigationMenu" description="Site-level navigation with submenus.">
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="docs"><NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger></NavigationMenu.Item>
            <NavigationMenu.Item value="learn"><NavigationMenu.Trigger>Learn</NavigationMenu.Trigger></NavigationMenu.Item>
            <NavigationMenu.Item value="comm"><NavigationMenu.Trigger>Community</NavigationMenu.Trigger></NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Demo>

      <Demo name="Select" description="Custom dropdown select with typeahead and keyboard nav.">
        <Select.Root>
          <Select.Trigger className="w-[220px]"><Select.Value placeholder="Select a fruit" /></Select.Trigger>
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
      </Demo>

      <Demo name="MultiSelect" description="Multiple selections with searchable virtualized options.">
        <MultiSelect.Root
          defaultValue={['react', 'svelte']}
          searchable
          onCreateOption={(value) => {
            setMultiOptions((current) => [{ value, label: value }, ...current]);
          }}
        >
          <MultiSelect.Trigger className="w-[340px]" aria-label="Frameworks">
            <MultiSelect.Value placeholder="Select frameworks" options={multiOptions} />
          </MultiSelect.Trigger>
          <MultiSelect.Content options={multiOptions} />
        </MultiSelect.Root>
      </Demo>

      <Demo name="Combobox" description="Searchable, autocomplete-style input.">
        <Combobox.Root>
          <Combobox.Input placeholder="Search frameworks…" className="w-[260px]" />
          <Combobox.Content>
            {['React', 'Vue', 'Svelte', 'Angular', 'Solid'].map((v) => (
              <Combobox.Item key={v} value={v.toLowerCase()}>{v}</Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Root>
      </Demo>

      <Demo name="Command" description="cmdk-style command palette with fuzzy search." variant="wide">
        <Command.Root className="max-w-md mx-auto rounded-lg border border-border shadow-md">
          <Command.Input placeholder="Type a command or search…" />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Suggestions">
              <Command.Item><Search className="mr-2 h-4 w-4" />Search<Command.Shortcut>⌘K</Command.Shortcut></Command.Item>
              <Command.Item><Star className="mr-2 h-4 w-4" />Favorites</Command.Item>
              <Command.Item><Mail className="mr-2 h-4 w-4" />Mail</Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Settings">
              <Command.Item><Settings className="mr-2 h-4 w-4" />Preferences</Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Demo>
    </>
  );
}

/* ─── Specialty form ─────────────────────────────────────────────── */

function SpecialtyForm() {
  const [otp, setOtp] = useState('');
  const [num, setNum] = useState<number | undefined>(5);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Date | null>(new Date(2026, 4, 23, 9, 30));
  const [dateTime, setDateTime] = useState<Date | null>(new Date(2026, 4, 23, 14, 30));
  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date(2026, 4, 20),
    new Date(2026, 4, 27),
  ]);
  return (
    <>
      <Demo name="OneTimePasswordField" description="OTP/PIN input with paste handling.">
        <OneTimePasswordField.Root length={6} value={otp} onValueChange={setOtp}>
          {[0, 1, 2, 3, 4, 5].map((i) => (<OneTimePasswordField.Input key={i} index={i} />))}
        </OneTimePasswordField.Root>
      </Demo>

      <Demo name="PasswordToggleField" description="Password input with show/hide.">
        <PasswordToggleField.Root className="w-full max-w-sm">
          <PasswordToggleField.Input placeholder="Enter your password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </Demo>

      <Demo name="NumberField" description="Numeric input with stepper, Intl formatting.">
        <NumberField.Root value={num} onValueChange={setNum} min={0} max={20}>
          <NumberField.DecrementTrigger />
          <NumberField.Input />
          <NumberField.IncrementTrigger />
        </NumberField.Root>
      </Demo>

      <Demo name="Calendar" description="Zero-dep calendar: single, range or multi-select." variant="wide">
        <div className="flex justify-center"><Calendar mode="single" /></div>
      </Demo>

      <Demo name="DatePicker" description="Calendar in a popover.">
        <DatePicker
          label="Release date"
          value={date ?? null}
          onChange={(nextDate) => setDate(nextDate ?? undefined)}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          helperText="MUI-style field API with validation bounds."
        />
      </Demo>

      <Demo name="TimePicker" description="MUI-style time field with validation.">
        <TimePicker
          label="Start time"
          value={time}
          onChange={setTime}
          ampm
          minutesStep={15}
          minTime={new Date(2026, 4, 23, 8, 0)}
          maxTime={new Date(2026, 4, 23, 18, 0)}
          helperText="15-minute steps inside business hours."
        />
      </Demo>

      <Demo name="DateRangePicker" description="Pick a date range.">
        <DateRangePicker
          label="Sprint window"
          value={range}
          onChange={setRange}
          minDate={new Date(2026, 4, 1)}
          maxDate={new Date(2026, 5, 30)}
          shortcuts={[
            { label: 'Last 7 days', getValue: (today) => [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6), today] },
            { label: 'Last 30 days', getValue: (today) => [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29), today] },
          ]}
          helperText="Tuple value, two visible calendars, closes after the end date."
        />
      </Demo>

      <Demo name="DateTimePicker" description="Pick date and time together.">
        <DateTimePicker
          label="Deployment window"
          value={dateTime}
          onChange={setDateTime}
          minDateTime={new Date(2026, 4, 20, 9, 0)}
          maxDateTime={new Date(2026, 5, 30, 18, 0)}
          minutesStep={15}
          format="MM/dd/yyyy HH:mm"
          helperText="One Date value with date and time validation."
        />
      </Demo>

      <Demo name="ColorPicker" description="HSV area with hue and alpha sliders." variant="wide">
        <div className="flex justify-center">
          <ColorPicker.Root className="rounded-lg border border-border bg-card p-4">
            <ColorPicker.Area />
            <ColorPicker.HueSlider />
            <ColorPicker.AlphaSlider />
            <ColorPicker.Swatch />
          </ColorPicker.Root>
        </div>
      </Demo>

      <Demo name="FileUpload" description="Drag-and-drop with validation." variant="wide">
        <FileUpload.Root multiple maxFiles={3} className="max-w-md mx-auto">
          <FileUpload.Dropzone /><FileUpload.Input />
        </FileUpload.Root>
      </Demo>
    </>
  );
}

/* ─── Feedback & misc ───────────────────────────────────────────── */

function FeedbackMisc() {
  const [tags, setTags] = useState<string[]>(['react', 'tailwind']);
  return (
    <>
      <Demo name="CircularProgress" description="Determinate + indeterminate circular spinner." variant="inline">
        <CircularProgress value={null} />
        <CircularProgress value={30} />
        <CircularProgress value={75} />
        <CircularProgress value={100} />
      </Demo>

      <Demo name="Meter" description="Quantitative measurement display.">
        <div className="w-full max-w-md space-y-3">
          <Meter value={20} max={100} low={30} high={70} optimum={50} />
          <Meter value={50} max={100} low={30} high={70} optimum={50} />
          <Meter value={85} max={100} low={30} high={70} optimum={50} />
        </div>
      </Demo>

      <Demo name="ScrollArea" description="Custom scrollbar that shows on hover.">
        <ScrollArea.Root className="h-40 w-64 rounded-lg border border-border">
          <div className="p-3 space-y-1">
            {Array.from({ length: 50 }, (_, i) => (<div key={i} className="text-sm py-0.5">Item {i + 1}</div>))}
          </div>
        </ScrollArea.Root>
      </Demo>

      <Demo name="Toolbar" description="Row of related controls with roving focus.">
        <Toolbar.Root>
          <Toolbar.Button><Bell className="h-4 w-4" /></Toolbar.Button>
          <Toolbar.Button><Settings className="h-4 w-4" /></Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Done</Toolbar.Button>
        </Toolbar.Root>
      </Demo>

      <Demo name="Resizable" description="Resizable panels with keyboard handles." variant="wide">
        <Resizable.Group className="h-32 rounded-lg border border-border overflow-hidden">
          <Resizable.Panel id="a" defaultSize={50} className="flex items-center justify-center text-sm bg-muted/30">Panel A</Resizable.Panel>
          <Resizable.Handle between={['a', 'b']} withHandle />
          <Resizable.Panel id="b" defaultSize={50} className="flex items-center justify-center text-sm">Panel B</Resizable.Panel>
        </Resizable.Group>
      </Demo>

      <Demo name="Carousel" description="Image/content slider with arrows and keyboard." variant="wide">
        <Carousel.Root className="max-w-sm mx-auto">
          <Carousel.Content>
            {[1, 2, 3].map((i) => (
              <Carousel.Item key={i}>
                <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent text-3xl font-semibold">{i}</div>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous /><Carousel.Next />
        </Carousel.Root>
      </Demo>

      <Demo name="Tree" description="File-explorer-style tree with expand/collapse.">
        <Tree.Root defaultExpanded={['root']} className="text-sm">
          <Tree.Item id="root" hasChildren>
            <Tree.Trigger hasChildren>📁 src</Tree.Trigger>
            <Tree.Group>
              <Tree.Item id="a"><Tree.Trigger hasChildren={false}>📄 index.ts</Tree.Trigger></Tree.Item>
              <Tree.Item id="b"><Tree.Trigger hasChildren={false}>📄 App.tsx</Tree.Trigger></Tree.Item>
              <Tree.Item id="c" hasChildren>
                <Tree.Trigger hasChildren>📁 components</Tree.Trigger>
                <Tree.Group>
                  <Tree.Item id="d"><Tree.Trigger hasChildren={false}>📄 Button.tsx</Tree.Trigger></Tree.Item>
                </Tree.Group>
              </Tree.Item>
            </Tree.Group>
          </Tree.Item>
        </Tree.Root>
      </Demo>

      <Demo name="Editable" description="Click to edit text inline.">
        <Editable.Root defaultValue="Double-click to edit me">
          <Editable.Preview /><Editable.Input />
        </Editable.Root>
      </Demo>

      <Demo name="TagsInput" description="Chips with delimiter parsing and paste-split.">
        <TagsInput.Root value={tags} onValueChange={setTags} className="w-full max-w-md">
          <TagsInput.Items>{(tag, i) => <TagsInput.Tag key={i} index={i} tag={tag} />}</TagsInput.Items>
          <TagsInput.Input placeholder="Add tags…" />
        </TagsInput.Root>
      </Demo>

      <Demo name="Mentions" description="@-mention textarea with suggestion popover.">
        <Mentions.Root className="w-full max-w-md">
          <Mentions.Textarea placeholder="Try typing @ada or @grace…" rows={3} />
          <Mentions.Suggestions
            items={[
              { id: '1', label: 'ada' },
              { id: '2', label: 'grace' },
              { id: '3', label: 'alan' },
            ]}
          >
            <div className="rounded-lg border border-border bg-popover/95 backdrop-blur-glass p-1 shadow-overlay">
              <Mentions.Items>
                {(item, i) => (
                  <Mentions.Item key={item.id} suggestion={item} index={i}>
                    <div className="cursor-pointer rounded-md px-2 py-1.5 text-sm hover:bg-accent">@{item.label}</div>
                  </Mentions.Item>
                )}
              </Mentions.Items>
            </div>
          </Mentions.Suggestions>
        </Mentions.Root>
      </Demo>

      <Demo name="CopyButton" description="Copy-to-clipboard with success feedback." variant="inline">
        <code className="rounded-md bg-muted px-3 py-2 text-sm font-mono">npm install @aura-ui/styled</code>
        <CopyButton value="npm install @aura-ui/styled" />
      </Demo>
    </>
  );
}

/* ─── DataTable ─────────────────────────────────────────────────── */

function DataTableDemo({ tableRef }: { tableRef: React.MutableRefObject<Table<User> | null> }) {
  return (
    <Demo name="DataTable" description="Full-featured data grid: sort, filter, virtualize, column pin/resize/visibility, row selection, CSV/JSON export." variant="wide">
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
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => tableRef.current && exportToCSV(tableRef.current, 'users.csv')}>
          Export CSV
        </Button>
      </div>
    </Demo>
  );
}


/* ─── Custom Palette Generator (Radix-faithful) ──────────────────── */

const clampN = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [
    parseInt(h.slice(0, 2), 16) || 0,
    parseInt(h.slice(2, 4), 16) || 0,
    parseInt(h.slice(4, 6), 16) || 0,
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => clampN(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const [r0, g0, b0] = hexToRgb(hex).map((v) => v / 255) as [number, number, number];
  const max = Math.max(r0, g0, b0);
  const min = Math.min(r0, g0, b0);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r0) h = ((g0 - b0) / d + (g0 < b0 ? 6 : 0)) / 6;
    else if (max === g0) h = ((b0 - r0) / d + 2) / 6;
    else h = ((r0 - g0) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

// 12-step solid scale → hex strings
function generateScale(hex: string, mode: 'light' | 'dark'): string[] {
  const [h, s, baseL] = hexToHsl(hex);
  if (mode === 'light') {
    const ls = [99, 97.5, 95, 92, 89, 85, 79, 71, baseL, clampN(baseL - 8, 18, 90), 43, 24];
    const ss = [0.35, 0.45, 0.55, 0.65, 0.72, 0.78, 0.84, 0.9, 1, 1, 1.05, 0.85];
    return ls.map((l, i) => hslToHex(h, clampN(s * (ss[i] ?? 1), 4, 100), l));
  }
  const ls = [9, 11.5, 15, 18.5, 22, 27, 33, 42, baseL, clampN(baseL + 8, 30, 88), 75, 92];
  const ss = [0.5, 0.55, 0.6, 0.66, 0.72, 0.78, 0.82, 0.88, 1, 1, 0.7, 0.5];
  return ls.map((l, i) => hslToHex(h, clampN(s * (ss[i] ?? 1), 4, 100), l));
}

// Derive the minimal-alpha color that composites over `bg` to equal `solid`.
// Mirrors Radix's alpha-color algorithm.
function getAlphaColor(solidHex: string, bgHex: string): string {
  const [sr, sg, sb] = hexToRgb(solidHex);
  const [br, bg_, bb] = hexToRgb(bgHex);
  const channels: Array<[number, number]> = [
    [sr, br],
    [sg, bg_],
    [sb, bb],
  ];
  let alpha = 0;
  for (const [s, b] of channels) {
    let a = 0;
    if (s > b) a = (s - b) / (255 - b || 1);
    else if (s < b) a = (b - s) / (b || 1);
    alpha = Math.max(alpha, a);
  }
  alpha = clampN(alpha, 0, 1);
  if (alpha === 0) return '#00000000';
  const fg = channels.map(([s, b]) => clampN((s - b * (1 - alpha)) / alpha, 0, 255));
  const aHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${rgbToHex(fg[0]!, fg[1]!, fg[2]!)}${aHex}`;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrastColor = (hex: string) => (relativeLuminance(hex) > 0.45 ? '#000000' : '#FFFFFF');

interface Palette {
  solid: string[];
  alpha: string[];
  contrast: string;
  surface: string;
  indicator: string;
  track: string;
}

function buildPalette(hex: string, bg: string, mode: 'light' | 'dark'): Palette {
  const solid = generateScale(hex, mode);
  const alpha = solid.map((c) => getAlphaColor(c, bg));
  return {
    solid,
    alpha,
    contrast: contrastColor(solid[8] ?? hex),
    surface: mode === 'light' ? '#FFFFFFCC' : '#0000000D',
    indicator: solid[8] ?? hex,
    track: solid[8] ?? hex,
  };
}

function paletteToCss(name: string, p: Palette): string {
  return [
    ...p.solid.map((c, i) => `  --${name}-${i + 1}: ${c};`),
    '',
    ...p.alpha.map((c, i) => `  --${name}-a${i + 1}: ${c};`),
    '',
    `  --${name}-contrast: ${p.contrast};`,
    `  --${name}-surface: ${p.surface};`,
    `  --${name}-indicator: ${p.indicator};`,
    `  --${name}-track: ${p.track};`,
  ].join('\n');
}

const SCALE_GROUPS = [
  { label: 'Backgrounds', span: 2 },
  { label: 'Interactive components', span: 3 },
  { label: 'Borders and separators', span: 3 },
  { label: 'Solid colors', span: 2 },
  { label: 'Accessible text', span: 2 },
];
const SCALE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function PaletteGenerator() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [accent, setAccent] = useState('#3CDD82');
  const [gray, setGray] = useState('#8B8D98');
  const [background, setBackground] = useState('#FFFFFF');
  const [copied, setCopied] = useState<string | null>(null);

  const norm = (v: string) => {
    const t = v.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    return `#${t}`;
  };
  const safe = (v: string, fb: string) => (/^#[0-9a-fA-F]{6}$/.test(norm(v)) ? norm(v) : fb);

  const accentHex = safe(accent, '#3CDD82');
  const grayHex = safe(gray, '#8B8D98');
  const bgHex = safe(background, mode === 'light' ? '#FFFFFF' : '#111111');

  const accentPalette = buildPalette(accentHex, bgHex, mode);
  const grayPalette = buildPalette(grayHex, bgHex, mode);

  const switchMode = (m: 'light' | 'dark') => {
    setMode(m);
    setBackground(m === 'light' ? '#FFFFFF' : '#111111');
  };

  const selector = mode === 'light' ? ':root, .light, .light-theme' : '.dark, .dark-theme';
  const fullCss = [
    `${selector} {`,
    paletteToCss('accent', accentPalette),
    '',
    paletteToCss('gray', grayPalette),
    '',
    `  --color-background: ${bgHex};`,
    '}',
  ].join('\n');

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) { void e; }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-8">
        <span className="text-xs text-muted-foreground">← aura-ui Colors</span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Create a custom palette</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A full 12-step scale with solid + alpha variants and contrast / surface / indicator / track tokens.
        </p>
      </div>

      {/* Light / Dark toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
          {(['light', 'dark'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all duration-snappy ${
                mode === m ? 'bg-bg text-fg shadow-sm' : 'text-muted-foreground hover:text-fg'
              }`}
            >
              {m === 'light' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs + Copy menu */}
      <div className="flex flex-wrap items-end justify-center gap-3 mb-8">
        {[
          { label: 'Accent', value: accent, set: setAccent, hex: accentHex },
          { label: 'Gray', value: gray, set: setGray, hex: grayHex },
          { label: 'Background', value: background, set: setBackground, hex: bgHex },
        ].map((f) => (
          <div key={f.label} className="grid gap-1.5">
            <Label className="text-xs">{f.label}</Label>
            <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-bg pl-2 pr-3">
              <label className="relative h-5 w-5 shrink-0 cursor-pointer rounded border border-border overflow-hidden">
                <span className="block h-full w-full" style={{ background: f.hex }} />
                <input
                  type="color"
                  value={f.hex}
                  onChange={(e) => f.set(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
              <input
                value={f.value.replace('#', '')}
                onChange={(e) => f.set(`#${e.target.value}`)}
                className="w-20 bg-transparent font-mono text-sm uppercase outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        ))}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button className="gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ?? 'Copy'}
              <ChevronRight className="h-3.5 w-3.5 rotate-90" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" className="w-52">
            <DropdownMenu.Item onClick={() => copyText(fullCss, 'Copied CSS')}>
              Copy CSS code
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={() => copyText(`${selector} {\n${paletteToCss('accent', accentPalette)}\n}`, 'Copied accent')}
            >
              Copy accent scale
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => copyText(`${selector} {\n${paletteToCss('gray', grayPalette)}\n}`, 'Copied gray')}
            >
              Copy gray scale
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => copyText(bgHex, 'Copied bg')}>
              Copy background color
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Scale grids */}
      <div
        className="rounded-xl border p-6 space-y-5"
        style={{ background: bgHex, borderColor: mode === 'light' ? '#0001' : '#fff2' }}
      >
        <div>
          {/* Group headers */}
          <div className="flex">
            {SCALE_GROUPS.map((g) => (
              <div
                key={g.label}
                className="text-center text-[11px] font-medium pb-1"
                style={{ flex: g.span, color: mode === 'light' ? '#00000080' : '#ffffff80' }}
              >
                {g.label}
              </div>
            ))}
          </div>
          {/* Number row */}
          <div className="flex mb-2">
            {SCALE_NUMBERS.map((n) => (
              <div
                key={n}
                className="flex-1 text-center text-[11px] tabular-nums"
                style={{ color: mode === 'light' ? '#00000060' : '#ffffff60' }}
              >
                {n}
              </div>
            ))}
          </div>
          <PaletteRow colors={accentPalette.solid} mode={mode} label="Accent · solid" />
          <div className="h-1.5" />
          <PaletteRow colors={accentPalette.alpha} mode={mode} bg={bgHex} label="Accent · alpha" />
          <div className="h-3" />
          <PaletteRow colors={grayPalette.solid} mode={mode} label="Gray · solid" />
          <div className="h-1.5" />
          <PaletteRow colors={grayPalette.alpha} mode={mode} bg={bgHex} label="Gray · alpha" />
        </div>

        {/* Token swatches */}
        <div className="flex flex-wrap gap-4 pt-2 border-t" style={{ borderColor: mode === 'light' ? '#0001' : '#fff2' }}>
          {[
            { name: 'contrast', value: accentPalette.contrast },
            { name: 'surface', value: accentPalette.surface },
            { name: 'indicator', value: accentPalette.indicator },
            { name: 'track', value: accentPalette.track },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-2">
              <span
                className="h-5 w-5 rounded border"
                style={{ background: t.value, borderColor: mode === 'light' ? '#0002' : '#fff3' }}
              />
              <span className="text-[11px] font-mono" style={{ color: mode === 'light' ? '#000a' : '#fffa' }}>
                accent-{t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generated CSS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold tracking-tight">Generated CSS</h2>
          <Button size="sm" variant="outline" onClick={() => copyText(fullCss, 'Copied CSS')} className="gap-1.5">
            {copied === 'Copied CSS' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied === 'Copied CSS' ? 'Copied!' : 'Copy CSS'}
          </Button>
        </div>
        <pre className="max-h-96 overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-[11px] leading-relaxed font-mono">
          {fullCss}
        </pre>
      </div>
    </div>
  );
}

function PaletteRow({
  colors,
  mode,
  bg,
  label,
}: {
  colors: string[];
  mode: 'light' | 'dark';
  bg?: string;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <div className="text-[10px] mb-1" style={{ color: mode === 'light' ? '#00000055' : '#ffffff55' }}>
          {label}
        </div>
      )}
      <div
        className="flex overflow-hidden rounded-lg"
        style={
          bg
            ? {
                backgroundImage:
                  'repeating-conic-gradient(#0000000c 0% 25%, transparent 0% 50%)',
                backgroundSize: '12px 12px',
              }
            : undefined
        }
      >
        {colors.map((c, i) => (
          <div key={i} className="group/sw relative flex-1">
            <div
              className="h-12 transition-transform duration-snappy group-hover/sw:scale-y-110"
              style={{ background: c }}
            />
            <div className="pointer-events-none absolute -bottom-7 left-1/2 z-10 hidden -translate-x-1/2 group-hover/sw:block">
              <div
                className="w-max rounded px-1.5 py-0.5 text-[9px] font-mono shadow"
                style={{ background: mode === 'light' ? '#111' : '#fff', color: mode === 'light' ? '#fff' : '#111' }}
              >
                {c}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

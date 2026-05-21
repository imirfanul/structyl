'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';
import { Button, Card, Input, Label, Badge, Alert } from '@aura-ui/styled';

interface Tokens {
  bg: string;
  fg: string;
  primary: string;
  primaryFg: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
  destructive: string;
  ring: string;
  radius: string;
}

const DEFAULTS: Tokens = {
  bg: '0 0% 100%',
  fg: '222.2 47.4% 11.2%',
  primary: '222.2 47.4% 11.2%',
  primaryFg: '210 40% 98%',
  secondary: '210 40% 96.1%',
  accent: '210 40% 96.1%',
  muted: '210 40% 96.1%',
  border: '214.3 31.8% 91.4%',
  destructive: '0 84.2% 60.2%',
  ring: '222.2 84% 4.9%',
  radius: '0.5rem',
};

export default function ThemeGeneratorPage() {
  const [tokens, setTokens] = useState<Tokens>(DEFAULTS);
  const cssVars = useMemo(
    () => ({
      '--bg': `hsl(${tokens.bg})`,
      '--fg': `hsl(${tokens.fg})`,
      '--primary': `hsl(${tokens.primary})`,
      '--primary-foreground': `hsl(${tokens.primaryFg})`,
      '--secondary': `hsl(${tokens.secondary})`,
      '--secondary-foreground': `hsl(${tokens.fg})`,
      '--accent': `hsl(${tokens.accent})`,
      '--accent-foreground': `hsl(${tokens.fg})`,
      '--muted': `hsl(${tokens.muted})`,
      '--muted-foreground': `hsl(${tokens.fg})`,
      '--border': `hsl(${tokens.border})`,
      '--input': `hsl(${tokens.border})`,
      '--destructive': `hsl(${tokens.destructive})`,
      '--destructive-foreground': `hsl(${tokens.primaryFg})`,
      '--ring': `hsl(${tokens.ring})`,
      '--popover': `hsl(${tokens.bg})`,
      '--popover-foreground': `hsl(${tokens.fg})`,
      '--card': `hsl(${tokens.bg})`,
      '--card-foreground': `hsl(${tokens.fg})`,
      '--radius': tokens.radius,
    }) as React.CSSProperties,
    [tokens],
  );

  const cssOutput = useMemo(
    () =>
      `:root {\n${Object.entries(cssVars)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n')}\n}`,
    [cssVars],
  );

  const update = (key: keyof Tokens, value: string) =>
    setTokens((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-3">
          <header>
            <h1 className="text-2xl font-semibold">Theme generator</h1>
            <p className="text-sm text-muted-foreground">
              Live-edit theme tokens. Copy the generated CSS into your globals stylesheet.
            </p>
          </header>
          <div className="space-y-2">
            {([
              ['bg', 'Background', tokens.bg],
              ['fg', 'Foreground', tokens.fg],
              ['primary', 'Primary', tokens.primary],
              ['primaryFg', 'Primary Foreground', tokens.primaryFg],
              ['secondary', 'Secondary', tokens.secondary],
              ['accent', 'Accent', tokens.accent],
              ['muted', 'Muted', tokens.muted],
              ['border', 'Border', tokens.border],
              ['destructive', 'Destructive', tokens.destructive],
              ['ring', 'Ring', tokens.ring],
              ['radius', 'Radius', tokens.radius],
            ] as const).map(([key, label, value]) => (
              <div key={key} className="grid gap-1">
                <Label htmlFor={key} className="text-xs uppercase tracking-wide">
                  {label}
                </Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={key === 'radius' ? '0.5rem' : 'H S% L%'}
                />
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={() => setTokens(DEFAULTS)}>
            Reset to default
          </Button>
        </aside>

        <section style={cssVars} className="space-y-6 rounded-lg border border-border bg-bg p-6 text-fg">
          <h2 className="text-lg font-semibold">Preview</h2>

          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Card.Root>
              <Card.Header>
                <Card.Title>Card title</Card.Title>
                <Card.Description>Card description text.</Card.Description>
              </Card.Header>
              <Card.Content>
                <Input placeholder="Type here…" />
              </Card.Content>
            </Card.Root>
            <div className="space-y-2">
              <Alert.Root>
                <Alert.Title>Heads up</Alert.Title>
                <Alert.Description>Tokens you set above flow through every component.</Alert.Description>
              </Alert.Root>
              <div className="flex gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
          </div>

          <details className="rounded-md border border-border bg-muted/30 p-3 text-sm">
            <summary className="cursor-pointer font-medium">CSS output</summary>
            <pre className="mt-2 overflow-auto text-xs">{cssOutput}</pre>
          </details>
        </section>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Moon, Sun } from '@your-lib/icons';
import {
  Button,
  Checkbox,
  Dialog,
  Label,
  Separator,
  Switch,
  Toggle,
} from '@your-lib/styled';
import { useTheme } from '@your-lib/themes';
import { DataTable, type DataTableColumn } from '@your-lib/data-table';

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

export default function App() {
  const { theme, setTheme, resolvedMode, setMode, themes } = useTheme();
  const [switchOn, setSwitchOn] = useState(false);
  const [togglePressed, setTogglePressed] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">your-lib playground</h1>
            <p className="text-sm text-muted-foreground">
              Live demo of components and the theme system.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="h-9 rounded-md border border-input bg-bg px-3 text-sm"
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
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

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </Section>

        {/* Form controls */}
        <Section title="Form controls">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Switch
                checked={switchOn}
                onCheckedChange={setSwitchOn}
                id="notifications"
              />
              <Label htmlFor="notifications">Email notifications</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept the terms</Label>
            </div>
            <div>
              <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
                Bold
              </Toggle>
            </div>
          </div>
        </Section>

        <Separator />

        {/* Dialog */}
        <Section title="Dialog">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>Open dialog</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Confirm action</Dialog.Title>
                  <Dialog.Description>
                    This is a fully accessible dialog. Press Escape to close, or click outside.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button>Confirm</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Section>

        <Separator />

        {/* DataTable */}
        <Section title="DataTable">
          <DataTable columns={columns} data={sampleData} enableSorting enablePagination pageSize={3} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

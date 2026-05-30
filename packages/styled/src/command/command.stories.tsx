import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Command from './index';
import { Button } from '../button';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Components/Command',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[480px] rounded-lg border border-border shadow-md">
      <Command.Root>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>
              <span>📅</span>
              Calendar
              <Command.Shortcut>⌘C</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>😊</span>
              Search Emoji
              <Command.Shortcut>⌘E</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>🧮</span>
              Calculator
              <Command.Shortcut>⌘K</Command.Shortcut>
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item>
              <span>👤</span>
              Profile
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>💳</span>
              Billing
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>⚙️</span>
              Settings
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    </div>
  ),
};

export const CommandPalette: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      };

      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <div className="flex flex-col items-center gap-4">
        <Typography variant="muted">
          Press{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span>⌘</span>K
          </kbd>{' '}
          to open the command palette
        </Typography>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-muted-foreground shadow-sm"
        >
          <span>🔍</span>
          Search commands...
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
            ⌘K
          </kbd>
        </Button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-50 w-[480px] rounded-lg border border-border bg-popover shadow-lg">
              <Command.Root>
                <Command.Input placeholder="Type a command or search..." />
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>
                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>🏠</span> Go to Home
                    </Command.Item>
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>📊</span> Go to Dashboard
                    </Command.Item>
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>📁</span> Go to Projects
                    </Command.Item>
                  </Command.Group>
                  <Command.Separator />
                  <Command.Group heading="Actions">
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>➕</span> New Project
                      <Command.Shortcut>⌘N</Command.Shortcut>
                    </Command.Item>
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>📤</span> Export Data
                    </Command.Item>
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>🔗</span> Copy Link
                      <Command.Shortcut>⌘L</Command.Shortcut>
                    </Command.Item>
                  </Command.Group>
                  <Command.Separator />
                  <Command.Group heading="Account">
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>⚙️</span> Settings
                      <Command.Shortcut>⌘,</Command.Shortcut>
                    </Command.Item>
                    <Command.Item onSelect={() => setOpen(false)}>
                      <span>🚪</span> Log out
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command.Root>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState<string[]>([]);

    const allResults = [
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Elderberry',
      'Fig',
      'Grape',
      'Honeydew',
    ];

    React.useEffect(() => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const timeout = setTimeout(() => {
        setResults(allResults.filter((r) => r.toLowerCase().includes(query.toLowerCase())));
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }, [query]);

    return (
      <div className="w-[400px] rounded-lg border border-border shadow-md">
        <Command.Root>
          <Command.Input
            placeholder="Search fruits..."
            value={query}
            onValueChange={setQuery}
          />
          <Command.List>
            {loading ? (
              <Command.Loading>
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              </Command.Loading>
            ) : (
              <>
                <Command.Empty>No fruit found.</Command.Empty>
                {results.length > 0 && (
                  <Command.Group heading="Results">
                    {results.map((result) => (
                      <Command.Item key={result} value={result}>
                        🍎 {result}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </>
            )}
          </Command.List>
        </Command.Root>
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => (
    <div className="w-[320px] rounded-lg border border-border shadow-md">
      <Command.Root>
        <Command.Input placeholder="Filter..." />
        <Command.List>
          <Command.Empty>Nothing found.</Command.Empty>
          <Command.Item>
            <span>🎨</span> Design System
          </Command.Item>
          <Command.Item>
            <span>📦</span> Components
          </Command.Item>
          <Command.Item>
            <span>🪝</span> Hooks
          </Command.Item>
          <Command.Item>
            <span>🔧</span> Utilities
          </Command.Item>
          <Command.Item disabled>
            <span>🔒</span> Admin Panel
          </Command.Item>
        </Command.List>
      </Command.Root>
    </div>
  ),
};

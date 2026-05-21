import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider, ThemeScript } from '@aura-ui/themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'aura-ui — A React Component Library',
  description:
    'Accessible headless primitives, Tailwind-styled components, runtime theming, and a first-class DataTable.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="slate" defaultMode="system" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider defaultTheme="slate" defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

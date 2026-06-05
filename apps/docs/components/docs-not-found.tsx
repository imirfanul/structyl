import Link from 'next/link';
import { Box, Button, Typography } from '@structyl/styled';
import { Ghost, Home, Compass } from '@structyl/icons';

/* Shared in-docs 404 body — used both by the /docs not-found boundary and
   rendered inline by the dynamic [slug] / api/[slug] pages when a slug has no
   matching component (those pages are client components, where Next's
   notFound() boundary is unreliable). Keeps the docs sidebar/chrome around it. */

export function DocsNotFound({
  title = 'This page wandered off.',
  message = "That component or API reference doesn't exist — it may have been renamed, or never shipped. Try the catalogue.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Box className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <Ghost
        className="animate-float h-16 w-16 text-[#6E8BFF] drop-shadow-[0_8px_24px_rgba(110,139,255,0.3)]"
        strokeWidth={1.25}
      />
      <span className="mt-6 animate-shimmer bg-gradient-to-r from-[#4DF6C9] via-[#6E8BFF] to-[#A973FF] bg-clip-text text-5xl font-bold tracking-tight text-transparent">
        404
      </span>
      <Typography as="h1" variant="h1" className="mt-4 text-xl font-semibold tracking-tight">
        {title}
      </Typography>
      <Typography
        as="p"
        variant="body2"
        className="mt-2 max-w-md text-balance text-sm text-muted-foreground"
      >
        {message}
      </Typography>
      <Box className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/docs">
            <Compass className="h-4 w-4" /> Browse components
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="h-4 w-4" /> Home
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

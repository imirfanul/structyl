import { DocsNotFound } from '../../components/docs-not-found';

/* not-found boundary for /docs/* — rendered for any notFound() that does reach
   it. The dynamic [slug] pages also render <DocsNotFound /> inline as a
   fallback, since notFound() from a client component is unreliable. */

export default function NotFound() {
  return <DocsNotFound />;
}

/**
 * Immutable dot/bracket path access for nested form values, e.g. `address.city`
 * or `items[0].name`. Setting clones only along the touched path.
 */

/** Parse a path string into segments: `a.b[0].c` → ['a','b','0','c']. */
export function parsePath(path: string): string[] {
  return path
    .replace(/\[(\w+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}

/** Read a value at a path. Returns undefined if any segment is missing. */
export function getPath(obj: unknown, path: string): unknown {
  const segments = parsePath(path);
  let current: unknown = obj;
  for (const segment of segments) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/** Return a shallow clone of `obj` with `path` set to `value` (immutably). */
export function setPath<T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T {
  const segments = parsePath(path);
  if (segments.length === 0) return obj;

  const root: Record<string, unknown> = Array.isArray(obj)
    ? ([...obj] as unknown as Record<string, unknown>)
    : { ...obj };
  let current = root;

  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i]!;
    const next = current[key];
    const nextIsArray = /^\d+$/.test(segments[i + 1]!);
    if (Array.isArray(next)) {
      current[key] = [...next];
    } else if (next && typeof next === 'object') {
      current[key] = { ...(next as Record<string, unknown>) };
    } else {
      current[key] = nextIsArray ? [] : {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[segments[segments.length - 1]!] = value;
  return root as T;
}

/** Immutably delete a path. */
export function deletePath<T extends Record<string, unknown>>(obj: T, path: string): T {
  const segments = parsePath(path);
  if (segments.length === 0) return obj;
  const root: Record<string, unknown> = { ...obj };
  let current = root;
  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i]!;
    const next = current[key];
    if (!next || typeof next !== 'object') return obj;
    current[key] = Array.isArray(next) ? [...next] : { ...(next as Record<string, unknown>) };
    current = current[key] as Record<string, unknown>;
  }
  delete current[segments[segments.length - 1]!];
  return root as T;
}

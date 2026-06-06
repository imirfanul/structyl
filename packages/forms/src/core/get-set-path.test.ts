import { describe, it, expect } from 'vitest';
import { getPath, setPath, deletePath, parsePath } from './get-set-path';

describe('parsePath', () => {
  it('parses dot and bracket notation', () => {
    expect(parsePath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(parsePath('items[0].name')).toEqual(['items', '0', 'name']);
  });
});

describe('getPath', () => {
  const obj = { user: { name: 'Ada', tags: ['a', 'b'] } };
  it('reads nested values', () => {
    expect(getPath(obj, 'user.name')).toBe('Ada');
    expect(getPath(obj, 'user.tags[1]')).toBe('b');
  });
  it('returns undefined for missing paths', () => {
    expect(getPath(obj, 'user.missing.deep')).toBeUndefined();
  });
});

describe('setPath', () => {
  it('sets a nested value immutably', () => {
    const obj = { user: { name: 'Ada' } };
    const next = setPath(obj, 'user.name', 'Grace');
    expect(next.user.name).toBe('Grace');
    expect(obj.user.name).toBe('Ada'); // original untouched
    expect(next).not.toBe(obj);
    expect(next.user).not.toBe(obj.user);
  });

  it('creates intermediate objects and arrays', () => {
    const next = setPath({} as Record<string, unknown>, 'a.b[0]', 'x');
    expect(getPath(next, 'a.b[0]')).toBe('x');
    expect(Array.isArray((next as { a: { b: unknown } }).a.b)).toBe(true);
  });

  it('preserves untouched siblings by reference', () => {
    const obj = { a: { x: 1 }, b: { y: 2 } };
    const next = setPath(obj, 'a.x', 9);
    expect(next.b).toBe(obj.b);
  });
});

describe('deletePath', () => {
  it('removes a nested key immutably', () => {
    const obj = { a: { x: 1, y: 2 } };
    const next = deletePath(obj, 'a.x');
    expect('x' in next.a).toBe(false);
    expect(obj.a.x).toBe(1);
  });
});

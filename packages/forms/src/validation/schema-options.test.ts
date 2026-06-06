import { describe, it, expect } from 'vitest';
import { v } from './builders';
import { createCoercer } from './resolve';

describe('nullable / optional', () => {
  it('optional skips rules on empty/undefined but not null... unless nullable', async () => {
    const opt = v.string().email().optional();
    expect((await opt.validate('')).valid).toBe(true);
    expect((await opt.validate(undefined)).valid).toBe(true);
    // optional treats '' / undefined as empty; a real value still validates
    expect((await opt.validate('bad')).valid).toBe(false);
  });

  it('nullable allows null specifically', async () => {
    const nul = v.string().email().nullable();
    expect((await nul.validate(null)).valid).toBe(true);
    // but not an invalid non-null value
    expect((await nul.validate('bad')).valid).toBe(false);
  });

  it('required still rejects empty even with other config', async () => {
    expect((await v.string().required().validate('')).valid).toBe(false);
  });
});

describe('default()', () => {
  it('coerceValue fills the default when empty', () => {
    const withDefault = v.string().default('guest');
    expect(withDefault.coerceValue('')).toBe('guest');
    expect(withDefault.coerceValue(undefined)).toBe('guest');
    expect(withDefault.coerceValue('ada')).toBe('ada');
  });

  it('supports a factory default', () => {
    const n = v.number().default(() => 42);
    expect(n.coerceValue(undefined)).toBe(42);
  });

  it('validates against the default value', async () => {
    // empty → default 5 → passes min(3)
    const n = v.number().min(3).default(5);
    expect((await n.validate(undefined)).valid).toBe(true);
  });
});

describe('coerce()', () => {
  it('number coerces string input', async () => {
    const n = v.number().coerce().int().min(1);
    expect(n.coerceValue('42')).toBe(42);
    expect((await n.validate('42')).valid).toBe(true);
    expect((await n.validate('0')).valid).toBe(false);
  });

  it('boolean coerces truthy strings', () => {
    const b = v.boolean().coerce();
    expect(b.coerceValue('true')).toBe(true);
    expect(b.coerceValue('on')).toBe(true);
    expect(b.coerceValue('')).toBe('');
    expect(b.coerceValue('false')).toBe(false);
  });
});

describe('transform()', () => {
  it('applies a transform to the value', async () => {
    const s = v.string().trim().minLength(3);
    expect(s.coerceValue('  hi  ')).toBe('hi');
    // "  ab  " → "ab" → fails minLength(3)
    expect((await s.validate('  ab  ')).valid).toBe(false);
  });

  it('toLowerCase / toUpperCase transforms', () => {
    expect(v.string().toLowerCase().coerceValue('ABC')).toBe('abc');
    expect(v.string().toUpperCase().coerceValue('abc')).toBe('ABC');
  });
});

describe('numeric helpers', () => {
  it('nonnegative / nonpositive', async () => {
    expect((await v.number().nonnegative().validate(0)).valid).toBe(true);
    expect((await v.number().nonnegative().validate(-1)).valid).toBe(false);
    expect((await v.number().nonpositive().validate(0)).valid).toBe(true);
    expect((await v.number().nonpositive().validate(1)).valid).toBe(false);
  });

  it('between (inclusive)', async () => {
    const r = v.number().between(1, 10);
    expect((await r.validate(1)).valid).toBe(true);
    expect((await r.validate(10)).valid).toBe(true);
    expect((await r.validate(11)).valid).toBe(false);
  });

  it('safe / step', async () => {
    expect((await v.number().safe().validate(2 ** 53)).valid).toBe(false);
    expect((await v.number().step(5).validate(15)).valid).toBe(true);
    expect((await v.number().step(5).validate(16)).valid).toBe(false);
  });
});

describe('string helpers', () => {
  it('nonempty / length', async () => {
    expect((await v.string().nonempty().validate('   ')).valid).toBe(false);
    expect((await v.string().length(3).validate('abc')).valid).toBe(true);
    expect((await v.string().length(3).validate('ab')).valid).toBe(false);
  });

  it('startsWith / endsWith / includes', async () => {
    expect((await v.string().startsWith('a').validate('abc')).valid).toBe(true);
    expect((await v.string().endsWith('c').validate('abc')).valid).toBe(true);
    expect((await v.string().includes('b').validate('abc')).valid).toBe(true);
    expect((await v.string().startsWith('z').validate('abc')).valid).toBe(false);
  });

  it('uuid / numeric', async () => {
    expect((await v.string().uuid().validate('123e4567-e89b-12d3-a456-426614174000')).valid).toBe(true);
    expect((await v.string().uuid().validate('nope')).valid).toBe(false);
    expect((await v.string().numeric().validate('-3.14')).valid).toBe(true);
    expect((await v.string().numeric().validate('12a')).valid).toBe(false);
  });
});

describe('createCoercer (schema-level)', () => {
  it('returns null when no field needs coercion', () => {
    const c = createCoercer({ email: v.string().email() });
    expect(c).toBeNull();
  });

  it('applies defaults and transforms across a schema', () => {
    const c = createCoercer<{ role: string; age: number; name: string }>({
      role: v.string().default('user'),
      age: v.number().coerce(),
      name: v.string().trim(),
    });
    expect(c).not.toBeNull();
    const out = c!({ role: '', age: '30' as unknown as number, name: '  Ada  ' });
    expect(out).toEqual({ role: 'user', age: 30, name: 'Ada' });
  });
});

import { describe, it, expect } from 'vitest';
import { v } from './builders';
import { resolveSchema } from './resolve';

describe('v.string', () => {
  it('required rejects empty, accepts non-empty', async () => {
    const s = v.string().required();
    expect((await s.validate('')).valid).toBe(false);
    expect((await s.validate('hi')).valid).toBe(true);
  });

  it('email validates format', async () => {
    const s = v.string().email();
    expect((await s.validate('a@b.com')).valid).toBe(true);
    const bad = await s.validate('not-an-email');
    expect(bad.valid).toBe(false);
    if (!bad.valid) expect(bad.message).toMatch(/email/i);
  });

  it('min/max length boundaries', async () => {
    const s = v.string().minLength(2).maxLength(4);
    expect((await s.validate('a')).valid).toBe(false);
    expect((await s.validate('ab')).valid).toBe(true);
    expect((await s.validate('abcd')).valid).toBe(true);
    expect((await s.validate('abcde')).valid).toBe(false);
  });

  it('pattern and oneOf', async () => {
    expect((await v.string().pattern(/^\d+$/).validate('123')).valid).toBe(true);
    expect((await v.string().pattern(/^\d+$/).validate('12a')).valid).toBe(false);
    expect((await v.string().oneOf(['a', 'b']).validate('b')).valid).toBe(true);
    expect((await v.string().oneOf(['a', 'b']).validate('c')).valid).toBe(false);
  });

  it('url', async () => {
    expect((await v.string().url().validate('https://x.com')).valid).toBe(true);
    expect((await v.string().url().validate('nope')).valid).toBe(false);
  });

  it('optional short-circuits on empty', async () => {
    const s = v.string().email().optional();
    expect((await s.validate('')).valid).toBe(true);
    expect((await s.validate('bad')).valid).toBe(false);
  });

  it('validateSync works without async rules', () => {
    expect(v.string().required().validateSync('hi').valid).toBe(true);
    expect(v.string().required().validateSync('').valid).toBe(false);
  });
});

describe('v.number', () => {
  it('int/min/max/positive/multipleOf', async () => {
    expect((await v.number().int().validate(3)).valid).toBe(true);
    expect((await v.number().int().validate(3.5)).valid).toBe(false);
    expect((await v.number().min(0).max(10).validate(5)).valid).toBe(true);
    expect((await v.number().min(0).max(10).validate(11)).valid).toBe(false);
    expect((await v.number().positive().validate(-1)).valid).toBe(false);
    expect((await v.number().multipleOf(5).validate(15)).valid).toBe(true);
    expect((await v.number().multipleOf(5).validate(16)).valid).toBe(false);
  });
});

describe('v.boolean', () => {
  it('isTrue', async () => {
    expect((await v.boolean().isTrue().validate(true)).valid).toBe(true);
    expect((await v.boolean().isTrue().validate(false)).valid).toBe(false);
  });
});

describe('v.date', () => {
  it('after/before', async () => {
    const ref = new Date('2026-01-01');
    expect((await v.date().after(ref).validate(new Date('2026-02-01'))).valid).toBe(true);
    expect((await v.date().after(ref).validate(new Date('2025-12-01'))).valid).toBe(false);
    expect((await v.date().before(ref).validate(new Date('2025-12-01'))).valid).toBe(true);
  });
});

describe('v.array', () => {
  it('nonempty/min/max and eachItem', async () => {
    expect((await v.array().nonempty().validate([])).valid).toBe(false);
    expect((await v.array().min(2).validate([1, 2])).valid).toBe(true);
    const items = v.array(v.number().positive()).eachItem();
    expect((await items.validate([1, 2, 3])).valid).toBe(true);
    const bad = await items.validate([1, -2, 3]);
    expect(bad.valid).toBe(false);
    if (!bad.valid) expect(bad.message).toMatch(/Item 2/);
  });
});

describe('v.object', () => {
  it('validates a nested shape', async () => {
    const addr = v.object({ zip: v.string().required().minLength(5) }).shapeValid();
    expect((await addr.validate({ zip: '12345' })).valid).toBe(true);
    expect((await addr.validate({ zip: '12' })).valid).toBe(false);
  });
});

describe('v.custom', () => {
  it('supports plain-function rules and async', async () => {
    const even = v.custom((val) => (Number(val) % 2 === 0 ? true : 'Must be even'));
    expect((await even.validate(4)).valid).toBe(true);
    const odd = await even.validate(3);
    expect(odd.valid).toBe(false);
    if (!odd.valid) expect(odd.message).toBe('Must be even');

    const asyncRule = v.custom(async (val) => Promise.resolve(val === 'ok'));
    expect((await asyncRule.validate('ok')).valid).toBe(true);
    expect((await asyncRule.validate('no')).valid).toBe(false);
  });

  it('cross-field validation via ctx.values', async () => {
    const confirm = v.custom((val, ctx) =>
      val === ctx.values.password ? true : 'Passwords must match',
    );
    const ok = await confirm.validate('secret', { values: { password: 'secret' } });
    expect(ok.valid).toBe(true);
    const bad = await confirm.validate('nope', { values: { password: 'secret' } });
    expect(bad.valid).toBe(false);
  });
});

describe('resolveSchema', () => {
  it('resolves a validator-map schema into an errors object', async () => {
    const resolve = resolveSchema<{ email: string; age: number }>({
      email: v.string().required().email(),
      age: v.number().int().min(18),
    });
    const errors = await resolve({ email: 'bad', age: 12 });
    expect(errors.email).toBeDefined();
    expect(errors.age).toBeDefined();

    const clean = await resolve({ email: 'a@b.com', age: 21 });
    expect(Object.keys(clean)).toHaveLength(0);
  });

  it('resolves a function schema', async () => {
    const resolve = resolveSchema<{ name: string }>((vals) =>
      vals.name ? {} : { name: 'Required' },
    );
    expect((await resolve({ name: '' })).name).toBe('Required');
    expect(Object.keys(await resolve({ name: 'x' }))).toHaveLength(0);
  });
});

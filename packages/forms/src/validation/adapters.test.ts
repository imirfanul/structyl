import { describe, it, expect } from 'vitest';
import { zodResolver, yupResolver, standardSchemaResolver } from './adapters';

describe('zodResolver', () => {
  // Minimal fake Zod-like schema
  const fakeZod = {
    safeParse(data: { email?: string }) {
      if (data.email && data.email.includes('@')) {
        return { success: true as const, data };
      }
      return {
        success: false as const,
        error: { issues: [{ path: ['email'], message: 'Invalid email' }] },
      };
    },
  };

  it('returns empty errors on success', () => {
    const resolve = zodResolver(fakeZod);
    expect(resolve({ email: 'a@b.com' })).toEqual({});
  });

  it('maps issues to field errors', () => {
    const resolve = zodResolver(fakeZod);
    expect(resolve({ email: 'bad' })).toEqual({ email: 'Invalid email' });
  });
});

describe('yupResolver', () => {
  const fakeYup = {
    validateSync(data: { name?: string }) {
      if (!data.name) {
        throw { inner: [{ path: 'name', message: 'Required' }] };
      }
      return data;
    },
  };

  it('returns empty errors on success', () => {
    expect(yupResolver(fakeYup)({ name: 'Ada' })).toEqual({});
  });

  it('maps thrown inner errors to fields', () => {
    expect(yupResolver(fakeYup)({ name: '' })).toEqual({ name: 'Required' });
  });
});

describe('standardSchemaResolver', () => {
  const fakeStandard = {
    '~standard': {
      validate(value: unknown) {
        const v = value as { age?: number };
        if ((v.age ?? 0) >= 18) return { value };
        return { issues: [{ message: 'Too young', path: ['age'] }] };
      },
    },
  };

  it('returns empty errors on success', async () => {
    expect(await standardSchemaResolver(fakeStandard)({ age: 21 })).toEqual({});
  });

  it('maps issues to fields', async () => {
    expect(await standardSchemaResolver(fakeStandard)({ age: 10 })).toEqual({ age: 'Too young' });
  });
});

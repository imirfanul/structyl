import { describe, it, expect } from 'vitest';
import { v } from './builders';

const ok = async (validator: ReturnType<typeof v.string>, value: string) =>
  (await validator.validate(value)).valid;

describe('email() — default (back-compat)', () => {
  const email = v.string().email();

  it('accepts normal addresses', async () => {
    expect(await ok(email, 'ada@example.com')).toBe(true);
    expect(await ok(email, 'ada+tag@mail.co.uk')).toBe(true);
  });

  it('rejects malformed addresses', async () => {
    expect(await ok(email, 'ada@@x.com')).toBe(false);
    expect(await ok(email, 'ada @x.com')).toBe(false);
    expect(await ok(email, 'ada@localhost')).toBe(false); // no TLD
    expect(await ok(email, 'plainstring')).toBe(false);
  });

  it('still supports a custom message string (back-compat)', async () => {
    const res = await v.string().email('Bad email').validate('nope');
    expect(res.valid).toBe(false);
    if (!res.valid) expect(res.message).toBe('Bad email');
  });
});

describe('email({ requireTld: false })', () => {
  const email = v.string().email({ requireTld: false });
  it('accepts addresses without a TLD', async () => {
    expect(await ok(email, 'ada@localhost')).toBe(true);
    expect(await ok(email, 'ada@example.com')).toBe(true);
  });
  it('still rejects @@ and spaces', async () => {
    expect(await ok(email, 'ada @x')).toBe(false);
  });
});

describe('email({ allowDisplayName: true })', () => {
  const email = v.string().email({ allowDisplayName: true });
  it('accepts "Name <email>" form', async () => {
    expect(await ok(email, 'Ada Lovelace <ada@example.com>')).toBe(true);
    expect(await ok(email, '<ada@example.com>')).toBe(true);
  });
  it('still accepts a bare address', async () => {
    expect(await ok(email, 'ada@example.com')).toBe(true);
  });
  it('rejects a malformed inner address', async () => {
    expect(await ok(email, 'Ada <not-an-email>')).toBe(false);
  });
});

describe('email({ blocklist })', () => {
  const email = v.string().email({ blocklist: ['mailinator.com', 'TEMPMAIL.com'] });
  it('rejects blocked domains (case-insensitive)', async () => {
    expect(await ok(email, 'x@mailinator.com')).toBe(false);
    expect(await ok(email, 'x@tempmail.com')).toBe(false);
  });
  it('accepts non-blocked domains', async () => {
    expect(await ok(email, 'x@example.com')).toBe(true);
  });
});

describe('email({ allowlist })', () => {
  const email = v.string().email({ allowlist: ['example.com'] });
  it('accepts only allowlisted domains', async () => {
    expect(await ok(email, 'x@example.com')).toBe(true);
    expect(await ok(email, 'x@other.com')).toBe(false);
  });
});

describe('email({ pattern })', () => {
  it('uses a custom regex', async () => {
    const email = v.string().email({ pattern: /^[a-z]+@company\.com$/ });
    expect(await ok(email, 'ada@company.com')).toBe(true);
    expect(await ok(email, 'ada@example.com')).toBe(false);
  });
});

describe('email() composes with other rules', () => {
  it('works with required + custom message together', async () => {
    const email = v.string().required().email({ message: 'Invalid', blocklist: ['x.com'] });
    expect(await ok(email, 'a@b.com')).toBe(true);
    expect(await ok(email, 'a@x.com')).toBe(false);
    expect((await email.validate('')).valid).toBe(false); // required
  });
});

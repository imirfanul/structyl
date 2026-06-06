import { BaseValidator, fail, ok, type ValidatorConfig } from './validator';
import { defaultMessages } from './messages';

// Pragmatic, RFC-lite email pattern — good enough for UI validation.
// local@domain.tld — no spaces, exactly one @, a dot in the domain.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Looser variant for `requireTld: false` — local@domain (TLD optional, e.g. ada@localhost).
const EMAIL_NO_TLD_RE = /^[^\s@]+@[^\s@]+$/;
// "Display Name <email>" form.
const DISPLAY_NAME_RE = /^\s*[^<>]*<([^<>@\s]+@[^<>@\s]+)>\s*$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const NUMERIC_RE = /^-?\d+(\.\d+)?$/;

const str = (value: unknown): string => String(value ?? '');

/** Options for `v.string().email(...)`. */
export interface EmailOptions {
  /** Custom error message. */
  message?: string;
  /** Use your own regex instead of the built-in one. */
  pattern?: RegExp;
  /** Accept `"Name <email>"` display-name form. Default false. */
  allowDisplayName?: boolean;
  /** Require a top-level domain (a dot in the domain). Default true. Set false to allow `ada@localhost`. */
  requireTld?: boolean;
  /** Reject these domains (case-insensitive), e.g. disposable providers. */
  blocklist?: readonly string[];
  /** If set, only accept these domains (case-insensitive). */
  allowlist?: readonly string[];
}

function domainOf(email: string): string {
  return email.slice(email.lastIndexOf('@') + 1).toLowerCase();
}

export class StringValidator extends BaseValidator<string> {
  /** Require a non-empty string (presence). */
  required(message: string = defaultMessages.required): StringValidator {
    return this.addRule((value) =>
      value === undefined || value === null || value === '' ? fail(message) : ok,
    );
  }

  /** Coerce non-string input to a string before validating. */
  coerce(): StringValidator {
    return this.clone(this.rules, { ...this.config, coerceTo: 'string' } as ValidatorConfig) as StringValidator;
  }

  /** Trim surrounding whitespace before validating/storing (transform). */
  trim(): StringValidator {
    return this.transform((value) => str(value).trim()) as StringValidator;
  }

  /** Lowercase the value (transform). */
  toLowerCase(): StringValidator {
    return this.transform((value) => str(value).toLowerCase()) as StringValidator;
  }

  /** Uppercase the value (transform). */
  toUpperCase(): StringValidator {
    return this.transform((value) => str(value).toUpperCase()) as StringValidator;
  }

  minLength(n: number, message: string = defaultMessages.minLength(n)): StringValidator {
    return this.addRule((value) => (str(value).length >= n ? ok : fail(message)));
  }

  maxLength(n: number, message: string = defaultMessages.maxLength(n)): StringValidator {
    return this.addRule((value) => (str(value).length <= n ? ok : fail(message)));
  }

  /** Exact length. */
  length(n: number, message: string = `Must be exactly ${n} character${n === 1 ? '' : 's'}`): StringValidator {
    return this.addRule((value) => (str(value).length === n ? ok : fail(message)));
  }

  /** Require a non-empty string after trimming. */
  nonempty(message: string = defaultMessages.nonempty): StringValidator {
    return this.addRule((value) => (str(value).trim().length > 0 ? ok : fail(message)));
  }

  /** Alias for minLength. */
  min(n: number, message?: string): StringValidator {
    return this.minLength(n, message);
  }

  /** Alias for maxLength. */
  max(n: number, message?: string): StringValidator {
    return this.maxLength(n, message);
  }

  /**
   * Validate an email address.
   *
   * @example
   * v.string().email();                                   // default RFC-lite check
   * v.string().email('Enter a valid email');              // custom message
   * v.string().email({ requireTld: false });              // allow ada@localhost
   * v.string().email({ allowDisplayName: true });         // "Ada <ada@x.com>"
   * v.string().email({ blocklist: ['mailinator.com'] });  // reject disposable domains
   * v.string().email({ pattern: /your-regex/ });          // bring your own
   */
  email(options?: string | EmailOptions): StringValidator {
    const opts: EmailOptions = typeof options === 'string' ? { message: options } : (options ?? {});
    const {
      message = defaultMessages.email,
      pattern,
      allowDisplayName = false,
      requireTld = true,
      blocklist,
      allowlist,
    } = opts;

    return this.addRule((value) => {
      let candidate = str(value).trim();

      // Extract the address from "Name <email>" if display names are allowed.
      if (allowDisplayName) {
        const m = candidate.match(DISPLAY_NAME_RE);
        if (m) candidate = m[1]!;
      }

      const re = pattern ?? (requireTld ? EMAIL_RE : EMAIL_NO_TLD_RE);
      if (!re.test(candidate)) return fail(message);

      const domain = domainOf(candidate);
      if (blocklist && blocklist.some((d) => d.toLowerCase() === domain)) return fail(message);
      if (allowlist && !allowlist.some((d) => d.toLowerCase() === domain)) return fail(message);

      return ok;
    });
  }

  url(message: string = defaultMessages.url): StringValidator {
    return this.addRule((value) => {
      try {
        new URL(str(value));
        return ok;
      } catch {
        return fail(message);
      }
    });
  }

  /** A v1–v5 UUID. */
  uuid(message: string = 'Must be a valid UUID'): StringValidator {
    return this.addRule((value) => (UUID_RE.test(str(value)) ? ok : fail(message)));
  }

  /** A numeric string (e.g. "42", "-3.14"). */
  numeric(message: string = 'Must be a number'): StringValidator {
    return this.addRule((value) => (NUMERIC_RE.test(str(value)) ? ok : fail(message)));
  }

  startsWith(prefix: string, message: string = `Must start with "${prefix}"`): StringValidator {
    return this.addRule((value) => (str(value).startsWith(prefix) ? ok : fail(message)));
  }

  endsWith(suffix: string, message: string = `Must end with "${suffix}"`): StringValidator {
    return this.addRule((value) => (str(value).endsWith(suffix) ? ok : fail(message)));
  }

  includes(substring: string, message: string = `Must include "${substring}"`): StringValidator {
    return this.addRule((value) => (str(value).includes(substring) ? ok : fail(message)));
  }

  pattern(regex: RegExp, message: string = defaultMessages.pattern): StringValidator {
    return this.addRule((value) => (regex.test(str(value)) ? ok : fail(message)));
  }

  oneOf(values: readonly string[], message: string = defaultMessages.oneOf(values)): StringValidator {
    return this.addRule((value) => (values.includes(String(value)) ? ok : fail(message)));
  }

  /** Reject leading/trailing whitespace. */
  trimmed(message: string = 'Must not have leading or trailing spaces'): StringValidator {
    return this.addRule((value) => {
      const s = str(value);
      return s === s.trim() ? ok : fail(message);
    });
  }
}

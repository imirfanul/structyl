import { describe, expect, it } from 'vitest';
import * as CardModule from './';

describe('Card (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(CardModule).length).toBeGreaterThan(0);
  });
});

import type { ApiError } from './types';

export async function withRetry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries) {
        await new Promise<void>((res) =>
          setTimeout(res, Math.min(1_000 * 2 ** i, 30_000)),
        );
      }
    }
  }
  throw lastErr;
}

// Normalizes any thrown value into a well-shaped ApiError.
// Axios errors are already normalized by the response interceptor; this handles
// non-Axios throws from custom mutation functions.
export function toApiError(err: unknown): ApiError {
  if (
    err != null &&
    typeof (err as ApiError).status === 'number' &&
    typeof (err as ApiError).message === 'string'
  ) {
    return err as ApiError;
  }
  return {
    status: -1,
    message: err instanceof Error ? err.message : String(err),
  };
}

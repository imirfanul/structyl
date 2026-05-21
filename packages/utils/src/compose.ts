/**
 * Compose two event handlers into one. The handlers are called in order.
 * If the original handler calls `event.preventDefault()`, the next one is skipped
 * unless `checkForDefaultPrevented` is `false`.
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
): (event: E) => void {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as { defaultPrevented: boolean }).defaultPrevented
    ) {
      ourEventHandler?.(event);
    }
  };
}

/**
 * Merge two sets of React props, with the second set taking precedence
 * except for event handlers and `className`/`style`, which are composed.
 */
type AnyProps = Record<string, unknown>;

export function mergeProps<T extends AnyProps, U extends AnyProps>(
  base: T,
  override: U,
): T & U {
  const merged: AnyProps = { ...base, ...override };

  for (const key in override) {
    const baseVal = base[key];
    const overrideVal = override[key];

    // Compose event handlers (onClick, onKeyDown, etc.)
    if (/^on[A-Z]/.test(key) && typeof baseVal === 'function' && typeof overrideVal === 'function') {
      merged[key] = (...args: unknown[]) => {
        (overrideVal as (...args: unknown[]) => void)(...args);
        (baseVal as (...args: unknown[]) => void)(...args);
      };
    }
    // Merge styles
    else if (key === 'style' && typeof baseVal === 'object' && typeof overrideVal === 'object') {
      merged[key] = { ...(baseVal as object), ...(overrideVal as object) };
    }
    // Merge classNames
    else if (key === 'className' && typeof baseVal === 'string' && typeof overrideVal === 'string') {
      merged[key] = [baseVal, overrideVal].filter(Boolean).join(' ');
    }
  }

  return merged as T & U;
}

'use client';

import * as React from 'react';

/* ── Scope types ─────────────────────────────────────────────────────────── */

type Scope<C = unknown> = { [scopeName: string]: React.Context<C>[] } | undefined;
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };
interface CreateScope {
  scopeName: string;
  (): ScopeHook;
}

/* ── createContext ───────────────────────────────────────────────────────── */

/**
 * Create a typed context with a sensible error when used outside its Provider.
 *
 * @example
 * const [DialogProvider, useDialogContext] = createContext<DialogContextValue>('Dialog');
 */
export function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
): readonly [
  React.FC<ContextValueType & { children: React.ReactNode }>,
  (consumerName: string) => ContextValueType,
] {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

  function Provider(props: ContextValueType & { children: React.ReactNode }): React.JSX.Element {
    const { children, ...context } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => context, Object.values(context)) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
  Provider.displayName = `${rootComponentName}Provider`;

  function useContextHook(consumerName: string): ContextValueType {
    const ctx = React.useContext(Context);
    if (ctx !== undefined) return ctx;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }

  return [Provider, useContextHook] as const;
}

/* ── createContextScope ──────────────────────────────────────────────────── */

/**
 * Create a scoped context factory. Solves context leakage when the same
 * component family is nested inside itself (e.g. nested Dialogs, nested Menus)
 * or when two families share an internal primitive (e.g. both use PopperContext).
 *
 * Returns `[createContext, createScope]`:
 * - `createContext` behaves like the simple version above but scoped.
 * - `createScope` is a CreateScope factory consumed by other component families
 *   that depend on this one.
 *
 * @example
 * const [createDialogContext, createDialogScope] = createContextScope('Dialog');
 * const [DialogProvider, useDialogContext] = createDialogContext<DialogContextValue>('Dialog');
 *
 * // In Dialog.Root:
 * function Root({ __scopeDialog, ...props }) {
 *   const scope = useDialogScope(__scopeDialog);
 *   return <DialogProvider {...scope} open={...}>{props.children}</DialogProvider>;
 * }
 */
export function createContextScope(
  scopeName: string,
  createContextScopeDeps: CreateScope[] = [],
): readonly [
  <ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType,
  ) => readonly [
    React.FC<ContextValueType & { scope: Scope; children: React.ReactNode }>,
    (consumerName: string, scope: Scope) => ContextValueType,
  ],
  CreateScope,
] {
  // Accumulates the base context instances registered via createScopedContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let defaultContexts: React.Context<any>[] = [];

  /* ── Scoped context factory ── */
  function createScopedContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType,
  ) {
    const BaseContext = React.createContext<ContextValueType | undefined>(defaultContext);
    const index = defaultContexts.push(BaseContext) - 1;

    function Provider(
      props: ContextValueType & { scope: Scope; children: React.ReactNode },
    ): React.JSX.Element {
      const { scope, children, ...context } = props;
      const Context = (
        (scope?.[scopeName]?.[index] as React.Context<ContextValueType | undefined> | undefined) ??
        BaseContext
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const value = React.useMemo(() => context as ContextValueType, Object.values(context));
      return <Context.Provider value={value}>{children}</Context.Provider>;
    }
    Provider.displayName = `${rootComponentName}Provider`;

    function useScopedContext(consumerName: string, scope: Scope): ContextValueType {
      const Context = (
        (scope?.[scopeName]?.[index] as React.Context<ContextValueType | undefined> | undefined) ??
        BaseContext
      );
      const ctx = React.useContext(Context);
      if (ctx !== undefined) return ctx;
      if (defaultContext !== undefined) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }

    return [Provider, useScopedContext] as const;
  }

  /* ── Scope hook factory ── */
  const createScope: CreateScope = () => {
    // Create a fresh set of context instances for this scope level —
    // one per registered createScopedContext call.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scopeContexts: React.Context<any>[] = defaultContexts.map(() =>
      React.createContext<unknown>(undefined),
    );
    return function useScopeHook(parentScope: Scope) {
      return {
        [`__scope${scopeName}`]: { ...parentScope, [scopeName]: scopeContexts },
      } as { [__scopeProp: string]: Scope };
    };
  };
  createScope.scopeName = scopeName;

  return [
    createScopedContext,
    composeContextScopes(createScope, ...createContextScopeDeps),
  ] as const;
}

/* ── composeContextScopes ────────────────────────────────────────────────── */

/**
 * Merge multiple CreateScope factories into one. Used internally when a
 * component family depends on another (e.g. DropdownMenu depends on Popper).
 */
export function composeContextScopes(...scopes: CreateScope[]): CreateScope {
  const composed: CreateScope = () => {
    const scopeHooks = scopes.map(scope => scope());
    return function useComposedScopeHook(parentScope: Scope) {
      return scopeHooks.reduce<Record<string, Scope>>(
        (nextScope, hook) => ({ ...nextScope, ...hook(parentScope) }),
        {},
      );
    };
  };
  composed.scopeName = scopes.map(s => s.scopeName).join(',');
  return composed;
}

'use client';

import * as React from 'react';

type Scope<C = unknown> = { [scopeName: string]: React.Context<C>[] } | undefined;
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };
interface CreateScope {
  scopeName: string;
  (): ScopeHook;
}

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
    const value = React.useMemo(() => context, Object.values(context)) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
  Provider.displayName = `${rootComponentName}Provider`;

  function useContext(consumerName: string): ContextValueType {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }

  return [Provider, useContext] as const;
}

/**
 * Create a scoped context. Useful when components can be nested inside each other
 * (e.g. nested Dialogs, nested Menus).
 */
export function createContextScope(scopeName: string, createContextScopeDeps: CreateScope[] = []) {
  // Simplified scoped contexts — full implementation lives in the source.
  // For now we expose createContext to consumers; scoped is a TODO.
  return { createContext, createContextScope: () => ({ scopeName }), scopeName, createContextScopeDeps };
}

'use client';

import * as React from 'react';
import { Slot } from './slot';

const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const;

type PrimitivePropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & {
  asChild?: boolean;
};

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};

type PrimitiveForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  PrimitivePropsWithRef<E>
>;

const Primitive = NODES.reduce((primitive, node) => {
  const Node = React.forwardRef(
    (props: PrimitivePropsWithRef<typeof node>, forwardedRef: React.ForwardedRef<unknown>) => {
      const { asChild, ...rest } = props;
      const Comp = asChild ? Slot : (node as React.ElementType);
      // Workaround for "Hooks may not appear inside JSX..." — ensures stable runtime
      if (typeof window !== 'undefined') {
        // noop — kept for env parity
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Comp {...(rest as any)} ref={forwardedRef as React.Ref<any>} />;
    },
  );

  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {} as Primitives);

/**
 * Polymorphic primitive component. Renders as the given HTML element by default,
 * or as the child element when `asChild` is true.
 *
 * @example
 * <Primitive.button onClick={...}>Click</Primitive.button>
 * <Primitive.button asChild><a href="/">Link</a></Primitive.button>
 */
export { Primitive };
export type { PrimitivePropsWithRef };

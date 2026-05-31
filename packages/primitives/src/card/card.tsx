'use client';

import * as React from 'react';
import { Primitive } from '@structyl/core';
import type { CardRootProps, CardSectionProps } from './card.types';

const Root = React.forwardRef<HTMLDivElement, CardRootProps>((props, forwardedRef) => {
  return <Primitive.div {...props} ref={forwardedRef} data-structyl-card="" />;
});
Root.displayName = 'Card.Root';

const Header = React.forwardRef<HTMLDivElement, CardSectionProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} data-structyl-card-header="" />
));
Header.displayName = 'Card.Header';

const Title = React.forwardRef<HTMLDivElement, CardSectionProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} data-structyl-card-title="" />
));
Title.displayName = 'Card.Title';

const Description = React.forwardRef<HTMLDivElement, CardSectionProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} data-structyl-card-description="" />
));
Description.displayName = 'Card.Description';

const Content = React.forwardRef<HTMLDivElement, CardSectionProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} data-structyl-card-content="" />
));
Content.displayName = 'Card.Content';

const Footer = React.forwardRef<HTMLDivElement, CardSectionProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} data-structyl-card-footer="" />
));
Footer.displayName = 'Card.Footer';

export { Root, Header, Title, Description, Content, Footer };
export type { CardRootProps, CardSectionProps };

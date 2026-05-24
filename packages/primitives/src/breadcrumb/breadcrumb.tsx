import * as React from 'react';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, label = 'Breadcrumb', ...props }, ref) => (
    <nav aria-label={label} ref={ref} {...props}>
      <ol>{children}</ol>
    </nav>
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ children, ...props }, ref) => (
    <li ref={ref} {...props}>
      {children}
    </li>
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a ref={ref} {...props}>
    {children}
  </a>
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink };

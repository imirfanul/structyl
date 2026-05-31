'use client';

import * as React from 'react';
import { Primitive, Portal as PortalPrimitive, Popper as PopperPrimitive } from '@structyl/core';
import { useComposedRefs, useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import * as ComboboxPrimitive from '../combobox';

type DivProps = React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean };
type SpanProps = React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean };
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean };

const Box = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-box="" {...props} ref={ref} />
));
Box.displayName = 'Box';

const Container = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-container="" {...props} ref={ref} />
));
Container.displayName = 'Container';

const Stack = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-stack="" {...props} ref={ref} />
));
Stack.displayName = 'Stack';

const Grid = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-grid="" {...props} ref={ref} />
));
Grid.displayName = 'Grid';

const Paper = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-paper="" {...props} ref={ref} />
));
Paper.displayName = 'Paper';

const Typography = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-typography="" {...props} ref={ref} />
));
Typography.displayName = 'Typography';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & { asChild?: boolean }
>((props, ref) => <Primitive.a data-structyl-link="" {...props} ref={ref} />);
Link.displayName = 'Link';

const SvgIcon = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<'svg'> & { title?: string }
>(({ title, children, ...props }, ref) => (
  <Primitive.svg
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : undefined}
    viewBox="0 0 24 24"
    focusable="false"
    {...props}
    ref={ref}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </Primitive.svg>
));
SvgIcon.displayName = 'SvgIcon';

export interface ChartProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'> {
  data: number[];
  type?: 'bar' | 'line';
  title?: string;
}

const Chart = React.forwardRef<SVGSVGElement, ChartProps>(
  ({ data, type = 'bar', title, viewBox = '0 0 100 40', ...props }, ref) => {
    const max = Math.max(...data, 1);
    const width = 100 / Math.max(data.length, 1);
    const points = data
      .map((value, index) => {
        const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
        const y = 40 - (value / max) * 36 - 2;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <Primitive.svg
        data-structyl-chart=""
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        viewBox={viewBox}
        preserveAspectRatio="none"
        {...props}
        ref={ref}
      >
        {title ? <title>{title}</title> : null}
        {type === 'line' ? (
          <polyline fill="none" stroke="currentColor" strokeWidth="3" points={points} />
        ) : (
          data.map((value, index) => (
            <rect
              key={`${index}-${value}`}
              x={index * width + width * 0.15}
              y={40 - (value / max) * 36 - 2}
              width={width * 0.7}
              height={(value / max) * 36}
              rx="1"
              fill="currentColor"
            />
          ))
        )}
      </Primitive.svg>
    );
  },
);
Chart.displayName = 'Chart';

const ChipRoot = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-chip="" {...props} ref={ref} />
));
ChipRoot.displayName = 'Chip.Root';

const ChipLabel = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-chip-label="" {...props} ref={ref} />
));
ChipLabel.displayName = 'Chip.Label';

const ChipDelete = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Primitive.button type="button" data-structyl-chip-delete="" {...props} ref={ref} />
));
ChipDelete.displayName = 'Chip.Delete';

const ButtonGroup = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div role="group" data-structyl-button-group="" {...props} ref={ref} />
));
ButtonGroup.displayName = 'ButtonGroup';

const FloatingActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Primitive.button type="button" data-structyl-floating-action-button="" {...props} ref={ref} />
));
FloatingActionButton.displayName = 'FloatingActionButton';

export interface RatingProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  itemClassName?: string;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  getLabelText?: (value: number) => string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue = 0,
    onValueChange,
    max = 5,
    disabled,
    readOnly,
    name,
    itemClassName,
    icon = '★',
    emptyIcon = '☆',
    getLabelText = (value) => `${value} star${value === 1 ? '' : 's'}`,
    ...rest
  } = props;
  const [value = 0, setValue] = useControllableState<number>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <Primitive.div role="radiogroup" data-structyl-rating="" {...rest} ref={ref}>
      {Array.from({ length: max }, (_, index) => {
        const itemValue = index + 1;
        const checked = itemValue <= value;
        return (
          <Primitive.button
            key={itemValue}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={getLabelText(itemValue)}
            data-value={itemValue}
            data-state={checked ? 'checked' : 'unchecked'}
            data-disabled={disabled ? '' : undefined}
            disabled={disabled}
            className={itemClassName}
            tabIndex={disabled ? undefined : 0}
            onClick={() => {
              if (!disabled && !readOnly) setValue(itemValue);
            }}
          >
            <Primitive.span aria-hidden>{checked ? icon : emptyIcon}</Primitive.span>
          </Primitive.button>
        );
      })}
      {name ? <input type="hidden" name={name} value={value} /> : null}
    </Primitive.div>
  );
});
Rating.displayName = 'Rating';

const Autocomplete = {
  Root: ComboboxPrimitive.Root,
  Input: ComboboxPrimitive.Input,
  Portal: ComboboxPrimitive.Portal,
  Content: ComboboxPrimitive.Content,
  Item: ComboboxPrimitive.Item,
  Empty: ComboboxPrimitive.Empty,
  Group: ComboboxPrimitive.Group,
};

export interface TransferListOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TransferListProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> {
  options: TransferListOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  sourceTitle?: React.ReactNode;
  targetTitle?: React.ReactNode;
}

const TransferList = React.forwardRef<HTMLDivElement, TransferListProps>((props, ref) => {
  const {
    options,
    value: valueProp,
    defaultValue = [],
    onValueChange,
    sourceTitle = 'Available',
    targetTitle = 'Selected',
    ...rest
  } = props;
  const [targetValues = [], setTargetValues] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]);
  const targetSet = React.useMemo(() => new Set(targetValues), [targetValues]);
  const sourceOptions = options.filter((option) => !targetSet.has(option.value));
  const targetOptions = targetValues
    .map((value) => options.find((option) => option.value === value))
    .filter((option): option is TransferListOption => Boolean(option));

  const toggleChecked = (value: string) => {
    setCheckedValues((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };
  const moveRight = () => {
    const next = [...targetValues, ...checkedValues.filter((value) => !targetSet.has(value))];
    setTargetValues(next);
    setCheckedValues([]);
  };
  const moveLeft = () => {
    setTargetValues(targetValues.filter((value) => !checkedValues.includes(value)));
    setCheckedValues([]);
  };

  const renderPanel = (title: React.ReactNode, panelOptions: TransferListOption[]) => (
    <Primitive.div data-transfer-list-panel="">
      <Primitive.div data-transfer-list-title="">{title}</Primitive.div>
      <Primitive.ul data-transfer-list-list="">
        {panelOptions.map((option) => (
          <Primitive.li key={option.value} data-transfer-list-item="">
            <Primitive.label data-transfer-list-label="">
              <Primitive.input
                type="checkbox"
                checked={checkedValues.includes(option.value)}
                disabled={option.disabled}
                onChange={() => toggleChecked(option.value)}
              />
              <Primitive.span>{option.label}</Primitive.span>
            </Primitive.label>
          </Primitive.li>
        ))}
      </Primitive.ul>
    </Primitive.div>
  );

  return (
    <Primitive.div data-structyl-transfer-list="" {...rest} ref={ref}>
      {renderPanel(sourceTitle, sourceOptions)}
      <Primitive.div data-transfer-list-actions="">
        <Primitive.button type="button" onClick={moveRight}>
          &gt;
        </Primitive.button>
        <Primitive.button type="button" onClick={moveLeft}>
          &lt;
        </Primitive.button>
      </Primitive.div>
      {renderPanel(targetTitle, targetOptions)}
    </Primitive.div>
  );
});
TransferList.displayName = 'TransferList';

const ListRoot = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, ref) => <Primitive.ul data-structyl-list="" {...props} ref={ref} />,
);
ListRoot.displayName = 'List.Root';

const ListItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  (props, ref) => <Primitive.li data-structyl-list-item="" {...props} ref={ref} />,
);
ListItem.displayName = 'List.Item';

const ListItemButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Primitive.button type="button" data-structyl-list-item-button="" {...props} ref={ref} />
));
ListItemButton.displayName = 'List.ItemButton';

const ListItemText = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-list-item-text="" {...props} ref={ref} />
));
ListItemText.displayName = 'List.ItemText';

const ListItemIcon = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-list-item-icon="" {...props} ref={ref} />
));
ListItemIcon.displayName = 'List.ItemIcon';

const ListItemAvatar = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-list-item-avatar="" {...props} ref={ref} />
));
ListItemAvatar.displayName = 'List.ItemAvatar';

const ListItemSecondaryAction = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-list-item-secondary-action="" {...props} ref={ref} />
));
ListItemSecondaryAction.displayName = 'List.ItemSecondaryAction';

const ListSubheader = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  (props, ref) => <Primitive.li data-structyl-list-subheader="" {...props} ref={ref} />,
);
ListSubheader.displayName = 'List.Subheader';

const List = {
  Root: ListRoot,
  Item: ListItem,
  ItemButton: ListItemButton,
  ItemText: ListItemText,
  ItemIcon: ListItemIcon,
  ItemAvatar: ListItemAvatar,
  ItemSecondaryAction: ListItemSecondaryAction,
  Subheader: ListSubheader,
};

const ImageListRoot = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, ref) => <Primitive.ul data-structyl-image-list="" {...props} ref={ref} />,
);
ImageListRoot.displayName = 'ImageList.Root';

const ImageListItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  (props, ref) => <Primitive.li data-structyl-image-list-item="" {...props} ref={ref} />,
);
ImageListItem.displayName = 'ImageList.Item';

const ImageListImage = React.forwardRef<HTMLImageElement, React.ComponentPropsWithoutRef<'img'>>(
  (props, ref) => <Primitive.img data-structyl-image-list-image="" {...props} ref={ref} />,
);
ImageListImage.displayName = 'ImageList.Image';

const ImageListCaption = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-image-list-caption="" {...props} ref={ref} />
));
ImageListCaption.displayName = 'ImageList.Caption';

const ImageList = {
  Root: ImageListRoot,
  Item: ImageListItem,
  Image: ImageListImage,
  Caption: ImageListCaption,
};

const TableRoot = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<'table'>>(
  (props, ref) => <table data-structyl-table="" {...props} ref={ref} />,
);
TableRoot.displayName = 'Table.Root';

const TableHeader = React.forwardRef<
  React.ElementRef<'thead'>,
  React.ComponentPropsWithoutRef<'thead'>
>((props, ref) => <thead data-structyl-table-header="" {...props} ref={ref} />);
TableHeader.displayName = 'Table.Header';

const TableBody = React.forwardRef<
  React.ElementRef<'tbody'>,
  React.ComponentPropsWithoutRef<'tbody'>
>((props, ref) => <tbody data-structyl-table-body="" {...props} ref={ref} />);
TableBody.displayName = 'Table.Body';

const TableFooter = React.forwardRef<
  React.ElementRef<'tfoot'>,
  React.ComponentPropsWithoutRef<'tfoot'>
>((props, ref) => <tfoot data-structyl-table-footer="" {...props} ref={ref} />);
TableFooter.displayName = 'Table.Footer';

const TableRow = React.forwardRef<React.ElementRef<'tr'>, React.ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => <tr data-structyl-table-row="" {...props} ref={ref} />,
);
TableRow.displayName = 'Table.Row';

const TableHead = React.forwardRef<React.ElementRef<'th'>, React.ComponentPropsWithoutRef<'th'>>(
  (props, ref) => <th data-structyl-table-head="" {...props} ref={ref} />,
);
TableHead.displayName = 'Table.Head';

const TableCell = React.forwardRef<React.ElementRef<'td'>, React.ComponentPropsWithoutRef<'td'>>(
  (props, ref) => <td data-structyl-table-cell="" {...props} ref={ref} />,
);
TableCell.displayName = 'Table.Cell';

const TableCaption = React.forwardRef<
  React.ElementRef<'caption'>,
  React.ComponentPropsWithoutRef<'caption'>
>((props, ref) => <caption data-structyl-table-caption="" {...props} ref={ref} />);
TableCaption.displayName = 'Table.Caption';

const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
};

export interface BackdropProps extends DivProps {
  open?: boolean;
  forceMount?: boolean;
  invisible?: boolean;
}

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ open = false, forceMount = false, invisible = false, ...props }, ref) =>
    open || forceMount ? (
      <Primitive.div
        data-structyl-backdrop=""
        data-state={open ? 'open' : 'closed'}
        data-invisible={invisible ? '' : undefined}
        {...props}
        ref={ref}
      />
    ) : null,
);
Backdrop.displayName = 'Backdrop';

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface SnackbarProps extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoHideDuration?: number;
  resumeHideDuration?: number;
  disableWindowBlurListener?: boolean;
  anchorOrigin?: SnackbarOrigin;
  message?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: (event: Event | React.SyntheticEvent | null, reason: SnackbarCloseReason) => void;
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    autoHideDuration,
    resumeHideDuration,
    disableWindowBlurListener,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    message,
    action,
    onClose,
    children,
    ...rest
  } = props;
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const requestClose = React.useCallback(
    (event: Event | React.SyntheticEvent | null, reason: SnackbarCloseReason) => {
      onClose?.(event, reason);
      setOpen(false);
    },
    [onClose, setOpen],
  );

  React.useEffect(() => {
    if (!open || autoHideDuration === undefined) return;
    const timer = window.setTimeout(() => requestClose(null, 'timeout'), autoHideDuration);
    return () => window.clearTimeout(timer);
  }, [autoHideDuration, open, requestClose]);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose(event, 'escapeKeyDown');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, requestClose]);

  void resumeHideDuration;
  void disableWindowBlurListener;

  if (!open) return null;

  return (
    <Primitive.div
      role="status"
      data-structyl-snackbar=""
      data-anchor-vertical={anchorOrigin.vertical}
      data-anchor-horizontal={anchorOrigin.horizontal}
      {...rest}
      ref={ref}
    >
      {children ?? (
        <>
          {message ? <Primitive.span data-snackbar-message="">{message}</Primitive.span> : null}
          {action ? <Primitive.span data-snackbar-action="">{action}</Primitive.span> : null}
        </>
      )}
    </Primitive.div>
  );
});
Snackbar.displayName = 'Snackbar';

export type ModalCloseReason = 'escapeKeyDown' | 'backdropClick';

export interface ModalProps extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (
    event: KeyboardEvent | React.PointerEvent<HTMLDivElement>,
    reason: ModalCloseReason,
  ) => void;
  container?: Element | DocumentFragment | null;
  closeOnEscape?: boolean;
  closeOnPointerDownOutside?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onClose,
    container,
    closeOnEscape = true,
    closeOnPointerDownOutside = true,
    ...rest
  } = props;
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  React.useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.(event, 'escapeKeyDown');
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, onClose, open, setOpen]);

  if (!open) return null;

  return (
    <PortalPrimitive container={container ?? undefined}>
      <Primitive.div
        role="presentation"
        data-structyl-modal=""
        {...rest}
        ref={ref}
        onPointerDown={composeEventHandlers(rest.onPointerDown, (event) => {
          if (closeOnPointerDownOutside && event.target === event.currentTarget) {
            onClose?.(event, 'backdropClick');
            setOpen(false);
          }
        })}
      />
    </PortalPrimitive>
  );
});
Modal.displayName = 'Modal';

const AppBar = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'header'>>(
  (props, ref) => <header data-structyl-app-bar="" {...props} ref={ref} />,
);
AppBar.displayName = 'AppBar';

interface BottomNavigationContextValue {
  value?: string;
  showLabels: boolean;
  onValueChange: (value: string) => void;
}

const BottomNavigationContext = React.createContext<BottomNavigationContextValue | null>(null);

export interface BottomNavigationRootProps extends Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'defaultValue' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  showLabels?: boolean;
}

const BottomNavigationRoot = React.forwardRef<HTMLElement, BottomNavigationRootProps>(
  ({ value: valueProp, defaultValue, onValueChange, role, showLabels = false, ...props }, ref) => {
    const [value, setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    return (
      <BottomNavigationContext.Provider
        value={{ value, showLabels, onValueChange: (nextValue) => setValue(nextValue) }}
      >
        <nav
          data-structyl-bottom-navigation=""
          data-show-labels={showLabels ? '' : undefined}
          role={role ?? 'tablist'}
          {...props}
          ref={ref}
        />
      </BottomNavigationContext.Provider>
    );
  },
);
BottomNavigationRoot.displayName = 'BottomNavigation.Root';

export interface BottomNavigationItemProps extends ButtonProps {
  value: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  showLabel?: boolean;
}

const BottomNavigationItem = React.forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
  ({ value, icon, label, showLabel, children, ...props }, ref) => {
    const ctx = React.useContext(BottomNavigationContext);
    const selected = ctx?.value === value;
    const shouldShowLabel = showLabel ?? ctx?.showLabels ?? selected;
    return (
      <Primitive.button
        type="button"
        role="tab"
        aria-selected={selected}
        data-state={selected ? 'checked' : 'unchecked'}
        data-value={value}
        {...props}
        ref={ref}
        onClick={composeEventHandlers(props.onClick, () => ctx?.onValueChange(value))}
      >
        {icon ? <Primitive.span data-bottom-navigation-icon="">{icon}</Primitive.span> : null}
        {label !== undefined ? (
          <Primitive.span
            data-bottom-navigation-label=""
            data-hidden={shouldShowLabel ? undefined : ''}
          >
            {label}
          </Primitive.span>
        ) : (
          children
        )}
      </Primitive.button>
    );
  },
);
BottomNavigationItem.displayName = 'BottomNavigation.Item';

const BottomNavigation = {
  Root: BottomNavigationRoot,
  Item: BottomNavigationItem,
};

interface SpeedDialContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpeedDialContext = React.createContext<SpeedDialContextValue | null>(null);

export interface SpeedDialRootProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  hidden?: boolean;
}

const SpeedDialRoot = React.forwardRef<HTMLDivElement, SpeedDialRootProps>(
  (
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      direction = 'up',
      hidden = false,
      ...props
    },
    ref,
  ) => {
    const [open = false, setOpen] = useControllableState<boolean>({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    if (hidden) return null;
    return (
      <SpeedDialContext.Provider value={{ open, onOpenChange: (nextOpen) => setOpen(nextOpen) }}>
        <Primitive.div
          data-structyl-speed-dial=""
          data-state={open ? 'open' : 'closed'}
          data-direction={direction}
          {...props}
          ref={ref}
        />
      </SpeedDialContext.Provider>
    );
  },
);
SpeedDialRoot.displayName = 'SpeedDial.Root';

export interface SpeedDialTriggerProps extends ButtonProps {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
}

const SpeedDialTrigger = React.forwardRef<HTMLButtonElement, SpeedDialTriggerProps>(
  (props, ref) => {
    const { icon, openIcon, children, ...rest } = props;
    const ctx = React.useContext(SpeedDialContext);
    return (
      <Primitive.button
        type="button"
        aria-expanded={ctx?.open}
        data-structyl-speed-dial-trigger=""
        {...rest}
        ref={ref}
        onClick={composeEventHandlers(rest.onClick, () => ctx?.onOpenChange(!ctx.open))}
      >
        {children ?? (ctx?.open ? openIcon : icon)}
      </Primitive.button>
    );
  },
);
SpeedDialTrigger.displayName = 'SpeedDial.Trigger';

const SpeedDialContent = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  const ctx = React.useContext(SpeedDialContext);
  return ctx?.open ? (
    <Primitive.div data-structyl-speed-dial-content="" {...props} ref={ref} />
  ) : null;
});
SpeedDialContent.displayName = 'SpeedDial.Content';

const SpeedDialAction = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Primitive.button type="button" data-structyl-speed-dial-action="" {...props} ref={ref} />
));
SpeedDialAction.displayName = 'SpeedDial.Action';

const SpeedDial = {
  Root: SpeedDialRoot,
  Trigger: SpeedDialTrigger,
  Content: SpeedDialContent,
  Action: SpeedDialAction,
};

const Masonry = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-masonry="" {...props} ref={ref} />
));
Masonry.displayName = 'Masonry';

const TimelineRoot = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, ref) => <Primitive.ul data-structyl-timeline="" {...props} ref={ref} />,
);
TimelineRoot.displayName = 'Timeline.Root';

const TimelineItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  (props, ref) => <Primitive.li data-structyl-timeline-item="" {...props} ref={ref} />,
);
TimelineItem.displayName = 'Timeline.Item';

const TimelineSeparator = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-timeline-separator="" {...props} ref={ref} />
));
TimelineSeparator.displayName = 'Timeline.Separator';

const TimelineDot = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <Primitive.span data-structyl-timeline-dot="" {...props} ref={ref} />
));
TimelineDot.displayName = 'Timeline.Dot';

const TimelineContent = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Primitive.div data-structyl-timeline-content="" {...props} ref={ref} />
));
TimelineContent.displayName = 'Timeline.Content';

const Timeline = {
  Root: TimelineRoot,
  Item: TimelineItem,
  Separator: TimelineSeparator,
  Dot: TimelineDot,
  Content: TimelineContent,
};

export interface ClickAwayListenerProps {
  children?: React.ReactNode;
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
}

const ClickAwayListener = React.forwardRef<HTMLSpanElement, ClickAwayListenerProps>(
  ({ children, onClickAway }, ref) => {
    const localRef = React.useRef<HTMLSpanElement>(null);
    const composedRef = useComposedRefs(ref, localRef);

    React.useEffect(() => {
      if (typeof document === 'undefined') return;
      const handlePointer = (event: MouseEvent | TouchEvent) => {
        const node = localRef.current;
        if (node && event.target instanceof Node && !node.contains(event.target)) {
          onClickAway?.(event);
        }
      };
      document.addEventListener('mousedown', handlePointer);
      document.addEventListener('touchstart', handlePointer);
      return () => {
        document.removeEventListener('mousedown', handlePointer);
        document.removeEventListener('touchstart', handlePointer);
      };
    }, [onClickAway]);

    return (
      <span ref={composedRef} style={{ display: 'contents' }}>
        {children}
      </span>
    );
  },
);
ClickAwayListener.displayName = 'ClickAwayListener';

const NoSsr: React.FC<{
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  defer?: boolean;
}> = ({ children, fallback = null, defer = false }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    if (!defer) {
      setMounted(true);
      return;
    }
    if (typeof window === 'undefined') return;
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, [defer]);
  return mounted ? <>{children}</> : <>{fallback}</>;
};
NoSsr.displayName = 'NoSsr';

const Portal = PortalPrimitive;

// ── MUI-style Popper ──────────────────────────────────────────────────────────

export interface PopperProps {
  open: boolean;
  anchorEl?: Element | null | (() => Element | null);
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  keepMounted?: boolean;
  disablePortal?: boolean;
  container?: Element | DocumentFragment | null;
}

function getAnchorEl(anchorEl: PopperProps['anchorEl']): Element | null {
  return typeof anchorEl === 'function' ? anchorEl() : (anchorEl ?? null);
}

function parsePlacement(placement: string): { side: 'top' | 'right' | 'bottom' | 'left'; align: 'start' | 'center' | 'end' } {
  const [side, align = 'center'] = placement.split('-') as [string, string | undefined];
  return { side: side as 'top' | 'right' | 'bottom' | 'left', align: (align ?? 'center') as 'start' | 'center' | 'end' };
}

const Popper = React.forwardRef<HTMLDivElement, PopperProps>(
  ({ open, anchorEl: anchorElProp, placement = 'bottom', children, className, style, keepMounted = false, disablePortal = false, container }, ref) => {
    const virtualRef = React.useRef({ getBoundingClientRect: (): DOMRect => getAnchorEl(anchorElProp)?.getBoundingClientRect() ?? new DOMRect() });

    React.useEffect(() => {
      virtualRef.current.getBoundingClientRect = () => getAnchorEl(anchorElProp)?.getBoundingClientRect() ?? new DOMRect();
    });

    if (!open && !keepMounted) return null;

    const { side, align } = parsePlacement(placement);

    const content = (
      <PopperPrimitive.Root>
        <PopperPrimitive.Anchor virtualRef={virtualRef} />
        <PopperPrimitive.Content
          ref={ref}
          side={side}
          align={align}
          sideOffset={4}
          style={{ display: !open ? 'none' : undefined, ...style }}
          className={className}
        >
          {children}
        </PopperPrimitive.Content>
      </PopperPrimitive.Root>
    );

    if (disablePortal) return content;
    return <PortalPrimitive container={container ?? undefined}>{content}</PortalPrimitive>;
  },
);
Popper.displayName = 'Popper';

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
}

const TextareaAutosize = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ minRows = 1, maxRows, style, onInput, ...props }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement>(null);
    const composedRef = useComposedRefs(ref, localRef);

    const resize = React.useCallback(() => {
      const node = localRef.current;
      if (!node) return;
      const lineHeight = Number.parseFloat(window.getComputedStyle(node).lineHeight || '20');
      node.style.height = 'auto';
      const minHeight = lineHeight * minRows;
      const maxHeight = maxRows ? lineHeight * maxRows : Number.POSITIVE_INFINITY;
      node.style.height = `${Math.min(Math.max(node.scrollHeight, minHeight), maxHeight)}px`;
    }, [maxRows, minRows]);

    React.useEffect(() => {
      if (typeof window !== 'undefined') resize();
    }, [resize, props.value, props.defaultValue]);

    return (
      <textarea
        data-structyl-textarea-autosize=""
        rows={minRows}
        {...props}
        ref={composedRef}
        style={{ resize: 'none', ...style }}
        onInput={composeEventHandlers(onInput, resize)}
      />
    );
  },
);
TextareaAutosize.displayName = 'TextareaAutosize';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface TransitionProps extends Omit<DivProps, 'children'> {
  in?: boolean;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  children?: React.ReactNode | ((status: TransitionStatus) => React.ReactNode);
}

const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (
    {
      in: inProp = false,
      appear = false,
      mountOnEnter = false,
      unmountOnExit = false,
      timeout = 300,
      onEnter, onEntering, onEntered,
      onExit, onExiting, onExited,
      children,
      ...props
    },
    ref,
  ) => {
    const enterMs = typeof timeout === 'number' ? timeout : (timeout.enter ?? 300);
    const exitMs = typeof timeout === 'number' ? timeout : (timeout.exit ?? 300);
    const appearMs = typeof timeout === 'number' ? timeout : (timeout.appear ?? enterMs);

    const initialStatus: TransitionStatus = inProp
      ? (appear ? 'exited' : 'entered')
      : 'exited';

    const [status, setStatus] = React.useState<TransitionStatus>(initialStatus);
    const [mounted, setMounted] = React.useState(inProp || !mountOnEnter);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      if (inProp) {
        setMounted(true);
        setStatus('entering');
        onEnter?.();
        timerRef.current = setTimeout(() => {
          setStatus('entering');
          onEntering?.();
          timerRef.current = setTimeout(() => {
            setStatus('entered');
            onEntered?.();
          }, status === 'exited' && appear ? appearMs : enterMs);
        }, 10);
      } else {
        setStatus('exiting');
        onExit?.();
        timerRef.current = setTimeout(() => {
          setStatus('exiting');
          onExiting?.();
          timerRef.current = setTimeout(() => {
            setStatus('exited');
            onExited?.();
            if (unmountOnExit) setMounted(false);
          }, exitMs);
        }, 10);
      }
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inProp]);

    if (!mounted) return null;

    const content = typeof children === 'function' ? children(status) : children;

    return (
      <Primitive.div
        data-structyl-transition=""
        data-state={status}
        {...props}
        ref={ref}
      >
        {content}
      </Primitive.div>
    );
  },
);
Transition.displayName = 'Transition';

const CssBaseline: React.FC<{ children?: React.ReactNode; enableColorScheme?: boolean }> = ({
  children,
  enableColorScheme = false,
}) => (
  <>
    <style data-structyl-css-baseline="">
      {`*,*::before,*::after{box-sizing:border-box}html{line-height:1.5;-webkit-text-size-adjust:100%${enableColorScheme ? ';color-scheme:light dark' : ''}}body{margin:0}button,input,textarea,select{font:inherit}`}
    </style>
    {children}
  </>
);
CssBaseline.displayName = 'CssBaseline';

export interface InitColorSchemeScriptProps {
  storageKey?: string;
  defaultMode?: 'light' | 'dark' | 'system';
  attribute?: string;
}

const InitColorSchemeScript: React.FC<InitColorSchemeScriptProps> = ({
  storageKey = 'structyl-mode',
  defaultMode = 'system',
  attribute = 'data-theme',
}) => {
  const code = `(function(){try{var k=${JSON.stringify(storageKey)};var a=${JSON.stringify(attribute)};var d=${JSON.stringify(defaultMode)};var m=localStorage.getItem(k)||d;if(m==="system"){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute(a,m)}catch(e){}})();`;
  return <script suppressHydrationWarning>{code}</script>;
};
InitColorSchemeScript.displayName = 'InitColorSchemeScript';

export {
  Box,
  Container,
  Stack,
  Grid,
  Paper,
  Typography,
  Link,
  SvgIcon,
  Chart,
  ChipRoot,
  ChipLabel,
  ChipDelete,
  ButtonGroup,
  FloatingActionButton,
  Rating,
  Autocomplete,
  TransferList,
  List,
  ImageList,
  Table,
  Backdrop,
  Snackbar,
  Modal,
  AppBar,
  BottomNavigation,
  SpeedDial,
  Masonry,
  Timeline,
  ClickAwayListener,
  NoSsr,
  Portal,
  Popper,
  TextareaAutosize,
  Transition,
  CssBaseline,
  InitColorSchemeScript,
};

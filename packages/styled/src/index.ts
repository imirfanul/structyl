/**
 * @aura-ui/styled
 *
 * Tailwind-styled React components, batteries included.
 */

export * from './button';
export * from './switch';
export * from './toggle';
export * from './checkbox';
export * from './label';
export * from './separator';
export * as Dialog from './dialog';
export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from '@aura-ui/primitives';

// Phase B atoms
export * from './aspect-ratio';
export * as Avatar from './avatar';
export type { AvatarRootProps, AvatarImageProps, AvatarFallbackProps, ImageLoadingStatus } from '@aura-ui/primitives';
export * from './progress';
export * from './skeleton';
export * from './badge';
export * as Card from './card';
export type { CardRootProps, CardSectionProps } from '@aura-ui/primitives';
export * from './spinner';
export * as Alert from './alert';
export type { AlertRootProps } from './alert';

// Phase C form basics
export * from './input';
export * from './textarea';
export * as RadioGroup from './radio-group';
export type {
  RadioGroupRootProps,
  RadioGroupItemProps,
  RadioGroupIndicatorProps,
} from '@aura-ui/primitives';
export * as ToggleGroup from './toggle-group';
export type {
  ToggleGroupRootProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
} from '@aura-ui/primitives';
export * from './slider';
export * as Form from './form';
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormValidityStateProps,
  FormSubmitProps,
  Matcher,
  ValidityMatcher,
  CustomMatcher,
} from '@aura-ui/primitives';

// Phase D disclosure & navigation
export * as Collapsible from './collapsible';
export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from '@aura-ui/primitives';
export * as Accordion from './accordion';
export type {
  AccordionRootProps,
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from '@aura-ui/primitives';
export * as Tabs from './tabs';
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps } from '@aura-ui/primitives';
export * as Breadcrumb from './breadcrumb';
export type { BreadcrumbProps } from '@aura-ui/primitives';
export * as Pagination from './pagination';
export type { PaginationProps } from '@aura-ui/primitives';
export * as Stepper from './stepper';
export type { StepperProps, StepperButtonProps } from '@aura-ui/primitives';

// Phase E overlays
export * as AlertDialog from './alert-dialog';
export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from '@aura-ui/primitives';
export * as Sheet from './sheet';
export type { SheetContentProps } from './sheet';
export type {
  DialogRootProps as SheetRootProps,
  DialogTriggerProps as SheetTriggerProps,
  DialogPortalProps as SheetPortalProps,
  DialogOverlayProps as SheetOverlayProps,
  DialogTitleProps as SheetTitleProps,
  DialogDescriptionProps as SheetDescriptionProps,
  DialogCloseProps as SheetCloseProps,
} from '@aura-ui/primitives';
export * as Drawer from './drawer';
export type {
  DialogRootProps as DrawerRootProps,
  DialogTriggerProps as DrawerTriggerProps,
  DialogPortalProps as DrawerPortalProps,
  DialogOverlayProps as DrawerOverlayProps,
  DialogContentProps as DrawerContentProps,
  DialogTitleProps as DrawerTitleProps,
  DialogDescriptionProps as DrawerDescriptionProps,
  DialogCloseProps as DrawerCloseProps,
} from '@aura-ui/primitives';
export * as Popover from './popover';
export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverContentProps,
  PopoverCloseProps,
  PopoverArrowProps,
} from '@aura-ui/primitives';
export * as Tooltip from './tooltip';
export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipContentProps,
  TooltipArrowProps,
} from '@aura-ui/primitives';
export * as HoverCard from './hover-card';
export type {
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardPortalProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from '@aura-ui/primitives';
export * as Toast from './toast';
export type {
  ToastProviderProps,
  ToastViewportProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
  SwipeDirection,
} from '@aura-ui/primitives';

// Phase F: complex compound
export * as DropdownMenu from './dropdown-menu';
export type {
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
  MenuContentProps as DropdownMenuContentProps,
  MenuItemProps as DropdownMenuItemProps,
  MenuGroupProps as DropdownMenuGroupProps,
  MenuLabelProps as DropdownMenuLabelProps,
  MenuCheckboxItemProps as DropdownMenuCheckboxItemProps,
  MenuRadioGroupProps as DropdownMenuRadioGroupProps,
  MenuRadioItemProps as DropdownMenuRadioItemProps,
  MenuSeparatorProps as DropdownMenuSeparatorProps,
  MenuItemIndicatorProps as DropdownMenuItemIndicatorProps,
} from '@aura-ui/primitives';
export * as ContextMenu from './context-menu';
export type {
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  MenuContentProps as ContextMenuContentProps,
  MenuItemProps as ContextMenuItemProps,
  MenuGroupProps as ContextMenuGroupProps,
  MenuLabelProps as ContextMenuLabelProps,
  MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
  MenuRadioGroupProps as ContextMenuRadioGroupProps,
  MenuRadioItemProps as ContextMenuRadioItemProps,
  MenuSeparatorProps as ContextMenuSeparatorProps,
} from '@aura-ui/primitives';
export * as Menubar from './menubar';
export type {
  MenubarRootProps,
  MenubarTriggerProps,
  MenuContentProps as MenubarContentProps,
  MenuItemProps as MenubarItemProps,
  MenuSeparatorProps as MenubarSeparatorProps,
} from '@aura-ui/primitives';
export * as NavigationMenu from './navigation-menu';
export type {
  NavigationMenuRootProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
} from '@aura-ui/primitives';
export * as Select from './select';
export type {
  SelectRootProps,
  SelectFilterOption,
  SelectOption,
  SelectTriggerProps,
  SelectValueProps,
  SelectSearchInputProps,
  SelectPortalProps,
  SelectContentProps,
  SelectItemProps,
  SelectCreateItemProps,
  SelectItemTextProps,
  SelectOptionsProps,
} from '@aura-ui/primitives';
export * as MultiSelect from './multi-select';
export type {
  MultiSelectRootProps,
  MultiSelectFilterOption,
  MultiSelectOption,
  MultiSelectSelectedOption,
  MultiSelectTriggerProps,
  MultiSelectValueProps,
  MultiSelectSearchInputProps,
  MultiSelectPortalProps,
  MultiSelectContentProps,
  MultiSelectItemProps,
  MultiSelectCreateItemProps,
  MultiSelectItemTextProps,
  MultiSelectOptionsProps,
} from '@aura-ui/primitives';
export * as Combobox from './combobox';
export type {
  ComboboxRootProps,
  ComboboxInputProps,
  ComboboxPortalProps,
  ComboboxContentProps,
  ComboboxItemProps,
} from '@aura-ui/primitives';
export * as Command from './command';
export type {
  CommandRootProps,
  CommandInputProps,
  CommandItemProps,
  CommandGroupProps,
} from '@aura-ui/primitives';
export * from './material';

// Phase G: specialty form
export * as OneTimePasswordField from './one-time-password-field';
export type { OtpRootProps, OtpInputProps } from '@aura-ui/primitives';
export * as PasswordToggleField from './password-toggle-field';
export type { PasswordToggleFieldRootProps } from '@aura-ui/primitives';
export * as NumberField from './number-field';
export type { NumberFieldRootProps } from '@aura-ui/primitives';
export * from './calendar';
export { DatePicker } from './date-picker';
export type { DatePickerProps } from './date-picker';
export { TimePicker, TimePickerPanel } from './time-picker';
export type { TimePickerPanelProps, TimePickerProps } from './time-picker';
export { DateRangePicker } from './date-range-picker';
export type { DateRangePickerProps } from './date-range-picker';
export { DateTimePicker } from './date-time-picker';
export type { DateTimePickerProps } from './date-time-picker';
export * as ColorPicker from './color-picker';
export type { ColorPickerRootProps, HsvaColor } from '@aura-ui/primitives';
export * as FileUpload from './file-upload';
export type { FileUploadRootProps } from '@aura-ui/primitives';

// Phase H: feedback & misc
export * from './circular-progress';
export * from './meter';
export * as ScrollArea from './scroll-area';
export type { ScrollAreaRootProps, ScrollAreaScrollbarProps } from '@aura-ui/primitives';
export * as Toolbar from './toolbar';
export type { ToolbarRootProps } from '@aura-ui/primitives';
export * as Resizable from './resizable';
export type { ResizableGroupProps, ResizablePanelProps, ResizableHandleProps } from '@aura-ui/primitives';
export * as Carousel from './carousel';
export type { CarouselRootProps } from '@aura-ui/primitives';
export * as Tree from './tree';
export type { TreeRootProps, TreeItemProps } from '@aura-ui/primitives';
export * as Editable from './editable';
export type { EditableRootProps } from '@aura-ui/primitives';
export * as TagsInput from './tags-input';
export type { TagsInputRootProps } from '@aura-ui/primitives';
export * as Mentions from './mentions';
export type {
  MentionsRootProps,
  MentionSuggestion,
  MentionsSuggestionsProps,
} from '@aura-ui/primitives';
export * from './copy-button';

// Charts
export * as Chart from './chart';

/**
 * @aura-ui/primitives
 *
 * Headless, accessible React primitives. Behavior without styling.
 */

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
} from './dialog';

export * as Avatar from './avatar';
export type {
  AvatarRootProps,
  AvatarImageProps,
  AvatarFallbackProps,
  ImageLoadingStatus,
} from './avatar';

export * as Progress from './progress';
export type {
  ProgressRootProps,
  ProgressIndicatorProps,
  ProgressState,
} from './progress';

export * as RadioGroup from './radio-group';
export type {
  RadioGroupRootProps,
  RadioGroupItemProps,
  RadioGroupIndicatorProps,
} from './radio-group';

export * as ToggleGroup from './toggle-group';
export type {
  ToggleGroupRootProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
} from './toggle-group';

export * as Slider from './slider';
export type {
  SliderRootProps,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
} from './slider';

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
} from './form';

export * as Collapsible from './collapsible';
export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './collapsible';

export * as Accordion from './accordion';
export type {
  AccordionRootProps,
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './accordion';

export * as Tabs from './tabs';
export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './tabs';

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
} from './alert-dialog';

export * as Popover from './popover';
export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverContentProps,
  PopoverCloseProps,
  PopoverArrowProps,
} from './popover';

export * as Tooltip from './tooltip';
export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipContentProps,
  TooltipArrowProps,
} from './tooltip';

export * as HoverCard from './hover-card';
export type {
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardPortalProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './hover-card';

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
} from './toast';

// Phase F: complex compound
export * as Menu from './menu';
export type {
  MenuRootProps,
  MenuAnchorProps,
  MenuPortalProps,
  MenuContentProps,
  MenuItemProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuItemIndicatorProps,
  MenuSeparatorProps,
} from './menu';

export * as DropdownMenu from './dropdown-menu';
export type { DropdownMenuRootProps, DropdownMenuTriggerProps } from './dropdown-menu/dropdown-menu';

export * as ContextMenu from './context-menu';
export type { ContextMenuRootProps, ContextMenuTriggerProps } from './context-menu/context-menu';

export * as Menubar from './menubar';
export type { MenubarRootProps, MenubarTriggerProps } from './menubar/menubar';

export * as NavigationMenu from './navigation-menu';
export type {
  NavigationMenuRootProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
} from './navigation-menu/navigation-menu';

export * as Select from './select';
export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectPortalProps,
  SelectContentProps,
  SelectItemProps,
  SelectItemTextProps,
} from './select/select';

export * as Combobox from './combobox';
export type {
  ComboboxRootProps,
  ComboboxInputProps,
  ComboboxPortalProps,
  ComboboxContentProps,
  ComboboxItemProps,
} from './combobox/combobox';

export * as Command from './command';
export type {
  CommandRootProps,
  CommandInputProps,
  CommandItemProps,
  CommandGroupProps,
} from './command/command';

// Phase G: specialty form
export * as OneTimePasswordField from './one-time-password-field';
export type {
  OtpRootProps,
  OtpInputProps,
} from './one-time-password-field/one-time-password-field';

export * as PasswordToggleField from './password-toggle-field';
export type {
  PasswordToggleFieldRootProps,
} from './password-toggle-field/password-toggle-field';

export * as NumberField from './number-field';
export type { NumberFieldRootProps } from './number-field/number-field';

export * as Calendar from './calendar';
export type { CalendarRootProps } from './calendar/calendar';

export * as DatePicker from './date-picker';
export type { DatePickerRootProps } from './date-picker/date-picker';

export * as TimePicker from './time-picker';
export type {
  TimePickerRootProps,
  TimeValue,
  SegmentProps as TimePickerSegmentProps,
} from './time-picker/time-picker';

export * as DateRangePicker from './date-range-picker';
export type {
  DateRangePickerRootProps,
  DateRange,
} from './date-range-picker/date-range-picker';

export * as ColorPicker from './color-picker';
export type {
  ColorPickerRootProps,
  HsvaColor,
} from './color-picker/color-picker';
export { hsvaToHex } from './color-picker/color-picker';

export * as FileUpload from './file-upload';
export type { FileUploadRootProps } from './file-upload/file-upload';

// Phase H: feedback & misc
export * as ScrollArea from './scroll-area';
export type { ScrollAreaRootProps, ScrollbarProps as ScrollAreaScrollbarProps } from './scroll-area/scroll-area';

export * as Toolbar from './toolbar';
export type { ToolbarRootProps } from './toolbar/toolbar';

export * as Resizable from './resizable';
export type {
  ResizableGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './resizable/resizable';

export * as Carousel from './carousel';
export type { CarouselRootProps } from './carousel/carousel';

export * as Tree from './tree';
export type { TreeRootProps, TreeItemProps } from './tree/tree';

export * as Editable from './editable';
export type { EditableRootProps } from './editable/editable';

export * as TagsInput from './tags-input';
export type { TagsInputRootProps } from './tags-input/tags-input';

export * as Mentions from './mentions';
export type {
  MentionsRootProps,
  MentionSuggestion,
  SuggestionsProps as MentionsSuggestionsProps,
} from './mentions/mentions';

export * from './aspect-ratio';
export * from './switch';
export * from './toggle';
export * from './checkbox';
export * from './label';
export * from './separator';

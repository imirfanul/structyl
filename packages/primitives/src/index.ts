/**
 * @aura-ui/primitives
 *
 * Headless, accessible React primitives. Behavior without styling.
 */

export * from './button';
export type { ButtonProps } from './button';

export * from './rating';
export type { RatingProps } from './rating';

export * as Dialog from './dialog';
export type * from './dialog/dialog.types';

export * as Avatar from './avatar';
export type * from './avatar/avatar.types';

export * as Progress from './progress';
export type * from './progress/progress.types';

export * as RadioGroup from './radio-group';
export type * from './radio-group/radio-group.types';

export * as ToggleGroup from './toggle-group';
export type * from './toggle-group/toggle-group.types';

export * as Slider from './slider';
export type * from './slider/slider.types';

export * as Form from './form';
export type * from './form/form.types';

export * as Collapsible from './collapsible';
export type * from './collapsible/collapsible.types';

export * as Accordion from './accordion';
export type * from './accordion/accordion.types';

export * as Tabs from './tabs';
export type * from './tabs/tabs.types';

export * as AlertDialog from './alert-dialog';
export type * from './alert-dialog/alert-dialog.types';

export * as Popover from './popover';
export type * from './popover/popover.types';

export * as Tooltip from './tooltip';
export type * from './tooltip/tooltip.types';

export * as HoverCard from './hover-card';
export type * from './hover-card/hover-card.types';

export * as Toast from './toast';
export type * from './toast/toast.types';

// Phase F: complex compound
export * as Menu from './menu';
export type * from './menu/menu.types';

export * as DropdownMenu from './dropdown-menu';
export type {
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
} from './dropdown-menu/dropdown-menu';

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

export * as Breadcrumb from './breadcrumb';
export type { BreadcrumbProps } from './breadcrumb/breadcrumb';

export * as Pagination from './pagination';
export type * from './pagination/pagination.types';

export * as Stepper from './stepper';
export type * from './stepper/stepper.types';

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
} from './select/select';

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
} from './multi-select/multi-select';

export * as Material from './material';
export type {
  RatingProps as AuraRatingProps,
  ChartProps as AuraChartProps,
  BackdropProps as AuraBackdropProps,
  SnackbarProps as AuraSnackbarProps,
  SnackbarOrigin as AuraSnackbarOrigin,
  ModalProps as AuraModalProps,
  BottomNavigationRootProps as AuraBottomNavigationRootProps,
  BottomNavigationItemProps as AuraBottomNavigationItemProps,
  SpeedDialRootProps as AuraSpeedDialRootProps,
  SpeedDialTriggerProps as AuraSpeedDialTriggerProps,
  ClickAwayListenerProps as AuraClickAwayListenerProps,
  TextareaAutosizeProps as AuraTextareaAutosizeProps,
  TransitionProps as AuraTransitionProps,
  InitColorSchemeScriptProps as AuraInitColorSchemeScriptProps,
  TransferListProps as AuraTransferListProps,
  TransferListOption as AuraTransferListOption,
} from './material';

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
export type { PasswordToggleFieldRootProps } from './password-toggle-field/password-toggle-field';

export * as NumberField from './number-field';
export type { NumberFieldRootProps } from './number-field/number-field';

export * as Calendar from './calendar';
export type { CalendarDateRange, CalendarRootProps } from './calendar/calendar';

export * as DatePicker from './date-picker';
export type * from './date-picker/date-picker.types';

export * as TimePicker from './time-picker';
export type {
  TimePickerRootProps,
  TimePickerValue,
  TimePickerFormat,
  TimePickerViewRenderer,
  TimePickerSegment,
  TimeValue,
  SegmentProps as TimePickerSegmentProps,
  TimePickerValueProps,
} from './time-picker/time-picker.types';

export * as DateRangePicker from './date-range-picker';
export type * from './date-range-picker/date-range-picker.types';

export * as DateTimePicker from './date-time-picker';
export type {
  DateTimePickerRootProps,
  DateTimePickerFormat,
  DateTimePickerViewRenderer,
  DateTimePickerSegment,
  SegmentProps as DateTimePickerSegmentProps,
  TimePanelProps as DateTimePickerTimePanelProps,
  TimePanelRenderProps as DateTimePickerTimePanelRenderProps,
  DateTimePickerValueProps,
} from './date-time-picker/date-time-picker.types';
export type * from './picker-utils';

export * as ColorPicker from './color-picker';
export type { ColorPickerRootProps, HsvaColor } from './color-picker/color-picker';
export { hsvaToHex } from './color-picker/color-picker';

export * as FileUpload from './file-upload';
export type { FileUploadRootProps } from './file-upload/file-upload';

// Phase H: feedback & misc
export * as ScrollArea from './scroll-area';
export type {
  ScrollAreaRootProps,
  ScrollbarProps as ScrollAreaScrollbarProps,
} from './scroll-area/scroll-area';

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

export * as Card from './card';
export type * from './card/card.types';

export * from './aspect-ratio';
export * from './switch';
export * from './toggle';
export * from './checkbox';
export * from './label';
export * from './separator';
export * from './skeleton';
export { Skeleton } from './skeleton/skeleton';
export * from './spinner';
export { Spinner } from './spinner/spinner';
export type { SpinnerProps } from './spinner/spinner';
export { Badge } from './badge/badge';
export type { BadgeProps } from './badge/badge';
export * from './alert';
export * from './input';
export * from './textarea';

// Chart
export * as Chart from './chart';
export type * from './chart/chart.types';
export type {
  TreemapLayoutNode,
  FunnelLayoutSegment,
  GaugeArcData,
  CandlestickBar,
  HeatmapCell,
} from './chart/layout';
export type { BarRectProps } from './chart/paths';

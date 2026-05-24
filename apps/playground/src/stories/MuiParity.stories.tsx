import type { Meta, StoryObj } from '@storybook/react';
import {
  MuiAppBarExamplesStory,
  MuiAutocompleteExamplesStory,
  MuiBackdropExamplesStory,
  MuiBottomNavigationExamplesStory,
  MuiBoxExamplesStory,
  MuiButtonGroupExamplesStory,
  MuiChartExamplesStory,
  MuiChipExamplesStory,
  MuiClickAwayListenerExamplesStory,
  MuiContainerExamplesStory,
  MuiCssBaselineExamplesStory,
  MuiFloatingActionButtonExamplesStory,
  MuiGridExamplesStory,
  MuiImageListExamplesStory,
  MuiInitColorSchemeScriptExamplesStory,
  MuiLinkExamplesStory,
  MuiListExamplesStory,
  MuiMaterialPropsGalleryStory,
  MuiMasonryExamplesStory,
  MuiModalExamplesStory,
  MuiNoSsrExamplesStory,
  MuiPaperExamplesStory,
  MuiParityExamplesStory,
  MuiPopperExamplesStory,
  MuiPortalExamplesStory,
  MuiRatingExamplesStory,
  MuiSnackbarExamplesStory,
  MuiSpeedDialExamplesStory,
  MuiStackExamplesStory,
  MuiSvgIconExamplesStory,
  MuiTableExamplesStory,
  MuiTextareaAutosizeExamplesStory,
  MuiTimelineExamplesStory,
  MuiTransferListExamplesStory,
  MuiTransitionExamplesStory,
  MuiTypographyExamplesStory,
} from './MuiParityExamples';
import { MuiParityStory } from './story-fixtures';

const meta: Meta = { title: 'MUI Parity/All Missing Components', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <MuiParityStory /> };
export const AllExamples: Story = { render: () => <MuiParityExamplesStory /> };
export const PropsAndVariants: Story = { render: () => <MuiMaterialPropsGalleryStory /> };
export const Box: Story = { render: () => <MuiBoxExamplesStory /> };
export const Container: Story = { render: () => <MuiContainerExamplesStory /> };
export const Stack: Story = { render: () => <MuiStackExamplesStory /> };
export const Grid: Story = { render: () => <MuiGridExamplesStory /> };
export const Paper: Story = { render: () => <MuiPaperExamplesStory /> };
export const Typography: Story = { render: () => <MuiTypographyExamplesStory /> };
export const Link: Story = { render: () => <MuiLinkExamplesStory /> };
export const SvgIcon: Story = { render: () => <MuiSvgIconExamplesStory /> };
export const Chart: Story = { render: () => <MuiChartExamplesStory /> };
export const Chip: Story = { render: () => <MuiChipExamplesStory /> };
export const ButtonGroup: Story = { render: () => <MuiButtonGroupExamplesStory /> };
export const FloatingActionButton: Story = {
  render: () => <MuiFloatingActionButtonExamplesStory />,
};
export const Rating: Story = { render: () => <MuiRatingExamplesStory /> };
export const Autocomplete: Story = { render: () => <MuiAutocompleteExamplesStory /> };
export const TransferList: Story = { render: () => <MuiTransferListExamplesStory /> };
export const List: Story = { render: () => <MuiListExamplesStory /> };
export const ImageList: Story = { render: () => <MuiImageListExamplesStory /> };
export const Table: Story = { render: () => <MuiTableExamplesStory /> };
export const Backdrop: Story = { render: () => <MuiBackdropExamplesStory /> };
export const Snackbar: Story = { render: () => <MuiSnackbarExamplesStory /> };
export const Modal: Story = { render: () => <MuiModalExamplesStory /> };
export const AppBar: Story = { render: () => <MuiAppBarExamplesStory /> };
export const BottomNavigation: Story = { render: () => <MuiBottomNavigationExamplesStory /> };
export const SpeedDial: Story = { render: () => <MuiSpeedDialExamplesStory /> };
export const Masonry: Story = { render: () => <MuiMasonryExamplesStory /> };
export const Timeline: Story = { render: () => <MuiTimelineExamplesStory /> };
export const ClickAwayListener: Story = { render: () => <MuiClickAwayListenerExamplesStory /> };
export const NoSsr: Story = { render: () => <MuiNoSsrExamplesStory /> };
export const Portal: Story = { render: () => <MuiPortalExamplesStory /> };
export const Popper: Story = { render: () => <MuiPopperExamplesStory /> };
export const TextareaAutosize: Story = { render: () => <MuiTextareaAutosizeExamplesStory /> };
export const Transition: Story = { render: () => <MuiTransitionExamplesStory /> };
export const CssBaseline: Story = { render: () => <MuiCssBaselineExamplesStory /> };
export const InitColorSchemeScript: Story = {
  render: () => <MuiInitColorSchemeScriptExamplesStory />,
};

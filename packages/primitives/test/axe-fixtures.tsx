import * as React from 'react';
import * as Accordion from '../src/accordion';
import * as AlertDialog from '../src/alert-dialog';
import { AspectRatio } from '../src/aspect-ratio';
import * as Avatar from '../src/avatar';
import * as Calendar from '../src/calendar';
import * as Carousel from '../src/carousel';
import { Checkbox, CheckboxIndicator } from '../src/checkbox';
import * as Collapsible from '../src/collapsible';
import * as ColorPicker from '../src/color-picker';
import * as Combobox from '../src/combobox';
import * as Command from '../src/command';
import * as ContextMenu from '../src/context-menu';
import * as DatePicker from '../src/date-picker';
import * as DateTimePicker from '../src/date-time-picker';
import * as DateRangePicker from '../src/date-range-picker';
import * as Dialog from '../src/dialog';
import * as DropdownMenu from '../src/dropdown-menu';
import * as Editable from '../src/editable';
import * as FileUpload from '../src/file-upload';
import * as Form from '../src/form';
import * as HoverCard from '../src/hover-card';
import { Label } from '../src/label';
import * as Mentions from '../src/mentions';
import * as Menu from '../src/menu';
import * as Menubar from '../src/menubar';
import * as NavigationMenu from '../src/navigation-menu';
import * as NumberField from '../src/number-field';
import * as OneTimePasswordField from '../src/one-time-password-field';
import * as PasswordToggleField from '../src/password-toggle-field';
import * as Popover from '../src/popover';
import * as Progress from '../src/progress';
import * as RadioGroup from '../src/radio-group';
import * as Resizable from '../src/resizable';
import * as ScrollArea from '../src/scroll-area';
import * as Select from '../src/select';
import { Separator } from '../src/separator';
import * as Slider from '../src/slider';
import * as Tabs from '../src/tabs';
import * as TagsInput from '../src/tags-input';
import * as TimePicker from '../src/time-picker';
import * as Toast from '../src/toast';
import * as ToggleGroup from '../src/toggle-group';
import { Toggle } from '../src/toggle';
import * as Toolbar from '../src/toolbar';
import * as Tooltip from '../src/tooltip';
import * as Tree from '../src/tree';

const January2024 = new Date(2024, 0, 15);
const January2024RangeEnd = new Date(2024, 0, 19);
const uploadFile = new File(['hello'], 'hello.txt', { type: 'text/plain' });
const mentionSuggestions = [
  { id: 'ada', label: 'ada' },
  { id: 'grace', label: 'grace' },
];

function ensureResizeObserver() {
  if (typeof globalThis.ResizeObserver !== 'undefined') return;

  Object.defineProperty(globalThis, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value: class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });
}

function CalendarFixture({ mode = 'single' }: { mode?: 'single' | 'range' | 'multiple' }) {
  return (
    <Calendar.Root
      mode={mode}
      defaultMonth={January2024}
      defaultSelected={mode === 'range' ? { from: January2024 } : January2024}
    >
      <Calendar.Header>
        <Calendar.PreviousButton>Previous</Calendar.PreviousButton>
        <Calendar.Heading />
        <Calendar.NextButton>Next</Calendar.NextButton>
      </Calendar.Header>
      <Calendar.Grid aria-label="January 2024">
        <Calendar.GridHead />
        <Calendar.GridBody>
          {(date, props) => (
            <Calendar.Day
              date={date}
              isOutsideMonth={props.isOutsideMonth}
              aria-label={date.toDateString()}
            />
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar.Root>
  );
}

export function renderAccordionAxeFixture() {
  return (
    <Accordion.Root type="single" defaultValue="details" collapsible>
      <Accordion.Item value="details">
        <Accordion.Header>
          <Accordion.Trigger>Details</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Accessible accordion content.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export function renderAlertDialogAxeFixture() {
  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Trigger>Delete item</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete item?</AlertDialog.Title>
        <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Delete</AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export function renderAspectRatioAxeFixture() {
  return <AspectRatio ratio={16 / 9}>Media preview</AspectRatio>;
}

export function renderAvatarAxeFixture() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://example.com/avatar.png" alt="Ada Lovelace" />
      <Avatar.Fallback>Ada Lovelace</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function renderCalendarAxeFixture() {
  return <CalendarFixture />;
}

export function renderCarouselAxeFixture() {
  return (
    <Carousel.Root aria-label="Featured examples">
      <Carousel.Viewport>
        <Carousel.Container>
          <Carousel.Slide>First slide</Carousel.Slide>
          <Carousel.Slide>Second slide</Carousel.Slide>
        </Carousel.Container>
      </Carousel.Viewport>
      <Carousel.Previous>Previous slide</Carousel.Previous>
      <Carousel.Next>Next slide</Carousel.Next>
    </Carousel.Root>
  );
}

export function renderCheckboxAxeFixture() {
  return (
    <Checkbox aria-label="Accept terms" defaultChecked>
      <CheckboxIndicator aria-hidden>Checked</CheckboxIndicator>
    </Checkbox>
  );
}

export function renderCollapsibleAxeFixture() {
  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
      <Collapsible.Content>Collapsible content.</Collapsible.Content>
    </Collapsible.Root>
  );
}

export function renderColorPickerAxeFixture() {
  return (
    <ColorPicker.Root aria-label="Brand color">
      <ColorPicker.Area>
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="h" />
      <ColorPicker.ChannelSlider channel="a" />
      <ColorPicker.Swatch role="img" aria-label="Selected color" />
    </ColorPicker.Root>
  );
}

export function renderComboboxAxeFixture() {
  return (
    <Combobox.Root defaultOpen defaultValue="react">
      <Combobox.Input aria-label="Framework" />
      <Combobox.Content>
        <Combobox.Item value="react">React</Combobox.Item>
        <Combobox.Item value="vue">Vue</Combobox.Item>
      </Combobox.Content>
    </Combobox.Root>
  );
}

export function renderCommandAxeFixture() {
  return (
    <Command.Root aria-label="Command menu">
      <Command.Input aria-label="Search commands" />
      <Command.List>
        <Command.Group heading="Actions">
          <Command.Item value="new">New file</Command.Item>
          <Command.Item value="open">Open file</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
}

export function renderContextMenuAxeFixture() {
  return (
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger>Right click area</ContextMenu.Trigger>
      <ContextMenu.Content forceMount>
        <ContextMenu.Item>Reload</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Inspect</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

export function renderDatePickerAxeFixture() {
  return (
    <DatePicker.Root defaultOpen defaultValue={January2024}>
      <DatePicker.Trigger>
        <DatePicker.Value />
      </DatePicker.Trigger>
      <DatePicker.Content aria-label="Choose date">
        <DatePicker.Calendar defaultMonth={January2024}>
          <Calendar.Header>
            <Calendar.PreviousButton>Previous</Calendar.PreviousButton>
            <Calendar.Heading />
            <Calendar.NextButton>Next</Calendar.NextButton>
          </Calendar.Header>
          <Calendar.Grid aria-label="January 2024">
            <Calendar.GridHead />
            <Calendar.GridBody>
              {(date, props) => (
                <Calendar.Day
                  date={date}
                  isOutsideMonth={props.isOutsideMonth}
                  aria-label={date.toDateString()}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </DatePicker.Calendar>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}

export function renderDateRangePickerAxeFixture() {
  return (
    <DateRangePicker.Root
      defaultOpen
      defaultValue={{ from: January2024, to: January2024RangeEnd }}
    >
      <DateRangePicker.Trigger>
        <DateRangePicker.Value />
      </DateRangePicker.Trigger>
      <DateRangePicker.Content aria-label="Choose date range">
        <DateRangePicker.Calendar defaultMonth={January2024}>
          <Calendar.Header>
            <Calendar.PreviousButton>Previous</Calendar.PreviousButton>
            <Calendar.Heading />
            <Calendar.NextButton>Next</Calendar.NextButton>
          </Calendar.Header>
          <Calendar.Grid aria-label="January 2024">
            <Calendar.GridHead />
            <Calendar.GridBody>
              {(date, props) => (
                <Calendar.Day
                  date={date}
                  isOutsideMonth={props.isOutsideMonth}
                  aria-label={date.toDateString()}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </DateRangePicker.Calendar>
      </DateRangePicker.Content>
    </DateRangePicker.Root>
  );
}

export function renderDialogAxeFixture() {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Preferences</Dialog.Title>
        <Dialog.Description>Change your profile preferences.</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function renderDropdownMenuAxeFixture() {
  return (
    <DropdownMenu.Root defaultOpen modal={false}>
      <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function renderEditableAxeFixture() {
  return (
    <Editable.Root defaultValue="Quarterly report">
      <Editable.Preview />
      <Editable.Input aria-label="Editable title" />
    </Editable.Root>
  );
}

export function renderFileUploadAxeFixture() {
  return (
    <FileUpload.Root defaultValue={[uploadFile]}>
      <FileUpload.Input aria-label="Upload files" />
      <FileUpload.Dropzone aria-label="Drop files here">Drop files here</FileUpload.Dropzone>
      <FileUpload.Trigger>Choose file</FileUpload.Trigger>
      <FileUpload.List>
        <FileUpload.Item file={uploadFile} />
      </FileUpload.List>
      <FileUpload.Clear>Clear files</FileUpload.Clear>
    </FileUpload.Root>
  );
}

export function renderFormAxeFixture() {
  return (
    <Form.Root>
      <Form.Field name="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" required />
        <Form.Message forceMatch>Please enter an email address.</Form.Message>
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form.Root>
  );
}

export function renderHoverCardAxeFixture() {
  return (
    <HoverCard.Root defaultOpen>
      <HoverCard.Trigger href="https://example.com">Profile</HoverCard.Trigger>
      <HoverCard.Content>
        <p>A short profile preview.</p>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

export function renderLabelAxeFixture() {
  return (
    <div>
      <Label htmlFor="label-fixture">Name</Label>
      <input id="label-fixture" />
    </div>
  );
}

export function renderMentionsAxeFixture() {
  return (
    <Mentions.Root defaultValue="@a">
      <Mentions.Textarea aria-label="Comment" />
      <Mentions.Suggestions items={mentionSuggestions}>
        <Mentions.Items>
          {(item, index, highlighted) => (
            <Mentions.Item key={item.id} suggestion={item} index={index}>
              {highlighted ? `${item.label} selected` : item.label}
            </Mentions.Item>
          )}
        </Mentions.Items>
      </Mentions.Suggestions>
    </Mentions.Root>
  );
}

export function renderMenuAxeFixture() {
  return (
    <Menu.Root open modal={false}>
      <Menu.Anchor>Menu anchor</Menu.Anchor>
      <Menu.Content>
        <Menu.Item>New file</Menu.Item>
        <Menu.CheckboxItem checked>Show sidebar</Menu.CheckboxItem>
        <Menu.RadioGroup value="small">
          <Menu.RadioItem value="small">Small</Menu.RadioItem>
          <Menu.RadioItem value="large">Large</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export function renderMenubarAxeFixture() {
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  );
}

export function renderNavigationMenuAxeFixture() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
          <NavigationMenu.Content>Documentation links</NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Indicator />
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

export function renderNumberFieldAxeFixture() {
  return (
    <NumberField.Root defaultValue={5} min={0} max={10}>
      <NumberField.Input aria-label="Quantity" />
      <NumberField.DecrementTrigger>Decrease</NumberField.DecrementTrigger>
      <NumberField.IncrementTrigger>Increase</NumberField.IncrementTrigger>
    </NumberField.Root>
  );
}

export function renderOneTimePasswordFieldAxeFixture() {
  return (
    <OneTimePasswordField.Root length={4} defaultValue="12">
      <OneTimePasswordField.Input index={0} aria-label="Digit 1" />
      <OneTimePasswordField.Input index={1} aria-label="Digit 2" />
      <OneTimePasswordField.Input index={2} aria-label="Digit 3" />
      <OneTimePasswordField.Input index={3} aria-label="Digit 4" />
      <OneTimePasswordField.HiddenInput name="code" />
    </OneTimePasswordField.Root>
  );
}

export function renderPasswordToggleFieldAxeFixture() {
  return (
    <PasswordToggleField.Root>
      <PasswordToggleField.Input aria-label="Password" />
      <PasswordToggleField.Toggle>
        <PasswordToggleField.Icon visible="Hide" hidden="Show" />
      </PasswordToggleField.Toggle>
    </PasswordToggleField.Root>
  );
}

export function renderPopoverAxeFixture() {
  return (
    <Popover.Root defaultOpen>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Content aria-label="Popover content">
        <p>Helpful contextual content.</p>
        <Popover.Close>Close</Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
}

export function renderProgressAxeFixture() {
  return (
    <Progress.Root value={45} max={100} aria-label="Upload progress">
      <Progress.Indicator />
    </Progress.Root>
  );
}

export function renderRadioGroupAxeFixture() {
  return (
    <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
      <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
      <RadioGroup.Item value="comfortable">
        Comfortable
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

export function renderResizableAxeFixture() {
  ensureResizeObserver();

  return (
    <Resizable.Group>
      <Resizable.Panel id="sidebar">Sidebar</Resizable.Panel>
      <Resizable.Handle between={['sidebar', 'main']} aria-label="Resize panels" />
      <Resizable.Panel id="main">Main content</Resizable.Panel>
    </Resizable.Group>
  );
}

export function renderScrollAreaAxeFixture() {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <p>Scrollable content</p>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

export function renderSelectAxeFixture() {
  return (
    <Select.Root defaultOpen defaultValue="react">
      <Select.Trigger aria-label="Framework">
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="react">
            <Select.ItemText>React</Select.ItemText>
          </Select.Item>
          <Select.Item value="vue">
            <Select.ItemText>Vue</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

export function renderSeparatorAxeFixture() {
  return <Separator aria-label="Section divider" />;
}

export function renderSliderAxeFixture() {
  return (
    <Slider.Root defaultValue={[40]}>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb aria-label="Volume" />
    </Slider.Root>
  );
}

export function renderTabsAxeFixture() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List aria-label="Account sections">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Account settings</Tabs.Content>
      <Tabs.Content value="password">Password settings</Tabs.Content>
    </Tabs.Root>
  );
}

export function renderTagsInputAxeFixture() {
  return (
    <TagsInput.Root defaultValue={['react']}>
      <TagsInput.Items>
        {(tag, index) => (
          <TagsInput.Tag key={tag} index={index} />
        )}
      </TagsInput.Items>
      <TagsInput.Input aria-label="Tags" />
    </TagsInput.Root>
  );
}

export function renderTimePickerAxeFixture() {
  return (
    <TimePicker.Root defaultValue={{ hour: 9, minute: 30, second: 0, period: 'am' }} hour12>
      <TimePicker.Segment segment="hour" />
      <span aria-hidden>:</span>
      <TimePicker.Segment segment="minute" />
      <TimePicker.Segment segment="period" />
    </TimePicker.Root>
  );
}

export function renderDateTimePickerAxeFixture() {
  return (
    <DateTimePicker.Root defaultOpen defaultValue={January2024}>
      <DateTimePicker.Trigger>
        <DateTimePicker.Value />
      </DateTimePicker.Trigger>
      <DateTimePicker.Content aria-label="Choose date and time">
        <DateTimePicker.Calendar defaultMonth={January2024}>
          <Calendar.Header>
            <Calendar.PreviousButton>Previous</Calendar.PreviousButton>
            <Calendar.Heading />
            <Calendar.NextButton>Next</Calendar.NextButton>
          </Calendar.Header>
          <Calendar.Grid aria-label="January 2024">
            <Calendar.GridHead />
            <Calendar.GridBody>
              {(date, props) => (
                <Calendar.Day
                  date={date}
                  isOutsideMonth={props.isOutsideMonth}
                  aria-label={date.toDateString()}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </DateTimePicker.Calendar>
        <DateTimePicker.Segment segment="hour" />
        <DateTimePicker.Segment segment="minute" />
      </DateTimePicker.Content>
    </DateTimePicker.Root>
  );
}

export function renderToastAxeFixture() {
  return (
    <Toast.Provider>
      <Toast.Viewport>
        <Toast.Root open>
          <Toast.Title>Saved</Toast.Title>
          <Toast.Description>Your changes were saved.</Toast.Description>
          <Toast.Action altText="Undo saving changes">Undo</Toast.Action>
          <Toast.Close>Dismiss</Toast.Close>
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>
  );
}

export function renderToggleGroupAxeFixture() {
  return (
    <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export function renderToggleAxeFixture() {
  return <Toggle aria-label="Bold" defaultPressed />;
}

export function renderToolbarAxeFixture() {
  return (
    <Toolbar.Root aria-label="Editor toolbar">
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Link href="#help">Help</Toolbar.Link>
    </Toolbar.Root>
  );
}

export function renderTooltipAxeFixture() {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful tooltip content.</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function renderTreeAxeFixture() {
  return (
    <Tree.Root defaultExpanded={['docs']} defaultSelected="intro">
      <Tree.Item id="docs" hasChildren>
        <Tree.Trigger>Docs</Tree.Trigger>
        <Tree.Group>
          <Tree.Item id="intro" level={2}>
            <Tree.Trigger>Introduction</Tree.Trigger>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree.Root>
  );
}

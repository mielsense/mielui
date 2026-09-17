/**
 * Public entry for `@mielui/svelte`.
 *
 * Single-element components are re-exported by name:
 *   import { Button } from '@mielui/svelte';
 *
 * Compound components are re-exported as a namespace so their parts stay
 * grouped:
 *   import { AlertDialog } from '@mielui/svelte';
 *   <AlertDialog.Root> … </AlertDialog.Root>
 *
 * Every component is also reachable directly at
 * `@mielui/svelte/components/<name>` for finer-grained imports.
 */

// ─── Single-element components ───────────────────────────────────────
export { default as BrandMark } from './brand-mark.svelte';

export type BrandMarkProps = {
    size?: number;
    class?: string;
    label?: string;
};

export type {
    AttachmentItemProps,
    AttachmentListProps,
    AttachmentProps,
    AttachmentRejection,
    AttachmentRejectionCode,
    AttachmentStatus,
    AttachmentTriggerProps
} from './ai-components/attachment';
export * as Attachment from './ai-components/attachment';
export type {
    ComposerActionsProps,
    ComposerInputProps,
    ComposerProps,
    ComposerStatus,
    ComposerSubmitAction,
    ComposerSubmitProps,
    ComposerSubmitState,
    ComposerToolbarProps
} from './ai-components/composer';
export * as Composer from './ai-components/composer';
export type {
    ConversationContentProps,
    ConversationEmptyProps,
    ConversationRootProps,
    ConversationScrollButtonProps
} from './ai-components/conversation';
export * as Conversation from './ai-components/conversation';
export type {
    MessageActionsProps,
    MessageAvatarProps,
    MessageBodyProps,
    MessageContentProps,
    MessageFrom,
    MessageMetadataProps,
    MessageNameProps,
    MessageRootProps,
    MessageStatus,
    MessageStatusProps,
    MessageTimeProps
} from './ai-components/message';
export * as Message from './ai-components/message';
export type {
    QuestionActionProps,
    QuestionActionsProps,
    QuestionAnswer,
    QuestionDescriptionProps,
    QuestionInputProps,
    QuestionOptionProps,
    QuestionOptionsProps,
    QuestionProps,
    QuestionStatus,
    QuestionSubmitProps,
    QuestionTitleProps,
    QuestionType
} from './ai-components/question';
export * as Question from './ai-components/question';
export type {
    ReasoningContentProps,
    ReasoningRootProps,
    ReasoningTriggerProps,
    ReasoningTriggerState
} from './ai-components/reasoning';
export * as Reasoning from './ai-components/reasoning';
export type { ResponseStreamProps } from './ai-components/response-stream';
export { ResponseStream } from './ai-components/response-stream';
export type {
    ToolContentProps,
    ToolInputProps,
    ToolItemProps,
    ToolOutputProps,
    ToolProps,
    ToolState,
    ToolTriggerProps,
    ToolTriggerState,
    ToolVariant
} from './ai-components/tool';
export * as Tool from './ai-components/tool';
export type {
    CodeBlockActionsProps,
    CodeBlockContentProps,
    CodeBlockCopyPlacement,
    CodeBlockCopyProps,
    CodeBlockHeaderProps,
    CodeBlockListProps,
    CodeBlockProps,
    CodeBlockTab,
    CodeBlockTheme,
    CodeBlockTriggerProps
} from './blocks/code-block';
export { CodeBlock } from './blocks/code-block';
export type {
    ColorFormat,
    ColorOption,
    ColorPickerChannelsProps,
    ColorPickerContentProps,
    ColorPickerHexInputProps,
    ColorPickerHueProps,
    ColorPickerPlaneProps,
    ColorPickerPresetsProps,
    ColorPickerPreviewProps,
    ColorPickerProps
} from './blocks/color-picker';
export * as ColorPicker from './blocks/color-picker';
export type {
    CommandItem,
    CommandItemProps,
    CommandProps,
    CommandResultsProps,
    CommandSearchProps
} from './blocks/command';
export * as Command from './blocks/command';
export type { CopyButtonProps } from './blocks/copy-button';
export { CopyButton } from './blocks/copy-button';
export type {
    DataTableBodyProps,
    DataTableColumnHeaderProps,
    DataTableEmptyProps,
    DataTableFacetProps,
    DataTableFilterClause,
    DataTableFilterDefinition,
    DataTableFilterProps,
    DataTableFiltersProps,
    DataTableHeaderProps,
    DataTablePaginationProps,
    DataTableProps,
    DataTableSelectionProps,
    DataTableSortProps,
    DataTableState,
    DataTableSummaryProps,
    DataTableToolbarProps,
    DataTableViewProps
} from './blocks/data-table';
export * as DataTable from './blocks/data-table';
export { dataTableFilter } from './blocks/data-table';
export type {
    FileDiffChangeType,
    FileDiffContentProps,
    FileDiffContext,
    FileDiffLine,
    FileDiffLineNumberProps,
    FileDiffRootProps,
    FileDiffRowProps,
    FileDiffTheme,
    FileDiffTopBarProps
} from './blocks/file-diff';
export * as FileDiff from './blocks/file-diff';
export type { MarkdownProps } from './blocks/markdown';
export { Markdown } from './blocks/markdown';
export type {
    ReorderListContentProps,
    ReorderListHandleProps,
    ReorderListItemProps,
    ReorderListProps
} from './blocks/reorder-list';
export { ReorderList } from './blocks/reorder-list';
export type { ShowMoreProps } from './blocks/show-more';
export { ShowMore } from './blocks/show-more';
export type {
    TaskStep,
    TaskStepStatus,
    TaskStepsIndicatorProps,
    TaskStepsItemProps,
    TaskStepsLabelProps,
    TaskStepsListProps,
    TaskStepsMetaProps,
    TaskStepsProps,
    TaskStepsState,
    TaskStepsSummaryProps
} from './blocks/task-steps';
export { TaskSteps } from './blocks/task-steps';
export type {
    ToastAction,
    ToastFn,
    ToastState,
    ToastType,
    ToastUIState
} from './blocks/toast';
// Toast ships a component plus its imperative helpers.
export { getToastUIState, Toast, Toaster, toast } from './blocks/toast';
export type {
    ToolbarButtonProps,
    ToolbarGroupProps,
    ToolbarItemProps,
    ToolbarLinkProps,
    ToolbarProps,
    ToolbarRootProps
} from './blocks/toolbar';
export { Toolbar } from './blocks/toolbar';
export type { GaugeProps, GaugeTone } from './chart-components/gauge';
export { Gauge } from './chart-components/gauge';
export * as Heatmap from './chart-components/heatmap';
export type {
    AccordionContentProps,
    AccordionItemProps,
    AccordionProps,
    AccordionTriggerProps
} from './components/accordion';
// ─── Compound components (namespaced) ────────────────────────────────
export * as Accordion from './components/accordion';
export type {
    AlertDescriptionProps,
    AlertProps,
    AlertTitleProps,
    AlertVariant
} from './components/alert';
export * as Alert from './components/alert';
export type {
    AlertDialogActionProps,
    AlertDialogContentProps,
    AlertDialogProps
} from './components/alert-dialog';
export * as AlertDialog from './components/alert-dialog';
export type { AvatarFallbackProps, AvatarImageProps, AvatarProps } from './components/avatar';
export * as Avatar from './components/avatar';
export type { BadgeProps, BadgeVariant } from './components/badge';
export { Badge } from './components/badge';
export type {
    BreadcrumbItemProps,
    BreadcrumbProps,
    BreadcrumbSeparatorProps
} from './components/breadcrumb';
export * as Breadcrumb from './components/breadcrumb';
export type { ButtonProps, ButtonStatus, ButtonVariant } from './components/button';
export { Button } from './components/button';
export type { CalendarMonthProps, CalendarProps } from './components/calendar';
export * as Calendar from './components/calendar';
export type {
    CardContentProps,
    CardDescriptionProps,
    CardFooterProps,
    CardHeaderProps,
    CardProps,
    CardTitleProps
} from './components/card';
export * as Card from './components/card';
export type { CheckboxProps } from './components/checkbox';
export { Checkbox } from './components/checkbox';
export type {
    CollapsibleContentProps,
    CollapsibleProps,
    CollapsibleTriggerProps
} from './components/collapsible';
export * as Collapsible from './components/collapsible';
export type { ComboboxItem, ComboboxRootProps, ComboboxTriggerProps } from './components/combobox';
export * as Combobox from './components/combobox';
export type {
    ContextMenuCheckboxItemProps,
    ContextMenuContentProps,
    ContextMenuItemProps,
    ContextMenuProps,
    ContextMenuSeparatorProps,
    ContextMenuSubContentProps,
    ContextMenuSubProps,
    ContextMenuSubTriggerProps,
    ContextMenuTriggerProps
} from './components/context-menu';
export * as ContextMenu from './components/context-menu';
export type { DatePickerContentProps, DatePickerProps } from './components/date-picker';
export * as DatePicker from './components/date-picker';
export type { DateRangePickerProps } from './components/date-range-picker';
export * as DateRangePicker from './components/date-range-picker';
export type {
    DialogBodyProps,
    DialogCloseProps,
    DialogConfirmProps,
    DialogContentProps,
    DialogDescriptionProps,
    DialogFooterProps,
    DialogHeaderProps,
    DialogOrientation,
    DialogProps,
    DialogSize,
    DialogTitleProps,
    DialogTriggerProps
} from './components/dialog';
export * as Dialog from './components/dialog';
export type {
    DrawerCloseProps,
    DrawerContentProps,
    DrawerDescriptionProps,
    DrawerHandleProps,
    DrawerOverlayProps,
    DrawerPortalProps,
    DrawerRegionProps,
    DrawerRootProps,
    DrawerTitleProps,
    DrawerTriggerProps
} from './components/drawer';
export * as Drawer from './components/drawer';
export type {
    DropdownMenuCheckboxItemProps,
    DropdownMenuItemProps,
    DropdownMenuProps,
    DropdownMenuRadioGroupProps,
    DropdownMenuRadioItemProps
} from './components/dropdown-menu';
export * as DropdownMenu from './components/dropdown-menu';
export type {
    FieldContentProps,
    FieldControlAttributes,
    FieldControlProps,
    FieldDescriptionProps,
    FieldErrorProps,
    FieldGroupProps,
    FieldIssue,
    FieldLabelProps,
    FieldProps
} from './components/field';
export * as Field from './components/field';
export type {
    FieldsetDescriptionProps,
    FieldsetLegendProps,
    FieldsetProps
} from './components/fieldset';
export * as Fieldset from './components/fieldset';
export type {
    FormActionsProps,
    FormErrorSummaryProps,
    FormIssue,
    FormProps,
    FormStatusProps,
    FormSubmitProps
} from './components/form';
export * as Form from './components/form';
export * as Group from './components/group';
export type {
    HoverCardContentProps,
    HoverCardProps,
    HoverCardTriggerProps
} from './components/hover-card';
export * as HoverCard from './components/hover-card';
export type { InputProps } from './components/input';
export { Input } from './components/input';
export type { KbdProps } from './components/kbd';
export { Kbd } from './components/kbd';
export type { LabelProps } from './components/label';
export { Label } from './components/label';
export * as NativeSelect from './components/native-select';
export type {
    NumberFieldGroupProps,
    NumberFieldInputProps,
    NumberFieldLabelProps,
    NumberFieldProps,
    NumberFieldStepperProps
} from './components/number-field';
export * as NumberField from './components/number-field';
export type {
    OTPFieldCellProps,
    OTPFieldCellState,
    OTPFieldGroupProps,
    OTPFieldProps,
    OTPFieldSeparatorProps
} from './components/otp-field';
export * as OTPField from './components/otp-field';
export type { PaginationProps } from './components/pagination';
export { Pagination } from './components/pagination';
export type {
    Placement,
    PopoverContentProps,
    PopoverProps,
    PopoverTitleProps,
    PopoverTriggerProps
} from './components/popover';
export * as Popover from './components/popover';
export type { ProgressProps } from './components/progress';
export { Progress } from './components/progress';
export type { RadioGroupItemProps, RadioGroupProps } from './components/radio-group';
export * as RadioGroup from './components/radio-group';
export type { RangeCalendarMonthProps, RangeCalendarProps } from './components/range-calendar';
export * as RangeCalendar from './components/range-calendar';
export type { ScrollAreaProps } from './components/scroll-area';
export { ScrollArea } from './components/scroll-area';
export type { SelectItemProps, SelectProps, SelectValueProps } from './components/select';
export * as Select from './components/select';
export type { SeparatorProps } from './components/separator';
export { Separator } from './components/separator';
export type {
    SheetCloseProps,
    SheetContentProps,
    SheetDescriptionProps,
    SheetFooterProps,
    SheetHeaderProps,
    SheetProps,
    SheetTitleProps,
    SheetTriggerProps
} from './components/sheet';
export * as Sheet from './components/sheet';
export type { SkeletonProps, SkeletonSwapProps } from './components/skeleton';
export { Skeleton, SkeletonSwap } from './components/skeleton';
export type { SliderProps } from './components/slider';
export { Slider } from './components/slider';
export type { SpinnerProps } from './components/spinner';
export { Spinner } from './components/spinner';
export type { SwitchProps } from './components/switch';
export { Switch } from './components/switch';
export * as Table from './components/table';
export type {
    TabsContentProps,
    TabsListProps,
    TabsProps,
    TabsTriggerProps,
    TabsVariant
} from './components/tabs';
export * as Tabs from './components/tabs';
export type {
    TagInputInputProps,
    TagInputListProps,
    TagInputProps,
    TagInputRejection,
    TagInputRejectionCode,
    TagInputTagProps,
    TagInputVariant
} from './components/tag-input';
export * as TagInput from './components/tag-input';
export type { TextareaProps } from './components/textarea';
export { Textarea } from './components/textarea';
export type { ToggleProps } from './components/toggle';
export { Toggle } from './components/toggle';
export type { ToggleGroupItemProps, ToggleGroupProps } from './components/toggle-group';
export * as ToggleGroup from './components/toggle-group';
export type {
    TooltipContentProps,
    TooltipPlacement,
    TooltipProps,
    TooltipProviderProps,
    TooltipTriggerProps
} from './components/tooltip';
export * as Tooltip from './components/tooltip';
export type {
    HeadingLevel,
    HeadingTag,
    TypographyDescriptionProps,
    TypographyHeadingProps,
    TypographyInlineCodeProps,
    TypographyMetadataProps,
    TypographyTextProps,
    TypographyTextVariant,
    TypographyTitleProps
} from './components/typography';
export * as Typography from './components/typography';
export { default as HugeiconsIcon } from './hugeicons-icon.svelte';

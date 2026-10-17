import type { Cell, Header, Row, RowData, Table, TableFeatures } from '@tanstack/svelte-table';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLInputAttributes, HTMLTableAttributes } from 'svelte/elements';
export type DataTableState<TFeatures extends TableFeatures, TData extends RowData> = {
    table: Table<TFeatures, TData>;
    rows: Row<TFeatures, TData>[];
    total: number;
    selected: number;
};
export type DataTableViewProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLTableAttributes,
    'children'
> & {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
    /** Adds a selection checkbox column. */
    selectable?: boolean;
    /** Accessible caption that describes the table. */
    caption?: string;
    /** Returns a row's name, used in its selection checkbox's accessible name. */
    rowLabel?: (row: Row<TFeatures, TData>) => string;
    /** Renders a column header. */
    header?: Snippet<[Header<TFeatures, TData, unknown>]>;
    /** Renders a cell. Defaults to the column's cell definition. */
    cell?: Snippet<[Cell<TFeatures, TData, unknown>]>;
    /** Content shown when there are no rows. It receives the loading state. */
    empty?: Snippet<[{ loading: boolean }]>;
};
export type DataTableLabels = {
    /** Accessible name of the table when it has no `caption`. */
    region?: string;
    /** Text of the empty row while loading. */
    loading?: string;
    /** Text of the empty row when nothing matches. */
    empty?: string;
    /** Name of a row when `rowLabel` is not set. */
    row?: (id: string) => string;
    /** Accessible name of a row's selection checkbox, given the row's name. */
    selectRow?: (row: string) => string;
    /** Accessible name of the header checkbox that selects every row on the page. */
    selectPage?: string;
    /** Accessible name of the pagination group. */
    pages?: string;
    /** Pagination text when there are no pages. */
    noPages?: string;
    /** Pagination text for the current page. `pageCount` is undefined when the count is unknown. */
    page?: (page: number, pageCount: number | undefined) => string;
    /** Summary text for the row count, such as 12 rows. */
    rows?: (count: number) => string;
    /** Summary text for the selection, such as 3 selected. */
    selected?: (selected: number, total: number) => string;
    /** Sort button text when no column is sorted. */
    sort?: string;
    /** Accessible name of the sort button. */
    sortResults?: string;
    /** Sort button text when a column is sorted, given the column name. */
    sortedBy?: (column: string) => string;
    /** Heading of the sort menu's column list. */
    sortBy?: string;
    /** Sort menu item for ascending order. */
    ascending?: string;
    /** Sort menu item for descending order. */
    descending?: string;
    /** Tooltip on a column header whose next click sorts ascending. */
    sortAscending?: string;
    /** Tooltip on a column header whose next click sorts descending. */
    sortDescending?: string;
    /** Tooltip on a column header whose next click removes the sort, and the Sort menu item. */
    clearSorting?: string;
    /** Accessible name of the filter group. */
    filters?: string;
    /** Text of the button that adds a filter. */
    filter?: string;
    /** Heading of the add-filter menu. */
    filterBy?: string;
    /** Operator option that matches text containing the value. */
    contains?: string;
    /** Operator option that matches the exact value. */
    equals?: string;
    /** Operator option that excludes the exact value. */
    not?: string;
    /** Operator option that matches any selected option. */
    anyOf?: string;
    /** Operator option that excludes every selected option. */
    noneOf?: string;
    /** Operator option that matches a range. */
    between?: string;
    /** Number operator option for a lower bound. */
    atLeast?: string;
    /** Number operator option for an upper bound. */
    atMost?: string;
    /** Date operator option for a lower bound. */
    onOrAfter?: string;
    /** Date operator option for an upper bound. */
    onOrBefore?: string;
    /** Placeholder of a text filter's value input. */
    valuePlaceholder?: string;
    /** Placeholder of a range filter's lower bound. */
    minimum?: string;
    /** Placeholder of a range filter's upper bound. */
    maximum?: string;
    /** Label of a date range's start. */
    from?: string;
    /** Label of a date range's end. */
    through?: string;
    /** Label of a single date input. */
    date?: string;
    /** Accessible name of a filter's editor, given the filter name. */
    facet?: (filter: string) => string;
    /** Accessible name of a filter's operator select, given the filter name. */
    facetOperator?: (filter: string) => string;
    /** Accessible name of a filter's value input, given the filter name. */
    facetValue?: (filter: string) => string;
    /** Accessible name of a filter's lower bound input, given the filter name. */
    facetMinimum?: (filter: string) => string;
    /** Accessible name of a filter's upper bound input, given the filter name. */
    facetMaximum?: (filter: string) => string;
    /** Filter button summary for a text value match, such as contains draft. */
    summaryContains?: (value: string) => string;
    /** Filter button summary for an exact value, such as is draft. */
    summaryEquals?: (value: string) => string;
    /** Filter button summary for an excluded value, such as is not draft. */
    summaryNot?: (value: string) => string;
    /** Filter button summary for chosen options, such as 3 selected. */
    summarySelected?: (count: number) => string;
    /** Filter button summary for excluded options, given the option summary. */
    summaryExcluded?: (summary: string) => string;
    /** Filter button text for an open end of a range. */
    summaryAny?: string;
    /** Button in a filter's editor that removes the filter. */
    removeFilter?: string;
    /** Button that closes a filter's editor. */
    done?: string;
    /** Pagination button for the previous page. */
    previous?: string;
    /** Pagination button for the next page. */
    next?: string;
};

export type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLDivElement>,
    'children'
> &
    Pick<
        DataTableViewProps<TFeatures, TData>,
        'table' | 'loading' | 'selectable' | 'caption' | 'rowLabel' | 'header' | 'cell' | 'empty'
    > & {
        /**
         * Both variants draw the rows in an inset table. `default` leaves the toolbar and footer
         * outside it. `inset` puts the table and its footer in one frame, with the Toolbar above.
         */
        variant?: 'default' | 'inset';
        /**
         * Overrides the built-in text and accessible names. Every key is optional and English is
         * the fallback.
         */
        labels?: DataTableLabels;
        /** Content rendered inside. */
        children?: Snippet<[DataTableState<TFeatures, TData>]>;
    };
export type DataTableHeaderProps<TFeatures extends TableFeatures, TData extends RowData> = Pick<
    DataTableViewProps<TFeatures, TData>,
    'table' | 'selectable' | 'header'
> &
    Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'>;
export type DataTableBodyProps<TFeatures extends TableFeatures, TData extends RowData> = Pick<
    DataTableViewProps<TFeatures, TData>,
    'table' | 'selectable' | 'loading' | 'cell' | 'empty' | 'rowLabel'
> &
    Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'>;
export type DataTableToolbarProps = HTMLAttributes<HTMLDivElement>;
export type DataTablePaginationProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLElement>,
    'children'
> & {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
};
export type DataTableSummaryProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLParagraphElement>,
    'children'
> & {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Content rendered inside. */
    children?: Snippet<[DataTableState<TFeatures, TData>]>;
};
export type DataTableFilterProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLInputAttributes,
    'value' | 'type' | 'oninput' | 'checked' | 'files'
> & {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Id of the column the search field filters. */
    column: string;
    /** Accessible name of the control. */
    label: string;
};
export type DataTableEmptyProps = {
    /** Classes added to the element. */
    class?: string;
    /** Number of columns the empty row spans. */
    columns: number;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
    /** Content rendered inside. */
    children?: Snippet<[{ loading: boolean }]>;
};
export type DataTableSelectionProps = {
    /** Classes added to the element. */
    class?: string;
    /** Whether the checkbox is checked. */
    checked?: boolean;
    /** Shows the mixed state when only some rows are selected. */
    indeterminate?: boolean;
    /** Disables the checkbox. */
    disabled?: boolean;
    /** Accessible name of the control. */
    label: string;
    /** Called with the new state when the checkbox changes. */
    onCheckedChange: (checked: boolean) => void;
};
export { default as Root } from './data-table.svelte';
export { default as Body } from './data-table-body.svelte';
export { default as Empty } from './data-table-empty.svelte';
export { default as Filter } from './data-table-filter.svelte';
export { default as Header } from './data-table-header.svelte';
export { default as Pagination } from './data-table-pagination.svelte';
export { default as Selection } from './data-table-selection.svelte';
export { default as Summary } from './data-table-summary.svelte';
export { default as Toolbar } from './data-table-toolbar.svelte';
export { default as View } from './data-table-view.svelte';

export type DataTableFilterClause =
    | {
          type: 'text';
          operator: 'contains' | 'equals' | 'not';
          value: string;
      }
    | {
          type: 'select';
          operator: 'in' | 'notIn';
          value: string[];
      }
    | {
          type: 'number';
          operator: 'equals' | 'lt' | 'lte' | 'gt' | 'gte';
          value: number;
      }
    | {
          type: 'number';
          operator: 'between';
          value: [number | undefined, number | undefined];
      }
    | {
          type: 'date';
          operator: 'equals' | 'lt' | 'lte' | 'gt' | 'gte';
          value: string;
      }
    | {
          type: 'date';
          operator: 'between';
          value: [string | undefined, string | undefined];
      };
export type DataTableFilterDefinition = {
    column: string;
    label: string;
    editor?: Snippet<
        [
            {
                value: unknown;
                setValue: (value: unknown) => void;
            }
        ]
    >;
} & (
    | {
          type: 'text';
          placeholder?: string;
      }
    | {
          type: 'select';
          options: readonly {
              value: string;
              label: string;
          }[];
      }
    | {
          type: 'number';
          min?: number;
          max?: number;
          step?: number;
      }
    | { type: 'date' }
);
export type DataTableFiltersProps<TFeatures extends TableFeatures, TData extends RowData> = {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Filters offered in the Filter menu. */
    filters: readonly DataTableFilterDefinition[];
    /** Content rendered inside. */
    children?: Snippet;
    /** Classes added to the element. */
    class?: string;
};
export type DataTableFacetProps<TFeatures extends TableFeatures, TData extends RowData> = {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Filter definition this chip edits. */
    filter: DataTableFilterDefinition;
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Called when the filter is removed. */
    onRemove?: () => void;
    /** Classes added to the element. */
    class?: string;
};
export type DataTableSortProps<TFeatures extends TableFeatures, TData extends RowData> = {
    /** TanStack Table instance that drives the table. */
    table: Table<TFeatures, TData>;
    /** Columns offered in the Sort menu. */
    columns?: readonly {
        id: string;
        label: string;
    }[];
    /** Classes added to the element. */
    class?: string;
};
export type DataTableColumnHeaderProps<TFeatures extends TableFeatures, TData extends RowData> = {
    /** TanStack header to render. */
    header: Header<TFeatures, TData, unknown>;
    /** Classes added to the element. */
    class?: string;
};
export { default as ColumnHeader } from './data-table-column-header.svelte';
export { default as Facet } from './data-table-facet.svelte';
export { default as Filters } from './data-table-filters.svelte';
export { default as Sort } from './data-table-sort.svelte';
export { dataTableFilter } from './filter';

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
    /** Returns the accessible name for a row's selection checkbox. */
    rowLabel?: (row: Row<TFeatures, TData>) => string;
    /** Renders a column header. */
    header?: Snippet<[Header<TFeatures, TData, unknown>]>;
    /** Renders a cell. Defaults to the column's cell definition. */
    cell?: Snippet<[Cell<TFeatures, TData, unknown>]>;
    /** Content shown when there are no rows. It receives the loading state. */
    empty?: Snippet<[{ loading: boolean }]>;
};
export type DataTableLabels = {
    region?: string;
    loading?: string;
    empty?: string;
    selectRow?: (row: string) => string;
    pages?: string;
    noPages?: string;
    page?: (page: number, pageCount: number | undefined) => string;
    rows?: (total: number) => string;
    selected?: (selected: number) => string;
    sort?: string;
    sortResults?: string;
    sortedBy?: (column: string) => string;
    sortBy?: string;
    ascending?: string;
    descending?: string;
    /** Tooltip on a column header whose next click sorts ascending. */
    sortAscending?: string;
    /** Tooltip on a column header whose next click sorts descending. */
    sortDescending?: string;
    /** Tooltip on a column header whose next click removes the sort, and the Sort menu item. */
    clearSorting?: string;
    filters?: string;
    filter?: string;
    filterBy?: string;
    contains?: string;
    equals?: string;
    not?: string;
    anyOf?: string;
    noneOf?: string;
    between?: string;
    atLeast?: string;
    atMost?: string;
    onOrAfter?: string;
    onOrBefore?: string;
    valuePlaceholder?: string;
    minimum?: string;
    maximum?: string;
    from?: string;
    through?: string;
    date?: string;
    facet?: (filter: string) => string;
    facetOperator?: (filter: string) => string;
    facetValue?: (filter: string) => string;
    facetMinimum?: (filter: string) => string;
    facetMaximum?: (filter: string) => string;
};

export type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLDivElement>,
    'children'
> &
    Pick<
        DataTableViewProps<TFeatures, TData>,
        'table' | 'loading' | 'selectable' | 'caption' | 'rowLabel' | 'header' | 'cell' | 'empty'
    > & {
        /** `inset` frames the table with its toolbar and footer on the frame. */
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

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
    table: Table<TFeatures, TData>;
    loading?: boolean;
    selectable?: boolean;
    caption?: string;
    rowLabel?: (row: Row<TFeatures, TData>) => string;
    header?: Snippet<[Header<TFeatures, TData, unknown>]>;
    cell?: Snippet<[Cell<TFeatures, TData, unknown>]>;
    empty?: Snippet<[{ loading: boolean }]>;
};
export type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLDivElement>,
    'children'
> &
    Pick<
        DataTableViewProps<TFeatures, TData>,
        'table' | 'loading' | 'selectable' | 'caption' | 'rowLabel' | 'header' | 'cell' | 'empty'
    > & {
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
    table: Table<TFeatures, TData>;
    loading?: boolean;
};
export type DataTableSummaryProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLAttributes<HTMLParagraphElement>,
    'children'
> & {
    table: Table<TFeatures, TData>;
    children?: Snippet<[DataTableState<TFeatures, TData>]>;
};
export type DataTableFilterProps<TFeatures extends TableFeatures, TData extends RowData> = Omit<
    HTMLInputAttributes,
    'value' | 'type' | 'oninput' | 'checked' | 'files'
> & {
    table: Table<TFeatures, TData>;
    column: string;
    label: string;
};
export type DataTableEmptyProps = {
    class?: string;
    columns: number;
    loading?: boolean;
    children?: Snippet<[{ loading: boolean }]>;
};
export type DataTableSelectionProps = {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label: string;
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
    table: Table<TFeatures, TData>;
    filters: readonly DataTableFilterDefinition[];
    class?: string;
};
export type DataTableFacetProps<TFeatures extends TableFeatures, TData extends RowData> = {
    table: Table<TFeatures, TData>;
    filter: DataTableFilterDefinition;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onRemove?: () => void;
    class?: string;
};
export type DataTableSortProps<TFeatures extends TableFeatures, TData extends RowData> = {
    table: Table<TFeatures, TData>;
    columns?: readonly {
        id: string;
        label: string;
    }[];
    class?: string;
};
export type DataTableColumnHeaderProps<TFeatures extends TableFeatures, TData extends RowData> = {
    header: Header<TFeatures, TData, unknown>;
    class?: string;
};
export { default as ColumnHeader } from './data-table-column-header.svelte';
export { default as Facet } from './data-table-facet.svelte';
export { default as Filters } from './data-table-filters.svelte';
export { default as Sort } from './data-table-sort.svelte';
export { dataTableFilter } from './filter';

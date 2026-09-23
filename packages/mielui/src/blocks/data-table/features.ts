import type {
    Column,
    Column_ColumnFiltering,
    Column_RowSorting,
    Row,
    Row_RowSelection,
    RowData,
    Table,
    Table_RowPagination,
    Table_RowSelection,
    TableFeatures
} from '@tanstack/svelte-table';

export function pagination<TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
) {
    return table as Table<TFeatures, TData> & Partial<Table_RowPagination<TFeatures, TData>>;
}
export function selection<TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
) {
    return table as Table<TFeatures, TData> & Partial<Table_RowSelection<TFeatures, TData>>;
}
export function selectedRow<TFeatures extends TableFeatures, TData extends RowData>(
    row: Row<TFeatures, TData>
) {
    return row as Row<TFeatures, TData> & Partial<Row_RowSelection>;
}
export function sortableColumn<TFeatures extends TableFeatures, TData extends RowData>(
    column: Column<TFeatures, TData, unknown>
) {
    return column as Column<TFeatures, TData, unknown> &
        Partial<Column_RowSorting<TFeatures, TData>>;
}
export function filterableColumn<TFeatures extends TableFeatures, TData extends RowData>(
    column: Column<TFeatures, TData, unknown>
) {
    return column as Column<TFeatures, TData, unknown> &
        Partial<Column_ColumnFiltering<TFeatures, TData>>;
}
export function summary<TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
) {
    return {
        table,
        rows: table.getRowModel().rows,
        total: pagination(table).getRowCount?.() ?? table.getRowModel().rows.length,
        selected: selection(table).getSelectedRowIds?.().length ?? 0
    };
}

export function visibleCells<TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>,
    row: Row<TFeatures, TData>
) {
    const cells = new Map(row.getAllCells().map((cell) => [cell.column.id, cell]));
    return (table.getHeaderGroups().at(-1)?.headers ?? []).flatMap((header) => {
        const cell = cells.get(header.column.id);
        return cell ? [cell] : [];
    });
}

export function visibleColumnCount<TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
) {
    return table.getHeaderGroups().at(-1)?.headers.length ?? 0;
}

import {
    type ColumnDef,
    createPaginatedRowModel,
    createSortedRowModel,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFns,
    tableFeatures
} from '@tanstack/svelte-table';
import { type Invoice, invoiceAmount } from './data';

export const invoiceFeatures = tableFeatures({
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortFns
});

export const invoiceColumns: ColumnDef<typeof invoiceFeatures, Invoice>[] = [
    { accessorKey: 'client', header: 'Customer' },
    { accessorKey: 'reference', header: 'Invoice' },
    { accessorKey: 'status', header: 'Status' },
    {
        id: 'amount',
        header: 'Amount',
        accessorFn: invoiceAmount
    },
    { id: 'actions', header: 'Actions', enableSorting: false }
];

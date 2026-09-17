import {
    type DataTableFilterDefinition,
    dataTableFilter
} from '@mielui/svelte/components/data-table';
import {
    type ColumnDef,
    columnFilteringFeature,
    columnVisibilityFeature,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFns,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFns,
    tableFeatures
} from '@tanstack/svelte-table';

export type Member = {
    id: string;
    name: string;
    email: string;
    role: string;
    projects: number;
    joined: string;
};
export const features = tableFeatures({
    columnFilteringFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    filterFns,
    sortFns
});
export const columns: ColumnDef<typeof features, Member>[] = [
    { accessorKey: 'name', header: 'Name', filterFn: 'includesString' },
    { accessorKey: 'email', header: 'Email', filterFn: dataTableFilter },
    { accessorKey: 'role', header: 'Role', filterFn: dataTableFilter },
    { accessorKey: 'projects', header: 'Projects', filterFn: dataTableFilter },
    { accessorKey: 'joined', header: 'Joined', filterFn: dataTableFilter }
];
export const members: Member[] = [
    {
        id: 'm-01',
        joined: '2026-01-15',
        name: 'Maya Chen',
        email: 'maya@acme.test',
        role: 'Owner',
        projects: 12
    },
    {
        id: 'm-02',
        joined: '2026-02-15',
        name: 'Theo Martin',
        email: 'theo@acme.test',
        role: 'Editor',
        projects: 8
    },
    {
        id: 'm-03',
        joined: '2026-03-15',
        name: 'Amira Diallo',
        email: 'amira@acme.test',
        role: 'Editor',
        projects: 6
    },
    {
        id: 'm-04',
        joined: '2026-04-15',
        name: 'Noah Kim',
        email: 'noah@acme.test',
        role: 'Viewer',
        projects: 3
    },
    {
        id: 'm-05',
        joined: '2026-05-15',
        name: 'Luca Rossi',
        email: 'luca@acme.test',
        role: 'Editor',
        projects: 7
    },
    {
        id: 'm-06',
        joined: '2026-06-15',
        name: 'Sofia Costa',
        email: 'sofia@acme.test',
        role: 'Viewer',
        projects: 2
    },
    {
        id: 'm-07',
        joined: '2026-07-15',
        name: 'Eva Novak',
        email: 'eva@acme.test',
        role: 'Editor',
        projects: 9
    },
    {
        id: 'm-08',
        joined: '2026-08-15',
        name: 'Oscar Anders',
        email: 'oscar@acme.test',
        role: 'Viewer',
        projects: 4
    }
];

export const filters: DataTableFilterDefinition[] = [
    {
        column: 'role',
        label: 'Role',
        type: 'select',
        options: [
            { value: 'Owner', label: 'Owner' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Viewer' }
        ]
    },
    { column: 'projects', label: 'Projects', type: 'number', min: 0, step: 1 },
    { column: 'joined', label: 'Joined', type: 'date' },
    { column: 'email', label: 'Email', type: 'text', placeholder: 'company.test' }
];

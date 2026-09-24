import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'data-table',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Composable TanStack Table v9 presentation with native table semantics, sorting, filtering, selection, and pagination.',
    files: [
        'actions/number-shuffle/index.ts',
        'actions/number-shuffle/render.ts',
        'components/data-table/data-table-header.svelte',
        'components/data-table/data-table-pagination.svelte',
        'components/data-table/data-table-toolbar.svelte',
        'components/data-table/data-table-selection.svelte',
        'components/data-table/data-table-body.svelte',
        'components/data-table/data-table.svelte',
        'components/data-table/data-table-view.svelte',
        'components/data-table/features.ts',
        'components/data-table/data-table-empty.svelte',
        'components/data-table/data-table-filter.svelte',
        'components/data-table/index.ts',
        'components/data-table/data-table-summary.svelte',
        'components/data-table/manifest.ts',
        'components/data-table/filter.ts',
        'components/data-table/data-table-sort.svelte',
        'components/data-table/data-table-filters.svelte',
        'components/data-table/data-table-facet.svelte',
        'components/data-table/data-table-column-header.svelte'
    ],
    components: [
        'pagination',
        '_internal/utils',
        'table',
        'input',
        'group',
        'button',
        'checkbox',
        'dropdown-menu',
        'popover',
        'native-select',
        'date-picker'
    ],
    shared: ['utils.cn', 'utils.pressable', 'hugeicons-icon'],
    peerDependencies: {
        '@tanstack/svelte-table': '9.2.4',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

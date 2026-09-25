import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'table',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Semantic tables with headers, footers, captions, scrolling, and an inset variant.',
    files: [
        'components/table/index.ts',
        'components/table/table-body.svelte',
        'components/table/table-caption.svelte',
        'components/table/table-cell.svelte',
        'components/table/table-footer.svelte',
        'components/table/table-head.svelte',
        'components/table/table-header.svelte',
        'components/table/table-row.svelte',
        'components/table/table-scroll-area.svelte',
        'components/table/table.svelte',
        'components/table/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['components/_internal/inset-layout', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

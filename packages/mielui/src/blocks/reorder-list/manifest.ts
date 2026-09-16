import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'reorder-list',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Accessible sortable list with pointer dragging, keyboard grab and move, cancellation, and commit announcements.',
    files: [
        'components/reorder-list/reorder-list.svelte',
        'components/reorder-list/gesture.svelte.ts',
        'components/reorder-list/reorder-list-item.svelte',
        'components/reorder-list/reorder-list-handle.svelte',
        'components/reorder-list/reorder-list-content.svelte',
        'components/reorder-list/context.svelte.ts',
        'components/reorder-list/index.ts',
        'components/reorder-list/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.createContext', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

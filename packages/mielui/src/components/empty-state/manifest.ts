import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'empty-state',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Explain missing content and offer a next step with optional media, details, and actions.',
    files: [
        'components/empty-state/empty-state-actions.svelte',
        'components/empty-state/empty-state-content.svelte',
        'components/empty-state/empty-state-description.svelte',
        'components/empty-state/empty-state-header.svelte',
        'components/empty-state/empty-state-media.svelte',
        'components/empty-state/empty-state-title.svelte',
        'components/empty-state/empty-state.svelte',
        'components/empty-state/index.ts',
        'components/empty-state/manifest.ts'
    ],
    components: ['_internal/utils', 'typography'],
    shared: ['utils.cn'],
    peerDependencies: {
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

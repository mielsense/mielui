import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: '_internal/disclosure',
    version: '1.0.0',
    visibility: 'internal',
    description: 'Private disclosure lifecycle shared by Tool and Reasoning.',
    files: [
        'components/_internal/disclosure/index.ts',
        'components/_internal/disclosure/lifecycle.svelte.ts',
        'components/_internal/disclosure/manifest.ts'
    ],
    components: [],
    shared: [],
    peerDependencies: { svelte: '^5.0.0' }
};

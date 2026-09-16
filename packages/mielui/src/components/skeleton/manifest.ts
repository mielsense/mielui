import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'skeleton',
    version: '2.0.0',
    visibility: 'public',
    description:
        'Static loading placeholder and a delayed, minimum-visible swap into real content.',
    files: [
        'components/skeleton/skeleton.svelte',
        'components/skeleton/skeleton-swap.svelte',
        'components/skeleton/index.ts',
        'components/skeleton/manifest.ts',
        'actions/shimmer/index.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        cnfast: '^0.0.8',
        svelte: '^5.29.0'
    }
};

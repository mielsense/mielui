import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'pagination',
    version: '1.0.0',
    visibility: 'public',
    description: 'Numbered pagination with prev/next buttons, ellipses, and configurable siblings.',
    files: [
        'components/pagination/pagination.svelte',
        'components/pagination/index.ts',
        'components/pagination/manifest.ts'
    ],
    components: [],
    shared: ['hugeicons-icon', 'utils.cn'],
    peerDependencies: {
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

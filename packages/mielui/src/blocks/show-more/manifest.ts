import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'show-more',
    version: '1.0.0',
    visibility: 'public',
    description: 'Clamps long content to a set number of lines and expands it on demand.',
    files: [
        'components/show-more/show-more.svelte',
        'components/show-more/index.ts',
        'components/show-more/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

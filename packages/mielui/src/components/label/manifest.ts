import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'label',
    version: '1.0.0',
    visibility: 'public',
    description: 'Thin wrapper around native <label> with mielui styling defaults.',
    files: [
        'components/label/label.svelte',
        'components/label/index.ts',
        'components/label/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

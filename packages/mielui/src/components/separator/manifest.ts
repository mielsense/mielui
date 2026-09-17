import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'separator',
    version: '1.0.0',
    visibility: 'public',
    description: 'Semantic or decorative divider in either orientation.',
    files: [
        'components/separator/separator.svelte',
        'components/separator/index.ts',
        'components/separator/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: { 'bits-ui': '^2.19.2', cnfast: '^0.0.8', svelte: '^5.33.0' }
};

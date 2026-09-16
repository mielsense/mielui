import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'toolbar',
    version: '1.0.0',
    visibility: 'internal',
    description: 'Action row for message composers and other text entry surfaces.',
    files: [
        'components/toolbar/navigation.ts',
        'components/toolbar/toolbar.svelte',
        'components/toolbar/index.ts',
        'components/toolbar/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

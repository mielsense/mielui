import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'switch',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Toggle switch with role="switch", bindable switched state, optional label and description.',
    role: 'switch',
    files: [
        'components/switch/switch.svelte',
        'components/switch/index.ts',
        'components/switch/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['components/_internal/field-metadata', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

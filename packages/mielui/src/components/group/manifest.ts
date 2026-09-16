import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'group',
    version: '1.0.0',
    visibility: 'public',
    description: 'Connected controls with separators, text, and horizontal or vertical layouts.',
    files: [
        'components/group/index.ts',
        'components/group/group.svelte',
        'components/group/group-separator.svelte',
        'components/group/group-text.svelte',
        'components/group/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

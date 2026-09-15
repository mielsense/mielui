import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'kbd',
    version: '1.1.0',
    visibility: 'public',
    description:
        'Keyboard shortcut indicator. Activates its nearest interactive owner or an explicit ontrigger callback.',
    files: ['components/kbd/kbd.svelte', 'components/kbd/index.ts', 'components/kbd/manifest.ts'],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'avatar',
    version: '1.0.0',
    visibility: 'public',
    description: 'Image avatar with fallback. 4 sizes (sm/md/lg/xl), circle or square shape.',
    files: [
        'components/avatar/context.svelte.ts',
        'components/avatar/avatar.svelte',
        'components/avatar/avatar-image.svelte',
        'components/avatar/avatar-fallback.svelte',
        'components/avatar/variants.ts',
        'components/avatar/index.ts',
        'components/avatar/manifest.ts'
    ],
    components: [],
    shared: ['utils.createContext', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        'tailwind-merge': '^3.0.0',
        'tailwind-variants': '^3.0.0',
        svelte: '^5.0.0'
    }
};

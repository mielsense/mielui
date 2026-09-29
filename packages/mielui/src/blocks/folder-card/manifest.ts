import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'folder-card',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Folder-shaped card with a tone wash or image cover, a raised tab for the title and description, and a footer for an index and an animated count. Renders a link when given href.',
    files: [
        'actions/number-shuffle/index.ts',
        'actions/number-shuffle/render.ts',
        'components/folder-card/folder-card.svelte',
        'components/folder-card/folder-card-cover.svelte',
        'components/folder-card/folder-card-tab.svelte',
        'components/folder-card/folder-card-title.svelte',
        'components/folder-card/folder-card-description.svelte',
        'components/folder-card/folder-card-footer.svelte',
        'components/folder-card/folder-card-index.svelte',
        'components/folder-card/folder-card-count.svelte',
        'components/folder-card/context.ts',
        'components/folder-card/index.ts',
        'components/folder-card/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

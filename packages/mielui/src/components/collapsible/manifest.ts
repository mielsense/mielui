import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'collapsible',
    version: '1.0.0',
    visibility: 'public',
    description: 'Single-item disclosure panel with bindable open state.',
    files: [
        'components/collapsible/collapsible.svelte',
        'components/collapsible/collapsible-trigger.svelte',
        'components/collapsible/collapsible-content.svelte',
        'components/collapsible/context.svelte.ts',
        'components/collapsible/index.ts',
        'components/collapsible/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.createContext', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

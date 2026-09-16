import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'accordion',
    version: '1.0.0',
    visibility: 'public',
    description: 'Vertically stacked disclosure panels. Single or multiple expanded items.',
    files: [
        'components/accordion/accordion.svelte',
        'components/accordion/accordion-item.svelte',
        'components/accordion/accordion-trigger.svelte',
        'components/accordion/accordion-content.svelte',
        'components/accordion/index.ts',
        'components/accordion/manifest.ts'
    ],
    components: [],
    shared: ['hugeicons-icon', 'utils.cn', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

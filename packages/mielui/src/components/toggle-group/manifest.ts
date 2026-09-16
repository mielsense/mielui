import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'toggle-group',
    version: '1.1.0',
    visibility: 'public',
    description: 'Single or multiple-select toggle group with bindable value (string or string[]).',
    files: [
        'components/toggle-group/toggle-group.svelte',
        'components/toggle-group/toggle-group-item.svelte',
        'components/toggle-group/index.ts',
        'components/toggle-group/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn', 'utils.travelingHighlight'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

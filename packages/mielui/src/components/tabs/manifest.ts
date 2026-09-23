import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'tabs',
    version: '1.1.0',
    visibility: 'public',
    description:
        'Horizontal or vertical tabbed interface with List, Trigger, and Content subparts. Supports three visual variants and a bindable active value.',
    role: 'tablist',
    files: [
        'components/tabs/tabs.svelte',
        'components/tabs/tabs-list.svelte',
        'components/tabs/tabs-trigger.svelte',
        'components/tabs/tabs-content.svelte',
        'components/tabs/id.ts',
        'components/tabs/indicators.svelte.ts',
        'components/tabs/index.ts',
        'components/tabs/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.pressable'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

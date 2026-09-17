import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'toolbar',
    version: '1.0.0',
    visibility: 'public',
    description: 'Composable keyboard toolbar with buttons, links, and selectable groups.',
    files: [
        'components/toolbar/navigation.ts',
        'components/toolbar/toolbar-root.svelte',
        'components/toolbar/toolbar-group.svelte',
        'components/toolbar/context.ts',
        'components/toolbar/toolbar.svelte',
        'components/toolbar/toolbar-separator.svelte',
        'components/toolbar/toolbar-button.svelte',
        'components/toolbar/toolbar-item.svelte',
        'components/toolbar/index.ts',
        'components/toolbar/toolbar-link.svelte',
        'components/toolbar/manifest.ts'
    ],
    components: ['_internal/utils', 'button', 'separator'],
    shared: ['utils.cn', 'utils.pressable'],
    peerDependencies: { 'bits-ui': '^2.19.2', cnfast: '^0.0.8', svelte: '^5.33.0' }
};

import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'drawer',
    version: '1.0.0',
    visibility: 'public',
    description: 'Swipeable edge panel with accessible focus management and direct manipulation.',
    files: [
        'components/drawer/drawer-overlay.svelte',
        'components/drawer/drawer-portal.svelte',
        'components/drawer/drawer-description.svelte',
        'components/drawer/drawer-handle.svelte',
        'components/drawer/drawer-footer.svelte',
        'components/drawer/drawer-close.svelte',
        'components/drawer/drawer-content.svelte',
        'components/drawer/drawer-root.svelte',
        'components/drawer/drawer-body.svelte',
        'components/drawer/drawer-title.svelte',
        'components/drawer/index.ts',
        'components/drawer/context.ts',
        'components/drawer/drawer-trigger.svelte',
        'components/drawer/drawer-header.svelte',
        'components/drawer/manifest.ts'
    ],
    components: ['_internal/utils', 'button'],
    shared: ['utils.cn', 'utils.pressable'],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0',
        'vaul-svelte': '1.0.0-next.7'
    }
};

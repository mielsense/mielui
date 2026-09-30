import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'sidebar',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Composable, responsive multi-panel sidebar with rails, pinning, resizable widths, and accessible mobile drawers.',
    files: [
        'components/sidebar/context.svelte.ts',
        'components/sidebar/geometry.ts',
        'components/sidebar/index.ts',
        'components/sidebar/navigation.ts',
        'components/sidebar/panel.svelte.ts',
        'components/sidebar/resize.ts',
        'components/sidebar/sidebar-button.svelte',
        'components/sidebar/sidebar-close.svelte',
        'components/sidebar/sidebar-content.svelte',
        'components/sidebar/sidebar-footer.svelte',
        'components/sidebar/sidebar-group-label.svelte',
        'components/sidebar/sidebar-group.svelte',
        'components/sidebar/sidebar-header.svelte',
        'components/sidebar/sidebar-label.svelte',
        'components/sidebar/sidebar-link.svelte',
        'components/sidebar/sidebar-main.svelte',
        'components/sidebar/sidebar-menu-item.svelte',
        'components/sidebar/sidebar-menu.svelte',
        'components/sidebar/sidebar-panel.svelte',
        'components/sidebar/sidebar-pin.svelte',
        'components/sidebar/sidebar-resize-handle.svelte',
        'components/sidebar/sidebar-separator.svelte',
        'components/sidebar/sidebar-trigger.svelte',
        'components/sidebar/sidebar.svelte',
        'components/sidebar/types.ts',
        'components/sidebar/manifest.ts'
    ],
    components: ['button', 'sheet', 'tooltip', '_internal/utils', '_internal/overlay'],
    shared: [
        'hugeicons-icon',
        'components/_internal/surface',
        'utils.cn',
        'utils.pressable',
        'utils.clickOutside',
        'utils.pushEscapeLayer',
        'transition'
    ],
    peerDependencies: {
        '@humanspeak/svelte-motion': '^1.2.1',
        '@hugeicons/core-free-icons': '^4.3.0',
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

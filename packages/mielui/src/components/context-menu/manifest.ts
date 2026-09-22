import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'context-menu',
    version: '1.1.0',
    visibility: 'public',
    description:
        'Right-click contextual menu with sub-menus and checkbox items. Positioned via @floating-ui virtual element.',
    role: 'menu',
    files: [
        'components/context-menu/context-menu.svelte',
        'components/context-menu/context-menu-trigger.svelte',
        'components/context-menu/context-menu-content.svelte',
        'components/context-menu/context-menu-item.svelte',
        'components/context-menu/context-menu-checkbox-item.svelte',
        'components/context-menu/context-menu-separator.svelte',
        'components/context-menu/context-menu-sub.svelte',
        'components/context-menu/context-menu-sub-trigger.svelte',
        'components/context-menu/context-menu-sub-content.svelte',
        'components/context-menu/context.svelte.ts',
        'components/context-menu/index.ts',
        'components/context-menu/manifest.ts'
    ],
    components: ['_internal/utils', 'popover', 'button'],
    shared: [
        'components/_internal/button-attributes',
        'transition',
        'components/_internal/surface',
        'hugeicons-icon',
        'utils.closeMenuLayers',
        'utils.cn',
        'utils.createContext',
        'utils.travelingHighlight'
    ],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        '@floating-ui/dom': '^1.0.0',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

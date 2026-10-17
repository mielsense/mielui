import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Dropdown menu.
 *
 * 1.0.0 -- initial.
 * 2.0.0 a11y fix: aria-allowed-attr resolved by conditional aria-modal
 *        in Popover.Content (now only applied for role="dialog"/
 *        "alertdialog", not for role="menu").
 * 2.2.1 Trigger and SubTrigger bind `element`, and Trigger renders the
 *        chevron its `icon` prop describes.
 */
export const manifest: Manifest = {
    name: 'dropdown-menu',
    version: '2.2.1',
    visibility: 'public',
    description:
        'Click-triggered menu popover with items, labels, separators, and nested submenus.',
    role: 'menu',
    files: [
        'components/dropdown-menu/dropdown-menu.svelte',
        'components/dropdown-menu/dropdown-menu-trigger.svelte',
        'components/dropdown-menu/dropdown-menu-content.svelte',
        'components/dropdown-menu/dropdown-menu-item.svelte',
        'components/dropdown-menu/dropdown-menu-radio-group.svelte',
        'components/dropdown-menu/dropdown-menu-radio-item.svelte',
        'components/dropdown-menu/dropdown-menu-checkbox-item.svelte',
        'components/dropdown-menu/dropdown-menu-label.svelte',
        'components/dropdown-menu/dropdown-menu-separator.svelte',
        'components/dropdown-menu/dropdown-menu-sub.svelte',
        'components/dropdown-menu/dropdown-menu-sub-trigger.svelte',
        'components/dropdown-menu/dropdown-menu-sub-content.svelte',
        'components/dropdown-menu/context.ts',
        'components/dropdown-menu/index.ts',
        'components/dropdown-menu/manifest.ts'
    ],
    components: ['_internal/utils', 'popover', 'button'],
    shared: [
        'components/_internal/button-attributes',
        'transition',
        'components/_internal/surface',
        'hugeicons-icon',
        'utils.cn',
        'utils.createContext',
        'utils.dynamicWidth',
        'utils.travelingHighlight'
    ],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

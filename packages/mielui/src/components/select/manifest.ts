import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Select.
 *
 * 1.0.0 -- initial.
 * 2.0.0 a11y fixes:
 *        - select-trigger always sets aria-label (robust fallback).
 *        - aria-modal no longer applied for role="listbox" (only
 *          dialog/alertdialog get it).
 */
export const manifest: Manifest = {
    name: 'select',
    version: '2.3.0',
    visibility: 'public',
    description: 'Listbox-based single-select with bindable value and Item/Label/Content subparts.',
    role: 'listbox',
    files: [
        'components/select/select.svelte',
        'components/select/select-trigger.svelte',
        'components/select/select-value.svelte',
        'components/select/select-content.svelte',
        'components/select/select-item.svelte',
        'components/select/select-label.svelte',
        'components/select/context.svelte.ts',
        'components/select/index.ts',
        'components/select/manifest.ts'
    ],
    components: ['_internal/utils', 'popover', 'button', 'scroll-area'],
    shared: [
        'components/_internal/button-attributes',
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

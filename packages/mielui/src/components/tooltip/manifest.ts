import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Tooltip uses one shared floating surface per document, so every instance
 * avoids its own portal and positioning lifecycle. Trigger/Content preserve
 * the public composition API while Content supplies the accessible label.
 *
 * 2.1.0 -- in-place re-labels (e.g. Copy→Copied) roll via @scritto/core.
 * 2.2.0 -- the pointer waits 500ms; keyboard focus opens at once, and `delay`
 *          applies to the pointer only.
 */
export const manifest: Manifest = {
    name: 'tooltip',
    version: '2.2.0',
    visibility: 'public',
    description:
        'Hover-revealed inline guidance with a shared Tailwind-styled surface, role="tooltip", a 500ms pointer delay, and immediate keyboard focus.',
    role: 'tooltip',
    files: [
        'components/tooltip/tooltip.svelte',
        'components/tooltip/tooltip-provider.svelte',
        'components/tooltip/manager-context.ts',
        'components/tooltip/tooltip-content.svelte',
        'components/tooltip/tooltip-trigger.svelte',
        'components/tooltip/shared-tooltip.ts',
        'components/tooltip/clone-visual.ts',
        'components/tooltip/index.ts',
        'components/tooltip/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: [
        'components/_internal/theme-changes',
        'transition',
        'components/_internal/surface',
        'utils.cn',
        'utils.createContext'
    ],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@scritto/core': '^0.1.0',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

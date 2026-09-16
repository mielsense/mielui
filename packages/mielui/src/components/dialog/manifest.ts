import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Dialog -- centered dialog overlay. Composes `_internal/overlay` for the
 * shared focus-trap / click-outside / Escape / body-scroll-lock concerns;
 * owns its own portal, Svelte enter/exit transitions, and centered positioning.
 *
 * Wrapped by `alert-dialog`.
 *
 * Version history:
 *   1.0.0 -- initial manifest. Dialog-content consumes `_internal/overlay`
 *           (resolves F-30). The public component API (Root, Content,
 *           Trigger, Title, Description, Header, Body, Close, Footer,
 *           Confirm) is stable.
 *   1.3.0 -- nested Dialog.Root is first-party: stacked scale, lighter nested
 *           scrim, and one-layer dismiss. Closing a parent clears nested open.
 *   1.3.1 -- Title reuses the shared typography title classes instead of a
 *           hardcoded size, so dialog headings match Card titles.
 */
export const manifest: Manifest = {
    name: 'dialog',
    version: '1.3.1',
    visibility: 'public',
    description:
        'Centered dialog overlay with portal, inert background, focus trap, click-outside, nested stacking, and Svelte transitions. Composes _internal/overlay for shared mechanics.',
    role: 'dialog',
    files: [
        'components/dialog/dialog.svelte',
        'components/dialog/dialog-content.svelte',
        'components/dialog/dialog-trigger.svelte',
        'components/dialog/dialog-title.svelte',
        'components/dialog/dialog-description.svelte',
        'components/dialog/dialog-header.svelte',
        'components/dialog/dialog-footer.svelte',
        'components/dialog/dialog-body.svelte',
        'components/dialog/dialog-close.svelte',
        'components/dialog/dialog-confirm.svelte',
        'components/dialog/context.svelte.ts',
        'components/dialog/index.ts',
        'components/dialog/manifest.ts'
    ],
    components: ['_internal/utils', 'button', '_internal/overlay', 'typography'],
    shared: [
        'components/_internal/surface',
        'hugeicons-icon',
        'utils.cn',
        'utils.createContext',
        'transition'
    ],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

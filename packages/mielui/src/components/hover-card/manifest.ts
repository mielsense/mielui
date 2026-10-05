import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * HoverCard -- hover- and focus-revealed rich content (link previews,
 * member cards, definitions). Defaults to a 200ms open / 150ms close delay,
 * applies `role="dialog"` with `aria-modal="false"` to the content, and
 * ships Content + Title + Description sub-components.
 *
 * Version history:
 *   1.0.0 -- initial standalone implementation.
 *   2.0.0 -- the public Root/Trigger/Content/Title/Description API and the
 *         `openDelay`/`closeDelay` props on Root are preserved. The trigger
 *         renders an `<a>` when `href` is passed and a `<button>` otherwise.
 *         `side` and `align` on Content set the placement.
 *
 *         Removed: the `HoverCardState` type export.
 */
export const manifest: Manifest = {
    name: 'hover-card',
    version: '2.0.0',
    visibility: 'public',
    description:
        'Rich preview card revealed on hover or keyboard focus, with open and close delays, side and align placement, and Title and Description parts wired to its accessible name.',
    role: 'dialog',
    files: [
        'components/hover-card/hover-card.svelte',
        'components/hover-card/hover-card-content.svelte',
        'components/hover-card/hover-card-trigger.svelte',
        'components/hover-card/hover-card-title.svelte',
        'components/hover-card/hover-card-description.svelte',
        'components/hover-card/index.ts',
        'components/hover-card/manifest.ts'
    ],
    components: ['_internal/utils', 'popover'],
    shared: ['transition', 'components/_internal/surface', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        'bits-ui': '^2.19.2',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

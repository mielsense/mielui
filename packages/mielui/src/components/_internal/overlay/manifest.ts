import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Overlay -- internal primitive shared by dialog-content and sheet-content.
 * Coordinates modal presentation: nested stacking depth, the receding earlier
 * panel, the lighter nested scrim, and the deferred close that lets outros
 * finish. Bits UI owns focus and dismissal.
 *
 * Internal visibility -- the CLI installs this as a transitive dependency
 * only. `npx mielui add overlay` is not a valid command; consumers reach
 * overlay only through dialog or sheet.
 *
 * Version history:
 *   1.0.0 -- initial release.
 *   1.2.0 -- inert the background while open.
 *   1.3.0 -- nested dialog stacking.
 *   2.0.0 -- removed the unused `useOverlay` primitive, its `OverlayOptions`
 *           type, and `parentOverlayDepth`. Dialog and Sheet use
 *           `useOverlayPresentation` and `useDeferredClose`.
 */
export const manifest: Manifest = {
    name: '_internal/overlay',
    version: '2.0.0',
    visibility: 'internal',
    description:
        'Shared modal presentation for dialog and sheet: nested stacking, the receding earlier panel, and deferred close. Not directly installable.',
    files: [
        'components/_internal/overlay/overlay.svelte.ts',
        'components/_internal/overlay/index.ts',
        'components/_internal/overlay/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.createContext'],
    peerDependencies: {
        cnfast: '0.0.8',
        '@floating-ui/dom': '1.7.6',
        svelte: '^5.56.0'
    }
};

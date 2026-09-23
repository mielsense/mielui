import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'notch',
    version: '1.0.0',
    visibility: 'public',
    description:
        'A nonmodal panel attached to a viewport edge, with spring motion and composable content.',
    files: [
        'components/notch/context.ts',
        'components/notch/index.ts',
        'components/notch/notch-actions.svelte',
        'components/notch/notch-accessory.svelte',
        'components/notch/notch-close.svelte',
        'components/notch/notch-content.svelte',
        'components/notch/notch-description.svelte',
        'components/notch/notch-header.svelte',
        'components/notch/notch-title.svelte',
        'components/notch/notch.svelte',
        'components/notch/notch-peek.svelte',
        'components/notch/notch-side-action.svelte',
        'components/notch/shape.ts',
        'components/notch/swipe.svelte.ts',
        'components/notch/manifest.ts'
    ],
    components: ['_internal/utils', 'button', 'typography'],
    shared: [
        'utils.cn',
        'utils.createContext',
        'transition',
        'components/_internal/surface',
        'components/_internal/button-attributes'
    ],
    peerDependencies: {
        '@humanspeak/svelte-motion': '^1.2.1',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

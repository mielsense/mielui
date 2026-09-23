import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: '_internal/utils',
    version: '1.0.0',
    visibility: 'internal',
    files: [
        'components/_internal/utils/actions.ts',
        'components/_internal/utils/overlays.ts',
        'components/_internal/utils/overlay-locks.ts',
        'components/_internal/utils/overlay-escape.ts',
        'components/_internal/utils/overlay-focus.ts',
        'components/_internal/utils/overlay-dismiss.ts',
        'components/_internal/utils/positioning.ts'
    ],
    components: [],
    shared: [],
    peerDependencies: { '@floating-ui/dom': '1.7.6' }
};

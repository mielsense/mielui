import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Skeleton.
 *
 * 2.0.1 -- the SkeletonSwap sweep pauses while hidden, offscreen, or in a background tab.
 * 2.1.0 -- SkeletonSwap takes `labels` for its arrival announcement.
 */
export const manifest: Manifest = {
    name: 'skeleton',
    version: '2.1.0',
    visibility: 'public',
    description:
        'Static loading placeholder and a delayed, minimum-visible swap into real content.',
    files: [
        'components/skeleton/skeleton.svelte',
        'components/skeleton/skeleton-swap.svelte',
        'components/skeleton/delayed-presence.svelte.ts',
        'components/skeleton/index.ts',
        'components/skeleton/manifest.ts',
        'actions/shimmer/index.ts'
    ],
    components: ['_internal/utils'],
    shared: ['components/_internal/motion-loop', 'utils.cn', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};

import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'chart',
    version: '1.0.0',
    visibility: 'public',
    description: 'Composable animated bar, line, and area charts built on LayerChart.',
    files: [
        'components/chart/area.svelte',
        'components/chart/axis.svelte',
        'components/chart/bar.svelte',
        'components/chart/context.svelte.ts',
        'components/chart/grid.svelte',
        'components/chart/index.ts',
        'components/chart/interaction.svelte',
        'components/chart/legend.svelte',
        'components/chart/line.svelte',
        'components/chart/manifest.ts',
        'components/chart/motion.ts',
        'components/chart/ticks.ts',
        'components/chart/domains.ts',
        'components/chart/path.svelte',
        'components/chart/plot.svelte',
        'components/chart/placeholder.svelte',
        'components/chart/root.svelte',
        'components/chart/tooltip.svelte',
        'components/chart/x-axis.svelte',
        'components/chart/y-axis.svelte'
    ],
    components: ['_internal/utils', 'card', 'skeleton'],
    shared: ['utils.cn'],
    peerDependencies: { layerchart: '^2.5.0', cnfast: '^0.0.8', svelte: '^5.56.0' }
};

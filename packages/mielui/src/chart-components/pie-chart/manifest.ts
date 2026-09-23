import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'pie-chart',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Composable pie and donut charts with animated updates, accessible values, tooltips, and legends.',
    files: [
        'components/pie-chart/context.ts',
        'components/pie-chart/index.ts',
        'components/pie-chart/pie-chart-arc.svelte',
        'components/pie-chart/pie-chart-label.svelte',
        'components/pie-chart/pie-chart-legend.svelte',
        'components/pie-chart/pie-chart-plot.svelte',
        'components/pie-chart/pie-chart-tooltip.svelte',
        'components/pie-chart/pie-chart.svelte',
        'components/pie-chart/slice.svelte',
        'components/pie-chart/manifest.ts'
    ],
    components: ['_internal/utils', 'card', 'skeleton'],
    shared: ['utils.cn'],
    peerDependencies: {
        layerchart: '^2.5.0',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};

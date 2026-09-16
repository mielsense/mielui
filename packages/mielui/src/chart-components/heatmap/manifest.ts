import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'heatmap',
    version: '1.0.0',
    visibility: 'public',
    description: 'Daily activity in a keyboard-navigable contribution calendar.',
    files: [
        'components/heatmap/heatmap-footer.svelte',
        'components/heatmap/heatmap.svelte',
        'components/heatmap/heatmap-cell.svelte',
        'components/heatmap/heatmap-legend.svelte',
        'components/heatmap/heatmap-summary.svelte',
        'components/heatmap/calendar.ts',
        'components/heatmap/heatmap-grid.svelte',
        'components/heatmap/heatmap-header.svelte',
        'components/heatmap/heatmap-month-labels.svelte',
        'components/heatmap/index.ts',
        'components/heatmap/heatmap-calendar.svelte',
        'components/heatmap/context.svelte.ts',
        'components/heatmap/heatmap-detail.svelte',
        'components/heatmap/heatmap-weekday-labels.svelte',
        'components/heatmap/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};

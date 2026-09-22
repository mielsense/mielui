<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Area from './examples/area.svelte';
    import AreaSrc from './examples/area.svelte?raw';
    import Composition from './examples/composition.svelte';
    import CompositionSrc from './examples/composition.svelte?raw';
    import Grouped from './examples/grouped.svelte';
    import GroupedSrc from './examples/grouped.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Horizontal from './examples/horizontal.svelte';
    import HorizontalSrc from './examples/horizontal.svelte?raw';
    import Line from './examples/line.svelte';
    import LineSrc from './examples/line.svelte?raw';
    import Live from './examples/live.svelte';
    import LiveSrc from './examples/live.svelte?raw';
    import LiveBars from './examples/live-bars.svelte';
    import LiveBarsSrc from './examples/live-bars.svelte?raw';
    import LiveMixed from './examples/live-mixed.svelte';
    import LiveMixedSrc from './examples/live-mixed.svelte?raw';
    import Mixed from './examples/mixed.svelte';
    import MixedSrc from './examples/mixed.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSrc from './examples/states.svelte?raw';
    import Updates from './examples/updates.svelte';
    import UpdatesSrc from './examples/updates.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · Chart</title>
    <meta
        name="description"
        content="Compose animated bar, line, and area charts with LayerChart scales, tooltips, and accessible data."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Chart</Typography.H1>
            <Typography.Text variant="lead" class="mt-2">
                Compare categories and follow changes with composable bar, line, and area charts.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    <section id="installation" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add chart" />
    </section>
    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root owns data, series config, and the category key x. Every configured series has a
            label, an optional theme color, and an optional numeric formatter. Plot establishes the
            LayerChart scales; place Grid, XAxis, YAxis, and marks inside it. Legend and Tooltip
            belong directly inside Root and can be reordered or omitted.
        </Typography.Text>
        <Typography.Text variant="supporting">
            String categories are evenly spaced. Numeric and Date categories retain their relative
            distance. Keep dates in chronological order for lines and areas. Null, missing, and
            non-finite values create gaps instead of invented zeroes. Each mark key should match a
            numeric field and its config entry.
        </Typography.Text>
    </section>
    <section id="grouped" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Compare series</Typography.H2>
        <Typography.Text variant="supporting">
            Each bar series gets its own slot. Missing values leave a gap; zero remains zero.
        </Typography.Text>
        <ComponentPreview code={GroupedSrc}><Grouped /></ComponentPreview>
    </section>
    <section id="horizontal" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Stacked, horizontal bars</Typography.H2>
        <Typography.Text variant="supporting">
            Set orientation="horizontal" and stacked on Root. Positive and negative series stack
            separately around zero.
        </Typography.Text>
        <ComponentPreview code={HorizontalSrc}><Horizontal /></ComponentPreview>
    </section>
    <section id="mixed" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Combine bars and lines</Typography.H2>
        <Typography.Text variant="supporting">
            Mix marks in the same Plot to compare measured totals against a benchmark. Lines do not
            reserve bar slots or contribute to bar stacks.
        </Typography.Text>
        <ComponentPreview code={MixedSrc}><Mixed /></ComponentPreview>
    </section>
    <section id="updates" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Change the data</Typography.H2>
        <Typography.Text variant="supporting">
            Values and the numeric domain transition together. A new update interrupts the current
            motion and moves from the visible values.
        </Typography.Text>
        <ComponentPreview code={UpdatesSrc}><Updates /></ComponentPreview>
    </section>
    <section id="live" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Continuous motion</Typography.H2>
        <Typography.Text variant="supporting">
            Use animation="live" for a slow highlight along the existing marks. The data and chart
            geometry stay unchanged. It pauses when hidden or offscreen.
        </Typography.Text>
        <ComponentPreview code={LiveSrc}><Live /></ComponentPreview>
    </section>
    <section id="line" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Lines over time</Typography.H2>
        <Typography.Text variant="supporting">
            Compare two series without a filled surface. The live highlight follows each line; it
            never changes the plotted values.
        </Typography.Text>
        <ComponentPreview code={LineSrc}><Line /></ComponentPreview>
    </section>
    <section id="area" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Area</Typography.H2>
        <Typography.Text variant="supporting">
            A single filled series emphasizes the amount over time. The fill fades toward the
            baseline while its line remains clear.
        </Typography.Text>
        <ComponentPreview code={AreaSrc}><Area /></ComponentPreview>
    </section>
    <section id="live-bars" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Live bars</Typography.H2>
        <Typography.Text variant="supporting">
            A soft light sweeps across each bar after the entry motion settles. Use live mode for an
            active dashboard without making the bars bounce.
        </Typography.Text>
        <ComponentPreview code={LiveBarsSrc}><LiveBars /></ComponentPreview>
    </section>
    <section id="live-mixed" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Live mixed chart</Typography.H2>
        <Typography.Text variant="supporting">
            Keep measured totals in bars and a benchmark in a line. Both continue animating without
            changing the underlying values.
        </Typography.Text>
        <ComponentPreview code={LiveMixedSrc}><LiveMixed /></ComponentPreview>
    </section>
    <section id="custom-composition" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Omit the Y-axis and grid for a compact trend. Place a custom legend above the plot and
            use the tooltip snippet to control its content.
        </Typography.Text>
        <ComponentPreview code={CompositionSrc}><Composition /></ComponentPreview>
    </section>
    <section id="states" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Loading and empty states</Typography.H2>
        <Typography.Text variant="supporting">
            Set loading on Root while fetching. Plot replaces the marks with neutral chart-shaped
            skeletons; an empty data array shows an empty message. Supply Plot's loading or empty
            snippets to compose your own message or EmptyState. Preserve a useful chart height while
            the data changes.
        </Typography.Text>
    </section>
    <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
    <section id="accessibility" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Motion and accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            Provide a descriptive aria-label on Root. Every chart includes a screen-reader data
            table. Tab to the category controls to inspect tooltip values; Escape dismisses the
            tooltip. Pointer users can inspect the same values across the plot. Use series labels
            and shapes alongside color.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The default reveal settles once. Live mode adds a slow moving highlight without changing
            values. Both respect reduced motion and the theme's motion setting. Set animation="none"
            to disable entry, data transitions, and continuous animation.
        </Typography.Text>
    </section>
</div>

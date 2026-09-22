<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Composition from './examples/composition.svelte';
    import CompositionSrc from './examples/composition.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Live from './examples/live.svelte';
    import LiveSrc from './examples/live.svelte?raw';
    import LivePie from './examples/live-pie.svelte';
    import LivePieSrc from './examples/live-pie.svelte?raw';
    import Pie from './examples/pie.svelte';
    import PieSrc from './examples/pie.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSrc from './examples/states.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Pie Chart</title>
    <meta
        name="description"
        content="Compose animated pie and donut charts with category legends, accessible data, and custom center labels."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Pie Chart</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Show how a few categories contribute to a total.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <ComponentPreview code={HeroSrc} refreshable><Hero /></ComponentPreview>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add pie-chart" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Each data item has a stable key and a nonnegative numeric value. Config maps those keys
            to labels, colors, and optional value formatters. Root requires an accessible label and
            supplies a hidden data table. Missing colors use theme tokens.
        </Typography.Text>
        <Typography.Text>
            Place Arc and Label inside Plot. Tooltip and Legend belong inside Root, outside Plot.
            Omit Label for a solid pie, move Legend above Plot, or use the label, legend, and
            tooltip snippets to render your own content. Keep category keys unique and stable across
            updates.
        </Typography.Text>
        <Typography.Text>
            Arc defaults to a donut with an inner radius of 0.68. Set innerRadius to 0 for a pie;
            values between 0 and 0.95 describe a fraction of the outer radius. Invalid and negative
            values are ignored. An empty or zero-total dataset displays “No data available”; loading
            keeps the plot height and displays a status message.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-8">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="live-motion" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Live donut and data updates
            </Typography.H3>
            <Typography.Text variant="supporting">
                Switch periods while the chart is moving. Angles continue from their current
                positions. Live motion carries a fine highlight along the outline of each slice
                without changing its value or size.
            </Typography.Text>
            <ComponentPreview code={LiveSrc} refreshable><Live /></ComponentPreview>
        </div>
        <div id="live-pie" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Live pie</Typography.H3>
            <Typography.Text variant="supporting">
                The same moving edge highlight works on a solid pie. Each category keeps its true
                share throughout the cycle; hover a slice or focus its legend item to inspect it.
            </Typography.Text>
            <ComponentPreview code={LivePieSrc} refreshable><LivePie /></ComponentPreview>
        </div>
        <div id="custom-composition" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Spend breakdown with custom parts
            </Typography.H3>
            <Typography.Text variant="supporting">
                Use the center-label snippet to show the active category or total. The legend
                snippet adds percentages, while the tooltip uses the same formatted values. These
                are the public parts, rearranged into a responsive comparison.
            </Typography.Text>
            <ComponentPreview code={CompositionSrc} refreshable><Composition /></ComponentPreview>
        </div>
        <div id="loading-and-empty" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Loading, empty, and ready</Typography.H3>
            <Typography.Text variant="supporting">
                Keep Plot mounted while fetching so the layout stays steady. Loading hides stale
                slices and tooltips. Empty arrays and zero totals receive an explicit status; only
                show the legend when its values are ready.
            </Typography.Text>
            <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
        </div>
        <div id="solid-pie" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Solid pie, legend first</Typography.H3>
            <ComponentPreview code={PieSrc}><Pie /></ComponentPreview>
        </div>
    </section>
    <section id="motion-and-accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Motion and accessibility</Typography.H2>
        <Typography.Text>
            Reveal animates entry and data changes. Live adds a slow emphasis cycle after entry and
            pauses when the chart leaves the viewport or the document is hidden. None settles
            immediately. Reduced-motion preferences and disabled theme motion override animated
            modes.
        </Typography.Text>
        <Typography.Text>
            Focus a legend item to inspect its value in the tooltip and emphasize its slice. The
            tooltip follows pointer inspection, anchors to focused legend items, and flips when
            there is not enough space above. Press Escape to dismiss it. Labels and values remain
            available without color or pointer interaction through the accessible table. Use a bar
            chart when exact comparisons or many categories matter more than proportions.
        </Typography.Text>
    </section>
</div>

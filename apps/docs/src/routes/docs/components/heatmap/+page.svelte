<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Composed from './examples/composed.svelte';
    import ComposedSrc from './examples/composed.svelte?raw';
    import { days } from './examples/data';
    import Range from './examples/range.svelte';
    import RangeSource from './examples/range.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const noDays: typeof days = [];

    const usageCode = `<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';

    const days = [
        {
            date: '2026-09-14',
            count: 4
        },
        {
            date: '2026-09-15',
            count: 12
        }
    ];
</${'script'}>

<Heatmap.Root {days} endDate="2026-09-15" weeks={12} />`;
</script>

<svelte:head>
    <title>Mielui · Heatmap</title>
    <meta name="description" content="A contribution calendar for daily activity." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Heatmap">Daily activity in a contribution calendar.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                <div class="w-full max-w-xl">
                    {#key values.animation}
                        <Heatmap.Root
                            days={values.state === 'empty' ? noDays : days}
                            weeks={values.weeks}
                            endDate="2026-09-15"
                            animation={values.animation}
                            loading={values.state === 'loading'}
                        >
                            {#if values.summary}
                                <Heatmap.Header>
                                    <Heatmap.Summary />
                                </Heatmap.Header>
                            {/if}
                            <Heatmap.Calendar>
                                {#if values.monthLabels}
                                    <Heatmap.MonthLabels />
                                {/if}
                                {#if values.weekdayLabels}
                                    <Heatmap.WeekdayLabels />
                                {/if}
                                <Heatmap.Grid />
                            </Heatmap.Calendar>
                            {#if values.tooltip}
                                <Heatmap.Tooltip />
                            {/if}
                            {#if values.detail || values.legend}
                                <Heatmap.Footer>
                                    {#if values.detail}
                                        <Heatmap.Detail />
                                    {/if}
                                    {#if values.legend}
                                        <Heatmap.Legend />
                                    {/if}
                                </Heatmap.Footer>
                            {/if}
                        </Heatmap.Root>
                    {/key}
                </div>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add heatmap" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Pass daily counts with dates in YYYY-MM-DD format. Root renders the complete calendar
            when it has no children. No GitHub connection is required.
        </Typography.Text>
        <CodeBlock copy="overlay" lang="svelte" code={usageCode} />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="custom-composition" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom composition</Typography.H3>
            <Typography.Text variant="supporting">
                This example omits weekday labels, moves the legend before the detail, and reads the
                same total as Summary. Tooltip follows the hovered or focused cell. Select a day
                with Enter, Space, or a click.
            </Typography.Text>
            <ComponentPreview refreshable code={ComposedSrc}>
                <Composed />
            </ComponentPreview>
        </div>

        <div id="changing-range" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Changing the range</Typography.H3>
            <Typography.Text variant="supporting">
                Keep the reporting end date fixed while switching the number of visible weeks.
                Summary counts only dates in that range. On narrow screens, the calendar scrolls
                horizontally.
            </Typography.Text>
            <ComponentPreview code={RangeSource}>
                <Range />
            </ComponentPreview>
        </div>

        <div id="data-states" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Data and animation states</Typography.H3>
            <Typography.Text variant="supporting">
                Set loading while fetching activity. An empty days array shows the empty calendar,
                while days with zero counts stay ready. Both states keep the calendar layout and
                turn off inspection.
            </Typography.Text>
            <ComponentPreview code={StatesSource}>
                <States />
            </ComponentPreview>
        </div>
    </section>

    <section id="without-tooltip" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Without a tooltip</Typography.H2>
        <Typography.Text variant="supporting">
            The automatic layout includes Tooltip. In a custom layout, omit it to keep native
            browser titles instead. Every cell keeps its accessible date and count label.
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="svelte"
            code={`<Heatmap.Root {days} weeks={12} endDate="2026-09-15">
    <Heatmap.Calendar>
        <Heatmap.MonthLabels />
        <Heatmap.WeekdayLabels />
        <Heatmap.Grid />
    </Heatmap.Calendar>
    <Heatmap.Detail />
</Heatmap.Root>`}
        />
    </section>

    <section id="data-and-range" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Data and range</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root takes `days`, `loading`, `weeks`, `endDate`, `weekStartsOn`, `locale`, `animation`, and `onDaySelect`. `weeks` defaults to 26 and accepts 1 to 104. `weekStartsOn` defaults to 0, Sunday, and accepts 0 through 6. `locale` formats month and weekday names and defaults to `en-US`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Dates use UTC. Input order does not matter, missing dates count as zero, and the last entry wins when a date repeats. `endDate` defaults to the latest supplied date, or today for an empty dataset; set it for a stable reporting period."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The calendar starts at the beginning of the first week and stops at `endDate`. Totals include only visible dates. Counts must be finite and non-negative. An optional `level` from 0 to 4 sets a day's intensity; otherwise intensity follows the largest visible count. Invalid values throw a RangeError."}
            />
        </Typography.Text>
    </section>

    <section id="animation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Animation</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`animation` defaults to `rows`. Choose `columns` for a left-to-right stagger, `live` for a repeating column highlight, or `none` to render immediately. Live motion keeps the counts unchanged and pauses during inspection, offscreen, and in hidden documents. Entrance timing follows the theme's motion setting, and reduced motion skips the entrance."}
            />
        </Typography.Text>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            Root owns the data and passes days and total to its children snippet. Header, Calendar,
            and Footer arrange content. Summary passes its total to a children snippet. Grid passes
            the computed days to a children snippet; render a Cell for each. Detail passes the
            active day to a children snippet.
        </Typography.Text>
        <Typography.Text variant="supporting">
            MonthLabels, WeekdayLabels, and Legend render default labels that children can replace.
            Each part accepts native attributes and class. Keep Grid inside Calendar so the month
            and weekday labels line up.
        </Typography.Text>
    </section>

    <section id="accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Keyboard and accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            Tab enters the calendar once. Arrow keys move between dates, Home focuses the first
            visible date, and End the last. Left and right follow the layout in RTL. Each cell
            announces its full date and count, so color is not the only source of information.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Hover or focus updates Detail and opens Tooltip; Escape closes the tooltip. Activating a cell calls `onDaySelect` with the computed day."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English. Pass a `labels` object to Root to translate the unit in cell labels and the summary (`unit`, a function of the count), the tooltip heading (`tooltipValue`), the legend ends (`less`, `more`), the grid's accessible name in each state (`grid`, `gridLoading`, `gridEmpty`), the detail line while loading or empty (`detailLoading`, `detailEmpty`), and the summary before data is ready (`summaryPending`). `HeatmapLabels` types it; every key is optional."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<Heatmap.Root
    {days}
    labels={{
        unit: (count) => (count === 1 ? 'commit' : 'commits'),
        less: 'Moins',
        more: 'Plus'
    }}
/>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>

<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Composed from './examples/composed.svelte';
    import ComposedSrc from './examples/composed.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Range from './examples/range.svelte';
    import RangeSource from './examples/range.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';

    let animation = $state<'rows' | 'columns' | 'none'>('rows');

    function changeAnimation(value: string) {
        if (value === 'rows' || value === 'columns' || value === 'none') {
            animation = value;
        }
    }
</script>
<svelte:head>
    <title>Mielui · Heatmap</title>
    <meta name="description" content="A contribution calendar for daily activity." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Heatmap">Daily activity in a contribution calendar.</PageIntro>
    <ComponentPreview refreshable code={HeroSrc}>
        {#snippet controls()}
            <Tabs.Root value={animation} onValueChange={changeAnimation} variant="ghost">
                <div role="group" aria-label="Entrance direction">
                    <Tabs.List>
                        <Tabs.Trigger value="rows">Rows</Tabs.Trigger>
                        <Tabs.Trigger value="columns">Columns</Tabs.Trigger>
                        <Tabs.Trigger value="none">None</Tabs.Trigger>
                    </Tabs.List>
                </div>
            </Tabs.Root>
        {/snippet}
        <Hero {animation} />
    </ComponentPreview>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add heatmap" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Pass daily counts with dates in YYYY-MM-DD format. Root renders the complete calendar by
            default. No GitHub connection is required.
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="svelte"
            code={`import * as Heatmap from '@mielui/svelte/components/heatmap';

<Heatmap.Root
    days={[{ date: '2026-09-15', count: 12 }]}
    endDate="2026-09-15"
    weeks={12}
/>`}
        />
    </section>
    <section id="custom-composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Custom composition</Typography.H2>
        <Typography.Text>
            This example omits weekday labels, moves the legend before the detail, and reads the
            same total as Summary. Tooltip follows the hovered or focused cell. Select a day with
            Enter, Space, or a click.
        </Typography.Text>
        <ComponentPreview refreshable code={ComposedSrc}><Composed /></ComponentPreview>
    </section>
    <section id="without-tooltip" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Without a tooltip</Typography.H2>
        <Typography.Text>
            The automatic layout includes Tooltip. In a custom layout, omit it to keep native
            browser titles instead. Every cell retains its accessible date and count label.
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
    <section id="changing-range" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Changing the range</Typography.H2>
        <Typography.Text variant="supporting">
            Keep the reporting end date fixed while switching the number of visible weeks. Summary
            counts only dates in that range. On narrow screens, scroll the calendar horizontally.
        </Typography.Text>
        <ComponentPreview code={RangeSource}><Range /></ComponentPreview>
    </section>
    <section id="data-and-range" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Data and range</Typography.H2>
        <Typography.Text>
            Root accepts days, weeks, endDate, weekStartsOn, locale, animation, and onDaySelect.
            Weeks defaults to 26 and supports 1 to 104. WeekStartsOn defaults to Sunday, 0, and
            accepts 0 through 6. Locale defaults to en-US.
        </Typography.Text>
        <Typography.Text>
            Dates use UTC. Input order does not matter, missing dates receive a zero count, and the
            last entry wins when dates repeat. EndDate defaults to the latest supplied date, or
            today for an empty dataset. Set it explicitly for a stable reporting period.
        </Typography.Text>
        <Typography.Text>
            The calendar starts at the beginning of the first week and stops at endDate. Totals
            include only visible dates. Counts must be finite and non-negative. Optional level
            accepts an integer from 0 to 4; otherwise intensity follows the largest visible count.
            Invalid values throw a RangeError.
        </Typography.Text>
    </section>
    <section id="animation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Animation</Typography.H2>
        <Typography.Text>
            Animation defaults to rows. Choose columns for a left-to-right stagger, or none for
            immediate rendering. Entrance timing follows the theme motion setting, and reduced
            motion skips the entrance. The replay control remounts the example with the selected
            direction.
        </Typography.Text>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Parts</Typography.H2>
        <Typography.Text>
            Root owns the data and provides a children snippet with days and total. Header,
            Calendar, and Footer arrange content. Summary provides its total to a children snippet.
            Grid provides computed days to a children snippet; render Cell with a day from that
            list. Detail provides the active day to a children snippet.
        </Typography.Text>
        <Typography.Text>
            MonthLabels, WeekdayLabels, and Legend provide default labels that children can replace.
            Each part accepts native attributes and class. Keep Grid inside Calendar for aligned
            month and weekday labels.
        </Typography.Text>
    </section>
    <section id="accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Keyboard and accessibility</Typography.H2>
        <Typography.Text>
            Tab enters the calendar once. Arrow keys move between dates, Home focuses the first
            visible date, and End focuses the last. Left and right follow the layout in RTL. Each
            cell announces its full date and count, so color is not the only source of information.
        </Typography.Text>
        <Typography.Text>
            Hover or focus updates Detail and opens Tooltip. Escape dismisses the tooltip.
            Activation calls onDaySelect with the computed day. The chart scrolls horizontally when
            its cells cannot fit the available width.
        </Typography.Text>
    </section>
    <section id="data-states" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title="Data and animation states">
            {#snippet description()}
                Compare loading, empty, and ready layouts with row, column, live, or no motion.
                Loading and empty cards are application compositions; Root treats missing dates as
                zero activity. The live example highlights columns without changing contribution
                counts and pauses while you inspect the calendar.
            {/snippet}
        </SectionHeading>
        <ComponentPreview code={StatesSource}><States /></ComponentPreview>
    </section>
</div>

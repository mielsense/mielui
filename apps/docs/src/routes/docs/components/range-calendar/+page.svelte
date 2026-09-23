<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Constraints from './examples/constraints.svelte';
    import ConstraintsSrc from './examples/constraints.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example0 from './examples/two-months.svelte';
    import Example0Src from './examples/two-months.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Range Calendar</title>
    <meta
        name="description"
        content="Choose a start and end date with keyboard navigation and a continuous range highlight."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Range Calendar">
        Choose a start and end date with keyboard navigation and a continuous range highlight.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add range-calendar" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Bind an object with start and end DateValue properties. An incomplete selection has an
            undefined end. The default view uses the same Header, Month, Cell and Day parts you can
            compose yourself.
        </Typography.Text>
        <CodeBlock
            code={`import * as RangeCalendar from '$lib/mielui/components/range-calendar';

<RangeCalendar.Root bind:value calendarLabel="Travel dates" />`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Use CalendarDate from @internationalized/date for date-only values, or parseDate for ISO
            date strings. Bind placeholder to control the visible month. An explicit locale and
            placeholder keep server and client formatting predictable. Avoid converting a date-only
            selection through a UTC JavaScript Date to store it. Save each endpoint with
            value.start?.toString() and value.end?.toString().
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-8">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="two-months" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Across months</Typography.H3>
            <Typography.Text variant="supporting">
                numberOfMonths controls the visible months. pagedNavigation advances a page at a
                time. This example has no range-length limit. Optional minDays and maxDays count
                both endpoints; an out-of-range second selection becomes a new start date.
            </Typography.Text>
            <ComponentPreview code={Example0Src}><Example0 /></ComponentPreview>
        </div>
    </section>
    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition and accessibility</Typography.H2>
        <Typography.Text>
            Root exposes a children snippet with months and weekdays. Keep the default Month, or
            compose Grid, GridHead, GridBody, GridRow, HeadCell, Cell and Day to restyle individual
            regions. Month also accepts a day(date) snippet. Header, Heading, PrevButton,
            NextButton, MonthSelect and YearSelect can be omitted, reordered or replaced with
            another documented composition.
        </Typography.Text>
        <Typography.Text>
            Styled parts forward native attributes and expose bind:ref for their underlying element.
            Arrow keys move between days, Page Up and Page Down change the visible month, and Enter
            or Space selects. Focus and selection are distinct. Disabled dates cannot be selected;
            readonly calendars remain navigable. The today indicator and unavailable strike-through
            provide cues beyond color.
        </Typography.Text>
        <Typography.Text>
            The standalone calendar does not create a form field. Add a named hidden input when it
            participates in a form, or use the corresponding date picker for editable fields and
            form serialization. The calendar grid stays still during navigation; only state feedback
            changes.
        </Typography.Text>
    </section>
    <section id="constraints" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Bounds and custom composition</Typography.H2>
        <Typography.Text variant="supporting">
            Choose two to seven days within September. This composition omits navigation buttons
            because dates outside the month are unavailable.
        </Typography.Text>
        <ComponentPreview code={ConstraintsSrc}><Constraints /></ComponentPreview>
    </section>
</div>

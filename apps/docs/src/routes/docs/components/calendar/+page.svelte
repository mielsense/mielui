<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Example0 from './examples/constraints.svelte';
    import Example0Src from './examples/constraints.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example1 from './examples/navigation.svelte';
    import Example1Src from './examples/navigation.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Calendar</title>
    <meta name="description" content="A composable calendar for choosing a single date." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Calendar">A composable calendar for choosing a single date.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add calendar" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Bind a DateValue or undefined. The default view renders Header, navigation and Month
            through the same parts available for custom composition. Use RangeCalendar for a
            continuous range.
        </Typography.Text>
        <CodeBlock
            code={`import * as Calendar from '$lib/mielui/components/calendar';

<Calendar.Root bind:value calendarLabel="Meeting date" />`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Use CalendarDate from @internationalized/date for date-only values, or parseDate for ISO
            date strings. Bind placeholder to control the visible month. An explicit locale and
            placeholder keep server and client formatting predictable. Avoid converting a date-only
            selection through a UTC JavaScript Date to store it; value.toString() preserves its
            calendar date.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-8">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="constraints" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Constraints</Typography.H3>
            <Typography.Text variant="supporting">
                Restrict the selectable dates with minValue, maxValue and isDateDisabled.
                Unavailable dates remain focusable and indicate invalid selections; disabled dates
                cannot be selected.
            </Typography.Text>
            <ComponentPreview code={Example0Src}><Example0 /></ComponentPreview>
        </div>
        <div id="navigation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Month and year navigation</Typography.H3>
            <Typography.Text variant="supporting">
                Replace the default header with MonthSelect and YearSelect. Supply an explicit years
                array to make the navigation range clear.
            </Typography.Text>
            <ComponentPreview code={Example1Src}><Example1 /></ComponentPreview>
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
</div>

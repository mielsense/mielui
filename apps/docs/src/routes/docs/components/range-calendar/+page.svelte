<script lang="ts">
    import { CalendarDate, type DateValue, isWeekend } from '@internationalized/date';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Constraints from './examples/constraints.svelte';
    import ConstraintsSrc from './examples/constraints.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import ExcludeDisabledExample from './examples/exclude-disabled.svelte';
    import ExcludeDisabledExampleSrc from './examples/exclude-disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example0 from './examples/two-months.svelte';
    import Example0Src from './examples/two-months.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        WEEK_START
    } from './playground';

    const booked = [8, 9, 22];
    const minDate = new CalendarDate(2026, 9, 7);
    const maxDate = new CalendarDate(2026, 10, 16);
    let range = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: new CalendarDate(2026, 9, 17),
        end: new CalendarDate(2026, 9, 23)
    });

    function isBooked(day: DateValue) {
        return day.month === 9 && booked.includes(day.day);
    }

    function weekendMatcher(locale: string) {
        return (day: DateValue) => {
            return isWeekend(day, locale);
        };
    }
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="mielui-plate max-w-full">
                    {#if values.header === 'selects'}
                        <RangeCalendar.Root
                            bind:value={range}
                            calendarLabel="Travel dates"
                            locale={values.locale}
                            weekdayFormat={values.weekdayFormat}
                            monthFormat={values.monthFormat}
                            yearFormat={values.yearFormat}
                            weekStartsOn={WEEK_START[values.weekStartsOn]}
                            numberOfMonths={values.numberOfMonths}
                            fixedWeeks={values.fixedWeeks}
                            disabled={values.disabled}
                            readonly={values.readonly}
                            minValue={values.bounds ? minDate : undefined}
                            maxValue={values.bounds ? maxDate : undefined}
                            isDateDisabled={values.weekends ? weekendMatcher(values.locale) : undefined}
                            isDateUnavailable={values.unavailable ? isBooked : undefined}
                            minDays={values.limit ? 2 : undefined}
                            maxDays={values.limit ? 7 : undefined}
                            excludeDisabled={values.excludeDisabled}
                            preventDeselect={values.preventDeselect}
                            pagedNavigation={values.pagedNavigation}
                            disableDaysOutsideMonth={values.disableDaysOutsideMonth}
                        >
                            {#snippet children({ months, weekdays })}
                                <RangeCalendar.Header>
                                    <RangeCalendar.MonthSelect />
                                    <RangeCalendar.YearSelect />
                                </RangeCalendar.Header>
                                <div class="flex max-w-full flex-wrap justify-center gap-3">
                                    {#each months as month (month.value.toString())}
                                        <RangeCalendar.Month
                                            {month}
                                            {weekdays}
                                            locale={values.locale}
                                            showHeading={values.numberOfMonths > 1}
                                        />
                                    {/each}
                                </div>
                            {/snippet}
                        </RangeCalendar.Root>
                    {:else}
                        <RangeCalendar.Root
                            bind:value={range}
                            calendarLabel="Travel dates"
                            locale={values.locale}
                            weekdayFormat={values.weekdayFormat}
                            monthFormat={values.monthFormat}
                            yearFormat={values.yearFormat}
                            weekStartsOn={WEEK_START[values.weekStartsOn]}
                            numberOfMonths={values.numberOfMonths}
                            fixedWeeks={values.fixedWeeks}
                            disabled={values.disabled}
                            readonly={values.readonly}
                            minValue={values.bounds ? minDate : undefined}
                            maxValue={values.bounds ? maxDate : undefined}
                            isDateDisabled={values.weekends ? weekendMatcher(values.locale) : undefined}
                            isDateUnavailable={values.unavailable ? isBooked : undefined}
                            minDays={values.limit ? 2 : undefined}
                            maxDays={values.limit ? 7 : undefined}
                            excludeDisabled={values.excludeDisabled}
                            preventDeselect={values.preventDeselect}
                            pagedNavigation={values.pagedNavigation}
                            disableDaysOutsideMonth={values.disableDaysOutsideMonth}
                        />
                    {/if}
                </div>
            {/snippet}
        </Playground>
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
            code={`import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

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
        <div id="bound-range" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Bound range</Typography.H3>
            <Typography.Text variant="supporting">
                The line under the calendar prints the start and end dates as they change.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>
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
    <section id="range-events" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Range events</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` runs when the range changes. A range is only complete once both ends are set, so `onStartValueChange` and `onEndValueChange` report each end as it is picked, before the range is whole. Use them to react to the first click."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`preventDeselect` stops a click on a selected end from clearing the range. `onPlaceholderChange` runs when the visible month changes, and `disabled` on Root turns the whole calendar off."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
    <section id="unavailable-dates" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Unavailable and disabled dates</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`isDateDisabled` removes a date from play: it cannot be focused or picked. `isDateUnavailable` is softer. An unavailable date is struck through and can still be focused, so keyboard users can read why it is off limits, and picking it marks the value invalid."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A range can be drawn across disabled dates. Set `excludeDisabled` to clear the range instead whenever it would contain one, so a booking never spans a closed day."}
            />
        </Typography.Text>
        <ComponentPreview code={ExcludeDisabledExampleSrc}>
            <ExcludeDisabledExample />
        </ComponentPreview>
    </section>
    <section id="grid-and-formats" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Grid, formats and parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`weekStartsOn` sets the first column, from 0 for Sunday to 6 for Saturday, and falls back to the locale. `weekdayFormat` picks `narrow`, `short` or `long` weekday names. `fixedWeeks` is on by default and always draws six rows so the height never jumps between months. Turn it off to draw only the weeks a month needs. Days from the neighbouring months fill the grid and cannot be selected. Set `disableDaysOutsideMonth={false}` to make them selectable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`monthFormat` and `yearFormat` on Root control how the heading and the selects name months and years. Each takes an `Intl` style such as `short` or `2-digit`, or a function that receives the number and returns the text. MonthSelect and YearSelect take the same two props to override the format for their own options, and YearSelect takes `years`, the exact list of years to offer."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"When you compose the calendar yourself, every part except Root and Month accepts `child`, a snippet that receives the part's props so you can render your own element with them, and `style` for inline styles. Month takes `showHeading` to print the month name above its grid, which Root turns on by itself when it shows more than one month."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText text={"Root also accepts `style`."} />
        </Typography.Text>
    </section>
</div>

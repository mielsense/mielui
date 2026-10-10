<script lang="ts">
    import { CalendarDate, type DateValue, isWeekend } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Example0 from './examples/constraints.svelte';
    import Example0Src from './examples/constraints.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example1 from './examples/navigation.svelte';
    import Example1Src from './examples/navigation.svelte?raw';
    import UnavailableExample from './examples/unavailable.svelte';
    import UnavailableExampleSrc from './examples/unavailable.svelte?raw';
    import WeeksExample from './examples/weeks.svelte';
    import WeeksExampleSrc from './examples/weeks.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        WEEK_START
    } from './playground';

    const booked = [8, 9, 22];
    const minDate = new CalendarDate(2026, 9, 7);
    const maxDate = new CalendarDate(2026, 10, 16);
    let date = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));

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
    <title>Mielui · Calendar</title>
    <meta name="description" content="A composable calendar for choosing a single date." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Calendar">A composable calendar for choosing a single date.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="mielui-plate max-w-full">
                    {#if values.header === 'selects'}
                        <Calendar.Root
                            bind:value={date}
                            calendarLabel="Meeting date"
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
                            preventDeselect={values.preventDeselect}
                            pagedNavigation={values.pagedNavigation}
                            disableDaysOutsideMonth={values.disableDaysOutsideMonth}
                        >
                            {#snippet children({ months, weekdays })}
                                <Calendar.Header>
                                    <Calendar.MonthSelect />
                                    <Calendar.YearSelect />
                                </Calendar.Header>
                                <div class="flex max-w-full flex-wrap justify-center gap-3">
                                    {#each months as month (month.value.toString())}
                                        <Calendar.Month
                                            {month}
                                            {weekdays}
                                            locale={values.locale}
                                            showHeading={values.numberOfMonths > 1}
                                        />
                                    {/each}
                                </div>
                            {/snippet}
                        </Calendar.Root>
                    {:else}
                        <Calendar.Root
                            bind:value={date}
                            calendarLabel="Meeting date"
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
            code={`import * as Calendar from '@mielui/svelte/components/calendar';

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
        <div id="bound-value" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Bound value</Typography.H3>
            <Typography.Text variant="supporting">
                The line under the calendar prints the bound date each time the selection changes.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>
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
    <section id="selection-events" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Selection events</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` runs with the new date each time the selection changes. Clicking the selected date again clears it, and the callback then receives `undefined`. Set `preventDeselect` to keep a date selected until another one replaces it."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The calendar also tracks a placeholder, the date that decides which month is on screen. `onPlaceholderChange` runs when that moves, for example when someone pages to the next month. `initialFocus` moves keyboard focus to the selected day, or today, as soon as the calendar mounts. `maxDays` belongs to multi-date selection and does nothing on this single-date calendar."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
    <section id="weeks-and-months" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Weeks and months</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`weekStartsOn` sets the first column, from 0 for Sunday to 6 for Saturday, and falls back to the locale. `weekdayFormat` picks `narrow`, `short` or `long` weekday names. `fixedWeeks` is on by default and always draws six rows so the height never jumps between months. Turn it off to draw only the weeks a month needs. Days from the neighbouring months fill the grid and cannot be selected. Set `disableDaysOutsideMonth={false}` to make them selectable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`numberOfMonths` shows several months side by side. With more than one, the arrows move a single month at a time unless you set `pagedNavigation`, which jumps by the number of months shown."}
            />
        </Typography.Text>
        <ComponentPreview code={WeeksExampleSrc}>
            <WeeksExample />
        </ComponentPreview>
    </section>
    <section id="unavailable-dates-and-formats" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Unavailable dates and formats</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`isDateDisabled` removes a date from play: it cannot be focused or picked. `isDateUnavailable` is softer. An unavailable date is struck through and can still be focused, so keyboard users can read why it is off limits, and picking it marks the value invalid."}
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
        <ComponentPreview code={UnavailableExampleSrc}>
            <UnavailableExample />
        </ComponentPreview>
    </section>
</div>

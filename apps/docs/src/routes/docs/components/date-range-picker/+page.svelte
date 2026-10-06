<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Example1 from './examples/disabled.svelte';
    import Example1Src from './examples/disabled.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import ExcludeDisabledExample from './examples/exclude-disabled.svelte';
    import ExcludeDisabledExampleSrc from './examples/exclude-disabled.svelte?raw';
    import FormExample from './examples/form.svelte';
    import FormExampleSrc from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example0 from './examples/two-months.svelte';
    import Example0Src from './examples/two-months.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Date Range Picker</title>
    <meta name="description" content="Editable start and end dates with a shared calendar popup." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Date Range Picker">
        Editable start and end dates with a shared calendar popup.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add date-range-picker" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Compose two Inputs with type="start" and type="end". Each Input accepts its own form
            name. Bind an object with start and end DateValue properties; either endpoint can be
            undefined while editing.
        </Typography.Text>
        <CodeBlock
            code={`import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

<DateRangePicker.Root bind:value>
  <DateRangePicker.Label>Travel dates</DateRangePicker.Label>
  <DateRangePicker.Input type="start" name="arrival" aria-label="Arrival" />
  <DateRangePicker.Input type="end" name="departure" aria-label="Departure" />
  <DateRangePicker.Trigger />
  <DateRangePicker.Content align="end">
    <DateRangePicker.Calendar />
  </DateRangePicker.Content>
</DateRangePicker.Root>`}
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
        <div id="two-months" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Booking range</Typography.H3>
            <Typography.Text variant="supporting">
                Show two months with numberOfMonths and use minDays/maxDays for booking limits.
                Months wrap in narrow containers.
            </Typography.Text>
            <ComponentPreview code={Example0Src}><Example0 /></ComponentPreview>
        </div>
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <Typography.Text variant="supporting">
                disabled prevents editing and calendar activation. readonly preserves navigation
                while preventing value changes.
            </Typography.Text>
            <ComponentPreview code={Example1Src}><Example1 /></ComponentPreview>
        </div>
    </section>
    <section id="form" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Forms and reset</Typography.H2>
        <Typography.Text>
            A named Input submits its ISO date value. Required and invalid fields block submission;
            focus moves to the visible date segments. Disabled fields are omitted. Reset restores
            the initial selection. Input also accepts form to associate it with an external form.
        </Typography.Text>
        <ComponentPreview code={FormExampleSrc}><FormExample /></ComponentPreview>
    </section>
    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition and accessibility</Typography.H2>
        <Typography.Text>
            Calendar exposes a children snippet with months and weekdays. Keep the default Month, or
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
            Input exposes a children snippet with segments for custom field composition. Render each
            Segment with its part to preserve keyboard editing. Put name on Input for ISO-value form
            submission, and required or validation callbacks on Root. Use errorMessageId to connect
            your error message. Popup focus returns to the trigger when dismissed; motion respects
            reduced-motion preferences.
        </Typography.Text>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to DateRangePicker.Root to translate or
            reword the calendar trigger, the calendar panel, and the validation message. Every key
            is optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<DateRangePicker.Root labels={{ trigger: 'Choisir des dates', content: 'Choisir des dates', invalid: 'Saisissez une date valide.' }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="range-events" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Range events</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` runs when the range changes. `onStartValueChange` and `onEndValueChange` report each end as it is picked, before the range is complete. `preventDeselect` stops a click on a selected end from clearing the range, and `onPlaceholderChange` runs when the visible month changes."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The panel closes once both ends are picked. Set `closeOnRangeSelect={false}` to keep it open. Bind `open` to control it yourself, with `onOpenChange` for each change and `onOpenChangeComplete` for the moment the animation ends."}
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
                text={"A range can be drawn across disabled dates. Set `excludeDisabled` to clear the range whenever it would contain one. `validate` receives the range and returns an error message when your own rule rejects it, and `onInvalid` runs with the reason and that message."}
            />
        </Typography.Text>
        <ComponentPreview code={ExcludeDisabledExampleSrc}>
            <ExcludeDisabledExample />
        </ComponentPreview>
    </section>
    <section id="grid-and-field" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading"
            >Grid, formats and the typed fields</Typography.H2
        >
        <Typography.Text variant="supporting">
            <InlineText
                text={"`weekStartsOn` sets the first column, from 0 for Sunday to 6 for Saturday, and falls back to the locale. `weekdayFormat` picks `narrow`, `short` or `long` weekday names. `fixedWeeks` is on by default and always draws six rows so the height never jumps between months. Turn it off to draw only the weeks a month needs. Days from the neighbouring months fill the grid, and `disableDaysOutsideMonth` makes them unselectable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`monthFormat` and `yearFormat` on Root control how the heading and the selects name months and years. Each takes an `Intl` style such as `short` or `2-digit`, or a function that receives the number and returns the text. MonthSelect and YearSelect take the same two props to override the format for their own options, and YearSelect takes `years`, the exact list of years to offer."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The typed field has its own options on Root. `granularity` decides which segments it shows, from `day` down to `second`, `hourCycle` picks a 12 or 24 hour clock, and `hideTimeZone` drops the zone name. `readonlySegments` locks the segments you list while the rest stay editable."}
            />
        </Typography.Text>
    </section>
    <section id="panel-position" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Panel position and dismissal</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content positions the calendar panel. `side` picks the edge of the field it opens from and flips when there is no room, `sideOffset` is the gap in pixels, and `alignOffset` nudges it along that edge. `avoidCollisions`, `collisionBoundary` and `collisionPadding` control how it stays inside the viewport or another container. `sticky` keeps it in view while the field scrolls, `hideWhenDetached` hides it once the field scrolls away, and `customAnchor` positions it against a different element. `strategy` switches between absolute and fixed positioning, `updatePositionStrategy` set to `always` re-measures every frame for a field that moves, and `arrowPadding` and `dir` cover arrows and right-to-left text."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The same part owns dismissal and focus. `interactOutsideBehavior` and `escapeKeydownBehavior` take `close`, `ignore`, or one of the two defer values that ask a parent layer first. `onInteractOutside`, `onFocusOutside` and `onEscapeKeydown` run for each event and can call `preventDefault()` to keep the panel open. `trapFocus`, `preventScroll` and `preventOverflowTextSelection` decide whether Tab, page scrolling and text selection can leave the panel, and `onOpenAutoFocus` and `onCloseAutoFocus` let you redirect focus when it opens and closes. `surface` picks solid or glass, and `portal={false}` renders the panel in place."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"When you compose the calendar yourself, every part except Root and Month accepts `child`, a snippet that receives the part's props so you can render your own element with them, and `style` for inline styles. Month takes `showHeading` to print the month name above its grid, which Root turns on by itself when it shows more than one month."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Input, Trigger, Calendar and Content also accept `style`. Trigger takes `openOnHover` with `openDelay` and `closeDelay` to open the panel when the pointer rests on it."}
            />
        </Typography.Text>
    </section>
</div>

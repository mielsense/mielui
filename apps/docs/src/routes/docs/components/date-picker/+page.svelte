<script lang="ts">
    import type { DateValue } from '@internationalized/date';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import {
        hasTime,
        isBooked,
        maxDate,
        minDate,
        startDate,
        startTime,
        weekendMatcher
    } from '#lib/components/docs/playground/calendar.js';
    import CalendarOptionsExample from './examples/calendar-options.svelte';
    import CalendarOptionsExampleSrc from './examples/calendar-options.svelte?raw';
    import DisabledExample from './examples/disabled.svelte';
    import DisabledExampleSrc from './examples/disabled.svelte?raw';
    import FormExample from './examples/form.svelte';
    import FormExampleSrc from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import LocalizedExample from './examples/localized.svelte';
    import LocalizedExampleSrc from './examples/localized.svelte?raw';
    import StayOpenExample from './examples/stay-open.svelte';
    import StayOpenExampleSrc from './examples/stay-open.svelte?raw';
    import ValidateExample from './examples/validate.svelte';
    import ValidateExampleSrc from './examples/validate.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let date = $state<DateValue | undefined>(startDate);
    let dateTime = $state<DateValue | undefined>(startTime);

    const usageCode = `<script lang="ts">
    import type { DateValue } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';

    let value = $state<DateValue | undefined>();
</${'script'}>

<DatePicker.Root bind:value>
    <DatePicker.Label>Publish date</DatePicker.Label>
    <DatePicker.Input name="publishDate" />
    <DatePicker.Trigger />
    <DatePicker.Content align="end">
        <DatePicker.Calendar />
    </DatePicker.Content>
</DatePicker.Root>`;

    const labelsCode = `<script lang="ts">
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import type { DatePickerLabels } from '@mielui/svelte/components/date-picker';

    const labels: DatePickerLabels = {
        trigger: 'Choisir une date',
        content: 'Calendrier',
        invalid: 'Saisissez une date valide.'
    };
</${'script'}>

<DatePicker.Root locale="fr-FR" {labels}>
    <DatePicker.Label>Date du rendez-vous</DatePicker.Label>
    <DatePicker.Input name="appointment" />
    <DatePicker.Trigger />
    <DatePicker.Content align="end">
        <DatePicker.Calendar />
    </DatePicker.Content>
</DatePicker.Root>`;
</script>

<svelte:head>
    <title>Mielui · Date Picker</title>
    <meta name="description" content="An editable date field with a calendar popup." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Date Picker">An editable date field with a calendar popup.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const withTime = $derived(hasTime(values))}
                <div class="w-full max-w-sm">
                    {#key withTime}
                        <DatePicker.Root
                            bind:value={
                                () => (withTime ? dateTime : date),
                                (next) => {
                                    if (withTime) {
                                        dateTime = next;
                                    } else {
                                        date = next;
                                    }
                                }
                            }
                            calendarLabel="Publish date"
                            locale={values.locale}
                            granularity={values.granularity}
                            disabled={values.disabled}
                            minValue={values.bounds ? minDate : undefined}
                            maxValue={values.bounds ? maxDate : undefined}
                            isDateDisabled={values.weekends
                                ? weekendMatcher(values.locale)
                                : undefined}
                            isDateUnavailable={values.unavailable ? isBooked : undefined}
                        >
                            <div class="grid gap-2">
                                {#if values.label}
                                    <DatePicker.Label>Publish date</DatePicker.Label>
                                {/if}
                                <Group.Root aria-label="Publish date controls" class="w-full">
                                    <DatePicker.Input
                                        name="publishDate"
                                        aria-label={values.label ? undefined : 'Publish date'}
                                    />
                                    <Group.Separator />
                                    <DatePicker.Trigger />
                                </Group.Root>
                            </div>
                            <DatePicker.Content
                                align="end"
                                surface={values.surface === 'theme' ? undefined : values.surface}
                            >
                                <DatePicker.Calendar />
                            </DatePicker.Content>
                        </DatePicker.Root>
                    {/key}
                </div>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add date-picker" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Compose Label, Input, Trigger and Content around Calendar. Input renders localized
            editable segments and a hidden native validation control. Add name to include the date
            in form data. The field and calendar share the same DateValue.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
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
        <div id="helper-text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Helper text</Typography.H3>
            <Typography.Text variant="supporting">
                A line under the field tells people they can type the date or pick it.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>
        <div id="localized" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Localized input</Typography.H3>
            <Typography.Text variant="supporting">
                locale sets the field order, weekday names and month names. Pass labels to translate
                the trigger and panel names, and set weekStartsOn when the first day must not follow
                the locale.
            </Typography.Text>
            <ComponentPreview code={LocalizedExampleSrc}>
                <LocalizedExample />
            </ComponentPreview>
        </div>
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <Typography.Text variant="supporting">
                disabled turns off the field and the trigger. readonly keeps the calendar navigable
                but blocks changes to the value.
            </Typography.Text>
            <ComponentPreview code={DisabledExampleSrc}>
                <DisabledExample />
            </ComponentPreview>
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
            Styled parts forward native attributes and expose bind:element for their underlying
            element. On Root, bind:element refers to the element that wraps its parts. Arrow keys
            move between days, Page Up and Page Down change the visible month, and Enter or Space
            selects. Focus and selection are distinct. Disabled dates cannot be selected; readonly
            calendars remain navigable. The today indicator and unavailable strike-through provide
            cues beyond color.
        </Typography.Text>
        <Typography.Text>
            Input exposes a children snippet with segments for custom field composition. Render each
            Segment with its part to preserve keyboard editing. Put name on Input for ISO-value form
            submission, and required or validation callbacks on Root. Use errorMessageId to connect
            your error message. Popup focus returns to the trigger when dismissed; motion respects
            reduced-motion preferences.
        </Typography.Text>
    </section>
    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English. Pass a DatePickerLabels object to labels on Root to translate
            or reword the trigger name, the panel name and the validation message. Every key is
            optional, and an omitted key keeps its English default.
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
    <section id="calendar-options" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Calendar options</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root passes the calendar's options through to the panel. `isDateDisabled` removes a date from play: it cannot be focused or picked. `isDateUnavailable` is softer. An unavailable date is struck through and can still be focused, so keyboard users can read why it is off limits, and picking it marks the value invalid."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`numberOfMonths` shows more than one month and `pagedNavigation` makes the arrows jump by that many. `weekdayFormat`, `fixedWeeks` and `disableDaysOutsideMonth` shape the grid the same way they do on [Calendar](/docs/components/calendar), and `monthFormat` and `yearFormat` name the months and years."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`preventDeselect` keeps a date selected when it is clicked again. `onValueChange` runs with each new date, and `onPlaceholderChange` runs when the visible month changes. `initialFocus` puts keyboard focus on a day as soon as the panel opens."}
            />
        </Typography.Text>
        <ComponentPreview code={CalendarOptionsExampleSrc}>
            <CalendarOptionsExample />
        </ComponentPreview>
    </section>
    <section id="opening-and-closing" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Opening and closing</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root to control the panel, and use `onOpenChange` to hear about each change. `onOpenChangeComplete` runs after the open or close animation has finished. The panel closes once a date is picked. Set `closeOnDateSelect={false}` to keep it open, which helps when people compare a few dates before deciding."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger opens the panel on click. `openOnHover` opens it when the pointer rests on the button, with `openDelay` and `closeDelay` in milliseconds for how long to wait."}
            />
        </Typography.Text>
        <ComponentPreview code={StayOpenExampleSrc}>
            <StayOpenExample />
        </ComponentPreview>
    </section>
    <section id="validation-and-field" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Validation and the typed field</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`validate` receives the date and returns an error message, or a list of them, when your own rule rejects it. `onInvalid` then runs with the reason and that message, which is where you show the error. Built-in limits such as `minValue` report through the same callback."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The typed field has its own options on Root. `granularity` decides which segments it shows, from `day` down to `second`, `hourCycle` picks a 12 or 24 hour clock, and `hideTimeZone` drops the zone name. `readonlySegments` locks the segments you list while the rest stay editable."}
            />
        </Typography.Text>
        <ComponentPreview code={ValidateExampleSrc}>
            <ValidateExample />
        </ComponentPreview>
    </section>
    <section id="panel-position" class="scroll-mt-20 flex flex-col gap-4">
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
            <InlineText text={"Root, Input, Trigger, Calendar and Content also accept `style`."} />
        </Typography.Text>
    </section>
</div>

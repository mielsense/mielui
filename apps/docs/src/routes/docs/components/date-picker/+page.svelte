<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Example1 from './examples/disabled.svelte';
    import Example1Src from './examples/disabled.svelte?raw';
    import FormExample from './examples/form.svelte';
    import FormExampleSrc from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Example0 from './examples/localized.svelte';
    import Example0Src from './examples/localized.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Date Picker</title>
    <meta name="description" content="An editable date field with a calendar popup." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Date Picker">An editable date field with a calendar popup.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
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
        <CodeBlock
            code={`import * as DatePicker from '$lib/mielui/components/date-picker';

<DatePicker.Root bind:value>
  <DatePicker.Label>Publish date</DatePicker.Label>
  <DatePicker.Input name="publishDate" />
  <DatePicker.Trigger />
  <DatePicker.Content align="end">
    <DatePicker.Calendar />
  </DatePicker.Content>
</DatePicker.Root>`}
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
        <div id="localized" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Localized input</Typography.H3>
            <Typography.Text variant="supporting">
                locale controls the field order, weekday labels and month names. Supply translated
                labels and set weekStartsOn when your application requires an explicit first day.
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
</div>

<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as NumberField from '@mielui/svelte/components/number-field';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import SectionHeading from '#lib/components/docs/section-heading.svelte';
    import Decimal from './examples/decimal.svelte';
    import DecimalSrc from './examples/decimal.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Form from './examples/form.svelte';
    import FormSrc from './examples/form.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundSeats = $state<number | undefined>(2);

    const usageSnippet = `<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';

    let seats = $state<number | undefined>(2);
<${'/'}script>

<NumberField.Root bind:value={seats} min={1} max={12}>
    <NumberField.Label>Seats</NumberField.Label>
    <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
    </NumberField.Group>
</NumberField.Root>`;

    const labelsSnippet = `<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';
    import type { NumberFieldLabels } from '@mielui/svelte/components/number-field';

    const labels: NumberFieldLabels = {
        decrease: 'Diminuer',
        increase: 'Augmenter'
    };
<${'/'}script>

<NumberField.Root {labels}>
    <NumberField.Label>Places</NumberField.Label>
    <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
    </NumberField.Group>
</NumberField.Root>`;
</script>

<svelte:head>
    <title>Mielui · Number Field</title>
    <meta
        name="description"
        content="Numeric input with native validation and composable step controls."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Number Field">
        Numeric input with native validation and composable step controls.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <NumberField.Root
                    bind:value={playgroundSeats}
                    min={values.min}
                    max={values.max}
                    step={values.step}
                    disabled={values.disabled}
                    readonly={values.readonly}
                >
                    {#if values.label}
                        <NumberField.Label>Seats</NumberField.Label>
                    {/if}
                    <NumberField.Group class="w-36">
                        {#if values.steppers}
                            <NumberField.Decrement />
                        {/if}
                        <NumberField.Input
                            aria-label={values.label ? undefined : 'Seats'}
                            aria-invalid={values.invalid ? 'true' : undefined}
                        />
                        {#if values.steppers}
                            <NumberField.Increment />
                        {/if}
                    </NumberField.Group>
                </NumberField.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add number-field" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"NumberField keeps one native number input as the form control. Put `name`, `form`, `min`, `max`, `step`, `required`, `disabled`, and `readonly` on Root, and bind `value` to a number. Clearing the input sets it to `undefined`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Native validation reports missing values, bounds, and step mismatches; typing never clamps a value silently. The arrow keys and the step buttons follow the browser's step rules and stop at the bounds, and an invalid `step` falls back to 1. The wheel is left alone. Format read-only totals with `Intl.NumberFormat`; the field does not format currency."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Label and Input share an id; set `inputId` on Root to choose it. If you set `id` on Input yourself, also set `for` on Label, or name the input with Field.Control. Pass descriptions and errors to Input. With a SvelteKit remote form, put the field `name` on Root, pass the current number as `value`, and update it in `onValueChange`."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Fractional steps, form submission, and a disabled field.
            {/snippet}
        </SectionHeading>

        <div id="decimal" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Decimal steps</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"A `step` of 0.25 with both buttons after the input. Each stepper takes its own `aria-label`."}
                />
            </Typography.Text>
            <ComponentPreview code={DecimalSrc}><Decimal /></ComponentPreview>
        </div>

        <div id="form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Form submission and reset</Typography.H3>
            <ComponentPreview code={FormSrc}><Form /></ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}><Disabled /></ComponentPreview>
        </div>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root renders its children, so you choose the order of the input and the two buttons, and the input keeps working when a button is left out. Root, Input, Decrement, and Increment take `bind:element`, for example to focus the input after a reset. Decrement and Increment take `onclick`, which runs before the value steps; call `preventDefault()` there to cancel the step."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to Root to translate the accessible names of the two step buttons. Every key of `NumberFieldLabels` is optional; omitted keys keep the English text. An `aria-label` on a button wins."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>

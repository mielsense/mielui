<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Slider } from '@mielui/svelte/components/slider';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Field from './examples/field.svelte';
    import FieldSrc from './examples/field.svelte?raw';
    import Range from './examples/range.svelte';
    import RangeSrc from './examples/range.svelte?raw';
    import Rtl from './examples/rtl.svelte';
    import RtlSrc from './examples/rtl.svelte?raw';
    import Stepped from './examples/stepped.svelte';
    import SteppedSrc from './examples/stepped.svelte?raw';
    import ValueReadout from './examples/value-readout.svelte';
    import ValueReadoutSrc from './examples/value-readout.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundValue = $state(64);
    let playgroundRange = $state<[number, number]>([20, 80]);

    const usageCode = `<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';

    let volume = $state(50);
</${'script'}>

<Slider bind:value={volume} label="Volume" />`;

    const labelsCode = `<script lang="ts">
    import { Slider, type SliderLabels } from '@mielui/svelte/components/slider';

    let price = $state<[number, number]>([200, 750]);

    const labels: SliderLabels = {
        range: 'Fourchette de prix',
        minimum: 'minimum',
        maximum: 'maximum'
    };
</${'script'}>

<Slider range bind:value={price} max={1000} {labels} />`;
</script>

<svelte:head>
    <title>Mielui · Slider</title>
    <meta
        name="description"
        content="Single-value and two-handle sliders with keyboard and RTL support."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Slider">
        Select a value or a range with pill-shaped handles, keyboard controls and RTL support.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const shared = $derived({
                    label: 'Volume',
                    min: values.min,
                    max: values.max,
                    step: values.step,
                    disabled: values.disabled,
                    dir: values.rtl ? 'rtl' : undefined
                } as const)}
                <div class="w-full max-w-sm">
                    {#if values.mode === 'range'}
                        <Slider range bind:value={playgroundRange} {...shared} />
                    {:else}
                        <Slider
                            bind:value={playgroundValue}
                            variant={values.mode === 'field' ? 'field' : 'default'}
                            {...shared}
                        />
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add slider" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Bind `value` to a number for a single handle. Name the control with `label`, `aria-label`, or `aria-labelledby`; the default variant does not show the label, it only names the handle. Use `aria-describedby` for supporting instructions. Arrow keys move one step, and holding Shift moves ten."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text>
            <InlineText
                text={"Set `name` to include the value in form submissions. Range mode submits two ordered values, which you can read with `FormData.getAll`. Disabled sliders are left out. Use `form` to target an external form. Resetting the form restores the initial value."}
            />
        </Typography.Text>
        <Typography.Text>
            <InlineText
                text={"`id` and `bind:element` refer to the wrapper. Style the rail, fill, and handles with the `data-ui=\"slider-track\"`, `data-ui=\"slider-range\"`, and `data-ui=\"slider-thumb\"` selectors."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="value-readout" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Value readout</Typography.H3>
            <Typography.Text variant="supporting">
                A label and the current value sit above the track and follow the thumb.
            </Typography.Text>
            <ComponentPreview code={ValueReadoutSrc}>
                <ValueReadout />
            </ComponentPreview>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="stepped" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With step</Typography.H3>
            <ComponentPreview code={SteppedSrc}>
                <Stepped />
            </ComponentPreview>
        </div>

        <div id="field" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Field</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`variant=\"field\"` puts the label and the value inside the control. Drag anywhere in the bar to scrub, or focus it and use the arrow keys. A stack of fields reads as one column, which suits settings panels with many numeric values. `format` turns the number into the text shown on the right and announced by screen readers."}
                />
            </Typography.Text>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Add `editable` to let people click the value, or press Enter on the focused field, and type an exact number. Typed numbers snap to the step and clamp to the range. `parse` reads a custom format, and `onValueCommit` runs once when a drag ends and after each keyboard or typed change, which is the moment to save. The field variant holds one value and does not combine with `range`."}
                />
            </Typography.Text>
            <ComponentPreview code={FieldSrc}>
                <Field />
            </ComponentPreview>
        </div>

        <div id="range" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Range</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `range` and bind a `[minimum, maximum]` pair. Handles stop at each other. `thumbLabels` names each handle for assistive technology. `onValueChange` receives a pair in range mode and a number in single-value mode."}
                />
            </Typography.Text>
            <ComponentPreview code={RangeSrc}>
                <Range />
            </ComponentPreview>
        </div>

        <div id="rtl" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right to left</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `dir=\"rtl\"` or inherit direction from a parent. The minimum sits on the right. Values stay ordered from minimum to maximum in either direction."}
                />
            </Typography.Text>
            <ComponentPreview code={RtlSrc}>
                <Rtl />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `SliderLabels` to translate the accessible names of a range and its two thumbs, and of the value input and its edit button. `value` and `edit` receive the slider's label. `thumbLabels` wins over `minimum` and `maximum`. Every key is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>

<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Decimal from './examples/decimal.svelte';
    import DecimalSrc from './examples/decimal.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Form from './examples/form.svelte';
    import FormSrc from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
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
    <section id="hero">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add number-field" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage and accessibility</Typography.H2>
        <Typography.Text>
            NumberField keeps one native number input as the form control. Put name, form, min, max,
            step, required, disabled, and readonly on Root. Bind value to a number or undefined;
            clearing the input yields undefined. Native validation handles required values, bounds
            and step mismatches. Typing does not silently clamp invalid values; increment and
            decrement follow the browser’s step rules. Invalid step sizes fall back to one.
        </Typography.Text>
        <Typography.Text>
            Label and Input share an ID. Set Root’s inputId to customize both. When overriding
            Input’s id directly, also set Label’s for attribute, or use Field.Control to provide the
            naming relationship. Forward descriptions and errors to Input. Input remains usable if
            either step button is omitted or reordered.
        </Typography.Text>
        <Typography.Text>
            ArrowUp and ArrowDown adjust the focused input. Step buttons stay independently keyboard
            reachable, stop at bounds, and respect disabled and readonly. There is no wheel
            interception. The component uses native numeric entry rather than currency formatting or
            drag scrubbing. Format read-only totals separately with Intl.NumberFormat.
        </Typography.Text>
        <Typography.Text>
            For remote functions, put the numeric field name on Root, pass the remote field’s
            current number as value, and update it through onValueChange. Keep the remote form
            attachment on Form.Root; NumberField submits one canonical numeric value. Use
            Field.Control on Input for descriptions and validation errors.
        </Typography.Text>
    </section>
    <section id="decimal" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Steps and composition</Typography.H2>
        <ComponentPreview code={DecimalSrc}><Decimal /></ComponentPreview>
    </section>
    <section id="form" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Form submission and reset</Typography.H2>
        <ComponentPreview code={FormSrc}><Form /></ComponentPreview>
    </section>
    <section id="disabled" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Disabled</Typography.H2>
        <ComponentPreview code={DisabledSrc}><Disabled /></ComponentPreview>
    </section>
</div>

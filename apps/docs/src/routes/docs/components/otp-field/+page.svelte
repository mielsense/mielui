<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as OTPField from '@mielui/svelte/components/otp-field';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Alphanumeric from './examples/alphanumeric.svelte';
    import AlphanumericSrc from './examples/alphanumeric.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Events from './examples/events.svelte';
    import EventsSrc from './examples/events.svelte?raw';
    import Form from './examples/form.svelte';
    import FormSrc from './examples/form.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundValue = $state('');

    const usageSnippet = `<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let code = $state('');
<${'/'}script>

<OTPField.Root bind:value={code} aria-label="Verification code" />`;
</script>

<svelte:head>
    <title>Mielui · OTP Field</title>
    <meta name="description" content="One accessible input, presented as individual code cells." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="OTP Field"
        >One accessible input, presented as individual code cells.</PageIntro
    >

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const alphanumeric = $derived(values.characters === 'alphanumeric')}
                {const root = $derived({
                    'aria-label': 'Verification code',
                    length: values.length,
                    pattern: alphanumeric ? '^[a-zA-Z0-9]*$' : undefined,
                    inputmode: alphanumeric ? 'text' : undefined,
                    disabled: values.disabled,
                    'aria-invalid': values.invalid ? 'true' : undefined
                } as const)}
                {#if values.separator}
                    <OTPField.Root bind:value={playgroundValue} {...root}>
                        {#snippet children({ cells })}
                            {const half = $derived(Math.ceil(values.length / 2))}
                            <OTPField.Group>
                                {#each cells.slice(0, half) as cell, index (index)}
                                    <OTPField.Cell {cell} />
                                {/each}
                            </OTPField.Group>
                            <OTPField.Separator />
                            <OTPField.Group>
                                {#each cells.slice(half) as cell, index (index)}
                                    <OTPField.Cell {cell} />
                                {/each}
                            </OTPField.Group>
                        {/snippet}
                    </OTPField.Root>
                {:else}
                    <OTPField.Root bind:value={playgroundValue} {...root} />
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add otp-field" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `value` to the entered code. One native input handles focus, selection, paste, autofill, and form submission; the visible cells are hidden from assistive technology. Name the field with a Label whose `for` matches Root's `id`, with `aria-label`, or with Field.Control. `bind:element` gives you that input."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Digits are accepted by default and `autocomplete` defaults to `one-time-code`. Set `pattern` and `inputmode` together for another alphabet, and use `pasteTransformer` to clean up pasted text. Set `minlength` to the same number as `length`, together with `required`, when the browser must reject incomplete codes. Always verify the code on the server."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` runs with the whole value on every typed, pasted, or deleted character. `onComplete` runs with the code once every cell is filled; it does not verify or submit anything. To submit automatically, call the form's `requestSubmit()` so validation and submit handlers still run. Lowering `length` truncates the value, a form reset restores the initial value, and a disabled field is left out of the submission."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Form submission, other alphabets, change events, and a disabled field.
            {/snippet}
        </SectionHeading>

        <div id="form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Form submission and reset</Typography.H3>
            <ComponentPreview code={FormSrc}><Form /></ComponentPreview>
        </div>

        <div id="alphanumeric" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Alphanumeric codes</Typography.H3>
            <ComponentPreview code={AlphanumericSrc}><Alphanumeric /></ComponentPreview>
        </div>

        <div id="value-changes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Value changes</Typography.H3>
            <ComponentPreview code={EventsSrc}><Events /></ComponentPreview>
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
                text={"Without children, Root renders one Group of Cells. Pass a `children` snippet to group or restyle the cells it gives you, with a Separator between groups; render every cell, in order. Cell takes `bind:element` for its element."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`textalign` aligns the hidden input's text to the `left`, `center`, or `right`, which matters only when you render your own cells. `pushPasswordManagerStrategy` decides what happens when a password manager adds its badge: `increase-width` widens the input so the badge sits beside the cells, and `none` leaves it alone."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<OTPField.Root bind:value={code} aria-label="Verification code">
    {#snippet children({ cells })}
        <OTPField.Group>
            {#each cells.slice(0, 3) as cell, index (index)}
                <OTPField.Cell {cell} />
            {/each}
        </OTPField.Group>
        <OTPField.Separator />
        <OTPField.Group>
            {#each cells.slice(3) as cell, index (index)}
                <OTPField.Cell {cell} />
            {/each}
        </OTPField.Group>
    {/snippet}
</OTPField.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>

<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Alphanumeric from './examples/alphanumeric.svelte';
    import AlphanumericSrc from './examples/alphanumeric.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Form from './examples/form.svelte';
    import FormSrc from './examples/form.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundValue = $state('');
</script>
<svelte:head>
    <title>Mielui · OTP Field</title>
    <meta name="description" content="One accessible input, presented as individual code cells." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="OTP Field">
        One accessible input, presented as individual code cells.
    </PageIntro>
    <section id="hero">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const alphanumeric = values.characters === 'alphanumeric'}
                {#if values.separator}
                    <OTPField.Root
                        bind:value={playgroundValue}
                        aria-label="Verification code"
                        length={values.length}
                        pattern={alphanumeric ? '^[a-zA-Z0-9]*$' : undefined}
                        inputmode={alphanumeric ? 'text' : undefined}
                        disabled={values.disabled}
                        aria-invalid={values.invalid ? 'true' : undefined}
                    >
                        {#snippet children({ cells })}
                            {@const half = Math.ceil(values.length / 2)}
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
                    <OTPField.Root
                        bind:value={playgroundValue}
                        aria-label="Verification code"
                        length={values.length}
                        pattern={alphanumeric ? '^[a-zA-Z0-9]*$' : undefined}
                        inputmode={alphanumeric ? 'text' : undefined}
                        disabled={values.disabled}
                        aria-invalid={values.invalid ? 'true' : undefined}
                    />
                {/if}
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add otp-field" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage and accessibility</Typography.H2>
        <Typography.Text>
            Bind{' '}
            <Typography.InlineCode>value</Typography.InlineCode>
            {' '}
            to the entered code. A single native input handles focus, selection, paste, autofill,
            and form submission. The visible{' '}
            <Typography.InlineCode>Cell</Typography.InlineCode>
            {' '}
            parts are hidden from assistive technology.
        </Typography.Text>
        <Typography.Text>
            Label{' '}
            <Typography.InlineCode>Root</Typography.InlineCode>
            {' '}
            using a native label and matching{' '}
            <Typography.InlineCode>id</Typography.InlineCode>
            {' '}
            attribute, an{' '}
            <Typography.InlineCode>aria-label</Typography.InlineCode>
            {' '}
            attribute, or{' '}
            <Typography.InlineCode>Field.Control</Typography.InlineCode>
            {' '}
            attributes. The element binding refers to the native input.
        </Typography.Text>
        <Typography.Text>
            Digits are accepted by default. Set pattern and inputmode together for another alphabet,
            and use pasteTransformer to normalize pasted text. The default autocomplete is
            one-time-code. Set minlength equal to length together with required when the browser
            must reject incomplete codes. Server validation must still check the submitted code.
        </Typography.Text>
        <Typography.Text>
            Use the children snippet to group or restyle the supplied cells, inserting Separator
            between groups. Keep cells in their original order and render every supplied cell. Root
            renders the same public Group and Cell parts when children is omitted.
        </Typography.Text>
        <Typography.Text>
            Bind value to control the code. Reducing length truncates the value so hidden characters
            cannot be submitted. onComplete receives the completed value; it does not verify the
            code or submit automatically. For automatic submission, call the form’s requestSubmit(),
            which preserves validation and submit handlers. A normal reset restores the initial
            value; canceled resets preserve the current code. Disabled codes are omitted from
            submission.
        </Typography.Text>
    </section>
    <section id="form" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Form submission and reset</Typography.H2>
        <ComponentPreview code={FormSrc}><Form /></ComponentPreview>
    </section>
    <section id="alphanumeric" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Alphanumeric codes</Typography.H2>
        <ComponentPreview code={AlphanumericSrc}><Alphanumeric /></ComponentPreview>
    </section>
    <section id="disabled" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Disabled</Typography.H2>
        <ComponentPreview code={DisabledSrc}><Disabled /></ComponentPreview>
    </section>
    <section id="events-and-layout" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and layout</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` runs with the whole value each time a character is typed, pasted or deleted. Use `onComplete` when you only care about the full code."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`textalign` moves the hidden input's text to the `left`, `center` or `right`, which only matters when you render your own cells. `pushPasswordManagerStrategy` decides what happens when a password manager adds its badge to the field. `increase-width` widens the input so the badge sits beside the cells, and `none` leaves it alone. Root and Cell accept `style`, and Cell takes `ref` to bind its element."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
</div>

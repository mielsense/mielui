<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Alphanumeric from './examples/alphanumeric.svelte';
    import AlphanumericSrc from './examples/alphanumeric.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Form from './examples/form.svelte';
    import FormSrc from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · OTP Field</title>
    <meta name="description" content="One accessible input, presented as individual code cells." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>OTP Field</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                One accessible input, presented as individual code cells.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <section id="hero">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add otp-field" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage and accessibility</Typography.H2>
        <Typography.Text>
            OTPField uses Bits UI PinInput. One real input owns focus, selection, paste, autofill,
            and form submission; Cell parts are visual and hidden from assistive technology. Label
            the Root through id and a native label, aria-label, or Field.Control. The element
            binding refers to the real input.
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
</div>

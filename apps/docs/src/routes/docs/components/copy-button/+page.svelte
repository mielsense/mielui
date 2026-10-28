<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import FeedbackExample from './examples/feedback.svelte';
    import FeedbackExampleSrc from './examples/feedback.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';
    import {
        code as playgroundCode,
        command as playgroundCommand,
        controls as playgroundControls
    } from './playground';

    const usageCode = `<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</${'script'}>

<CopyButton text="pnpm add @mielui/svelte" />
<CopyButton text="sk_live_example" labels={{ copy: 'Copy API key' }} variant="outline" size="md">
    Copy key
</CopyButton>`;
</script>

<svelte:head>
    <title>Mielui · Copy Button</title>
    <meta
        name="description"
        content="A button that copies text to the clipboard, with copy and copied states."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Copy Button">
        A button that copies text to the clipboard, with copy and copied states.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const button = $derived({
                    text: playgroundCommand,
                    variant: values.variant,
                    disabled: values.disabled
                })}
                <div class="flex items-center gap-3">
                    <code class="text-sm">{playgroundCommand}</code>
                    {#if values.size === 'icon'}
                        <CopyButton {...button} />
                    {:else}
                        <CopyButton {...button} size={values.size}>Copy command</CopyButton>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add copy-button" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Pass the text to copy. The button shows a copy icon with a tooltip, or a visible label
            when you give it children and a text size.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            onclick runs before copying; call preventDefault() to cancel. oncopy runs after a
            successful clipboard write and receives the copied text. Clipboard access needs a secure
            context, so keep the source text visible for people to select by hand when it is
            blocked.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="copy-confirmation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Copy confirmation</Typography.H3>
            <Typography.Text variant="supporting">
                A status line under the command updates after a successful copy.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="in-a-field" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">In a field</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <ComponentPreview code={VariantsSrc}>
                <Variants />
            </ComponentPreview>
        </div>
    </section>
    <section id="feedback" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Copied feedback</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`labels.copy` is the tooltip and accessible name at rest, Copy by default. After a copy, the button holds its copied state and shows `labels.copied`, Copied by default. Every key in `labels` is optional and English is the fallback. `duration` is how long the copied state lasts in milliseconds, 2000 by default."}
            />
        </Typography.Text>
        <ComponentPreview code={FeedbackExampleSrc}>
            <FeedbackExample />
        </ComponentPreview>
    </section>
</div>

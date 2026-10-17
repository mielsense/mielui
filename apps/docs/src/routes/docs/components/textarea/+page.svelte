<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Composer from './examples/composer.svelte';
    import ComposerSrc from './examples/composer.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Labeled from './examples/labeled.svelte';
    import LabeledSrc from './examples/labeled.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Textarea } from '@mielui/svelte/components/textarea';

    let message = $state('');
</${'script'}>

<Textarea bind:value={message} label="Message" autoresize />`;
</script>

<svelte:head>
    <title>Mielui · Textarea</title>
    <meta
        name="description"
        content="Multi-line text input with labels, descriptions, and automatic resizing."
    />
</svelte:head>

{#snippet playgroundFooter()}
    <div class="flex items-center justify-between gap-3 px-3 pb-3">
        <span class="text-xs text-foreground-muted">Markdown is supported.</span>
        <Button size="sm">Send</Button>
    </div>
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Textarea">A multi-line text input that shares the Input styling.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-sm">
                    <Textarea
                        variant={values.variant}
                        label={values.label ? 'Message' : undefined}
                        aria-label={values.label ? undefined : 'Message'}
                        description={values.description
                            ? 'Sent to everyone on the project.'
                            : undefined}
                        placeholder={values.placeholder || undefined}
                        autoresize={values.autoresize}
                        disabled={values.disabled}
                        aria-invalid={values.invalid ? 'true' : undefined}
                        children={values.footer ? playgroundFooter : undefined}
                    />
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add textarea" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `value` to read or set the text. `label` and `description` are linked to the native textarea, and every other textarea attribute passes through. Set `autoresize` to grow the field with its content instead of scrolling. Bind `element` to reach the textarea, for example to focus it."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="label-and-description" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                With label and description
            </Typography.H3>
            <ComponentPreview code={LabeledSrc}>
                <Labeled />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>

        <div id="composer" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Composer</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Content passed as children renders below the text inside the same field border, here a character count and a send button. `autoresize` grows the field as you type.'}
                />
            </Typography.Text>
            <ComponentPreview code={ComposerSrc}>
                <Composer />
            </ComponentPreview>
        </div>
    </section>
</div>

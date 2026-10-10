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

    const TITLE = 'Textarea';

    const installCommand = 'pnpm dlx @mielui/svelte add textarea';
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
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
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>A multi-line text input that shares the Input styling.</PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
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
                        placeholder={values.placeholder}
                        rows={values.rows}
                        autoresize={values.autoresize}
                        disabled={values.disabled}
                        readonly={values.readonly}
                        required={values.required}
                        aria-invalid={values.invalid ? 'true' : undefined}
                        children={values.footer ? playgroundFooter : undefined}
                    />
                </div>
            {/snippet}
        </Playground>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Labels and descriptions are connected to the native textarea, preserving external
            aria-describedby references without duplicate IDs. Conditional descriptions are linked
            only while rendered. Autoresize responds to value and width changes, includes border-box
            sizing, and restores the previous inline height when removed.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import Textarea and bind its value. Add
            <Typography.InlineCode>autoresize</Typography.InlineCode>
            for message composers that grow with their content.
        </Typography.Text>
        <CodeBlock
            code={`import { Textarea } from '@mielui/svelte/components/textarea';\n\n<Textarea bind:value autoresize label="Message" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Basic -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <!-- With label and description -->
        <div id="labeled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                With label and description
            </Typography.H3>
            <ComponentPreview code={LabeledSrc}>
                <Labeled />
            </ComponentPreview>
        </div>

        <!-- Disabled -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
    <section id="composer" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Autoresizing composer</Typography.H2>
        <Typography.Text variant="supporting">
            The textarea grows as you type. Its children snippet holds a character count and submit
            button inside the shared field border.
        </Typography.Text>
        <ComponentPreview code={ComposerSrc}><Composer /></ComponentPreview>
    </section>
    <section id="element" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Reaching the element</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `element` to get the textarea's DOM node, for example to focus it when a dialog opens or to read its selection."}
            />
        </Typography.Text>
    </section>
</div>

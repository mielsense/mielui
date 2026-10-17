<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import WithRequired from './examples/with-required.svelte';
    import WithRequiredSrc from './examples/with-required.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageSnippet = `<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
<${'/'}script>

<Label for="email">Email</Label>
<Input id="email" type="email" />`;
</script>

<svelte:head>
    <title>Mielui · Label</title>
    <meta name="description" content="A styled native label that names a form control." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Label">A styled native label that names a form control.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="flex flex-col gap-1.5">
                    <Label
                        for="email"
                        required={values.required}
                        class={values.disabled
                            ? 'cursor-not-allowed opacity-[var(--opacity-disabled)]'
                            : undefined}
                    >
                        {values.text}
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@ui.miel.my"
                        required={values.required}
                        disabled={values.disabled}
                    />
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add label" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Match `for` to the control's `id`. Clicking any part of the label, including elements you put in its children, focuses that control."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`required` shows a mark after the text. The mark is hidden from assistive technology, so set `required` on the control too. A label placed after a `peer` control dims when that control is disabled; when the label comes first, add the disabled styling yourself."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Required and disabled fields.
            {/snippet}
        </SectionHeading>

        <div id="required" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Required</Typography.H3>
            <Typography.Text variant="supporting">
                Label draws the mark itself. Input and Textarea do the same for their built-in label
                when they are required, and Field.Label follows Field.Root.
            </Typography.Text>
            <ComponentPreview code={WithRequiredSrc}>
                <WithRequired />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
</div>

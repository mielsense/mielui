<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import MultipleMode from './examples/multiple-mode.svelte';
    import MultipleModeSrc from './examples/multiple-mode.svelte?raw';
    import SingleMode from './examples/single-mode.svelte';
    import SingleModeSrc from './examples/single-mode.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usage = `<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';

    let open = $state<string | undefined>('billing');
</${'script'}>

<Accordion.Root bind:value={open}>
    <Accordion.Item value="billing">
        <Accordion.Trigger>Billing</Accordion.Trigger>
        <Accordion.Content>Change your plan from Billing.</Accordion.Content>
    </Accordion.Item>
</Accordion.Root>`;
</script>

<svelte:head>
    <title>Mielui · Accordion</title>
    <meta
        name="description"
        content="Stacked collapsible sections with single- and multi-open modes."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Accordion">
        A vertical stack of collapsible sections. Single mode opens one at a time; multiple allows
        any combination.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet items()}
                    <Accordion.Item value="access">
                        <Accordion.Trigger>Who can access this workspace?</Accordion.Trigger>
                        <Accordion.Content>
                            Only invited members can open projects. Owners can invite people and
                            change their roles.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="plan">
                        <Accordion.Trigger>Can I change my plan?</Accordion.Trigger>
                        <Accordion.Content>
                            Change your plan from Billing. New limits apply immediately.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="export" disabled={values.disabled}>
                        <Accordion.Trigger>How do I export my data?</Accordion.Trigger>
                        <Accordion.Content>
                            Open Settings and choose Export. The archive includes your projects and
                            files.
                        </Accordion.Content>
                    </Accordion.Item>
                {/snippet}
                {#if values.type === 'multiple'}
                    <Accordion.Root type="multiple" value={['access']} class="w-full max-w-md">
                        {@render items()}
                    </Accordion.Root>
                {:else}
                    <Accordion.Root value="access" class="w-full max-w-md">
                        {@render items()}
                    </Accordion.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add accordion" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Arrow keys move between enabled headers; Home and End jump to the first and last header.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Single mode binds a string `value` and reports `undefined` when the open item closes. Set `collapsible={false}` to keep one item open at all times. With `type=\"multiple\"`, bind a string array; closing every item reports an empty array. The `value` and `onValueChange` types follow the mode."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            Each trigger is the shared disclosure row used by Collapsible, Reasoning, and Tool: the
            small control height, a ghost hover fill, a rounded focus ring, and a trailing 14px
            chevron that turns upward while open.
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="single-mode" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single mode</Typography.H3>
            <ComponentPreview code={SingleModeSrc}>
                <SingleMode />
            </ComponentPreview>
        </div>

        <div id="multiple-mode" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple mode</Typography.H3>
            <ComponentPreview code={MultipleModeSrc}>
                <MultipleMode />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`disabled` on an Item stops that section from being opened while the others stay usable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText text={"Every part renders its `children` and takes `class`."} />
        </Typography.Text>
    </section>
</div>

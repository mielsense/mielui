<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Pace from './examples/pace.svelte';
    import PaceSrc from './examples/pace.svelte?raw';
    import ReadyState from './examples/ready-state.svelte';
    import ReadyStateSrc from './examples/ready-state.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Spinner } from '@mielui/svelte/components/spinner';
</${'script'}>

<Spinner aria-label="Loading invoices" />`;
</script>

<svelte:head>
    <title>Mielui · Spinner</title>
    <meta name="description" content="An animated loading indicator for indeterminate work." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Spinner">
        A rotating loading indicator that can resolve into a checkmark when the work is done.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const spinner = $derived({
                    size: values.size,
                    ready: values.ready,
                    speed: values.speed,
                    eased: values.eased
                })}
                {#if values.label}
                    <div class="flex items-center gap-3 text-sm text-foreground-muted">
                        <Spinner {...spinner} aria-hidden="true" />
                        <span>Checking for updates</span>
                    </div>
                {:else}
                    <Spinner {...spinner} aria-label="Checking for updates" />
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add spinner" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Use Spinner for work with an unknown duration. A spinner on its own says nothing to a screen reader, so pass `aria-label` with what is loading. When visible text next to it already says so, set `aria-hidden` instead."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            Reduced motion removes the transitions and the rotation. Rotation also pauses while the
            spinner is out of view or the page is hidden.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="speed" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Speed and eased rotation</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`speed` multiplies the rotation pace. `eased` varies the speed through each turn without stopping. The default is a steady spin.'}
                />
            </Typography.Text>
            <ComponentPreview code={PaceSrc}>
                <Pace />
            </ComponentPreview>
        </div>

        <div id="ready" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Ready</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Set `ready` when the work succeeds. The spinner turns into a checkmark, holds it for two seconds, then blurs and collapses on its own. Set it back to `false` to show the spinner again.'}
                />
            </Typography.Text>
            <ComponentPreview code={ReadyStateSrc}>
                <ReadyState />
            </ComponentPreview>
        </div>
    </section>
</div>

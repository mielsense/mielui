<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Streaming from './examples/streaming.svelte';
    import StreamingSrc from './examples/streaming.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';
</${'script'}>

<Reasoning.Root>
    <Reasoning.Trigger title="Searched the release history" duration="2.4s" />
    <Reasoning.Content>
        <p>Compared the incident timestamp with the last five deployments.</p>
    </Reasoning.Content>
</Reasoning.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import type { ReasoningLabels } from '@mielui/svelte/components/reasoning';

    let { streaming }: { streaming: boolean } = $props();

    const labels: ReasoningLabels = {
        thinking: 'Réflexion',
        thought: 'Réflexion terminée',
        thoughtFor: (duration) => \`Réflexion de \${duration}\`,
        title: 'Brouillon'
    };
</${'script'}>

<Reasoning.Root {streaming} {labels}>
    <Reasoning.Trigger duration="2.4s" />
    <Reasoning.Content>…</Reasoning.Content>
</Reasoning.Root>`;
</script>

<svelte:head>
    <title>Mielui · Reasoning</title>
    <meta
        name="description"
        content="A concise, expandable reasoning trace for AI assistant responses."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Reasoning">Show an assistant's progress in a collapsible section.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-xl">
                    <Reasoning.Root streaming={values.streaming} open={values.open}>
                        <Reasoning.Trigger
                            title={values.title || undefined}
                            duration={values.duration || undefined}
                        />
                        <Reasoning.Content>
                            <div class="space-y-3">
                                <p>
                                    Compared the incident timeline with the last five production
                                    deployments.
                                </p>
                                <p>
                                    Filtered payment errors by issuer country and found the
                                    regression only affects non-US cards.
                                </p>
                            </div>
                        </Reasoning.Content>
                    </Reasoning.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add reasoning" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Reasoning starts open. Set `open={false}` for a collapsed summary, or bind `open` to control it from the parent. Trigger shows its `title` only while collapsed."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `streaming` while the model is thinking; the label reads Thinking and shimmers. Clear it when delivery finishes and pass `duration` to read Thought for 2.4s. Write a short, user-facing account of the work rather than exposing private model reasoning."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="live-reasoning" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Live reasoning</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`streaming` stays on while ResponseStream writes the trace and clears in its `onComplete`."}
                />
            </Typography.Text>
            <ComponentPreview code={StreamingSrc}>
                <Streaming />
            </ComponentPreview>
        </div>

        <div id="open-events" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Open events</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`onOpenChange` runs when the reasoning opens or closes. `onOpenChangeComplete` runs after the animation has finished, which is the moment to measure or scroll."}
                />
            </Typography.Text>
            <ComponentPreview code={EventsExampleSrc}>
                <EventsExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root and Content render their `children` and accept `class` and other element attributes. Trigger takes `title` and `duration`; pass `children` to replace its whole label, which receives `open` and `streaming`."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `ReasoningLabels` to `Reasoning.Root` to reword the trigger while streaming and after it completes. `thought` is the status line without a `duration`; `thoughtFor` receives the duration and returns the whole line when there is one. `title` is the summary shown while closed when Trigger has no `title`. Every key is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>

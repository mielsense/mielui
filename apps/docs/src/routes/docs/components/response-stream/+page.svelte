<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import AsyncStream from './examples/async-stream.svelte';
    import AsyncStreamSrc from './examples/async-stream.svelte?raw';
    import Complete from './examples/complete.svelte';
    import CompleteSrc from './examples/complete.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Lifecycle from './examples/lifecycle.svelte';
    import LifecycleSrc from './examples/lifecycle.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        response as playgroundResponse
    } from './playground';

    const usageCode = `<script lang="ts">
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    let { response }: { response: AsyncIterable<string> } = $props();
</${'script'}>

<ResponseStream textStream={response} />`;
</script>

<svelte:head>
    <title>Mielui · Response Stream</title>
    <meta
        name="description"
        content="AI response text with bounded arrival motion and natural line wrapping."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Response Stream">
        Reveal a complete response at a chosen pace, or render chunks from a model as they arrive.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                <div class="w-full max-w-xl">
                    {#key values.speed}
                        <ResponseStream textStream={playgroundResponse} speed={values.speed} />
                    {/key}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add response-stream" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass the async iterable returned by your model as `textStream`. A caret marks the wait before the first chunk; later chunks render as soon as they arrive."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"For a complete string, `speed` sets the reveal pace from 1, the slowest, to 100, the fastest. The default is 20."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<ResponseStream textStream="Draft saved." speed={70} />`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Responses up to 4,000 UTF-16 code units use rolling text. Longer responses render as
            plain text to keep streaming work bounded as the answer grows. Reduced motion also
            renders plain text, and a completed response settles into plain text once its last
            characters arrive, so words wrap whole. Source delivery, completion callbacks, and
            accessible live status are the same in both modes.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Static text reveals whole graphemes, including emoji and combining marks. Arrival motion
            stays within the theme's panel duration, whatever the reveal speed.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Replacing a source or removing the component discards pending chunks, completion, and
            errors from that source. The component asks the iterator to clean up; cancel the
            underlying network request in your application.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="async-stream" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Async stream</Typography.H3>
            <Typography.Text variant="supporting">
                Chunks from an async iterable appear as they arrive. A caret waits until the first
                one lands.
            </Typography.Text>
            <ComponentPreview code={AsyncStreamSrc} refreshable>
                <AsyncStream />
            </ComponentPreview>
        </div>

        <div id="stop-and-retry" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Stop and retry</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `streaming` and pass cumulative string snapshots when your application owns delivery. Stop the request or timer yourself; the last snapshot stays visible."}
                />
            </Typography.Text>
            <ComponentPreview code={LifecycleSrc}>
                <Lifecycle />
            </ComponentPreview>
        </div>

        <div id="complete-text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Complete text</Typography.H3>
            <ComponentPreview code={CompleteSrc} refreshable>
                <Complete />
            </ComponentPreview>
        </div>

        <div id="completion" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Completion</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`onComplete` enables Replay once the whole response has been revealed. `characterChunkSize={3}` reveals three characters per step."}
                />
            </Typography.Text>
            <ComponentPreview code={EventsExampleSrc}>
                <EventsExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="events-and-pace" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and pace</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onComplete` runs once the whole response has been revealed, which is when to enable the composer again or show the actions under a message. `onError` runs with the error if the stream fails part way."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`characterChunkSize` sets how many characters appear per step; by default the step follows `speed`. Raise it for long answers. `as` sets the rendered element, `span` by default. The component draws the text itself and does not render `children`."}
            />
        </Typography.Text>
    </section>
</div>

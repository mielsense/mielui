<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const TITLE = 'Response Stream';
    const SLUG = 'response-stream';
    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="AI response text with bounded arrival motion and natural line wrapping."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>{TITLE}</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Render complete responses at a chosen pace, while asynchronously arriving AI chunks
                appear immediately as the model yields them.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc} refreshable><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Responses up to 4,000 UTF-16 code units use rolling text. Longer responses render as
            plain text to keep streaming work bounded as the answer grows. Reduced motion also
            renders plain text. Source delivery, completion callbacks, wrapping, and accessible live
            status are the same in both modes.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Static text reveals whole graphemes, including emoji and combining marks. Arrival motion
            stays within the theme's panel duration, independently of reveal speed. Lines take their
            natural height as text wraps. Reduced motion displays static text immediately; live
            sources still update as chunks arrive.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Replacing a source or removing the component invalidates pending chunks, completion, and
            errors from that source. The component requests iterator cleanup; cancel the underlying
            network request in your application. Plain text remains available if the optional text
            renderer cannot load.
        </Typography.Text>
        <div class="flex flex-col gap-3">
            <div>
                <Typography.H3>Live responses</Typography.H3>
                <Typography.Text variant="supporting" class="mt-1">
                    Pass the async iterable returned by your model. A caret marks the wait before
                    the first chunk; later chunks render as soon as they arrive.
                </Typography.Text>
            </div>
            <CodeBlock
                code={`import { ResponseStream } from '@mielui/svelte/components/response-stream';\n\n<ResponseStream textStream={modelResponse} />`}
                lang="svelte"
                copy="overlay"
            />
        </div>

        <div class="flex flex-col gap-3">
            <div>
                <Typography.H3>Complete responses</Typography.H3>
                <Typography.Text variant="supporting" class="mt-1">
                    For a complete string, use
                    <Typography.InlineCode>speed</Typography.InlineCode>
                    from 1 (slowest) to 100 (fastest) to control the reveal pace.
                </Typography.Text>
            </div>
            <CodeBlock
                code={`<ResponseStream textStream="Draft saved." speed={70} />`}
                lang="svelte"
                copy="overlay"
            />
        </div>
    </section>
</div>

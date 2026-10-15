<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import SafeHtml from './examples/safe-html.svelte';
    import SafeHtmlSrc from './examples/safe-html.svelte?raw';
    import Streaming from './examples/streaming.svelte';
    import StreamingSrc from './examples/streaming.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        source as playgroundSource
    } from './playground';

    const usageSnippet = `<script lang="ts">
    import { Markdown } from '@mielui/svelte/components/markdown';

    const content = [
        '## Result',
        '',
        '| File | Status |',
        '| --- | --- |',
        '| app.ts | Updated |',
        '',
        '- [x] Run checks'
    ].join('\\n');
<${'/'}script>

<Markdown {content} />`;

    const labelsSnippet = `<script lang="ts">
    import { Markdown, type MarkdownLabels } from '@mielui/svelte/components/markdown';

    let { content }: { content: string } = $props();

    const labels: MarkdownLabels = {
        completedTask: 'Tâche terminée',
        incompleteTask: 'Tâche à faire',
        table: 'Tableau'
    };
<${'/'}script>

<Markdown {content} {labels} />`;
</script>

<svelte:head>
    <title>Mielui · Markdown</title>
    <meta
        name="description"
        content="A safe GFM renderer for polished agent prose, tables, task lists, links, and code."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Markdown">
        Render structured agent output with safe links, useful typography, and first-class code
        blocks.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Markdown
                    content={playgroundSource(values)}
                    streaming={values.streaming}
                    class="w-full max-w-xl"
                />
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add markdown" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass Markdown text as `content`. It is parsed as GitHub Flavored Markdown, so tables, task lists, and strikethrough work. Fenced code renders with CodeBlock."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Raw HTML is shown as text. Links allow HTTP, HTTPS, mailto, and relative URLs. Images must use relative paths; an external image URL renders its alt text."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Show incomplete output honestly and keep untrusted model content inert.
            {/snippet}
        </SectionHeading>

        <div id="rollout-report" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Rollout report</Typography.H3>
            <Typography.Text variant="supporting">
                A full report with a quote, a table, a task list, and a code block.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>

        <div id="streaming" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Streaming</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Append text to `content` while `streaming` is true, then set it to false when the response ends or is stopped. Streaming marks the output busy and shows a caret. Blocks that keep their type and position keep their state as text arrives."}
                />
            </Typography.Text>
            <ComponentPreview code={StreamingSrc}><Streaming /></ComponentPreview>
        </div>

        <div id="safe-html" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Untrusted HTML</Typography.H3>
            <Typography.Text variant="supporting">
                Script tags, inline handlers, and unsafe link schemes stay inert text.
            </Typography.Text>
            <ComponentPreview code={SafeHtmlSrc}><SafeHtml /></ComponentPreview>
        </div>
    </section>
    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to translate the accessible names of task-list checkboxes and scrollable tables. Every key of `MarkdownLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>

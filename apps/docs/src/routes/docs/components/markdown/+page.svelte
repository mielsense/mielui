<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import SafeHtml from './examples/safe-html.svelte';
    import SafeHtmlSrc from './examples/safe-html.svelte?raw';
    import Streaming from './examples/streaming.svelte';
    import StreamingSrc from './examples/streaming.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add markdown';
    const usageSnippet = `import { Markdown } from '@mielui/svelte/components/markdown';

const content = [
  '## Result',
  '',
  '| File | Status |',
  '| --- | --- |',
  '| app.ts | Updated |',
  '',
  '- [x] Run checks'
].join('\\n');

<Markdown {content} />`;
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
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Pass Markdown text through content. Set streaming while more text is arriving. Existing
            controls keep their state while the surrounding block keeps the same type and position.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The GFM lexer supports tables, task lists, and strikethrough. Fenced code is rendered
            with Mielui{' '}
            <Typography.InlineCode>CodeBlock</Typography.InlineCode>
            , and raw HTML is displayed as text. Links allow HTTP, HTTPS, mailto, and relative URLs.
            Images use relative paths; external image URLs render their alt text.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Show incomplete output honestly and keep untrusted model content inert.
            {/snippet}
        </SectionHeading>

        <div id="streaming" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Streaming response</Typography.H3>
            <ComponentPreview code={StreamingSrc}><Streaming /></ComponentPreview>
        </div>

        <div id="safe-html" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Raw HTML safety</Typography.H3>
            <ComponentPreview code={SafeHtmlSrc}><SafeHtml /></ComponentPreview>
        </div>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Stream partial content</Typography.H2>
        <Typography.Text>
            Append text to content while streaming is true, then set streaming to false when the
            response ends or is stopped. The example sends small chunks through headings, lists, a
            table, and a code block. It clears its timer when the example unmounts.
        </Typography.Text>
    </section>
</div>

<script lang="ts">
    import { ArrowExpandIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as FileDiff from '@mielui/svelte/components/file-diff';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Compound from './examples/compound.svelte';
    import CompoundSrc from './examples/compound.svelte?raw';
    import Live from './examples/live.svelte';
    import LiveSrc from './examples/live.svelte?raw';
    import Stacked from './examples/stacked.svelte';
    import StackedSrc from './examples/stacked.svelte?raw';
    import WithoutLineNumbers from './examples/without-line-numbers.svelte';
    import WithoutLineNumbersSrc from './examples/without-line-numbers.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        diff as playgroundDiff
    } from './playground';

    const usageSnippet = `<script lang="ts">
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';

    const diff: FileDiffLine[] = [
        {
            type: 'remove',
            oldLineNumber: 13,
            content: '  return localStorage.token;'
        },
        {
            type: 'add',
            newLineNumber: 13,
            content: '  return cookies.get("session");'
        }
    ];
</${'script'}>

<FileDiff.Root file="src/auth.ts" lang="ts" {diff} />`;
</script>

<svelte:head>
    <title>Mielui · File Diff</title>
    <meta
        name="description"
        content="A unified diff viewer with a file top bar, change counts, and highlighted rows."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="File Diff">
        A unified diff viewer with a file top bar, change counts, and highlighted rows.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.topBar === 'default'}
                    <FileDiff.Root
                        diff={playgroundDiff}
                        file={values.file}
                        lang="ts"
                        showLineNumbers={values.showLineNumbers}
                        class="max-w-2xl"
                    />
                {:else}
                    <FileDiff.Root
                        file={values.topBar === 'none' ? undefined : values.file}
                        lang="ts"
                        showLineNumbers={values.showLineNumbers}
                        class="max-w-2xl"
                    >
                        {#if values.topBar !== 'none'}
                            <FileDiff.TopBar>
                                <FileDiff.Filename />
                                {#if values.topBar === 'with action'}
                                    <FileDiff.PlusMinus additions={3} deletions={1} />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="size-7"
                                        aria-label="Expand diff"
                                    >
                                        <HugeiconsIcon icon={ArrowExpandIcon} size={14} />
                                    </Button>
                                {/if}
                            </FileDiff.TopBar>
                        {/if}
                        <FileDiff.Content>
                            {#each playgroundDiff as line, index (index)}
                                <FileDiff.Row
                                    type={line.type}
                                    oldLine={line.oldLineNumber}
                                    newLine={line.newLineNumber}
                                    code={line.content}
                                />
                            {/each}
                        </FileDiff.Content>
                    </FileDiff.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add file-diff" />
        <Typography.Text variant="supporting">
            The component depends on{' '}
            <Typography.InlineCode>highlight.js</Typography.InlineCode>
            for syntax highlighting. Install it if your project doesn't have it yet:
        </Typography.Text>
        <InstallCommand command="pnpm add highlight.js" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses single framing, the default, or double framing.
            The filename and change counts always stay above the diff.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Pass a{' '}
            <Typography.InlineCode>diff</Typography.InlineCode>
            array for the high-level form, or compose TopBar, Content, and Row by hand. A bare{' '}
            <Typography.InlineCode>TopBar</Typography.InlineCode>
            renders the filename and counts; pass children to take over the row with Filename,
            PlusMinus, and your own actions. Counts are derived from the diff unless you pass
            additions and deletions.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Code Block and File Diff share the same language aliases, syntax rules, package-manager
            command highlighting, and escaped fallback for unsupported languages.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Each row announces whether its code was added, removed, or unchanged. When line numbers
            are shown, the announcement includes the relevant source line.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="changing-diff" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Changing a diff</Typography.H3>
            <Typography.Text variant="supporting">
                Replace the diff array when a new patch arrives. The filename, highlighted rows, and
                derived counts update from Root. Explicit additions and deletions continue to
                override the calculated counts until you remove those props.
            </Typography.Text>
            <ComponentPreview code={LiveSrc}>
                <Live />
            </ComponentPreview>
        </div>

        <div id="compound" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Compound API</Typography.H3>
            <Typography.Text variant="supporting">
                Drop down to rows when you need a custom top-bar action or explicit counts.
                Recompose the header from
                <Typography.InlineCode>Filename</Typography.InlineCode>
                and
                <Typography.InlineCode>PlusMinus</Typography.InlineCode>
                parts.
            </Typography.Text>
            <ComponentPreview code={CompoundSrc}>
                <Compound />
            </ComponentPreview>
        </div>

        <div id="without-line-numbers" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Without line numbers</Typography.H3>
            <Typography.Text variant="supporting">
                Hide both gutters for compact embeds. The sign column stays so additions and
                deletions remain distinguishable without color.
            </Typography.Text>
            <ComponentPreview code={WithoutLineNumbersSrc}>
                <WithoutLineNumbers />
            </ComponentPreview>
        </div>

        <div id="stacked" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Stacked files</Typography.H3>
            <Typography.Text variant="supporting">
                Render one Root per file for pull-request style views. Each diff keeps its own
                language and counts.
            </Typography.Text>
            <ComponentPreview code={StackedSrc}>
                <Stacked />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English. Pass a `labels` object to Root to translate the change type and line number that screen readers announce on each row. `FileDiffLabels` types it; every key is optional, and `line` is a function that receives the line number."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<FileDiff.Root
    {diff}
    labels={{
        added: 'Ajoutée',
        removed: 'Supprimée',
        unchanged: 'Inchangée',
        line: (line) => \`ligne \${line}\`
    }}
/>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="line-numbers" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Custom line numbers</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"When you compose rows yourself, LineNumber draws one gutter cell. `value` is the number to show, and a null value renders an empty cell, which is what the old-side gutter needs on an added line. `tone` colors the number as `context`, `add` or `remove`. Rows pass their own type, so you only set it for a number used on its own."}
            />
        </Typography.Text>
    </section>
</div>

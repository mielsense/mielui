<script lang="ts">
    import { ArrowExpandIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Compound from './examples/compound.svelte';
    import CompoundSrc from './examples/compound.svelte?raw';
    import Live from './examples/live.svelte';
    import LiveSrc from './examples/live.svelte?raw';
    import Stacked from './examples/stacked.svelte';
    import StackedSrc from './examples/stacked.svelte?raw';
    import WithoutLineNumbers from './examples/without-line-numbers.svelte';
    import WithoutLineNumbersSrc from './examples/without-line-numbers.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add file-diff';

    const playgroundDiff: FileDiffLine[] = [
        {
            type: 'context',
            oldLineNumber: 12,
            newLineNumber: 12,
            content: 'export function getToken() {'
        },
        {
            type: 'remove',
            oldLineNumber: 13,
            content: '  return localStorage.token;'
        },
        {
            type: 'add',
            newLineNumber: 13,
            content: '  const token = cookies.get("session");'
        },
        {
            type: 'add',
            newLineNumber: 14,
            content: '  if (!token) throw new Error("no session");'
        },
        {
            type: 'add',
            newLineNumber: 15,
            content: '  return token;'
        },
        {
            type: 'context',
            oldLineNumber: 14,
            newLineNumber: 16,
            content: '}'
        }
    ];

    const usageSnippet = `import * as FileDiff from '@mielui/svelte/components/file-diff';

<FileDiff.Root file="src/auth.ts" lang="ts" diff={[
  { type: 'context', oldLineNumber: 12, newLineNumber: 12, content: 'export function getToken() {' },
  { type: 'remove', oldLineNumber: 13, content: '  return localStorage.token;' },
  { type: 'add', newLineNumber: 13, content: '  const t = cookies.get("session");' },
]} />`;
</script>

<svelte:head>
    <title>Mielui · File Diff</title>
    <meta
        name="description"
        content="Unified file diff with a path top bar, addition and deletion counts, dual line-number gutters, and per-row syntax highlighting."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="File Diff">
        A unified diff viewer with a file top bar, change counts, and highlighted rows.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.topBar && values.counts && !values.action}
                    <FileDiff.Root
                        diff={playgroundDiff}
                        file={values.file}
                        lang="ts"
                        additions={values.additions}
                        deletions={values.deletions}
                        showLineNumbers={values.showLineNumbers}
                        theme={values.theme}
                        class="max-w-2xl"
                    />
                {:else}
                    <FileDiff.Root
                        file={values.file}
                        lang="ts"
                        additions={values.additions}
                        deletions={values.deletions}
                        showLineNumbers={values.showLineNumbers}
                        theme={values.theme}
                        class="max-w-2xl"
                    >
                        {#if values.topBar}
                            <FileDiff.TopBar>
                                <FileDiff.Filename />
                                {#if values.counts}
                                    <FileDiff.PlusMinus />
                                {/if}
                                {#if values.action}
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

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
        <Typography.Text variant="supporting">
            The component depends on{' '}
            <Typography.InlineCode>highlight.js</Typography.InlineCode>
            for syntax highlighting. Install it if your project doesn't have it yet:
        </Typography.Text>
        <InstallCommand command="pnpm add highlight.js" />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Single is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants. The filename and change counts stay above the diff, independently of
            the theme's inset strip position.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Pass a{' '}
            <Typography.InlineCode>diff</Typography.InlineCode>
            array for the high-level form, or compose TopBar, Content, and Row by hand. A bare{' '}
            <Typography.InlineCode>TopBar</Typography.InlineCode>
            renders filename and counts; pass children to take over the row with Filename,
            PlusMinus, and your own actions. Addition and deletion counts are derived from the diff
            unless you pass them explicitly.
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

    <!-- ─── Examples ──────────────────────────────────────────────── -->
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
            <ComponentPreview code={LiveSrc}><Live /></ComponentPreview>
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
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Keep patch context visible</Typography.H2>
        <Typography.Text>
            Use one Root per file and keep its filename and language alongside the patch. For short
            embedded previews you can omit line numbers; retain the addition and deletion signs so
            color is not the only distinction. Use the changing-diff example to inspect count
            updates.
        </Typography.Text>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to FileDiff.Root to translate or reword
            the change type and line number read to screen readers on each row. Every key is
            optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<FileDiff.Root {diff} labels={{ added: 'Ajoutée', removed: 'Supprimée', unchanged: 'Inchangée', line: (line) => \`ligne \${line}\` }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="line-numbers" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Custom line numbers</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"When you compose rows yourself, LineNumber draws one gutter cell. `value` is the number to show, and a null value renders an empty cell, which is what the old-side gutter needs on an added line. `tone` colors the number as `context`, `add` or `remove`. Rows pass their own type, so you only set it for a number used on its own."}
            />
        </Typography.Text>
    </section>
</div>

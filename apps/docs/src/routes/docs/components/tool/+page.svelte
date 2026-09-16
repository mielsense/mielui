<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Quiet from './examples/quiet.svelte';
    import QuietSrc from './examples/quiet.svelte?raw';
    import ToolStates from './examples/tool-states.svelte';
    import ToolStatesSrc from './examples/tool-states.svelte?raw';

    const TITLE = 'Tool';
    const SLUG = 'tool';
    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="Expandable AI tool calls designed for inline chat transcripts."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>{TITLE}</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Group related tool calls into one compact task summary without overwhelming the
                transcript.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

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
            Running tools use a spinner and a readable status label. Tool.Item renders supplied
            children in place of its detail text, so you can compose a link or custom detail without
            replacing its name and icon.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>Item</Typography.InlineCode> to list the commands, searches, and
            reads completed within a task.
        </Typography.Text>
        <CodeBlock
            code={`import * as Tool from '@mielui/svelte/components/tool';\n\n<Tool.Root name="1 file, 1 search, and 1 command" state="complete" duration="6s" variant="quiet">\n  <Tool.Item name="Bash" detail="pnpm lint" />\n  <Tool.Item name="Grep" detail="InputBar" kind="search" />\n  <Tool.Item name="Read" detail="/lib/input-bar.tsx" kind="read" />\n</Tool.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Root renders Trigger and Content automatically. Set composed to place those parts
            yourself, omit a region, or restyle it. Trigger accepts native button attributes and a
            children snippet receiving open, state, name, and duration. Its click handler may
            preventDefault to cancel toggling. Content accepts native div attributes and children;
            use at most one Content per Root. Both parts read their state from Root.
        </Typography.Text>
        <CodeBlock
            code={`<Tool.Root name="Read source" state="complete" composed>
  <Tool.Content class="ml-0 px-0">
    <Tool.Item name="Read" detail="src/main.ts" kind="read" />
  </Tool.Content>
  <Tool.Trigger class="px-0">
    {#snippet children({ open })}
      {open ? 'Hide details' : 'Show details'}
    {/snippet}
  </Tool.Trigger>
</Tool.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Bind open to control expansion. onOpenChange reports state changes; onOpenChangeComplete
            runs after the current transition completes. Interrupted transitions do not report stale
            completion. When Content is omitted, completion follows the state change without
            animation. Closing content is inert during its exit. The trigger snippet on Root remains
            supported for customizing the automatic trigger.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>
        <div id="research-assistant" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Research assistant</Typography.H3>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>
        <div id="tool-states" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Tool states in a support flow
            </Typography.H3>
            <ComponentPreview code={ToolStatesSrc}><ToolStates /></ComponentPreview>
        </div>
        <div id="quiet" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Quiet</Typography.H3>
            <Typography.Text variant="supporting">
                Use{' '}
                <Typography.InlineCode>variant="quiet"</Typography.InlineCode> when tool details
                should stay visually secondary to the response.
            </Typography.Text>
            <ComponentPreview code={QuietSrc}><Quiet /></ComponentPreview>
        </div>
    </section>
</div>

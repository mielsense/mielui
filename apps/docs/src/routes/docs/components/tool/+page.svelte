<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Tool from '@mielui/svelte/components/tool';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    import Quiet from './examples/quiet.svelte';
    import QuietSrc from './examples/quiet.svelte?raw';
    import ToolStates from './examples/tool-states.svelte';
    import ToolStatesSrc from './examples/tool-states.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Tool';
    const SLUG = 'tool';
    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;

    import Retry from './examples/retry.svelte';
    import RetrySource from './examples/retry.svelte?raw';
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
    <PageIntro title={TITLE}>
        Group related tool calls into one compact task summary without overwhelming the transcript.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet steps()}
                    <Tool.Item name="Bash" detail={values.details ? 'pnpm lint' : undefined} />
                    <Tool.Item
                        name="Grep"
                        detail={values.details ? 'Composer' : undefined}
                        kind="search"
                    />
                    <Tool.Item
                        name="Read"
                        detail={values.details ? 'src/components/composer.svelte' : undefined}
                        kind="read"
                    />
                    {#if values.sections}
                        <Tool.Input>pnpm lint</Tool.Input>
                        <Tool.Output>Checked 214 files. No fixes applied.</Tool.Output>
                    {/if}
                {/snippet}
                <div class="w-full max-w-xl">
                    {#if values.composed}
                        <Tool.Root
                            name={values.name}
                            state={values.state}
                            duration={values.duration || undefined}
                            variant={values.variant}
                            open={values.open}
                            composed
                        >
                            <Tool.Trigger />
                            <Tool.Content> {@render steps()} </Tool.Content>
                        </Tool.Root>
                    {:else}
                        <Tool.Root
                            name={values.name}
                            state={values.state}
                            duration={values.duration || undefined}
                            variant={values.variant}
                            open={values.open}
                        >
                            {@render steps()}
                        </Tool.Root>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>Item</Typography.InlineCode>
            to list the commands, searches, and reads completed within a task.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The trigger leads with a status icon and label: a spinner while running, a check when
            complete, and an alert icon with red "Task failed" text when the task fails. Tool names
            use the foreground color; the kind icon distinguishes commands, searches, and reads.
            Input and Output share one quiet surface divided by a hairline. Tool.Item renders
            supplied children in place of its detail text, so you can compose a link or custom
            detail without replacing its name and icon.
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
            yourself, omit a region, or restyle it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Trigger accepts native button attributes and a children snippet receiving open, state,
            name, and duration. Its click handler may preventDefault to cancel toggling. Content
            accepts native div attributes and children; use at most one Content per Root. Both parts
            read their state from Root.
        </Typography.Text>
        <CodeBlock
            code={`<Tool.Root name="Read source" state="complete" composed>
  <Tool.Content class="ps-0">
    <Tool.Item name="Read" detail="src/main.ts" kind="read" />
  </Tool.Content>
  <Tool.Trigger>
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
            completion. Closing content is inert during its exit.
        </Typography.Text>
        <Typography.Text variant="supporting">
            When Content is omitted, completion follows the state change without animation. Use
            Root's trigger snippet to customize the automatic trigger.
        </Typography.Text>
    </section>

    <section id="failure-retry" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Failure and retry</Typography.H2>
        <Typography.Text variant="supporting">
            Tool displays the state your application supplies. Keep the failed output visible, then
            replace it when a retry starts. This composition exposes input and output separately and
            keeps the retry action outside the disclosure.
        </Typography.Text>
        <ComponentPreview code={RetrySource}><Retry /></ComponentPreview>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
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
                <Typography.InlineCode>variant="quiet"</Typography.InlineCode>
                when tool details should stay visually secondary to the response.
            </Typography.Text>
            <ComponentPreview code={QuietSrc}><Quiet /></ComponentPreview>
        </div>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to Tool.Root to translate or reword the
            status announced by the trigger and the Input and Output headings. Every key is
            optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<Tool.Root name="Recherche" state="complete" labels={{ running: 'En cours', complete: 'Terminé', failed: 'Échec' }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>

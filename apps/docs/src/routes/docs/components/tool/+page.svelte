<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Tool from '@mielui/svelte/components/tool';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Quiet from './examples/quiet.svelte';
    import QuietSrc from './examples/quiet.svelte?raw';
    import Retry from './examples/retry.svelte';
    import RetrySrc from './examples/retry.svelte?raw';
    import ToolStates from './examples/tool-states.svelte';
    import ToolStatesSrc from './examples/tool-states.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
</${'script'}>

<Tool.Root name="1 file, 1 search, and 1 command" state="complete" duration="6s">
    <Tool.Item name="Bash" detail="pnpm lint" />
    <Tool.Item name="Grep" detail="InputBar" kind="search" />
    <Tool.Item name="Read" detail="src/lib/input-bar.svelte" kind="read" />
</Tool.Root>`;

    const compositionCode = `<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
</${'script'}>

<Tool.Root name="Read source" state="complete" composed>
    <Tool.Content class="ps-0">
        <Tool.Item name="Read" detail="src/main.ts" kind="read" />
    </Tool.Content>
    <Tool.Trigger>
        {#snippet children({ open })}
            {open ? 'Hide details' : 'Show details'}
        {/snippet}
    </Tool.Trigger>
</Tool.Root>`;
</script>

<svelte:head>
    <title>Mielui · Tool</title>
    <meta
        name="description"
        content="Expandable AI tool calls designed for inline chat transcripts."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Tool">
        Groups related tool calls under one collapsible task summary in a chat transcript.
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
                    <Tool.Root
                        name={values.name}
                        state={values.state}
                        duration={values.duration || undefined}
                        variant={values.variant}
                        open={values.open}
                    >
                        {@render steps()}
                    </Tool.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add tool" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Give Root a `name` that sums up the work and a `state`. The trigger leads with a spinner while running, a check when complete, and an alert with 'Task failed' on error. List each call with `Item`; its `kind` sets the icon for a command, a search, or a read. `Input` and `Output` show a call's arguments and result on one quiet surface."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Bind `open` to control expansion. `onOpenChange` reports each change, and `onOpenChangeComplete` runs once the animation finishes. Children passed to an Item replace its detail text, for example with a link.'}
            />
        </Typography.Text>
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Root renders Trigger and Content for you. Set `composed` to place them yourself, leave one out, or restyle it. Use at most one Content per Root. Trigger takes a `children` snippet that receives `open`, `state`, `name`, and `duration`. To change only the automatic trigger, pass the same snippet as `trigger` on Root.'}
            />
        </Typography.Text>
        <CodeBlock code={compositionCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="states" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">States</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'A finished task above a running one. The running task counts up its `duration` until it completes.'}
                />
            </Typography.Text>
            <ComponentPreview code={ToolStatesSrc}>
                <ToolStates />
            </ComponentPreview>
        </div>

        <div id="quiet" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Quiet</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`variant="quiet"` keeps tool details visually secondary to the response.'}
                />
            </Typography.Text>
            <ComponentPreview code={QuietSrc}>
                <Quiet />
            </ComponentPreview>
        </div>

        <div id="retry" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Failure and retry</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Tool shows the state your app gives it. Keep the failed output visible, then replace it when a retry starts. The retry button sits outside the disclosure.'}
                />
            </Typography.Text>
            <ComponentPreview code={RetrySrc}>
                <Retry />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Built-in text is English. Pass a `labels` object to Root to translate the status the trigger announces and the Input and Output headings. `ToolLabels` types it. Every key is optional, and omitted keys keep their English default.'}
            />
        </Typography.Text>
        <CodeBlock
            code={`<Tool.Root
    name="Lecture du fichier"
    state="complete"
    labels={{
        running: 'Tâche en cours',
        complete: 'Tâche terminée',
        failed: 'Échec de la tâche',
        input: 'Entrée',
        output: 'Sortie'
    }}
>
    <Tool.Input>read notes.md</Tool.Input>
    <Tool.Output>12 lignes</Tool.Output>
</Tool.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>

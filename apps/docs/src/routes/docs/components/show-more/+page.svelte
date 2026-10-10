<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { ShowMore } from '@mielui/svelte/components/show-more';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Capped from './examples/capped.svelte';
    import CappedSrc from './examples/capped.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSrc from './examples/interactive.svelte?raw';
    import LabelsExample from './examples/labels.svelte';
    import LabelsExampleSrc from './examples/labels.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Show More';
    const installCommand = 'pnpm dlx @mielui/svelte add show-more';
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Clamp long content and reveal the rest on demand." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title={TITLE}>
        Keeps long content scannable, then reveals the complete detail in place.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#key values.defaultExpanded}
                    <ShowMore
                        lines={values.lines}
                        maxHeight={values.maxHeight}
                        moreLabel={values.moreLabel}
                        lessLabel={values.lessLabel}
                        defaultExpanded={values.defaultExpanded}
                        label="Migration details"
                        class="w-full max-w-md"
                    >
                        <div class="flex flex-col gap-2">
                            <p>
                                The workspace migration is scheduled for Tuesday at 09:00 UTC. Your
                                projects, comments, and uploaded files will move together. Read-only
                                access remains available during the transfer.
                            </p>
                            <p>
                                Before the migration, export any reports needed for the morning
                                meeting. Scheduled jobs will pause for up to fifteen minutes and
                                resume after the new workspace passes its health checks.
                            </p>
                            <p>
                                If a check fails, the team will restore the previous workspace and
                                notify its owners. Existing links will continue to work after the
                                transfer.
                            </p>
                        </div>
                    </ShowMore>
                {/key}
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
            Use the default clipped view for text. For links, forms, or other interactive content,
            supply a separate preview snippet: the full children remain mounted but hidden and inert
            while collapsed. The trigger snippet can replace the default button; forward its props
            to a native button or Button. Omitting trigger keeps the built-in control.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Without a preview snippet, the disclosure is shown only when content exceeds the{' '}
            <Typography.InlineCode>lines</Typography.InlineCode>
            limit. Bind{' '}
            <Typography.InlineCode>expanded</Typography.InlineCode>
            when another control needs to coordinate the state.
        </Typography.Text>
        <CodeBlock
            code={`import { ShowMore } from '@mielui/svelte/components/show-more';

let expanded = $state(false);

<ShowMore bind:expanded lines={3} maxHeight={320} label="Release notes">
  <p>{releaseNotes}</p>
</ShowMore>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="interactive" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Interactive details</Typography.H3>
            <Typography.Text variant="supporting">
                Preview, full content, and trigger are separate snippet slots. This example replaces
                the control without rendering the default chevron. If controlled state collapses the
                details while focus is inside, focus returns to the trigger.
            </Typography.Text>
            <ComponentPreview code={InteractiveSrc}>
                <Interactive />
            </ComponentPreview>
        </div>

        <div id="capped" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Capped content</Typography.H3>
            <Typography.Text variant="supporting">
                Expanded content taller than{' '}
                <Typography.InlineCode>maxHeight</Typography.InlineCode>
                becomes a keyboard-focusable scroll region.
            </Typography.Text>
            <ComponentPreview code={CappedSrc}>
                <Capped />
            </ComponentPreview>
        </div>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">
            Choose a text or interactive preview
        </Typography.H2>
        <Typography.Text>
            Use a line-limited preview for prose. When hidden content includes links or buttons,
            supply a separate preview snippet and keep those controls in the expanded content. The
            interactive example prevents a clipped control from becoming an invisible keyboard stop.
        </Typography.Text>
    </section>
    <section id="state-and-labels" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">State and labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The content starts collapsed. `defaultExpanded` starts it open when you are not binding `expanded` yourself. `onExpandedChange` runs with the new state each time it expands or collapses."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`moreLabel` and `lessLabel` are the button's text in each state, Show more and Show less by default. Name what is hidden when you can, such as Show all 12 comments."}
            />
        </Typography.Text>
        <ComponentPreview code={LabelsExampleSrc}>
            <LabelsExample />
        </ComponentPreview>
    </section>
</div>

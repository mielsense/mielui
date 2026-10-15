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

    const usageCode = `<script lang="ts">
    import { ShowMore } from '@mielui/svelte/components/show-more';

    let { notes }: { notes: string } = $props();

    let expanded = $state(false);
</${'script'}>

<ShowMore bind:expanded lines={3} labels={{ region: 'Release notes' }}>
    <p>{notes}</p>
</ShowMore>`;
</script>

<svelte:head>
    <title>Mielui · Show More</title>
    <meta name="description" content="Clamp long content and reveal the rest on demand." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Show More">
        Keeps long content scannable, then reveals the complete detail in place.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#key values.defaultExpanded}
                    <ShowMore
                        lines={values.lines}
                        maxHeight={values.maxHeight}
                        defaultExpanded={values.defaultExpanded}
                        labels={{ region: 'Migration details' }}
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
        <InstallCommand command="pnpm dlx @mielui/svelte add show-more" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"By default the content is clipped to `lines` lines, 3 by default, and the button appears only when the content is longer. Expanded content taller than `maxHeight`, 320 by default, scrolls inside a region named by `label`. Bind `expanded` when another control needs to coordinate the state."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"Use the clipped view for prose. When hidden content includes links, forms, or buttons, pass a separate `preview` snippet: the full children stay mounted but hidden and inert while collapsed, so a clipped control never becomes an invisible keyboard stop. A `trigger` snippet replaces the default button; forward its `props` to a native button or Button."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="interactive" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Interactive details</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`preview`, the full content, and `trigger` are separate snippets. This example replaces the default control. If controlled state collapses the details while focus is inside, focus returns to the trigger."}
                />
            </Typography.Text>
            <ComponentPreview code={InteractiveSrc}>
                <Interactive />
            </ComponentPreview>
        </div>

        <div id="capped" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Capped content</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Expanded content taller than `maxHeight` becomes a keyboard-focusable scroll region."}
                />
            </Typography.Text>
            <ComponentPreview code={CappedSrc}>
                <Capped />
            </ComponentPreview>
        </div>

        <div id="button-text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Button text</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`labels.more` and `labels.less` name what is hidden. `onExpandedChange` runs with the new state each time the content expands or collapses."}
                />
            </Typography.Text>
            <ComponentPreview code={LabelsExampleSrc}>
                <LabelsExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="state-and-labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">State and labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The content starts collapsed. `defaultExpanded` starts it open when you are not binding `expanded`. `onExpandedChange` runs with the new state each time it expands or collapses."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to set the built-in text. `labels.more` and `labels.less` are the button text in each state, Show more and Show less by default. Name what is hidden when you can, such as Show all 12 comments. `labels.region` names the expanded scroll region, Details by default. Every key is optional and English is the fallback."}
            />
        </Typography.Text>
    </section>
</div>

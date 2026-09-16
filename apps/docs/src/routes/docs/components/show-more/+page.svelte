<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Capped from './examples/capped.svelte';
    import CappedSrc from './examples/capped.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSrc from './examples/interactive.svelte?raw';

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
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>{TITLE}</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Keeps long content scannable, then reveals the complete detail in place.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
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
            Without a preview snippet, the disclosure is shown only when content exceeds
            <Typography.InlineCode>lines</Typography.InlineCode>
            . Bind
            <Typography.InlineCode>expanded</Typography.InlineCode>
            when another control needs to coordinate the state.
        </Typography.Text>
        <CodeBlock
            code={`import { ShowMore } from '$lib/mielui/components/show-more';

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
                When expanded content exceeds
                <Typography.InlineCode>maxHeight</Typography.InlineCode>
                , it becomes a keyboard-focusable scroll region.
            </Typography.Text>
            <ComponentPreview code={CappedSrc}>
                <Capped />
            </ComponentPreview>
        </div>
    </section>
</div>

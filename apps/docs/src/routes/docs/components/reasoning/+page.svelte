<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Streaming from './examples/streaming.svelte';
    import StreamingSrc from './examples/streaming.svelte?raw';

    const TITLE = 'Reasoning';
    const SLUG = 'reasoning';
    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="A concise, expandable reasoning trace for AI assistant responses."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title={TITLE}>Show an assistant's progress in a collapsible section.</PageIntro>

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
            Reasoning starts expanded. Set open to false for an initially collapsed summary. Bind
            open to control expansion from the parent.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>streaming</Typography.InlineCode> while the model is thinking;
            use{' '}
            <Typography.InlineCode>duration</Typography.InlineCode> when it completes.
        </Typography.Text>
        <CodeBlock
            code={`import * as Reasoning from '@mielui/svelte/components/reasoning';

<Reasoning.Root>
  <Reasoning.Trigger title="Searched the release history" duration="2.4s" />
  <Reasoning.Content>
    <p>Compared the incident timestamp with the last five deployments.</p>
  </Reasoning.Content>
</Reasoning.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            Trigger runs your onclick handler before toggling. Call event.preventDefault() to keep
            the current expansion state.
        </Typography.Text>
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">End a live trace</Typography.H2>
        <Typography.Text variant="supporting">
            Set streaming only while content is arriving, then clear it when delivery finishes. The
            live example uses ResponseStream completion to update the trigger. Use a short,
            user-facing account of the work performed rather than exposing private model reasoning.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>
        <div id="live-reasoning" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Live reasoning</Typography.H3>
            <ComponentPreview code={StreamingSrc}><Streaming /></ComponentPreview>
        </div>
    </section>
</div>

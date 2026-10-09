<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';

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
            <Typography.InlineCode>streaming</Typography.InlineCode>
            while the model is thinking; use{' '}
            <Typography.InlineCode>duration</Typography.InlineCode>
            when it completes.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The trigger shares the disclosure row used by Accordion, Collapsible, and Tool, with a
            ghost hover fill, a rounded focus ring, and a trailing chevron. Its label aligns with
            the surrounding text and shimmers while the model is thinking, and expanded content sits
            behind a hairline rule.
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

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to Reasoning.Root to translate or
            reword the trigger text while streaming and after it completes. Every key is optional;
            omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<Reasoning.Root {streaming} labels={{ thinking: 'Réflexion', thought: 'Réflexion terminée', thoughtFor: (duration) => \`Réflexion de \${duration}\` }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="open-events" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Open events and parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onOpenChange` on Root runs when the reasoning opens or closes. `onOpenChangeComplete` runs after the animation has finished, which is the moment to measure or scroll."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Trigger and Content render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
</div>

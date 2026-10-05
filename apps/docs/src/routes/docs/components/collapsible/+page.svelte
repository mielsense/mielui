<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Default from './examples/default.svelte';
    import DefaultSrc from './examples/default.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const TITLE = 'Collapsible';
    const SLUG = 'collapsible';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="A single collapsible panel with open/close toggle." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>A single panel that expands and collapses on demand.</PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Compose Trigger and Content inside Root. Bind{' '}
            <Typography.InlineCode>open</Typography.InlineCode>
            {' '}
            to control the panel from another part of your page. Set{' '}
            <Typography.InlineCode>disabled</Typography.InlineCode>
            {' '}
            on Root to prevent toggling. The content transition respects reduced motion.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Trigger renders the shared disclosure row used by Accordion, Reasoning, and Tool: the
            small control height, a ghost hover fill, and a rounded focus ring. It sizes to its
            content; add{' '}
            <Typography.InlineCode>w-full justify-between</Typography.InlineCode>
            {' '}
            for a full-width row. Put a 14px{' '}
            <Typography.InlineCode>ArrowDown01Icon</Typography.InlineCode>
            {' '}
            after the label and rotate it 180 degrees while open, as the first example does.
        </Typography.Text>

        <CodeBlock
            code={`import * as Collapsible from '@mielui/svelte/components/collapsible';\n\nlet open = $state();\n\n<Collapsible.Root bind:open>\n  <Collapsible.Trigger>Trigger</Collapsible.Trigger>\n  <Collapsible.Content>Content</Collapsible.Content>\n</Collapsible.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Default -->
        <div id="default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={DefaultSrc}>
                <Default />
            </ComponentPreview>
        </div>
    </section>
</div>

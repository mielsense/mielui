<script lang="ts">
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Default from './examples/default.svelte';
    import DefaultSrc from './examples/default.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Collapsible';
    const SLUG = 'collapsible';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;

    let playgroundOpen = $state(true);
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-sm">
                    <Collapsible.Root bind:open={playgroundOpen} disabled={values.disabled}>
                        <Collapsible.Trigger
                            class={values.fullWidth ? 'w-full justify-between' : undefined}
                        >
                            Weekly sync, June 18
                            {#if values.chevron}
                                <HugeiconsIcon
                                    icon={ArrowDown01Icon}
                                    size={14}
                                    aria-hidden="true"
                                    class={[
                                        'shrink-0 text-foreground-muted transition-transform',
                                        playgroundOpen && 'rotate-180'
                                    ]}
                                />
                            {/if}
                        </Collapsible.Trigger>
                        <Collapsible.Content class="pt-1 pb-2">
                            The export flow is ready for testing. Maya owns the migration guide, and
                            Sam will review keyboard navigation before Friday.
                        </Collapsible.Content>
                    </Collapsible.Root>
                </div>
            {/snippet}
        </Playground>
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

        <div id="meeting-notes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Meeting notes</Typography.H3>
            <Typography.Text variant="supporting">
                A full-width trigger with a chevron opens a paragraph and a list of action items.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <!-- Default -->
        <div id="default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={DefaultSrc}>
                <Default />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger can hold any content, so a chevron that turns when the section opens goes right beside its label."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Trigger and Content render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>

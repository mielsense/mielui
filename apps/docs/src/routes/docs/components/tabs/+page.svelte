<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Manual from './examples/manual.svelte';
    import ManualSrc from './examples/manual.svelte?raw';
    import VariantDefault from './examples/variant-default.svelte';
    import VariantDefaultSrc from './examples/variant-default.svelte?raw';
    import VariantGhost from './examples/variant-ghost.svelte';
    import VariantGhostSrc from './examples/variant-ghost.svelte?raw';
    import VariantSegmented from './examples/variant-segmented.svelte';
    import VariantSegmentedSrc from './examples/variant-segmented.svelte?raw';
    import Vertical from './examples/vertical.svelte';
    import VerticalSrc from './examples/vertical.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add tabs';
</script>

<svelte:head>
    <title>Mielui · Tabs</title>
    <meta
        name="description"
        content="Switch between mutually-exclusive views with horizontal or vertical tabs and a sliding indicator."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Tabs">
        A horizontal or vertical switcher for views that share a context. Comes in three variants.
    </PageIntro>

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
            Focusing a trigger selects its panel by default. Set<Typography.InlineCode>
                activationMode="manual"
            </Typography.InlineCode> to move focus without loading a panel until Enter or Space is
            pressed. Arrow keys follow the tab orientation and document direction. Home and End move
            to the first and last enabled tabs.
        </Typography.Text>
        <Typography.Text>
            If the selected trigger is removed, disabled, or changes value, selection moves to the
            first enabled trigger.<Typography.InlineCode>
                onValueChange
            </Typography.InlineCode> reports that value. With no enabled triggers, the value becomes
            an empty string. Focus stays on the current control.
        </Typography.Text>
        <Typography.Text>
            Inactive panels unmount. Set<Typography.InlineCode>forceMount</Typography.InlineCode> on
            a panel when it needs to keep its state while hidden.
        </Typography.Text>

        <CodeBlock
            code={`import * as Tabs from '$lib/mielui/components/tabs';\n\nlet tab = $state('tab1');\n\n<Tabs.Root bind:value={tab}>\n  <Tabs.List>\n    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>\n    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="tab1">Content 1</Tabs.Content>\n  <Tabs.Content value="tab2">Content 2</Tabs.Content>\n</Tabs.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="variant-default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={VariantDefaultSrc}>
                <VariantDefault />
            </ComponentPreview>
        </div>

        <div id="variant-ghost" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Ghost</Typography.H3>
            <ComponentPreview code={VariantGhostSrc}>
                <VariantGhost />
            </ComponentPreview>
        </div>

        <div id="variant-segmented" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Segmented</Typography.H3>
            <ComponentPreview code={VariantSegmentedSrc}>
                <VariantSegmented />
            </ComponentPreview>
        </div>

        <div id="orientation-vertical" class="scroll-mt-20 flex flex-col gap-3">
            <div>
                <Typography.H3 class="docs-subsection-heading">Vertical</Typography.H3>
                <Typography.Text variant="supporting" class="mt-2">
                    Set{' '}
                    <Typography.InlineCode>orientation="vertical"</Typography.InlineCode> for a
                    side-by-side layout. Use Up and Down Arrow to move between tabs; Home and End
                    jump to the first and last tab.
                </Typography.Text>
            </div>
            <ComponentPreview code={VerticalSrc}>
                <Vertical />
            </ComponentPreview>
        </div>
    </section>
    <section id="manual" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">
            Manual activation and retained state
        </Typography.H2>
        <Typography.Text variant="supporting">
            Use arrow keys to focus a tab, then Enter or Space to select it. The Draft panel stays
            mounted with forceMount; History is disabled.
        </Typography.Text>
        <ComponentPreview code={ManualSrc}><Manual /></ComponentPreview>
    </section>
</div>

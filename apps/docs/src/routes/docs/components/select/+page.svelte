<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import DynamicWidth from './examples/dynamic-width.svelte';
    import DynamicWidthSrc from './examples/dynamic-width.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Scrollable from './examples/scrollable.svelte';
    import ScrollableSrc from './examples/scrollable.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add select';
</script>

<svelte:head>
    <title>Mielui · Select</title>
    <meta name="description" content="Single-choice dropdown for short, known option lists." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Select">A dropdown for choosing one option from a short list.</PageIntro>

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
            Use Select.Value for a trigger label that follows the selection. Use bind:value or
            onValueChange on Select.Root to react to both pointer and keyboard selection; an item
            onclick handler only observes native clicks. Trigger onclick receives the mouse event
            before click activation; preventDefault cancels that activation. Arrow keys, Home, End,
            and typing navigate options; disabled items are skipped. Before an option label is
            mounted, a preselected value is displayed as its value string.
        </Typography.Text>

        <CodeBlock
            code={`import * as Select from '$lib/mielui/components/select';\n\n<Select.Root bind:value={role}>\n  <Select.Trigger aria-label="Role"><Select.Value placeholder="Select a role" /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="designer">Designer</Select.Item>\n  </Select.Content>\n</Select.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="scrollable" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Scrollable</Typography.H3>
            <Typography.Text variant="supporting">
                Long option lists stay in a height-capped menu and scroll inside it.
            </Typography.Text>
            <ComponentPreview code={ScrollableSrc}>
                <Scrollable />
            </ComponentPreview>
        </div>

        <div id="dynamic-width" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Dynamic width</Typography.H3>
            <Typography.Text variant="supporting">
                The menu sizes to its longest option plus a buffer, even when the trigger is
                narrower.
            </Typography.Text>
            <ComponentPreview code={DynamicWidthSrc}>
                <DynamicWidth />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Select.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>

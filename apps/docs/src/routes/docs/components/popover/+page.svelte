<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Placements from './examples/placements.svelte';
    import PlacementsSrc from './examples/placements.svelte?raw';

    const _TITLE = 'Popover';

    const installCommand = 'pnpm dlx @mielui/svelte add popover';
</script>

<svelte:head>
    <title>Mielui · Popover</title>
    <meta name="description" content="A floating surface anchored to a trigger element." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Popover</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A floating surface anchored to a trigger. Supports four placements.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <Typography.Text>
        Trigger onclick receives the native mouse event before changing open state. Call
        preventDefault to cancel opening or closing.
    </Typography.Text>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Bind open on Root when another control needs to open or close the panel. Use
            onOpenChange to respond to changes initiated inside the component. Updating your bound
            value directly does not call that callback again. Each Root keeps its own state, so
            opening one instance does not change another.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Popover coordinates focus and Escape with dialogs and nested floating controls. Include
            Title or give Content an aria-label when it has a dialog role. Set focusTrap and
            lockScroll to false for a non-modal composition; set inert to false on Root when outside
            content should remain interactive.
        </Typography.Text>

        <Typography.Text variant="supporting">
            Open non-hover popovers make outside document content inert by default. Set
            <Typography.InlineCode>{'inert={false}'}</Typography.InlineCode>
            on{' '}
            <Typography.InlineCode>Popover.Root</Typography.InlineCode> only when the surrounding
            page must remain interactive.
        </Typography.Text>
        <CodeBlock
            code={`import * as Popover from '$lib/mielui/components/popover';\n\n<Popover.Root>\n  <Popover.Trigger>Open</Popover.Trigger>\n  <Popover.Content class="w-64">\n    Content here\n  </Popover.Content>\n</Popover.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
            <Typography.Text variant="supporting" class="mt-2">
                Explore the Popover in different placements and compositions.
            </Typography.Text>
        </div>

        <!-- Basic popover -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic popover</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <!-- Placement variants -->
        <div id="placements" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Placement variants</Typography.H3>
            <ComponentPreview code={PlacementsSrc}>
                <Placements />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Popover.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>

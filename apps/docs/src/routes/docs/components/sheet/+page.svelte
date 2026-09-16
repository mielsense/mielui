<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Left from './examples/left.svelte';
    import LeftSrc from './examples/left.svelte?raw';
    import Right from './examples/right.svelte';
    import RightSrc from './examples/right.svelte?raw';

    const TITLE = 'Sheet';

    const installCommand = 'pnpm dlx @mielui/svelte add sheet';
</script>

<svelte:head>
    <title>Mielui · Sheet</title>
    <meta
        name="description"
        content="An edge-anchored drawer for mobile menus, filters, and side panels."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>{TITLE}</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A drawer that slides in from the left or right of the screen.
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
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Sheets open from the left or right. Focus stays within the open sheet and returns to its
            trigger when it closes. Include Title and optionally Description; click handlers on
            Trigger and Close can cancel the state change with event.preventDefault().
        </Typography.Text>

        <CodeBlock
            code={`import * as Sheet from '$lib/mielui/components/sheet';\nimport Kbd from '$lib/mielui/components/kbd';\n\n<Sheet.Root bind:open>\n  <Sheet.Trigger>Open</Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Header>\n      <Sheet.Title>Title</Sheet.Title>\n      <Sheet.Description>Describe what lives here.</Sheet.Description>\n    </Sheet.Header>\n    {/* content */}\n    <Sheet.Footer>\n      <Sheet.Close>Cancel <Kbd shortcut="esc" /></Sheet.Close>\n      <Button>Save <Kbd shortcut="enter" /></Button>\n    </Sheet.Footer>\n  </Sheet.Content>\n</Sheet.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Left side -->
        <div id="left" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Left side</Typography.H3>
            <ComponentPreview code={LeftSrc}>
                <Left />
            </ComponentPreview>
        </div>

        <!-- Right side -->
        <div id="right" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right side</Typography.H3>
            <ComponentPreview code={RightSrc}>
                <Right />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Sheet.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>

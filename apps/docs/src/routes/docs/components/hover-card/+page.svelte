<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Definition from './examples/definition.svelte';
    import DefinitionSrc from './examples/definition.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import LinkPreview from './examples/link-preview.svelte';
    import LinkPreviewSrc from './examples/link-preview.svelte?raw';
    import UserPreview from './examples/user-preview.svelte';
    import UserPreviewSrc from './examples/user-preview.svelte?raw';

    const _TITLE = 'Hover Card';
    const SLUG = 'hover-card';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>Mielui · Hover Card</title>
    <meta
        name="description"
        content="A preview card that opens on hover or keyboard focus. Use it for user mentions, link previews, or definitions."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Hover Card</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A preview card that opens on hover or focus.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={UserPreviewSrc}>
            <UserPreview />
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
            Hover Card uses Bits UI LinkPreview for pointer grace, keyboard focus, dismissal, and
            collision-aware positioning. Mielui retains its inset surface, placement props, and
            motion tokens. Link triggers retain normal navigation; triggers without href render a
            native button.
        </Typography.Text>

        <CodeBlock
            code={`import * as HoverCard from '$lib/mielui/components/hover-card';\nimport * as Avatar from '$lib/mielui/components/avatar';\n\n<HoverCard.Root>\n  <HoverCard.Trigger>@username</HoverCard.Trigger>\n  <HoverCard.Content>\n    <HoverCard.Title>Full name</HoverCard.Title>\n    <HoverCard.Description>Bio or description</HoverCard.Description>\n  </HoverCard.Content>\n</HoverCard.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- User mention preview -->
        <div id="user-preview" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">User mention preview</Typography.H3>
            <ComponentPreview code={UserPreviewSrc}>
                <UserPreview />
            </ComponentPreview>
        </div>

        <!-- Link preview -->
        <div id="link-preview" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Link preview</Typography.H3>
            <ComponentPreview code={LinkPreviewSrc}>
                <LinkPreview />
            </ComponentPreview>
        </div>

        <!-- Simple definition -->
        <div id="definition" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Definition or term</Typography.H3>
            <ComponentPreview code={DefinitionSrc}>
                <Definition />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on HoverCard.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>

<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Definition from './examples/definition.svelte';
    import DefinitionSrc from './examples/definition.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import LinkPreview from './examples/link-preview.svelte';
    import LinkPreviewSrc from './examples/link-preview.svelte?raw';
    import UserPreview from './examples/user-preview.svelte';
    import UserPreviewSrc from './examples/user-preview.svelte?raw';

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
    <PageIntro title="Hover Card">A preview card that opens on hover or focus.</PageIntro>

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
            Put the preview in Content and its link or label in Trigger. The card opens on hover or
            keyboard focus and stays open as the pointer moves into it. Give Trigger an href for
            normal link navigation; otherwise it renders a button.
        </Typography.Text>

        <CodeBlock
            code={`import * as HoverCard from '$lib/mielui/components/hover-card';\n\n<HoverCard.Root>\n  <HoverCard.Trigger>@username</HoverCard.Trigger>\n  <HoverCard.Content>\n    <HoverCard.Title>Full name</HoverCard.Title>\n    <HoverCard.Description>Bio or description</HoverCard.Description>\n  </HoverCard.Content>\n</HoverCard.Root>`}
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
            Set surface="glass" on HoverCard.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>

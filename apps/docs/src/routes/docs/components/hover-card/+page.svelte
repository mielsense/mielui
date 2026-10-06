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
    import Placement from './examples/placement.svelte';
    import PlacementSrc from './examples/placement.svelte?raw';
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
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Single is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text>
            Put the preview in Content and its link or label in Trigger. The card opens on hover or
            keyboard focus and stays open as the pointer moves into it. Give Trigger an href for
            normal link navigation; otherwise it renders a button.
        </Typography.Text>
        <Typography.Text>
            Root accepts openDelay and closeDelay in milliseconds, 200 and 150 by default, and a
            bindable open. Content takes side and align to place the card; it flips and shifts to
            stay inside the viewport. Add Title and Description to name and describe the card for
            assistive technology.
        </Typography.Text>

        <CodeBlock
            code={`import * as HoverCard from '@mielui/svelte/components/hover-card';\n\n<HoverCard.Root>\n  <HoverCard.Trigger>@username</HoverCard.Trigger>\n  <HoverCard.Content>\n    <HoverCard.Title>Full name</HoverCard.Title>\n    <HoverCard.Description>Bio or description</HoverCard.Description>\n  </HoverCard.Content>\n</HoverCard.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
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
    <section id="placement" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Placement and timing</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>side</Typography.InlineCode>
            on Content to choose where the card opens:{' '}
            <Typography.InlineCode>top</Typography.InlineCode>
            ,{' '}
            <Typography.InlineCode>right</Typography.InlineCode>
            ,{' '}
            <Typography.InlineCode>bottom</Typography.InlineCode>
            , or{' '}
            <Typography.InlineCode>left</Typography.InlineCode>
            . The default is bottom. The side is a preference. When there is no room, the card flips
            to the opposite side.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <Typography.InlineCode>align</Typography.InlineCode>
            positions the card along that side as{' '}
            <Typography.InlineCode>start</Typography.InlineCode>
            ,{' '}
            <Typography.InlineCode>center</Typography.InlineCode>
            , or{' '}
            <Typography.InlineCode>end</Typography.InlineCode>
            . The card sits 8px from the trigger and shifts to stay inside the viewport.
        </Typography.Text>
        <Typography.Text variant="supporting">
            On Root,{' '}
            <Typography.InlineCode>openDelay</Typography.InlineCode>
            and{' '}
            <Typography.InlineCode>closeDelay</Typography.InlineCode>
            set how long the pointer rests before the card opens and how long it stays after the
            pointer leaves. They default to 200 and 150 milliseconds.
        </Typography.Text>
        <ComponentPreview code={PlacementSrc}><Placement /></ComponentPreview>
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

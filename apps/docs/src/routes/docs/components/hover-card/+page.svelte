<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
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
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageSnippet = `<script lang="ts">
    import * as HoverCard from '@mielui/svelte/components/hover-card';
<${'/'}script>

<HoverCard.Root>
    <HoverCard.Trigger href="https://github.com/mielsense">@mielsense</HoverCard.Trigger>
    <HoverCard.Content>
        <HoverCard.Title>mielsense</HoverCard.Title>
        <HoverCard.Description>Maintains the shared components.</HoverCard.Description>
    </HoverCard.Content>
</HoverCard.Root>`;
</script>

<svelte:head>
    <title>Mielui · Hover Card</title>
    <meta
        name="description"
        content="A preview card that opens on hover or keyboard focus. Use it for user mentions, link previews, or definitions."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Hover Card">A preview card that opens on hover or focus.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <HoverCard.Root
                    placement={values.placement}
                    delay={values.delay}
                    closeDelay={values.closeDelay}
                >
                    <HoverCard.Trigger href={values.link ? 'https://ui.miel.my' : undefined}>
                        Mielui
                    </HoverCard.Trigger>
                    <HoverCard.Content surface={values.glass ? 'glass' : undefined}>
                        {#if values.title}
                            <HoverCard.Title>Mielui</HoverCard.Title>
                        {/if}
                        {#if values.description}
                            <HoverCard.Description>
                                Accessible Svelte 5 components styled with Tailwind CSS.
                            </HoverCard.Description>
                        {/if}
                        <p class="mt-2 text-xs text-foreground-muted">ui.miel.my</p>
                    </HoverCard.Content>
                </HoverCard.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add hover-card" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Put the link or label in Trigger and the preview in Content. The card opens on hover or keyboard focus and stays open while the pointer moves into it. Give Trigger an `href` to render a link; without one it renders a button that toggles the card. Bind `open` on Root to control it from outside."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Title and Description give the card a heading and supporting text. Trigger, Content, Title, and Description accept `class`; Root renders no element of its own."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="user-mention" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">User mention</Typography.H3>
            <Typography.Text variant="supporting">
                A mention inside a sentence previews the profile, with a follow button in the card.
            </Typography.Text>
            <ComponentPreview code={UserPreviewSrc}>
                <UserPreview />
            </ComponentPreview>
        </div>

        <div id="link-preview" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Link preview</Typography.H3>
            <ComponentPreview code={LinkPreviewSrc}>
                <LinkPreview />
            </ComponentPreview>
        </div>

        <div id="definition" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Definition</Typography.H3>
            <ComponentPreview code={DefinitionSrc}>
                <Definition />
            </ComponentPreview>
        </div>

        <div id="placement" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Placement and timing</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`placement` on Root picks the side of the trigger the card opens on, `bottom` by default, and an optional `-start` or `-end` aligns it to that edge, as in `bottom-start`. It flips to the opposite side when there is no room. `sideOffset` on Content sets the gap to the trigger in pixels, 8 by default."}
                />
            </Typography.Text>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`delay` and `closeDelay` on Root set how long the pointer rests before the card opens and how long it stays after the pointer leaves. They default to 200 and 150 milliseconds."}
                />
            </Typography.Text>
            <ComponentPreview code={PlacementSrc}>
                <Placement />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`surface=\"glass\"` on Content gives the card a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from the theme, or set `surface=\"solid\"` to override it. Glass falls back to an opaque fill when backdrop filtering is unavailable or reduced transparency is requested."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>
    </section>
</div>

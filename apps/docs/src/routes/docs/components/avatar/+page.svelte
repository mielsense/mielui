<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Shapes from './examples/shapes.svelte';
    import ShapesSrc from './examples/shapes.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import WithImage from './examples/with-image.svelte';
    import WithImageSrc from './examples/with-image.svelte?raw';
    import {
        ALT,
        code as playgroundCode,
        controls as playgroundControls,
        sources as playgroundSources
    } from './playground';

    const usage = `<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
</${'script'}>

<Avatar.Root>
    <Avatar.Image src="/avatar.jpg" alt="Alex Morgan" />
    <Avatar.Fallback>AM</Avatar.Fallback>
</Avatar.Root>`;
</script>

<svelte:head>
    <title>Mielui · Avatar</title>
    <meta name="description" content="An image with initials while it loads or when it fails." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Avatar">
        An image with initials as a fallback. Comes in two shapes and several sizes.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const src = $derived(playgroundSources[values.image])}
                <Avatar.Root shape={values.shape} size={values.size}>
                    {#if src !== undefined}
                        <Avatar.Image {src} alt={ALT} />
                    {/if}
                    {#if values.fallback}
                        <Avatar.Fallback>{values.fallback}</Avatar.Fallback>
                    {/if}
                </Avatar.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add avatar" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Fallback shows while the image loads, stays when it fails, and returns when the Image is removed. Changing `src`, `srcset`, or `sizes` starts a new request. Your own `onload` and `onerror` handlers still run."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="team-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Team list</Typography.H3>
            <Typography.Text variant="supporting">
                A large avatar with a photo heads the list, and small initials mark each member.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>

        <div id="shapes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shapes</Typography.H3>
            <ComponentPreview code={ShapesSrc}>
                <Shapes />
            </ComponentPreview>
        </div>

        <div id="with-image" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Image unavailable</Typography.H3>
            <ComponentPreview code={WithImageSrc}>
                <WithImage />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Put initials or an icon in Fallback's `children`. Leave Image's `alt` empty when the name is already shown beside the avatar."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Every part takes `class`. Root and Fallback render their `children`, and Image passes img attributes such as `srcset` and `loading` to the image."}
            />
        </Typography.Text>
    </section>
</div>

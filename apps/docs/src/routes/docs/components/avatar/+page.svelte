<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Shapes from './examples/shapes.svelte';
    import ShapesSrc from './examples/shapes.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import WithImage from './examples/with-image.svelte';
    import WithImageSrc from './examples/with-image.svelte?raw';

    const TITLE = 'Avatar';
    const SLUG = 'avatar';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="An image with initials while it loads or when it fails." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        An image with initials as a fallback. Comes in two shapes and several sizes.
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
        <Typography.Text variant="supporting">
            Changing Image src, srcset, or sizes starts a new image request. Fallback remains
            available while images load or fail, and returns when the loaded Image is removed.
            Native onload and onerror callbacks run alongside the internal state updates.
        </Typography.Text>

        <CodeBlock
            code={`import * as Avatar from '$lib/mielui/components/avatar';\n\n<Avatar.Root>\n  <Avatar.Image src="/avatar.jpg" alt="User" />\n  <Avatar.Fallback>AB</Avatar.Fallback>\n</Avatar.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Sizes -->
        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>

        <!-- Shapes -->
        <div id="shapes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shapes</Typography.H3>
            <ComponentPreview code={ShapesSrc}>
                <Shapes />
            </ComponentPreview>
        </div>

        <!-- With image -->
        <div id="with-image" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Image unavailable</Typography.H3>
            <ComponentPreview code={WithImageSrc}>
                <WithImage />
            </ComponentPreview>
        </div>
    </section>
</div>

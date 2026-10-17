<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import PencilIconSrc from './examples/pencil-icon.svelte?raw';
    import Shapes from './examples/shapes.svelte';
    import ShapesSrc from './examples/shapes.svelte?raw';
    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';
    import WithIcon from './examples/with-icon.svelte';
    import WithIconSrc from './examples/with-icon.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usage = `<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
</${'script'}>

<Badge>New</Badge>
<Badge variant="outline" dot>Label</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>`;
</script>

<svelte:head>
    <title>Mielui · Badge</title>
    <meta name="description" content="Compact labels for status, counts, and tags." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Badge">A compact label for status, counts, and tags.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.link}
                    <Badge variant={values.variant} dot={values.dot} href="/docs/components/badge">
                        {values.label}
                    </Badge>
                {:else}
                    <Badge variant={values.variant} dot={values.dot}>{values.label}</Badge>
                {/if}
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add badge" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `href` to render a link that accepts anchor attributes such as `target`, `rel`, and `download`. Without it, Badge renders a div. An empty `href` still renders a link, so narrow optional URLs before passing them."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Badges are static by default. Add `role=\"status\"` only when a change to the badge text should be announced."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="status-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Status list</Typography.H3>
            <Typography.Text variant="supporting">
                A badge at the end of each row reports the state of that row.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="shapes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shapes</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Badges are small flat pills that share one height. Only the outline variant draws a hairline. Use `class` to change the corner radius or make a square count."}
                />
            </Typography.Text>
            <ComponentPreview code={ShapesSrc}>
                <Shapes />
            </ComponentPreview>
        </div>

        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <ComponentPreview code={VariantsSrc}><Variants /></ComponentPreview>
        </div>
    </section>
    <section id="icon" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Icon</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`icon` takes a Svelte component and renders it before the text. The component receives `size` and `class`, so any icon component with those two props works. `iconSize` sets that size in pixels and defaults to 13. For anything else, such as a count, put it in `children` next to the text."}
            />
        </Typography.Text>
        <ComponentPreview code={WithIconSrc}><WithIcon /></ComponentPreview>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The example wraps a Hugeicons icon in a small component, `pencil-icon.svelte`:"}
            />
        </Typography.Text>
        <CodeBlock code={PencilIconSrc} lang="svelte" copy="overlay" />
    </section>
</div>
